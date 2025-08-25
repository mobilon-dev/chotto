import type { Meta, StoryObj } from '@storybook/vue3-vite';
// import { h } from 'vue'

import Tooltip from './Tooltip.vue';
import BaseContainer from '../containers/BaseContainer.vue'
import ThemeMode from './ThemeMode.vue'
const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: {BaseContainer, Tooltip, ThemeMode},
    setup() {return {args}},
    template: `
     <BaseContainer>
       <div style="margin: 100px;">
         <ThemeMode :themes="args.theme"
         />
         <Tooltip 
           :text = "args.text" 
           :position = "args.position"
         >
           <div v-html="args.default"></div>
         </Tooltip>
       </div>
     </BaseContainer>
    ` 
   }),
  decorators: [() => ({ template: '<div style="margin: 100px;"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof Tooltip>;
  
const theme = [{
  code: "light",
  name: "Light",
  default: true,
}]

export const Right: Story = {
  args: {
    text: 'right',
    position: 'right',
    default: '<span>hover me</span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  }
};


export const Top: Story = {
  args: {
    text: 'top',
    position: 'top',
    default: '<span>hover me</span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const Left: Story = {
  args: {
    text: 'left',
    position: 'left',
    default:'<span>hover me</span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const Bottom: Story = {
  args: {
    text: 'bottom',
    position: 'bottom',
    default: '<span>hover me</span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};
