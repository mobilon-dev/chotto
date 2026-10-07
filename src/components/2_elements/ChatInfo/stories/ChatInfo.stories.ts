import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ChatInfo from '../ChatInfo.vue';

const meta: Meta<typeof ChatInfo> = {
  title: 'Elements/ChatInfo',
  component: ChatInfo,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof ChatInfo>;
 

const chat = {
  name: 'Ch-001',
  chatId: 'testChatId',
  avatar: null,
  'lastActivity.time': 'вчера',
};

export const Standard: Story = {
  args: {
    chat: {
      ...chat,
    },
  },
};

export const WithAvatar: Story = {
  args: {
    chat: {
      ...chat,
      avatar: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=JP'
    },
  },
};

export const Verified: Story = {
  args: {
    chat: {
      ...chat,
      name: 'Mobilon One',
      avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=blue&seed=Mobilon&style=round',
      verified: true,
    },
  },
};

export const ServiceChannel: Story = {
  args: {
    chat: {
      ...chat,
      name: 'Mobilon One',
      avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=64&palette=blue&seed=Mobilon&style=round',
      verified: true,
      'lastActivity.time': '11:23',
    },
    description: 'Сервисный канал',
  },
};
