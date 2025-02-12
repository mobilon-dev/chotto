import type { Meta, StoryObj } from '@storybook/vue3';
 
import {AudioRecorder} from '.';
  
const meta: Meta<typeof AudioRecorder> = {
  component: AudioRecorder,
  parameters: {
    layout: 'centered',
  },
};
 
export default meta;
type Story = StoryObj<typeof AudioRecorder>;
 

export const Standard: Story = {
  args:{
    state: 'active'
  },
  decorators: [() => 
    ({ template: 
      '<div id="chat-input-file-line-undefined"></div><div style="min-height: 100px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const InactiveButton: Story = {
  args: {
    state: 'disabled',
  }
}