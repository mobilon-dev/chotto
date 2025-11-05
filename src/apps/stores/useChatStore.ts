import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatsStore = defineStore('chats', () => {
	const chats = ref<Array<{chatId: string; countUnread?: number}>>([])

	function setUnreadCounter(chatId: string, countUnread: number) {
		// console.log('setUnreadCounter', chatId, countUnread)
		// console.log(chats.value, 'chats')
		// @TODO fix any
		const chat = chats.value.find((c) => c.chatId === chatId)
		if (chat) {
			console.log('if chat found')
			chat.countUnread = countUnread
		}
	}

  function addChat(chat: {chatId: string; countUnread?: number}){
    chats.value.push(chat);
  }

	return { chats, setUnreadCounter, addChat }
})
