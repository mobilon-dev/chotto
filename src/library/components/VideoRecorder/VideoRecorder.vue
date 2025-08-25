<template>
  <div v-if="!getMessage().isRecording" class="video-recorder__container">
    <button
      v-if="uploadStatus != 'uploading'"
      class="video-recorder__button"
      :class="{
        'video-recorder__button-disabled': state == 'disabled' || getMessage().file,
      }"
      @click="openVideoRecorder"
    >
      <span class="pi pi-video" />
    </button>
  </div>
  <div v-if="uploadStatus === 'uploading'" class="video-recorder__container">
    <p>Загрузка файла...</p>
  </div>
  <teleport v-if="getMessage().file" :to="'#chat-input-file-line-' + chatAppId">
    <FilePreview v-if="videoPreview" :file-info="videoPreview" @reset="resetRecordedAudio" />
  </teleport>
</template>

<script setup lang="ts">
  import { watch, ref, inject } from 'vue'
  import { useMessage } from '../../../helpers/useMessage'
  import { uploadFile } from '../../../helpers/uploadFile'
  import { useModalVideoRecorder } from '../../modals'
  import { FilePreview } from '../FilePreview'
  import { IFilePreview } from '../../../types'
  import { useTheme } from '../../../helpers'

  const chatAppId = inject('chatAppId')
  const { getMessage, setMessageFile, setRecordingMessage, resetMessageFile } = useMessage(
    chatAppId as string
  )
  const { getTheme } = useTheme(chatAppId as string)

  const uploadStatus = ref('')
  const videoPreview = ref<IFilePreview>()

  const props = defineProps({
    state: {
      type: String,
      default: 'active',
    },
    filebumpUrl: {
      type: String,
      default: null,
    },
  })

  const openVideoRecorder = async () => {
    if (!getMessage().file && props.state == 'active') {
      const theme = getTheme().theme ? getTheme().theme : ''
      await useModalVideoRecorder(theme).then(async (data) => {
        if (data.videoFile) {
          uploadStatus.value = 'uploading'
          setRecordingMessage(true)
          await uploadFile(props.filebumpUrl, data.videoFile).then((u) => {
            setRecordingMessage(false)
            uploadStatus.value = u.status
            if (u.status == 'success') {
              setMessageFile({
                url: u.url,
                name: u.name,
                size: u.size,
                type: u.type,
              })
              const previewContainer = document.getElementById('chat-input-file-line-' + chatAppId)
              if (previewContainer) {
                previewContainer.style.display = 'inherit'
              }
              if (u.preview)
                videoPreview.value = {
                  previewUrl: u.preview.previewUrl,
                  isImage: u.preview.isImage,
                  isVideo: u.preview.isVideo,
                  isAudio: u.preview.isAudio,
                  fileName: u.name,
                  fileSize: u.preview.fileSize,
                }
            }
          })
        }
      })
    }
  }

  const resetRecordedAudio = () => {
    resetMessageFile()
    const previewContainer = document.getElementById('chat-input-file-line-' + chatAppId)
    if (previewContainer) {
      previewContainer.style.display = 'none'
    }
    videoPreview.value = undefined
  }

  watch(
    () => getMessage().file,
    () => {
      if (!getMessage().file) videoPreview.value = undefined
    }
  )
</script>

<style scoped lang="scss">
  .video-recorder {
    &__container {
      position: relative;
      display: grid;
      align-items: center;
      background-color: transparent;
      height: fit-content;
    }

    &__button {
      background-color: transparent;
      border: 0px;

      span {
        display: block;
        cursor: pointer;
        padding: var(--chotto-chat-input-button-padding);
        font-size: var(--chotto-button-icon-size);
        color: var(--chotto-button-color-active);
      }
    }

    &__button:hover span {
      color: var(--chotto-button-color-hover);
    }

    &__button-disabled {
      pointer-events: none;
      span {
        cursor: auto;
        color: var(--chotto-button-color-disabled);
      }
    }
  }
</style>
