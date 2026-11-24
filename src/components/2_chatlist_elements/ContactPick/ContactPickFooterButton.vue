<template>
  <footer class="contact-pick-footer">
    <button
      type="button"
      class="contact-pick-footer__button"
      data-testid="contact-pick-footer-button"
      :disabled="disabled || loading"
      @click="emit('click')"
    >
      <slot>{{ label }}</slot>
    </button>
  </footer>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Сохранить контакт',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{ click: [] }>();
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>