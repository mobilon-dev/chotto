<template>
  <div>
    <BaseContainer
      height="70vh"
      width="70vw"
    >
      <BaseLayout>
        <template #first-col>
          <UserProfile :user="userProfile" />
          <ChatList
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
            @action="chatAction"
          />
          <ThemeMode
            :themes="themes"
            :show="true"
          />
        </template>
        <template #second-col>
          <chat-wrapper
            :is-open-chat-panel="isOpenChatPanel"
            :is-selected-chat="!!selectedChat"
          >
            <template #default>
              <ChatInfo :chat="selectedChat">
                <template #actions>
                  <div style="display: flex;">
                    <button
                      class="chat-info__button-panel"
                      @click="isOpenChatPanel = !isOpenChatPanel"
                    >
                      <span class="pi pi-info-circle" />
                    </button>
                    <!--ButtonContextMenu
                      :actions="actions"
                      :button-class="'pi pi-list'"
                      :mode="'click'"
                      :menu-side="'bottom'"
                      :context-menu-key="'top-actions'"
                    /-->
                  </div>
                </template>
              </ChatInfo>
              <Feed
                :button-params="buttonParams"
                :objects="messages"
                :is-scroll-to-bottom-on-update-objects-enabled="isScrollToBottomOnUpdateObjectsEnabled"
                :typing="selectedChat.typing ? { avatar: selectedChat.avatar, title: selectedChat.title } : false"
                @message-action="messageAction"
                @load-more="loadMore"
              />
              <ChatInput @send="addMessage">
                <template #buttons>
                  <FileUploader :filebump-url="filebumpUrl" />
                  <ButtonEmojiPicker
                    :mode="'hover'"
                    :state="'disabled'"
                  />
                  <ButtonTemplateSelector
                    :templates="templates"
                    :group-templates="groupTemplates"
                    :mode="'click'"
                  />
                  <ChannelSelector
                    :channels="channels"
                    :mode="'hover'"
                    @select-channel="onSelectChannel"
                  />
                </template>
              </ChatInput>
            </template>
          </chat-wrapper>
        </template>
      </BaseLayout>
      <!-- @todo: заменить на composable modals -->
      <SelectUser
        v-if="modalShow"
        :title="modalTitle"
        :users="users"
        @confirm="selectUsers"
        @close="onCloseModal"
      />
    </BaseContainer>
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
  FileUploader,
  ThemeMode,
  // SideBar,
  // ChatPanel,
  BaseLayout,
  ChatWrapper,
  ButtonEmojiPicker,
  ButtonTemplateSelector,
  ChannelSelector
} from "../..";
import { BaseContainer } from "../../components/5_containers";

import { playNotificationAudio } from "@/functions";

import { useChatsStore } from "../stores/useChatStore";
import { transformToFeed } from "../transform/transformToFeed";
import { useLocale } from "../../locale/useLocale";
import { themes } from '../data';

const {locale: currentLocale, locales} = useLocale()
// const {t} = useLocale()

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
  locale: {
    type: String,
    required: false,
    default: 'ru',
  }
});

// Use the locale from props or fallback to currentLocale
const locale = props.locale || currentLocale;

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

// const chatApp = ref(null);

// const chatAppSize = ref({
//   width: 0,
//   height: 0,
// });

// const updateChatAppSize = () => {
//   return (chatAppSize.value = {
//     width: chatApp.value.offsetWidth,
//     height: chatApp.value.offsetHeight,
//   });
// };

// const selectItem = (item) => {
//   console.log("selected sidebar item", item);
// };

const chatAction = (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    modalTitle.value = `Добавить в чат ${data.chatId}`;
    users.value = getUsers();
    modalShow.value = true;
  }
};

const selectUsers = (users) => {
  console.log("users selected", users);
};

const onCloseModal = () => {
  modalShow.value = false;
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

onMounted(() => {
  locale.value = locales.find((loc) => loc.code == props.locale)
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  channels.value = props.dataProvider.getChannels();
  sidebarItems.value = props.dataProvider.getSidebarItems();
});

</script>
