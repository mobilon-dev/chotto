<template>
  <div class="chat-info">
    <div class="chat-info__container" v-if="chat">
      <Avatar icon="pi pi-user" class="chat-info__avatar mr-2" size="large" shape="circle"
        style="background-color: var(--p-neutral-300); color: var(--p-neutral-500)" />
      <h2 class="chat-info__title">{{ chat.name }}</h2>
      <p class="chat-info__time">Был(а) недавно</p>
    </div>
  </div>
</template>

<script setup>
import Avatar from 'primevue/avatar';
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.chat-info {
  &__container {
    padding: 20px 15px 20px 40px;
    display: grid;
    grid-template-columns: min-content auto;
    column-gap: 20px;
  }

  &__avatar {
    grid-row: 1 / 3;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    grid-column: 2;
  }

  &__time {
    font-size: 14px;
    font-weight: 500;
    color: var(--p-neutral-500);
    grid-column: 2;
  }
}

.dark {
  .chat-info__time {
    color: var(--p-neutral-300);
  }
}
</style>
