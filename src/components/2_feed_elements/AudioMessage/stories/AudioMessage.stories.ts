import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import AudioMessage from '../AudioMessage.vue';
import { IAudioMessage } from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof AudioMessage> = {
  title: 'Feed Elements/AudioMessage',
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

// Общий декоратор для всех stories кроме Default (добавляет паддинги и убирает горизонтальный скролл)
const commonDecorator = [() => ({ 
  template: '<div style="padding: 24px; overflow-x: hidden;"><story/></div>' 
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, AudioMessage },
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

      // Примеры сообщений с разными статусами
      const leftMessage: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'left',
        messageId: 'left1',
        time: '12:00',
        status: 'read',
      };

      const rightMessagePending: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right1',
        time: '12:05',
        status: 'pending',
      };

      const rightMessageSent: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right2',
        time: '12:06',
        status: 'sent',
      };

      const rightMessageReceived: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right3',
        time: '12:07',
        status: 'received',
      };

      const rightMessageRead: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right4',
        time: '12:08',
        status: 'read',
      };

      const rightMessageError: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right5',
        time: '12:09',
        status: 'error',
        statusMsg: 'Не удалось отправить сообщение',
      };

      return { themesList, handleThemeChange, leftMessage, rightMessagePending, rightMessageSent, rightMessageReceived, rightMessageRead, rightMessageError };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div style="min-width: 360px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <AudioMessage :message="leftMessage" />
            <AudioMessage :message="rightMessagePending" />
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
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};

export const LeftMessageWithActions: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      actions,
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};


export const RightMessage: Story = {
  args: {
    message: {
      ...message,
      position: 'right'
    } as IAudioMessage,
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

export const LeftMessageWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};

export const RightMessageSent: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'sent',
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};

export const RightMessageReceived: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'received',
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};

export const RightMessageRead: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'read',
    },
  },
  decorators: commonDecorator,
};

export const RightMessagePending: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'pending',
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};

export const RightMessageError: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'error',
    } as IAudioMessage,
  },
  decorators: commonDecorator,
};

export const RightMessageErrorWithStatusMsg: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      status: 'error',
      statusMsg: 'Не удалось отправить сообщение',
    } as IAudioMessage,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
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
  decorators: commonDecorator,
};
