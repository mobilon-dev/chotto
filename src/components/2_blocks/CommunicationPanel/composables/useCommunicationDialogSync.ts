import { watch, type Ref, unref, type MaybeRef, type ComputedRef } from 'vue';
import { CHANNEL_TYPES, type ChannelType } from './useCommunicationChannels';

interface Dialog {
  channelId?: string;
  [key: string]: unknown;
}

interface Channel {
  channelId: string;
  [key: string]: unknown;
}

interface UseCommunicationDialogSyncOptions {
  /** Текущее выбранное значение типа канала */
  selectedChannelType: Ref<string | null>;
  /** Текущий выбранный канал */
  selectedChannel: Ref<Channel | Record<string, unknown>>;
  /** Список доступных каналов */
  channels: Ref<Channel[]>;
  /** Текущий выбранный диалог */
  selectedDialog: MaybeRef<Dialog | null | undefined>;
  /** Функция проверки пустоты канала */
  isChannelEmpty: (channelId: string) => boolean;
  /** Флаг нового диалога */
  isNewDialog: ComputedRef<boolean>;
  /** Функция показа tooltip для нового диалога */
  showDefaultChannelTooltipWithTimer: () => void;
  /** Функция очистки tooltip */
  clearDefaultChannelTooltip: () => void;
}

/**
 * Синхронизирует выбранный канал панели с внешним диалогом.
 */
export function useCommunicationDialogSync({
  selectedChannelType,
  selectedChannel,
  channels,
  selectedDialog,
  isChannelEmpty,
  isNewDialog,
  showDefaultChannelTooltipWithTimer,
  clearDefaultChannelTooltip,
}: UseCommunicationDialogSyncOptions) {
  const updateSelectedChannelFromDialog = (dialog: Dialog | null | undefined) => {
    if (!dialog || !dialog.channelId) {
      selectedChannelType.value = null;
      selectedChannel.value = {};
      clearDefaultChannelTooltip();
      return;
    }

    const channelType = dialog.channelId ? dialog.channelId.split('.')[0] : null;
    const normalizedType = channelType ? normalizeChannelType(channelType) : null;

    if (normalizedType) {
      selectedChannelType.value = normalizedType;
      const channel = channels.value.find((ch) => ch.channelId === dialog.channelId);
      selectedChannel.value = channel ?? {};
      
      if (isChannelEmpty(dialog.channelId) && isNewDialog.value) {
        showDefaultChannelTooltipWithTimer();
      } else {
        clearDefaultChannelTooltip();
      }
    }
  };

  watch(
    () => unref(selectedDialog),
    (dialog) => {
      updateSelectedChannelFromDialog(dialog ?? null);
    },
    { immediate: true, deep: true }
  );

  return {
    updateSelectedChannelFromDialog,
  };
}

function normalizeChannelType(type: string): ChannelType | null {
  if (type.includes('waba')) return 'whatsapp';
  if (type.includes('telegrambot')) return 'telegram';
  if (CHANNEL_TYPES.includes(type as ChannelType)) {
    return type as ChannelType;
  }
  return null;
}
