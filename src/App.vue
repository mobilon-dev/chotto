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
import { onMounted, reactive } from 'vue';
import ChatApp from './ChatApp.vue';

import { messages } from './data/messages';
import { chats } from './data/chats';

// Mock data
const data3 = {
  messages,
  chats,
  channels: [
    { channelId: 'channel1', title: 'test channel 1', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png' },
    { channelId: 'channel2', title: 'test channel 2' },
  ],
  sidebarItems: [
    {
      icon: 'https://dummyimage.com/64x64/000/fff.png&text=SD',
      name: 'manager1',
    },
    {
      icon: 'https://dummyimage.com/64x64/000/fff.png&text=PN',
      name: 'manager2',
    },
    {
      icon: 'https://dummyimage.com/64x64/000/fff.png&text=MV',
      name: 'manager3',
    },
    {
      icon: 'https://dummyimage.com/64x64/000/fff.png&text=PS',
      name: 'manager4',
      isFixedBottom: true,
    },
  ],
};

// Define the auth provider
const authProvider = {
  getUserProfile() {
    return {
      name: "Александр Петров",
      email: "user@m.com",
      phone: "+79XXXXXXXX",
      auth: 'secretkey',
    };
  }
};

// Define the data provider
const dataProvider = {
  setAuth(auth) {
    console.log('auth', auth);
  },
  getFeed(chatId) {
    return data3.messages.filter(m => m.chatId === chatId);
  },
  getChannels() {
    return data3.channels;
  },
  getChats() {
    return data3.chats;
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


// Эмуляция событий с сервера
onMounted(() => {
  setTimeout(() => {
    // Симулируем получение нового сообщения с сервера
    const newMessage = {
      chatId: 2,
      type: "message.text",
      text: "Новое сообщение от сервера!",
      direction: 'incoming',
      status: 'sent',
      timestamp: '1727112546'
    };
    // Эмитим событие в дочерний компонент
    // handleServerEvent({ type: 'message', data: newMessage });
    data3.messages.push(newMessage);
    eventor.push({ type: 'message', data: newMessage });
  }, 3000);

  setTimeout(() => {
    // Симулируем получение системного уведомления с сервера
    const systemNotification = {
      type: 'system',
      text: 'Системное уведомление от сервера',
    };
    //handleServerEvent({ type: 'notification', data: systemNotification });
    eventor.push({ type: 'notification', data: systemNotification });
  }, 6000);
});
</script>

<style scoped>
.container {
  width: 74vw;
  margin: 0 auto;
}
</style>
