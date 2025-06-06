import type { Meta, StoryObj } from '@storybook/vue3';

import ChatItem from './ChatItem.vue';

const meta: Meta<typeof ChatItem> = {
  component: ChatItem,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof ChatItem>;

const chat = {
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "2",
  'lastActivity.time': "12:34",
  typing: true,
};

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
]

export const ChatItemBasic: Story = {
  args: {
    chat: {
      ...chat,
    },
  },
};

export const ChatItemBasic300px: Story = {
  args: {
    chat: {
      ...chat,
    },
  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};

export const ChatItemBasic500px: Story = {
  args: {
    chat: {
      ...chat,
    },
  },
  decorators: [() => ({ template: '<div style="max-width: 500px;"><story/></div>' })]
};

export const ChatItemColoredUnread: Story = {
  args: {
    chat: {
      ...chat,
      colorUnread: 'red'
    },
  },
};

export const ChatItemWithoutLastMessage: Story = {
  args: {
    chat: {
      ...chat,
      lastMessage: null,
    },
  },
};

export const ChatItemWithLastMessageStatusSend: Story = {
  args: {
    chat: {
      ...chat,
      countUnread: "0",
      'lastMessage.status': 'sent',
    },
  },
};

export const ChatItemWithLastMessageStatusReceived: Story = {
  args: {
    chat: {
      ...chat,
      countUnread: "0",
      'lastMessage.status': 'received',
    },
  },
};

export const ChatItemWithLastMessageStatusRead: Story = {
  args: {
    chat: {
      ...chat,
      countUnread: "0",
      'lastMessage.status': 'read',
    },
  },
};

export const ChatItemWithAvatar: Story = {
  args: {
    chat: {
      ...chat,
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    },
  },
};


export const ChatItemWithUnread: Story = {
  args: {
    chat: {
      ...chat,
      countUnread: "123",
    }
  },
};

export const ChatItemWithLongLastMessage: Story = {
  args: {
    chat: {
      ...chat,
      lastMessage: "Очень длинное текстовое сообщение. Его надо как-то немного спрятать",
      countUnread: "0",
    },
  },
};

export const ChatItemSelected: Story = {
  args: {
    chat: {
      ...chat,
      isSelected: true,
    },
  },
};

export const ChatItemWithActions: Story = {
  args: {
    chat: {
      ...chat,
      actions,
    },
  },
};

export const ChatItemWithStatusOnline: Story = {
  args: {
    chat: {
      ...chat,
      status: '#00FF00',
    },
  },
};

export const ChatItemWithStatusOffline: Story = {
  args: {
    chat: {
      ...chat,
      status: '#FF0000',
    },
  },
};


export const ChatItemWithTyping: Story = {
  args: {
    chat: {
      ...chat,
      typing: true,
    },
  },
};


export const ChatItemMax: Story = {
  args: {
    chat: {
      ...chat,
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      actions,
    },
  },
};

