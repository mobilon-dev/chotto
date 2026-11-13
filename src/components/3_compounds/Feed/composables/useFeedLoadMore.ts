import { Ref, ref, nextTick, unref, watch } from 'vue';

interface UseFeedLoadMoreOptions {
  feedRef: Ref<HTMLElement | null>;
  emit?: (event: 'loadMore' | 'loadMoreDown', ...args: unknown[]) => void;
  isLoadingMoreRef?: Ref<boolean>;
  /** Пока лента прижата вниз — top load-more не эмитим (#16649 journal 77620). */
  stickToBottomRef?: Ref<boolean>;
}

/**
 * Композабл для управления подгрузкой сообщений сверху/снизу и восстановлением позиции скролла
 */
export function useFeedLoadMore({
  feedRef,
  emit,
  isLoadingMoreRef,
  stickToBottomRef,
}: UseFeedLoadMoreOptions) {
  const allowLoadMoreTop = ref(false);
  const allowLoadMoreBottom = ref(false);
  const movingDown = ref(false);
  const isScrollByMouseButton = ref(false);

  // Метрики для восстановления позиции после top-prepend
  const prevScrollHeight = ref(0);
  const prevScrollTop = ref(0);
  const pendingTopRestore = ref(false);
  const topLoadJustHappened = ref(false);

  const isStuckToBottom = () => Boolean(stickToBottomRef && unref(stickToBottomRef));

  /**
   * Проверяет позицию скролла и управляет флагами загрузки
   */
  const checkScrollPosition = (allowLoadMore: boolean = true) => {
    const element = unref(feedRef);
    if (!element) return;

    const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

    if (isScrollByMouseButton.value) {
      // Режим скролла мышью
      if (element.scrollTop < 300 && !isStuckToBottom()) {
        movingDown.value = false;
        allowLoadMoreTop.value = false;
      }
      if (scrollBottom < 300) {
        allowLoadMoreBottom.value = false;
        movingDown.value = true;
      }
    } else if (allowLoadMore) {
      // Автоматический режим — top только после пользовательского ухода от низа (#16649)
      if (element.scrollTop < 300 && !isStuckToBottom()) {
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
   * Восстанавливает позицию скролла после подгрузки сообщений сверху.
   * nextTick — ждём обновления DOM, requestAnimationFrame — скролл в следующем кадре (не блокируем UI).
   */
  const restoreScrollPosition = (delay: number = 0) => {
    const doRestore = () => {
      nextTick(() => {
        requestAnimationFrame(() => {
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
        });
      });
    };
    if (delay > 0) {
      setTimeout(doRestore, delay);
    } else {
      doRestore();
    }
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

  /**
   * Явный жест пользователя (wheel/touch вверх) на short feed без overflow (#16649 journal 77879).
   * Обходит stickToBottom: жест = намерение догрузить, даже если лента «у низа».
   */
  const requestTopLoadFromUserGesture = () => {
    const element = unref(feedRef);
    if (!element || !allowLoadMoreTop.value) return false;

    prevScrollHeight.value = element.scrollHeight;
    prevScrollTop.value = element.scrollTop;
    pendingTopRestore.value = true;
    allowLoadMoreTop.value = false;
    return true;
  };

  /**
   * Wheel вверх на short feed (нет native overflow) → один top load-more.
   */
  const handleWheelForTopLoad = (event: WheelEvent) => {
    if (event.deltaY >= 0) return;
    const element = unref(feedRef);
    if (!element) return;

    const noOverflow = element.scrollHeight <= element.clientHeight + 1;
    if (!noOverflow) return;
    if (!allowLoadMoreTop.value) return;

    requestTopLoadFromUserGesture();
  };

  let touchStartY: number | null = null;

  const handleTouchStartForTopLoad = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMoveForTopLoad = (event: TouchEvent) => {
    if (touchStartY == null) return;
    const element = unref(feedRef);
    if (!element) return;

    const noOverflow = element.scrollHeight <= element.clientHeight + 1;
    if (!noOverflow) return;

    const y = event.touches[0]?.clientY;
    if (y == null) return;
    // палец вниз = контент «вверх» (overscroll к истории)
    if (y - touchStartY < 24) return;
    if (!allowLoadMoreTop.value) return;

    touchStartY = null;
    requestTopLoadFromUserGesture();
  };

  const handleTouchEndForTopLoad = () => {
    touchStartY = null;
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
    requestTopLoadFromUserGesture,
    handleWheelForTopLoad,
    handleTouchStartForTopLoad,
    handleTouchMoveForTopLoad,
    handleTouchEndForTopLoad,
  };
}
