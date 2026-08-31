<template>
  <div
    class="reply__container"
    :class="rootClass"
    @click="onClick"
  >
    <img
      v-if="previewUrl"
      class="feed-reply-quote__preview"
      :src="previewUrl"
      alt=""
      width="40"
      height="40"
      loading="lazy"
      decoding="async"
    >
    <div class="feed-reply-quote__content">
      <p
        v-if="heading"
        class="feed-reply-quote__heading"
      >
        {{ heading }}
      </p>
      <p
        v-if="body"
        class="feed-reply-quote__body"
      >
        {{ body }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Reply } from '@/types'

const emit = defineEmits(['reply'])

const props = defineProps({
  message: {
    type: Object as () => Reply,
    default: () => ({} as Reply),
  },
})

const MEDIA_PREVIEW_TYPES = new Set(['message.image', 'message.sticker'])

const previewUrl = computed(() => {
  const reply = props.message
  if (!reply?.url || !MEDIA_PREVIEW_TYPES.has(reply.type || '')) return ''
  if (reply.url.endsWith('.tgs')) return ''
  return reply.url
})

const heading = computed(() => {
  const header = props.message?.header
  return header ? `В ответ ${header}` : ''
})

const body = computed(() => {
  const reply = props.message
  const text = reply?.text?.replace(/\s+/g, ' ').trim()
  if (text) return text

  switch (reply?.type) {
    case 'message.image':
      return 'Фотография'
    case 'message.sticker':
      return 'Стикер'
    case 'message.file':
      return reply.filename || 'Файл'
    case 'message.audio':
      return 'Аудиосообщение'
    case 'message.video':
      return 'Видео'
    case 'message.call':
      return reply.isMissedCall ? 'Пропущенный аудиозвонок' : 'Аудиозвонок'
    default:
      return ''
  }
})

const rootClass = computed(() => (previewUrl.value ? 'grid' : ''))

function onClick() {
  if (props.message?.messageId) {
    emit('reply', props.message.messageId)
  }
}
</script>

<style scoped lang="scss">
@use '../BaseReplyMessage/styles/BaseReplyMessage.scss';

.feed-reply-quote {
  &__preview {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  &__content {
    min-width: 0;
  }

  &__heading,
  &__body {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__heading {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    color: var(--chotto-replytextmessage-p-color, #5F5F5F);
  }

  &__body {
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: var(--chotto-replytextmessage-text-color, #1E1E1E);
  }
}
</style>
