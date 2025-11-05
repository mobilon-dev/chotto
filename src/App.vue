<template>
  <div class="container">
    <chat-app
      :auth-provider="authProvider"
      :data-provider="dataProvider"
      :eventor="eventor"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import moment from 'moment';

// import ChatApp from './apps/BaseBaseChatApp/BaseBaseChatApp.vue';
// import ChatApp from './apps/BaseExtendedChatApp/BaseExtendedChatApp.vue';
//import ChatApp from './apps/BaseAdaptiveExtendedChatApp/BaseAdaptiveExtendedChatApp.vue';
import ChatApp from './apps/MobilonExtendedChatApp/MobilonExtendedChatApp.vue'
// import ChatApp from './apps/BaseFeedChatApp/BaseFeedChatApp.vue';

// import ChatApp from './apps/FloatExtendedChatApp/FloatExtendedChatApp.vue';

import {
  messages, chats, channels,
  sidebarItems, userProfile, users, templates, groupTemplates, wabaTemplates,
} from './apps/data';

// Mock data
const data3 = {
  messages,
  chats,
  channels,
  sidebarItems,
  userProfile,
  users,
  templates,
  groupTemplates,
  wabaTemplates,
};

// Define the auth provider
const authProvider = {
  getUserProfile() { return data3.userProfile }
};

// Define the data provider
const dataProvider = {
  setAuth(auth) {
    console.log('auth', auth);
  },
  getFeed(chatId) {
    // начальная загрузка сообщений (все либо 20 в конце)
    if (chatId != 5)
      return data3.messages.filter(m => m.chatId === chatId);
    else {
      let m = data3.messages.filter(m => m.chatId === chatId);
      return m.splice(-20)
    }
  },
  getMoreFeedUp(chatId, messageId, length){
    // догрузка сообщений при движении вверх
    const messages = data3.messages.filter(m => m.chatId === chatId);
    const index = messages.findIndex((message) => { return message.messageId == messageId})
    const firstIndex = index - length < 0 ? 0 : index - length
    return messages.slice(firstIndex, index)
  },
  getMoreFeedDown(chatId, messageId, length){
    // догрузка сообщений при движении вниз
    const messages = data3.messages.filter(m => m.chatId === chatId);
    const index = messages.findIndex((message) => { return message.messageId == messageId})
    return messages.slice(index + 1, index + length + 1)
  },
  getFeedByMessage(chatId, messageId){
    // догрузка сообщений при переходе к сообщению вне текущей ленты
    const messages = data3.messages.filter(m => m.chatId === chatId);
    const index = messages.findIndex((message) => { return message.messageId == messageId})
    const firstIndex = index - 8 < 0 ? 0 : index - 8
    return messages.slice(firstIndex, index + 8)
  },
  getMessagesBySearch(chatId, string){
    const messages = data3.messages.filter(m => m.chatId === chatId);
    const search = messages.filter(m => {
      if (m.text) {
        const index = m.text.indexOf(string)
        if (index != -1) return m
      }
    })
    return search
  },
  getLastMessage(chatId){
    const messages = data3.messages.filter(m => m.chatId === chatId)
    return messages[messages.length - 1]
  },
  getChannels() {
    return data3.channels;
  },
  getTemplates() {
    return data3.templates;
  },
  getWABATemplates() {
    return data3.wabaTemplates;
  },
  getGroupTemplates() {
    return data3.groupTemplates;
  },
  getChats() {
    return data3.chats;
  },
  getUsers() {
    return data3.users;
  },
  addMessage(message) {
    data3.messages.push(message);
    console.log("Добавлено новое сообщение:", message);
  },
  getSidebarItems() {
    return data3.sidebarItems;
  }
};

const createEventor = () => {
  let cb = null;
  return {
    push(event) {
      // console.log('push', cb);
      if (cb) {
        // console.log('subscibe');
        cb(event);
      }
    },
    subscribe(cb1) {
      cb = cb1;
    },
  };
}

const eventor = createEventor();

const data = {
  chatId: 2,
  type: "message.text",
  direction: 'incoming',
  status: 'sent',
  userId: 'testUserId',
};

// Эмуляция событий с сервера
onMounted(() => {
  setTimeout(() => {
    const newM = { ...data, text: 'new message 1', timestamp: moment().unix() };
    data3.messages.push(newM);
    eventor.push({ type: 'message', data: newM });
  }, 3000);

  setTimeout(() => {
    const newM = { ...data, text: 'new message 2', timestamp: moment().unix() };
    data3.messages.push(newM);
    eventor.push({ type: 'message', data: newM });
  }, 5000);

  setTimeout(() => {
    const systemNotification = {
      type: 'system',
      text: 'Системное уведомление от сервера',
    };
    eventor.push({ type: 'notification', data: systemNotification });
  }, 6000);
});
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 30px auto;
}
</style>
