<template>
  <div class="system-message__container">
    <p class="system-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { ISystemMessage } from '@/types';

defineProps({
  message: {
    type: Object as () => ISystemMessage,
    required: true,
  },
});

</script>

<style scoped lang="scss">
@use './styles/SystemMessage.scss';
</style>
