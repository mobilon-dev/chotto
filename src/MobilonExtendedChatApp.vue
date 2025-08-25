<template>
  <div>
    <BaseContainer
      ref="refContainer"
      height="90vh"
      width="90vw"
    >
      <ExtendedLayout>
        <template #first-col>
          <SideBar
            :sidebar-items="sidebarItems"
            @select-item="selectItem"
          />
          <ThemeMode
            :themes="themes"
            :show="false"
            @selected-theme="setTheme"
          />
        </template>

        <template #second-col>
          <ChatList
            v-if="!isOpenSearchPanel || (isOpenSearchPanel && feedSearchFeedCol)"
            ref="refChatList"
            :chats="chatsStore.chats"
            filter-enabled
            :title-enabled="false"
            @select="selectChat"
            @expand="expandChat"
            @action="chatAction"
            @load-more-chats="loadMoreChats"
          >
            <template #actions>
              <h2>Чаты</h2>
            </template>
          </ChatList>
          <FeedSearch 
            v-if="isOpenSearchPanel && !feedSearchFeedCol"
            @search="searchMessages"
            @cancel="isOpenSearchPanel = !isOpenSearchPanel"
          />
          <FeedFoundObjects
            v-if="isOpenSearchPanel && !feedSearchFeedCol"
            :not-found="notFoundMessage"
            :objects="foundMessages"
            :found-amount="foundMessages.length"
            @clicked-search="handleClickMessage"
          />
        </template>

        <template #third-col>
          <chat-wrapper
            ref="refChatWrapper"
            :is-open-chat-panel="isOpenChatPanel"
            :is-selected-chat="!!selectedChat"
            :chat-panel-width="chatPanelWidth"
          >
            <template #default>
              <div
                :id="'feed-location'"
                style="display: flex;
                flex-direction: column;
                height: 100%;"
              >
                <ChatInfo 
                  :chat="selectedChat"
                  :show-return-button="isShowReturnButton"
                  :default-last-activity-time="true"
                  :description="description"
                  additional-title="11:06"
                  @return-to-chats="handleReturnToChats"
                >
                  <template #img-description>
                    <img 
                      src="https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg"
                      height="16"
                      width="16"
                      style="margin: auto; margin-left: 0; margin-right: 5px;"
                    >
                  </template>
                  <template #actions>
                    <div style="display: flex;">
                      <button
                        class="chat-info__button-panel"
                        @click="isOpenChatPanel = !isOpenChatPanel"
                      >
                        <span class="pi pi-info-circle" />
                      </button>
                      <button
                        class="chat-info__button-panel"
                        @click="handleOpenSearchPanel"
                      >
                        <span class="pi pi-search" />
                      </button>
                    </div>
                  </template>
                </ChatInfo>
                <FeedSearch 
                  v-if="isOpenSearchPanel && feedSearchFeedCol"
                  is-feed-location
                  @search="searchMessages"
                  @cancel="handleOpenSearchPanel"
                  @switch="isShowFeedWhileSearch = !isShowFeedWhileSearch"
                />
                <FeedFoundObjects
                  v-if="isOpenSearchPanel && feedSearchFeedCol && !isShowFeedWhileSearch"
                  :not-found="notFoundMessage"
                  :objects="foundMessages"
                  :found-amount="foundMessages.length"
                  @clicked-search="handleClickMessage"
                />
                <Feed
                  v-if="isShowFeedWhileSearch || !feedSearchFeedCol"
                  :button-params="buttonParams"
                  :objects="messages"
                  :typing="selectedChat.typing ? { avatar: selectedChat.avatar, title: selectedChat.title } : false"
                  :enable-double-click-reply="true"
                  :scroll-to="clickedReply"
                  :scroll-to-bottom="scrollToBottomOnSelectChat || isScrollToBottomOnUpdateObjectsEnabled"
                  :apply-style="setMessageClass"
                  @message-action="messageAction"
                  @load-more="loadMore"
                  @load-more-down="loadMoreDown"
                  @message-visible="messageVisible"
                  @click-replied-message="handleClickReplied"
                  @force-scroll-to-bottom="forceScrollToBottom"
                  @keyboard-action="keyboardAction"
                >
                  <template #empty-feed>
                    <SplashScreen>
                      <template #title>
                        <h3>Нет сообщений</h3>
                      </template>
                      <template #text>
                        <span style="max-width: 300px; display: block;">Вы можете отправить новое сообщение или воспользоваться шаблоном</span>
                      </template>
                      <template #picture>
                        <img 
                          src="https://filebump2.services.mobilon.ru/file/J2PDOO0mtcsK2v7J3z6tGJ2ttG1IwtlYnHLU/"
                          width="196"
                          height="196"
                        >
                      </template>
                    </SplashScreen>
                  </template>
                </Feed>
                <ChatInput 
                  :focus-on-input-area="inputFocus"
                >
                  <template #inline-buttons>
                    <ButtonCommandsSelector
                      :mode="'hover'"
                      :commands="commands"
                      @send="addMessage"
                    />
                    <FileUploader
                      :filebump-url="filebumpUrl"
                    />
                    <ButtonEmojiPicker
                      :mode="'hover'"
                    />
                    <ButtonTemplateSelector
                      :templates="templates"
                      :group-templates="groupTemplates"
                      :mode="'click'"
                      :elevated-window="false"
                    />
                  </template>
                  <!--template #buttons>
                    
                    <ButtonWabaTemplateSelector
                      :waba-templates="wabaTemplates"
                      :group-templates="groupTemplates"
                      :mode="'click'"
                      :filebump-url="filebumpUrl"
                      :elevated-window="false"
                      @send-waba-values="sendWabaValues"
                    />
                    <ChannelSelector
                      :channels="channels"
                      :mode="'click'"
                      @select-channel="onSelectChannel"
                    />
                    <AudioRecorder :filebump-url="filebumpUrl" />
                    <VideoRecorder :filebump-url="filebumpUrl" />
                  </template-->
                </ChatInput>
              </div>
            </template>

            <template #placeholder>
              <SplashScreen>
                <template #title>
                  <h3>Привет!</h3>
                </template>
                <template #text>
                  <span>Выберите чат и диалог из списка слева</span>
                </template>
                <template #picture>
                  <img 
                    src="https://filebump2.services.mobilon.ru/file/kUvCq3FDfVXR5UsJ1rB9Z7eFk23Xy3bqyQEZ"
                    width="196"
                    height="196"
                  >
                </template>
              </SplashScreen>
            </template>

            <template #chatpanel>
              <ChatPanel
                v-if="isOpenChatPanel"
                :title-enabled="false"
              >
                <template #content>
                  <div>
                    {{ selectedChat.name }} 
                    <button
                      class="button-close"
                      @click="isOpenChatPanel = !isOpenChatPanel"
                    >
                      <span class="pi pi-times" />
                    </button>
                  </div>
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
import { onMounted, ref, computed, unref } from "vue";
// import { nextTick } from "vue";
import moment from 'moment';

