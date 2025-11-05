<template>
  <div class="typing-message__container">
    <img
      v-if="message.avatar"
      class="typing-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >
    <p
      v-if="message.subText"
      class="typing-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div class="typing-message__loader-container">
      <div class="typing-message__loader" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { ITypingMessage } from '@/types';

defineProps({
  message: {
    type: Object as () => ITypingMessage,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/TypingMessage.scss';
</style>
