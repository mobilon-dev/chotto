<template>
  <div 
    v-if="uploadStatus !== 'success'"
    class="attachment-section" 
    :class="{'attachment-section__error' : error}"
    @click="triggerFileUpload" 
  >
    <input 
      type="file" 
      id="file-upload" 
      ref="fileInput"
      style="display: none;" 
      :accept="fileInfo[type].accept"
      @change="handleFileChange" 
    >
    <span
      class="pi pi-paperclip attachment-section__icon" 
    />
    <div>
      <p class="attachment-section__title open-sans-bold">
        Прикрепить файл 
      </p>
      <p class="attachment-section__info open-sans">
        {{ fileInfo[type].text }}
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
import FilePreview from "./FilePreview.vue";
import { uploadFile } from "../../helpers/uploadFile";
import { IFilePreview } from "../../types";
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

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    error.value = ''
    const ext = file.name.split('.')
    const hasExt = fileInfo[props.type].accept.indexOf(ext[ext.length - 1])
    if (hasExt == -1){
      error.value = fileInfo[props.type].error
    } 
    else if (file.size > fileInfo[props.type].maxSize){
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

.attachment-section {
  position: relative;
  display: flex;

  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 5px;
  background-color: var(--attachment-section-color);

  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;

  &__error{
    border: var(--attachment-section-error-border);
  }

  &__icon{
    padding-left: 10px;
    color: var(--attachment-section-title-color);

  }

  &__title{
    font-size: var(--attachment-section-title-font-size);
    color: var(--attachment-section-title-color);
    font-weight: var(--attachment-section-title-font-weight);
  }

  &__info{
    margin-top: 1px;
    color: var(--attachment-section-info-color);
    font-size: var(--attachment-section-info-font-size);
    word-break: break-word;
    font-weight: var(--attachment-section-info-font-weight);
  }

  &__error-text{
    color: var(--attachment-section-error-color);
    margin-left: 5px;
    font-size: var(--attachment-section-error-font-size);
  }
}

.attachment-section:hover {
  cursor: pointer;
  background-color: var(--attachment-section-hover-color);
}

</style>