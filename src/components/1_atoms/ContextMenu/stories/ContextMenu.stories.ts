import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ContextMenu from '../ContextMenu.vue';

const meta: Meta<typeof ContextMenu> = {
  title: 'Atoms/ContextMenu',
  component: ContextMenu,
  decorators: [() => ({ template: '<div style="min-height: 100px;" data-theme="light"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof ContextMenu>;
 
const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
];
  
export const Standard: Story = {
  args: {
    actions,
  },
};

const actionsWithIcons = [
  {action: 'pin', title: 'прикрепить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin'},
  {action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit'},
  {action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del'},
];

const actionsFileDropDown = [
  {action: 'image/*', title : 'Фото', prime: 'image',},
  {action: 'video/*', title : 'Видео', prime: 'video',},
  {action: '', title : 'Файл', prime: 'file',},
]

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
  },
};

export const FileDropDownMenu: Story = {
  args: {
    actions: actionsFileDropDown,
  },
};
