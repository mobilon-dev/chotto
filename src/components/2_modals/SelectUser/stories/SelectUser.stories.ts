import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SelectUser from '../SelectUser.vue';

const meta = {
  title: 'Blocks/SelectUser',
  component: SelectUser,
  args: {},
} satisfies Meta<typeof SelectUser>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
