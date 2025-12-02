import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed } from 'vue';

import BaseContainer from '../../components/5_containers/BaseContainer/BaseContainer.vue';
import BaseLayout from '../../components/4_layouts/BaseLayout/BaseLayout.vue';
import ChatWrapper from '../../components/4_layouts/ChatWrapper/ChatWrapper.vue';
import Feed from '../../components/3_compounds/Feed/Feed.vue';
import ChatInput from '../../components/3_compounds/ChatInput/ChatInput.vue';
import ChatList from '../../components/3_compounds/ChatList/ChatList.vue';
import ChatListHeader from '../../components/3_compounds/ChatList/ChatListHeader.vue';
import ChatInfo from '../../components/2_elements/ChatInfo/ChatInfo.vue';
import ThemeMode from '../../components/2_elements/ThemeMode/ThemeMode.vue';
import ButtonEmojiPicker from '../../components/2_chatinput_elements/ButtonEmojiPicker/ButtonEmojiPicker.vue';
import FileUploader from '../../components/2_chatinput_elements/FileUploader/FileUploader.vue';
import ButtonTemplateSelector from '../../components/2_chatinput_elements/ButtonTemplateSelector/ButtonTemplateSelector.vue';
import StickerPicker from '../../components/2_chatinput_elements/StickerPicker/StickerPicker.vue';

import { themes } from '../data/themes';
import { templates, groupTemplates } from '../data';
import { transformToFeed } from '../transform/transformToFeed';
import sticker from '../data/images/sticker.webp';
import {
  approveSticker,
  callSticker,
  dealSticker,
  docsSticker,
  goodDaySticker,
  helpSticker,
  soonSticker,
  thxSticker,
} from '../data/images/stickers';

// Простые чаты для примера
const simpleChats = [
  {
    chatId: 1,
    name: "Анна",
    avatar: 'https://placehold.jp/30/ffc5d3/ffffff/64x64.png?text=A',
    countUnread: 2,
    lastMessage: 'Привет! Как дела?',
    'lastActivity.time': '5 минут назад',
    'lastActivity.timestamp': '1700000000000',
    isFixedBottom: false,
    status: "#10b981",
    'lastMessage.status': 'read',
    typing: false,
    metadata: '',
    dialogsExpanded: false,
  },
  {
    chatId: 2,
    name: "Иван",
    avatar: 'https://placehold.jp/30/90d5ff/ffffff/64x64.png?text=I',
    countUnread: 0,
    lastMessage: 'Спасибо за помощь!',
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1699996400000',
    isFixedBottom: false,
    status: "#10b981",
    'lastMessage.status': 'read',
    typing: false,
    metadata: '',
    dialogsExpanded: false,
  }
];

// Простые сообщения для примеров
const simpleMessages = [
  // Сообщения для чата 1 (Анна)
  {
    chatId: 1,
    type: "message.text",
    direction: 'incoming',
    messageId: '1',
    text: "Привет! Как дела?",
    timestamp: '1761991199',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.audio",
    direction: 'outgoing',
    messageId: '2',
    url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    timestamp: '1762077999',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'incoming',
    messageId: '3',
    text: "Отлично! Рада слышать 😊",
    timestamp: '1762163999',
    status: 'read',
    reactions: {
      items: [
        { key: '🔥', count: 1, reactedByMe: true }
      ]
    }
  },
  {
    chatId: 1,
    type: "message.file",
    direction: 'incoming',
    messageId: '7',
    url: "https://axiomabio.com/pdf/test.pdf",
    filename: "Расписание.pdf",
    timestamp: '1762164200',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.sticker",
    direction: 'outgoing',
    messageId: '9',
    url: sticker,
    alt: "Animated sticker",
    timestamp: '1762164100',
    status: 'read',
  },
  // Сообщения для чата 2 (Иван)
  {
    chatId: 2,
    type: "message.text",
    direction: 'outgoing',
    messageId: '4',
    text: "Привет! Как дела?",
    timestamp: '1761991199',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.audio",
    direction: 'incoming',
    messageId: '5',
    url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    timestamp: '1762077599',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.text",
    direction: 'outgoing',
    messageId: '6',
    text: "Отлично! Рада слышать 😊",
    timestamp: '1762163999',
    status: 'read',
    reactions: {
      items: [
        { key: '🔥', count: 1, reactedByMe: false }
      ]
    }
  },
  {
    chatId: 2,
    type: "message.sticker",
    direction: 'incoming',
    messageId: '9',
    url: sticker,
    alt: "Animated sticker",
    timestamp: '1762164100',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.file",
    direction: 'outgoing',
    messageId: '8',
    url: "https://axiomabio.com/pdf/test.pdf",
    filename: "Расписание.pdf",
    timestamp: '1762164200',
    status: 'read',
  },
];

