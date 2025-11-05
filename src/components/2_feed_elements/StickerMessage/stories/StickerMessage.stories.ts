import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import StickerMessage from '../StickerMessage.vue';
import { IStickerMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';
import stickerWebp from '../../../../apps/data/images/sticker.webp';
import animatedStickerTgs from '../../../../apps/data/images/AnimatedSticker.tgs';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof StickerMessage> = {
  title: 'Feed Elements/StickerMessage',
  component: StickerMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof StickerMessage>;

const stickerMessage: IStickerMessage = {
  messageId: 'testId',
  status: 'read',
  url: stickerWebp,
  time: '20:55',
  position: 'left',
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, StickerMessage },
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

      // Примеры сообщений из messages.ts: левое (static sticker) и правое (animated sticker, error)
      const leftMessage: IStickerMessage = {
        messageId: '627',
        url: stickerWebp,
        alt: "Static sticker",
        position: 'left',
        status: 'read',
        time: '12:30',
        header: 'Ярослав',
        subText: 'Ярослав',
        avatar: 'https://placehold.jp/30/1b97e4/ffffff/64x64.png?text=Jar',
      };

      const rightMessage: IStickerMessage = {
        messageId: '629',
        url: animatedStickerTgs,
        alt: "Animated sticker",
        position: 'right',
        status: 'error',
        statusMsg: 'Превышен лимит запросов на доставку',
        time: '12:32',
        header: 'Анна',
        subText: 'Анна',
        avatar: 'https://placehold.jp/30/f1048e/ffffff/64x64.png?text=Ann',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, leftMessage, rightMessage, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <StickerMessage :message="leftMessage" />
            <StickerMessage :message="rightMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};


export const LeftStickerMessage: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'left',
    } as IStickerMessage,
  },
  decorators: commonDecorator,
};

export const LeftStickerMessageWithViews: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'left',
      views: 121212,
    },
  },
  decorators: commonDecorator,
};

export const LeftStickerMessageWithAvatar: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageWithAvatar: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const LeftStickerMessageWithActions: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'left',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessage: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageWithViews: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      views: 121212,
    } as IStickerMessage,
  },
  decorators: commonDecorator,
};

export const RightStickerMessageStatusSent: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      status: 'sent',
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageStatusReceived: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      status: 'received',
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageStatusRead: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      status: 'read',
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageWithActions: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const LeftStickerMessageAnimated: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'left',
      url: animatedStickerTgs,
      alt: "Animated sticker",
    },
  },
  decorators: commonDecorator,
};

export const RightStickerMessageAnimated: Story = {
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      url: animatedStickerTgs,
      alt: "Animated sticker",
    },
  },
  decorators: commonDecorator,
};


