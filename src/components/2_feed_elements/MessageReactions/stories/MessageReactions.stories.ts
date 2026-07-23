import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';

import TextMessage from '../../TextMessage/TextMessage.vue';
import ImageMessage from '../../ImageMessage/ImageMessage.vue';
import AudioMessage from '../../AudioMessage/AudioMessage.vue';
import VideoMessage from '../../VideoMessage/VideoMessage.vue';
import FileMessage from '../../FileMessage/FileMessage.vue';
import StickerMessage from '../../StickerMessage/StickerMessage.vue';
import { 
  ITextMessage, 
  IImageMessage, 
  IAudioMessage, 
  IVideoMessage, 
  IFileMessage, 
  IStickerMessage
} from '@/types';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import chatBackgroundRaw from '../../../3_compounds/Feed/assets/chat-background.svg?raw';
import stickerWebp from '../../../../apps/data/images/sticker.webp';

const ME = 'usr_me'
const REACTION_USER_NAMES: Record<string, string> = {
  usr_me: 'Елена',
  usr_other_0: 'Василий Васильев',
  usr_other_1: 'Иван Иванов',
  usr_other_2: 'Пётр Петров',
  usr_other_3: 'Анна Смирнова',
  usr_other_4: 'Мария Козлова',
}

function rx(key: string, count: number, reactedByMe = false) {
  const items = []
  let i = 0
  if (reactedByMe) {
    items.push({
      key,
      userId: ME,
      name: REACTION_USER_NAMES[ME],
      date: 1757151901,
    })
    i = 1
  }
  for (; i < count; i++) {
    const userId = `usr_other_${i}`
    items.push({
      key,
      userId,
      name: REACTION_USER_NAMES[userId] ?? `Пользователь ${i}`,
      date: 1757151901 + i,
    })
  }
  return items
}

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof TextMessage> = {
  title: 'Feed Elements/MessageReactions',
  component: TextMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};

export default meta;
type Story = StoryObj<typeof TextMessage>;

const defaultBackground = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

// Общий декоратор для всех stories кроме Default (добавляет паддинги, фоновый контейнер и убирает горизонтальный скролл)
const commonDecorator = [() => ({
  template: `<div style="padding: 24px; overflow-x: hidden; background: var(--chotto-theme-primary-color, #ffffff);"><div class="message-feed" style="padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #fafafa); background-image: url(${defaultBackground}); border-radius: 8px;"><story/></div></div>`
})];

