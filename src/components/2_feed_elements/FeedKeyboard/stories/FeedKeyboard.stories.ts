import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import FeedKeyboard from '../FeedKeyboard.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

const meta: Meta<typeof FeedKeyboard> = {
  title: 'Feed Elements/FeedKeyboard',
  component: FeedKeyboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttons: {
      control: 'object',
      description: 'Массив кнопок клавиатуры { text, color?, action? }',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Выравнивание клавиатуры',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ThemeMode, FeedKeyboard },
    setup() { 
      // Use themes directly since args.theme is not a real prop
      const themesList = themes;
      
      const syncTheme = (event: CustomEvent) => {
        const themeCode = event.detail;
        // Sync theme for all BaseContainer elements on the page
        const containers = document.querySelectorAll('[id^="vue-id"]');
        containers.forEach((container) => {
          (container as HTMLElement).dataset.theme = themeCode;
        });
      };
      
      onMounted(() => {
        // Listen for theme changes from other stories
        window.addEventListener('storybook-theme-change', syncTheme as EventListener);
      });
      
      onUnmounted(() => {
        window.removeEventListener('storybook-theme-change', syncTheme as EventListener);
      });
      
      const handleThemeChange = (themeCode: string) => {
        // Broadcast theme change to all stories
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
      };
      
      return { args, themesList, handleThemeChange }; 
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 50vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div style="max-width: 640px; margin: 40px auto 0;">
          <FeedKeyboard :buttons="args.buttons" :align="args.align" />
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;

type Story = StoryObj<typeof FeedKeyboard>;

const demoButtons = [
  { key: 'contact', text: 'Связаться', order: 1, 'shadow-color': '#f59e0b' },
  { key: 'no-answer', text: 'Ответ не нужен', order: 2, 'shadow-color': '#6b7280' },
];

export const Default: Story = {
  args: {
    buttons: demoButtons,
    align: 'right',
  },
  render: (args) => ({
    components: { BaseContainer, FeedKeyboard, ThemeMode },
    setup() { 
      const themesList = themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 50vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="max-width: 640px; margin: 40px auto 0;">
          <FeedKeyboard :buttons="args.buttons" :align="args.align" />
        </div>
      </BaseContainer>
    `
  }),
};

export const CenterAligned: Story = {
  args: {
    buttons: demoButtons,
    align: 'center',
  },
  render: (args) => ({
    components: { BaseContainer, FeedKeyboard },
    setup() { 
      let containerId: string | null = null;
      
      const syncTheme = (event: CustomEvent) => {
        const themeCode = event.detail;
        if (containerId) {
          const container = document.getElementById(containerId);
          if (container) {
            container.dataset.theme = themeCode;
          }
        }
      };
      
      onMounted(() => {
        // Find the BaseContainer's ID after mount
        setTimeout(() => {
          const containers = document.querySelectorAll('[id^="vue-id"]');
          // Find this story's container (should be the last one)
          const container = Array.from(containers).pop() as HTMLElement;
          if (container) {
            containerId = container.id;
          }
        }, 0);
        
        // Listen for theme changes from the top example
        window.addEventListener('storybook-theme-change', syncTheme as EventListener);
      });
      
      onUnmounted(() => {
        window.removeEventListener('storybook-theme-change', syncTheme as EventListener);
      });
      
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 50vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="max-width: 640px; margin: 40px auto 0;">
          <FeedKeyboard :buttons="args.buttons" :align="args.align" />
        </div>
      </BaseContainer>
    `
  }),
};
