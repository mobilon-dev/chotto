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
            :show-settings="true"
            :sidebar-items="sidebarItems"
            :menu-actions="menuActions"
            @select-item="selectItem"
          />
          <ThemeMode
            :themes="themes"
            :show="true"
            @selected-theme="setTheme"
          />
        </template>

        <template #second-col>
          <ChatList
            v-if="!isOpenSearchPanel || (isOpenSearchPanel && feedSearchFeedCol)"
            ref="refChatList"
            :chats="chatsStore.chats"
            filter-enabled
            :title-enabled="true"
            :title="'Mobilon One'"
            :dialog-tabs="dialogTabs"
            :active-tab-id="activeTabId"
            @select="selectChat"
            @expand="expandChat"
            @action="chatAction"
            @load-more-chats="loadMoreChats"
            @tab-click="handleTabClick"
          >
            <template #actions>
              <!-- <h2>Чаты</h2> -->
              <div class="actions">
                <button
                  title="Добавить чат с контактом"
                  @click="createChat"
                >
                  <i class="pi pi-plus" />
                </button>
              </div>
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
                      <CommunicationPanel
                        :contact-attributes="selectedChat?.contact?.attributes"
                        :channels="toRaw(channels)"
                        :recent-attribute-channels="recentAttributeChannels"
                        :selected-dialog="selectedDialog"
                        :channel-tooltips="channelTooltips"
                        @select-attribute-channel="handleAttributeChannelSelect"
                        @phone-call="handlePhoneCall"
                      />
                      <button
                        class="chat-info__button-panel chat-info__button-validation"
                        :class="{ 'validation-error': !isChatsValid }"
                        :title="isChatsValid ? 'Чаты валидны ✓' : `Ошибок в чатах: ${chatErrorCount}`"
                        @click="showChatsReport"
                      >
                        <span class="validation-icon validation-icon--chats">{{ isChatsValid ? '✓' : '!' }}</span>
                      </button>
                      <button
                        class="chat-info__button-panel chat-info__button-validation chat-info__button-validation--messages"
                        :class="{ 'validation-error': !isMessagesValid }"
                        :title="isMessagesValid ? 'Сообщения валидны ✓' : `Ошибок в сообщениях: ${messageErrorCount}`"
                        @click="showMessagesReport"
                      >
                        <span class="validation-icon validation-icon--messages">{{ isMessagesValid ? '✉' : '!' }}</span>
                      </button>
                      <button
                        class="chat-info__button-panel chat-info__button-validation chat-info__button-validation--sidebar"
                        :class="{ 'validation-error': !isSidebarValid }"
                        :title="isSidebarValid ? 'Sidebar валиден ✓' : `Ошибок в sidebar: ${sidebarErrorCount}`"
                        @click="showSidebarReport"
                      >
                        <span class="validation-icon validation-icon--sidebar">{{ isSidebarValid ? '☰' : '!' }}</span>
                      </button>
                      <button
                        class="chat-info__button-panel"
                        @click="isOpenChatPanel = !isOpenChatPanel"
                      >
                        <span class="">
                          <MenuIcon />
                        </span>
                      </button>
                      <!-- <button
                        class="chat-info__button-panel"
                        @click="handleOpenSearchPanel"
                      >
                        <span class="pi pi-search" />
                      </button> -->
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
                  :feed-keyboards="feedKeyboards"
                  feed-keyboard-align="left"
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
                    <!-- <ButtonCommandsSelector
                      :mode="'hover'"
                      :commands="commands"
                      @send="addMessage"
                    /> -->
                    <FileUploader
                      :filebump-url="filebumpUrl"
                    />
                    <ButtonTemplateSelector
                      :templates="templates"
                      :group-templates="groupTemplates"
                      :mode="'click'"
                      :elevated-window="false"
                    />
                    <ButtonEmojiPicker
                      :mode="'hover'"
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
                title="Данные контакта"
                :title-enabled="true"
                chat-panel-width="17"
                @close-panel="isOpenChatPanel = false"
              >
                <template #content>
                  <div>
                    <!-- {{ selectedChat.name }}  -->
                    <!-- <button
                      class="button-close"
                      @click="isOpenChatPanel = !isOpenChatPanel"
                    >
                      <span class="pi pi-times" />
                    </button> -->
                    <ContactInfo
                      :contact="selectedChat?.contact"
                      :current-dialog="selectedDialog"
                      :channels="channels"
                      @close="isOpenChatPanel = false"
                      @open-crm="openInCRM"
                      @select-attribute-channel="handleAttributeChannelSelect"
                    />
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
import { onMounted, ref, computed, unref, toRaw } from "vue";

