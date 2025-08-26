<template>
  <div
    class="reply-video-message__preview-button"
    @click="isOpenModal = true"
  >
    <video
      class="reply-video-message__video"
      :src="message.url"
      :muted="true"
    />
  </div>

  <div class="reply-video-message__title">
    <p v-if="message.header">
      {{ message.header }}
    </p>

    <div class="reply-video-message__description">
      <span class="pi pi-video" />
      <p>Видео</p>
    </div>

    <p
      v-if="message.text"
      class="reply-video-message__text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>
  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
        @close="closeModal"
      >
        <video
          ref="player"
          class="reply-video-message__modal-video"
          :src="message.url"
          :alt="message.alt"
          controls
          autoplay
        />
      </ModalFullscreen>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import linkifyStr from 'linkify-string'
import { IVideoMessage } from '../../../types'
import { ModalFullscreen } from '../../modals'

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
    required: true,
  },
})

const player = ref<HTMLVideoElement | null>()
const isOpenModal = ref(false)
const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
  },
  { immediate: true }
)

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href) window.open(event.target.href, '_blank')
}

const closeModal = () => (isOpenModal.value = false)
</script>

<style scoped>
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