import {
  ChatInfo,
  ChatInput,
  ChatList,
  Feed,
  // UserProfile,
  ThemeMode,
  SideBar,
  ChatPanel,
  BaseContainer,
  ExtendedLayout,
  ChatWrapper,
  useModalSelectUser2,
  // useModalCreateChat,
  // useModalCreateChat2,
  // ButtonContextMenu,
  useModalCreateDialog,
  ButtonTemplateSelector,
  // ButtonWabaTemplateSelector,
  ButtonEmojiPicker,
  FileUploader,
  FeedSearch,
  // ChannelSelector,
  FeedFoundObjects,
  // AudioRecorder,
} from "./library";

import {
  // formatTimestamp,
  // insertDaySeparators,
  playNotificationAudio,
  // sortByTimestamp,
} from "./helpers";

import { useChatsStore } from "./stores/useChatStore";
import { transformToFeed } from "./transform/transformToFeed";
// import { useLocale } from "./locale/useLocale";
// import VideoRecorder from "./library/components/VideoRecorder.vue";
import ButtonCommandsSelector from "./library/components/ButtonCommandsSelector.vue";
import SplashScreen from "./library/components/SplashScreen.vue";

// const { locale: currentLocale, locales } = useLocale()


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
// const locale = props.locale || currentLocale;

const buttonParams = {
  unreadAmount: 12
}

const themes = [
  {
    code: "light",
    name: "Light",
  },
  {
    code: "mobilon1",
    name: "mobilon1",
    default: true,
  },
  {
    code: "dark",
    name: "Dark",
  },
  {
    code: "green",
    name: 'Green'
  }
]

