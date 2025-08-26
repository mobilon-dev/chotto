<template>
  <a
    class="reply-file-message__link"
    :href="message.url"
    download
    target="_blank"
  >
    <span class="pi pi-file" />
  </a>

  <div>
    <p v-if="message.header">
      {{ message.header }}
    </p>

    <a
      class="reply-file-message__link"
      :href="message.url"
      download
      target="_blank"
    >
      <p class="reply-file-message__filename-text">
        {{ message.filename }}
      </p>
    </a>

    <p
      v-if="message.text"
      class="reply-file-message__text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import linkifyStr from 'linkify-string'

import { IFileMessage } from '../../../types'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
    required: true,
  },
})

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
  },
  { immediate: true }
)

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href) window.open(event.target.href, '_blank')
}
</script>
