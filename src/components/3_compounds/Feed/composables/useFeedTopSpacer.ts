import { Ref, ref, watch, nextTick, onUnmounted } from 'vue';

/** Запас overflow сверху, чтобы short feed всегда скроллился (#16649). */
export const FEED_TOP_LOAD_OVERFLOW_PX = 320;

interface UseFeedTopSpacerOptions {
  feedRef: Ref<HTMLElement | null>;
  objectsLengthRef: Ref<number>;
}

/**
 * Высота top-spacer: content + spacer дают scrollHeight >= clientHeight + OVERFLOW,
 * чтобы жест «вверх» был возможен при любом числе сообщений.
 */
export function useFeedTopSpacer({ feedRef, objectsLengthRef }: UseFeedTopSpacerOptions) {
  const topSpacerPx = ref(0);
  let resizeObserver: ResizeObserver | null = null;
  let observedElement: HTMLElement | null = null;

  function measure() {
    const el = feedRef.value;
    if (!el || objectsLengthRef.value === 0) {
      topSpacerPx.value = 0;
      return;
    }

    const spacerEl = el.querySelector('.message-feed__top-spacer') as HTMLElement | null;
    const currentSpacer = spacerEl?.offsetHeight ?? 0;
    const contentHeight = el.scrollHeight - currentSpacer;
    const needed = Math.max(0, el.clientHeight - contentHeight + FEED_TOP_LOAD_OVERFLOW_PX);
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
    observedElement = element;
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
    observedElement = null;
  });

  return {
    topSpacerPx,
    scheduleMeasure,
  };
}
