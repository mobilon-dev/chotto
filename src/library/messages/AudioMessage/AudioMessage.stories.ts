import type { Meta, StoryObj } from '@storybook/vue3-vite';

import AudioMessage from './AudioMessage.vue';
import { IAudioMessage } from '../../types';

const meta: Meta<typeof AudioMessage> = {
  component: AudioMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof AudioMessage>;

const message: IAudioMessage = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
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
      ...message,
      position: 'left',
    } as IAudioMessage,
  },
};

export const LeftMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
    } as IAudioMessage,
  },
};


export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right'
    } as IAudioMessage,
  },
};

export const LeftMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const LeftMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageSent: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'sent',
    } as IAudioMessage,
  },
};

export const RightMessageReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    } as IAudioMessage,
  },
};

export const RightMessageRead: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'read',
    },
  },
};

export const RightMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
    },
  },
};

export const RightMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  },
};

export const LeftMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  },
};

export const RightMessageWithActionsAndTextWithLink: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. yandex.ru'
    },
  },
};

export const LeftMessageWithActionsAndTextWithLink: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. yandex.ru'
    },
  },
};


export const RightMessageWithTranscript: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
      transcript: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. yandex.ru',
      },
    },
  },
};

export const LeftMessageWithTranscript: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
      transcript: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. yandex.ru',
      },
    },
  },
};
export const LeftMessageWithReplyText: Story = {
  args: {
    message: {
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
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
      ...message,
      position: 'left',
      linkPreview: {
        title: 'GitHub · Build and ship software on a single, collaborative platform',
        imageUrl: 'https://filebump2.services.mobilon.ru/file/eMWLDOFaV3htGOMJZUVFcdE6r29TPFnZHofq',
        url: 'https://github.com',
        description: 'Join the world\'s most widely adopted, AI-powered developer platform where millions of developers, ' +
          'businesses, and the largest open source community build software that advances humanity.',
      },
    },
  },
};

export const RightMessageWithPreviewLink: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      linkPreview: {
        title: 'GitHub · Build and ship software on a single, collaborative platform',
        imageUrl: 'https://filebump2.services.mobilon.ru/file/eMWLDOFaV3htGOMJZUVFcdE6r29TPFnZHofq',
        url: 'https://github.com',
        description: 'Join the world\'s most widely adopted, AI-powered developer platform where millions of developers, ' +
          'businesses, and the largest open source community build software that advances humanity.',
      },
    },
  },
};