export const Default: Story = {
  render: () => ({
    components: { 
      BaseContainer, 
      ThemeMode, 
      TextMessage, 
      ImageMessage, 
      AudioMessage, 
      VideoMessage, 
      FileMessage, 
      StickerMessage
    },
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

      // Примеры текстовых сообщений с реакциями
      const leftTextMessageWithReactions: ITextMessage = {
        text: 'Привет! Как дела?',
        position: 'left',
        messageId: 'text-left-1',
        time: '12:30',
        status: 'read',
        reactions: {
          items: [
            ...rx('👍', 5),
            ...rx('❤️', 3, true),
            ...rx('😄', 2),
          ],
        },
      };

      const rightTextMessageWithReactions: ITextMessage = {
        text: 'Отлично, спасибо!',
        position: 'right',
        messageId: 'text-right-1',
        time: '12:31',
        status: 'read',
        reactions: {
          items: [
            ...rx('👍', 12, true),
            ...rx('❤️', 8),
            ...rx('🎉', 1, true),
          ],
        },
      };

      // Примеры изображений с реакциями
      const leftImageMessageWithReactions: IImageMessage = {
        messageId: 'image-left-1',
        status: 'read',
        url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
        time: '12:35',
        position: 'left',
        reactions: {
          items: [
            ...rx('❤️', 8, true),
            ...rx('🔥', 5),
          ],
        },
      };

      // Примеры аудио сообщений с реакциями
      const leftAudioMessageWithReactions: IAudioMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'left',
        messageId: 'audio-left-1',
        time: '12:40',
        status: 'read',
        reactions: {
          items: [
            ...rx('👍', 3, true),
            ...rx('🎵', 2),
          ],
        },
      };

      // Примеры файлов с реакциями
      const leftFileMessageWithReactions: IFileMessage = {
        messageId: 'file-left-1',
        filename: 'документ.pdf',
        position: 'left',
        time: '12:45',
        status: 'read',
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/10/file_example_PDF_500_kB.pdf',
        reactions: {
          items: [
            ...rx('👍', 4),
            ...rx('📎', 1, true),
          ],
        },
      };

      // Примеры стикеров с реакциями
      const leftStickerMessageWithReactions: IStickerMessage = {
        messageId: 'sticker-left-1',
        status: 'read',
        url: stickerWebp,
        time: '12:50',
        position: 'left',
        reactions: {
          items: [
            ...rx('😄', 6, true),
            ...rx('❤️', 4),
          ],
        },
      };

      const leftMessageNoReactions: ITextMessage = {
        text: 'Сообщение без реакций. Наведи на сообщение чтобы добавить реакцию.',
        position: 'left',
        messageId: 'left-3',
        time: '12:33',
        status: 'read',
      };

      const defaultBackgroundValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #fafafa)',
        backgroundImage: `url(${defaultBackgroundValue})`,
        borderRadius: '8px'
      };

      return { 
        themesList, 
        handleThemeChange, 
        leftTextMessageWithReactions, 
        rightTextMessageWithReactions, 
        leftImageMessageWithReactions,
        leftAudioMessageWithReactions,
        leftFileMessageWithReactions,
        leftStickerMessageWithReactions,
        leftMessageNoReactions, 
        containerStyle 
      };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div class="message-feed" :style="containerStyle">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <TextMessage :message="leftTextMessageWithReactions" :current-user-id="'usr_me'" />
            <TextMessage :message="rightTextMessageWithReactions" :current-user-id="'usr_me'" />
            <ImageMessage :message="leftImageMessageWithReactions" :current-user-id="'usr_me'" />
            <AudioMessage :message="leftAudioMessageWithReactions" :current-user-id="'usr_me'" />
            <FileMessage :message="leftFileMessageWithReactions" :current-user-id="'usr_me'" />
            <StickerMessage :message="leftStickerMessageWithReactions" :current-user-id="'usr_me'" />
            <TextMessage :message="leftMessageNoReactions" :current-user-id="'usr_me'" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

const message: ITextMessage = {
  text: 'Привет!',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  status: 'read',
};

export const LeftMessageReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          ...rx('👍', 5),
          ...rx('❤️', 3, true),
          ...rx('😄', 2),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageSingleReaction: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          ...rx('👍', 1, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageMultipleReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          ...rx('👍', 15),
          ...rx('❤️', 8, true),
          ...rx('😄', 5),
          ...rx('🎉', 3, true),
          ...rx('🔥', 2),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LeftMessageNoReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
    },
  },
  decorators: commonDecorator,
};

