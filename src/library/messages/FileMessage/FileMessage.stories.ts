import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FileMessage from './FileMessage.vue';
import { IFileMessage } from '../../types'

const meta: Meta<typeof FileMessage> = {
  component: FileMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof FileMessage>;

const fileMessage: IFileMessage = {
  filename: "document.pdf",
  url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
  time: '20:55',
  status: 'read',
  position: 'left',
  messageId: 'testId',
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


export const LeftFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
    } as IFileMessage,
  },
};

export const LeftFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      subText: 'sub text sub text'
    },
  },
};

export const LeftFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
    }
  },
};

export const LeftFileMessageWithAvatar: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightFileMessageWithAvatar: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const LeftFileMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightFileMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
    }
  },
};

export const RightFileMessageStatusSent: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'sent',
    }
  },
};

export const RightFileMessageStatusReceived: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'received',
    }
  },
};

export const RightFileMessageStatusRead: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'read',
    }
  },
};

export const RightFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      subText: 'sub text sub text'
    },
  },
};

export const RightFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
    }
  },
};

export const RightFileMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
};

export const LeftFileMessageWithActionsAndText: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
};

export const RightFileMessageWithActionsAndTextWithLink: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. vk.com',
    },
  },
};

export const LeftFileMessageWithActionsAndTextWithLink: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. vk.com',
    }
  },
};
export const LeftMessageWithReplyText: Story = {
  args: {
    message: {
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
      ...fileMessage,
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
