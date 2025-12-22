import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted, ref, computed } from 'vue';

import MissedCallMessage from '../MissedCallMessage.vue';
import { IMissedCallMessage, IAction } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light' },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'glass', name: 'Glass' },
  { code: 'mobilon1', name: 'Mobilon1', default: true },
];

const meta: Meta<typeof MissedCallMessage> = {
  title: 'Feed Elements/MissedCallMessage',
  component: MissedCallMessage,
  decorators: [() => ({template: '<div data-theme="mobilon1"><story /></div>'})]
};

export default meta;
type Story = StoryObj<typeof MissedCallMessage>;

const message: IMissedCallMessage = {
  messageId: 'missedCall1',
  position: 'left',
  time: '11:05',
};

const messageWithAvatar: IMissedCallMessage = {
  messageId: 'missedCall2',
  position: 'left',
  time: '11:05',
  avatar: 'https://placehold.jp/30/f1048e/ffffff/64x64.png?text=Ann',
};

const messageWithSubtext: IMissedCallMessage = {
  messageId: 'missedCall3',
  position: 'left',
  time: '11:05',
  subText: '+7 983 169-35-04',
};

const messageWithHeader: IMissedCallMessage = {
  messageId: 'missedCall4',
  position: 'left',
  time: '11:05',
  header: 'Василий',
};

const messageWithAll: IMissedCallMessage = {
  messageId: 'missedCall5',
  position: 'left',
  time: '11:05',
  avatar: 'https://placehold.jp/30/f1048e/ffffff/64x64.png?text=Ann',
  subText: '+7 983 169-35-04',
  header: 'Василий',
};

const actions: IAction[] = [
  {
    action: 'call',
    title: 'Перезвонить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=call',
  },
  {
    action: 'delete',
    title: 'Удалить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del',
  },
];

const messageWithActions: IMissedCallMessage = {
  messageId: 'missedCall6',
  position: 'left',
  time: '11:05',
  actions,
};

export const Default: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer, ThemeMode },
    setup() {
      const themesList = themes;
      const currentTheme = ref('mobilon1');

      const syncTheme = (event: CustomEvent) => {
        const themeCode = event.detail;
        currentTheme.value = themeCode;
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
        currentTheme.value = themeCode;
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
      };

      const containerBackground = computed(() => {
        if (currentTheme.value === 'glass') {
          return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        return 'var(--chotto-theme-secondary-color, #f5f5f5)';
      });

      const containerStyle = computed(() => {
        if (currentTheme.value === 'glass') {
          return {
            padding: '40px 20px',
            background: containerBackground.value,
            borderRadius: '4px'
          };
        }
        return {
          padding: '40px 20px',
          backgroundColor: containerBackground.value,
          borderRadius: '4px'
        };
      });

      return { args, themesList, handleThemeChange, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: {
      ...message,
      avatar: 'https://placehold.jp/30/f1048e/ffffff/64x64.png?text=Ann',
      subText: '+7 983 169-35-04',
    },
  },
};

export const WithAvatar: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: messageWithAvatar,
  },
};

export const WithSubtext: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: messageWithSubtext,
  },
};

export const WithHeader: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: messageWithHeader,
  },
};

export const WithAll: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: messageWithAll,
  },
};

export const WithActions: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: messageWithActions,
  },
};

export const WithAllFeatures: Story = {
  render: (args) => ({
    components: { MissedCallMessage, BaseContainer },
    setup() {
      return { args };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <MissedCallMessage v-bind="args" />
        </div>
      </BaseContainer>
    `,
  }),
  args: {
    message: {
      ...messageWithAll,
      actions,
    },
  },
};

