<template>
  <img
    v-if="!isNative"
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
import { getAppleEmojiFallbackUrl, getAppleEmojiUrl } from '@/functions/renderAppleEmojis'

const props = defineProps({
  emoji: {
    type: String,
    required: true,
  },
})

const chatAppId = inject('chatAppId', '') as string
const { isNative } = useEmojiNative(chatAppId)

const src = computed(() => getAppleEmojiUrl(props.emoji))
const fallbackSrc = computed(() => getAppleEmojiFallbackUrl(props.emoji))

function onImgError(event: Event) {
  const img = event.target as HTMLImageElement
  const fallback = fallbackSrc.value
  if (fallback && img.src !== fallback) {
    img.src = fallback
  }
}
</script>

<style scoped>
.chotto-emoji {
  height: 1.2em;
  width: 1.2em;
  margin: 0 0.05em;
  vertical-align: -0.2em;
  display: inline;
}
</style>
