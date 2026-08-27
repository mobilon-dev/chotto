import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed, provide } from 'vue';

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
import type { MessageEditInfo } from '@/types';
import sticker from '../data/images/sticker.webp';
import audioFile from '../data/audio/file_example_MP3_700KB.mp3';
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
import {
  fireDevilSticker,
  fireHiSticker,
  fireLolSticker,
  fireScreamingSticker,
  fireSmokeSticker,
  fireThumbsUpSticker,
  fireTypingSticker,
  fireYesSticker,
} from '../data/images/stickers/animated';

// Простые чаты для примера
const simpleChats = [
  {
    chatId: 1,
    name: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    countUnread: 2,
    lastMessage: {
      type: 'message.image',
      data: {
        text: 'Как тебе аватар?',
      }
    },
    'lastActivity.time': '5 минут назад',
    'lastActivity.timestamp': '1700000000000',
    isFixedBottom: false,
    status: "#10b981",
    typing: false,
    metadata: '',
    dialogsExpanded: false,
    isSelected: true,
  },
  {
    chatId: 2,
    name: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
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
    isSelected: false,
  }
];

// Простые сообщения для примеров
type DemoMessage = {
  chatId: number;
  type: string;
  direction: string;
  header?: string;
  subText?: string;
  avatar?: string;
  messageId: string;
  text?: string;
  timestamp: string;
  status: string;
  url?: string;
  filename?: string;
  alt?: string;
  duration?: string | number;
  reactions?: {
    items: Array<{
      key: string;
      userId: string;
      name?: string;
      date?: number;
    }>;
  };
  edited?: MessageEditInfo;
  deleted?: boolean;
  deletion?: {
    deletedBy?: string;
    deletedAt?: string;
  };
  canEdit?: boolean;
  canDelete?: boolean;
  reply?: {
    messageId: string;
    type: string;
    text?: string;
    url?: string;
    filename?: string;
    header?: string;
    callDuration?: string;
    isMissedCall?: boolean;
  };
  size?: string;
};

