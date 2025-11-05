import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import VideoMessage from '../VideoMessage.vue';
import { IVideoMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof VideoMessage> = {
  title: 'Feed Elements/VideoMessage',
  component: VideoMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof VideoMessage>;

const videoMessage: IVideoMessage = {
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

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, VideoMessage },
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

      // Примеры сообщений: левое и правое со статусом ошибки
      const leftMessage: IVideoMessage = {
        messageId: 'left1',
        position: 'left',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        time: '12:00',
        status: 'read',
        avatar: 'https://placehold.jp/30/90ee90/ffffff/64x64.png?text=GG',
        subText: 'Генадий Григорьев',
      };

      const rightMessageError: IVideoMessage = {
        messageId: 'right1',
        position: 'right',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        time: '12:09',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
        avatar: 'https://placehold.jp/30/ffb6c1/ffffff/64x64.png?text=WP',
        subText: 'Виктория Павлова',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { themesList, handleThemeChange, leftMessage, rightMessageError, containerStyle };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <VideoMessage :message="leftMessage" />
            <VideoMessage :message="rightMessageError" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const LeftMessage: Story = {
  args: {
    message: {
      ...videoMessage,
    },
  },
  decorators: commonDecorator,
};

export const RightMessage: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithAvatar: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/eabd8c/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithAvatar: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/64b5f6/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/fa8072/ffffff/64x64.png?text=GG',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/6495f6/ffffff/64x64.png?text=WP',
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'left',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithText: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

export const RightMessageWithStatusPending: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'pending',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithStatusError: Story = {
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      status: 'error',
      statusMsg: 'Не удалось отправить сообщение',
      actions,
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

