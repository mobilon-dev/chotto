import { ref, Ref } from 'vue';

interface UseStickyDateOptions {
  feedRef: Ref<HTMLElement | null>;
  trackingObjects: Ref<NodeListOf<Element> | undefined>;
  autoHideDelay?: number;
  onUpdate?: () => void;
}

export function useStickyDate(options: UseStickyDateOptions) {
  const { feedRef, trackingObjects, autoHideDelay = 500, onUpdate } = options;
  
  const showStickyDate = ref(false);
  const stickyDateText = ref('');
  let stickyHideTimer: number | null = null;

  const isSameLocalDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const updateStickyDate = () => {
    if (!feedRef.value || !trackingObjects.value) {
      onUpdate?.();
      return;
    }

    const feedEl = feedRef.value as HTMLElement;
    const feedTop = feedEl.getBoundingClientRect().top;
    let topMost: HTMLElement | null = null;

    // Находим первое сообщение, которое пересекает верхнюю границу feed
    for (const el of trackingObjects.value) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= feedTop + 1 && rect.bottom > feedTop) {
        topMost = el as HTMLElement;
        break;
      }
    }

    // Если не нашли пересекающее, берем первое видимое сверху
    if (!topMost) {
      for (const el of trackingObjects.value) {
        const rect = el.getBoundingClientRect();
        if (rect.top >= feedTop) {
          topMost = el as HTMLElement;
          break;
        }
      }
    }

    if (!topMost) {
      onUpdate?.();
      return;
    }

    const ts = (topMost as HTMLElement).dataset?.timestamp ?? (topMost as HTMLElement).getAttribute?.('data-timestamp')
    if (ts != null && ts !== '') {
      const seconds = Number(ts);
      if (Number.isFinite(seconds)) {
        const d = new Date(seconds * 1000);
        stickyDateText.value = isSameLocalDay(d, new Date())
          ? 'Сегодня'
          : d.toLocaleDateString('ru-RU');
      }
    }
    onUpdate?.()
  };

  const show = () => {
    updateStickyDate();
    showStickyDate.value = true;
    
    if (stickyHideTimer) {
      window.clearTimeout(stickyHideTimer as unknown as number);
    }
    
    stickyHideTimer = window.setTimeout(() => {
      showStickyDate.value = false;
    }, autoHideDelay);
  };

  const hide = () => {
    if (stickyHideTimer) {
      window.clearTimeout(stickyHideTimer as unknown as number);
      stickyHideTimer = null;
    }
    showStickyDate.value = false;
  };

  const cleanup = () => {
    if (stickyHideTimer) {
      window.clearTimeout(stickyHideTimer as unknown as number);
    }
  };

  return {
    showStickyDate,
    stickyDateText,
    updateStickyDate,
    show,
    hide,
    cleanup,
  };
}

