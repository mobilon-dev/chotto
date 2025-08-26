<template>
  <div class="date-message__container">
    <p class="date-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { IDateMessage } from '../../../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  message: {
    type: Object as () => IDateMessage,
    required: true,
    default: () => {},
  },
})
</script>
