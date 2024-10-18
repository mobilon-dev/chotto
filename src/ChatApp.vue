<template>
  <div>
    <div class="chat-app">
      <div class="chat-app__container">
        <div class="chat-app__left-bar">
          <ToolBar
            :sidebar-items="sidebarItems"
            @select-item="selectItem"
          />
        </div>
        <div class="chat-app__center-bar">
          <Profile :user="userProfile" />
          <ChatList2
            class="chat-app__chat-list"
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
            @action="action"
          />
          <ThemeMode />
        </div>

        <div
          class="chat-app__right-bar"
          :style="{ gridColumn: isOpenChatPanel ? '3' : '3 / 5', }"
        >
          <div
            v-if="selectedChat"
            class="chat-app__right-bar-container"
          >
            <ChatInfo
              :chat="selectedChat"
              @open-panel="isOpenChatPanel = !isOpenChatPanel"
            />
            <Feed
              class="chat-app__feed"
              :objects="messages"
              :style="{ padding: isOpenChatPanel ? '0 20px 50px 20px' : '0 80px 50px 80px' }"
            />
            <ChatInput2
              :enable-emoji="true"
              :channels="channels"
              @send="addMessage"
            />
          </div>
          <p
            v-else
            class="chat-app__welcome-text"
          >
            Выберите контакт для начала общения
          </p>
        </div>


        <ChatPanel
          v-if="isOpenChatPanel"
          class="chat-app__chat-panel chat-app__chat-panel--active"
        />
      </div>
    </div>
    <!-- <CreateNewChat :users="getUsers()" @createNewChat="createNewChat" title="+ чат" :isChatName="true"/>     -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import {
  ChatInfo,
  ChatInput2,
  ChatList2,
  CreateNewChat,
  Feed,
  Profile,
  FileUploader,
  ThemeMode,
  ToolBar,
  ChatPanel,
} from "./components/features";

import {
  formatTimestamp,
  insertDaySeparators,
  playNotificationAudio,
  sortByTimestamp,
} from './helpers';

import { useChatsStore } from './stores/useChatStore';

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

const chatsStore = useChatsStore();

// Reactive data
const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);
const sidebarItems = ref([])

const isOpenChatPanel = ref(false)

const selectItem = (item) => {
  sidebarItems.value.forEach(c => c.isSelected = false);
  const c = sidebarItems.value.find(c => c.name === item.name);
  c.isSelected = true;
};

const action = (data) => {
  console.log('action 1111', data);
}

const readableFormat = (timestamp) => {
  // @todo: преобразование timestamp в читаемый вид
  return formatTimestamp(timestamp);
}

const getUsers = () => {
  return (props.dataProvider.getChats()).map(c => { return { ...c, userId: c.chatId.toString() } });
}

const createNewChat = (obj) => {
  // obj.users.map(c=>console.log(c));
  // console.log('chat', obj)
  const chat = { chatId: 3, name: obj.chatName };
  chatsStore.addChat(chat);
}

// Methods
const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);

    // а. сортировка по timestamp
    const messages1 = sortByTimestamp(messages);

    // б. переформатирование
    const messages2 = messages1.map((m) => {
      return {
        ...m,
        position: m.direction === 'outgoing' ? 'right' : 'left',
        time: readableFormat(m.timestamp),
      };
    });

    // в. вставка временных отсечек
    const messages3 = insertDaySeparators(messages2);

    return messages3;
  } else {
    return [];
  }
};

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message.text,
    type: message.type,
    chatId: selectedChat.value.chatId,
    direction: 'outgoing',
    timestamp: '1727112546',
  });
  messages.value = getFeedObjects();  // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе контакта
};

const handleEvent = async (event) => {
  if (event.type === 'message') {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = getFeedObjects();
    }
    await playNotificationAudio();
  } else if (event.type === 'notification') {
    console.log('Системное уведомление:', event.data.text);
  }
};

// Lifecycle hook
onMounted(() => {
  // console.log('mounted')
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  sidebarItems.value = props.dataProvider.getSidebarItems()
});
</script>

<style
  scoped
  lang="scss"
>
.chat-app {
  &__container {
    display: grid;
    grid-template-columns: min-content 1.25fr 3fr 1.25fr;
    transition: all 0.3s ease;
    background-color: var(--app-container-bg, transparent);
    margin: var(--app-margin, 0);
  }

  &__left-bar {
    margin-right: 20px;
    grid-column: 1;
    border-right: 1px solid var(--tool-bar-border-color);
  }

  &__right-bar {
    grid-column: 3;
    position: relative;
    height: calc(100vh - 60px);
    border-radius: 12px;
    margin: var(--right-bar-margin);
    background-color: var(--rigth-bar-bg);
  }

  &__right-bar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__center-bar {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    grid-column: 2;
    border-right: var(--center-bar-border, none);
  }

  &__chat-panel {
    margin: var(--chat-pannel-margin);
    border-left: var(--chat-pannel-border, none);
  }

  &__chat-list {
    overflow-y: auto;
    margin: 30px 0 16px 0;
  }

  &__welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
