<template>
  <div class="video-message__preview-button" @click="isOpenModal = true">
    <video class="video-message__video" :src="message.url" :muted="true" />
  </div>

  <div class="video-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="video-message__reply-description">
      <span class="pi pi-video" />
      <p>Видео</p>
    </div>
    <p v-if="message.text" class="video-message__text" @click="inNewWindow" v-html="linkedText" />
  </div>
  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        @close="closeModal"
      >
        <video
          ref="player"
          class="video-message__modal-video"
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
  import { ref, watch, inject } from 'vue'
  import linkifyStr from 'linkify-string'
  import { IVideoMessage } from '../../types'
  import ModalFullscreen from '../modals/modal-wrapper/ModalFullscreen.vue'
  import { useTheme } from '../../helpers'

  const chatAppId = inject('chatAppId')

  const { getTheme } = useTheme(chatAppId as string)

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

<style scoped lang="scss">
  p {
    margin: 0;
    font-size: var(--chotto-additional-text-font-size);
    color: var(--chotto-secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .video-message {
    &__video {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      object-fit: cover;
      cursor: zoom-in;
      margin: auto;
    }

    &__preview-button {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    &__text-container {
      word-wrap: break-word;
      align-content: center;
      word-break: break-word;
    }

    &__text {
      margin-top: 8px;
      font-size: var(--chotto-text-font-size);
      color: var(--chotto-primary-text-color);
    }

    &__reply-description {
      display: flex;
      align-items: center;
      column-gap: 6px;
      margin-bottom: 4px;

      span {
        color: var(--chotto-secondary-text-color);
      }
    }

    &__modal-video {
      width: 100%;
      height: 100%;
      max-height: 60%;
      object-fit: cover;
      border-radius: 5px;
      max-height: 80vh;
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
