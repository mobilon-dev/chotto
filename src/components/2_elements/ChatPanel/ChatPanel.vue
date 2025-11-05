<template>
  <div class="chat-panel">
    <div class="chat-panel__header">
      <button
        class="chat-panel__button-close"
        @click="$emit('close-panel')"
      >
        <span class="chat-panel__button-close-cross">
          <CloseButtonIcon />
        </span>
      </button>
    
      <div
        v-if="titleEnabled" 
        class="chat-panel__title-container"
      >
        <span
          v-if="title"
          class="chat-panel__title"
        >
          {{ title }}
        </span>
      </div>
    </div>

    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import { CloseButtonIcon } from '@/components'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: '',
  }, 
  titleEnabled: {
    type: Boolean,
    default: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close-panel']);
</script>

<style scoped lang="scss">
@use './styles/ChatPanel.scss';
</style>
