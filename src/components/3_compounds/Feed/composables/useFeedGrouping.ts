import { ComputedRef, computed } from 'vue';
import { IFeedObject } from '@/types';

interface UseFeedGroupingOptions {
  objects: ComputedRef<IFeedObject[]>;
}

/**
 * Композабл для группировки сообщений в серии (по отправителю)
 */
export function useFeedGrouping({ objects }: UseFeedGroupingOptions) {
  /**
   * Группирует сообщения, определяя начало серии
   */
  const groupedObjects = computed(() => {
    if (!objects.value || objects.value.length === 0) return [];

    return objects.value.map((message, index, arr) => {
      // Проверяем, от того же отправителя ли предыдущее сообщение
      const isSameSenderAsPrevious =
        index > 0 &&
        arr[index - 1].position === message.position &&
        arr[index - 1].header === message.header;

      // Проверяем, можно ли группировать предыдущее сообщение
      const prevIsGroupable =
        index > 0 &&
        !['message.system', 'message.typing'].includes(arr[index - 1].type);

      // Определяем, является ли это первым сообщением в серии
      const isFirstInSeries = !isSameSenderAsPrevious || !prevIsGroupable;

      return {
        ...message,
        isFirstInSeries,
      };
    });
  });

  return {
    groupedObjects,
  };
}

