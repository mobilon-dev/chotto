import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import TextMessage from '../../TextMessage/TextMessage.vue';
import { ITextMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof TextMessage> = {
  title: 'Feed Elements/MessageReactions',
  component: TextMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof TextMessage>;

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div class="message-feed" style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #fafafa); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
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

      // Примеры сообщений с реакциями
      const leftMessageWithReactions: ITextMessage = {
        text: 'Привет! Как дела?',
        position: 'left',
        messageId: 'left-1',
        time: '12:30',
        status: 'read',
        reactions: {
          items: [
            { key: '👍', count: 5, reactedByMe: false },
            { key: '❤️', count: 3, reactedByMe: true },
            { key: '😄', count: 2, reactedByMe: false },
          ],
        },
      };

      const rightMessageWithReactions: ITextMessage = {
        text: 'Отлично, спасибо!',
        position: 'right',
        messageId: 'right-1',
        time: '12:31',
        status: 'read',
        reactions: {
          items: [
            { key: '👍', count: 12, reactedByMe: true },
            { key: '❤️', count: 8, reactedByMe: false },
            { key: '🎉', count: 1, reactedByMe: true },
          ],
        },
      };

      const leftMessageSingleReaction: ITextMessage = {
        text: 'Сообщение с одной реакцией',
        position: 'left',
        messageId: 'left-2',
        time: '12:32',
        status: 'read',
        reactions: {
          items: [
            { key: '👍', count: 1, reactedByMe: true },
          ],
        },
      };

      const leftMessageNoReactions: ITextMessage = {
        text: 'Сообщение без реакций. Наведи на сообщение чтобы добавить реакцию.',
        position: 'left',
        messageId: 'left-3',
        time: '12:33',
        status: 'read',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #fafafa)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, leftMessageWithReactions, rightMessageWithReactions, leftMessageSingleReaction, leftMessageNoReactions, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div class="message-feed" :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <TextMessage :message="leftMessageWithReactions" />
            <TextMessage :message="rightMessageWithReactions" />
            <TextMessage :message="leftMessageSingleReaction" />
            <TextMessage :message="leftMessageNoReactions" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

const message: ITextMessage = {
  text: 'Привет!',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

export const LeftMessageReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          { key: '👍', count: 5, reactedByMe: false },
          { key: '❤️', count: 3, reactedByMe: true },
          { key: '😄', count: 2, reactedByMe: false },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageSingleReaction: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          { key: '👍', count: 1, reactedByMe: true },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageMultipleReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          { key: '👍', count: 15, reactedByMe: false },
          { key: '❤️', count: 8, reactedByMe: true },
          { key: '😄', count: 5, reactedByMe: false },
          { key: '🎉', count: 3, reactedByMe: true },
          { key: '🔥', count: 2, reactedByMe: false },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageNoReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          { key: '👍', count: 5, reactedByMe: false },
          { key: '❤️', count: 3, reactedByMe: true },
          { key: '😄', count: 2, reactedByMe: false },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageSingleReaction: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          { key: '❤️', count: 1, reactedByMe: true },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageMultipleReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          { key: '👍', count: 20, reactedByMe: true },
          { key: '❤️', count: 12, reactedByMe: false },
          { key: '😄', count: 7, reactedByMe: true },
          { key: '🎉', count: 4, reactedByMe: false },
          { key: '🔥', count: 3, reactedByMe: true },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageNoReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const AllReactionsActive: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          { key: '👍', count: 5, reactedByMe: true },
          { key: '❤️', count: 3, reactedByMe: true },
          { key: '😄', count: 2, reactedByMe: true },
          { key: '🎉', count: 1, reactedByMe: true },
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LargeCountReactions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          { key: '👍', count: 1234, reactedByMe: false },
          { key: '❤️', count: 567, reactedByMe: true },
          { key: '😄', count: 89, reactedByMe: false },
        ],
      },
    },
  },
  decorators: commonDecorator,
};


