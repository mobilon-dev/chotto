<template>
  <div class="chat-item" @click="selectChat">
    <div class="chat-item__avatar-container">
      <Avatar v-if="chat.avatar" :image="chat.avatar" class="mr-2 avatar" size="large" shape="circle" />
      <Avatar v-else icon="pi pi-user" class="mr-2 avatar" size="large" shape="circle"
        style="background-color: var(--p-neutral-300); color: var(--p-neutral-500)" />
    </div>
    <div class="chat-item__info-container">
      <div class="chat-item__name">{{ chat.name }}</div>
      <div class="chat-item__last-message" v-if="chat.lastMessage">{{ chat.lastMessage }}</div>
    </div>
    <div class="chat-item__details-container">
      <div class="chat-item__timestamp">{{ formatTimestampToReadable(chat['lastActivity.timestamp']) }}</div>
      <div class="chat-item__unread" v-if="chat.countUnread > 0">{{ chat.countUnread }}</div>
    </div>
  </div>
</template>

<script setup>
import Avatar from 'primevue/avatar';
import { formatDistanceToNow } from 'date-fns';
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select']);

// Define method
const selectChat = () => { emit('select', props.chat); }

// const getAvatarImage = () => {
//   if (props.chat.avatar) {
//     return props.chat.avatar;
//   } else {
//     const svg = '<svg fill="#000000" width="800px" height="800px" viewBox="0 -2.93 32.537 32.537" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <g transform="translate(-481.391 -197.473)"> <path d="M512.928,224.152a.991.991,0,0,1-.676-.264,21.817,21.817,0,0,0-29.2-.349,1,1,0,1,1-1.322-1.5,23.814,23.814,0,0,1,31.875.377,1,1,0,0,1-.677,1.736Z"/> <path d="M498.191,199.473a7.949,7.949,0,1,1-7.949,7.95,7.959,7.959,0,0,1,7.949-7.95m0-2a9.949,9.949,0,1,0,9.95,9.95,9.949,9.949,0,0,0-9.95-9.95Z"/> </g> </g></svg>';
//     const defaultAvatar = 'data:image/svg+xml;base64,' + window.btoa(svg);
//     return defaultAvatar;
//   }
// }

const formatTimestampToReadable = (unixTimestamp) => {
  let formattedTime = '';
  if (unixTimestamp) {
    formattedTime = formatDistanceToNow(unixTimestamp * 1000, { addSuffix: true });
  }
  return formattedTime;
}

</script>

<style scoped lang="scss">
.chat-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &__avatar-container {
    margin-right: 15px;
  }

  &__info-container {
    flex-grow: 1;
    margin-right: 15px;
  }

  &__details-container {
    margin-bottom: auto;
  }

  &__name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }

  &__last-message {
    font-size: 14px;
    color: var(--p-neutral-400);
    font-weight: 500;
  }

  &__unread {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    width: fit-content;
    color: var(--p-neutral-100);
    background-color: var(--p-emerald-500);
    border-radius: 50%;
    font-size: 14px;
    padding: 2px 6px;
    font-weight: 400;
    margin-left: auto;
  }

  &__timestamp {
    font-size: 12px;
    color: var(--p-neutral-400);
    font-weight: 500;
    margin-bottom: 8px
  }
}

.dark {
  .chat-item__unread {
    color: var(--p-neutral-900);
  }

  .chat-item__last-message,
  .dark .chat-item__timestamp {
    color: var(--p-neutral-300);
  }
}
</style>
