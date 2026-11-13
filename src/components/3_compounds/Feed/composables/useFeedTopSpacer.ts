import { Ref, ref, watch, nextTick, onUnmounted } from 'vue';

/**
 * Порог «почти заполнен viewport»: только тогда добиваем минимальный overflow
 * для native-scroll. Short feed без дырки — load-more через wheel (#16649 journal 77879).
 */
export const FEED_TOP_LOAD_OVERFLOW_PX = 8;

interface UseFeedTopSpacerOptions {
  feedRef: Ref<HTMLElement | null>;
  objectsLengthRef: Ref<number>;
}

/**
 * Высота top-spacer: не раздуваем short feed до clientHeight.
 * Пустой запас только если контент уже почти на всю высоту (tip-over ≤ OVERFLOW).
 */
export function useFeedTopSpacer({ feedRef, objectsLengthRef }: UseFeedTopSpacerOptions) {
  const topSpacerPx = ref(0);
  let resizeObserver: ResizeObserver | null = null;

  function measure() {
    const el = feedRef.value;
    if (!el || objectsLengthRef.value === 0) {
      topSpacerPx.value = 0;
      return;
    }

    const spacerEl = el.querySelector('.message-feed__top-spacer') as HTMLElement | null;
    const currentSpacer = spacerEl?.offsetHeight ?? 0;
    const contentHeight = el.scrollHeight - currentSpacer;
    const shortfall = el.clientHeight - contentHeight;
    // shortfall > OVERFLOW → short feed, spacer = 0 (ползунок по фактической высоте)
    // 0 < shortfall ≤ OVERFLOW → минимальный tip-over для native scroll
    // shortfall ≤ 0 → уже overflow, spacer не нужен
    const needed =
      shortfall > 0 && shortfall <= FEED_TOP_LOAD_OVERFLOW_PX ? shortfall + 1 : 0;
    if (needed !== topSpacerPx.value) {
      topSpacerPx.value = needed;
    }
  }

  function scheduleMeasure() {
    nextTick(() => {
      requestAnimationFrame(() => {
        measure();
        // второй кадр — после применения новой высоты spacer
        requestAnimationFrame(measure);
      });
    });
  }

  function observe(element: HTMLElement | null) {
    resizeObserver?.disconnect();
    if (!element) return;
    resizeObserver = new ResizeObserver(() => scheduleMeasure());
    resizeObserver.observe(element);
  }

  watch(
    feedRef,
    (el) => {
      observe(el);
      scheduleMeasure();
    },
    { immediate: true },
  );

  watch(
    objectsLengthRef,
    () => scheduleMeasure(),
    { immediate: true },
  );

  onUnmounted(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
  });

  return {
    topSpacerPx,
    scheduleMeasure,
  };
}
