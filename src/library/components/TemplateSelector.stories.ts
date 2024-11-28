import type { Meta, StoryObj } from '@storybook/vue3';
 
import TemplateSelector from './TemplateSelector.vue';
import {templates} from '../../data/templates'
const meta: Meta<typeof TemplateSelector> = {
  component: TemplateSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({ template: '<div style="min-height: 500px; min-width: 650px; margin-top: 150px; padding: 0px 100px"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof TemplateSelector>;
 

export const Standard: Story = {
  args: {
    templates: templates.templates
  },
};