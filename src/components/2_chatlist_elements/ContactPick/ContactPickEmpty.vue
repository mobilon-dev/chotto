<template>
  <p
    class="contact-pick-empty"
    data-testid="contact-pick-empty"
  >
    <slot>
      {{ message }}
    </slot>
  </p>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Не найдено результатов',
  },
});
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>