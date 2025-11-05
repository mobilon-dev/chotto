<template>
  <div class="date-message__container">
    <p class="date-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { IDateMessage } from '@/types';

defineProps({
  message: {
    type: Object as () => IDateMessage,
    required: true,
    default: () => { }
  }
});
</script>

<style scoped lang="scss">
@use './styles/DateMessage.scss';
</style>
