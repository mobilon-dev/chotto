import { computed, unref, type Component, type ComputedRef, type Ref } from 'vue';
import {
  CommunicationPanelPhoneIcon,
  CommunicationPanelWhatsAppIcon,
  CommunicationPanelTelegramIcon,
  CommunicationPanelMaxIcon,
  CommunicationPanelSMSIcon,
  CommunicationPanelSubmenuPhoneIcon,
  CommunicationPanelSubmenuWhatsAppIcon,
  CommunicationPanelSubmenuTelegramIcon,
  CommunicationPanelSubmenuMaxIcon,
  CommunicationPanelSubmenuSMSIcon,
} from '../icons/index.ts';

/**
 * Все поддерживаемые типы каналов в панели коммуникаций.
 */
export const CHANNEL_TYPES = ['whatsapp', 'telegram', 'max', 'sms', 'phone'] as const;

export type ChannelType = (typeof CHANNEL_TYPES)[number];

/** Порядок кнопок каналов по умолчанию. */
export const DEFAULT_CHANNEL_ORDER: readonly ChannelType[] = ['max', 'telegram', 'whatsapp', 'sms', 'phone'];

export function isChannelType(value: string): value is ChannelType {
  return (CHANNEL_TYPES as readonly string[]).includes(value);
}

/**
 * Собирает итоговый список типов для панели: порядок из channelOrder, видимость из visibleChannelTypes.
 * Типы из visibleChannelTypes, отсутствующие в channelOrder, добавляются в конце.
 */
export function resolvePanelChannelTypes(
  channelOrder: readonly string[] | undefined,
  visibleChannelTypes: readonly string[] | undefined,
): ChannelType[] {
  const order = (channelOrder ?? DEFAULT_CHANNEL_ORDER).filter(isChannelType);
  const visibleList = visibleChannelTypes === undefined ? [...CHANNEL_TYPES] : visibleChannelTypes.filter(isChannelType);
  const visibleSet = new Set(visibleList);

  const seen = new Set<ChannelType>();
  const result: ChannelType[] = [];

  for (const type of order) {
    if (visibleSet.has(type) && !seen.has(type)) {
      seen.add(type);
      result.push(type);
    }
  }

  for (const type of visibleList) {
    if (!seen.has(type)) {
      seen.add(type);
      result.push(type);
    }
  }

  return result;
}

/**
 * Базовое описание канала.
 */
export type Channel = {
  channelId: string;
  title?: string;
  [key: string]: unknown;
};

/**
 * Карта иконок для главного списка каналов.
 */
const channelIconsMap: Record<ChannelType, Component> = {
  phone: CommunicationPanelPhoneIcon,
  whatsapp: CommunicationPanelWhatsAppIcon,
  telegram: CommunicationPanelTelegramIcon,
  max: CommunicationPanelMaxIcon,
  sms: CommunicationPanelSMSIcon,
};

/**
 * Карта иконок для меню выбора канала.
 */
const menuChannelIconsMap: Record<ChannelType, Component> = {
  phone: CommunicationPanelSubmenuPhoneIcon,
  whatsapp: CommunicationPanelSubmenuWhatsAppIcon,
  telegram: CommunicationPanelSubmenuTelegramIcon,
  max: CommunicationPanelSubmenuMaxIcon,
  sms: CommunicationPanelSubmenuSMSIcon,
};

/**
 * Значения подсказок по умолчанию для каждой кнопки канала.
 */
const defaultTooltips: Record<ChannelType, string> = {
  phone: 'Позвонить',
  whatsapp: 'Выберите контакт и канал для отправки сообщения',
  telegram: 'Выберите контакт и канал для отправки сообщения',
  max: 'Выберите контакт и канал для отправки сообщения',
  sms: 'Выберите контакт и канал для отправки сообщения',
};

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

type ChannelTooltips = Record<string, string>;

type ChannelsRef = MaybeRef<Channel[]>;

type ChannelTooltipsRef = MaybeRef<ChannelTooltips | undefined>;

type ChannelTypesRef = MaybeRef<readonly string[] | undefined>;

