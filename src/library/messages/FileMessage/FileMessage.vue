<template>
  <div
    class="file-message"
    :class="[getClass(message), applyStyle(message)]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="file-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    />

    <p
      v-if="message.subText"
      class="file-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="file-message__content"
      :style="{ gridRow: message.subText ? '2' : '1' }"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        :message="message.reply"
        :class="message.position"
        @reply="handleClickReplied"
      />
      <a
        class="file-message__link"
        :href="message.url"
        download
        target="_blank"
      >
        <span class="pi pi-file" />
        <p class="file-message__filename-text">
          {{ message.filename }}
        </p>
        <div class="file-message__download-button">
          <span class="pi pi-download" />
        </div>
      </a>
      <div
        v-if="message.text"
        class="file-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedText"
        />
      </div>

      <LinkPreview
        v-if="message.linkPreview"
        :class="message.position"
        :link-preview="message.linkPreview"
      />

      <EmbedPreview
        v-if="message.embed"
        :class="message.position"
        :embed="message.embed"
      />

      <div class="file-message__info-container">
        <div
          v-if="message.views"
          class="file-message__views"
          @click="viewsAction"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>

        <span class="file-message__time">{{ message.time }}</span>

        <div
          v-if="
            getClass(message) === 'file-message__right' &&
            statuses.includes(message.status)
          "
          class="file-message__status"
          :class="status"
        >
          <span
            v-if="message.status !== 'sent'"
            class="pi pi-check"
          />
          <span class="pi pi-check" />
        </div>
      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="file-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="file-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import linkifyStr from 'linkify-string'

import { ContextMenu } from '../../components'
import { getStatus, statuses } from '../../../helpers'
import { IFileMessage } from '../../../types'
import { BaseReplyMessage, LinkPreview, EmbedPreview } from '../'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
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

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false)
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

const handleClickReplied = (messageId) => {
  emit('reply', messageId)
}

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
}

const hideMenu = () => {
  buttonMenuVisible.value = false
  isOpenMenu.value = false
}

const status = computed(() => getStatus(props.message.status))

function getClass(message) {
  return message.position === 'left'
    ? 'file-message__left'
    : 'file-message__right'
}
</script>

<style scoped>
.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
