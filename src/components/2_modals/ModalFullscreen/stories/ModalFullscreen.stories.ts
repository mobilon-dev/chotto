import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ModalFullscreen from '../ModalFullscreen.vue';

const meta = {
  title: 'Modals/ModalFullscreen',
  component: ModalFullscreen,
  args: {},
} satisfies Meta<typeof ModalFullscreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
