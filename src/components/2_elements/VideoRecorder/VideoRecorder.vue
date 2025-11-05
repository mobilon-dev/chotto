<template>
  <div 
    v-if="!getMessage().isRecording"
    class="video-recorder__container"
  >
    <button
      v-if="uploadStatus != 'uploading'"
      class="video-recorder__button"
      :class="{'video-recorder__button-disabled' : state == 'disabled' || getMessage().file}"
      @click="openVideoRecorder"
    >
      <span class="pi pi-video" />
    </button>
  </div>
  <div 
    v-if="uploadStatus === 'uploading'"
    class="video-recorder__container"
  >
    <p>Загрузка файла...</p>
  </div>
  <teleport
    v-if="getMessage().file"
    :to="'#chat-input-file-line-'+chatAppId"
  >
    <FilePreview
      v-if="videoPreview"
      :file-info="videoPreview"
      @reset="resetRecordedAudio"
    />
  </teleport>
</template>

<script setup lang="ts">
import { watch, ref, inject } from 'vue';
import { useMessageDraft, uploadFile, useModalVideoRecorder, useTheme } from '@/hooks';
import { FilePreview } from '@/components';
import { IFilePreview } from '@/types';

const chatAppId = inject('chatAppId')
const { getMessage, setMessageFile, setRecordingMessage, resetMessageFile } = useMessageDraft(chatAppId as string)
const { getTheme } = useTheme(chatAppId as string)

const uploadStatus = ref("");
const videoPreview = ref<IFilePreview>()

const props = defineProps({
  state:{
    type: String,
    default: 'active',
  },
  filebumpUrl: {
    type: String,
    default: null,
  },
})

const openVideoRecorder = async () => {
  if (!getMessage().file && props.state == 'active'){
    const theme = getTheme().theme ? getTheme().theme : ''
    await useModalVideoRecorder(theme)
    .then(async (data) => {
      if (data.videoFile){
        uploadStatus.value = 'uploading'
        setRecordingMessage(true)
        await uploadFile(props.filebumpUrl, data.videoFile as File)
          .then((u) => {
            setRecordingMessage(false)
            uploadStatus.value = u.status
            if (u.status == 'success'){
              setMessageFile({
                url: u.url,
                name: u.name,
                size: u.size,
                type: u.type,
              })
              const previewContainer = document.getElementById('chat-input-file-line-'+chatAppId)
              if (previewContainer){
                previewContainer.style.display = 'inherit'
              }
              if (u.preview)
                videoPreview.value = ({
                  previewUrl: u.preview.previewUrl,
                  isImage: u.preview.isImage,
                  isVideo: u.preview.isVideo,
                  isAudio: u.preview.isAudio,
                  fileName: u.name,
                  fileSize: u.preview.fileSize,
                })
              
            }
          })
      }
    })
  }
}

const resetRecordedAudio = () => {
  resetMessageFile()
  const previewContainer = document.getElementById('chat-input-file-line-'+chatAppId)
  if (previewContainer){
    previewContainer.style.display = 'none'
  }
  videoPreview.value = undefined
}

watch(
  () => getMessage().file,
  () => {
    if (!getMessage().file) videoPreview.value = undefined
  }
);

</script>

<style
  scoped
  lang="scss"
>
@use './styles/VideoRecorder.scss';
</style>
