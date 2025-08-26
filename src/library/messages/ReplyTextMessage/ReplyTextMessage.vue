<template>
  <div class="reply-text-message">
    <p v-if="message.header">
      {{ message.header }}
    </p>

    <p
      class="text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import linkifyStr from 'linkify-string'

import { ITextMessage } from '../../../types'

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
})

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    linkedText.value = linkifyStr(props.message.text)
  },
  { immediate: true }
)

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href) window.open(event.target.href, '_blank')
}
</script>
