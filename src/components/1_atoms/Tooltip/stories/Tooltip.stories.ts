import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Tooltip from '../Tooltip.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст подсказки',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'bottom-left'],
      description: 'Позиция отображения подсказки',
    },
    offset: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: 'Отступ от элемента в пикселях',
    },
  },
  render: (args) => ({
    components: { Tooltip, BaseContainer, ThemeMode },
    setup() { return { args }; },
    template: `
      <BaseContainer style="padding: 24px;">
        <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <ThemeMode :themes="args.theme" :show="true" />
        </div>
        <div style="margin: 100px; display: flex; align-items: center; justify-content: center;">
          <Tooltip 
            :text="args.text" 
            :position="args.position"
            :offset="args.offset"
          >
            <div v-html="args.default"></div>
          </Tooltip>
        </div>
      </BaseContainer>
    `
  }),
};
 
export default meta;
type Story = StoryObj<typeof Tooltip>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];
  
export const Default: Story = {
  args: {
    text: 'Наведите курсор для просмотра подсказки',
    position: 'top',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<button style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Наведите на меня</button>',
  },
};

export const Top: Story = {
  args: {
    text: 'Подсказка сверху',
    position: 'top',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};

export const Bottom: Story = {
  args: {
    text: 'Подсказка снизу',
    position: 'bottom',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};

export const Left: Story = {
  args: {
    text: 'Подсказка слева',
    position: 'left',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};

export const Right: Story = {
  args: {
    text: 'Подсказка справа',
    position: 'right',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};

export const BottomLeft: Story = {
  args: {
    text: 'Подсказка снизу слева',
    position: 'bottom-left',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Информационная иконка',
    position: 'top',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span class="pi pi-info-circle" style="font-size: 24px; color: #007bff; cursor: pointer;"></span>',
  },
};

export const WithButton: Story = {
  args: {
    text: 'Кнопка с подсказкой',
    position: 'top',
    offset: 8,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<button style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Нажми меня</button>',
  },
};

export const LongText: Story = {
  args: {
    text: 'Это очень длинный текст подсказки, который демонстрирует, как компонент обрабатывает длинные сообщения и переносит их на несколько строк',
    position: 'right',
    offset: 12,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer; display: inline-block;">Наведите для просмотра длинной подсказки</span>',
  },
};

export const CustomOffset: Story = {
  args: {
    text: 'Подсказка с увеличенным отступом',
    position: 'top',
    offset: 20,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
    default: '<span style="padding: 10px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">Наведите курсор</span>',
  },
};
