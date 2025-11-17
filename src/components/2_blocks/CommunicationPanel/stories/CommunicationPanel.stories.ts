import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, computed, provide } from 'vue';
import CommunicationPanel from '../CommunicationPanel.vue';
import { Feed, ChatInput, BaseContainer } from '@/components';

const meta = {
  title: 'Blocks/CommunicationPanel',
  component: CommunicationPanel,
  args: {},
} satisfies Meta<typeof CommunicationPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Данные каналов для чата "Георгий Звонарь"
const channelsData = [
  {
    branchId: "bch_111",
    channelId: "whatsapp.W2222",
    title: "whatsapp 73910001100 (основной)",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_222",
    channelId: "telegram.T222",
    title: "telegram 79135292926",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_333",
    channelId: "max.M333",
    title: "max 79135292926",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_444",
    channelId: "sms.M444",
    title: "SMS 79135292926",
    status: "active",
    autoAccess: false
  },
];

// Атрибуты контакта
const contactAttributes = [
  {
    id: 'atr_whatsapp',
    type: 'whatsapp',
    data: '73910001100',
    value: '73910001100',
  },
  {
    id: 'atr_telegram',
    type: 'telegram',
    data: {
      id: '182940012993',
      nickname: 'georgiy_zvonar',
      phone: '79135292926'
    },
    value: '@georgiy_zvonar',
  },
  {
    id: 'atr_max',
    type: 'max',
    data: '79135292926',
    value: '79135292926',
  },
  {
    id: 'atr_sms',
    type: 'sms',
    data: '79135292926',
    value: '79135292926',
  },
];

// Диалоги чата
const dialogsData = [
  { 
    branchId: 'bch_111',
    dialogId: 'dlg_43543111',
    attributeId: 'atr_whatsapp',
    channelId: 'whatsapp.W2222',
    name: 'диалог WhatsApp',
    fullname: 'диалог номер 73910001100 канал whatsapp 73910001100 (основной)',
    countUnread: 0,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': 1757318879000,
    isSelected: false,
  },
  { 
    branchId: 'bch_222',
    dialogId: 'dlg_89789222',
    attributeId: 'atr_telegram',
    channelId: 'telegram.T222',
    name: 'диалог Telegram',
    fullname: 'диалог telegram',
    countUnread: 0,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': 1727641759111,
    isSelected: false,
  },
  { 
    branchId: 'bch_333',
    dialogId: 'dlg_00123333',
    attributeId: 'atr_max',
    channelId: 'max.M333',
    name: 'диалог Max',
    fullname: 'диалог max',
    countUnread: 0,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': 1727641759111,
    isSelected: false,
  },
  { 
    branchId: 'bch_444',
    dialogId: 'dlg_00124444',
    attributeId: 'atr_sms',
    channelId: 'sms.M444',
    name: 'диалог SMS',
    fullname: 'диалог sms',
    countUnread: 0,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': 1727641759111,
    isSelected: false,
  },
];

// Сообщения для разных каналов
const allMessages = [
  // WhatsApp сообщения (dlg_43543111)
  {
    chatId: 8, 
    dialogId: 'dlg_43543111', 
    type: "message.text", 
    text: "Привет! Это WhatsApp сообщение! Как дела?",
    direction: 'incoming',
    position: 'left',
    status: 'read',
    timestamp: '1763036000',
    header: 'Георгий',
    subText: 'WhatsApp | Георгий Звонарь',
    messageId: '801',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_43543111', 
    type: "message.text", 
    text: "Отлично! Это правое сообщение должно быть зелёным",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763036200',
    header: 'Вы',
    subText: 'WhatsApp | Василий Васильев',
    messageId: '803',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_43543111', 
    type: "message.file", 
    url: "https://axiomabio.com/pdf/test.pdf",
    filename: "Предложение WhatsApp.pdf",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763036201',
    header: 'Вы',
    subText: 'WhatsApp | Василий Васильев',
    messageId: '804',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_43543111', 
    type: "message.audio",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763036300',
    header: 'Вы',
    subText: 'WhatsApp | Василий Васильев',
    messageId: '805',
  },
  
  // Telegram сообщения (dlg_89789222)
  {
    chatId: 8, 
    dialogId: 'dlg_89789222', 
    type: "message.text", 
    text: "Привет! Это сообщение из Telegram! Как дела?",
    direction: 'incoming',
    position: 'left',
    status: 'read',
    timestamp: '1763037000',
    header: 'Георгий',
    subText: 'Telegram | Георгий Звонарь',
    messageId: '805',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_89789222', 
    type: "message.text", 
    text: "Всё отлично! Это правое сообщение должно быть синим!",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763037200',
    header: 'Вы',
    subText: 'Telegram | Василий Васильев',
    messageId: '807',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_89789222', 
    type: "message.video", 
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763038102',
    header: 'Вы',
    subText: 'Telegram | Василий Васильев',
    messageId: '808',
    text: 'Видео из Telegram'
  },
  
  // Max сообщения (dlg_00123333)
  {
    chatId: 8, 
    dialogId: 'dlg_00123333', 
    type: "message.text", 
    text: "Привет! Это сообщение из Max! Как дела?",
    direction: 'incoming',
    position: 'left',
    status: 'read',
    timestamp: '1763038000',
    header: 'Георгий',
    subText: 'Max | Георгий Звонарь',
    messageId: '809',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_00123333', 
    type: "message.text", 
    text: "Всё хорошо! Это правое сообщение должно быть фиолетовым!",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763038200',
    header: 'Вы',
    subText: 'Max | Василий Васильев',
    messageId: '811',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_00123333', 
    type: "message.image", 
    url: "https://placehold.co/100x100/png",
    alt: "Example Image",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763038300',
    header: 'Вы',
    subText: 'Max | Василий Васильев',
    messageId: '812',
    backgroundColor: '#E6D9F2',
    text: 'Изображение из Max'
  },
  
  // SMS сообщения (dlg_00124444)
  {
    chatId: 8, 
    dialogId: 'dlg_00124444', 
    type: "message.text", 
    text: "Привет! Это SMS сообщение! Как дела?",
    direction: 'incoming',
    position: 'left',
    status: 'read',
    timestamp: '1763039000',
    header: 'Георгий',
    subText: 'SMS | Георгий Звонарь',
    messageId: '813',
  },
  {
    chatId: 8, 
    dialogId: 'dlg_00124444', 
    type: "message.text", 
    text: "Отлично! Это правое сообщение должно быть серым!",
    direction: 'outgoing',
    position: 'right',
    status: 'read',
    timestamp: '1763039200',
    header: 'Вы',
    subText: 'SMS | Василий Васильев',
    messageId: '815',
  },
];

