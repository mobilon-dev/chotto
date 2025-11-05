import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import AudioRecorder from '../AudioRecorder.vue';
  
const meta: Meta<typeof AudioRecorder> = {
  title: 'Elements/AudioRecorder',
  component: AudioRecorder,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => 
    ({ template: 
      '<div data-theme="light" id="chat-input-file-line-undefined"></div><div style="min-height: 100px; padding: 0px 0px; position: relative" data-theme="light"><story/></div>'
    })]
};
 
export default meta;
type Story = StoryObj<typeof AudioRecorder>;
 

export const Standard: Story = {
  args:{
    state: 'active'
  },
  
};

export const InactiveButton: Story = {
  args: {
    state: 'disabled',
  }
}