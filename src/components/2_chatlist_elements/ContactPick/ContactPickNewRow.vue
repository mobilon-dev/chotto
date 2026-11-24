<template>
  <button
    type="button"
    class="contact-pick-row"
    data-testid="contact-pick-new-row"
    @click="emit('click')"
  >
    <span class="contact-pick-row__avatar contact-pick-row__avatar--action">
      <slot name="icon">
        <ContactPickNewIcon />
      </slot>
    </span>
    <span class="contact-pick-row__name">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import ContactPickNewIcon from './icons/ContactPickNewIcon.vue';

defineProps({
  label: {
    type: String,
    default: 'Новый контакт',
  },
});

const emit = defineEmits<{ click: [] }>();
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>