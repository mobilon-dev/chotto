import type { Meta, StoryObj } from '@storybook/vue3-vite';

import VideoMessage from './VideoMessage.vue';

const meta: Meta<typeof VideoMessage> = {
  component: VideoMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof VideoMessage>;

const videoMessage = {
  messageId: 'testId',
  position: 'left',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  time: '12:12',
  status: 'read',
};

const longText = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
  'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
  'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
  'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
  'sometimes by accident, sometimes on purpose (injected humour and the like).'

const actions = [
  { action: 'edit', title: 'изменить', },
  { action: 'delete', title: 'удалить', },
];

export const LeftMessage: Story = {
  args: {
    message: {
      ...videoMessage,
    },
  },
};

export const RightMessage: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
    },
  },
};

export const LeftMessageWithAvatar: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const LeftMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const LeftMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const RightMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const LeftMessageWithTextAndActions: Story = {
  args: {
    message: {
      ...videoMessage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions,
      position: 'left',
    },
  },
};

export const RightMessageWithTextAndActions: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions,
    },
  },
};

export const RightMessageWithStatusSent: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'sent',
      actions,
    },
  },
};

export const RightMessageWithStatusReceived: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'received',
      actions,
    },
  },
};

export const RightMessageWithStatusRead: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const RightMessageWithVerticalVideo: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const RightMessageWithVerticalVideoAndText: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const LeftMessageWithVerticalVideoAndTextWithLink: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
      position: 'left',
      status: 'read',
      actions,
    },
  },
};


export const RightMessageWithVerticalVideoAndTextWithLink: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
      position: 'right',
      status: 'read',
      actions,
    },
  },
};

export const LeftMessageWithReplyText: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.text',
        text: longText,
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyText: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.text',
        text: longText,
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyImage: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: longText,
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyImage: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: longText,
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyVideo: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.video',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyVideo: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.video',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};


export const LeftMessageWithReplyFile: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.file',
        filename: 'video.mp4',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyFile: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.file',
        filename: 'video.mp4',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyAudio: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.audio',
        filename: 'video.mp4',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyAudio: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",

      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.audio',
        text: longText,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyCall: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.call',
        callDuration: '18 минут',
        isMissedCall: true, 
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyCall: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.call',
        callDuration: '18 минут',
        isMissedCall: false, 
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithPreviewLink: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
      position: 'left',
      linkPreview: {
        title: 'Яндекс',
        imageUrl: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png',
        url: 'https://yandex.ru',
        description: 'Найдётся всё',
      }
    },
  },
};

export const RightMessageWithPreviewLink: Story = {
  args: {
    message: {
      ...videoMessage,
      url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
      position: 'right',
      linkPreview: {
        title: 'Яндекс',
        imageUrl: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png',
        url: 'https://yandex.ru',
        description: 'Найдётся всё',
      }
    },
  },
};

