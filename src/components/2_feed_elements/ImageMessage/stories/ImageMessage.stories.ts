import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import ImageMessage from '../ImageMessage.vue';
import { IImageMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof ImageMessage> = {
  title: 'Feed Elements/ImageMessage',
  component: ImageMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};

export default meta;
type Story = StoryObj<typeof ImageMessage>;

const imageMessage: IImageMessage = {
  messageId: 'testId',
  status: 'read',
  url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
  time: '20:55',
  position: 'left',
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
    components: { BaseContainer, ThemeMode, ImageMessage },
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
      const leftMessage: IImageMessage = {
        messageId: 'left1',
        status: 'read',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:00',
        position: 'left',
      };

      const rightMessagePending: IImageMessage = {
        messageId: 'right1',
        status: 'pending',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:05',
        position: 'right',
      };

      const rightMessageSent: IImageMessage = {
        messageId: 'right2',
        status: 'sent',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:06',
        position: 'right',
      };

      const rightMessageReceived: IImageMessage = {
        messageId: 'right3',
        status: 'received',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:07',
        position: 'right',
      };

      const rightMessageRead: IImageMessage = {
        messageId: 'right4',
        status: 'read',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:08',
        position: 'right',
      };

      const rightMessageError: IImageMessage = {
        messageId: 'right5',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:09',
        position: 'right',
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
            <ImageMessage :message="leftMessage" />
            <ImageMessage :message="rightMessagePending" />
            <ImageMessage :message="rightMessageSent" />
            <ImageMessage :message="rightMessageReceived" />
            <ImageMessage :message="rightMessageRead" />
            <ImageMessage :message="rightMessageError" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const LeftImageMessage: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const LeftImageMessageWithText: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      text: 'Текст текст текст текст текст текст текст текст текст',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const LeftImageMessageWithTextAndLink: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      text: 'Текст текст текст текст текст текст текст текст текст yandex.ru',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};


export const LeftImageMessageWithViews: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      views: 121212,
    },
  },
  decorators: commonDecorator,
};
export const LeftImageMessageWithAvatar: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithAvatar: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const LeftImageMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const LeftImageMessageWithSubtext: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      subText: 'sub text sub text',
    },
  },
  decorators: commonDecorator,
};

export const LeftImageMessageWithActions: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'left',
      actions,
    },
  },
  decorators: commonDecorator,
};


export const RightImageMessage: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithText: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      text: 'Текст текст текст текст текст текст текст текст текст',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithTextAndLink: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      text: 'Текст текст текст текст текст текст текст текст текст yandex.ru',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithViews: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      views: 121212,
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithSubtext: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      subText: 'sub text sub text',
    },
  },
  decorators: commonDecorator,
};


export const RightImageMessageStatusSent: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      status: 'sent',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageStatusReceived: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      status: 'received',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageStatusRead: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      status: 'read',
    },
  },
  decorators: commonDecorator,
};

export const RightImageMessageStatusPending: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      status: 'pending',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const RightImageMessageStatusError: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      status: 'error',
      statusMsg: 'Не удалось отправить сообщение',
    } as IImageMessage,
  },
  decorators: commonDecorator,
};

export const RightImageMessageWithActions: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      actions,
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithReplyText: Story = {
  args: {
    message: {
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
      position: 'left',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: longText,
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        header: 'Мария',
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageWithReplyImage: Story = {
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      reply: {
        messageId: '324324',
        type: 'message.image',
        text: longText,
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        header: 'Мария',
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageWithReplyVideo: Story = {
  args: {
    message: {
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
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
      ...imageMessage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
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
      ...imageMessage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
        'laboris nisi ut aliquip ex ea commodo consequat. github.com',
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

