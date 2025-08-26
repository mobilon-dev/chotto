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

    <p
      v-if="message.subText"
      class="video-message__subtext"
    >
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
          <div
            v-if="buttonDownloadVisible"
            class="video-message__info-container"
          >
            <div
              v-if="message.views"
              class="video-message__views"
              @click.stop="viewsAction"
            >
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>

            <span class="video-message__time">{{ message.time }}</span>

            <div
              v-if="
                getClass(message) === 'video-message__right' &&
                statuses.includes(message.status)
              "
              class="video-message__status"
              :class="status"
            >
              <span
                v-if="message.status !== 'sent'"
                class="pi pi-check"
              />
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

      <div
        v-if="message.text"
        class="video-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedText"
        />
      </div>

      <LinkPreview
        v-if="message.linkPreview"
        class="video-message__link-preview"
        :class="message.position"
        :link-preview="message.linkPreview"
      />

      <EmbedPreview
        v-if="message.embed"
        :class="message.position"
        :embed="message.embed"
      />
    </div>
  </div>
  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
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
import { ref, computed, watch } from 'vue'
import linkifyStr from 'linkify-string'

import { ContextMenu } from '../../components'
import { getStatus, statuses } from '../../../helpers'
import { IVideoMessage } from '../../../types'
import { ModalFullscreen } from '../../modals'

import { BaseReplyMessage, LinkPreview, EmbedPreview } from '../'

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
  return message.position === 'left'
    ? 'video-message__left'
    : 'video-message__right'
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

<style scoped>
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
