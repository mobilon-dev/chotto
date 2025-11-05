import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ChatPanel from '../ChatPanel.vue';

const meta: Meta<typeof ChatPanel> = {
  title: 'Elements/ChatPanel',
  component: ChatPanel,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof ChatPanel>;
 
export const Standard: Story = {
  args: {
    title: 'test panel',
    content: 'wrwer ewrwe r'
  },
};

