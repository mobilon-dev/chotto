import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
// import Channels from './Channels.vue';
import Channels from './ChannelSelector.vue';
import BaseContainer from '../containers/BaseContainer.vue';
import ThemeMode from './ThemeMode.vue';
const meta: Meta<typeof Channels> = {
  component: Channels,
  render: (args) => ({
    components: {BaseContainer, Channels, ThemeMode},
    setup() {return {args}},
    template: `
      <BaseContainer :extChatAppId=args.extChatAppId>
        <ThemeMode :themes="args.theme" />
        <Channels v-bind=args />
      </BaseContainer>
    ` 
   }),
};
 
export default meta;
type Story = StoryObj<typeof Channels>;

const theme = [{
  code: "light",
  name: "Light",
  default: true,
}]

const testChannelsList = [
  {
    channelId: 'Ch-001',
    title: 'Test channel',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png'
    // type: 'standard',
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
    // type: 'standard',
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

const template = '<div data-theme="light" style="min-height: 100px; min-width: 600px; margin-top: 150px; padding: 0px 0px"><story/></div>';

export const HaveSelectedChannel: Story = {
  args: {
    channels: testChannelsList,
    //@ts-expect-error - extChatAppId prop type mismatch in storybook
    extChatAppId: '1',
    theme,
  },
  decorators: [() => ({ template })]
};

export const HaveNotSelectedChannel: Story = {
  args: {
    channels: testChannelsList2,
    //@ts-expect-error - extChatAppId prop type mismatch in storybook
    extChatAppId: '2',
    theme,
  },
  decorators: [() => ({ template })]
};

export const ChannelsEmptyArray: Story = {
  args: {
    channels: [],
    //@ts-expect-error - extChatAppId prop type mismatch in storybook
    extChatAppId: '3',
    theme,
  },
  decorators: [() => ({ template })]
};

export const InactiveChannels: Story = {
  args: {
    channels: [],
    state: 'disabled',
    //@ts-expect-error - extChatAppId prop type mismatch in storybook
    extChatAppId: '4',
    theme,
  },
  decorators: [() => ({ template })]
};