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
    <div class="video-recorder__status">
      <span>Загрузка файла...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useMessageDraft, uploadFile, useModalVideoRecorder, useTheme, buildFilePreview } from '@/hooks';

const chatAppId = inject('chatAppId')
const { getMessage, setMessageFile, setRecordingMessage } = useMessageDraft(chatAppId as string)
const { getTheme } = useTheme(chatAppId as string)

const uploadStatus = ref("");

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
                preview: buildFilePreview(u.name, u.preview),
              })
            }
          })
      }
    })
  }
}

</script>

<style
  scoped
  lang="scss"
>
@use './styles/VideoRecorder.scss';
</style>
