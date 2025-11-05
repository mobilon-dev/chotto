<template>
  <div class="link-preview">
    <div class="link-preview__container">
      <a
        class="link-preview__link-container"
        :href="linkPreview.url"
        target="_blank"
      >
        <p class="link-preview__title">{{ linkPreview.title }}</p>
        <p class="link-preview__description">{{ linkPreview.description }}</p>
        <img
          class="link-preview__image"
          :src="linkPreview.imageUrl"
          :alt="linkPreview.title"
        >
      </a>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ILinkPreview } from '@/types';

defineProps({
  linkPreview: {
    type: Object as () => ILinkPreview,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/LinkPreview.scss';
</style>
