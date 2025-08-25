import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import Feed from './Feed.vue';

const meta: Meta<typeof Feed> = {
  component: Feed,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof Feed>;

const objects = [
  { type: "system.date",   messageId: '1', text: 'text', },
  { type: "message.text",  messageId: '2', text: "Привет!", position: 'left', status: 'read', time: '12:30'},
  { type: "message.text",  messageId: '3', text: "Привет!", position: 'right',  status: 'read', time: '13 часов назад'},
  { type: "message.image", messageId: '4', url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
    time: '15 часов назад', alt: "Example Image", position: 'left', status: 'read'},
  { type: "message.file",  messageId: '5', url: "https://example.com/file.pdf",
    time: '15 часов назад', position: 'right', status: 'read', filename: "Документ.pdf"},
  { type: "message.text",  messageId: '6', text: "Привет!",position: 'right', time: '16:30'},
  { type: "message.image", messageId: '7', url: "https://example.com/image.jpg",position: 'left', time: '17:00', alt: "Example Image"},
];


const longobjects = [
  { type: "system.date",   messageId: '1', text: 'text', },
  { type: "message.text",  messageId: '2', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
 position: 'left', status: 'read', time: '12:30'},
  { type: "message.text",  messageId: '3', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
 position: 'right',  status: 'read', time: '13 часов назад'},
  { type: "message.image", messageId: '4', url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
    time: '15 часов назад', alt: "Example Image", position: 'left', status: 'read',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',

  },
  { type: "message.file",  messageId: '5', url: "https://example.com/file.pdf",
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
    time: '15 часов назад', position: 'right', status: 'read', filename: "Документ.pdf"},
  { type: "message.text",  messageId: '6', text: "Привет!",position: 'right', time: '16:30'},
  {
    messageId: '7', type: "message.video", url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
    position: 'right', status: 'read', time: '17:27',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
  },
  {
    messageId: '8', type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    position: 'left', status: 'read', time: '17:27',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    transcript:{
      text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    }
  },
];
const buttonParams = {
  color: '#10b981',
  unreadAmount: 12
}

export const Primary: Story = {
  args: {
    objects,
    typing: false,
  },
};

export const WithDates: Story = {
  args: {
    objects,
    typing: false,
  },
};

export const WithButtonUnread: Story = {
  args: {
    objects,
    buttonParams: buttonParams,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-height: 300px;"><story/></div>' 
  })],
};

export const PrimaryTyping: Story = {
  args: {
    objects,
    typing: true,
  },
};

export const PrimaryTypingWithAvatarAndTitle: Story = {
  args: {
    objects,
    typing: {
      title: 'test sergey 1',
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
    }
  },
};

export const FeedMaxWidth500pxWithLongMessages: Story = {
  args: {
    objects: longobjects,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-width: 500px;"><story/></div>' 
  })],
}

export const FeedMaxWidth700pxWithLongMessages: Story = {
  args: {
    objects: longobjects,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-width: 700px;"><story/></div>' 
  })],
}