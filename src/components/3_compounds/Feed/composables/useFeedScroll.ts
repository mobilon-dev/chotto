import { Ref, ref, nextTick, watch, onUnmounted } from 'vue';

/**
 * Композабл для управления скроллом ленты сообщений.
 *
 * Вместо серии отложенных «подтверждающих» скроллов используется
 * режим stick-to-bottom: при открытии чата лента прижимается вниз
 * и остаётся там, пока растёт контент (картинки, клавиатура и т.п.).
 * Любой пользовательский скролл сразу выключает этот режим.
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
   * Пока true — лента должна оставаться у последних сообщений.
   * Выключается пользовательским скроллом.
   */
  const stickToBottom = ref(false);

  let isProgrammaticScroll = false;
  let pointerIsDown = false;
  let listenersElement: HTMLElement | null = null;
  let resizeObserver: ResizeObserver | null = null;

  function snapToBottom(): void {
    if (!stickToBottom.value) return;

    const element = feedRef.value;
    if (!element) return;

    isProgrammaticScroll = true;
    element.style.scrollBehavior = 'auto';
    element.scrollTop = element.scrollHeight;
    requestAnimationFrame(() => {
      isProgrammaticScroll = false;
    });
  }

  function freezeScrollPosition(): void {
    const element = feedRef.value;
    if (!element) return;

    const currentTop = element.scrollTop;
    element.style.scrollBehavior = 'auto';
    element.scrollTop = currentTop;
  }

  function activateStickToBottom(): void {
    stickToBottom.value = true;
    nextTick(() => {
      snapToBottom();
      requestAnimationFrame(() => snapToBottom());
    });
  }

  function interruptStickToBottom(): void {
    if (!stickToBottom.value) return;
    stickToBottom.value = false;
    freezeScrollPosition();
  }

  function observeFeed(element: HTMLElement): void {
    resizeObserver?.disconnect();
    resizeObserver = new ResizeObserver(() => {
      snapToBottom();
    });
    resizeObserver.observe(element);
    for (const child of element.children) {
      if (child instanceof HTMLElement) {
        resizeObserver.observe(child);
      }
    }
  }

  function handlePointerDown(): void {
    pointerIsDown = true;
  }

  function handlePointerUp(): void {
    pointerIsDown = false;
  }

  function handleScroll(): void {
    if (isProgrammaticScroll) return;
    if (pointerIsDown) {
      interruptStickToBottom();
    }
  }

  function attachUserScrollListeners(element: HTMLElement): void {
    element.addEventListener('wheel', interruptStickToBottom, { passive: true });
    element.addEventListener('touchstart', interruptStickToBottom, { passive: true });
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  }

  function detachUserScrollListeners(element: HTMLElement): void {
    element.removeEventListener('wheel', interruptStickToBottom);
    element.removeEventListener('touchstart', interruptStickToBottom);
    element.removeEventListener('pointerdown', handlePointerDown);
    element.removeEventListener('scroll', handleScroll);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
    pointerIsDown = false;
  }

  /**
   * Прижимает ленту к последним сообщениям и включает stick-to-bottom.
   */
  function performScrollToBottom(): void {
    activateStickToBottom();
  }

  /**
   * Выполняет первичную инициализацию скролла: если есть элементы,
   * прокручивает вниз. Запоминает факт инициализации в `isInitialized`.
   */
  function initializeScroll(): void {
    if (!isInitialized.value && objectsRef.value.length > 0) {
      activateStickToBottom();
      isInitialized.value = true;
    }
  }

  /**
   * Плавно прокручивает контейнер в самый низ. Удобно для
   * пользовательского действия (например, нажатия на кнопку «вниз»).
   */
  function smoothScrollToBottom(): void {
    stickToBottom.value = true;
    nextTick(() => {
      const element = feedRef.value;
      if (!element) return;
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    });
  }

  watch(
    feedRef,
    (element, previousElement) => {
      if (previousElement) {
        detachUserScrollListeners(previousElement);
      }
      listenersElement = element ?? null;
      if (element) {
        attachUserScrollListeners(element);
        observeFeed(element);
        if (stickToBottom.value) {
          snapToBottom();
        }
      }
    },
    { immediate: true }
  );

  watch(
    objectsRef,
    () => {
      nextTick(() => {
        if (feedRef.value) {
          observeFeed(feedRef.value);
        }
      });
    }
  );

  // Внешний флаг «прокрутить вниз» (смена чата, новое сообщение).
  watch(
    () => scrollToBottomRef.value,
    (val) => {
      if (val) {
        activateStickToBottom();
      }
    },
    { immediate: true }
  );

  // Автоинициализация скролла при появлении объектов
  watch(
    () => objectsRef.value.length,
    () => {
      if (!isInitialized.value && objectsRef.value.length > 0) {
        initializeScroll();
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (listenersElement) {
      detachUserScrollListeners(listenersElement);
      listenersElement = null;
    }
  });

  return {
    isInitialized,
    performScrollToBottom,
    initializeScroll,
    smoothScrollToBottom,
  };
}