const meta: Meta = {
  title: 'Examples/Basic Chat Example',
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  render: () => ({
    components: { 
      BaseContainer, 
      BaseLayout, 
      ChatWrapper, 
      Feed, 
      ChatInput, 
      ChatList,
      ChatListHeader,
      ChatInfo,
      ThemeMode,
      ButtonEmojiPicker,
      FileUploader,
      ButtonTemplateSelector,
      StickerPicker
    },
    setup() {
      const chatsRef = ref([...simpleChats]);
      const selectedChatRef = ref(chatsRef.value[0]);
      
      // Делаем сообщения реактивными
      const messagesRef = ref([...simpleMessages]);
      
      // Вычисляем сообщения для выбранного чата
      const feedMessagesRef = computed(() => {
        if (!selectedChatRef.value) {
          return [];
        }
        const chatId = selectedChatRef.value.chatId;
        const chatMessages = messagesRef.value
          .filter(msg => msg.chatId === chatId && msg.direction && msg.timestamp)
          .map(msg => ({
            ...msg,
            direction: msg.direction!,
            timestamp: typeof msg.timestamp === 'string' ? parseInt(msg.timestamp, 10) : (msg.timestamp as number)
          }));
        return transformToFeed(chatMessages);
      });
      
      const handleSend = (message: { 
        text?: string; 
        type?: string; 
        url?: string; 
        filename?: string; 
        size?: string;
        alt?: string;
      }) => {
        if (!selectedChatRef.value) return;
        
        const now = Date.now();
        const nowInSeconds = Math.floor(now / 1000);
        const nowString = String(nowInSeconds);
        const currentChatId = selectedChatRef.value.chatId;
        
        // Определяем, от кого отправляется сообщение
        // Если выбран чат с Анной (1), то сообщение от Ивана (2)
        // Если выбран чат с Иваном (2), то сообщение от Анны (1)
        const senderChatId = currentChatId === 1 ? 2 : 1;
        
        // Определяем тип сообщения и текст для отображения
        const messageType = message.type || "message.text";
        const displayText = message.text || (messageType.includes('sticker') ? 'Стикер' : messageType.includes('file') ? message.filename || 'Файл' : '');
        
        // Создаем сообщение для текущего чата (исходящее - справа)
        const outgoingMessage: {
          chatId: number;
          type: string;
          direction: 'outgoing';
          messageId: string;
          text: string;
          timestamp: string;
          status: 'sent';
          url?: string;
          filename?: string;
          alt?: string;
          size?: string;
        } = {
          chatId: currentChatId,
          type: messageType,
          direction: 'outgoing',
          messageId: `${now}-outgoing`,
          text: message.text || '',
          timestamp: nowString,
          status: 'sent',
        };
        
        // Добавляем поля для файлов и стикеров
        if (message.url) {
          outgoingMessage.url = message.url;
        }
        if (message.filename) {
          outgoingMessage.filename = message.filename;
        }
        if (message.alt) {
          outgoingMessage.alt = message.alt;
        }
        if (message.size) {
          outgoingMessage.size = message.size;
        }
        
        // Создаем сообщение для другого чата (входящее - слева)
        const incomingMessage: {
          chatId: number;
          type: string;
          direction: 'incoming';
          messageId: string;
          text: string;
          timestamp: string;
          status: 'read';
          url?: string;
          filename?: string;
          alt?: string;
          size?: string;
        } = {
          chatId: senderChatId,
          type: messageType,
          direction: 'incoming',
          messageId: `${now}-incoming`,
          text: message.text || '',
          timestamp: nowString,
          status: 'read',
        };
        
        // Добавляем поля для файлов и стикеров
        if (message.url) {
          incomingMessage.url = message.url;
        }
        if (message.filename) {
          incomingMessage.filename = message.filename;
        }
        if (message.alt) {
          incomingMessage.alt = message.alt;
        }
        if (message.size) {
          incomingMessage.size = message.size;
        }
        
        // Добавляем оба сообщения в массив
        messagesRef.value.push(outgoingMessage as typeof simpleMessages[0]);
        messagesRef.value.push(incomingMessage as typeof simpleMessages[0]);
        
        // Обновляем информацию о последнем сообщении в обоих чатах
        const currentChat = chatsRef.value.find(c => c.chatId === currentChatId);
        const otherChat = chatsRef.value.find(c => c.chatId === senderChatId);
        
        if (currentChat) {
          currentChat.lastMessage = displayText;
          currentChat['lastActivity.time'] = 'только что';
          currentChat['lastActivity.timestamp'] = nowString;
        }
        
        if (otherChat) {
          otherChat.lastMessage = displayText;
          otherChat['lastActivity.time'] = 'только что';
          otherChat['lastActivity.timestamp'] = nowString;
          otherChat.countUnread = (otherChat.countUnread || 0) + 1;
        }
      };
      
      const handleSelectChat = (args: { chat: typeof simpleChats[0]; dialog?: unknown }) => {
        // Находим чат в реактивном массиве
        const chat = chatsRef.value.find(c => c.chatId === args.chat.chatId);
        if (chat) {
          selectedChatRef.value = chat;
          // Обновляем счетчик непрочитанных при выборе чата
          if (chat.countUnread > 0) {
            chat.countUnread = 0;
          }
        }
      };
      
      const handleChatAction = (data: unknown) => {
        console.log('Chat action:', data);
      };
      
      const handleMessageAction = (data: unknown) => {
        console.log('Message action:', data);
      };
      
      const handleLoadMore = () => {
        console.log('Load more messages');
      };
      
      const handleThemeChange = (themeCode: string) => {
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
        const containers = document.querySelectorAll('[id^="vue-id"]');
        containers.forEach((container) => {
          (container as HTMLElement).dataset.theme = themeCode;
        });
      };
      
      // Массив стикеров для StickerPicker
      const stickers = [
        { url: approveSticker, alt: '✔' },
        { url: callSticker, alt: '📱' },
        { url: dealSticker, alt: '👍' },
        { url: docsSticker, alt: '📄' },
        { url: goodDaySticker, alt: '🙋‍♀️' },
        { url: helpSticker, alt: '🆘' },
        { url: soonSticker, alt: '🔜' },
        { url: thxSticker, alt: '🙏' },
      ];
      
      return { 
        messages: feedMessagesRef, 
        chats: chatsRef,
        selectedChat: selectedChatRef,
        handleSend,
        handleSelectChat,
        handleChatAction,
        handleMessageAction,
        handleLoadMore,
        themes,
        handleThemeChange,
        templates,
        groupTemplates,
        stickers
      };
    },
    template: `
      <BaseContainer max-height="660px" width="100%" style="overflow-y: hidden" >
        <BaseLayout style="height: 600px; min-height: 0;">
          <template #first-col>
            <ChatList 
              :chats="chats"
              filter-enabled
              @select="handleSelectChat"
              @action="handleChatAction"
            >
              <template #header>
                <ChatListHeader title="Чаты" />
              </template>
            </ChatList>
            <ThemeMode 
              :themes="themes" 
              :show="true" 
              @selected-theme="handleThemeChange" 
            />
          </template>
          
          <template #second-col>
            <div style="height: 100%; min-height: 0; display: flex; flex-direction: column; overflow: hidden;">
              <ChatWrapper :is-selected-chat="!!selectedChat" style="height: 100%; min-height: 0; display: flex; flex-direction: column; overflow: hidden;">
                <ChatInfo :chat="selectedChat" />
                <div style="flex: 1 1 0; min-height: 0; overflow-y: auto;">
                  <Feed 
                    :objects="messages" 
                    @message-action="handleMessageAction"
                    @load-more="handleLoadMore"
                  />
                </div>
                <ChatInput @send="handleSend">
                  <template #inline-buttons>
                    <FileUploader :state="'active'" />
                    <ButtonTemplateSelector :mode="'click'" :state="'active'" :templates="templates" :group-templates="groupTemplates" />
                    <ButtonEmojiPicker :mode="'click'" :state="'active'" />
                    <StickerPicker :mode="'click'" :state="'active'" :stickers="stickers" />          
                  </template>
                </ChatInput>
              </ChatWrapper>
            </div>
          </template>
        </BaseLayout>
      </BaseContainer>
    `,
  }),
};

