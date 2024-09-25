import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatsStore = defineStore('chats', () => {
  const chats = ref([])

  const selectedChat = ref(null);
  const messages = ref([]);
  const userProfile = ref({});

  const setUnreadCounter = (chatId, countUnread) => {
    const chat = chats.value.find(c => c.chatId === chatId);
    chat.countUnread = countUnread;
  }

  return {
    chats,
    selectedChat,
    messages,
    userProfile,
    setUnreadCounter,
  }
})
