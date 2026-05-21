import { ref, computed, unref, watch, type Ref, type ComputedRef } from 'vue';
import { type ChannelType } from './useCommunicationChannels';

/** Допустимые статусы контактного атрибута */
export const CONTACT_ATTRIBUTE_STATUSES = ['confirmed', 'unconfirmed'] as const;

export type ContactAttributeStatus = (typeof CONTACT_ATTRIBUTE_STATUSES)[number];

/**
 * Тип контактного атрибута из панели коммуникаций.
 */
export type ContactAttribute = {
  id: string;
  type: string;
  value?: string;
  data?: unknown;
  status?: ContactAttributeStatus;
  [key: string]: unknown;
};

export function isContactAttributeStatus(value: unknown): value is ContactAttributeStatus {
  return CONTACT_ATTRIBUTE_STATUSES.includes(value as ContactAttributeStatus);
}

/**
 * CSS-класс для привязки UI к статусу атрибута (`status-confirmed` / `status-unconfirmed`).
 */
export function getAttributeStatusClass(
  attribute: ContactAttribute | null | undefined
): `status-${ContactAttributeStatus}` | null {
  const status = attribute?.status;
  return isContactAttributeStatus(status) ? `status-${status}` : null;
}

export function isAttributeConfirmed(attribute: ContactAttribute | null | undefined): boolean {
  return attribute?.status === 'confirmed';
}

export function isAttributeUnconfirmed(attribute: ContactAttribute | null | undefined): boolean {
  return attribute?.status === 'unconfirmed';
}

/** Нужно запросить подтверждение атрибута у родителя (запрос на сервер). */
export function needsAttributeConfirmation(attribute: ContactAttribute | null | undefined): boolean {
  return isAttributeUnconfirmed(attribute);
}

/** Payload события confirm-attribute */
export type ConfirmAttributePayload = {
  attributeId: string;
  channelId: string;
  channelType: string;
  attribute: ContactAttribute;
};

export function shouldShowAttributeCheckmark(
  attribute: ContactAttribute | null | undefined,
  isSelected: boolean
): boolean {
  return isSelected || isAttributeConfirmed(attribute);
}

export function getAttributeCheckIndicatorClass(
  attribute: ContactAttribute | null | undefined,
  isSelected: boolean
): 'selected-indicator' | 'confirmed-indicator' | null {
  if (!shouldShowAttributeCheckmark(attribute, isSelected)) {
    return null;
  }
  return isSelected ? 'selected-indicator' : 'confirmed-indicator';
}

export function isAttributeConfirming(
  attribute: ContactAttribute | null | undefined,
  confirmingAttributeId: string | null | undefined
): boolean {
  if (!confirmingAttributeId || !attribute?.id) {
    return false;
  }
  return attribute.id === confirmingAttributeId;
}

/** Атрибут заблокирован после неудачного подтверждения (до повторного входа в меню). */
export function isAttributeBlocked(
  attribute: ContactAttribute | null | undefined,
  blockedAttributeIds: readonly string[] | null | undefined
): boolean {
  if (!attribute?.id || !blockedAttributeIds?.length) {
    return false;
  }
  return blockedAttributeIds.includes(attribute.id);
}

/** Ключи подсказок для галочки / спиннера в слоте индикатора */
export type AttributeIndicatorTooltipKey = 'selected' | 'confirmed' | 'confirming' | 'blocked';

export type AttributeIndicatorTooltips = Partial<Record<AttributeIndicatorTooltipKey, string>>;

export type AttributeIndicatorTooltipContext = {
  isSelected: boolean;
  confirmingAttributeId: string | null | undefined;
  blockedAttributeIds: readonly string[];
};

export function shouldShowAttributeIndicator(
  attribute: ContactAttribute | null | undefined,
  context: AttributeIndicatorTooltipContext
): boolean {
  return (
    isAttributeConfirming(attribute, context.confirmingAttributeId) ||
    shouldShowAttributeCheckmark(attribute, context.isSelected)
  );
}

