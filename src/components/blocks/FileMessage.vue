<template>
  <div class="file-message">
    <div class="file-message__container">
      <a class="file-message__link" :href="message.url" download>
        <span class="pi pi-file"></span>
        {{ message.url }}
      </a>
      <span class="file-message__time">22:02</span>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
// console.log(props.message)
</script>

<style scoped lang="scss">
.file-message {
  &__container {
    position: relative;
    column-gap: 12px;
    margin-bottom: 10px;
    width: fit-content;
    border-radius: 14px;
    background-color: var(--p-neutral-200);
  }

  &__link {
    color: var(--p-neutral-700);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    padding: 12px 60px 12px 16px;
  }

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;

  }
}

.dark {
  .file-message {
    &__container {
      background-color: var(--p-neutral-700);
    }

    &__link {
      color: var(--p-neutral-200);
    }
  }
}
</style>
