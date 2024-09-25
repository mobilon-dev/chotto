<template>
  <div class="chat-app">
    <div class="chat-app__container">
      <LeftBar :selectChat="selectChat" />
      <div class="chat-app__center-bar-container">
        <CenterBar class="chat-app__messages-form" v-if="chatsStore.selectedChat" :addMessage="addMessage" />
        <p class="chat-app__welcome-text" v-else>Выберите контакт для начала общения</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import { useChatsStore } from "./store/chatsStore.js"
import LeftBar from './layouts/LeftBar.vue';
import CenterBar from './layouts/CenterBar.vue'

// Define store
const chatsStore = useChatsStore();

// Define props
const props = defineProps({
  authProvider: {
    type: Object,
    required: true,
  },
  dataProvider: {
    type: Object,
    required: true,
  },
  eventor: {
    type: Object,
    required: true,
  },
});

const getFeed = () => {
  if (chatsStore.selectedChat) {
    return props.dataProvider.getFeed(chatsStore.selectedChat.chatId);
  } else {
    return [];
  }
};

const selectChat = (chat) => {
  chatsStore.selectedChat = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  chatsStore.messages = getFeed();
};

const addMessage = (message) => {
  props.dataProvider.addMessage({
    text: message,
    type: 'message.text',
    chatId: chatsStore.selectedChat.chatId,
    direction: 'outgoing',
    timestamp: new Date().toLocaleTimeString(),
  });
  chatsStore.messages = getFeed();  // Обновление сообщений
};

const handleEvent = (event) => {
  if (event.type === 'message') {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (chatsStore.selectedChat.chatId) {
      chatsStore.messages = props.dataProvider.getFeed(chatsStore.selectedChat.chatId);

    }
  } else if (event.type === 'notification') {
    console.log('Системное уведомление:', event.data.text);
  }
};



// Lifecycle hook
onMounted(() => {
  // console.log('mounted')
  props.eventor.subscribe(handleEvent);
  chatsStore.userProfile = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
});
</script>

<style scoped lang="scss">
.chat-app {

  &__container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    height: 100vh;
  }

  &__center-bar-container {
    width: 100%;
    position: relative;
  }

  &__welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
