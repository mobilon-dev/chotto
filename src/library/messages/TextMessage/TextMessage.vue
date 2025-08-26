<template>
  <div
    class="text-message"
    :class="[getClass(message), applyStyle(message)]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="text-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    />

    <p
      v-if="message.subText"
      class="text-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="text-message__content"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        :class="message.position"
        :message="message.reply"
        @reply="handleClickReplied"
      />
      <p
        class="text-message__text"
        @click="inNewWindow"
        v-html="linkedText"
      />

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

      <div class="text-message__info-container">
        <div
          v-if="message.views"
          class="text-message__views"
          @click="viewsAction"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>
        <span
          v-if="message.time"
          class="text-message__time"
          >{{ message.time }}</span
        >
        <div
          v-if="
            getClass(message) === 'text-message__right' &&
            statuses.includes(message.status)
          "
          class="text-message__status"
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
        class="text-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="text-message__context-menu"
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
import { ITextMessage } from '../../../types'
import { BaseReplyMessage, LinkPreview, EmbedPreview } from '../'

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
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
    linkedText.value = linkifyStr(props.message.text)
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

const showMenu = () => {
  buttonMenuVisible.value = true
}

const hideMenu = () => {
  buttonMenuVisible.value = false
  isOpenMenu.value = false
}

const status = computed(() => getStatus(props.message.status))

const clickAction = (action) => {
  hideMenu()
  emit('action', {
    messageId: props.message.messageId,
    type: 'menu',
    ...action,
  })
}

const viewsAction = () => {
  hideMenu()
  emit('action', { messageId: props.message.messageId, type: 'views' })
}

function getClass(message) {
  return message.position === 'left'
    ? 'text-message__left'
    : 'text-message__right'
}
</script>