const simpleMessages: DemoMessage[] = [
  // Сообщения для чата 1 (Анна)
  {
    chatId: 1,
    type: "message.text",
    direction: 'incoming',
    header: "Анна",
    subText: "Анна",
    messageId: '1',
    text: "Привет! Как дела?",
    timestamp: '1761991199',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.audio",
    direction: 'outgoing',
    header: "Иван",
    subText: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
    messageId: '2',
    url: audioFile,
    duration: 42,
    timestamp: '1762077999',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'incoming',
    header: "Анна",
    subText: "Анна",
    messageId: '3',
    text: "Отлично! Рада слышать 😊",
    timestamp: '1762163999',
    status: 'read',
    reactions: {
      items: [
        { key: '🔥', userId: 'usr_me', name: 'Анна', date: 1757151901 }
      ]
    }
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'outgoing',
    header: "Иван",
    subText: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
    messageId: '1-reply',
    text: "Отлично, спасибо!",
    timestamp: '1762164005',
    status: 'read',
    reply: {
      messageId: '1',
      type: 'message.text',
      text: 'Привет! Как дела?',
      header: 'Анна',
    },
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'outgoing',
    header: "Иван",
    subText: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
    messageId: 'long-quote',
    text: 'Уважаемые Алексей и Марина, благодарим вас за оперативную подготовку обновлённой версии макетов (v.2.1). Мы провели внутренний ревью с маркетингом, продуктом и юзабилити-командой — в целом прогресс заметен, и многие замечания из предыдущей итерации учтены. Однако остаются важные моменты, которые необходимо доработать до финального согласования. Прошу вас внимательно ознакомиться с перечнем правок ниже. Для удобства я разделила их по разделам и приоритетам. Также прикрепляю PDF с аннотациями — там вы найдёте визуальные пояснения к каждому пункту.',
    timestamp: '1762164008',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'incoming',
    header: "Анна",
    subText: "Анна",
    messageId: '1-reply-long',
    text: "Ок",
    timestamp: '1762164010',
    status: 'read',
    reply: {
      messageId: 'long-quote',
      type: 'message.text',
      text: 'Уважаемые Алексей и Марина, благодарим вас за оперативную подготовку обновлённой версии макетов (v.2.1). Мы провели внутренний ревью с маркетингом, продуктом и юзабилити-командой — в целом прогресс заметен, и многие замечания из предыдущей итерации учтены. Однако остаются важные моменты, которые необходимо доработать до финального согласования. Прошу вас внимательно ознакомиться с перечнем правок ниже. Для удобства я разделила их по разделам и приоритетам. Также прикрепляю PDF с аннотациями — там вы найдёте визуальные пояснения к каждому пункту.',
      header: 'Иван',
    },
  },
  {
    chatId: 1,
    type: "message.file",
    direction: 'incoming',
    header: "Анна",
    subText: "Анна",
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
    header: "Иван",
    subText: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
    messageId: '9',
    url: sticker,
    alt: "Animated sticker",
    timestamp: '1762164100',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.image",
    direction: 'incoming',
    text: "Как тебе аватар?",
    header: "Анна",
    subText: "Анна",
    messageId: '10',
    url: "https://polka.cs.mobilon.ru/avatars/vector/man?size=256&palette=soft&seed=1&style=round",
    alt: "Avatar",
    timestamp: '1762164300',
    status: 'read',
  },
  {
    chatId: 1,
    type: "message.text",
    direction: 'outgoing',
    header: "Иван",
    subText: "Иван",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round',
    messageId: '11-edited',
    text: "Добрый день. Нет, у нас выходной",
    timestamp: '1762164400',
    status: 'read',
    edited: {
      originalText: 'Добрый день',
      history: [
        {
          text: 'Добрый день. Нет у нас выходной',
          editedBy: 'Иван',
          editedAt: '18.07.26 в 09:15',
        },
        {
          text: 'Добрый день. Нет, у нас выходной',
          editedBy: 'Иван',
          editedAt: '19.07.26 в 14:30',
        },
        {
          text: 'Добрый день. Нет, у нас выходной',
          editedBy: 'Иван',
          editedAt: '20.07.26 в 11:08',
        },
      ],
    },
  },
  // Сообщения для чата 2 (Иван)
  {
    chatId: 2,
    type: "message.text",
    direction: 'outgoing',
    header: "Анна",
    subText: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    messageId: '4',
    text: "Привет! Как дела?",
    timestamp: '1761991199',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.audio",
    direction: 'incoming',
    header: "Иван",
    subText: "Иван",
    messageId: '5',
    url: audioFile,
    duration: 42,
    timestamp: '1762077599',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.text",
    direction: 'outgoing',
    header: "Анна",
    subText: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    messageId: '6',
    text: "Отлично! Рада слышать 😊",
    timestamp: '1762163999',
    status: 'read',
    reactions: {
      items: [
        { key: '🔥', userId: 'usr_other_0', name: 'Анна', date: 1757151901 }
      ]
    }
  },
  {
    chatId: 2,
    type: "message.text",
    direction: 'outgoing',
    header: "Анна",
    subText: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    messageId: '6-expired',
    text: "Старое сообщение — редактировать и удалить уже нельзя",
    timestamp: '1762164000',
    status: 'read',
    canEdit: false,
    canDelete: false,
  },
  {
    chatId: 2,
    type: "message.text",
    direction: 'incoming',
    header: "Иван",
    subText: "Иван",
    messageId: '4-reply',
    text: "Нормально, работаю",
    timestamp: '1762164005',
    status: 'read',
    reply: {
      messageId: '4',
      type: 'message.text',
      text: 'Привет! Как дела?',
      header: 'Анна',
    },
  },
  {
    chatId: 2,
    type: "message.sticker",
    direction: 'incoming',
    header: "Иван",
    subText: "Иван",
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
    header: "Анна",
    subText: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    messageId: '8',
    url: "https://axiomabio.com/pdf/test.pdf",
    filename: "Расписание.pdf",
    timestamp: '1762164200',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.image",
    direction: 'outgoing',
    text: "Как тебе аватар?",
    header: "Анна",
    subText: "Анна",
    avatar: 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round',
    messageId: '10',
    url: "https://polka.cs.mobilon.ru/avatars/vector/man?size=256&palette=soft&seed=1&style=round",
    alt: "Avatar",
    timestamp: '1762164300',
    status: 'read',
  },
  {
    chatId: 2,
    type: "message.text",
    direction: 'incoming',
    header: "Иван",
    subText: "Иван",
    messageId: '12-edited',
    text: "Добрый день. Нет, у нас выходной",
    timestamp: '1762164400',
    status: 'read',
    edited: {
      originalText: 'Добрый день',
      history: [
        {
          text: 'Добрый день. Нет у нас выходной',
          editedBy: 'Иван',
          editedAt: '18.07.26 в 10:20',
        },
        {
          text: 'Добрый день. Нет, у нас выходной',
          editedBy: 'Иван',
          editedAt: '19.07.26 в 16:45',
        },
        {
          text: 'Добрый день. Нет, у нас выходной',
          editedBy: 'Иван',
          editedAt: '20.07.26 в 11:08',
        },
      ],
    },
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
      provide('selectedChat', selectedChatRef);
      const scrollToMessageId = ref<string | null>(null);
      const scrollToBottom = ref(false);
      let scrollToTimer: ReturnType<typeof setTimeout> | null = null;
      let scrollToBottomTimer: ReturnType<typeof setTimeout> | null = null;

      const triggerScrollToBottom = () => {
        scrollToBottom.value = true;
        if (scrollToBottomTimer) {
          clearTimeout(scrollToBottomTimer);
        }
        scrollToBottomTimer = setTimeout(() => {
          scrollToBottom.value = false;
        }, 50);
      };
      
      // Делаем сообщения реактивными
      const messagesRef = ref<DemoMessage[]>([...simpleMessages]);

      const pad = (n: number) => String(n).padStart(2, '0');

      const formatClockTime = (timestampSeconds: number) => {
        const date = new Date(timestampSeconds * 1000);
        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
      };

      const formatEditAt = (date = new Date()) => {
        const yy = String(date.getFullYear()).slice(-2);
        return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${yy} в ${pad(date.getHours())}:${pad(date.getMinutes())}`;
      };
      
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
        return transformToFeed(chatMessages).map((item) => {
          const feedItem = item as { timestamp?: number };
          if (feedItem.timestamp == null) return item;
          return { ...feedItem, time: formatClockTime(feedItem.timestamp) };
        });
      });

      const handleSend = (message: { 
        text?: string; 
        type?: string; 
        url?: string; 
        filename?: string; 
        size?: string;
        alt?: string;
        reply?: {
          messageId: string;
          type: string;
          text?: string;
          url?: string;
          filename?: string;
          header?: string;
          callDuration?: string;
          isMissedCall?: boolean;
        };
        edit?: {
          messageId: string;
          type: string;
          text?: string;
        };
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
        const editorName = currentChatId === 1 ? 'Иван' : 'Анна';
        
        // Определяем тип сообщения и текст для отображения
        const messageType = message.type || "message.text";
        const displayText = message.text || (messageType.includes('sticker') ? 'Стикер' : messageType.includes('file') ? message.filename || 'Файл' : '');

        // Редактирование: обновляем существующее сообщение и ставим метку «изменено»
        if (message.edit?.messageId) {
          const idx = messagesRef.value.findIndex(
            (m) => m.messageId === message.edit!.messageId && m.chatId === currentChatId
          );
          if (idx !== -1) {
            const existing = messagesRef.value[idx];
            const editedText = message.text || '';

            if (editedText.trim() === (existing.text ?? '').trim()) {
              return;
            }

            const originalText =
              existing.edited?.originalText ||
              message.edit.text ||
              existing.text ||
              '';
            const prevHistory = existing.edited?.history?.length
              ? [...existing.edited.history]
              : existing.edited?.editedBy || existing.edited?.editedAt
                ? [{
                    text: existing.text,
                    editedBy: existing.edited.editedBy,
                    editedAt: existing.edited.editedAt,
                  }]
                : [];
            const editedAt = formatEditAt();
            const editedBy = existing.header || editorName;

            messagesRef.value[idx] = {
              ...existing,
              text: editedText,
              edited: {
                originalText,
                history: [
                  ...prevHistory,
                  { text: editedText, editedBy, editedAt },
                ],
                editedBy,
                editedAt,
              },
            };

            const currentChat = chatsRef.value.find(c => c.chatId === currentChatId);
            if (currentChat) {
              currentChat.lastMessage = displayText;
              currentChat['lastActivity.time'] = formatClockTime(nowInSeconds);
              currentChat['lastActivity.timestamp'] = nowString;
            }
          }
          return;
        }
        
        // Создаем сообщение для текущего чата (исходящее - справа)
        const outgoingMessage: {
          chatId: number;
          type: string;
          direction: 'outgoing';
          header: string;
          subText: string;
          avatar?: string;
          messageId: string;
          text: string;
          timestamp: string;
          status: 'sent';
          url?: string;
          filename?: string;
          alt?: string;
          size?: string;
          reply?: typeof message.reply;
        } = {
          chatId: currentChatId,
          type: messageType,
          direction: 'outgoing',
          header: editorName,
          subText: editorName,
          messageId: `${now}-outgoing`,
          text: message.text || '',
          timestamp: nowString,
          status: 'sent',
        };

        if (currentChatId === 1) {
          outgoingMessage.avatar = 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=soft&seed=1&style=round';
        } else if (currentChatId === 2) {
          outgoingMessage.avatar = 'https://polka.cs.mobilon.ru/avatars/vector/female?size=64&palette=soft&seed=Ann&style=round';
        }
        
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
        if (message.reply) {
          outgoingMessage.reply = message.reply;
        }
        
        // Создаем сообщение для другого чата (входящее - слева)
        const incomingMessage: {
          chatId: number;
          type: string;
          direction: 'incoming';
          header: string;
          subText: string;
          messageId: string;
          text: string;
          timestamp: string;
          status: 'read';
          url?: string;
          filename?: string;
          alt?: string;
          size?: string;
          reply?: typeof message.reply;
        } = {
          chatId: senderChatId,
          type: messageType,
          direction: 'incoming',
          header: editorName,
          subText: editorName,
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
        if (message.reply) {
          incomingMessage.reply = message.reply;
        }
        
        // Добавляем оба сообщения в массив
        messagesRef.value.push(outgoingMessage);
        messagesRef.value.push(incomingMessage);
        triggerScrollToBottom();
        
        // Обновляем информацию о последнем сообщении в обоих чатах
        const currentChat = chatsRef.value.find(c => c.chatId === currentChatId);
        const otherChat = chatsRef.value.find(c => c.chatId === senderChatId);
        
        if (currentChat) {
          currentChat.lastMessage = displayText;
          currentChat['lastActivity.time'] = formatClockTime(nowInSeconds);
          currentChat['lastActivity.timestamp'] = nowString;
        }
        
        if (otherChat) {
          otherChat.lastMessage = displayText;
          otherChat['lastActivity.time'] = formatClockTime(nowInSeconds);
          otherChat['lastActivity.timestamp'] = nowString;
          otherChat.countUnread = (otherChat.countUnread || 0) + 1;
        }
      };
      
      const resolveEditLastSentMessage = () => {
        if (!selectedChatRef.value) return null
        const chatId = selectedChatRef.value.chatId

        for (let i = messagesRef.value.length - 1; i >= 0; i--) {
          const message = messagesRef.value[i]
          if (message.chatId !== chatId) continue
          if (message.direction !== 'outgoing') continue
          if (message.type !== 'message.text') continue
          if (message.deleted) continue
          return message
        }

        return null
      }

      const handleSelectChat = (args: { chat: typeof simpleChats[0]; dialog?: unknown }) => {
        // Находим чат в реактивном массиве
        const chat = chatsRef.value.find(c => c.chatId === args.chat.chatId);
        if (!chat) return;

        const isSameChat = selectedChatRef.value?.chatId === chat.chatId;
        if (!isSameChat) {
          triggerScrollToBottom();
        }
        selectedChatRef.value = chat;
        // Обновляем счетчик непрочитанных при выборе чата
        if (chat.countUnread > 0) {
          chat.countUnread = 0;
        }
      };
      
      const handleChatAction = (data: unknown) => {
        console.log('Chat action:', data);
      };
      
      const handleMessageAction = (data: unknown) => {
        console.log('Message action:', data);
        const payload = data as {
          action?: string;
          type?: string;
          messageId?: string;
        };

        if (payload.action === 'delete' && payload.messageId) {
          const idx = messagesRef.value.findIndex((m) => m.messageId === payload.messageId);
          if (idx === -1) return;
          const now = new Date();
          const deletedAt = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).slice(-2)} в ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          messagesRef.value[idx] = {
            ...messagesRef.value[idx],
            deleted: true,
            deletion: {
              deletedBy: 'Иванов Иван',
              deletedAt,
            },
          };
          return;
        }

        // Симуляция запроса истории правки с бэка при наведении на «изменено»
        if (
          (payload.action === 'fetchEditInfo' || payload.type === 'editInfo') &&
          payload.messageId
        ) {
          const idx = messagesRef.value.findIndex((m) => m.messageId === payload.messageId);
          if (idx === -1) return;
          const existing = messagesRef.value[idx];
          if (!existing.edited) return;

          const fullHistoryByMessageId: Record<string, DemoMessage['edited']> = {
            '11-edited': {
              originalText: 'Добрый день (оригинальный текст)',
              history: [
                {
                  text: 'Добрый день. Нет у нас выходной',
                  editedBy: 'Иван',
                  editedAt: '18.07.26 в 09:15',
                },
                {
                  text: 'Добрый день. Нет, у нас выходной',
                  editedBy: 'Иван',
                  editedAt: '19.07.26 в 14:30',
                },
                {
                  text: 'Добрый день. Нет, у нас выходной!!!',
                  editedBy: 'Иван',
                  editedAt: '20.07.26 в 11:08',
                },
              ],
            },
            '12-edited': {
              originalText: 'Добрый день',
              history: [
                {
                  text: 'Добрый день. Нет у нас выходной',
                  editedBy: 'Иван',
                  editedAt: '18.07.26 в 09:15',
                },
                {
                  text: 'Добрый день. Нет, у нас выходной',
                  editedBy: 'Иван',
                  editedAt: '19.07.26 в 14:30',
                },
                {
                  text: 'Добрый день. Нет, у нас выходной!!!',
                  editedBy: 'Иван',
                  editedAt: '20.07.26 в 11:08',
                },
              ],
            },
          };

          const fetchedEdit = fullHistoryByMessageId[payload.messageId] ?? {
            ...existing.edited,
            history: existing.edited.history?.length
              ? existing.edited.history
              : [{
                  text: existing.text,
                  editedBy: existing.edited.editedBy,
                  editedAt: existing.edited.editedAt,
                }],
          };

          messagesRef.value[idx] = {
            ...existing,
            edited: fetchedEdit,
          };
        }
      };
      
      const handleLoadMore = () => {
        console.log('Load more messages');
      };

      const handleClickRepliedMessage = (messageId: string) => {
        const exists = messagesRef.value.some(
          (message) => message.chatId === selectedChatRef.value?.chatId && message.messageId === messageId
        );
        if (!exists) return;

        scrollToMessageId.value = `msg-${messageId}`;
        if (scrollToTimer) {
          clearTimeout(scrollToTimer);
        }
        scrollToTimer = setTimeout(() => {
          scrollToMessageId.value = null;
        }, 150);
      };
      
      const handleThemeChange = (themeCode: string) => {
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
        const containers = document.querySelectorAll('[id^="vue-id"]');
        containers.forEach((container) => {
          (container as HTMLElement).dataset.theme = themeCode;
        });
      };
      
      // Массив стикеров для StickerPicker (с вкладками: статические и анимированные)
      const stickers = [
        [
          { url: approveSticker, alt: '✔' },
          { url: callSticker, alt: '📱' },
          { url: dealSticker, alt: '👍' },
          { url: docsSticker, alt: '📄' },
          { url: goodDaySticker, alt: '🙋‍♀️' },
          { url: helpSticker, alt: '🆘' },
          { url: soonSticker, alt: '🔜' },
          { url: thxSticker, alt: '🙏' },
        ],
        [
          { url: fireDevilSticker, alt: '😈' },
          { url: fireHiSticker, alt: '👋' },
          { url: fireLolSticker, alt: '😂' },
          { url: fireScreamingSticker, alt: '😱' },
          { url: fireSmokeSticker, alt: '💨' },
          { url: fireThumbsUpSticker, alt: '👍' },
          { url: fireTypingSticker, alt: '⌨️' },
          { url: fireYesSticker, alt: '✅' },
        ],
      ];
      
      return { 
        messages: feedMessagesRef, 
        chats: chatsRef,
        selectedChat: selectedChatRef,
        handleSend,
        resolveEditLastSentMessage,
        handleSelectChat,
        handleChatAction,
        handleMessageAction,
        handleLoadMore,
        handleClickRepliedMessage,
        scrollToMessageId,
        scrollToBottom,
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
                <div style="flex: 1 1 0; min-height: 0; overflow: hidden;">
                  <Feed 
                    :key="selectedChat.chatId"
                    style="height: 100%; --chotto-feed-padding: 10px 5px; --chotto-textmessage-content-max-width: 500px; --chotto-feed-scroll-behavior: auto;"
                    :objects="messages"
                    :scroll-to="scrollToMessageId"
                    :scroll-to-bottom="scrollToBottom"
                    :current-user-id="'usr_me'"
                    :reaction-user-names="{ usr_me: 'Виктория', usr_other_0: 'Василий Васильев' }"
                    :enable-double-click-reply="true" 
                    @message-action="handleMessageAction"
                    @click-replied-message="handleClickRepliedMessage"
                    @load-more="handleLoadMore"
                  />
                </div>
                <ChatInput
                  :resolve-edit-last-sent-message="resolveEditLastSentMessage"
                  @send="handleSend"
                >
                  <template #inline-buttons>
                    <FileUploader :state="'active'" />
                    <ButtonTemplateSelector :mode="'click'" :state="'active'" :templates="templates" :group-templates="groupTemplates" />
                    <ButtonEmojiPicker :mode="'click'" :state="'active'" :native="false" />
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

