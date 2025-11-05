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

<script
  setup
  lang="ts"
>

defineProps({
  embed: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/EmbedPreview.scss';
</style>
