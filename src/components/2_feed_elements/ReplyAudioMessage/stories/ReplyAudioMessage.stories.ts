import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ReplyAudioMessage from '../ReplyAudioMessage.vue';
import BaseReplyMessage from '../../BaseReplyMessage/BaseReplyMessage.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof ReplyAudioMessage> = {
  title: 'Feed Elements/ReplyAudioMessage',
  component: ReplyAudioMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'object',
      description: 'Объект сообщения для аудио-ответа',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ThemeMode, ReplyAudioMessage, BaseReplyMessage },
    setup() {
      // theme в args используется только сторибуком, не является пропом компонента
      // @ts-expect-error theme контролируется Storybook и пробрасывается через args
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 60vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-width: 360px; max-width: 640px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <div style="display: flex; justify-content: flex-start;">
            <div style="position: relative; width: 50%; max-width: 25rem; min-width: 25rem; border-radius: 14px; padding: 10px 10px 4px 16px; background-color: var(--chotto-audiomessage-left-background-color, #d4d4d4);">
              <!-- Use BaseReplyMessage to mirror app layout (background, grid) -->
              <BaseReplyMessage :message="{ type: 'message.audio', ...args.message }" class="left" />
              <div style="margin-top: 10px;">
                <p style="margin: 0; font-size: 14px; color: var(--chotto-theme-primary-text-color);">{{ args.mainText }}</p>
                <div style="margin-top: 8px; text-align: right; font-size: 12px; color: var(--chotto-theme-secondary-text-color, #6b7280);">{{ args.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof ReplyAudioMessage>;

const baseMessage = {
  messageId: '1',
  position: 'left',
  time: '12:34',
  url: 'https://file-examples.com/storage/fe9e7f1b6b3f2f2b2f1f39f/2017/11/file_example_MP3_700KB.mp3',
  status: 'read',
  // В приложении reply-текст длинный и без пробелов — имитируем это в stories
  text: 'Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон',
};

export const Default: Story = {
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    message: baseMessage,
    mainText: 'Привет!',
    date: '22.09.2024',
  },
};

export const RightPosition: Story = {
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    message: { ...baseMessage, position: 'right', status: 'sent' },
    mainText: 'Привет!',
    date: '22.09.2024',
  },
};

export const WithHeaderAndLink: Story = {
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    message: {
      ...baseMessage,
      header: 'Иван Петров',
      text: 'Привет, доехала хорошо, позвони мне завтра. Ссылка: https://example.com',
    },
    mainText: 'Привет!',
    date: '22.09.2024',
  },
};
