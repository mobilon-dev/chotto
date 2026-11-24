<template>
  <button
    type="button"
    class="chat-list-add-button"
    data-testid="chat-list-add-button"
    :title="title"
    :aria-label="ariaLabel"
    @click="emit('click')"
  >
    <slot>+</slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Новый чат',
  },
  ariaLabel: {
    type: String,
    default: 'Новый чат',
  },
});

const emit = defineEmits<{ click: [] }>();
</script>

<style scoped lang="scss">
@use './styles/ChatList.scss';
</style>