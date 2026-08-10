import type { Meta, StoryObj } from '@storybook/vue3-vite';
import EditTextMessage from '../EditTextMessage.vue';
import BaseEditMessage from '../../BaseEditMessage/BaseEditMessage.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof EditTextMessage> = {
  title: 'Feed Elements/EditTextMessage',
  component: EditTextMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'object',
      description: 'Объект редактируемого текстового сообщения',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ThemeMode, EditTextMessage, BaseEditMessage },
    setup() {
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
          <BaseEditMessage :message="{ type: 'message.text', ...args.message }" class="chat-input-reply" />
        </div>
      </BaseContainer>
    `,
  }),
};

export default meta;

type Story = StoryObj<typeof EditTextMessage>;

const baseMessage = {
  messageId: '1',
  text: 'Привет, что-то давно не пишешь?',
  type: 'message.text',
};

export const Default: Story = {
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    message: baseMessage,
  },
};

export const LongText: Story = {
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    message: {
      ...baseMessage,
      text: 'Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон',
    },
  },
};
