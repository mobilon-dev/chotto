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
 * Флаги «первое в серии» без копирования objects.
 * Сами сообщения остаются исходными ссылками — Vue не патчит все пузыри зря.
 */
export function useFeedGrouping({ objects }: UseFeedGroupingOptions) {
  const seriesFlags = computed(() => {
    const messages = objects.value
    if (!messages || messages.length === 0) return [] as boolean[]

    const flags = new Array<boolean>(messages.length)
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i]
      if (NON_SERIES_TYPES.has(message.type)) {
        flags[i] = true
        continue
      }

      const previous = findPreviousSeriesMessage(messages, i)
      flags[i] = !(
        previous != null
        && previous.position === message.position
        && previous.header === message.header
      )
    }
    return flags
  })

  return {
    seriesFlags,
  }
}
