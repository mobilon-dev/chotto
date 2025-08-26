import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import SystemMessage from './SystemMessage.vue';
 
const meta: Meta<typeof SystemMessage> = {
  component: SystemMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const Standard: Story = {
  args: {
    message: {
      messageId: 'testId',
      text: 'text text text text text',
    },
  },
};
