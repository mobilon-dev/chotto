<template>
  <div>
    <BaseContainer
      height="90vh"
      width="70vw"
    >
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
            v-if="!isOpenSearchPanel"
            :chats="chatsStore.chats"
            filter-enabled
            @select="selectChat"
            @action="chatAction"
          />
          <FeedSearch
            v-if="isOpenSearchPanel"
            @search="searchMessages"
            @cancel="isOpenSearchPanel = !isOpenSearchPanel"
          />
          <FeedFoundObjects
            v-if="isOpenSearchPanel"
            :not-found="notFoundMessage"
            :objects="foundMessages"
            :found-amount="foundMessages.length"
            @clicked-search="handleClickReplied"
          />
        </template>

        <template #third-col>
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
                    <button
                      class="chat-info__button-panel"
                      @click="isOpenSearchPanel = !isOpenSearchPanel"
                    >
                      <span class="pi pi-search" />
                    </button>
                  </div>
                </template>
                <template #search>
                  <FeedSearch
                    v-if="isOpenSearchPanel"
                    @search="searchMessages"
                    @cancel="isOpenSearchPanel = !isOpenSearchPanel"
                  />
                </template>
              </ChatInfo>
              <Feed
                :button-params="buttonParams"
                :objects="messages"
                :typing="selectedChat.typing ? { avatar: selectedChat.avatar, title: selectedChat.title } : false"
                :enable-double-click-reply="true"
                :scroll-to="clickedReply"
                :scroll-to-bottom="scrollToBottomOnSelectChat || isScrollToBottomOnUpdateObjectsEnabled"
                @message-action="messageAction"
                @load-more="loadMore"
                @load-more-down="loadMoreDown"
                @message-visible="messageVisible"
                @click-replied-message="handleClickReplied"
                @force-scroll-to-bottom="forceScrollToBottom"
              />
              <ChatInput 
                :focus-on-input-area="inputFocus"
                @send="addMessage"
              >
                <template #buttons>
                  <FileUploader
                    :filebump-url="filebumpUrl"
                    :state="'disabled'"
                  />
                  <ButtonEmojiPicker
                    :mode="'hover'"
                    :state="'disabled'"
                  />
                  <ButtonTemplateSelector
                    :templates="templates"
                    :group-templates="groupTemplates"
                    :mode="'click'"
                    :state="'disabled'"
                  />
                  <ButtonWabaTemplateSelector
                    :waba-templates="wabaTemplates"
                    :group-templates="groupTemplates"
                    :mode="'click'"
                    :state="'disabled'"
                    :filebump-url="filebumpUrl"
                    @send-waba-values="sendWabaValues"
                  />
                  <ChannelSelector
                    :channels="channels"
                    :mode="'hover'"
                    :state="'disabled'"
                    @select-channel="onSelectChannel"
                  />
                </template>
              </ChatInput>
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
    </BaseContainer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { computed, watch } from "vue";
import moment from 'moment';

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
  // useModalCreateChat,
  // useModalCreateChat2,
  // ButtonContextMenu,
  ButtonTemplateSelector,
  ButtonWabaTemplateSelector,
  ButtonEmojiPicker,
  FileUploader,
  FeedSearch,
  ChannelSelector,
  FeedFoundObjects,
} from "../..";
import { BaseContainer } from "../../components/5_containers";
import { useModalSelectUser2 } from "../../hooks/modals";

import { playNotificationAudio } from "@/functions";

import { useChatsStore } from "../stores/useChatStore";
import { transformToFeed } from "../transform/transformToFeed";
import { useLocale } from "../../locale/useLocale";
import { themes as themesData } from '../data';

const { locale: currentLocale, locales } = useLocale()


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

const buttonParams = {
  unreadAmount: 12
}

const themes = themesData.map(theme => 
  theme.code === 'green' ? { ...theme, default: true } : theme
);

const chatsStore = useChatsStore();

const selectedChat = ref(null);
const messages = ref([]);
const userProfile = ref({});
const channels = ref([]);
const templates = ref([]);
const wabaTemplates = ref([])
const groupTemplates = ref([])
const sidebarItems = ref([]);
const isOpenChatPanel = ref(false);
const isOpenSearchPanel = ref(false)
const notFoundMessage = ref(false)
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const scrollToBottomOnSelectChat = ref(false)
const inputFocus = ref(false)
const filebumpUrl = ref('https://filebump2.services.mobilon.ru');
const clickedReply = ref('')
const foundMessages = ref([])

const selectItem = (item) => {
  console.log("selected sidebar item", item);
};

