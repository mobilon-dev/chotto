import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ModalNoFooter from '../ModalNoFooter.vue';

const meta = {
  title: 'Modals/ModalNoFooter',
  component: ModalNoFooter,
  args: {},
} satisfies Meta<typeof ModalNoFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
