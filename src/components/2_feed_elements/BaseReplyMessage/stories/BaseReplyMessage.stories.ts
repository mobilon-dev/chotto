import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaseReplyMessage from '../BaseReplyMessage.vue';
import { Reply } from '@/types';

const meta: Meta<typeof BaseReplyMessage> = {
  title: 'Feed Elements/BaseReplyMessage',
  component: BaseReplyMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof BaseReplyMessage>;


const message : Reply = {
  text: 'test test test',
  messageId: 'testMessageId',
  type: 'message.text',
  header: 'Мария'
};


export const FeedReplyMessage: Story = {
  args: {
    message: {
      ...message,
    },
  },
};

export const ChatInputReplyMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    },
    class: 'chat-input-reply'
  },
};