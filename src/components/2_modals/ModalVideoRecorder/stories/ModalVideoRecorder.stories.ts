import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ModalVideoRecorder from '../ModalVideoRecorder.vue';

const meta = {
  title: 'Modals/ModalVideoRecorder',
  component: ModalVideoRecorder,
  args: {},
} satisfies Meta<typeof ModalVideoRecorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
