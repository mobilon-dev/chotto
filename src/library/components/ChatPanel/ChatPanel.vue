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
    default: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close-panel']);
</script>

<style
  scoped
  lang="scss"
>
.chat-panel {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 100%;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--chotto-scrollbar-bg);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--chotto-scrollbar-thumb-bg);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: var(--chotto-header-font-size);
    font-weight: var(--chotto-header-font-weight);
  }

  &__button-close {
    background-color: transparent;
    border: none;
    cursor: pointer;

    span {
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }
  }
}
</style>
