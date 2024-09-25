<template>
  <div class="center-bar">
    <div class="center-bar__container">
      <ChatInfo class="center-bar__chat-info" :chat="chatsStore.selectedChat" />
      <MessageFeed class="center-bar__message-feed" :messages="chatsStore.messages" />
      <ChatInput class="center-bar__chat-input" @send="props.addMessage" />
    </div>
  </div>
</template>


<script setup>
import ChatInfo from "../components/blocks/ChatInfo.vue";
import MessageFeed from "../components/blocks/MessageFeed.vue";
import ChatInput from "../components/blocks/ChatInput.vue";
import Dialog from 'primevue/dialog';

import { useChatsStore } from "../store/chatsStore.js"

// Define store
const chatsStore = useChatsStore();

const props = defineProps({
  addMessage: {
    type: Function,
    required: true
  }
});
</script>

<style scoped lang="scss">
.center-bar {
  background-color: var(--p-neutral-50);

  &__container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &__message-feed {
    height: fit-content;
    margin-top: auto;
    padding: 0 80px 50px 80px;
    overflow-y: auto;
  }
}

.dark {
  .center-bar {
    background-color: var(--p-neutral-800);
  }
}
</style>
