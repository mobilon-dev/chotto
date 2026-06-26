import type { ContactAttribute } from './useCommunicationAttributes';
import { isAttributeUnconfirmed, needsAttributeConfirmation } from './useCommunicationAttributes';

export type RecentChannelEntry = {
  attributeId?: string;
  channelId?: string;
  tooltip?: string;
};

type Channel = {
  channelId: string;
  title?: string;
  [key: string]: unknown;
};

const ONE_CLICK_CHANNEL_TYPES = new Set(['whatsapp', 'telegram', 'max', 'sms']);

export function isOneClickChannelType(channelType: string): boolean {
  return ONE_CLICK_CHANNEL_TYPES.has(channelType);
}

function findAttributeByRecentId(
  attrs: ContactAttribute[],
  attributeId?: string,
): ContactAttribute | undefined {
  if (!attributeId || !attrs.length) {
    return undefined;
  }
  const suffix = attributeId.includes('.') ? attributeId.split('.').pop()! : attributeId;
  return attrs.find((attribute) => {
    const id = attribute.id ?? attribute.attributeId;
    if (!id || typeof id !== 'string') {
      return false;
    }
    return id === attributeId || id === suffix || id.endsWith(`.${suffix}`);
  });
}

function resolveChannelIdForType(
  channelType: string,
  recent: RecentChannelEntry | undefined,
  getSingleChannelForType: (type: string) => Channel | null,
  getAvailableChannels: (type: string) => Channel[],
): string | null {
  const available = getAvailableChannels(channelType);
  if (recent?.channelId) {
    const match = available.find((ch) => ch.channelId === recent.channelId);
    if (match) {
      return match.channelId;
    }
  }
  if (available.length === 1) {
    return available[0].channelId;
  }
  const single = getSingleChannelForType(channelType);
  return single?.channelId ?? null;
}

/**
 * Разрешает attribute + channelId для one-click по кнопке типа канала.
 */
export function resolveRecentChannelSelection(
  channelType: string,
  recentMap: Record<string, RecentChannelEntry> | undefined,
  organizedAttributes: Record<string, ContactAttribute[]>,
  getSingleChannelForType: (type: string) => Channel | null,
  getAvailableChannels: (type: string) => Channel[],
): { attribute: ContactAttribute; channelId: string } | null {
  if (!isOneClickChannelType(channelType)) {
    return null;
  }

  const recent = recentMap?.[channelType];
  const channelId = resolveChannelIdForType(
    channelType,
    recent,
    getSingleChannelForType,
    getAvailableChannels,
  );
  if (!channelId) {
    return null;
  }

  const attrs = organizedAttributes[channelType] ?? [];

  // При неподтверждённых атрибутах оператор сам выбирает номер и канал в меню (confirm-attribute).
  if (attrs.some(isAttributeUnconfirmed)) {
    return null;
  }

  const attribute =
    findAttributeByRecentId(attrs, recent?.attributeId) ??
    (attrs.length === 1 ? attrs[0] : undefined);
  if (!attribute || needsAttributeConfirmation(attribute)) {
    return null;
  }

  return { attribute, channelId };
}
