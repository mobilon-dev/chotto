<template>
  <div class="chat-list__title-container">
    <h2
      v-if="props.titleEnabled"
      class="chat-list__title"
    >
      {{ props.title }}
    </h2>

    <slot name="actions" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Чаты',
  },
  titleEnabled: {
    type: Boolean,
    default: true,
  },
});
</script>