import {
  MenuIcon,
  ChatInfo,
  ChatInput,
  ChatList,
  Feed,
  // UserProfile,
  ThemeMode,
  SideBar,
  ChatPanel,
  ExtendedLayout,
  ChatWrapper,
  // useModalCreateChat,
  // useModalCreateChat2,
  // ButtonContextMenu,
  ButtonTemplateSelector,
  // ButtonWabaTemplateSelector,
  ButtonEmojiPicker,
  FileUploader,
  FeedSearch,
  // ChannelSelector,
  FeedFoundObjects,
  // AudioRecorder,
  CommunicationPanel,
  ContactInfo, 
  BaseContainer, 
  SplashScreen,
} from "@/components";

import { playNotificationAudio } from "@/functions";

import { useChatsStore } from "../stores/useChatStore";
import { transformToFeed } from "../transform/transformToFeed";
// import { useLocale } from "../locale/useLocale";

import { useModalCreateDialog, useModalSelectUser2, useModalCreateChat2 } from "@/hooks";
import { themes as themesData } from '../data';

import { useChatValidator, 
  useMessageValidator, useSidebarValidator,
} from "@/hooks/validators";
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

const themes = themesData.map(theme => 
  theme.code === 'mobilon1' ? { ...theme, default: true } : theme
);

const menuActions = [
  {
    id: 'profile',
    title: 'Профиль',
    disabled: false,
    action: () => {
      console.log('Открытие профиля...');
    }
  },
  {
    id: 'settings',
    title: 'Настройки',
    disabled: false,
    action: () => {
      console.log('Открытие настроек...');
    }
  }
];

const chatsStore = useChatsStore();

// Реактивная валидация чатов
const chatsData = computed(() => chatsStore.chats);
const { 
  isValid: isChatsValid, 
  errorCount: chatErrorCount, 
  showReport: showChatsReport 
} = useChatValidator(chatsData, {
  autoValidate: true,
  debounce: 300
});

const selectedChat = ref(null);
const selectedDialog = ref(null)

const messages = ref([]);

// Реактивная валидация сообщений
const { 
  isValid: isMessagesValid, 
  errorCount: messageErrorCount, 
  showReport: showMessagesReport 
} = useMessageValidator(messages, {
  autoValidate: true,
  debounce: 300
});

const userProfile = ref({});
const channels = ref([]);
const templates = ref([]);
const wabaTemplates = ref([])
const groupTemplates = ref([])
const sidebarItems = ref([]);

// Реактивная валидация sidebar items
const { 
  isValid: isSidebarValid, 
  errorCount: sidebarErrorCount, 
  showReport: showSidebarReport 
} = useSidebarValidator(sidebarItems, {
  autoValidate: true,
  debounce: 300
});
const isOpenChatPanel = ref(false);
const isOpenSearchPanel = ref(false)
const notFoundMessage = ref(false)
const isScrollToBottomOnUpdateObjectsEnabled = ref(false);
const scrollToBottomOnSelectChat = ref(false)
const inputFocus = ref(false)
const filebumpUrl = ref('https://filebump2.services.mobilon.ru');
const clickedReply = ref('')
const foundMessages = ref([])

// const dialogTabs = ref([]);
const dialogTabs = ref([
  { id: 'all', label: 'Все', active: true },
  { id: 'countUnread', label: 'Непрочитанные', active: false },
  { id: 'tag_amq9w5j', label: 'tag: Партнёры', active: false },
]);

const activeTabId = ref('all');


