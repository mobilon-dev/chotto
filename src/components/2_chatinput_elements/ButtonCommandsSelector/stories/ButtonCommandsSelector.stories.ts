import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ButtonCommandsSelector from '../ButtonCommandsSelector.vue';
  
const meta: Meta<typeof ButtonCommandsSelector> = {
  title: 'Chat Input Elements/ButtonCommandsSelector',
  component: ButtonCommandsSelector,
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: {BaseContainer, ButtonCommandsSelector},
    setup() {return {args}},
    template: `
     <BaseContainer data-theme='light'>
       <div style="margin: 100px;">
         <ButtonCommandsSelector v-bind=args />
       </div>
     </BaseContainer>
    ` 
   }),
};

const commands = [
  {
    action: 'start',
    title: '/start',
    description: 'начать работу с чатботом'
  },
  {
    action: 'info',
    title: '/info',
    description: 'информация о чатботе'
  }
]
  
export default meta;
type Story = StoryObj<typeof ButtonCommandsSelector>;
 
export const StandardHovering: Story = {
  args: {
    commands,
  },
  decorators: [() => ({ template: '<div style="min-height: 100px; min-width: 200px; margin-top: 250px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const StandardClicking: Story = {
  args:{
    commands,
    mode: 'click',
  },
  decorators: [() => ({ template: '<div style="min-height: 100px; min-width: 200px; margin-top: 250px; padding: 0px 0px; position: relative"><story/></div>' })]
};

export const InactiveButton: Story = {
  args: {
    commands,
    state: 'disabled',
  }
}

export const NoCommandsInArgs: Story = {}