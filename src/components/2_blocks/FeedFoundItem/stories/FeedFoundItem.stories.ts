import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FeedFoundItem from '../FeedFoundItem.vue';

const meta: Meta<typeof FeedFoundItem> = {
  title: 'Blocks/FeedFoundItem',
  component: FeedFoundItem,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof FeedFoundItem>;

const object = {
  messageId: '0',
  avatar: '',
  subtext: 'Sergey',
  text: 'Hello!',
  time: '15.01.2024',
  type: 'message.text',
}

const longText = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
  'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
  'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
  'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
  'sometimes by accident, sometimes on purpose (injected humour and the like).'


const avatar = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"

export const FeedFoundItemBasic: Story = {
  args: {
    object: object
  },
};

export const FeedFoundItemBasic300px: Story = {
  args: {
    object: object
  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};

export const FeedFoundItemBasic500px: Story = {
  args: {
    object: object
  },
  decorators: [() => ({ template: '<div style="max-width: 500px;"><story/></div>' })]
};

export const FeedFoundItemLongMessage: Story = {
  args: {
    object: {
      ...object,
      text: longText,
    }
  },
};

export const FeedFoundLongName: Story = {
  args: {
    object: {
      ...object,
      subtext: "Василий ВасильевичВасильевскийВасилийВасилий",
    }
  },
};

export const FeedFoundWithAvatar: Story = {
  args: {
    object: {
      ...object,
      avatar: avatar,
    }
  },
};

export const FeedFoundWithDocument: Story = {
  args: {
    object: {
      ...object,
      type:'message.file'
    }
  },
};

export const FeedFoundItemWithImageOrVideo: Story = {
  args: {
    object: {
      ...object,
      type:'message.image',
      url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",

    }
  },
};

export const FeedFoundItemWithCall: Story = {
  args: {
    object: {
      ...object,
      type:'message.call'
    }
  },
};

export const FeedFoundItemWithAudio: Story = {
  args: {
    object: {
      ...object,
      type:'message.audio'
    }
  },
};