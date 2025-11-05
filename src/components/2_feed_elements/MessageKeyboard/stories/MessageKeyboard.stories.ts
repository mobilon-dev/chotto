import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import MessageKeyboard from '../MessageKeyboard.vue';

const meta: Meta<typeof MessageKeyboard> = {
  title: 'Feed Elements/MessageKeyboard',
  component: MessageKeyboard,
  parameters: {
    layout: 'centered',
  },
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof MessageKeyboard>;
 
const key = {
  key: '1',
  text: 'OK',
  order: 1,
}

const smallKeyboard = [key, key]

const longKeyboard = [key, key, key, key, key, key, key, key, key, key]
  
const standardKeyBoard = [
  {
    key: 'key_1',
    text: 'Все ок',
    order: 1,
  },{
    key: 'key_2',
    text: 'Перезвоню позже',
    order: 2,
  },{
    key: 'key_3',
    text: 'Перезвоню неизвестно когда',
    order: 3,
  },
]

const longtextKeyboard = [
  {
    key: 'key_1',
    text: 'Длинная строка с пробелами и минимальными проблемами при отображении в узком пространстве',
    order: 1,
  },{
    key: 'key_2',
    text: 'Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон',
    order: 2,
  },
]

export const TwoShortButtons: Story = {
  args: {
    keyboard: smallKeyboard
  },
};

export const TenShortButtons: Story = {
  args: {
    keyboard: longKeyboard
  },
};
//decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]

export const TenShortButtonsIn200pxArea: Story = {
  args: {
    keyboard: longKeyboard
  },
  decorators: [() => ({ template: '<div style="max-width: 200px;"><story/></div>' })]
};

export const ThreeStandartButtons: Story = {
  args: {
    keyboard: standardKeyBoard
  },
};

export const ThreeStandartButtonsIn300pxArea: Story = {
  args: {
    keyboard: standardKeyBoard
  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};


export const TwoLongButtons: Story = {
  args: {
    keyboard: longtextKeyboard
  },
};

export const TwoLongButtonsIn300pxArea: Story = {
  args: {
    keyboard: longtextKeyboard
  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};