interface UseCommunicationChannelsOptions {
  /** Реактивный список каналов */
  channels: ChannelsRef;
  /** Реактивная карта пользовательских подсказок */
  channelTooltips?: ChannelTooltipsRef;
  /** Порядок кнопок каналов в панели */
  channelOrder?: ChannelTypesRef;
  /** Типы каналов, которые нужно отображать (с бэка — доступные пользователю) */
  visibleChannelTypes?: ChannelTypesRef;
  /** Текущий выбранный тип канала */
  selectedChannelType: Ref<string | null>;
}

export function useCommunicationChannels({
  channels,
  channelTooltips,
  channelOrder,
  visibleChannelTypes,
  selectedChannelType,
}: UseCommunicationChannelsOptions) {
  const channelsList = computed(() => unref(channels) ?? []);
  const channelTooltipsMap = computed(() => unref(channelTooltips) ?? {});

  const panelChannelTypes = computed(() =>
    resolvePanelChannelTypes(unref(channelOrder), unref(visibleChannelTypes)),
  );

  /**
   * Возвращает типовые данные для рендера списка каналов слева.
   */
  const channelsTypes = computed(() =>
    panelChannelTypes.value.map((type) => ({
      type,
      component: channelIconsMap[type],
    })),
  );

  /**
   * Возвращает текст подсказки для указанного типа канала.
   */
  const getTooltipText = (channelType: string): string => {
    const customTooltip = channelTooltipsMap.value[channelType];
    if (customTooltip) {
      return customTooltip;
    }
    return defaultTooltips[channelType as ChannelType] ?? '';
  };

  /**
   * Возвращает тип канала по его идентификатору.
   */
  const getChannelTypeFromId = (channelId: string | null | undefined): string | null => {
    if (!channelId) return null;

    const [type] = channelId.split('.');

    if (type.includes('waba')) return 'whatsapp';
    if (type.includes('telegrambot')) return 'telegram';

    return type;
  };

  /**
   * Проверяет, есть ли для указанного типа более одного канала.
   */
  const hasMultipleChannels = (channelType: string): boolean => {
    return channelsList.value.filter((channel) => getChannelTypeFromId(channel.channelId) === channelType).length > 1;
  };

  /**
   * Проверяет, активен ли указанный тип канала.
   */
  const isChannelActive = (channelType: string): boolean => selectedChannelType.value === channelType;

  /**
   * Возвращает единственный канал для типа, если он один.
   */
  const getSingleChannelForType = (channelType: string): Channel | null => {
    const channelsForType = channelsList.value.filter((channel) => getChannelTypeFromId(channel.channelId) === channelType);
    return channelsForType.length === 1 ? channelsForType[0] : null;
  };

  /**
   * Возвращает компонент иконки для указанного типа канала в меню.
   */
  const getMenuChannelIconComponent = (channelType: string): Component | null => {
    return menuChannelIconsMap[channelType as ChannelType] ?? null;
  };

  /**
   * Возвращает компонент иконки для конкретного идентификатора канала.
   */
  const getMenuChannelIconComponentForChannelId = (channelId: string): Component | null => {
    const channelType = getChannelTypeFromId(channelId);
    if (!channelType) {
      return null;
    }
    return getMenuChannelIconComponent(channelType);
  };

  /**
   * Возвращает компонент иконки для меню, учитывая, есть ли только один канал данного типа.
   */
  const getSingleMenuChannelIconComponent = (channelType: string): Component | null => {
    const singleChannel = getSingleChannelForType(channelType);
    return singleChannel ? getMenuChannelIconComponentForChannelId(singleChannel.channelId) : getMenuChannelIconComponent(channelType);
  };

  /**
   * Возвращает список доступных каналов для указанного типа.
   */
  const getAvailableChannels = (channelType: string): Channel[] => {
    return channelsList.value.filter((channel) => getChannelTypeFromId(channel.channelId) === channelType);
  };

  return {
    panelChannelTypes,
    channelsTypes,
    getTooltipText,
    getChannelTypeFromId,
    hasMultipleChannels,
    isChannelActive,
    getSingleChannelForType,
    getMenuChannelIconComponent,
    getMenuChannelIconComponentForChannelId,
    getSingleMenuChannelIconComponent,
    getAvailableChannels,
  };
}
