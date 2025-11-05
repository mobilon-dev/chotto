import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import TypingMessage from '../TypingMessage.vue';
import { ITypingMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof TypingMessage> = {
  title: 'Feed Elements/TypingMessage',
  component: TypingMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof TypingMessage>;

const message: ITypingMessage = {};

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, TypingMessage },
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

      // Примеры сообщений: стандартное, с аватаром, с аватаром и подтекстом
      const standardMessage: ITypingMessage = {};

      const withAvatarMessage: ITypingMessage = {
        avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
      };

      const withAvatarAndSubtextMessage: ITypingMessage = {
        avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
        subText: 'Иван Петров',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, standardMessage, withAvatarMessage, withAvatarAndSubtextMessage, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <TypingMessage :message="standardMessage" />
            <TypingMessage :message="withAvatarMessage" />
            <TypingMessage :message="withAvatarAndSubtextMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const Standard: Story = {
  args: {
    message,
  },
  decorators: commonDecorator,
};

export const WithAvatar: Story = {
  args: {
    message: {
      ...message,
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
    },
  },
  decorators: commonDecorator,
};

export const WithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
      subText: 'test test test',
    },
  },
  decorators: commonDecorator,
};
