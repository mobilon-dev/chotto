import { Ref } from 'vue';

interface UseFeedMessageVisibilityOptions<T = unknown> {
  feedRef: Ref<HTMLElement | null>;
  trackingObjects: Ref<NodeListOf<Element> | undefined>;
  chatAppId: string;
  /** По id элемента (msg-{messageId} или msg-mid-{index}) возвращает сообщение — без JSON в DOM */
  getMessageById: (id: string) => T | undefined;
  onMessageVisible: (message: T) => void;
}

/**
 * Композабл для отслеживания видимости сообщений с помощью Intersection Observer
 */
export function useFeedMessageVisibility<T = unknown>({
  trackingObjects,
  chatAppId,
  getMessageById,
  onMessageVisible,
}: UseFeedMessageVisibilityOptions<T>) {
  const callback = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rawId = entry.target.id
        const id = rawId.startsWith('msg-') ? rawId.slice(4) : rawId
        const message = getMessageById(id)
        if (message) onMessageVisible(message)
      }
    })
  };

  const options = {
    root: document.getElementById('feed-container-' + chatAppId),
    rootMargin: '5px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(callback, options);

  /**
   * Запускает наблюдение за новыми элементами
   */
  const observeMessages = () => {
    if (trackingObjects.value) {
      trackingObjects.value.forEach((obj: Element) => observer.observe(obj));
    }
  };

  /**
   * Обновляет список наблюдаемых элементов и перезапускает наблюдение
   */
  const restartObserving = () => {
    observeMessages();
  };

  return {
    observer,
    observeMessages,
    restartObserving,
  };
}

