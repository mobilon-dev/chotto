<template>
  <div
    class="video-message"
    :class="[getClass(message), applyStyle(message)]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="video-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    />

    <p v-if="message.subText" class="video-message__subtext">
      {{ message.subText }}
    </p>

    <div class="video-message__content">
      <BaseReplyMessage
        v-if="message.reply"
        style="margin: 10px 10px 4px 16px"
        :class="message.position"
        :message="message.reply"
        @reply="handleClickReplied"
      />
      <div
        class="video-message__preview-button"
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
      >
        <video
          ref="previewPlayer"
          class="video-message__video"
          :style="{ borderRadius: videoBorderRadius }"
          :src="message.url"
          :muted="true"
          autoplay
          @ended="playAgain"
        />

        <transition name="modal-fade">
          <div v-if="buttonDownloadVisible" class="video-message__info-container">
            <div v-if="message.views" class="video-message__views" @click.stop="viewsAction">
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>

            <span class="video-message__time">{{ message.time }}</span>

            <div
              v-if="
                getClass(message) === 'video-message__right' && statuses.includes(message.status)
              "
              class="video-message__status"
              :class="status"
            >
              <span v-if="message.status !== 'sent'" class="pi pi-check" />
              <span class="pi pi-check" />
            </div>
          </div>
        </transition>

        <transition name="modal-fade">
          <a
            v-if="buttonDownloadVisible"
            class="video-message__download-button"
            :href="message.url"
            download
            target="_blank"
            @click.stop="() => '//Предотвращаем всплытие события клика'"
          >
            <span class="pi pi-download" />
          </a>
        </transition>
      </div>

      <transition name="modal-fade">
        <button
          v-if="buttonMenuVisible && message.actions"
          class="video-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>

      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="video-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <div v-if="message.text" class="video-message__text-container">
        <p @click="inNewWindow" v-html="linkedText" />
      </div>

      <LinkPreview
        v-if="message.linkPreview"
        class="video-message__link-preview"
        :class="message.position"
        :link-preview="message.linkPreview"
      />

      <EmbedPreview v-if="message.embed" :class="message.position" :embed="message.embed" />
    </div>
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
  import { ref, computed, watch, inject } from 'vue'
  import linkifyStr from 'linkify-string'

  import { ContextMenu } from '../components'
  import { getStatus, statuses } from '../../helpers'
  import { IVideoMessage } from '../../types'
  import BaseReplyMessage from './BaseReplyMessage.vue'
  import LinkPreview from './LinkPreview.vue'
  import EmbedPreview from './EmbedPreview.vue'
  import ModalFullscreen from '../modals/modal-wrapper/ModalFullscreen.vue'
  import { useTheme } from '../../helpers'

  const chatAppId = inject('chatAppId')

  const { getTheme } = useTheme(chatAppId as string)

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps({
    message: {
      type: Object as () => IVideoMessage,
      required: true,
    },
    applyStyle: {
      type: Function,
      default: () => {
        return null
      },
    },
  })

  const emit = defineEmits(['action', 'reply'])

  const handleClickReplied = (messageId) => {
    emit('reply', messageId)
  }

  function getClass(message) {
    return message.position === 'left' ? 'video-message__left' : 'video-message__right'
  }

  const player = ref<HTMLVideoElement | null>()
  const previewPlayer = ref<HTMLVideoElement | null>()
  // const isPlaying = ref(false);
  // const audioDuration = ref(0);
  // const currentTime = ref(0)

  const isOpenModal = ref(false)
  const isOpenMenu = ref(false)
  const buttonMenuVisible = ref(false)
  const buttonDownloadVisible = ref(false)
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

  const viewsAction = () => {
    emit('action', { messageId: props.message.messageId, type: 'views' })
  }

  const clickAction = () => {}

  const showMenu = () => {
    buttonMenuVisible.value = true
    buttonDownloadVisible.value = true
  }

  const hideMenu = () => {
    buttonMenuVisible.value = false
    isOpenMenu.value = false
  }

  const status = computed(() => getStatus(props.message.status))

  const playAgain = () => {
    if (previewPlayer.value) {
      previewPlayer.value.currentTime = 0
      previewPlayer.value.play()
    }
  }

  watch([player, previewPlayer], ([playerVal, previewVal]) => {
    if (playerVal) {
      if (previewVal) {
        previewVal.pause()
        previewVal.currentTime = 0
      }
    } else if (previewVal) {
      previewVal.play()
      previewVal.currentTime = 0
    }
  })

  const videoBorderRadius = computed(() => {
    if (props.message.reply && props.message.text) return '0'
    if (props.message.text) return '8px 8px 0 0'
    if (props.message.reply) return '0 0 8px 8px'
    return '8px'
  })

  const closeModal = () => (isOpenModal.value = false)
