<template>
  <div class="system-message__container">
    <p class="system-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ISystemMessage } from '../../../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  message: {
    type: Object as () => ISystemMessage,
    required: true,
  },
})
</script>
