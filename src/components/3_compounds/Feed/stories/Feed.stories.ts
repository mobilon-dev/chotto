import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted } from 'vue';
 
import Feed from '../Feed.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof Feed> = {
  title: 'Compounds/Feed',
  component: Feed,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof Feed>;

// Генерируем timestamp'ы для разных временных точек
const now = Math.floor(Date.now() / 1000); // Текущее время в секундах
const twoHoursAgo = now - (2 * 60 * 60);
const oneHourAgo = now - (1 * 60 * 60);
const thirtyMinutesAgo = now - (30 * 60);
const fifteenMinutesAgo = now - (15 * 60);
const tenMinutesAgo = now - (10 * 60);
const fiveMinutesAgo = now - (5 * 60);
const threeMinutesAgo = now - (3 * 60);
const twoMinutesAgo = now - (2 * 60);
const oneMinuteAgo = now - 60;

const objects = [
  { type: "system.date",   messageId: '1', text: 'Сегодня' },
  { type: "message.text",  messageId: '2', text: "Привет!", position: 'left', status: 'read', time: '12:30', timestamp: twoHoursAgo},
  { type: "message.text",  messageId: '3', text: "Привет!", position: 'right',  status: 'read', time: '13 часов назад', timestamp: oneHourAgo},
  { type: "message.text",  messageId: '4', text: "Отправляется...", position: 'right', status: 'pending', time: '12:35', timestamp: fiveMinutesAgo},
  { type: "message.text",  messageId: '5', text: "Отправлено", position: 'right', status: 'sent', time: '12:36', timestamp: threeMinutesAgo},
  { type: "message.text",  messageId: '6', text: "Доставлено", position: 'right', status: 'received', time: '12:37', timestamp: twoMinutesAgo},
  { type: "message.text",  messageId: '7', text: "Ошибка отправки", position: 'right', status: 'error', time: '12:38', statusMsg: 'Не удалось отправить сообщение', timestamp: oneMinuteAgo},
  { type: "message.image", messageId: '8', url: "https://sun9-59.userapi.com/s/v1/if2/halgZJOi4Om6wnFsofNfRxloQs-WAqQVNlV3Z7kfQm2KWKjp0dsXQnk6ZjpkmQ_lqKJZonw5u7pHi6uhK0xbTvuX.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1500x750&from=bu&cs=640x0",
    time: '15 часов назад', alt: "Example Image", position: 'left', status: 'read', timestamp: thirtyMinutesAgo},
  { type: "message.file",  messageId: '9', url: "https://example.com/file.pdf",
    time: '15 часов назад', position: 'right', status: 'read', filename: "Документ.pdf", timestamp: fifteenMinutesAgo},
  { type: "message.text",  messageId: '10', text: "Привет!",position: 'right', time: '16:30', timestamp: tenMinutesAgo},
  { type: "message.image", messageId: '11', url: "https://sun9-51.userapi.com/s/v1/if1/QzSMgis9Z4h7XVu0R8oNhcWIlPf_6-5h0CwKnXSRMUziaTwixP57Zhvlamh1vutNWFnNZ5lg.jpg?quality=96&as=32x19,48x29,72x43,108x65,160x96,240x144,360x216,480x288,540x324,640x384,720x432,1080x648,1280x768,1440x864,2560x1536&from=bu&cs=640x0",position: 'right', time: '17:00', alt: "Example Image", timestamp: now, status: 'read'},
];


const longobjects = [
  { type: "system.date",   messageId: '1', text: 'text', },
  { type: "message.text",  messageId: '2', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
 position: 'left', status: 'read', time: '12:30'},
  { type: "message.text",  messageId: '3', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
 position: 'right',  status: 'read', time: '13 часов назад'},
  { type: "message.image", messageId: '4', url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
    time: '15 часов назад', alt: "Example Image", position: 'left', status: 'read',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',

  },
  { type: "message.file",  messageId: '5', url: "https://example.com/file.pdf",
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
    time: '15 часов назад', position: 'right', status: 'read', filename: "Документ.pdf"},
  { type: "message.text",  messageId: '6', text: "Привет!",position: 'right', time: '16:30'},
  {
    messageId: '7', type: "message.video", url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
    position: 'right', status: 'read', time: '17:27',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ' +
    'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', ' +
    'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, ' +
    'and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, ' +
    'sometimes by accident, sometimes on purpose (injected humour and the like).',
  },
  {
    messageId: '8', type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    position: 'left', status: 'read', time: '17:27',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    transcript:{
      text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    }
  },
];
const buttonParams = {
  color: '#10b981',
  unreadAmount: 12
}

export const Primary: Story = {
  args: {
    objects,
    typing: false,
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
  },
  render: (args) => ({
    components: { BaseContainer, ThemeMode, Feed },
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
      
      return { args, themesList, handleThemeChange };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 60vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" @selected-theme="handleThemeChange" />
        </div>
        <div style="height: 500px; overflow-y: auto; overflow-x: hidden; border: 1px solid var(--chotto-theme-border, #e5e5e5); border-radius: 8px; background: var(--chotto-theme-primary-color, #ffffff);">
          <Feed :objects="args.objects" :typing="args.typing" />
        </div>
      </BaseContainer>
    `,
  }),
};

export const WithDates: Story = {
  args: {
    objects,
    typing: false,
  },
};

export const WithButtonUnread: Story = {
  args: {
    objects,
    buttonParams: buttonParams,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-height: 300px;"><story/></div>' 
  })],
};

export const PrimaryTyping: Story = {
  args: {
    objects,
    typing: true,
  },
};

export const PrimaryTypingWithAvatarAndTitle: Story = {
  args: {
    objects,
    typing: {
      title: 'test sergey 1',
      avatar: "https://placehold.jp/30/336633/ffffff/64x64.png?text=MV",
    }
  },
};

export const FeedMaxWidth500pxWithLongMessages: Story = {
  args: {
    objects: longobjects,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-width: 500px;"><story/></div>' 
  })],
}

export const FeedMaxWidth700pxWithLongMessages: Story = {
  args: {
    objects: longobjects,
    typing: false,
  },
  decorators: [() => ({ 
    template: '<div style="max-width: 700px;"><story/></div>' 
  })],
}