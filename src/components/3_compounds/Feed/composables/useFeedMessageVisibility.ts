import { Ref } from 'vue';

interface UseFeedMessageVisibilityOptions<T = unknown> {
  feedRef: Ref<HTMLElement | null>;
  trackingObjects: Ref<NodeListOf<Element> | undefined>;
  chatAppId: string;
  onMessageVisible: (message: T) => void;
}

/**
 * Композабл для отслеживания видимости сообщений с помощью Intersection Observer
 */
export function useFeedMessageVisibility<T = unknown>({
  trackingObjects,
  chatAppId,
  onMessageVisible,
}: UseFeedMessageVisibilityOptions<T>) {
  const callback = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        try {
          const message = JSON.parse(entry.target.id) as unknown as T;
          onMessageVisible(message);
        } catch (error) {
          console.error('Failed to parse message from IntersectionObserver:', error);
        }
      }
    });
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

