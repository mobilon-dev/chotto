import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import TextMessage from '../TextMessage.vue';
import { ITextMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof TextMessage> = {
  title: 'Feed Elements/TextMessage',
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

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, TextMessage },
    setup() {
      const themesList = themes;

      const syncTheme = (event: CustomEvent) => {
        const themeCode = event.detail;
        const containers = document.querySelectorAll('[id^="vue-id"]');
        containers.forEach((container) => {
          (container as HTMLElement).dataset.theme = themeCode;
        });
      };

      onMounted(() => {
        window.addEventListener('storybook-theme-change', syncTheme as EventListener);
      });

      onUnmounted(() => {
        window.removeEventListener('storybook-theme-change', syncTheme as EventListener);
      });

      const handleThemeChange = (themeCode: string) => {
        window.dispatchEvent(new CustomEvent('storybook-theme-change', { detail: themeCode }));
      };

      // Примеры сообщений: левое и правое с разными статусами
      const leftMessage: ITextMessage = {
        text: 'Привет!',
        position: 'left',
        messageId: 'left1',
        time: '12:00',
        status: 'read',
      };

      const rightMessagePending: ITextMessage = {
        text: 'Отправляется...',
        position: 'right',
        messageId: 'right1',
        time: '12:05',
        status: 'pending',
      };

      const rightMessageSent: ITextMessage = {
        text: 'Отправлено',
        position: 'right',
        messageId: 'right2',
        time: '12:06',
        status: 'sent',
      };

      const rightMessageReceived: ITextMessage = {
        text: 'Доставлено',
        position: 'right',
        messageId: 'right3',
        time: '12:07',
        status: 'received',
      };

      const rightMessageRead: ITextMessage = {
        text: 'Прочитано',
        position: 'right',
        messageId: 'right4',
        time: '12:08',
        status: 'read',
      };

      const rightMessageError: ITextMessage = {
        text: 'Ошибка отправки',
        position: 'right',
        messageId: 'right5',
        time: '12:09',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, leftMessage, rightMessagePending, rightMessageSent, rightMessageReceived, rightMessageRead, rightMessageError, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <TextMessage :message="leftMessage" />
            <TextMessage :message="rightMessagePending" />
            <TextMessage :message="rightMessageSent" />
            <TextMessage :message="rightMessageReceived" />
            <TextMessage :message="rightMessageRead" />
            <TextMessage :message="rightMessageError" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const LeftMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      views: 18495,
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'left',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: '+79135292926',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
      position: 'left',
      time: '',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      time: 'двенадцать дней назад',
    },
  },
  decorators: commonDecorator,
};

export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithViews: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      views: 18495,
    },
  },
  decorators: commonDecorator,
};

export const RightMessageLongText: Story = {
  args: {
    message: {
      ...messageLongText,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      subText: 'Это Коля',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithoutTime: Story = {
  args: {
    message: {
      ...messageWithoutTime,
      position: 'right',
      time: '',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageStatusSent: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'sent',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageStatusReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageStatusRead: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'read',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageStatusPending: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'pending',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageStatusError: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'error',
      statusMsg: 'Не удалось отправить сообщение',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithLongTime: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      time: 'двенадцать дней назад',
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

export const LeftMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'left',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithLink: Story = {
  args: {
    message: {
      ...messageLink,
      position: 'right',
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

export const LeftMessageWithEmbed: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      embed
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithEmbed: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      embed
    },
  },
  decorators: commonDecorator,
};