import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onMounted, onUnmounted, provide, ref } from 'vue';
 
import CallMessage from '../CallMessage.vue';
import { ICallMessage } from '@/types'; 
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import audioFile from '../../../../apps/data/audio/file_example_MP3_700KB.mp3';

const themes = [
  { code: 'light', name: 'Light' },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1', default: true },
];

const meta: Meta<typeof CallMessage> = {
  title: 'Feed Elements/CallMessage',
  component: CallMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};
 
export default meta;
type Story = StoryObj<typeof CallMessage>;

export const Default: Story = {
  render: () => ({
    components: { BaseContainer, ThemeMode, CallMessage },
    setup() {
      const themesList = themes;
      
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
      const leftMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'left',
        messageId: 'left1',
        time: '12:00',
        callDuration: '5:00',
        callParticipant: 'Малафеева Любовь',
        dialogId: 'dlg_left1', // для тултипа
        actions: [
          { action: 'download', title: 'Скачать' },
          { action: 'transcribe', title: 'Перевести в текст', disabled: true }
        ],
      };

      const rightMessage: ICallMessage & { dialogId?: string } = {
        url: audioFile,
        position: 'right',
        messageId: 'right1',
        time: '12:05',
        callDuration: '3:20',
        callParticipant: 'Малафеева Любовь',
        dialogId: 'dlg_right1', // для тултипа
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
        callParticipant: 'Малафеева Любовь',
        callAttemptDuration: '1 мин 20 сек',
        direction: 'outgoing',
        dialogId: 'dlg_804', // для тултипа
      };

      return { themesList, handleThemeChange, leftMessage, rightMessage, missedCallMessage, errorCallMessage };
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
            <CallMessage :message="missedCallMessage" />
            <CallMessage :message="errorCallMessage" />
          </div>
        </div>
      </BaseContainer>
    `,
  }),
};
