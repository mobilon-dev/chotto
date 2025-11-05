import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CreateChat2 from '../CreateChat2.vue';

const meta = {
  title: 'Modals/CreateChat2',
  component: CreateChat2,
  args: {},
} satisfies Meta<typeof CreateChat2>;

export default meta;

type Story = StoryObj<typeof CreateChat2>;

export const Default: Story = {
  args: {},
};
