import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import FileMessage from '../FileMessage.vue';
import { IFileMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof FileMessage> = {
  title: 'Feed Elements/FileMessage',
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

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({ 
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>` 
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, FileMessage },
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
      const leftMessage: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:00',
        status: 'read',
        position: 'left',
        messageId: 'left1',
      };

      const rightMessagePending: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:05',
        status: 'pending',
        position: 'right',
        messageId: 'right1',
      };

      const rightMessageSent: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:06',
        status: 'sent',
        position: 'right',
        messageId: 'right2',
      };

      const rightMessageReceived: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:07',
        status: 'received',
        position: 'right',
        messageId: 'right3',
      };

      const rightMessageRead: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:08',
        status: 'read',
        position: 'right',
        messageId: 'right4',
      };

      const rightMessageError: IFileMessage = {
        filename: "document.pdf",
        url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
        time: '12:09',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
        position: 'right',
        messageId: 'right5',
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
            <FileMessage :message="leftMessage" />
            <FileMessage :message="rightMessagePending" />
            <FileMessage :message="rightMessageSent" />
            <FileMessage :message="rightMessageReceived" />
            <FileMessage :message="rightMessageRead" />
            <FileMessage :message="rightMessageError" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const LeftFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
    } as IFileMessage,
  },
  decorators: commonDecorator,
};

export const LeftFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      subText: 'sub text sub text'
    },
  },
  decorators: commonDecorator,
};

export const LeftFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      actions,
    }
  },
  decorators: commonDecorator,
};

export const LeftFileMessageWithAvatar: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightFileMessageWithAvatar: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

export const RightFileMessage: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
    }
  },
  decorators: commonDecorator,
};

export const RightFileMessageStatusSent: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'sent',
    }
  },
  decorators: commonDecorator,
};

export const RightFileMessageStatusReceived: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'received',
    }
  },
  decorators: commonDecorator,
};

export const RightFileMessageStatusRead: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'read',
    }
  },
  decorators: commonDecorator,
};

export const RightFileMessageStatusPending: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'pending',
    } as IFileMessage,
  },
  decorators: commonDecorator,
};

export const RightFileMessageStatusError: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      status: 'error',
      statusMsg: 'Не удалось отправить сообщение',
    } as IFileMessage,
  },
  decorators: commonDecorator,
};

export const RightFileMessageWithSubtext: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      subText: 'sub text sub text'
    },
  },
  decorators: commonDecorator,
};

export const RightFileMessageWithActions: Story = {
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      actions,
    }
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};
