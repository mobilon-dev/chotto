import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaseEditMessage from '../BaseEditMessage.vue';
import { Edit } from '@/types';

const meta: Meta<typeof BaseEditMessage> = {
  title: 'Feed Elements/BaseEditMessage',
  component: BaseEditMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};

export default meta;
type Story = StoryObj<typeof BaseEditMessage>;

const message: Edit = {
  text: 'Исходный текст сообщения для редактирования',
  messageId: 'testMessageId',
  type: 'message.text',
};

export const ChatInputEditMessage: Story = {
  args: {
    message: {
      ...message,
    },
    class: 'chat-input-reply'
  },
};
