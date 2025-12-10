import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { provide } from 'vue';

import ContactContextMenu from '../ContactContextMenu.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import ContactCRMIcon from '../../../1_icons/ContactCRMIcon.vue';

const meta: Meta<typeof ContactContextMenu> = {
  title: 'Atoms/ContactContextMenu',
  component: ContactContextMenu,
  render: (args) => ({
    components: { BaseContainer, ContactContextMenu, ThemeMode },
    setup() {
      provide('chatAppId', 'storybook-chat-app');
      provide('extChatAppId', 'storybook-ext-chat-app');
      return { args };
    },
    template: `
      <BaseContainer>
        <div style="margin: 100px;">
          <ThemeMode :themes="args.theme" />
          <ContactContextMenu 
            :actions="args.actions" 
            :menuSide="args.menuSide"
            :disabled="args.disabled"
            :mode="args.mode"
            @click="handleClick"
          />
        </div>
      </BaseContainer>
    `,
    methods: {
      handleClick(action: unknown) {
        console.log('Action clicked:', action);
        if (typeof action === 'object' && action !== null && 'action' in action && typeof (action as { action?: () => void }).action === 'function') {
          (action as { action: () => void }).action();
        }
      }
    }
  }),
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContactContextMenu>;

const actions = [
  {
    id: 'edit',
    title: 'Изменить',
    action: () => {
      console.log('Edit action');
    }
  },
  {
    id: 'delete',
    title: 'Удалить',
    action: () => {
      console.log('Delete action');
    }
  },
];

const theme = [{
  code: "light",
  name: "Light",
  default: true,
}];

const actionsWithIcons = [
  {
    id: 'open_crm',
    title: 'Открыть контакт в CRM',
    icon: ContactCRMIcon,
    action: () => {
      console.log('Open CRM action');
    }
  },
  {
    id: 'edit',
    title: 'Изменить',
    action: () => {
      console.log('Edit action');
    }
  },
  {
    id: 'delete',
    title: 'Удалить',
    action: () => {
      console.log('Delete action');
    }
  },
];

const actionsWithPrimeIcons = [
  {
    id: 'image',
    title: 'Фото',
    prime: 'image',
    action: () => {
      console.log('Image action');
    }
  },
  {
    id: 'video',
    title: 'Видео',
    prime: 'video',
    action: () => {
      console.log('Video action');
    }
  },
  {
    id: 'file',
    title: 'Файл',
    prime: 'file',
    action: () => {
      console.log('File action');
    }
  },
];

const actionsWithDisabled = [
  {
    id: 'edit',
    title: 'Изменить',
    disabled: false,
    action: () => {
      console.log('Edit action');
    }
  },
  {
    id: 'delete',
    title: 'Удалить',
    disabled: true,
    action: () => {
      console.log('Delete action');
    }
  },
];

export const Standard: Story = {
  args: {
    actions: actions,
    menuSide: 'top',
    mode: 'hover',
    disabled: false,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const WithIcons: Story = {
  args: {
    actions: actionsWithIcons,
    menuSide: 'right',
    mode: 'hover',
    disabled: false,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const WithPrimeIcons: Story = {
  args: {
    actions: actionsWithPrimeIcons,
    menuSide: 'left',
    mode: 'hover',
    disabled: false,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const ClickMode: Story = {
  args: {
    actions: actions,
    menuSide: 'top',
    mode: 'click',
    disabled: false,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const Disabled: Story = {
  args: {
    actions: actionsWithDisabled,
    menuSide: 'right',
    mode: 'hover',
    disabled: false,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