const chatsStore = useChatsStore();

const selectedChat = ref(null);
const selectedDialog = ref(null)

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

const feedSearchFeedCol = ref(false)
const sidebarFirstCol = ref(true)
const isShowFeedWhileSearch = ref(true)
const isSecondColVisible = ref(false)
const isThirdColVisible = ref(false)
const isShowReturnButton = ref(false)
const chatPanelWidth = ref(50)
const theme = ref('')

const description = ref()

const refContainer = ref()
const refChatWrapper = ref()

const commands = computed(() => {
  if (selectedChat.value && selectedChat.value.commands) return selectedChat.value.commands
  else return null
})

const setMessageClass = (message) => {
  if (message){
    if (message.dialogId == 'dlg_89789879')
      return 'tg-message'
    else 
      return 'wa-message' 
  }
}

const setTheme = (themeCode) => {
  theme.value = themeCode
}

const handleOpenSearchPanel = () => {
  isOpenSearchPanel.value = !isOpenSearchPanel.value
  isShowFeedWhileSearch.value = !isShowFeedWhileSearch.value
}

const handleReturnToChats = () => {
  isSecondColVisible.value = true
  isThirdColVisible.value = false
}

const selectItem = (item) => {
  console.log("selected sidebar item", item);
};

const loadMoreChats = () => {
  console.log('load more chats')
}

function channelFilter(contact, channels){
  //Изменить в зависимости от имеющихся объектов контакта и каналов
  if (contact.id.indexOf('phone') != -1){
    return [channels[0]]
  }
  if (contact.id.indexOf('tg') != -1){
    return [channels[1]]
  }
  else return null
}

const chatAction = async (data) => {
  console.log("chat action", data);
  if (data.action === "add") {
    const data = await useModalSelectUser2('Укажите новых участников чата', getUsers());
    // const data = await useModalCreateChat2('Добавьте контакт');
    console.log('users:', data);
  }

  if (data.action === 'addDialog'){
    const data1 = await useModalCreateDialog(
      'Новый диалог',
      data.chat.name, 
      data.chat.contact.attributes, 
      channels.value,
      channelFilter,
      theme.value
    )
    console.log('info', data1);
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
    setTimeout(() => {
      const messages1 = props.dataProvider.getMoreFeedUp(selectedChat.value.chatId,firstMessage.messageId, 10);
      if (messages1.length > 0){
        const additionalMessages = transformToFeed(messages1);
        if (additionalMessages[additionalMessages.length - 1].time == firstMessage.time && messages.value[0].type == 'system.date'){
            messages.value.shift()
        }
        messages.value = additionalMessages.concat(messages.value)
      }
    }, 500)
  }
};

