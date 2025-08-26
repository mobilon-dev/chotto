import type { Meta, StoryObj } from '@storybook/vue3-vite';

import TextMessage from './TextMessage.vue';
import { ITextMessage } from '../../types'

const meta: Meta<typeof TextMessage> = {
  component: TextMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof TextMessage>;


const message: ITextMessage = {
  text: 'test test test',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const messageLink = {
  text: 'Красивое недлинное сообщение и ссылка на github.com',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

const embed = {
  type: 'youtube',
  url: 'https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1',
}

const actions = [
  {
    action: 'edit',
    title: 'изменить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=edit',
  },
  {
    action: 'delete',
    title: 'удалить',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=del',
  },
]

const messageWithoutTime = {
  text: 'test test test',
  messageId: 'testMessageId',
  status: 'read',
};

const messageLongText = {
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
  time: '25:13',
  messageId: 'testMessageId',
  status: 'read',
};


export const LeftMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
    },
  },
};

export const LeftMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      views: 18495,
    },
  },
};

export const LeftMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'left',
    },
  },
};

export const LeftMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: '+79135292926',
    },
  },
};

export const LeftMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
      position: 'left',
      time: '',
    },
  },
};

export const LeftMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
    },
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

export const LeftMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      time: 'двенадцать дней назад',
    },
  },
};

export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    },
  },
};

export const RightMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      views: 18495,
    },
  },
};

export const RightMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'right',
    },
  },
};

export const RightMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      subText: 'Это Коля',
    },
  },
};

export const RightMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
      position: 'right',
      time: '',
    },
  },
};

export const RightMessageStatusSent: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'sent',
    },
  },
};

export const RightMessageStatusReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    },
  },
};

export const RightMessageStatusRead: Story = {
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

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const RightMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      time: 'двенадцать дней назад',
    },
  },
};

export const LeftMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'left',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
};

export const RightMessageMax: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'right',
      subText: 'тест тест тест тест',
      actions,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=SD',
      time: 'два дня назад',
    },
  },
};

export const LeftMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
    },
  },
};

export const RightMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
    },
  },
};

export const LeftMessageWithReplyText: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.text',
        text: 'previous message',
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyText: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.text',
        text: 'previous message',
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyImage: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: messageLongText.text,
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyImage: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: messageLongText.text,
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyVideo: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.video',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyVideo: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.video',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};


export const LeftMessageWithReplyFile: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.file',
        filename: 'video.mp4',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyFile: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.file',
        filename: 'video.mp4',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyAudio: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.audio',
        filename: 'video.mp4',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const RightMessageWithReplyAudio: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.audio',
        text: messageLongText.text,
        url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
        header: 'Мария',
      },
    },
  },
};

export const LeftMessageWithReplyCall: Story = {
  args: {
    message: {
      ...messageLink,
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
      ...messageLink,
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
      ...messageLink,
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
      ...messageLink,
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

export const LeftMessageWithEmbed: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      embed
    },
  },
};

export const RightMessageWithEmbed: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      embed
    },
  },
};