export const RightMessageReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          ...rx('👍', 5),
          ...rx('❤️', 3, true),
          ...rx('😄', 2),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageSingleReaction: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          ...rx('❤️', 1, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageMultipleReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'right',
      reactions: {
        items: [
          ...rx('👍', 20, true),
          ...rx('❤️', 12),
          ...rx('😄', 7, true),
          ...rx('🎉', 4),
          ...rx('🔥', 3, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const RightMessageNoReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'right',
    },
  },
  decorators: commonDecorator,
};

export const AllReactionsActive: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          ...rx('👍', 5, true),
          ...rx('❤️', 3, true),
          ...rx('😄', 2, true),
          ...rx('🎉', 1, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const LargeCountReactions: Story = {
  args: {
    currentUserId: 'usr_me',
    message: {
      ...message,
      position: 'left',
      reactions: {
        items: [
          ...rx('👍', 1234),
          ...rx('❤️', 567, true),
          ...rx('😄', 89),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

// Примеры с разными типами сообщений

// ImageMessage stories
const imageMessage: IImageMessage = {
  messageId: 'image-test',
  status: 'read',
  url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
  time: '12:00',
  position: 'left',
};

export const ImageMessageWithReactions: StoryObj<typeof ImageMessage> = {
  render: (args) => ({
    components: { ImageMessage },
    setup() {
      return { args };
    },
    template: '<ImageMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...imageMessage,
      reactions: {
        items: [
          ...rx('❤️', 8, true),
          ...rx('🔥', 5),
          ...rx('👍', 3, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const ImageMessageRightWithReactions: StoryObj<typeof ImageMessage> = {
  render: (args) => ({
    components: { ImageMessage },
    setup() {
      return { args };
    },
    template: '<ImageMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...imageMessage,
      position: 'right',
      reactions: {
        items: [
          ...rx('❤️', 12),
          ...rx('🔥', 7, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

// AudioMessage stories
const audioMessage: IAudioMessage = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'audio-test',
  time: '12:00',
  status: 'read',
};

export const AudioMessageWithReactions: StoryObj<typeof AudioMessage> = {
  render: (args) => ({
    components: { AudioMessage },
    setup() {
      return { args };
    },
    template: '<AudioMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...audioMessage,
      reactions: {
        items: [
          ...rx('👍', 3, true),
          ...rx('🎵', 2),
          ...rx('❤️', 1, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const AudioMessageRightWithReactions: StoryObj<typeof AudioMessage> = {
  render: (args) => ({
    components: { AudioMessage },
    setup() {
      return { args };
    },
    template: '<AudioMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...audioMessage,
      position: 'right',
      reactions: {
        items: [
          ...rx('👍', 5, true),
          ...rx('🎵', 3),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

// VideoMessage stories
const videoMessage: IVideoMessage = {
  messageId: 'video-test',
  position: 'left',
  status: 'read',
  time: '12:00',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

export const VideoMessageWithReactions: StoryObj<typeof VideoMessage> = {
  render: (args) => ({
    components: { VideoMessage },
    setup() {
      return { args };
    },
    template: '<VideoMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...videoMessage,
      reactions: {
        items: [
          ...rx('👍', 6, true),
          ...rx('❤️', 4),
          ...rx('🔥', 2, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const VideoMessageRightWithReactions: StoryObj<typeof VideoMessage> = {
  render: (args) => ({
    components: { VideoMessage },
    setup() {
      return { args };
    },
    template: '<VideoMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...videoMessage,
      position: 'right',
      reactions: {
        items: [
          ...rx('👍', 10),
          ...rx('❤️', 7, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

// FileMessage stories
const fileMessage: IFileMessage = {
  messageId: 'file-test',
  filename: 'документ.pdf',
  position: 'left',
  time: '12:00',
  status: 'read',
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/10/file_example_PDF_500_kB.pdf',
};

export const FileMessageWithReactions: StoryObj<typeof FileMessage> = {
  render: (args) => ({
    components: { FileMessage },
    setup() {
      return { args };
    },
    template: '<FileMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...fileMessage,
      reactions: {
        items: [
          ...rx('👍', 4),
          ...rx('📎', 1, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const FileMessageRightWithReactions: StoryObj<typeof FileMessage> = {
  render: (args) => ({
    components: { FileMessage },
    setup() {
      return { args };
    },
    template: '<FileMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...fileMessage,
      position: 'right',
      reactions: {
        items: [
          ...rx('👍', 6, true),
          ...rx('📎', 2),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

// StickerMessage stories
const stickerMessage: IStickerMessage = {
  messageId: 'sticker-test',
  status: 'read',
  url: stickerWebp,
  time: '12:00',
  position: 'left',
};

export const StickerMessageWithReactions: StoryObj<typeof StickerMessage> = {
  render: (args) => ({
    components: { StickerMessage },
    setup() {
      return { args };
    },
    template: '<StickerMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...stickerMessage,
      reactions: {
        items: [
          ...rx('😄', 6, true),
          ...rx('❤️', 4),
          ...rx('🎉', 2, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};

export const StickerMessageRightWithReactions: StoryObj<typeof StickerMessage> = {
  render: (args) => ({
    components: { StickerMessage },
    setup() {
      return { args };
    },
    template: '<StickerMessage :message="args.message" :current-user-id="\'usr_me\'" />',
  }),
  args: {
    message: {
      ...stickerMessage,
      position: 'right',
      reactions: {
        items: [
          ...rx('😄', 8),
          ...rx('❤️', 5, true),
        ],
      },
    },
  },
  decorators: commonDecorator,
};
