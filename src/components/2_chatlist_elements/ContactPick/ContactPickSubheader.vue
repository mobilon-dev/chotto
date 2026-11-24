<template>
  <header class="contact-pick-subheader">
    <button
      type="button"
      class="contact-pick-subheader__back"
      :title="backTitle"
      data-testid="contact-pick-back"
      @click="emit('back')"
    >
      <slot name="back-icon">
        <BackChevronIcon />
      </slot>
    </button>
    <h2 class="contact-pick-subheader__title">
      {{ title }}
    </h2>
    <slot name="trailing" />
  </header>
</template>

<script setup lang="ts">
import BackChevronIcon from './icons/BackChevronIcon.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  backTitle: {
    type: String,
    default: 'Назад',
  },
});

const emit = defineEmits<{ back: [] }>();
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>