const chatAction = async (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    const data = await useModalSelectUser2('Укажите новых участников чата', getUsers());
    // const data = await useModalCreateChat2('Добавьте контакт');
    console.log('users:', data.contact);
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
  // do load more messages to feed when scroll up
  console.log("load more");
  if (selectedChat.value && selectedChat.value.chatId == 5 ){
    const firstMessage = messages.value.find((message) => {
      if (message.type.indexOf('system') == -1) return message
    })
    const messages1 = props.dataProvider.getMoreFeedUp(selectedChat.value.chatId,firstMessage.messageId, 10);
    if (messages1.length > 0){
      const additionalMessages = transformToFeed(messages1);
      if (additionalMessages[additionalMessages.length - 1].time == firstMessage.time && messages.value[0].type == 'system.date'){
          messages.value.shift()
      }
      messages.value = additionalMessages.concat(messages.value)
    }
  }
};

const loadMoreDown = () => {
  // do load more messages to feed when scroll down
  console.log("load more down");
  const currentLastMessage = messages.value[messages.value.length - 1]
  const savedLastMessage = props.dataProvider.getLastMessage(selectedChat.value.chatId)
  if (savedLastMessage && selectedChat.value && selectedChat.value.chatId == 5 && currentLastMessage.messageId != savedLastMessage.messageId){
    const newM = props.dataProvider.getMoreFeedDown(selectedChat.value.chatId, currentLastMessage.messageId, 10)
    const additionalMessages = transformToFeed(newM, currentLastMessage.timestamp)
    messages.value = messages.value.concat(additionalMessages)
  }
};

const forceScrollToBottom = () => {
  const currentLastMessage = messages.value[messages.value.length - 1].messageId
  const savedLastMessage = props.dataProvider.getLastMessage(selectedChat.value.chatId).messageId
  if (currentLastMessage != savedLastMessage){
    const messages1 = props.dataProvider.getFeed(selectedChat.value.chatId);
    messages.value = transformToFeed(messages1);
  }
}

const messageVisible = (message) => {
  // processing message in feed visible area 
  // console.log('visible message', message.type')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _message = message;
}

const searchMessages = (string) => {
  if (string && string.length > 0){
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

const onSelectChannel = (channel) => {
  console.log('selected channel', channel);
}

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище

  props.dataProvider.addMessage({
    text: message.text,
    type: message.type,
    chatId: selectedChat.value.chatId,
    url: message.url || null,
    filename: message.filename || null,
    status: 'sent',
    direction: "outgoing",
    timestamp: moment().unix(),
    reply: message.reply || null,
  });
  messages.value = getFeedObjects(); // Обновление сообщений
};

const sendWabaValues = (obj) => {
  console.log('send waba values', obj);
  const messageObject = {
    type: '',
    text: '',
    url: '',
    filename: '',
    size: '',
  };

  if (obj.file) {
    messageObject.type = 'message.' + obj.file.filetype;
    messageObject.url = obj.file.url;
    messageObject.filename = obj.file.filename;
    messageObject.size = obj.file.filesize.toString();
    messageObject.text = obj.text.trim();
  } else {
    messageObject.type = 'message.text';
    messageObject.text = obj.text.trim();
  }

  addMessage(messageObject)
}

const selectChat = (chat) => {
  scrollToBottomOnSelectChat.value = true
  inputFocus.value = true
  selectedChat.value = chat;
  chatsStore.setUnreadCounter(chat.chatId, 0);
  messages.value = getFeedObjects(); // Обновляем сообщения при выборе чата
  setTimeout(() => {
    scrollToBottomOnSelectChat.value = false
    inputFocus.value = false
  }, 50)
};

const handleClickReplied = (messageId) => {
  console.log('Clicked reply id ' + messageId)
  const message = messages.value.find((m) => {
    if (m.messageId == messageId) return m
    })
  if (!message) {
    const messages1 = props.dataProvider.getFeedByMessage(selectedChat.value.chatId, messageId)
    messages.value = transformToFeed(messages1)
  }
  setTimeout(() => {
      highlightMessage(messageId)
  }, 50)
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

const handleEvent = async (event) => {
  console.log(event)
  if (event.type === "message") {
    chatsStore.setUnreadCounter(event.data.chatId, 1);
    if (event.data.chatId == selectedChat?.value?.chatId) {
      messages.value = getFeedObjects();
      isScrollToBottomOnUpdateObjectsEnabled.value = true;
    }
    
    setTimeout(() => {
      isScrollToBottomOnUpdateObjectsEnabled.value = false;
    }, 50)
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
  templates.value = props.dataProvider.getTemplates()
  wabaTemplates.value = props.dataProvider.getWABATemplates()
  groupTemplates.value = props.dataProvider.getGroupTemplates()
  sidebarItems.value = props.dataProvider.getSidebarItems();
  console.log('eee', sidebarItems.value)
  //selectChat(chatsStore.chats[0])
});
</script>
