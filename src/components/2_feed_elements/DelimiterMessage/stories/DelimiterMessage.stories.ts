import type { Meta, StoryObj } from '@storybook/vue3-vite';

import DelimiterMessage from '../DelimiterMessage.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'glass', name: 'Glass' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof DelimiterMessage> = {
  title: 'Feed Elements/DelimiterMessage',
  component: DelimiterMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'object',
      description: 'Объект сообщения-разделителя',
    },
    tooltipText: {
      control: 'text',
      description: 'Текст подсказки при наведении (если задан — разделитель оборачивается в Tooltip)',
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'bottom-left'],
      description: 'Позиция тултипа',
    },
  },
  render: (args) => ({
    components: { BaseContainer, ThemeMode, DelimiterMessage },
    setup() {
      // theme в args используется только сторибуком, не является пропом компонента
      // @ts-expect-error theme контролируется Storybook и пробрасывается через args
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 28vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-width: 360px; max-width: 640px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <DelimiterMessage
            :message="args.message"
            :tooltip-text="args.tooltipText"
            :tooltip-position="args.tooltipPosition"
            :tooltip-offset="args.tooltipOffset"
            :tooltip-delay="args.tooltipDelay"
          />
        </div>
      </BaseContainer>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof DelimiterMessage>;

export const Standard: Story = {
  args: {
    message: {
      messageId: 'delimiter-1',
      text: 'диалог WhatsApp - 10:08',
    },
  },
};

export const WithTooltip: Story = {
  args: {
    message: {
      messageId: 'delimiter-2',
      text: 'диалог WhatsApp - 10:08',
    },
    tooltipText: 'Нажмите, чтобы скопировать время',
    tooltipPosition: 'top',
  },
};

