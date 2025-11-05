import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';
 
import DateMessage from '../DateMessage.vue';
import { IDateMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof DateMessage> = {
  title: 'Feed Elements/DateMessage',
  component: DateMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof DateMessage>;

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({ 
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>` 
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, DateMessage },
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

      // Примеры сообщений с разными датами
      const todayMessage: IDateMessage = {
        text: 'Сегодня',
      };

      const yesterdayMessage: IDateMessage = {
        text: 'Вчера',
      };

      const dateMessage: IDateMessage = {
        text: new Date().toLocaleDateString('ru-RU'),
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, todayMessage, yesterdayMessage, dateMessage, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <DateMessage :message="todayMessage" />
            <DateMessage :message="yesterdayMessage" />
            <DateMessage :message="dateMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const Today: Story = {
  args: {
    message: {
      text: 'Сегодня',
    } as IDateMessage,
  },
  decorators: commonDecorator,
};
