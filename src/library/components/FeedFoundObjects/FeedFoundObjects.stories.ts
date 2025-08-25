import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FeedFoundObjects from './FeedFoundObjects.vue';

const meta: Meta<typeof FeedFoundObjects> = {
  component: FeedFoundObjects,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof FeedFoundObjects>;

const object = {
  avatar: '',
  subtext: 'Sergey',
  text: 'Hello!',
  time: '15.01.2024',
}

const avatar = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"

const objects = [
  {...object, messageId: '0', type: 'message.text',},
  {...object, messageId: '1', type: 'message.file',avatar: avatar},
  {...object, messageId: '2', type: 'message.audio',},
  {...object, messageId: '3', type: 'message.call',},
]


export const FeedFoundObjectsBasic: Story = {
  args: {
    foundAmount: 4,
    objects,
  },
};

export const FeedFoundObjectsBasic300px: Story = {
  args: {
    foundAmount: 4,
    objects
  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};

export const FeedFoundObjectsBasic500px: Story = {
  args: {
    foundAmount: 4,
    objects
  },
  decorators: [() => ({ template: '<div style="max-width: 500px;"><story/></div>' })]
};

export const FeedFoundObjectsSearchNotStarted: Story = {
  args: {
    objects: []
  },
};

export const FeedFoundObjectsSearchStartedAndNotFound: Story = {
  args: {
    objects: [],
    notFound: true,
  },
};

