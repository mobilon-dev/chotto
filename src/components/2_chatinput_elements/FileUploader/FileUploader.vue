<template>
  <div v-if="uploadStatus === 'uploading'" class="file-uploader__status file-uploader__status--uploading">
    <span>Загрузка</span>
    <span>файла...</span>
  </div>
  <div v-else-if="uploadStatus === 'error'" class="file-uploader__status file-uploader__status--error">
    <span>Ошибка при загрузке файла.</span>
  </div>
  <!-- <ButtonContextMenu
    v-else-if="!getMessage().isRecording"
    :actions="actions"
    :mode="'hover'"
    :menu-side="'top'"
    :disabled="!canUploadFile || state == 'disabled'"
    @click="triggerFileUpload"
    @button-click="triggerFileUploadDefault"
  > -->
  <span 
    ref="triggerElement"
    class="file-uploader__trigger"
    :class="{'file-uploader__disabled' : !canUploadFile || state == 'disabled'}"
    :disabled="!canUploadFile || state == 'disabled'"
    @click="triggerFileUploadDefault"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <FileUploaderIcon :fill="currentIconColor" />
  </span>
  <!-- </ButtonContextMenu> -->
  <input
    ref="fileInput"
    style="display: none;"
    type="file"
    multiple
    @change="onFileSelected"
  >
</template>

<script setup lang="ts">
import { ref, computed, inject, unref, onMounted, onUnmounted, watch, watchEffect, type ComputedRef } from "vue";
import { useMessageDraft, uploadFile, buildFilePreview, getDraftFiles, MAX_ATTACHED_FILES } from '@/hooks';
import { FileUploaderIcon } from "./icons";

const props = defineProps({
  filebumpUrl: {
    type: String,
    default: '',
  },
  state:{
    type: String,
    default: 'active',
  },
  maxAttachedFiles: {
    type: Number,
    default: undefined,
  },
});

const uploadStatus = ref("");

const fileInput = ref<HTMLInputElement>();
const triggerElement = ref<HTMLElement>()
void triggerElement.value

const chatAppId = inject('chatAppId')
const injectedMaxAttachedFiles = inject<number | ComputedRef<number>>('maxAttachedFiles', MAX_ATTACHED_FILES)
const { addMessageFiles, getMessage, setRecordingMessage } = useMessageDraft(chatAppId as string)

const maxAttachedFiles = computed(() => {
  const fromProp = props.maxAttachedFiles
  if (typeof fromProp === 'number' && fromProp > 0) return Math.floor(fromProp)
  const injected = unref(injectedMaxAttachedFiles)
  if (typeof injected === 'number' && injected > 0) return Math.floor(injected)
  return MAX_ATTACHED_FILES
})

const iconFillColor = ref('#5F5F5F');
const iconHoverColor = ref('#404040');
const isHovered = ref(false);
let themeObserver: MutationObserver | null = null;

const updateIconColor = () => {
  if (!chatAppId) {
    iconFillColor.value = '#5F5F5F';
    iconHoverColor.value = '#404040';
    return;
  }
  const element = document.getElementById(chatAppId as string);
  if (!element) {
    iconFillColor.value = '#5F5F5F';
    iconHoverColor.value = '#404040';
    return;
  }
  const computedStyle = window.getComputedStyle(element);
  const color = computedStyle.getPropertyValue('--chotto-fileuploader-trigger-color').trim();
  const hoverColor = computedStyle.getPropertyValue('--chotto-fileuploader-trigger-hover-color').trim();
  iconFillColor.value = color || '#5F5F5F';
  iconHoverColor.value = hoverColor || '#404040';
};

const currentIconColor = computed(() => {
  return isHovered.value ? iconHoverColor.value : iconFillColor.value;
});

watchEffect(() => {
  updateIconColor();
})

// const actions = [
//   {
//     action: 'audio/*',
//     title: 'Аудио',
//     prime: 'headphones',
//   },
//   {
//     action: 'image/*',
//     title: 'Фото',
//     prime: 'image',
//   },
//   {
//     action: 'video/*',
//     title: 'Видео',
//     prime: 'video',
//   },
//   {
//     action: '',
//     title: 'Файл',
//     prime: 'file',
//   },
// ]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["fileUploaded"]);

const canUploadFile = computed(() => {
  return getDraftFiles(getMessage()).length < maxAttachedFiles.value;
})

const resetNativeFileInput = () => {
  // Без сброса value браузер не всегда триггерит change при повторном выборе того же файла
  if (fileInput.value) fileInput.value.value = '';
};

const remainingSlots = () => maxAttachedFiles.value - getDraftFiles(getMessage()).length

const uploadAndAttach = async (files: File[]) => {
  const batch = files.slice(0, Math.max(0, remainingSlots()))
  if (!batch.length) return

  uploadStatus.value = "uploading";
  setRecordingMessage(true)
  try {
    const uploaded = []
    for (const file of batch) {
      const data = await uploadFile(
        typeof props.filebumpUrl == 'string' ? props.filebumpUrl : null,
        file,
      )
      if (data.status == 'success') {
        uploaded.push({
          url: data.url,
          name: data.name,
          size: data.size,
          type: data.type,
          preview: buildFilePreview(data.name, data.preview),
        })
      } else {
        uploadStatus.value = 'error'
      }
    }
    if (uploaded.length) {
      addMessageFiles(uploaded, maxAttachedFiles.value)
      if (uploadStatus.value !== 'error') uploadStatus.value = 'success'
    } else if (uploadStatus.value !== 'error') {
      uploadStatus.value = 'error'
    }
  } finally {
    setRecordingMessage(false)
  }
}

const onFileSelected = async () => {
  const selected = fileInput.value?.files
  const files = selected ? Array.from(selected) : []
  resetNativeFileInput()
  await uploadAndAttach(files)
};

// const triggerFileUpload = (action: Record<string, unknown>) => {
//   if (fileInput.value && canUploadFile) {
//     fileInput.value.accept = action.action as string
//     fileInput.value.click();
//   }
// };

const triggerFileUploadDefault = () => {
  if (fileInput.value && canUploadFile.value && props.state == 'active') {
    resetNativeFileInput()
    fileInput.value.click();
  }
};

const pasteFromClipboard = async (event: ClipboardEvent) => {
  if (!canUploadFile.value || props.state !== 'active') return
  const items = event.clipboardData?.items
  if (!items) return

  const images: File[] = []
  for (const item of items) {
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile()
      if (file) images.push(file)
    }
  }
  if (!images.length) return

  event.preventDefault()
  await uploadAndAttach(images)
}

watch(
  () => getDraftFiles(getMessage()).length,
  (count) => {
    if (!count) {
      uploadStatus.value = ""
      resetNativeFileInput()
    }
  }
)

onMounted(() => {
  window.addEventListener('paste', pasteFromClipboard)
  
  // Принудительно обновляем цвет после монтирования
  updateIconColor();
  
  // Настраиваем MutationObserver для отслеживания изменений темы
  if (chatAppId) {
    const element = document.getElementById(chatAppId as string);
    if (element) {
      themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            updateIconColor();
          }
        });
      });
      
      themeObserver.observe(element, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('paste', pasteFromClipboard);
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
})


</script>

<style
  scoped
  lang="scss"
>
@use './styles/FileUploader.scss';
</style>
