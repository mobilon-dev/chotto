import type { Meta, StoryObj } from '@storybook/vue3-vite';

import AudioMessage from '../AudioMessage.vue';
import type { IAudioMessage } from '@/types';
import audioFile from '../../../../apps/data/audio/file_example_MP3_700KB.mp3';

const meta: Meta<typeof AudioMessage> = {
  title: 'Feed Elements/AudioMessage',
  component: AudioMessage,
  decorators: [
    () => ({
      template: `
        <div
          data-theme="mobilon1"
          style="
            padding: 24px;
            overflow-x: hidden;
            background: var(--chotto-theme-primary-color, #ffffff);
            font-family: 'Open Sans', OpenSans, Arial, sans-serif;
            font-size: 14px;
            --chotto-theme-font-family: 'Open Sans', OpenSans, Arial, sans-serif;
            --chotto-theme-text-font-size: 14px;
            --chotto-theme-additional-text-font-size: 14px;
          "
        >
          <div style="min-width: 360px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
            <story />
          </div>
        </div>
      `
    })
  ]
};

export default meta;
type Story = StoryObj<typeof AudioMessage>;

const baseMessage: IAudioMessage = {
  url: audioFile,
  position: 'left',
  messageId: 'audio-story-base',
  time: '12:00',
  status: 'read',
  duration: '00:29',
  header: 'Георгий',
  subText: 'Иван Иванов',
  avatar: 'https://placehold.jp/30/5c6299/ffffff/64x64.png?text=ИИ',
};

const transcriptShortHtml = '<p><strong>Клиент:</strong> Подскажите, когда привезут заказ?</p>';
const summaryShortHtml = '<p><strong>Итог:</strong> подтверждена доставка на завтра до 15:00.</p>';
const leftTranscriptHtml = '<p><strong>Клиент:</strong> Подскажите, когда привезут заказ?</p>';
const leftSummaryHtml = '<p><strong>Резюме:</strong> Клиент интересуется когда привезут заказ</p>';
const rightTranscriptHtml = '<p><strong>Оператор:</strong> Завтра до 15:00.</p>';
const rightSummaryHtml = '<p><strong>Итог:</strong> подтверждена доставка на завтра до 15:00.</p>';
const transcriptLongHtml = `
  <p><strong>Клиент:</strong> Добрый день. Хотел уточнить, успевает ли доставка к вечеру и можно ли перенести адрес.</p>
  <p><strong>Клиент:</strong> Если сегодня не получается, давайте тогда на завтра с 10:00 до 15:00.</p>
  <p><strong>Клиент:</strong> И пожалуйста, поменяйте адрес на офис на Ленина, 14.</p>
  <p><strong>Клиент:</strong> Подтвердите, что курьер позвонит заранее перед приездом.</p>
`;
const summaryLongHtml = `
  <p><strong>Коротко:</strong> клиент перенес доставку на завтра с 10:00 до 15:00 и изменил адрес на офис.</p>
  <p><strong>Действия:</strong> оператор подтвердил обновление адреса и предупредил о звонке курьера за час.</p>
`;

export const WithTextAndSummary: Story = {
  render: () => ({
    components: { AudioMessage },
    setup() {
      const leftMessage: IAudioMessage = {
        ...baseMessage,
        messageId: 'audio-with-text-summary-left',
        transcript: {
          status: 'RECOGNITION_READY',
          html: leftTranscriptHtml,
        },
        summary: {
          status: 'SUMMARY_READY',
          html: leftSummaryHtml,
        },
      }

      const rightMessage: IAudioMessage = {
        ...leftMessage,
        position: 'right',
        messageId: 'audio-with-text-summary-right',
        subText: 'Ольга Петрова',
        avatar: 'https://placehold.jp/30/c07dd1/ffffff/64x64.png?text=ОП',
        transcript: {
          status: 'RECOGNITION_READY',
          html: rightTranscriptHtml,
        },
        summary: {
          status: 'SUMMARY_READY',
          html: rightSummaryHtml,
        },
      }

      return { leftMessage, rightMessage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <AudioMessage :message="leftMessage" />
        <AudioMessage :message="rightMessage" />
      </div>
    `,
  }),
  args: {
    message: undefined,
  },
};

export const WithoutTextAndSummary: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-no-text-no-summary',
    } as IAudioMessage,
  },
};

export const WithoutText: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-no-text',
      summary: {
        status: 'SUMMARY_READY',
        html: summaryShortHtml,
      },
    } as IAudioMessage,
  },
};

export const WithoutSummary: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-no-summary',
      transcript: {
        status: 'RECOGNITION_READY',
        html: transcriptShortHtml,
      },
    } as IAudioMessage,
  },
};

export const PlannedStatus: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-status-planned',
      transcript: {
        status: 'RECOGNITION_PLANNED',
      },
      summary: {
        status: 'SUMMARY_PLANNED',
      },
    } as IAudioMessage,
  },
};

export const ErrorStatus: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-status-error',
      transcript: {
        status: 'RECOGNITION_ERROR',
      },
      summary: {
        status: 'SUMMARY_ERROR',
      },
    } as IAudioMessage,
  },
};

export const NotConfiguredStatus: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-status-not-configured',
      transcript: {
        status: 'RECOGNITION_NOT_CONFIGURED',
      },
      summary: {
        status: 'SUMMARY_NOT_CONFIGURED',
      },
    } as IAudioMessage,
  },
};

export const WithLongTextAndSummary: Story = {
  args: {
    message: {
      ...baseMessage,
      messageId: 'audio-with-long-text-summary',
      transcript: {
        status: 'RECOGNITION_READY',
        html: transcriptLongHtml,
      },
      summary: {
        status: 'SUMMARY_READY',
        html: summaryLongHtml,
      },
    } as IAudioMessage,
  },
};
