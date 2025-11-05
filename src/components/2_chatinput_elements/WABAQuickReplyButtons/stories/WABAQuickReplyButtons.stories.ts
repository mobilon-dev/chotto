import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABAQuickReplyButtons from '../WABAQuickReplyButtons.vue';

const meta: Meta<typeof WABAQuickReplyButtons> = {
  title: 'Chat Input Elements/WABAQuickReplyButtons',
  component: WABAQuickReplyButtons,
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
