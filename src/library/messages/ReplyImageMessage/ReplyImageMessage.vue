<template>
  <div
    class="reply-image-message__preview-button"
    @click="isOpenModal = true"
  >
    <img
      class="reply-image-message__preview-image"
      :src="message.url"
      :alt="message.alt"
    />
  </div>

  <div class="reply-image-message__title">
    <p v-if="message.header">
      {{ message.header }}
    </p>

    <div class="reply-image-message__description">
      <span class="pi pi-camera" />
      <p>Фотография</p>
    </div>

    <p
      v-if="message.text"
      class="reply-image-message__text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>

  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        @close="closeModal"
      >
        <img
          class="reply-image-message__modal-image"
          :src="message.url"
          :alt="message.alt"
        />
      </ModalFullscreen>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import linkifyStr from 'linkify-string'
import { IImageMessage } from '../../../types'
import { ModalFullscreen } from '../../modals'

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
    required: true,
  },
})

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
