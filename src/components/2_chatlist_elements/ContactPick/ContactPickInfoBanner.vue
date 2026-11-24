<template>
  <div
    v-if="visible"
    class="contact-pick-banner"
    role="status"
    data-testid="contact-pick-banner"
  >
    <span
      v-if="loading"
      class="contact-pick-banner__spin"
      aria-hidden="true"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>