<template>
  <div class="preview__container">
    <div class="preview__block">
      <div 
        v-if="fileInfo.isImage" 
        style="position: relative;"
        @click="isOpenModal = true"
      >
        <img
          :src="fileInfo.previewUrl"
          alt="Image Preview"
          class="preview__image"
        >
        <div class="preview__shadow">
          <span class="pi pi-plus-circle" />
        </div>
      </div>
      <div 
        v-else-if="fileInfo.isVideo"
        style="position: relative;"
        @click="isOpenModal = true"
      >
        <video
          ref="video"
          :src="fileInfo.previewUrl"
          class="preview__video"
        />
        <div class="preview__shadow">
          <span class="pi pi-play" />
        </div>
      </div>
      <div 
        v-else-if="fileInfo.isAudio" 
        style="display: flex; gap: 5px"
      >
        <span
          class="pi pi-headphones"
          style="font-size: 1rem; margin: auto;"
        />
        <audio
          ref="audio"
          :src="fileInfo.previewUrl"
        />
        <button
          class="preview__audio-control"
          @click="togglePlayPause"
        >
          <span
            v-show="!isPlaying"
            class="pi pi-play"
          />
          <span
            v-show="isPlaying"
            class="pi pi-pause"
          />
        </button>
      </div>
      <div v-else>
        <span
          class="pi pi-file"
          style="font-size: 2.5rem"
        />
      </div>
    </div>
    <div class="preview__control-block">
      <div class="preview__information">
        <span class="preview__name">{{ fileInfo.fileName }}</span>
        <span
          v-if="!fileInfo.isAudio && !fileInfo.isVideo"
          class="preview__size"
        >{{ fileInfo.fileSize }}</span>
        <span
          v-if="fileInfo.isAudio"
          class="preview__audio-time"
        >
          {{ `${formatCurrentTime} / ${formatDuration}` }}
        </span>
        <span
          v-if="fileInfo.isVideo"
          class="preview__audio-time"
        >
          {{ formatDuration }}
        </span>
      </div>
      <div class="preview__reset">
        <span
          class="pi pi-times"
          @click="emit('reset')"
        />
      </div>
    </div>
    <Teleport to="body">
      <transition name="modal-fade">
        <ModalFullscreen
          v-if="isOpenModal"
          :theme="getTheme().theme ? getTheme().theme : ''"
          @close="closeModal"
        >
          <video
            v-if="fileInfo.isVideo"
            class="preview__modal-video"
            
            :src="fileInfo.previewUrl"
            controls
            autoplay
          />
          <img
            v-if="fileInfo.isImage"
            class="preview__modal-image"
            :src="fileInfo.previewUrl"
            alt="Image Preview"
          >
        </ModalFullscreen>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, inject } from 'vue';
import { IFilePreview } from '../../../types'
import ModalFullscreen from '../../modals/modal-wrapper/ModalFullscreen.vue';
  import { useTheme } from '../../../helpers'

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

defineProps({
  fileInfo: {
    type: Object as () => IFilePreview,
    required: true,
  }
});

const emit = defineEmits(["reset"]);

const audio = ref<HTMLAudioElement>()
const video = ref<HTMLVideoElement>()
const isPlaying = ref(false)
const duration = ref(0);
const currentTime = ref(0)
const isOpenModal = ref(false);

const closeModal = () => isOpenModal.value = false

function togglePlayPause() {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const formatCurrentTime = computed(() => {
  if (audio.value) {
    return formatTime(currentTime.value)
  }
  return '0:00';
});

const formatDuration = computed(() => {
  if (audio.value || video.value) {
    return formatTime(duration.value)
  }
  return '0:00';
});

onMounted(() => {
  if (audio.value != null) {
    audio.value.addEventListener('loadedmetadata', () => {
      if (audio.value != null) {
        if (audio.value.duration == Infinity || Number.isNaN(audio.value.duration)){
          audio.value.currentTime = 1e101;
          audio.value.addEventListener("timeupdate", () => {
            if (audio.value){
              audio.value.currentTime = 0;
              duration.value = audio.value.duration
            }
          }, { once: true });
        }
      }
      duration.value = audio.value != null ? audio.value.duration : 0;
    });
    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value != null ? audio.value.currentTime : 0;
    });
  }
  if (video.value){
    video.value.addEventListener('loadedmetadata', () => {
      if (video.value){
        duration.value = video.value.duration
        if (video.value.duration == Infinity || Number.isNaN(video.value.duration)){
          video.value.currentTime = 1e101;
          video.value.addEventListener("timeupdate", () => {
            if (video.value){
              video.value.currentTime = 0;
              duration.value = video.value.duration
            }
          }, { once: true });
        }
      }
    })
  }
});

</script>

<style scoped lang="scss">
.preview {
  &__container{
    position: relative;
    display: flex;
    border:  1px solid var(--chotto-item-border-color);
  }

  &__image,
  &__video{
    max-width: 130px;
    max-height: 130px;
  }
  &__modal-video, &__modal-image {
    /*width: 100%;*/
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
    max-height: 90vh;
    max-width: 90vw;
  }

  &__shadow{
    display: none;
  }

  &__block:hover &__shadow{
    display: inherit;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
    span{
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      color: white;
    }
  }

  &__audio-control{
    border: none;
    cursor: pointer;
    position: relative;
    grid-row: 1 / 3;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--chotto-message-type-icon-bg-color);

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-message-type-icon-color);
    }
  }

  &__block {
    --chotto-file-preview-resolution: 60px;
    max-width: var(--chotto-file-preview-resolution);
    max-height: var(--chotto-file-preview-resolution);
    min-width: var(--chotto-file-preview-resolution);
    min-height: var(--chotto-file-preview-resolution);
    margin: 5px;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__information {
    margin-left: 5px;
    display: grid;
    span{
      display: flex;
      font-size: small;
    }
  }

  &__name {
    align-items:end;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    text-overflow: ellipsis;
  }

  &__reset{
    display: flex;
    margin-right: 10px;
    font-size: 1.1rem;
    span{
      margin: auto;
    }
  }

  &__reset:hover {
    cursor: pointer;
  }

  &__control-block{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
