import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ButtonEmojiPicker from '../ButtonEmojiPicker.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const meta: Meta<typeof ButtonEmojiPicker> = {
  title: 'Chat Input Elements/ButtonEmojiPicker',
  component: ButtonEmojiPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['active', 'disabled'],
      description: 'Состояние кнопки',
    },
    mode: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Режим активации пикера эмодзи',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ButtonEmojiPicker, ThemeMode },
    setup() { return { args }; },
    template: `
      <BaseContainer style="padding: 24px;">
        <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <ThemeMode :themes="args.theme" :show="true" />
        </div>
        <div style="margin: 100px; position: relative; min-height: 400px; display: flex; align-items: flex-start; justify-content: center;">
          <ButtonEmojiPicker v-bind="args" />
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof ButtonEmojiPicker>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

export const Default: Story = {
  args: {
    state: 'active',
    mode: 'click',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const ClickMode: Story = {
  args: {
    state: 'active',
    mode: 'click',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
};

export const HoverMode: Story = {
  args: {
    state: 'active',
    mode: 'hover',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    mode: 'click',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};