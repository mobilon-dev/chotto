<template>
  <div class="chat-list">
    <chat v-for="chat in chats" :key="chat.chatId" :chat="chat" @select="selectChat" />
  </div>
</template>

<script setup>
import Chat from "../blocks/AdvancedChat.vue";

// Define props
const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select']);

// Define method
const selectChat = (chat) => { emit('select', chat) };
</script>

<style scoped></style>
