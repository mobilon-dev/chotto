<template>
  <div 
    v-if="uploadStatus !== 'success'"
    class="attachment-section" 
    :class="{'attachment-section__error' : error}"
    @click="triggerFileUpload" 
  >
    <input 
      id="file-upload" 
      ref="fileInput" 
      type="file"
      style="display: none;" 
      :accept="fileInfo[type as keyof typeof fileInfo].accept"
      @change="handleFileChange" 
    >
    <span
      class="pi pi-paperclip attachment-section__icon" 
    />
    <div>
      <p class="attachment-section__title">
        Прикрепить файл 
      </p>
      <p class="attachment-section__info">
        {{ fileInfo[type as keyof typeof fileInfo].text }}
      </p>
    </div>
  </div>
  <FilePreview
    v-else-if="uploadStatus === 'success' && preview"
    :file-info="preview"
    @reset="handleFileDecline"
  />
  <div 
    v-if="error" 
    class="attachment-section__error-text"
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { unref, ref, watch, inject } from "vue";
import { FilePreview } from '@/components';
import { uploadFile } from '@/hooks';
import { IFilePreview } from "@/types";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  templateId: {
    type: String,
    required: true,
  },
});

const filebumpUrl = ref<string | undefined>(inject('filebumpUrl'))
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement>();
const error = ref('')
const uploadStatus = ref('')
const preview = ref<IFilePreview>()

const emit = defineEmits(['fileSelected']);

const triggerFileUpload = () => {
  if (fileInput.value && uploadStatus.value != 'success') {
    fileInput.value.click();
  }
};

const fileInfo = {
  'DOCUMENT':
  {
    text: 'Документ до 100 МБ', 
    accept: '.pdf,.doc,.docx,.xls,.xlsx', 
    maxSize: 104857600, 
    error: 'Некорректный тип файла, выберите PDF, DOC или XLS', 
    icon: 'pi pi-file',
  },
  'IMAGE':
  {
    text: 'Изображение до 5 МБ',
    accept: '.jpg,.jpeg,.png', 
    maxSize: 5242880, 
    error: 'Некорректный тип файла, выберите JPG, JPEG или PNG', 
    icon: 'pi pi-image',
  },
  'VIDEO': 
  {
    text: 'Видео до 16 МБ',
    accept: '.mp4,.mov', 
    maxSize: 16777216, 
    error: 'Некорректный тип файла, выберите MP4 или MOV', 
    icon: 'pi pi-video',
  },
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    error.value = ''
    const ext = file.name.split('.')
    const hasExt = fileInfo[props.type as keyof typeof fileInfo].accept.indexOf(ext[ext.length - 1])
    if (hasExt == -1){
      error.value = fileInfo[props.type as keyof typeof fileInfo].error
    } 
    else if (file.size > fileInfo[props.type as keyof typeof fileInfo].maxSize){
      error.value = 'Файл слишком большого размера'
    }
    else if (!error.value){
      selectedFile.value = file
      uploadStatus.value = "uploading";
      const f = unref(filebumpUrl.value)
      uploadFile(typeof f == 'string' ? f : null, file)
      .then((data) => {
        uploadStatus.value = data.status
        if (data.status == 'success'){
          emit('fileSelected',{
            url: data.url,
            filename: data.name,
            filesize: data.size,
            filetype: data.type,
          })
          if (data.preview)
          preview.value = ({
            previewUrl: data.preview.previewUrl,
            isImage: data.preview.isImage,
            isVideo: data.preview.isVideo,
            isAudio: data.preview.isAudio,
            fileName: data.name,
            fileSize: data.preview.fileSize,
          })
        }
      })
    }
  }
};

const handleFileDecline = () => {
  if (selectedFile.value) {
    selectedFile.value = null
    uploadStatus.value = ''
  }
}

watch(
  () => uploadStatus.value,
  (newStatus) => {
    if (newStatus === '') {
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      selectedFile.value = null
      emit('fileSelected',null)
    }
  }
);

watch(
  () => props.templateId,
  () => {
    uploadStatus.value = ''
  }
)
</script>

<style scoped lang="scss">
@use './styles/WABAAttachmentSection.scss';
</style>