const feedKeyboards = ref([
  {
    key: 'No answer',
    text: 'Ответ не нужен',
    order: 1,
    'shadow-color': '#00000033',
    action: () => {
      console.log('Ответ не нужен');
    }
  },
]);

const feedSearchFeedCol = ref(false)
const sidebarFirstCol = ref(true)
const isShowFeedWhileSearch = ref(true)
const isSecondColVisible = ref(false)
const isThirdColVisible = ref(false)
const isShowReturnButton = ref(false)
const chatPanelWidth = ref(50)
const theme = ref('')

const description = ref()

// Моковая строка тултипа для блока "Недавний" панели CommunicationPanel
// const recentTooltipText = ref('01.09.25 10:05:10 через +7 (391) 247-50-00 Успешный 02:05')

// Тексты тултипов для кнопок панели CommunicationPanel
const channelTooltips = ref({
  phone: 'Позвонить',
  whatsapp: 'Выберите контакт и канал для отправки сообщения',
  telegram: 'Выберите контакт и канал для отправки сообщения',
  max: 'Выберите контакт и канал для отправки сообщения'
})

const refContainer = ref()
const refChatWrapper = ref()

const recentAttributeChannels = computed(() => {
  const dialogs = selectedChat.value?.dialogs || [];

  // IMPORTANT: 'whatsapp' includes both of whatsapp and waba types
  // 'telegram' includes both of telegram and telegrambot types
  const recentAttributeChannels = {};

  const whatsappDialogs = dialogs?.filter(
    d => d.channelId?.includes('whatsapp') || d.channelId?.includes('waba')
  ).toSorted((d1, d2) => d2['lastActivity.timestamp'] - d1['lastActivity.timestamp']);

  const telegramDialogs = dialogs?.filter(
    d => d.channelId?.includes('telegram') || d.channelId?.includes('telegrambot')
  ).toSorted((d1, d2) => d2['lastActivity.timestamp'] - d1['lastActivity.timestamp']);

  if (whatsappDialogs?.length) {
    recentAttributeChannels['whatsapp'] = {
      attributeId: whatsappDialogs[0]?.attributeId, 
      channelId: whatsappDialogs[0]?.channelId,
      tooltip: channels.value.find(ch => ch.channelId === whatsappDialogs[0]?.channelId)?.title,
    };
  }

  if (telegramDialogs?.length) {
    recentAttributeChannels['telegram'] = {
      attributeId: telegramDialogs[0]?.attributeId, 
      channelId: telegramDialogs[0]?.channelId,
      tooltip: channels.value.find(ch => ch.channelId === telegramDialogs[0]?.channelId)?.title,
    };
  }

  return recentAttributeChannels; 
});

// const commands = computed(() => {
//   if (selectedChat.value && selectedChat.value.commands) return selectedChat.value.commands
//   else return null
// })

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

const handleTabClick = (tabId) => {
  dialogTabs.value.forEach(tab => {
    tab.active = tab.id === tabId;
  });
  activeTabId.value = tabId;
  console.log('Active tab:', tabId);
};

