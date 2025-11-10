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
 * Тип информации о недавно использованном атрибуте для канала.
 */
type RecentAttributeMap = Record<string, { channelId?: string } | undefined>;

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
  recentAttributeChannels: ComputedRef<RecentAttributeMap>;
  selectedChannel: Ref<Channel | Record<string, unknown>>;
  selectedChannelType: Ref<string | null>;
  isRecentAttributeHovered: Ref<boolean>;
  hoveredAttribute: Ref<ContactAttribute | null>;
  closeMenu: () => void;
  hasMultipleChannels: (channelType: string) => boolean;
  getSingleChannelForType: (channelType: string) => Channel | null;
  getAvailableChannels: (channelType: string) => Channel[];
  emit: CommunicationActionsEmit;
}

/**
 * Инкапсулирует действия панели: звонок, выбор каналов, выбор атрибутов и работу с недавними атрибутами.
 */
export function useCommunicationActions({
  activeChannelType,
  channels,
  recentAttributeChannels,
  selectedChannel,
  selectedChannelType,
  isRecentAttributeHovered,
  hoveredAttribute,
  closeMenu,
  hasMultipleChannels,
  getSingleChannelForType,
  getAvailableChannels,
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
    closeMenu();
  };

  /**
   * Выбирает канал для недавнего атрибута, используя последний канал типа.
   */
  const selectChannelForRecentAttribute = (channelId: string, recentAttribute: ContactAttribute | null) => {
    if (recentAttribute) {
      emit('select-attribute-channel', {
        attributeId: recentAttribute.id,
        channelId,
      });
    }
    selectedChannelType.value = activeChannelType.value;
    selectedChannel.value = channels.value.find((ch) => ch.channelId === channelId) ?? {};
    closeMenu();
  };

  /**
   * Обрабатывает клик по недавнему атрибуту.
   */
  const handleRecentAttributeClick = (recentAttribute: ContactAttribute | null) => {
    const channelType = activeChannelType.value;
    if (!channelType) {
      return;
    }

    if (channelType === 'phone') {
      handlePhoneCall(recentAttribute);
      return;
    }

    if (!hasMultipleChannels(channelType)) {
      const singleChannel = getSingleChannelForType(channelType);
      if (recentAttribute && singleChannel) {
        selectSingleChannel(recentAttribute, singleChannel.channelId);
      }
      return;
    }

    const recentChannelId = recentAttributeChannels.value[channelType]?.channelId;
    if (recentAttribute && recentChannelId) {
      selectChannelForRecentAttribute(recentChannelId, recentAttribute);
    }
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
    if (isRecentAttributeHovered.value) {
      selectChannelForRecentAttribute(channelId, hoveredAttribute.value ?? null);
      return;
    }

    if (hoveredAttribute.value) {
      emit('select-attribute-channel', {
        attributeId: hoveredAttribute.value.id,
        channelId,
      });
      selectedChannelType.value = activeChannelType.value;
      selectedChannel.value = channels.value.find((ch) => ch.channelId === channelId) ?? {};
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
    handleRecentAttributeClick,
    handleAttributeClick,
    selectSingleChannel,
    selectChannelForRecentAttribute,
    selectChannel,
    availableChannels,
  };
}
