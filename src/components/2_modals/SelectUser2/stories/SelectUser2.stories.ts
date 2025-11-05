import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SelectUser2 from '../SelectUser2.vue';

const meta = {
  title: 'Blocks/SelectUser2',
  component: SelectUser2,
  args: {},
} satisfies Meta<typeof SelectUser2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
