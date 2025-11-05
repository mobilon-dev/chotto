import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ButtonTemplateSelector from '../ButtonTemplateSelector.vue';
import {templates, groupTemplates} from '../../../../apps/data';
 
  
const meta: Meta<typeof ButtonTemplateSelector> = {
  title: 'Chat Input Elements/ButtonTemplateSelector',
  component: ButtonTemplateSelector,
  parameters: {
    layout: 'centered',
  },
  
};
 
export default meta;
type Story = StoryObj<typeof ButtonTemplateSelector>;
 
export const Standard: Story = {
  args: {
    templates,
    groupTemplates,
  },
  decorators: [() => ({ template: '<div data-theme="light" style="min-height: 100px; min-width: 800px; margin-top: 550px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const InactiveButton: Story = {
  args: {
    state: 'disabled',
  }
}