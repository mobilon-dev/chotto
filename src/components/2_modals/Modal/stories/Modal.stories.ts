import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Modal from '../Modal.vue';

const meta = {
  title: 'Modals/Modal',
  component: Modal,
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};
