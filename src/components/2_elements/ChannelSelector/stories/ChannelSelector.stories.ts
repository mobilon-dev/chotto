import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Channels from '../ChannelSelector.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../ThemeMode/ThemeMode.vue';

const meta: Meta<typeof Channels> = {
  title: 'Elements/ChannelSelector',
  component: Channels,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseContainer, Channels, ThemeMode },
    setup() { return { args }; },
    template: `
      <BaseContainer style="padding: 24px;">
        <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <ThemeMode :themes="args.theme" :show="true" />
        </div>
        <div style="min-height: 300px; min-width: 600px; padding: 40px 0;">
          <Channels v-bind="args" />
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof Channels>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

const testChannelsList = [
  {
    channelId: 'Ch-001',
    title: 'Test channel',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
  },
  {
    channelId: 'Ch-002',
    title: 'Test channel 2',
    icon: 'whatsapp',
    type: 'default',
  },
  {
    channelId: 'channel1',
    title: 'waba',
    icon: 'waba',
  },
];

const testChannelsList2 = [
  {
    channelId: 'Ch-001',
    title: 'Test channel',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
  },
  {
    channelId: 'Ch-002',
    title: 'Test channel 2',
    icon: 'whatsapp',
  },
  {
    channelId: 'channel1',
    title: 'waba',
    icon: 'waba',
  },
];

export const HaveSelectedChannel: Story = {
  args: {
    channels: testChannelsList,
    //@ts-expect-error - theme arg for Storybook ThemeMode only
    theme: themes,
  },
};

export const HaveNotSelectedChannel: Story = {
  args: {
    channels: testChannelsList2,
    //@ts-expect-error - theme arg for Storybook ThemeMode only
    theme: themes,
  },
};

export const ChannelsEmptyArray: Story = {
  args: {
    channels: [],
    //@ts-expect-error - theme arg for Storybook ThemeMode only
    theme: themes,
  },
};

export const InactiveChannels: Story = {
  args: {
    channels: [],
    state: 'disabled',
    //@ts-expect-error - theme arg for Storybook ThemeMode only
    theme: themes,
  },
};