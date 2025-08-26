import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import DateMessage from './DateMessage.vue';
import {IDateMessage} from '../../types';

const meta: Meta<typeof DateMessage> = {
  component: DateMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof DateMessage>;

// const currentDateTimeUTC = new Date().toUTCString();

export const Today: Story = {
  args: {
    message: {
      text: 'test',
    } as IDateMessage,
  },
};
