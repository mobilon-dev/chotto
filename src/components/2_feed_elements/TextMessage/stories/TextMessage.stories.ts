import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import TextMessage from '../TextMessage.vue';
import { ITextMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof TextMessage> = {
  title: 'Feed Elements/TextMessage',
  component: TextMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof TextMessage>;


const message: ITextMessage = {
  text: 'test test test',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const messageLink = {
  text: 'Красивое недлинное сообщение и ссылка на github.com',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const embed = {
  type: 'yamusic',
  url: 'https://music.yandex.ru/iframe/track/36812773/4773768'
}

const embedRutube = {
  type: 'rutube',
  url: 'https://rutube.ru/play/embed/6eb0c597c11c89ad5a5fafa3030d0e53/',
}

const actions = [
  {
    action: 'edit',
    title: 'изменить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit',
  },
  {
    action: 'delete',
    title: 'удалить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del',
  },
]

const messageWithoutTime = {
  text: 'test test test',
  messageId: 'testMessageId',
  status: 'read',
};

const messageLongText = {
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
  time: '25:13',
  messageId: 'testMessageId',
  status: 'read',
};

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div class="message-feed" style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, TextMessage },
    setup() {
      const themesList = themes;

      const syncTheme = (event: CustomEvent) => {
        const themeCode = event.detail;
        const containers = document.querySelectorAll('[id^="vue-id"]');
        containers.forEach((container) => {
          (container as HTMLElement).dataset.theme = themeCode;
        });
      };

      onMounted(() => {
        window.addEventListener('storybook-theme-change', syncTheme as EventListener);
      });

      onUnmounted(() => {
        window.removeEventListener('storybook-theme-change', syncTheme as EventListener);
      });

      const handleThemeChange = (themeCode: string) => {
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
      };

      // Примеры сообщений: левое и правое с разными статусами
      const leftMessage: ITextMessage = {
        text: 'Left message',
        position: 'left',
        messageId: 'left1',
        time: '12:00',
        status: 'read',
      };

      const rightMessagePending: ITextMessage = {
        text: 'Message with status: **pending**',
        position: 'right',
        messageId: 'right1',
        time: '12:05',
        status: 'pending',
      };

      const rightMessageSent: ITextMessage = {
        text: 'Message with status: *sent*',
        position: 'right',
        messageId: 'right2',
        time: '12:06',
        status: 'sent',
      };

      const rightMessageReceived: ITextMessage = {
        text: 'Message with status: <u>received</u>',
        position: 'right',
        messageId: 'right3',
        time: '12:07',
        status: 'received',
      };

      const rightMessageRead: ITextMessage = {
        text: 'Message with status: `read`',
        position: 'right',
        messageId: 'right4',
        time: '12:08',
        status: 'read',
      };

      const rightMessageError: ITextMessage = {
        text: 'Message with status: ~~error~~',
        position: 'right',
        messageId: 'right5',
        time: '12:09',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
      };

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, leftMessage, rightMessagePending, rightMessageSent, rightMessageReceived, rightMessageRead, rightMessageError, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
            <TextMessage :message="leftMessage" />
            <TextMessage :message="rightMessagePending" />
            <TextMessage :message="rightMessageSent" />
            <TextMessage :message="rightMessageReceived" />
            <TextMessage :message="rightMessageRead" />
            <TextMessage :message="rightMessageError" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

// Комбинированный пример для левых сообщений
export const LeftMessages: Story = {
  render: () => ({
    components: { TextMessage },
    setup() {
      const messages = [
        { ...message, text: 'Basic left message', position: 'left' as const, messageId: 'left1' },
        { ...message, text: 'Message with views', position: 'left' as const, views: 18495, messageId: 'left2' },
        { ...messageLongText, text: 'Message with long text: ' + messageLongText.text, position: 'left' as const, messageId: 'left3' },
        { ...message, text: 'Message with subtext', position: 'left' as const, subText: '+79135292926', messageId: 'left4' },
        { ...messageWithoutTime, text: 'Message without time', position: 'left' as const, time: '', messageId: 'left5' },
        { ...message, text: 'Message with actions', position: 'left' as const, actions, messageId: 'left6' },
        { ...message, text: 'Message with avatar', position: 'left' as const, avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN', messageId: 'left7' },
        { ...message, text: 'Message with long time', position: 'left' as const, time: 'двенадцать дней назад', messageId: 'left8' },
        { 
          text: "Hello! Here's an example of **markdown** formatting:\n\n **Bold text**\n *Italic*\n <u>Underlined</u>\n ~~Strikethrough~~\n `Inline code`\n\n> This is a quote with markdown formatting", 
          position: 'left' as const, 
          messageId: '805', 
          time: '12:00', 
          status: 'read' as const, 
          subText: 'whatsapp +1234567890 (main)' 
        },
      ];
      return { messages };
    },
    template: `
      <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
        <TextMessage v-for="msg in messages" :key="msg.messageId" :message="msg" />
      </div>
    `,
  }),
  decorators: commonDecorator,
};

// Комбинированный пример для правых сообщений с разными статусами и вариантами
export const RightMessages: Story = {
  render: () => ({
    components: { TextMessage },
    setup() {
      const messages = [
        { ...message, text: 'Basic right message', position: 'right' as const, messageId: 'right1' },
        { ...message, text: 'Message with views', position: 'right' as const, views: 18495, messageId: 'right2' },
        { ...messageLongText, text: 'Message with long text: ' + messageLongText.text, position: 'right' as const, messageId: 'right3' },
        { ...message, text: 'Message with subtext', position: 'right' as const, subText: 'Это Коля', messageId: 'right4' },
        { ...messageWithoutTime, text: 'Message without time', position: 'right' as const, time: '', messageId: 'right5' },
        { ...message, text: 'Message with status: pending', position: 'right' as const, status: 'pending' as const, messageId: 'right6' },
        { ...message, text: 'Message with status: sent', position: 'right' as const, status: 'sent' as const, messageId: 'right7' },
        { ...message, text: 'Message with status: received', position: 'right' as const, status: 'received' as const, messageId: 'right8' },
        { ...message, text: 'Message with status: read', position: 'right' as const, status: 'read' as const, messageId: 'right9' },
        { ...message, text: 'Message with status: error', position: 'right' as const, status: 'error' as const, statusMsg: 'Не удалось отправить сообщение', messageId: 'right10' },
        { ...message, text: 'Message with avatar', position: 'right' as const, avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN', messageId: 'right12' },
        { ...message, text: 'Message with long time', position: 'right' as const, time: 'двенадцать дней назад', messageId: 'right13' },
        { 
          text: "Hello! Here's an example of **markdown** formatting:\n\n **Bold text**\n *Italic*\n <u>Underlined</u>\n ~~Strikethrough~~\n `Inline code`\n\n> This is a quote with markdown formatting", 
          position: 'right' as const, 
          messageId: '805-right', 
          time: '12:00', 
          status: 'read' as const, 
          subText: 'whatsapp +1234567890 (main)' 
        },
      ];
      return { messages };
    },
    template: `
      <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
        <TextMessage v-for="msg in messages" :key="msg.messageId" :message="msg" />
      </div>
    `,
  }),
  decorators: commonDecorator,
};

export const LeftMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      text: 'Message with all features: long text, subtext, actions, avatar, long time',
      position: 'left',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      text: 'Message with all features: long text, subtext, actions, avatar, long time',
      position: 'right',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
  decorators: commonDecorator,
};

// Комбинированный пример для сообщений со ссылками
export const MessagesWithLinks: Story = {
  render: () => ({
    components: { TextMessage },
    setup() {
      const messages = [
        { ...messageLink, text: 'Left message with link: github.com', position: 'left' as const, messageId: 'link1' },
        { ...messageLink, text: 'Right message with link: github.com', position: 'right' as const, messageId: 'link2' },
      ];
      return { messages };
    },
    template: `
      <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
        <TextMessage v-for="msg in messages" :key="msg.messageId" :message="msg" />
      </div>
    `,
  }),
  decorators: commonDecorator,
};

// Комбинированный пример для сообщений с reply
export const MessagesWithReply: Story = {
  render: () => ({
    components: { TextMessage },
    setup() {
      const messages = [
        { ...messageLink, text: 'Left message with reply to text', position: 'left' as const, reply: { messageId: '324324', type: 'message.text' as const, text: 'previous message', header: 'Мария' }, messageId: 'reply1' },
        { ...messageLink, text: 'Right message with reply to text', position: 'right' as const, reply: { messageId: '324324', type: 'message.text' as const, text: 'previous message', header: 'Мария' }, messageId: 'reply2' },
        { ...messageLink, text: 'Left message with reply to image', position: 'left' as const, reply: { messageId: '324324', type: 'message.image' as const, text: messageLongText.text, url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", header: 'Мария' }, messageId: 'reply3' },
        { ...messageLink, text: 'Right message with reply to image', position: 'right' as const, reply: { messageId: '324324', type: 'message.image' as const, text: messageLongText.text, url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", header: 'Мария' }, messageId: 'reply4' },
        { ...messageLink, text: 'Left message with reply to video', position: 'left' as const, reply: { messageId: '324324', type: 'message.video' as const, text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply5' },
        { ...messageLink, text: 'Right message with reply to video', position: 'right' as const, reply: { messageId: '324324', type: 'message.video' as const, text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply6' },
        { ...messageLink, text: 'Left message with reply to file', position: 'left' as const, reply: { messageId: '324324', type: 'message.file' as const, filename: 'video.mp4', text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply7' },
        { ...messageLink, text: 'Right message with reply to file', position: 'right' as const, reply: { messageId: '324324', type: 'message.file' as const, filename: 'video.mp4', text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply8' },
        { ...messageLink, text: 'Left message with reply to audio', position: 'left' as const, reply: { messageId: '324324', type: 'message.audio' as const, filename: 'video.mp4', text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply9' },
        { ...messageLink, text: 'Right message with reply to audio', position: 'right' as const, reply: { messageId: '324324', type: 'message.audio' as const, text: messageLongText.text, url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT", header: 'Мария' }, messageId: 'reply10' },
        { ...messageLink, text: 'Left message with reply to call (missed)', position: 'left' as const, reply: { messageId: '324324', type: 'message.call' as const, callDuration: '18 минут', isMissedCall: true, header: 'Мария' }, messageId: 'reply11' },
        { ...messageLink, text: 'Right message with reply to call', position: 'right' as const, reply: { messageId: '324324', type: 'message.call' as const, callDuration: '18 минут', isMissedCall: false, header: 'Мария' }, messageId: 'reply12' },
      ];
      return { messages };
    },
    template: `
      <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
        <TextMessage v-for="msg in messages" :key="msg.messageId" :message="msg" />
      </div>
    `,
  }),
  decorators: commonDecorator,
};

// Комбинированный пример для сообщений с link preview и embed
export const MessagesWithPreviewAndEmbed: Story = {
  render: () => ({
    components: { TextMessage },
    setup() {
      const messages = [
        { ...messageLink, text: 'Left message with link preview', position: 'left' as const, linkPreview: { title: 'Яндекс', imageUrl: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png', url: 'https://yandex.ru', description: 'Найдётся всё' }, messageId: 'preview1' },
        { ...messageLink, text: 'Right message with link preview', position: 'right' as const, linkPreview: { title: 'Яндекс', imageUrl: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png', url: 'https://yandex.ru', description: 'Найдётся всё' }, messageId: 'preview2' },
        { ...message, text: 'Left message with Yandex Music embed', position: 'left' as const, embed, messageId: 'embed1' },
        { ...message, text: 'Right message with Yandex Music embed', position: 'right' as const, embed, messageId: 'embed2' },
        { ...message, text: 'Left message with Rutube embed', position: 'left' as const, embed: embedRutube, messageId: 'embed3' },
        { ...message, text: 'Right message with Rutube embed', position: 'right' as const, embed: embedRutube, messageId: 'embed4' },
      ];
      return { messages };
    },
    template: `
      <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
        <TextMessage v-for="msg in messages" :key="msg.messageId" :message="msg" />
      </div>
    `,
  }),
  decorators: commonDecorator,
};