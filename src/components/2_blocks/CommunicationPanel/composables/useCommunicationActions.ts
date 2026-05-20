import type { Ref, ComputedRef } from 'vue';
import type {
  ContactAttribute,
  ConfirmAttributePayload,
} from './useCommunicationAttributes';
import { needsAttributeConfirmation } from './useCommunicationAttributes';

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
  (
    event: 'confirm-attribute',
    payload: ConfirmAttributePayload
  ): void;
  (event: 'phone-call', payload: { attributeId: string; phoneNumber: unknown }): void;
}

interface UseCommunicationActionsOptions {
  activeChannelType: Ref<string | null>;
  channels: ComputedRef<Channel[]>;
  selectedChannel: Ref<Channel | Record<string, unknown>>;
  selectedChannelType: Ref<string | null>;
  hoveredAttribute: Ref<ContactAttribute | null>;
  confirmingAttributeId: Ref<string | null>;
  isAttributeBlocked: (attribute: ContactAttribute | null | undefined) => boolean;
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
  confirmingAttributeId,
  isAttributeBlocked,
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
   * Эмитит подтверждение неподтверждённого атрибута — родитель выполняет запрос на сервер.
   */
  const requestAttributeConfirmation = (
    attribute: ContactAttribute,
    channelId: string,
    channelType: string
  ) => {
    if (isAttributeBlocked(attribute)) {
      return;
    }

    confirmingAttributeId.value = attribute.id;
    emit('confirm-attribute', {
      attributeId: attribute.id,
      channelId,
      channelType,
      attribute,
    });
  };

  /**
   * Выбор атрибута/канала: confirmed — сразу переключение, unconfirmed — confirm-attribute.
   */
  const applyAttributeChannelSelection = (
    attribute: ContactAttribute,
    channelId: string,
    channelType: string
  ) => {
    if (needsAttributeConfirmation(attribute)) {
      requestAttributeConfirmation(attribute, channelId, channelType);
      return;
    }
    selectSingleChannel(attribute, channelId);
  };

  /**
   * Обрабатывает телефонный звонок по выбранному атрибуту.
   */
  const handlePhoneCall = (attribute: ContactAttribute | null | undefined) => {
    if (!attribute || isAttributeBlocked(attribute)) return;

    if (needsAttributeConfirmation(attribute)) {
      requestAttributeConfirmation(attribute, '', 'phone');
      return;
    }

    emit('phone-call', {
      attributeId: attribute.id,
      phoneNumber: attribute.data,
    });
    closeMenu();
  };

  /**
   * Выбирает одиночный канал для атрибута (только для confirmed / без статуса).
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
    if (confirmingAttributeId.value || isAttributeBlocked(attribute)) {
      return;
    }

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
        applyAttributeChannelSelection(attribute, singleChannel.channelId, channelType);
      }
    }
  };

  /**
   * Выбор канала из подменю.
   */
  const selectChannel = (channelId: string) => {
    const attribute = hoveredAttribute.value;
    const channelType = activeChannelType.value;
    if (!attribute || !channelType || isAttributeBlocked(attribute)) {
      closeMenu();
      return;
    }

    if (needsAttributeConfirmation(attribute)) {
      requestAttributeConfirmation(attribute, channelId, channelType);
      return;
    }

    emit('select-attribute-channel', {
      attributeId: attribute.id,
      channelId,
    });
    selectedChannelType.value = channelType;
    selectedChannel.value = channels.value.find((ch) => ch.channelId === channelId) ?? {};

    if (isChannelEmpty(channelId) && isNewDialog.value) {
      showDefaultChannelTooltipWithTimer();
    } else {
      clearDefaultChannelTooltip();
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