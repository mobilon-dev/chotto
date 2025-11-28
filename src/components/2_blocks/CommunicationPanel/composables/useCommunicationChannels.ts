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
 * Список поддерживаемых типов каналов в панели коммуникаций.
 */
export const CHANNEL_TYPES = ['whatsapp', 'telegram', 'max', 'sms', 'phone'] as const;

export type ChannelType = (typeof CHANNEL_TYPES)[number];

/**
 * Базовое описание канала.
 */
type Channel = {
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

interface UseCommunicationChannelsOptions {
  /** Реактивный список каналов */
  channels: ChannelsRef;
  /** Реактивная карта пользовательских подсказок */
  channelTooltips?: ChannelTooltipsRef;
  /** Текущий выбранный тип канала */
  selectedChannelType: Ref<string | null>;
}

export function useCommunicationChannels({ channels, channelTooltips, selectedChannelType }: UseCommunicationChannelsOptions) {
  const channelsList = computed(() => unref(channels) ?? []);
  const channelTooltipsMap = computed(() => unref(channelTooltips) ?? {});

  /**
   * Возвращает типовые данные для рендера списка каналов слева.
   */
  const channelsTypes = computed(() =>
    CHANNEL_TYPES.map((type) => ({
      type,
      component: channelIconsMap[type],
    }))
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
