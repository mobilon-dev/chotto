import { watch, type Ref, unref, type MaybeRef } from 'vue';
import { CHANNEL_TYPES } from './useCommunicationChannels';

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
}

/**
 * Синхронизирует выбранный канал панели с внешним диалогом.
 */
export function useCommunicationDialogSync({
  selectedChannelType,
  selectedChannel,
  channels,
  selectedDialog,
}: UseCommunicationDialogSyncOptions) {
  const updateSelectedChannelFromDialog = (dialog: Dialog | null | undefined) => {
    if (!dialog || !dialog.channelId) {
      selectedChannelType.value = null;
      selectedChannel.value = {};
      return;
    }

    const channelType = dialog.channelId ? dialog.channelId.split('.')[0] : null;
    const normalizedType = channelType ? normalizeChannelType(channelType) : null;

    if (normalizedType && CHANNEL_TYPES.includes(normalizedType)) {
      selectedChannelType.value = normalizedType;
      const channel = channels.value.find((ch) => ch.channelId === dialog.channelId);
      selectedChannel.value = channel ?? {};
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

function normalizeChannelType(type: string): string | null {
  if (type.includes('waba')) return 'whatsapp';
  if (type.includes('telegrambot')) return 'telegram';
  return type;
}
