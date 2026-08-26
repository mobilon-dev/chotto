<template>
  <div class="preview">
    <div
      v-if="hasVisualPreview"
      class="preview__thumb"
      @click="isOpenModal = true"
    >
      <img
        v-if="fileInfo.isImage"
        :src="fileInfo.previewUrl"
        :alt="fileInfo.fileName"
        class="preview__thumb-media"
      >
      <video
        v-else-if="fileInfo.isVideo"
        :src="fileInfo.previewUrl"
        class="preview__thumb-media"
        muted
        playsinline
        preload="metadata"
        @loadedmetadata="showVideoFrame"
      />
      <span
        v-if="fileInfo.isVideo"
        class="pi pi-play preview__thumb-play"
      />
    </div>
    <span
      v-else
      class="pi pi-file preview__icon"
    />
    <div class="preview__info">
      <span
        class="preview__name"
        :title="fileInfo.fileName"
      >{{ fileInfo.fileName }}</span>
      <span
        v-if="fileInfo.fileSize"
        class="preview__size"
      >{{ fileInfo.fileSize }}</span>
    </div>
    <button
      type="button"
      class="preview__reset"
      :aria-label="fileInfo.fileName"
      @click="emit('reset')"
    >
      <span class="pi pi-times" />
    </button>
    <Teleport to="body">
      <transition name="modal-fade">
        <ModalFullscreen
          v-if="isOpenModal"
          :theme="getTheme().theme ? getTheme().theme : 'light'"
          :title="fileInfo.fileName"
          @close="closeModal"
        >
          <video
            v-if="fileInfo.isVideo"
            class="preview__modal-video"
            :src="fileInfo.previewUrl"
            controls
            autoplay
            playsinline
          />
          <img
            v-if="fileInfo.isImage"
            class="preview__modal-image"
            :src="fileInfo.previewUrl"
            :alt="fileInfo.fileName"
          >
        </ModalFullscreen>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { IFilePreview } from '@/types'
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue'
import { useTheme } from '@/hooks'

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  fileInfo: {
    type: Object as () => IFilePreview,
    required: true,
  }
});

const emit = defineEmits(["reset"]);

const isOpenModal = ref(false)

const hasVisualPreview = computed(() =>
  Boolean(props.fileInfo.previewUrl) && (props.fileInfo.isImage || props.fileInfo.isVideo)
)

function closeModal() {
  isOpenModal.value = false
}

function showVideoFrame(event: Event) {
  const video = event.target as HTMLVideoElement
  if (video.currentTime === 0) video.currentTime = 0.1
}
</script>

<style scoped lang="scss">
@use './styles/FilePreview.scss';
</style>

<style lang="scss">
.preview__modal-video,
.preview__modal-image {
  display: var(--chotto-filepreview-modal-display, block);
  width: var(--chotto-filepreview-modal-width, 100%);
  height: var(--chotto-filepreview-modal-height, auto);
  object-fit: var(--chotto-filepreview-modal-object-fit, contain);
  border-radius: var(--chotto-filepreview-modal-border-radius, 5px);
  max-height: var(--chotto-filepreview-modal-max-height, calc(90vh - 80px));
  max-width: var(--chotto-filepreview-modal-max-width, calc(95vw - 64px));
}
</style>
