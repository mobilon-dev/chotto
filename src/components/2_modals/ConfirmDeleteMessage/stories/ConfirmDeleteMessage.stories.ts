import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ConfirmDeleteMessage from '../ConfirmDeleteMessage.vue'

const meta = {
  title: 'Modals/ConfirmDeleteMessage',
  component: ConfirmDeleteMessage,
  args: {
    theme: 'light',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'green', 'glass', 'mobilon1'],
    },
  },
} satisfies Meta<typeof ConfirmDeleteMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'light',
  },
}
