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
import { IFilePreview } from '@/types'
import { ModalFullscreen } from '@/components';
import { useTheme } from '@/hooks';

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

const formatTime = (time: number) => {
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
@use './styles/FilePreview.scss';
</style>
