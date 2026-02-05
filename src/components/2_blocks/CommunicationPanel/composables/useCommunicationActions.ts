import type { Ref, ComputedRef } from 'vue';
import type { ContactAttribute } from './useCommunicationAttributes';

/**
 * Тип канала панели коммуникаций.
 */
type Channel = {
  channelId: string;
  title?: string;
  [key: string]: unknown;
};

/**
 * Сигнатуры событий, которые эмитит панель.
 */
interface CommunicationActionsEmit {
  (event: 'select-attribute-channel', payload: { attributeId: string; channelId: string }): void;
  (event: 'phone-call', payload: { attributeId: string; phoneNumber: unknown }): void;
}

interface UseCommunicationActionsOptions {
  activeChannelType: Ref<string | null>;
  channels: ComputedRef<Channel[]>;
  selectedChannel: Ref<Channel | Record<string, unknown>>;
  selectedChannelType: Ref<string | null>;
  hoveredAttribute: Ref<ContactAttribute | null>;
  closeMenu: () => void;
  hasMultipleChannels: (channelType: string) => boolean;
  getSingleChannelForType: (channelType: string) => Channel | null;
  getAvailableChannels: (channelType: string) => Channel[];
  isChannelEmpty: (channelId: string) => boolean;
  isNewDialog: ComputedRef<boolean>;
  showDefaultChannelTooltipWithTimer: () => void;
  clearDefaultChannelTooltip: () => void;
  emit: CommunicationActionsEmit;
}

/**
 * Инкапсулирует действия панели: звонок, выбор каналов, выбор атрибутов.
 */
export function useCommunicationActions({
  activeChannelType,
  channels,
  selectedChannel,
  selectedChannelType,
  hoveredAttribute,
  closeMenu,
  hasMultipleChannels,
  getSingleChannelForType,
  getAvailableChannels,
  isChannelEmpty,
  isNewDialog,
  showDefaultChannelTooltipWithTimer,
  clearDefaultChannelTooltip,
  emit,
}: UseCommunicationActionsOptions) {
  /**
   * Обрабатывает телефонный звонок по выбранному атрибуту.
   */
  const handlePhoneCall = (attribute: ContactAttribute | null | undefined) => {
    if (!attribute) return;

    emit('phone-call', {
      attributeId: attribute.id,
      phoneNumber: attribute.data,
    });
    closeMenu();
  };

  /**
   * Выбирает одиночный канал для атрибута.
   */
  const selectSingleChannel = (attribute: ContactAttribute, channelId: string) => {
    emit('select-attribute-channel', {
      attributeId: attribute.id,
      channelId,
    });
    selectedChannelType.value = activeChannelType.value;
    selectedChannel.value = channels.value.find((ch) => ch.channelId === channelId) ?? {};
    
    if (isChannelEmpty(channelId) && isNewDialog.value) {
      showDefaultChannelTooltipWithTimer();
    } else {
      clearDefaultChannelTooltip();
    }
    
    closeMenu();
  };

  /**
   * Обрабатывает клик по атрибуту.
   */
  const handleAttributeClick = (attribute: ContactAttribute) => {
    const channelType = activeChannelType.value;
    if (!channelType) {
      return;
    }

    if (channelType === 'phone') {
      handlePhoneCall(attribute);
      return;
    }

    if (!hasMultipleChannels(channelType)) {
      const singleChannel = getSingleChannelForType(channelType);
      if (singleChannel) {
        selectSingleChannel(attribute, singleChannel.channelId);
      }
    }
  };

  /**
   * Выбор канала из подменю.
   */
  const selectChannel = (channelId: string) => {
    if (hoveredAttribute.value) {
      emit('select-attribute-channel', {
        attributeId: hoveredAttribute.value.id,
        channelId,
      });
      selectedChannelType.value = activeChannelType.value;
      selectedChannel.value = channels.value.find((ch) => ch.channelId === channelId) ?? {};
      
      if (isChannelEmpty(channelId) && isNewDialog.value) {
        showDefaultChannelTooltipWithTimer();
      } else {
        clearDefaultChannelTooltip();
      }
    }
    closeMenu();
  };

  /**
   * Доступные каналы для активного типа (кэшируется для удобства).
   */
  const availableChannels = () => {
    const channelType = activeChannelType.value;
    if (!channelType) {
      return [] as Channel[];
    }
    return getAvailableChannels(channelType);
  };

  return {
    handlePhoneCall,
    handleAttributeClick,
    selectSingleChannel,
    selectChannel,
    availableChannels,
  };
}