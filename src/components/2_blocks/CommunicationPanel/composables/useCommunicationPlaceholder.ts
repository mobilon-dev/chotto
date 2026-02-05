import { computed, unref, type Ref, type ComputedRef } from 'vue';
import type { Channel } from './useCommunicationChannels';
import type { ContactAttribute } from './useCommunicationAttributes';

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

/**
 * Опции для composable управления placeholder пустых каналов.
 */
interface UseCommunicationPlaceholderOptions {
  /** Флаг отображения меню */
  showMenu: Ref<boolean>;
  /** Текущий активный тип канала */
  activeChannelType: Ref<string | null>;
  /** Объект с текстами placeholder для каждого типа канала */
  emptyChannelsPlaceholder: MaybeRef<Record<string, string>>;
  /** Функция получения доступных каналов для типа */
  getAvailableChannels: (channelType: string) => Channel[];
  /** Функция получения типа канала по его ID */
  getChannelTypeFromId: (channelId: string | null | undefined) => string | null;
  /** Реактивный список всех каналов */
  channels: MaybeRef<Channel[]>;
  /** Организованные атрибуты контакта по типам каналов */
  organizedContactAttributes: Ref<Record<string, ContactAttribute[]>>;
}

/**
 * Компонует логику отображения placeholder для пустых каналов.
 */
export function useCommunicationPlaceholder({
  showMenu,
  activeChannelType,
  emptyChannelsPlaceholder,
  getAvailableChannels,
  organizedContactAttributes,
}: UseCommunicationPlaceholderOptions) {
  const emptyChannelsPlaceholderMap = computed(() => {
    return unref(emptyChannelsPlaceholder) ?? {};
  });

  /**
   * Получение текста placeholder для активного типа канала.
   */
  const emptyChannelsPlaceholderText = computed(() => {
    if (!activeChannelType.value || !emptyChannelsPlaceholderMap.value) {
      return null;
    }
    const placeholder = emptyChannelsPlaceholderMap.value[activeChannelType.value];
    return placeholder || null;
  });

  /**
   * Показывать ли placeholder (нет каналов для активного типа).
   */
  const shouldShowEmptyChannelsPlaceholder = computed(() => {
    // Базовые проверки
    if (!showMenu.value || !activeChannelType.value) {
      return false;
    }
    
    // Проверяем наличие текста placeholder
    if (!emptyChannelsPlaceholderText.value) {
      return false;
    }
    
    // Проверяем наличие каналов в системе для этого типа
    const availableChannelsForType = getAvailableChannels(activeChannelType.value);
    const hasNoChannelsInSystem = availableChannelsForType.length === 0;
    
    // Проверяем наличие атрибутов у контакта для этого типа
    const attributesForType = organizedContactAttributes.value[activeChannelType.value];
    const hasNoAttributes = !attributesForType || attributesForType.length === 0;
    
    // Показываем placeholder если:
    // 1. Нет каналов в системе для этого типа ИЛИ
    // 2. Есть каналы в системе, но у контакта нет атрибутов для этого типа
    if (hasNoChannelsInSystem) {
      // Нет каналов в системе
      return true;
    }
    
    // Если есть каналы в системе, но у контакта нет атрибутов для этого типа
    // показываем placeholder (каналы есть, но для этого контакта они недоступны)
    if (hasNoAttributes) {
      return true;
    }
    
    return false;
  });

  return {
    emptyChannelsPlaceholderText,
    shouldShowEmptyChannelsPlaceholder,
  };
}