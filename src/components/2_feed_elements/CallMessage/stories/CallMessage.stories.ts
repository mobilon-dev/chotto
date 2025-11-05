import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';
 
import CallMessage from '../CallMessage.vue';
import { ICallMessage } from '@/types'; 
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof CallMessage> = {
  title: 'Feed Elements/CallMessage',
  component: CallMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof CallMessage>;

const message: ICallMessage = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
};

// Общий декоратор для всех stories кроме Default (добавляет паддинги и убирает горизонтальный скролл)
const commonDecorator = [() => ({ 
  template: '<div style="padding: 24px; overflow-x: hidden;"><story/></div>' 
})];

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, CallMessage },
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

      // Примеры сообщений: левое и правое
      const leftMessage: ICallMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'left',
        messageId: 'left1',
        time: '12:00',
        callDuration: '5:00',
      };

      const rightMessage: ICallMessage = {
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        messageId: 'right1',
        time: '12:05',
        callDuration: '3:20',
      };

      return { themesList, handleThemeChange, leftMessage, rightMessage };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div style="min-width: 360px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <CallMessage :message="leftMessage" />
            <CallMessage :message="rightMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const NoAnswerLeft: Story = {
  args: {
    message: {
      ...message,
    } as ICallMessage,
  },
  decorators: commonDecorator,
};

export const NoAnswerRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    } as ICallMessage,
  },
  decorators: commonDecorator,
};

export const NoAnswerLeftWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const NoAnswerRightWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
  decorators: commonDecorator,
};

export const NoAnswerLeftWithAvatarAndSubtext: Story = {
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

export const NoAnswerRightWithAvatarAndSubtext: Story = {
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

export const CallHappenedLeft: Story = {
  args: {
    message: {
      ...message,
      // status: 'read',
      callDuration: '5:00',
    },
  },
  decorators: commonDecorator,
};

export const CallHappenedRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      callDuration: '5:00',
    },
  },
  decorators: commonDecorator,
};

// Примеры с разными типами звонков для правых сообщений
export const RightCallMissed: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      isMissedCall: true,
    } as ICallMessage,
  },
  decorators: commonDecorator,
};

export const RightCallSuccess: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      callDuration: '5:00',
      isMissedCall: false,
    } as ICallMessage,
  },
  decorators: commonDecorator,
};

export const RightCallLong: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      callDuration: '1:23:45',
      isMissedCall: false,
    } as ICallMessage,
  },
  decorators: commonDecorator,
};


export const RecallLeft: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      // status: 'read',
      isMissedCall: true,
    },
  },
  decorators: commonDecorator,
};

export const RecallRight: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      // status: 'read',
      isMissedCall: true,
    },
  },
  decorators: commonDecorator,
};


const dialog = [
  {
    time: '00:00',
    text: 'привет, Вася',
    position: 'right',
  },
  {
    time: '00:05',
    text: 'привет, Петя',
    position: 'left',
  },
  {
    time: '00:10',
    text: 'как дела?',
    position: 'right',
  },
  {
    time: '00:15',
    text: 'все норм',
    position: 'left',
  },
];

export const LeftCallWithTranscript: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      callDuration: '5:00',
      transcript: {
        dialog,
      },
    },
  },
  decorators: commonDecorator,
};

export const RightCallWithTranscript: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      callDuration: '5:00',
      transcript: {
        dialog,
      }
    },
  },
  decorators: commonDecorator,
};
