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
   * Мгновенно прокручивает контейнер в самый низ (без анимации),
   * затем возвращает плавность прокрутки. Подходит для начальной
   * установки позиции внизу при добавлении контента.
   */
  function performScrollToBottom(): void {
    nextTick(() => {
      const element = feedRef.value;
      if (!element) return;

      element.style.scrollBehavior = 'auto';
      element.scrollTop = element.scrollHeight;

      nextTick(() => {
        if (element.scrollHeight - element.scrollTop - element.clientHeight > 10) {
          element.scrollTop = element.scrollHeight;
        }
      });

      setTimeout(() => {
        element.style.scrollBehavior = 'smooth';
      }, 1000);
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
   * Выполняет первичную инициализацию скролла: если есть элементы,
   * прокручивает вниз и делает дополнительные проверки. Запоминает
   * факт инициализации в `isInitialized`.
   */
  function initializeScroll(): void {
    if (!isInitialized.value && objectsRef.value.length > 0) {
      performScrollToBottom();
      setTimeout(() => {
        ensureScrollToBottom();
      }, 300);
      setTimeout(() => {
        ensureScrollToBottom();
      }, 800);
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

  // Реакция на внешний флаг «прокрутить вниз».
  // При включении — выполняем серию прокруток и проверок,
  // чтобы учесть асинхронные изменения DOM/высоты контейнера.
  watch(
    () => scrollToBottomRef.value,
    (val) => {
      if (val) {
        performScrollToBottom();
        setTimeout(() => {
          ensureScrollToBottom();
        }, 500);
        setTimeout(() => {
          ensureScrollToBottom();
        }, 1200);
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

  return {
    isInitialized,
    performScrollToBottom,
    ensureScrollToBottom,
    initializeScroll,
    smoothScrollToBottom,
  };
}

