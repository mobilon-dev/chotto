<template>
  <div class="container">
    <chat-app :authProvider="authProvider" :dataProvider="dataProvider" :eventor="eventor" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ChatApp from './ChatApp.vue';

// Mock data
const data3 = {
  messages: [
    { chatId: 1, type: "message.text", text: "Привет!", direction: 'incoming', status: 'read', timestamp: 1726316634 },
    { chatId: 1, type: "message.text", text: "Привет!", direction: 'outgoing', isRead: true },
    { chatId: 1, type: "message.image", url: "https://madtest.ru/blog/marketing/images/tild3637-3733-4937-a361-656334356463__stocks-unsplash.png", alt: "Example Image", direction: 'outgoing' },
    { chatId: 2, type: "message.file", url: "https://axiomabio.com/pdf/test.pdf", filename: "Документ.pdf" },
    { chatId: 2, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 2, type: "message.image", url: "https://example.com/image.jpg", alt: "Example Image", direction: 'outgoing' },
    { chatId: 3, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 3, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 4, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 4, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 5, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },
    { chatId: 6, type: "message.text", text: "Привет!", direction: 'incoming', isRead: true },

  ],
  chats: [
    { chatId: 1, name: "Василий", countUnread: 0, lastMessage: 'test', 'lastActivity.timestamp': 1726316634, },
    { chatId: 2, name: "Мария", countUnread: 0 },
    { chatId: 3, name: "Иван", countUnread: 0 },
    { chatId: 4, name: "Сергей", countUnread: 0 },
    { chatId: 5, name: "Анна", countUnread: 0 },
    { chatId: 6, name: "Ульяна", countUnread: 0 },
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
  getAllMessages() {
    return data3.messages;
  },
  getChats() {
    return data3.chats;
  },
  addMessage(message) {
    data3.messages.push(message);
    console.log("Добавлено новое сообщение:", message);
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
      chatId: 1,
      type: "message.text",
      text: "Новое сообщение от сервера!",
      direction: 'incoming',
      isRead: false
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

<style scoped lang="scss"></style>
