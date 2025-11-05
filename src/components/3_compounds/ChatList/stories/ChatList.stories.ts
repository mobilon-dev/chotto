import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import ChatList from '../ChatList.vue';
 
const meta: Meta<typeof ChatList> = {
  title: 'Compounds/ChatList',
  component: ChatList,
};
 
export default meta;
type Story = StoryObj<typeof ChatList>;

const template = '<div data-theme="light" style="max-width: 350px; max-height:700px;"><story/></div>';

const chats = [{
  chatId: '1',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:34",
  'lastActivity.timestamp': 1732779106,
  isSelected: true,
  metadata: 'Sergey',
},{
  chatId: '2',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  colorUnread: 'green',
  'lastActivity.time': "12:11",
  'lastActivity.timestamp': 1732779306,
  metadata: 'Petr',
}];

const actionsChatList = [
  {action: 'chat.new', title: 'создать новый чат',},
  {action: 'invite.send', title: 'пригласить пользователей',},
]


export const ChatlistBasic: Story = {
  args: {
    chats,
  },
  decorators: [() => ({template})],
};

export const ChatlistWithEnabledFilter: Story = {
  args: {
    chats,
    filterEnabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'filter работает по name и metadata, например, попробуйте ввести Sergey'
      },
    },
  },
  decorators: [() => ({template})],
};

export const ChatlistWithActions: Story = {
  args: {
    chats,
    actions: actionsChatList,
    filterEnabled: true,
  } as Record<string, unknown>,
  decorators: [() => ({template})],
};

const chats10 = [0,1,2,3,4,5,6,7,8,9].map(() => {
  return {
    chatId: '1',
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    name: "John Doe",
    lastMessage: "Привет!",
    countUnread: "21",
    'lastActivity.time': "12:34",
  }
})

export const Entities10: Story = {
  args: {
    chats: [...chats, ...chats10],
    filterEnabled: true,
  },
  decorators: [() => ({template})],
};

const fixedChats = [{
  chatId: '1',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:34",
  'lastActivity.timestamp': 1732771306,
  isFixedTop: true,
},{
  chatId: '2',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:11",
  'lastActivity.timestamp': 1732775306,
  isFixedBottom: true,
}];

export const WithFixedChats: Story = {
  args: {
    chats: [...chats, ...chats10 ,...fixedChats],
    filterEnabled: true,
  },
  decorators: [() => ({template})],
};

const actions = [
  {action: 'edit', title: 'изменить'},
  {action: 'delete', title: 'удалить'},
]

const chatsWithActions = [{
  chatId: '100',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:11",
  'lastActivity.timestamp': 1732745306,
  actions,
},{
  chatId: '102',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:12",
  'lastActivity.timestamp': 1732735306,
  actions,
}];

export const ChatsWithActions: Story = {
  args: {
    chats: [...chats, ...chatsWithActions],
    filterEnabled: true,
  },
  decorators: [() => ({template})],
};

const chatsWithStatuses = [{
  chatId: '100',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:11",
  'lastActivity.timestamp': 1732735306,
  status: '#FF0000',
},{
  chatId: '102',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:12",
  'lastActivity.timestamp': 1732735306,
  status: '#00FF00'
}];

export const ChatsWithStatuses: Story = {
  args: {
    chats: [...chats, ...chatsWithStatuses],
    filterEnabled: false,
  },
  decorators: [() => ({template})],
};

const chatsWithTypings = [{
  chatId: '100',
  avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  name: "John Doe",
  lastMessage: "Привет!",
  countUnread: "21",
  'lastActivity.time': "12:11",
  status: '#FF0000',
  typing: true,
},{
  chatId: '102',
  name: "John Doe 2",
  lastMessage: "Привет 2!",
  countUnread: "677",
  'lastActivity.time': "12:12",
  status: '#00FF00',
  typing: true,
}];


export const ChatsWithTypings: Story = {
  args: {
    chats: [...chats, ...chatsWithTypings],
    filterEnabled: false,
  },
  decorators: [() => ({template})],
};