</script>

<style scoped lang="scss">
  .video-message {
    &__content {
      position: relative;
      max-width: 40%;
      border-radius: 14px;
    }

    &__info-container {
      position: absolute;
      bottom: 4px;
      right: 8px;
      display: flex;
      align-items: center;
      column-gap: 4px;
      border-radius: 12px;
      padding: 6px 10px;
      background-color: var(--chotto-message-popup-info-bg-color);
      color: var(--chotto-message-popup-info-color);
    }

    &__download-button {
      position: absolute;
      left: 8px;
      bottom: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 12px;
      padding: 6px 6px;
      background-color: var(--chotto-message-popup-info-bg-color);
      cursor: pointer;

      span {
        color: var(--chotto-message-popup-info-color);
        font-size: var(--chotto-small-text-icon-size);
      }
    }

    &__views {
      display: flex;
      align-items: center;
      column-gap: 4px;

      span {
        font-size: var(--chotto-small-text-icon-size);
      }

      p {
        font-size: var(--chotto-small-text-font-size);
      }
    }

    &__time {
      font-size: var(--chotto-small-text-font-size);
    }

    &__status {
      display: flex;

      span {
        font-size: var(--chotto-small-text-icon-size);
      }
    }

    .status--received {
      span {
        &:first-child {
          margin-right: -8px;
        }
      }
    }

    .status--read {
      span {
        color: var(--chotto-status-color-read);

        &:first-child {
          margin-right: -8px;
        }
      }
    }

    &__avatar {
      grid-row: 1 / -1;
      align-self: end;
      margin-bottom: 6px;
      object-fit: cover;
      min-width: var(--chotto-avatar-small);
      min-height: var(--chotto-avatar-small);
      border-radius: var(--chotto-avatar-border-radius);
    }

    &__video {
      object-fit: cover;
      width: 100%;
      max-height: 500px;
      cursor: zoom-in;
    }

    &__time {
      font-size: var(--chotto-small-text-font-size);
    }

    &__subtext {
      font-size: var(--chotto-additional-text-font-size);
      color: var(--chotto-secondary-text-color);
    }

    &__preview-button {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    &__menu-button {
      position: absolute;
      background-color: transparent;
      border: none;
      transform: translateY(-50%);
      cursor: pointer;
      transition: 0.2s;

      span {
        color: var(--chotto-button-color-active);
        font-size: var(--chotto-button-icon-size);
      }

      &:hover span {
        color: var(--chotto-button-color-hover);
        transition: 0.2s;
      }
    }

    &__context-menu {
      position: absolute;
    }

    &__text-container {
      padding: 6px 10px 6px 10px;
      border-radius: 0 0 8px 8px;
      word-wrap: break-word;
      max-width: 25rem;

      p {
        white-space: pre-wrap;
        font-size: var(--chotto-text-font-size);
      }
    }

    &__link-preview {
      margin: 8px;
    }

    &__left,
    &__right {
      display: grid;
      grid-template-rows: min-content 1fr min-content;
      margin: var(--chotto-message-margin);
    }

    &__left {
      grid-template-columns: min-content 1fr;

      .video-message__avatar {
        grid-column: 1;
        margin-right: 12px;
      }

      .video-message__subtext {
        grid-column: 2;
        grid-row: 1;
        margin: 0 0 2px 10px;
      }

      .video-message__content {
        grid-column: 2;
        background-color: var(--chotto-message-left-bg);
      }

      .video-message__text-container {
        grid-column: 2;
      }

      .video-message__menu-button {
        top: 50%;
        right: -40px;
      }

      .video-message__context-menu {
        top: 50%;
        left: 100%;
        margin-top: 20px;
      }
    }

    &__right {
      grid-template-columns: 1fr min-content;

      .video-message__avatar {
        grid-column: 2;
        margin-left: 12px;
      }

      .video-message__subtext {
        grid-column: 1;
        grid-row: 1;
        margin: 0 10px 2px auto;
      }

      .video-message__content {
        grid-column: 1;
        margin-left: auto;
        background-color: var(--chotto-message-right-bg);
      }

      .video-message__text-container {
        grid-column: 1;
        margin-left: auto;
      }

      .video-message__menu-button {
        top: 50%;
        left: -40px;
      }

      .video-message__context-menu {
        top: 50%;
        right: 100%;
        margin-top: 20px;
      }
    }

    &__modal-video {
      /*width: 100%;*/
      height: 100%;
      object-fit: contain;
      border-radius: 5px;
      max-height: 90vh;
      max-width: 95vw;
    }
  }

  .context-menu-enter-active {
    transition: all 0.1s ease-out;
  }

  .context-menu-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .context-menu-enter-from,
  .context-menu-leave-to {
    transform: scale(0.9);
    opacity: 0;
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
