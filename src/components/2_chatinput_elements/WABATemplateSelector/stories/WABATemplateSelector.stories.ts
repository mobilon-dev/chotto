import type { Meta, StoryObj } from '@storybook/vue3-vite';
import WABATemplateSelector from '../WABATemplateSelector.vue';

const meta = {
  title: 'Chat Input Elements/WABATemplateSelector',
  component: WABATemplateSelector,
  args: {},
} satisfies Meta<typeof WABATemplateSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
