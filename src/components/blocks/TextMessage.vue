<template>
  <div class="text-message">
    <div :class="getClass(message)">
      <p>{{ message.text }}</p>
      <span class="text-message__time">22:02</span>
    </div>
  </div>

</template>

<script setup>

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

function getClass(message) {
  return message.direction === 'incoming' ? 'text-message__left' : 'text-message__right';
}

</script>

<style scoped lang="scss">
.text-message {

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;
  }

  &__left,
  &__right {
    position: relative;
    padding: 12px 60px 12px 16px;
    margin-bottom: 10px;
    outline: none;
    max-width: 40%;
    width: fit-content;
    border-radius: 14px;
    word-wrap: break-word;
  }

  &__left {
    color: var(--p-neutral-700);
    background-color: var(--p-neutral-200);
  }

  &__right {
    margin-left: auto;
    background-color: var(--p-emerald-200);
    color: var(--p-neutral-700);
  }
}

.dark {
  .text-message {
    &__left {
      color: var(--p-neutral-200);
      background-color: var(--p-neutral-700);
    }

    &__right {
      color: var(--p-neutral-200);
      background-color: var(--p-emerald-800);
    }
  }
}
</style>
