import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABASeparatedQuickButtons from '../WABASeparatedQuickButtons.vue';

const meta: Meta<typeof WABASeparatedQuickButtons> = {
  title: 'Chat Input Elements/WABASeparatedQuickButtons',
  component: WABASeparatedQuickButtons,
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
