import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { provide, ref } from 'vue';
 
import CallMessage from '../CallMessage.vue';
import { ICallMessage } from '@/types'; 
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import audioFile from '../../../../apps/data/audio/file_example_MP3_700KB.mp3';

const meta: Meta<typeof CallMessage> = {
  title: 'Feed Elements/CallMessage',
  component: CallMessage,
  decorators: [() => ({template: '<div data-theme="mobilon1"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof CallMessage>;

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, CallMessage },
    setup() {
      // Тестовые данные для тултипа
      const channels = ref([
        { channelId: 'channel_1', title: 'WhatsApp Business 73910001100' },
        { channelId: 'channel_2', title: 'Telegram 79135292926' },
        { channelId: 'channel_3', title: 'Max 79135292926' },
      ]);

      const selectedChat = ref({
        dialogs: [
          { dialogId: 'dlg_left1', channelId: 'channel_1' },
          { dialogId: 'dlg_right1', channelId: 'channel_2' },
          { dialogId: 'dlg_43543111', channelId: 'channel_1' },
          { dialogId: 'dlg_804', channelId: 'channel_3' },
        ],
      });

      // Предоставляем данные для компонента через provide
      provide('channels', channels);
      provide('selectedChat', selectedChat);
      provide('chatAppId', 'storybook-app');

      // Примеры сообщений: левое и правое
      const leftMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'left',
        direction: 'incoming',
        messageId: 'left1',
        time: '12:00',
        subText: 'Василий',
        callDuration: '5:00',
        callParticipant: 'Малафеева Любовь',
        dialogId: 'dlg_left1', // для тултипа
        transcript: {
          status: 'RECOGNITION_READY',
          html: '<p><strong>Клиент:</strong> Подскажите, когда будет доставка?</p><p><strong>Оператор:</strong> Доставка будет завтра до 15:00.</p>'
        },
        summary: {
          status: 'SUMMARY_READY',
          html: '<p><strong>Резюме:</strong> клиент уточнил срок доставки, оператор подтвердил доставку на завтра.</p>'
        },
        actions: [
          { action: 'download', title: 'Скачать' },
          { action: 'transcribe', title: 'Перевести в текст', disabled: true }
        ],
      };

      const rightMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'right',
        direction: 'outgoing',
        messageId: 'right1',
        time: '12:05',
        subText: 'Георигий',
        avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=32&palette=soft&seed=%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8%D0%B9&style=round',
        callDuration: '3:20',
        callParticipant: 'Малафеева Любовь',
        dialogId: 'dlg_right1', // для тултипа
        transcript: {
          status: 'RECOGNITION_READY',
          html: '<p><strong>Оператор:</strong> Доставка будет завтра до 15:00.</p><p><strong>Клиент:</strong> Отлично, тогда жду завтра.</p>'
        },
        summary: {
          status: 'SUMMARY_READY',
          html: '<p><strong>Итог:</strong> согласовали доставку на завтра до 15:00.</p>'
        },
        actions: [
          { action: 'download', title: 'Скачать' },
          { action: 'transcribe', title: 'Перевести в текст', disabled: true }
        ],
      };

      const missedCallMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'left',
        messageId: '802',
        time: '12:04',
        status: 'read',
        isMissedCall: true,
        header: 'Василий',
        subText: 'Василий',
        callParticipant: 'Малафеева Любовь',
        callAttemptDuration: '50 сек',
        direction: 'incoming',
        dialogId: 'dlg_43543111', // для тултипа
      };

      const errorCallMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'right',
        messageId: '804',
        time: '12:18',
        status: 'error',
        isMissedCall: true,
        header: 'Георгий',
        subText: 'Георгий',
        avatar: 'https://polka.cs.mobilon.ru/avatars/vector/man?size=32&palette=soft&seed=%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8%D0%B9&style=round',
        callParticipant: 'Малафеева Любовь',
        callAttemptDuration: '1 мин 20 сек',
        direction: 'outgoing',
        dialogId: 'dlg_804', // для тултипа
      };

      return { leftMessage, rightMessage, missedCallMessage, errorCallMessage };
    },
    template: `
      <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="min-width: 360px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <CallMessage :message="leftMessage" />
            <CallMessage :message="rightMessage" />
            <CallMessage :message="missedCallMessage" />
            <CallMessage :message="errorCallMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};

const baseStatusMessage: ICallMessage = {
  url: audioFile,
  position: 'left',
  direction: 'incoming',
  messageId: 'call-status-base',
  time: '12:22',
  callDuration: '00:29',
  status: 'read',
  header: 'Иван Иванов',
  subText: 'Иван Иванов',
  callParticipant: '89135292926',
  recordUrl: 'https://records.services.mobilon.ru/record/wOq6ct:873fff89-1ebf-49f8-c955-8acaf129446d',
}

const createStatusRender = (args: { message: ICallMessage }) => ({
  components: { BaseContainer, CallMessage },
  setup() {
    return { args }
  },
  template: `
    <BaseContainer style="padding: 24px; background: var(--chotto-theme-primary-color, #ffffff);">
      <div style="min-width: 360px; padding: 40px 20px; background-color: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
        <CallMessage :message="args.message" />
      </div>
    </BaseContainer>
  `
})

export const ReadyStatus: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-status-ready',
      transcript: {
        status: 'RECOGNITION_READY',
        html: '<p><strong>Клиент:</strong> Подскажите, когда будет доставка?</p><p><strong>Оператор:</strong> Доставка будет завтра до 15:00.</p>'
      },
      summary: {
        status: 'SUMMARY_READY',
        html: '<p><strong>Итог:</strong> клиент уточнил срок, оператор подтвердил доставку на завтра до 15:00.</p>'
      },
    } as ICallMessage,
  },
};

export const PlannedStatus: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-status-planned',
      transcript: {
        status: 'RECOGNITION_PLANNED',
      },
      summary: {
        status: 'SUMMARY_PLANNED',
      },
    } as ICallMessage,
  },
};

export const ErrorStatus: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-status-error',
      transcript: {
        status: 'RECOGNITION_ERROR',
      },
      summary: {
        status: 'SUMMARY_ERROR',
      },
    } as ICallMessage,
  },
};

export const NotConfiguredStatus: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-status-not-configured',
      transcript: {
        status: 'RECOGNITION_NOT_CONFIGURED',
      },
      summary: {
        status: 'SUMMARY_NOT_CONFIGURED',
      },
    } as ICallMessage,
  },
};

export const WithoutText: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-without-text',
      summary: {
        status: 'SUMMARY_READY',
        html: '<p><strong>Итог:</strong> подтверждена доставка на завтра до 15:00.</p>'
      },
    } as ICallMessage,
  },
};

export const WithoutSummary: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-without-summary',
      transcript: {
        status: 'RECOGNITION_READY',
        html: '<p><strong>Клиент:</strong> Подскажите, когда будет доставка?</p><p><strong>Оператор:</strong> Доставка будет завтра до 15:00.</p>'
      },
    } as ICallMessage,
  },
};

export const WithoutTextAndSummary: Story = {
  render: (args) => createStatusRender(args as { message: ICallMessage }),
  args: {
    message: {
      ...baseStatusMessage,
      messageId: 'call-without-text-summary',
    } as ICallMessage,
  },
};