const handlePhoneCall = (data) => {
  console.log(`Звонок на номер ${data?.phoneNumber} ...`);
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

// const addMessage = (message) => {
//   console.log(message);
//   // Добавление сообщения в хранилище
//   if (message.type != 'message.command'){
//     props.dataProvider.addMessage({
//       text: message.text,
//       type: message.type,
//       chatId: selectedChat.value.chatId,
//       url: message.url || null,
//       filename: message.filename || null,
//       status: 'sent',
//       direction: "outgoing",
//       timestamp: moment().unix(),
//       reply: message.reply || null,
//     });
//     messages.value = getFeedObjects(); // Обновление сообщений
//   }
//   else {
//     //обработка команды 
//   }
//   
// };

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
  console.log('TEST selectChat', args)
  if(args.dialog){
    description.value = args.dialog.name
    selectedDialog.value = args.dialog
    selectedDialog.value.isSelected = true
    if (selectedChat.value) {
      selectedChat.value.dialogs.forEach(d => 
      d.isSelected = d.dialogId === selectedDialog.value.dialogId
    )
    }
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

const openInCRM = () => {
  console.log('Открытие контакта в CRM', selectedChat.value);
};

const handleAttributeChannelSelect = (data) => {
  console.log('Выбран атрибут/канал:', data);
  if (selectedChat.value) {
    const targetDialog = selectedChat.value.dialogs.find(
      d => d.attributeId === data.attributeId && 
      d.channelId === data.channelId
    );
    if (targetDialog) selectChat({chat: selectedChat.value, dialog: targetDialog});
  }
};

// Демонстрационная функция создания чата
const createChat = async () => {
  try {
    // Получаем текущую тему из DOM
    const selectedTheme = Array.from(document.querySelectorAll('div[data-theme]'))[0]?.getAttribute('data-theme') || 'mobilon1';
    
    // Открываем модальное окно CreateChat2
    const result = await useModalCreateChat2('Создание чата с контактом', selectedTheme);
    
    console.log('Демо: Данные из модального окна:', result);
    console.log('Демо: Имя контакта:', result.contact.name);
    console.log('Демо: Телефон контакта:', result.contact.phone);
    
    // Демонстрационная логика: создаем моковый чат и добавляем его в список
    if (result.contact.name && result.contact.phone) {
      const newChat = {
        chatId: Date.now(), // Используем timestamp как ID
        name: result.contact.name,
        title: result.contact.name,
        unreadCount: 0,
        lastMessage: 'Новый чат создан',
        contact: {
          name: result.contact.name,
          phone: result.contact.phone,
          attributes: []
        },
      };
      
      // Добавляем новый чат в начало списка
      chatsStore.chats.unshift(newChat);
      console.log('Демо: Новый чат добавлен в список:', newChat);
    }
    
  } catch (error) {
    console.log('Демо: Модальное окно было закрыто или произошла ошибка:', error);
  }
};


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
  --chotto-theme-message-right-bg: #DAF0FF;
  --chotto-theme-message-right-secondary-bg: #bce1fa;
  --chotto-theme-message-accent-line-color: #37AFE2;
  --chotto-chat-input-icon-color: #37AFE2;
}

.wa-message{
  --chotto-theme-message-right-bg: #D9FDD3;
  --chotto-theme-message-right-secondary-bg: #bbf3b2;
  --chotto-theme-message-accent-line-color: #25D366;
  --chotto-chat-input-icon-color: #25D366;
}

.chat-info__button-panel {
  background: none;
  border: none;
  padding: 5px;
  margin-right: 10px;
  margin-left: 10px;
  font: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #EAE8E7;
    box-shadow: 0 0 0 6px #EAE8E7;
  }
}

.chat-info__button-validation {
  position: relative;

  .validation-icon {
    font-size: 18px;
    font-weight: bold;
    color: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
    
    // Специфичные стили для кнопки чатов
    &--chats {
      color: #4CAF50;
    }
    
    // Специфичные стили для кнопки сообщений
    &--messages {
      color: #2196F3;
      font-size: 16px;
    }
  }

  &:hover {
    background-color: #E8F5E9;
    box-shadow: 0 0 0 6px #E8F5E9;
    
    .validation-icon--chats {
      color: #2E7D32;
    }
  }
  
  // Специфичные стили при hover для кнопки сообщений
  &--messages:hover {
    background-color: #E3F2FD;
    box-shadow: 0 0 0 6px #E3F2FD;
    
    .validation-icon--messages {
      color: #1565C0;
    }
  }
  
  // Специфичные стили для кнопки sidebar
  .validation-icon--sidebar {
    color: #FF9800;
    font-size: 17px;
  }
  
  &--sidebar:hover {
    background-color: #FFF3E0;
    box-shadow: 0 0 0 6px #FFF3E0;
    
    .validation-icon--sidebar {
      color: #E65100;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  // Состояние с ошибками
  &.validation-error {
    .validation-icon {
      color: #f44336;
      animation: pulse-error 2s ease-in-out infinite;
    }

    &:hover {
      background-color: #FFEBEE;
      box-shadow: 0 0 0 6px #FFEBEE;
      
      .validation-icon {
        color: #c62828;
        animation: none;
      }
    }
  }
}

@keyframes pulse-error {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