const loadMoreDown = () => {
  // do load more messages to feed when scroll down
  console.log("load more down");
  const currentLastMessage = messages.value[messages.value.length - 1]
  const savedLastMessage = props.dataProvider.getLastMessage(selectedChat.value.chatId)
  if (savedLastMessage && selectedChat.value && selectedChat.value.chatId == 5 && currentLastMessage.messageId != savedLastMessage.messageId){
    setTimeout(() => {
      const newM = props.dataProvider.getMoreFeedDown(selectedChat.value.chatId, currentLastMessage.messageId, 10)
      const additionalMessages = transformToFeed(newM, currentLastMessage.timestamp)
      messages.value = messages.value.concat(additionalMessages)
    }, 500)
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

const keyboardAction = (action) => {
  console.log(action)
}

const messageVisible = (message) => {
  // processing message in feed visible area 
  // console.log('visible message', message.type')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _message = message;
}

const searchMessages = (string) => {
  foundMessages.value = []
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
}

const getFeedObjects = () => {
  // console.log('get feed')
  if (selectedChat.value) {
    // здесь обработка для передачи сообщений в feed
    let messages = props.dataProvider.getFeed(selectedChat.value.chatId);
    if (selectedDialog.value && selectedDialog.value.dialogId != 'all'){
      messages = messages.filter(m => m.dialogId == selectedDialog.value.dialogId)
    }
    const messages3 = transformToFeed(messages);
      return messages3;
  } else {
    return [];
  }
};

// const onSelectChannel = (channel) => {
//   console.log('selected channel', channel);
// }

const addMessage = (message) => {
  console.log(message);
  // Добавление сообщения в хранилище
  if (message.type != 'message.command'){
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
  }
  else {
    //обработка команды 
  }
  
};

// const sendWabaValues = (obj) => {
//   console.log('send waba values', obj);
//   const messageObject = {
//     type: '',
//     text: '',
//     url: '',
//     filename: '',
//     size: '',
//   };

//   if (obj.file) {
//     messageObject.type = 'message.' + obj.file.filetype;
//     messageObject.url = obj.file.url;
//     messageObject.filename = obj.file.filename;
//     messageObject.size = obj.file.filesize.toString();
//     messageObject.text = obj.text.trim();
//   } else {
//     messageObject.type = 'message.text';
//     messageObject.text = obj.text.trim();
//   }

//   addMessage(messageObject)
// }

const expandChat = (args) => {
  console.log(args)
  for (let chat of chatsStore.chats){
    if (chat.chatId != args.chatId) chat.dialogsExpanded = false
    else chat.dialogsExpanded = !chat.dialogsExpanded
  }
}

const selectChat = (args) => {
  console.log(args.chat, args.dialog)
  if(args.dialog){
    description.value = args.dialog.name
    selectedDialog.value = args.dialog
  }
  else {
    description.value = null
    if (args.chat.dialogs && args.chat.dialogs.length > 0){
      for (let d of args.chat.dialogs){
        selectedDialog.value = d
        description.value = d.name
        d.isSelected = true
        args.chat.dialogsExpanded = true
        break
      }
    }
  }
  isThirdColVisible.value = true
  isSecondColVisible.value = false
  scrollToBottomOnSelectChat.value = true
  inputFocus.value = true
  selectedChat.value = args.chat;
  chatsStore.setUnreadCounter(args.chat.chatId, 0);
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

const handleClickMessage = (messageId) => {
  isShowFeedWhileSearch.value = true
  console.log('Clicked message id ' + messageId)
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

const resizeObserver = new ResizeObserver((entries) => {
  if (entries[0] && entries[1]){
    const containerWidth = entries[0].target.clientWidth
    const chatwrapperWidth = entries[1].target.clientWidth
    if (chatwrapperWidth < 700) chatPanelWidth.value = 80
    if (chatwrapperWidth > 700) chatPanelWidth.value = 60

    if (containerWidth < 920){
      feedSearchFeedCol.value = true
      isShowReturnButton.value = true
    }
    if (containerWidth > 920){
      feedSearchFeedCol.value = false
      isShowReturnButton.value = false
    }
    if (containerWidth < 720){
      sidebarFirstCol.value = false
    }
    if (containerWidth > 720){
      sidebarFirstCol.value = true
    }
  }
});

onMounted(() => {
  // props.locale = locales.find((loc) => loc.code == props.locale)
  props.eventor.subscribe(handleEvent);
  userProfile.value = props.authProvider.getUserProfile();
  chatsStore.chats = props.dataProvider.getChats();
  //selectedChat.value = chatsStore.chats[5]
  //selectChat({chat: chatsStore.chats[5]})
  channels.value = props.dataProvider.getChannels();
  templates.value = props.dataProvider.getTemplates()
  wabaTemplates.value = props.dataProvider.getWABATemplates()
  groupTemplates.value = props.dataProvider.getGroupTemplates()
  sidebarItems.value = props.dataProvider.getSidebarItems();
  console.log('eee', sidebarItems.value)
  if (unref(refContainer).$el){
    resizeObserver.observe(unref(refContainer).$el)
  }
  if (unref(refChatWrapper).$el){
    resizeObserver.observe(unref(refChatWrapper).$el)
  }
});
</script>

<style lang="scss">

.tg-message{
  --chotto-message-right-bg: #DAF0FF;
  --chotto-message-right-secondary-bg: #bce1fa;
  --chotto-message-accent-line-color: #37AFE2;
  --chotto-chat-input-icon-color: #37AFE2;
}

.wa-message{
  --chotto-message-right-bg: #D9FDD3;
  --chotto-message-right-secondary-bg: #bbf3b2;
  --chotto-message-accent-line-color: #25D366;
  --chotto-chat-input-icon-color: #25D366;
}

</style>
