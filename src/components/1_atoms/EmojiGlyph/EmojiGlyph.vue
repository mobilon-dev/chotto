<template>
  <img
    v-if="!isNative && hasImage"
    class="chotto-emoji"
    :src="src"
    :alt="emoji"
    draggable="false"
    @error="onImgError"
  >
  <span v-else>{{ emoji }}</span>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useEmojiNative } from '@/hooks'
import { getAppleEmojiFallbackUrl, getAppleEmojiUrl, hasAppleEmojiImage } from '@/functions/renderAppleEmojis'

const props = defineProps({
  emoji: {
    type: String,
    required: true,
  },
})

const chatAppId = inject('chatAppId', '') as string
const { isNative, emojiSrc } = useEmojiNative(chatAppId)

const hasImage = computed(() => hasAppleEmojiImage(props.emoji, emojiSrc.value))
const src = computed(() => getAppleEmojiUrl(props.emoji, emojiSrc.value))
const fallbackSrc = computed(() => getAppleEmojiFallbackUrl(props.emoji, emojiSrc.value))

function onImgError(event: Event) {
  const img = event.target as HTMLImageElement
  const fallback = fallbackSrc.value
  if (fallback && img.src !== fallback) {
    img.src = fallback
  }
}
</script>

<style scoped>
</style>
