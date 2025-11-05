import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ChatTabs from '../ChatTabs.vue';

const meta = {
  title: 'Chat List Elements/ChatTabs',
  component: ChatTabs,
  args: {},
} satisfies Meta<typeof ChatTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
