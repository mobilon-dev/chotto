<template>
  <div>
    <span
      class="reply-call-message__icon pi pi-phone"
      :class="{ 'reply-call-message__icon-missed': message.isMissedCall }"
    />
  </div>

  <div class="reply-call-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="reply-call-message__reply-description">
      <span
        v-if="!message.isMissedCall"
        class="reply-call-message__title"
      >
        Аудиозвонок
      </span>
      <span
        v-else
        class="reply-call-message__title"
      >
        Пропущенный аудиозвонок
      </span>
    </div>
    <p v-if="message.callDuration">
      {{ message.callDuration }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ICallMessage } from '../../../types'

// Define props
const props = defineProps({
  message: {
    type: Object as () => ICallMessage,
    required: true,
  },
})

console.log(props.message)
</script>
