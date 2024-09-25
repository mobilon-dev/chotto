<template>
  <div class="left-bar">
    <div class="left-bar__container">
      <SearchChats />
      <AdvancedChatList :chats="chatsStore.chats" @select="props.selectChat" />
      <button @click="toggleDarkMode">Смена темы</button>
    </div>
  </div>
</template>


<script setup>
import AdvancedChatList from '../components/blocks/AdvancedChatList.vue';
import SearchChats from '../components/blocks/SearchChats.vue'

import { useChatsStore } from "../store/chatsStore.js"

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}

// Define store
const chatsStore = useChatsStore();

// Define props
const props = defineProps({
  selectChat: {
    type: Function,
    required: true
  }
});
</script>

<style scoped lang="scss">
.left-bar {
  background-color: var(--p-neutral-100);

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    padding: 30px 14px;
  }
}

.dark {
  .left-bar {
    background-color: var(--p-neutral-900);
  }
}
</style>
