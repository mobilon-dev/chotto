import { Ref, ref, nextTick, watch } from 'vue';

/**
 * Композабл для управления скроллом ленты сообщений.
 * Инкапсулирует типичные сценарии: принудительный скролл вниз,
 * гарантирование положения внизу, первичную инициализацию и
 * плавную прокрутку (например, по кнопке «вниз»).
 */

/**
 * Параметры и зависимости композабла.
 */
interface UseFeedScrollOptions<T = unknown> {
  /** Ссылка на DOM-элемент контейнера ленты */
  feedRef: Ref<HTMLElement | null>;
  /** Реактивный список объектов ленты (для определения, когда есть контент) */
  objectsRef: Ref<T[]>;
  /** Внешний флаг, который триггерит прокрутку вниз */
  scrollToBottomRef: Ref<boolean>;
}

export function useFeedScroll<T = unknown>({ feedRef, objectsRef, scrollToBottomRef }: UseFeedScrollOptions<T>) {
  /**
   * Признак, что первичная инициализация скролла уже выполнена,
   * чтобы не повторять её при каждом изменении данных.
   */
  const isInitialized = ref(false);

  /**
   * Мгновенно прокручивает контейнер в самый низ (без анимации).
   * scrollBehavior = 'auto', чтобы при загрузке чата не было плавного «съезда» вниз.
   */
  function performScrollToBottom(): void {
    nextTick(() => {
      const element = feedRef.value;
      if (!element) return;
      const prevBehavior = (element.style as HTMLElement['style']).scrollBehavior;
      element.style.scrollBehavior = 'auto';
      element.scrollTop = element.scrollHeight;
      element.style.scrollBehavior = prevBehavior || 'auto';
    });
  }

  /**
   * Гарантирует, что контейнер окажется внизу, даже если
   * контент меняется асинхронно и высота пересчитывается позже.
   * Выполняет повторные проверки через таймеры.
   */
  function ensureScrollToBottom(): void {
    const element = feedRef.value;
    if (!element) return;

    const scrollToBottom = () => {
      const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 5;
      if (!isAtBottom) {
        element.scrollTop = element.scrollHeight;
        setTimeout(() => {
          const stillNotAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight > 5;
          if (stillNotAtBottom) {
            element.scrollTop = element.scrollHeight;
          }
        }, 200);
      }
    };

    scrollToBottom();
    setTimeout(scrollToBottom, 300);
  }

  /**
   * Первичная инициализация: сразу вниз, затем повтор после обновления DOM (nextTick + rAF),
   * чтобы скролл оставался внизу, когда контент дорисуется.
   */
  function initializeScroll(): void {
    if (!isInitialized.value && objectsRef.value.length > 0) {
      performScrollToBottom();
      nextTick().then(() => {
        requestAnimationFrame(performScrollToBottom);
      });
      nextTick().then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(performScrollToBottom);
        });
      });
      isInitialized.value = true;
    }
  }

  /**
   * Плавно прокручивает контейнер в самый низ. Удобно для
   * пользовательского действия (например, нажатия на кнопку «вниз»).
   */
  function smoothScrollToBottom(): void {
    nextTick(() => {
      const element = feedRef.value;
      if (!element) return;
      element.style.scrollBehavior = 'smooth';
      element.scrollTop = element.scrollHeight;
    });
  }

  // При открытии чата (scrollToBottom = true) — сразу вниз, затем после отрисовки (nextTick + rAF).
  watch(
    () => scrollToBottomRef.value,
    (val) => {
      if (val) {
        performScrollToBottom();
        nextTick().then(() => {
          requestAnimationFrame(performScrollToBottom);
        });
      }
    },
    { immediate: true }
  );

  return {
    isInitialized,
    performScrollToBottom,
    ensureScrollToBottom,
    initializeScroll,
    smoothScrollToBottom,
  };
}

