import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ButtonContextMenu from '../ButtonContextMenu.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
const meta: Meta<typeof ButtonContextMenu> = {
  title: 'Atoms/ButtonContextMenu',
  component: ButtonContextMenu,
  render: (args) => ({
   components: {BaseContainer, ButtonContextMenu, ThemeMode},
   setup() {return {args}},
   template: `
    <BaseContainer>
      <div style="margin: 100px;">
        <ThemeMode :themes="args.theme"
        />
        <ButtonContextMenu 
          :actions = "args.actions" 
          :menuSide = "args.menuSide"
          :disabled = "args.disabled"
          :mode = "args.mode"
        >
          <div v-html="args.default"></div>
        </ButtonContextMenu>
      </div>
    </BaseContainer>
   ` 
  }),
  parameters: {
    layout: 'centered',
  },
};
 
export default meta;
type Story = StoryObj<typeof ButtonContextMenu>;
 
const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
];

const theme = [{
  code: "light",
  name: "Light",
  default: true,
}]

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

const actionsLA = [
  {action: 'edit', description: 'слишком длинное-длинное поле в слишком коротком-коротком меню'},
  {action: 'delete', description: 'слишком длинное-длинное поле в слишком коротком-коротком меню'},
];
  
export const StandardRight: Story = {
  args: {
    actions: actions,
    menuSide: 'right',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
    menuSide: 'left',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const FileDropDownMenu: Story = {
  args: {
    actions: actionsFileDropDown,
    menuSide: 'right',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const WithoutIcon: Story = {
  args: {
    actions: actions,
    menuSide: 'right',
    default: '<span>Нажми сюда</span>',
    mode: 'click',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const StandardTop: Story = {
  args: {
    actions: actions,
    menuSide: 'top',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const StandardLeft: Story = {
  args: {
    actions: actions,
    menuSide: 'left',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const StandardBottom: Story = {
  args: {
    actions: actions,
    menuSide: 'bottom',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};

export const LongActions: Story = {
  args: {
    actions: actionsLA,
    menuSide: 'right',
    default: '<span class="pi pi-list"></span>',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme: theme
  },
};