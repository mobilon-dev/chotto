import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ContactInfo from '../ContactInfo.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../ThemeMode/ThemeMode.vue';

const meta: Meta<typeof ContactInfo> = {
  title: 'Elements/ContactInfo',
  component: ContactInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    contact: {
      control: 'object',
      description: 'Объект контакта с массивом атрибутов',
    },
    channels: {
      control: 'object',
      description: 'Массив доступных каналов связи',
    },
    currentDialog: {
      control: 'object',
      description: 'Объект текущего диалога с attributeId',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ContactInfo, ThemeMode },
    setup() { return { args }; },
    template: `
      <BaseContainer style="padding: 24px; min-height: 100vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="args.theme" :show="true" />
        </div>
        <div style="min-width: 400px; max-width: 600px;">
          <ContactInfo v-bind="args" />
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof ContactInfo>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

const defaultChannels = [
  {
    channelId: 'whatsapp-001',
    title: 'WhatsApp'
  },
  {
    channelId: 'telegram-001',
    title: 'Telegram'
  },
  {
    channelId: 'waba-001',
    title: 'WABA'
  }
];

const defaultContact = {
  attributes: [
    { id: 1, value: '+7 (999) 123-45-67' },
    { id: 2, value: 'example@email.com' },
    { id: 3, value: 'г. Москва, ул. Примерная, д. 1' }
  ]
};

export const Default: Story = {
  args: {
    contact: defaultContact,
    channels: defaultChannels,
    currentDialog: {
      attributeId: 1
    },
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const WithCurrentDialog: Story = {
  args: {
    contact: defaultContact,
    channels: defaultChannels,
    currentDialog: {
      attributeId: 2
    },
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const WithoutCurrentDialog: Story = {
  args: {
    contact: defaultContact,
    channels: defaultChannels,
    currentDialog: {},
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const SingleAttribute: Story = {
  args: {
    contact: {
      attributes: [
        { id: 1, value: '+7 (999) 123-45-67' }
      ]
    },
    channels: defaultChannels,
    currentDialog: {
      attributeId: 1
    },
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const MultipleChannels: Story = {
  args: {
    contact: defaultContact,
    channels: [
      {
        channelId: 'whatsapp-001',
        title: 'WhatsApp'
      },
      {
        channelId: 'telegram-001',
        title: 'Telegram'
      },
      {
        channelId: 'waba-001',
        title: 'WABA'
      },
      {
        channelId: 'whatsapp-002',
        title: 'WhatsApp Business'
      }
    ],
    currentDialog: {
      attributeId: 1
    },
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const EmptyContact: Story = {
  args: {
    contact: {
      attributes: []
    },
    channels: defaultChannels,
    currentDialog: {},
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const WithIconUrls: Story = {
  args: {
    contact: defaultContact,
    channels: [
      {
        channelId: 'telegram-001',
        title: 'Telegram',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
      },
      {
        channelId: 'whatsapp-001',
        title: 'WhatsApp',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/240px-WhatsApp.svg.png'
      }
    ],
    currentDialog: {
      attributeId: 1
    },
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};
