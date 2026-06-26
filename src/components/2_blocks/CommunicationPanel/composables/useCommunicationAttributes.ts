import { ref, computed, unref, watch, type Ref, type ComputedRef } from 'vue';
import { type ChannelType } from './useCommunicationChannels';

/** Допустимые статусы контактного атрибута */
export const CONTACT_ATTRIBUTE_STATUSES = ['confirmed', 'unconfirmed'] as const;

export type ContactAttributeStatus = (typeof CONTACT_ATTRIBUTE_STATUSES)[number];

export const CANON_RESOLVE_SUBSTATUS_NOT_FOUND = 'not_found';

/** Результат неудачного resolveCanon для пары attribute + channel (с бэкенда). */
export type CanonResolveState = {
  channelId: string;
  substatus: typeof CANON_RESOLVE_SUBSTATUS_NOT_FOUND | string;
  updatedTimestampms?: number;
  /** chn_* — для сопоставления с display channelId в подменю */
  backendChannelId?: string;
};

/**
 * Тип контактного атрибута из панели коммуникаций.
 */
export type ContactAttribute = {
  id: string;
  type: string;
  value?: string;
  data?: unknown;
  status?: ContactAttributeStatus;
  canonResolveStates?: CanonResolveState[];
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

export function getAttributeCanonResolveStates(
  attribute: ContactAttribute | null | undefined,
): CanonResolveState[] {
  return Array.isArray(attribute?.canonResolveStates) ? attribute.canonResolveStates : [];
}

export function isCanonResolveSubstatusNotFound(substatus: unknown): boolean {
  return String(substatus ?? '').toLowerCase() === CANON_RESOLVE_SUBSTATUS_NOT_FOUND;
}

/** Есть неудачная попытка подтверждения хотя бы в одном канале. */
export function hasCanonResolveNotFound(
  attribute: ContactAttribute | null | undefined,
): boolean {
  if (!isAttributeUnconfirmed(attribute)) {
    return false;
  }
  return getAttributeCanonResolveStates(attribute).some((state) =>
    isCanonResolveSubstatusNotFound(state.substatus),
  );
}

export function isChannelCanonResolveNotFound(
  attribute: ContactAttribute | null | undefined,
  channelId: string | null | undefined,
  extraChannelIds: readonly string[] = [],
): boolean {
  const targets = new Set(
    [channelId, ...extraChannelIds]
      .map((id) => String(id ?? '').trim())
      .filter(Boolean),
  );
  if (!targets.size || !isAttributeUnconfirmed(attribute)) {
    return false;
  }
  return getAttributeCanonResolveStates(attribute).some((state) => {
    if (!isCanonResolveSubstatusNotFound(state.substatus)) return false;
    const stateId = String(state.channelId ?? '').trim();
    const backendId = String(state.backendChannelId ?? '').trim();
    if (!stateId && !backendId) return false;
    if (targets.has(stateId) || targets.has(backendId)) return true;
    for (const target of targets) {
      const targetSuffix = target.includes('.') ? target.split('.').slice(1).join('.') : target;
      const stateSuffix = stateId.includes('.') ? stateId.split('.').slice(1).join('.') : stateId;
      if (targetSuffix && stateSuffix && targetSuffix === stateSuffix) return true;
    }
    return false;
  });
}

export type SubMenuChannelIndicatorType = 'spinner' | 'check' | 'unconfirmed';

/** Индикатор в списке каналов связи: (!) для not_found, галочка — для выбранного. */
export function getSubMenuChannelIndicatorType(
  attribute: ContactAttribute | null | undefined,
  channelId: string | null | undefined,
  isChannelSelected: boolean,
  confirmingAttributeId: string | null | undefined,
  extraChannelIds: readonly string[] = [],
): SubMenuChannelIndicatorType | null {
  if (isChannelCanonResolveNotFound(attribute, channelId, extraChannelIds)) {
    return 'unconfirmed';
  }
  if (!isChannelSelected) {
    return null;
  }
  if (isAttributeConfirming(attribute, confirmingAttributeId)) {
    return 'spinner';
  }
  return 'check';
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

export function shouldShowAttributeStatusIndicator(
  attribute: ContactAttribute | null | undefined,
  isSelected: boolean
): boolean {
  return isSelected || isAttributeConfirmed(attribute) || hasCanonResolveNotFound(attribute);
}

export function shouldShowAttributeCheckmark(
  attribute: ContactAttribute | null | undefined,
  isSelected: boolean
): boolean {
  if (isAttributeUnconfirmed(attribute)) {
    return false;
  }
  return isSelected || isAttributeConfirmed(attribute);
}

export function shouldShowAttributeUnconfirmedIndicator(
  attribute: ContactAttribute | null | undefined
): boolean {
  return hasCanonResolveNotFound(attribute);
}

export function getAttributeCheckIndicatorClass(
  attribute: ContactAttribute | null | undefined,
  isSelected: boolean
): 'selected-indicator' | 'confirmed-indicator' | 'unconfirmed-indicator' | null {
  if (hasCanonResolveNotFound(attribute)) {
    return 'unconfirmed-indicator';
  }
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
export type AttributeIndicatorTooltipKey =
  | 'selected'
  | 'confirmed'
  | 'unconfirmed'
  | 'confirming'
  | 'blocked';

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
    shouldShowAttributeStatusIndicator(attribute, context.isSelected)
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
    !shouldShowAttributeStatusIndicator(attribute, context.isSelected)
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
  if (hasCanonResolveNotFound(attribute)) {
    return 'unconfirmed';
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

export function getSubMenuChannelIndicatorClass(
  attribute: ContactAttribute | null | undefined,
  channelId: string | null | undefined,
  isChannelSelected: boolean,
  confirmingAttributeId: string | null | undefined,
  extraChannelIds: readonly string[] = [],
): 'selected-indicator' | 'unconfirmed-indicator' | 'confirming-indicator' | null {
  const indicatorType = getSubMenuChannelIndicatorType(
    attribute,
    channelId,
    isChannelSelected,
    confirmingAttributeId,
    extraChannelIds,
  );
  if (!indicatorType) {
    return null;
  }
  if (indicatorType === 'spinner') {
    return 'confirming-indicator';
  }
  if (indicatorType === 'unconfirmed') {
    return 'unconfirmed-indicator';
  }
  return 'selected-indicator';
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