import { Ref, ref, nextTick, unref, watch } from 'vue';

interface UseFeedLoadMoreOptions {
  feedRef: Ref<HTMLElement | null>;
  emit?: (event: 'loadMore' | 'loadMoreDown', ...args: unknown[]) => void;
  isLoadingMoreRef?: Ref<boolean>;
}

/**
 * Композабл для управления подгрузкой сообщений сверху/снизу и восстановлением позиции скролла
 */
export function useFeedLoadMore({ feedRef, emit, isLoadingMoreRef }: UseFeedLoadMoreOptions) {
  const allowLoadMoreTop = ref(false);
  const allowLoadMoreBottom = ref(false);
  const movingDown = ref(false);
  const isScrollByMouseButton = ref(false);

  // Метрики для восстановления позиции после top-prepend
  const prevScrollHeight = ref(0);
  const prevScrollTop = ref(0);
  const pendingTopRestore = ref(false);
  const topLoadJustHappened = ref(false);

  /**
   * Проверяет позицию скролла и управляет флагами загрузки
   */
  const checkScrollPosition = (allowLoadMore: boolean = true) => {
    const element = unref(feedRef);
    if (!element) return;

    const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

    if (isScrollByMouseButton.value) {
      // Режим скролла мышью
      if (element.scrollTop < 300) {
        movingDown.value = false;
        allowLoadMoreTop.value = false;
      }
      if (scrollBottom < 300) {
        allowLoadMoreBottom.value = false;
        movingDown.value = true;
      }
    } else if (allowLoadMore) {
      // Автоматический режим
      if (element.scrollTop < 300) {
        // Сохраняем метрики перед top-prepend
        prevScrollHeight.value = element.scrollHeight;
        prevScrollTop.value = element.scrollTop;
        pendingTopRestore.value = true;
        allowLoadMoreTop.value = false;
      }
      if (scrollBottom < 300) {
        allowLoadMoreBottom.value = false;
      }
    }
  };

  /**
   * Восстанавливает позицию скролла после подгрузки сообщений сверху
   */
  const restoreScrollPosition = (delay: number = 0) => {
    nextTick(() => {
      setTimeout(() => {
        try {
          const feedEl = unref(feedRef);
          if (!feedEl || !pendingTopRestore.value) return;

          const prevBehavior = (feedEl.style as HTMLElement['style']).scrollBehavior;
          feedEl.style.scrollBehavior = 'auto';
          const delta = feedEl.scrollHeight - prevScrollHeight.value;
          feedEl.scrollTop = prevScrollTop.value + delta;

          setTimeout(() => {
            feedEl.style.scrollBehavior = prevBehavior || 'auto';
          }, 50);
        } finally {
          pendingTopRestore.value = false;
          topLoadJustHappened.value = true;
          setTimeout(() => {
            topLoadJustHappened.value = false;
          }, 500);
        }
      }, delay);
    });
  };

  // Авто-эмит событий загрузки при достижении краёв
  if (emit) {
    watch(
      () => [allowLoadMoreBottom.value, allowLoadMoreTop.value],
      () => {
        if (!allowLoadMoreBottom.value) emit('loadMoreDown');
        if (!allowLoadMoreTop.value) emit('loadMore');
      }
    );
  }

  // Восстановление позиции после завершения подгрузки сверху
  if (isLoadingMoreRef) {
    watch(
      () => isLoadingMoreRef.value,
      (newValue, oldValue) => {
        if (oldValue === true && newValue === false) {
          restoreScrollPosition(0);
        }
      }
    );
  }

  /**
   * Обработчик начала скролла мышью
   */
  const startScrollWatch = (event: MouseEvent) => {
    const element = unref(feedRef);
    if (!element) return;

    const isScrollbar = event.offsetX > element.clientWidth || event.offsetY > element.clientHeight;
    if (isScrollbar) {
      isScrollByMouseButton.value = true;
    }
  };

  /**
   * Обработчик окончания скролла мышью
   */
  const stopScrollWatch = () => {
    isScrollByMouseButton.value = false;
  };

  /**
   * Сбрасывает флаги подгрузки (например, при изменении списка объектов)
   */
  const resetAllowFlags = () => {
    allowLoadMoreTop.value = true;
    allowLoadMoreBottom.value = true;
  };

  return {
    allowLoadMoreTop,
    allowLoadMoreBottom,
    movingDown,
    isScrollByMouseButton,
    pendingTopRestore,
    topLoadJustHappened,
    checkScrollPosition,
    restoreScrollPosition,
    startScrollWatch,
    stopScrollWatch,
    resetAllowFlags,
  };
}

