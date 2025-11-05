import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import TemplateSelector from '../TemplateSelector.vue';
import {templates, groupTemplates} from '../../../../apps/data';

const meta: Meta<typeof TemplateSelector> = {
  title: 'Chat Input Elements/TemplateSelector',
  component: TemplateSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({ template: '<div data-theme="light" style="min-height: 50px; min-width: 850px; margin-top: 550px; padding: 0px 0px; position: relative"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof TemplateSelector>;
 
export const Standard: Story = {
  args: {
    templates,
    groupTemplates,
  },
};
