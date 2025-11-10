import { ref, computed, unref, watch, type Ref, type ComputedRef } from 'vue';
import { CHANNEL_TYPES } from './useCommunicationChannels';

/**
 * Тип контактного атрибута из панели коммуникаций.
 */
export type ContactAttribute = {
  id: string;
  type: string;
  value?: string;
  data?: unknown;
  [key: string]: unknown;
};

/**
 * Тип описания недавнего атрибута в пропсах.
 */
export type RecentAttributeChannel = {
  attributeId?: string;
  channelId?: string;
  tooltip?: string;
  [key: string]: unknown;
};

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

/**
 * Параметры composable для работы с контактными атрибутами.
 */
interface UseCommunicationAttributesOptions {
  /** Реактивный список контактных атрибутов */
  contactAttributes: MaybeRef<ContactAttribute[]>;
  /** Реактивная карта недавних атрибутов по типам */
  recentAttributeChannels: MaybeRef<Record<string, RecentAttributeChannel>>;
  /** Текущий активный тип канала */
  activeChannelType: Ref<string | null>;
  /** Текущий замороженный атрибут (подсвеченный) */
  frozenAttribute: Ref<{ id?: string } | null>;
}

/**
 * Формирует структуру организованных атрибутов, вычисляет "последний" атрибут
 * для активного канала и предоставляет вспомогательные методы для панели коммуникаций.
 */
export function useCommunicationAttributes({
  contactAttributes,
  recentAttributeChannels,
  activeChannelType,
  frozenAttribute,
}: UseCommunicationAttributesOptions) {
  const contactAttributesList = computed(() => unref(contactAttributes) ?? []);
  const recentAttributeChannelsMap = computed(() => unref(recentAttributeChannels) ?? {});

  const organizedContactAttributes = ref<Record<string, ContactAttribute[]>>(
    Object.fromEntries(CHANNEL_TYPES.map((type) => [type, []]))
  );

  /**
   * Строит карту атрибутов по типам каналов.
   */
  const organizeContactAttributes = () => {
    const organized = Object.fromEntries(
      CHANNEL_TYPES.map((type) => [type, [] as ContactAttribute[]])
    );

    contactAttributesList.value.forEach((attr) => {
      if (!attr || !attr.type) {
        return;
      }

      if (attr.type === 'telegram') {
        (organized.telegram as ContactAttribute[]).push(attr);
        return;
      }

      if (attr.type === 'phone') {
        ['whatsapp', 'max', 'sms', 'phone'].forEach((type) => {
          (organized[type] as ContactAttribute[]).push(attr);
        });
        return;
      }

      if (organized[attr.type]) {
        (organized[attr.type] as ContactAttribute[]).push(attr);
      }
    });

    organizedContactAttributes.value = organized;
  };

  watch(contactAttributesList, organizeContactAttributes, { deep: true, immediate: true });

  /**
   * Возвращает недавний атрибут для указанного типа канала.
   */
  const getRecentAttributeByType = (channelType: string) => {
    const recentAttributeId = recentAttributeChannelsMap.value[channelType]?.attributeId;
    if (!recentAttributeId) {
      return null;
    }
    return contactAttributesList.value.find((attr) => attr.id === recentAttributeId) ?? null;
  };

  /**
   * Недавний атрибут для активного канала.
   */
  const recentAttribute = computed(() => {
    const channelType = activeChannelType.value;
    if (!channelType) {
      return null;
    }
    return getRecentAttributeByType(channelType);
  });

  /**
   * Флаг отображения блока "Недавний" для активного канала.
   */
  const showRecentAttribute = computed(() => {
    const channelType = activeChannelType.value;
    if (!channelType || channelType === 'phone') {
      return false;
    }
    const recentAttr = recentAttribute.value;
    const channelInfo = recentAttributeChannelsMap.value[channelType];
    return Boolean(recentAttr && channelInfo?.channelId);
  });

  /**
   * Проверяет, совпадает ли атрибут с замороженным (подсвеченным).
   */
  const isAttributeFrozen = (attribute: ContactAttribute | null | undefined) => {
    const frozen = frozenAttribute.value;
    if (!attribute || !frozen?.id) {
      return false;
    }
    return attribute.id === frozen.id;
  };

  return {
    organizedContactAttributes,
    organizeContactAttributes,
    recentAttribute,
    getRecentAttributeByType,
    showRecentAttribute,
    isAttributeFrozen,
  };
}
