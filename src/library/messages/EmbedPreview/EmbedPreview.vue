<template>
  <div class="embed-preview">
    <iframe
      v-if="embed.type == 'youtube'"
      class="embed-preview__player"
      :src="embed.url"
      title="YouTube video player"
      frameborder="0"
      allowfullscreen
    />
    <iframe
      v-else-if="embed.type == 'rutube'"
      class="embed-preview__player"
      :src="embed.url"
      title="YouTube video player"
      frameborder="0"
      allow="clipboard-write; autoplay"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />
    <iframe
      v-else
      class="embed-preview__player"
      :src="embed.url"
    />
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  embed: {
    type: Object,
    required: true,
  },
})
</script>
