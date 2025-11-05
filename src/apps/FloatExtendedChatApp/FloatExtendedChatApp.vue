<template>
  <div>
    <FloatContainer
      title="Header"
      avatar="https://placehold.jp/30/336633/ffffff/64x64.png?text=MV"
      height="90vh"
      width="70vw"
    >
      <template #controls>
        <ButtonContextMenu
          :actions="actions"
          :button-class="'pi pi-list'"
          :mode="'click'"
          :menu-side="'bottom'"
          :context-menu-key="'top-actions'"
          @click="headerButtonClick"
        />
      </template>
      <template #default>
        <ExtendedLayout>
          <template #first-col>
            <SideBar
              :sidebar-items="sidebarItems"
              @select-item="selectItem"
            />
            <ThemeMode
              :themes="themes"
              :show="true"
            />
          </template>

          <template #second-col>
            <UserProfile :user="userProfile" />
            <ChatList
              :chats="chatsStore.chats"
              filter-enabled
              @select="selectChat"
              @action="chatAction"
            />
          </template>

          <template #third-col>
            <chat-wrapper
              :is-open-chat-panel="isOpenChatPanel"
              :is-selected-chat="!!selectedChat"
            >
              <template #default>
                <ChatInfo
                  :chat="selectedChat"
                  @open-panel="isOpenChatPanel = !isOpenChatPanel"
                />
                <FeedSearch
                  v-if="isOpenSearchPanel"
                  :is-feed-location="true"
                  @search="searchMessages"
                  @cancel="isOpenSearchPanel = !isOpenSearchPanel"
                  @switch="isShowFeedWhileSearch = !isShowFeedWhileSearch"
                />
                <FeedFoundObjects
                  v-if="isOpenSearchPanel && !isShowFeedWhileSearch"
                  :not-found="notFoundMessage"
                  :objects="foundMessages"
                  :found-amount="foundMessages.length"
                  @clicked-search="handleClickReplied"
                />
                <Feed
                  v-if="!isOpenSearchPanel || isShowFeedWhileSearch"
                  :objects="messages"
                  :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                  :scroll-to="clickedReply"
                  @message-action="messageAction"
                  @load-more="loadMore"
                />
                <ChatInput
                  :enable-emoji="true"
                  :channels="channels"
                  @send="addMessage"
                />
              </template>

              <template #chatpanel>
                <ChatPanel
                  v-if="isOpenChatPanel"
                  :title="selectedChat.name"
                  @close-panel="isOpenChatPanel = !isOpenChatPanel"
                >
                  <template #content>
                    test
                  </template>
                </ChatPanel>
              </template>
            </chat-wrapper>
          </template>
        </ExtendedLayout>
      </template>
    </FloatContainer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { watch } from "vue";

import {
  ChatInfo,
  ChatInput,
  ChatList,
  Feed,
  UserProfile,
  ThemeMode,
  SideBar,
  ChatPanel,
  ExtendedLayout,
  ChatWrapper,
  ButtonContextMenu,
  FeedFoundObjects,
  FeedSearch,
  FloatContainer,
} from "../..";

import { playNotificationAudio } from "@/functions";

import { useChatsStore } from "../stores/useChatStore";
import { transformToFeed } from "../transform/transformToFeed";
import { themes } from '../data';


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
const sidebarItems = ref([]);

const isOpenChatPanel = ref(false);

const modalShow = ref(false);
const modalTitle = ref("");
const users = ref([]);

const isOpenSearchPanel = ref(false)
const isShowFeedWhileSearch = ref(false)
const notFoundMessage = ref(false)
const clickedReply = ref('')
const foundMessages = ref([])
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const actions = [
  {action: 'search', title: 'Поиск'},
];

const headerButtonClick = (action) => {
  console.log(action)
  if (action.action == 'search' && selectedChat.value != null) isOpenSearchPanel.value = !isOpenSearchPanel.value
}

const selectItem = (item) => {
  console.log("selected sidebar item", item);
};

const chatAction = (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    modalTitle.value = `Добавить в чат ${data.chatId}`;
    users.value = getUsers();
    modalShow.value = true;
  }
};

const messageAction = (data) => {
  console.log("message action", data);
};

const getUsers = () => {
  return props.dataProvider.getUsers();
  // return (props.dataProvider.getChats()).map(c => { return { ...c, userId: c.chatId.toString() } });
};

const loadMore = () => {
  // do load more messages to feed
  console.log("load more");
};

const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    const messages = props.dataProvider.getFeed(selectedChat.value.chatId);
    const messages3 = transformToFeed(messages);
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
    direction: "outgoing",
    timestamp: "1727112546",
  });
  messages.value = getFeedObjects(); // Обновление сообщений
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе контакта
};

const handleEvent = async (event) => {
  if (event.type === "message") {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (selectedChat?.value?.chatId) {
      messages.value = getFeedObjects();
    }
    await playNotificationAudio();
  } else if (event.type === "notification") {
    console.log("Системное уведомление:", event.data.text);
  }
};

const searchMessages = (string) => {
  if (string && string.length > 0){
    isShowFeedWhileSearch.value = false
    foundMessages.value = transformToFeed(props.dataProvider.getMessagesBySearch(selectedChat.value.chatId, string))
    foundMessages.value = foundMessages.value.reverse()
    notFoundMessage.value = false
    if (foundMessages.value.length == 0) 
      notFoundMessage.value = true

    if (foundMessages.value.length > 0){
      let t = []
      for (let m of foundMessages.value){
        if (m.direction == 'incoming') m.subtext = selectedChat.value.name
        if (m.direction == 'outgoing') m.subtext = userProfile.value.name
        if (m.type != 'system.date' && m.type != 'message.system') t.push(m)
      }
      foundMessages.value = t
    }
  }
  else {
    foundMessages.value = []
  }
}

const handleClickReplied = (messageId) => {
  console.log('Clicked reply id ' + messageId)
  isShowFeedWhileSearch.value = true
  const message = messages.value.find((m) => {
    if (m.messageId == messageId) return m
    })
  if (!message) {
    const messages1 = props.dataProvider.getFeedByMessage(selectedChat.value.chatId, messageId)
    messages.value = transformToFeed(messages1)
  }
  setTimeout(() => {
    highlightMessage(messageId)
  }, 150)
}

let timer
const highlightMessage = (messageId) => {
  clearTimeout(timer)
  const message = messages.value.find((m) => {
      if (m.messageId == messageId) return m
    })
  if (message) {
    clickedReply.value = JSON.stringify(message)
    timer = setTimeout(() => {
      clickedReply.value = ''
    }, 100)
  }
}

onMounted(() => {
  // console.log('mounted')
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  sidebarItems.value = props.dataProvider.getSidebarItems();
});
</script>
