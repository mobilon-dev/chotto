import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { onMounted, onUnmounted } from 'vue';

import MessageStatusIndicator from '../MessageStatusIndicator.vue';
import TextMessage from '../../TextMessage/TextMessage.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import ImageMessage from '../../ImageMessage/ImageMessage.vue';
import AudioMessage from '../../AudioMessage/AudioMessage.vue';
import VideoMessage from '../../VideoMessage/VideoMessage.vue';
import FileMessage from '../../FileMessage/FileMessage.vue';
import StickerMessage from '../../StickerMessage/StickerMessage.vue';
import stickerWebp from '@/apps/data/images/sticker.webp';
import { statuses } from '@/functions';
import type {
  ITextMessage,
  IImageMessage,
  IAudioMessage,
  IVideoMessage,
  IFileMessage,
  IStickerMessage,
} from '@/types';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof MessageStatusIndicator> = {
  title: 'Feed Elements/MessageStatusIndicator',
  component: MessageStatusIndicator,
  decorators: [() => ({ template: '<div data-theme="light"><story /></div>' })],
  argTypes: {
    messageStatus: {
      control: { type: 'select' },
      options: statuses,
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left',
        'right',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageStatusIndicator>;

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
      StickerMessage,
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

      const textMessageRead: ITextMessage = {
        messageId: 'msg-text-read',
        text: 'Thanks! Talk to you soon.',
        position: 'right',
        status: 'read',
        time: '12:31',
      };

      const textMessageSent: ITextMessage = {
        messageId: 'msg-text-sent',
        text: 'Talk later!',
        position: 'right',
        status: 'sent',
        time: '12:30',
      };

      const audioMessagePending: IAudioMessage = {
        messageId: 'msg-audio-pending',
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
        position: 'right',
        status: 'pending',
        time: '12:32',
        text: 'Uploading voice message…',
      };

      const videoMessageSent: IVideoMessage = {
        messageId: 'msg-video-sent',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        position: 'right',
        status: 'sent',
        time: '12:33',
        text: 'Video sent successfully (hover to see status)!',
      };

      const imageMessageReceived: IImageMessage = {
        messageId: 'msg-image-received',
        url: 'https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0',
        position: 'right',
        status: 'received',
        time: '12:34',
        text: 'Photo delivered ✅ (hover to see status)',
      };

      const fileMessageRead: IFileMessage = {
        messageId: 'msg-file-read',
        url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/10/file_example_PDF_500_kB.pdf',
        filename: 'Report.pdf',
        position: 'right',
        status: 'read',
        time: '12:35',
        text: 'Quarterly report ready.',
      };

      const stickerMessageError: IStickerMessage = {
        messageId: 'msg-sticker-error',
        url: stickerWebp,
        position: 'right',
        status: 'error',
        statusMsg: 'Failed to upload',
        time: '12:36',
        text: 'Sticker failed to send.',
      };

      const containerStyle = {
        minWidth: '360px',
        padding: '40px 20px',
        backgroundColor: 'var(--chotto-theme-secondary-color, #f5f5f5)',
        borderRadius: '8px',
      };

      return {
        themesList,
        handleThemeChange,
        textMessageSent,
        textMessageRead,
        audioMessagePending,
        videoMessageSent,
        imageMessageReceived,
        fileMessageRead,
        stickerMessageError,
        containerStyle,
      };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div :style="containerStyle">
          <div class="message-feed" style="display: flex; flex-direction: column; gap: 16px;">
            <TextMessage :message="textMessageSent" />
            <AudioMessage :message="audioMessagePending" />
            <VideoMessage :message="videoMessageSent" />
            <ImageMessage :message="imageMessageReceived" />
            <FileMessage :message="fileMessageRead" />
            <StickerMessage :message="stickerMessageError" />
            <TextMessage :message="textMessageRead" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export const Read: Story = {
  name: 'Read (double check)',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'read-example',
        text: 'Message delivered and read ✅',
        position: 'right',
        status: 'read',
        time: '12:40',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

export const Received: Story = {
  name: 'Received (double check outline)',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'received-example',
        text: 'Delivered to the recipient.',
        position: 'right',
        status: 'received',
        time: '12:41',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

export const Sent: Story = {
  name: 'Sent (single check)',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'sent-example',
        text: 'Message sent. Waiting for delivery…',
        position: 'right',
        status: 'sent',
        time: '12:42',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

export const Pending: Story = {
  name: 'Pending (clock)',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'pending-example',
        text: 'Sending…',
        position: 'right',
        status: 'pending',
        time: '12:43',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

export const Error: Story = {
  name: 'Error (failed)',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'error-example',
        text: 'Message failed. Tap to retry.',
        position: 'right',
        status: 'error',
        statusMsg: 'Не удалось отправить',
        time: '12:44',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

export const HiddenForLeftMessage: Story = {
  name: 'Hidden for left message',
  render: () => ({
    components: { TextMessage },
    setup() {
      const message: ITextMessage = {
        messageId: 'left-example',
        text: 'Left side message without status indicator.',
        position: 'left',
        status: 'read',
        time: '12:45',
      };

      return { message };
    },
    template: `
      <div style="padding: 24px; background: var(--chotto-theme-secondary-color, #f5f5f5);">
        <TextMessage :message="message" />
      </div>
    `,
  }),
};

