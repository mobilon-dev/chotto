import { ComputedRef, computed } from 'vue';
import { IFeedObject } from '@/types';

interface UseFeedGroupingOptions {
  objects: ComputedRef<IFeedObject[]>;
}

/** Служебные элементы ленты — не участвуют в серии и не разрывают её */
const NON_SERIES_TYPES = new Set([
  'message.system',
  'message.typing',
  'message.delimiter',
  'system.date',
]);

/**
 * Ищет предыдущее сообщение, участвующее в группировке по отправителю
 */
function findPreviousSeriesMessage(
  messages: IFeedObject[],
  index: number,
): IFeedObject | null {
  for (let i = index - 1; i >= 0; i--) {
    if (!NON_SERIES_TYPES.has(messages[i].type)) {
      return messages[i];
    }
  }
  return null;
}

/**
 * Композабл для группировки сообщений в серии (по отправителю)
 */
export function useFeedGrouping({ objects }: UseFeedGroupingOptions) {
  /**
   * Группирует сообщения, определяя начало серии.
   * Имя/аватар показываются в первом сообщении серии и при смене отправителя
   * (другой клиент или исходящее). Разделители вроде «Новые сообщения» серию не рвут.
   */
  const groupedObjects = computed(() => {
    if (!objects.value || objects.value.length === 0) return [];

    return objects.value.map((message, index, arr) => {
      if (NON_SERIES_TYPES.has(message.type)) {
        return {
          ...message,
          isFirstInSeries: true,
        };
      }

      const previous = findPreviousSeriesMessage(arr, index);
      const isSameSenderAsPrevious =
        previous != null &&
        previous.position === message.position &&
        previous.header === message.header;

      return {
        ...message,
        isFirstInSeries: !isSameSenderAsPrevious,
      };
    });
  });

  return {
    groupedObjects,
  };
}
