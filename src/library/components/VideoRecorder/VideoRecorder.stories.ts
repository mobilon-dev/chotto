import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import {VideoRecorder} from '.';
  
const meta: Meta<typeof VideoRecorder> = {
  component: VideoRecorder,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof VideoRecorder>;
 

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