export const InteractiveWithFeed: Story = {
  render: () => ({
    components: { CommunicationPanel, Feed, ChatInput, BaseContainer },
    setup() {
      // Состояние выбранного диалога
      const selectedDialogId = ref('dlg_43543111'); // По умолчанию WhatsApp
      const selectedChannel = ref(channelsData[0]);
      
      // Выбранный чат с диалогами для provide
      const selectedChat = computed(() => ({
        chatId: 8,
        name: "Георгий Звонарь",
        dialogs: dialogsData,
      }));
      
      // Фильтрованные сообщения по выбранному диалогу
      const filteredMessages = computed(() => {
        return allMessages.filter(msg => msg.dialogId === selectedDialogId.value);
      });
      
      // Обработчик выбора канала
      const handleSelectChannel = (event: { attributeId: string; channelId: string }) => {
        console.log('Выбран канал:', event);
        // Ищем диалог по channelId из события
        const dialog = dialogsData.find(d => d.channelId === event.channelId);
        if (dialog) {
          selectedDialogId.value = dialog.dialogId;
          selectedChannel.value = channelsData.find(c => c.channelId === event.channelId) || channelsData[0];
        }
      };
      
      // Обработчик отправки сообщения
      const handleSendMessage = (message: { type: string; text: string }) => {
        console.log('Отправлено сообщение:', message);
      };
      
      // Provide для useChannelAccentColor
      provide('selectedChat', selectedChat);
      provide('chatAppId', 'story-chat-app');
      
      return {
        channelsData,
        contactAttributes,
        selectedDialogId,
        selectedChannel,
        filteredMessages,
        handleSelectChannel,
        handleSendMessage,
        selectedDialog: computed(() => dialogsData.find(d => d.dialogId === selectedDialogId.value)),
      };
    },
    template: `
      <BaseContainer data-theme="mobilon1" style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="display: flex; flex-direction: column; height: 600px; margin: 0 auto; border: 1px solid var(--chotto-theme-border-color, #e0e0e0); border-radius: 8px; overflow: hidden; background: var(--chotto-theme-primary-color, #ffffff);">
          <!-- Заголовок с панелью коммуникации -->
          <div style="background: white; border-bottom: 1px solid var(--chotto-theme-border-color, #e0e0e0); padding: 16px; display: flex; align-items: center; gap: 16px;">
            <!-- Информация о чате -->
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
              <img 
                src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" 
                alt="Георгий Звонарь"
                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0;"
              />
              <div style="flex: 1; min-width: 0;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: var(--chotto-theme-text-primary, #000); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Георгий Звонарь</h3>
                <p style="margin: 4px 0 0; font-size: 14px; color: var(--chotto-theme-text-secondary, #666); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ selectedChannel.title }}
                </p>
              </div>
            </div>
            
            <!-- Панель коммуникации -->
            <div style="flex-shrink: 0;">
              <CommunicationPanel
                :channels="channelsData"
                :contact-attributes="contactAttributes"
                :recent-attribute-channels="{}"
                :selected-dialog="selectedDialog"
                @select-attribute-channel="handleSelectChannel"
              />
            </div>
          </div>
          
          <!-- Лента сообщений -->
          <div style="flex: 1; overflow: auto; background: var(--chotto-theme-secondary-color, #faf6f4);">
            <Feed 
              :objects="filteredMessages"
              @message-action="(action, message) => console.log('Action:', action, message)"
            />
          </div>
          
          <!-- Поле ввода -->
          <div style="border-top: 1px solid var(--chotto-theme-border-color, #e0e0e0);">
            <ChatInput
              :selected-channel="selectedChannel"
              @send="handleSendMessage"
            />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};