/** Слот индикатора для заблокированного атрибута без галочки / спиннера (только тултип). */
export function shouldShowBlockedIndicatorSlot(
  attribute: ContactAttribute | null | undefined,
  context: AttributeIndicatorTooltipContext
): boolean {
  if (!isAttributeBlocked(attribute, context.blockedAttributeIds)) {
    return false;
  }
  return (
    !isAttributeConfirming(attribute, context.confirmingAttributeId) &&
    !shouldShowAttributeCheckmark(attribute, context.isSelected)
  );
}

/**
 * Определяет ключ подсказки индикатора по приоритету состояния.
 */
export function getAttributeIndicatorTooltipKey(
  attribute: ContactAttribute | null | undefined,
  context: AttributeIndicatorTooltipContext
): AttributeIndicatorTooltipKey | null {
  if (isAttributeConfirming(attribute, context.confirmingAttributeId)) {
    return 'confirming';
  }
  if (isAttributeBlocked(attribute, context.blockedAttributeIds)) {
    return 'blocked';
  }
  if (!shouldShowAttributeIndicator(attribute, context)) {
    return null;
  }
  if (context.isSelected) {
    return 'selected';
  }
  if (isAttributeConfirmed(attribute)) {
    return 'confirmed';
  }
  return null;
}

export function getAttributeIndicatorTooltipText(
  attribute: ContactAttribute | null | undefined,
  tooltips: AttributeIndicatorTooltips | null | undefined,
  context: AttributeIndicatorTooltipContext
): string {
  const key = getAttributeIndicatorTooltipKey(attribute, context);
  if (!key || !tooltips) {
    return '';
  }
  return tooltips[key] ?? '';
}

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

/**
 * Параметры composable для работы с контактными атрибутами.
 */
type PanelChannelTypesRef = MaybeRef<readonly ChannelType[]>;

interface UseCommunicationAttributesOptions {
  /** Реактивный список контактных атрибутов */
  contactAttributes: MaybeRef<ContactAttribute[]>;
  /** Типы каналов, отображаемые в панели */
  panelChannelTypes: PanelChannelTypesRef;
  /** Текущий замороженный атрибут (подсвеченный) */
  frozenAttribute: Ref<{ id?: string } | null>;
}

/**
 * Формирует структуру организованных атрибутов.
 */
export function useCommunicationAttributes({
  contactAttributes,
  panelChannelTypes,
  frozenAttribute,
}: UseCommunicationAttributesOptions) {
  const contactAttributesList = computed(() => unref(contactAttributes) ?? []);
  const panelTypesList = computed(() => unref(panelChannelTypes) ?? []);

  const createEmptyOrganized = (types: readonly ChannelType[]) =>
    Object.fromEntries(types.map((type) => [type, [] as ContactAttribute[]]));

  const organizedContactAttributes = ref<Record<string, ContactAttribute[]>>(
    createEmptyOrganized(panelTypesList.value),
  );

  /**
   * Строит карту атрибутов по типам каналов.
   */
  const organizeContactAttributes = () => {
    const types = panelTypesList.value;
    const organized = createEmptyOrganized(types);
    const panelTypeSet = new Set(types);

    contactAttributesList.value.forEach((attr) => {
      if (!attr || !attr.type) {
        return;
      }

      if (attr.type === 'telegram') {
        if (panelTypeSet.has('telegram')) {
          (organized.telegram as ContactAttribute[]).push(attr);
        }
        return;
      }

      if (attr.type === 'max') {
        if (panelTypeSet.has('max')) {
          (organized.max as ContactAttribute[]).push(attr);
        }
        return;
      }

      if (attr.type === 'phone') {
        (['whatsapp', 'sms', 'phone'] as const).forEach((type) => {
          if (panelTypeSet.has(type)) {
            (organized[type] as ContactAttribute[]).push(attr);
          }
        });
        return;
      }

      if (panelTypeSet.has(attr.type as ChannelType) && organized[attr.type]) {
        (organized[attr.type] as ContactAttribute[]).push(attr);
      }
    });

    organizedContactAttributes.value = organized;
  };

  watch(contactAttributesList, organizeContactAttributes, { deep: true, immediate: true });
  watch(panelTypesList, organizeContactAttributes);

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
    isAttributeFrozen,
  };
}