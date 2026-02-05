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

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

/**
 * Параметры composable для работы с контактными атрибутами.
 */
interface UseCommunicationAttributesOptions {
  /** Реактивный список контактных атрибутов */
  contactAttributes: MaybeRef<ContactAttribute[]>;
  /** Текущий активный тип канала */
  activeChannelType: Ref<string | null>;
  /** Текущий замороженный атрибут (подсвеченный) */
  frozenAttribute: Ref<{ id?: string } | null>;
}

/**
 * Формирует структуру организованных атрибутов.
 */
export function useCommunicationAttributes({
  contactAttributes,
  frozenAttribute,
}: UseCommunicationAttributesOptions) {
  const contactAttributesList = computed(() => unref(contactAttributes) ?? []);

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

      if (attr.type === 'max') {
        (organized.max as ContactAttribute[]).push(attr);
        return;
      }

      if (attr.type === 'phone') {
        ['whatsapp', 'sms', 'phone'].forEach((type) => {
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