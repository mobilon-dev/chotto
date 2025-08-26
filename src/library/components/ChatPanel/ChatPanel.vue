<template>
  <div class="chat-panel">
    <div
      v-if="titleEnabled"
      class="chat-panel__title-container"
    >
      <p
        v-if="title"
        class="chat-panel__title"
      >
        {{ title }}
      </p>

      <button
        class="chat-panel__button-close"
        @click="$emit('close-panel')"
      >
        <span class="pi pi-times" />
      </button>
    </div>

    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleEnabled: {
    type: Boolean,
    default: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close-panel'])
</script>
