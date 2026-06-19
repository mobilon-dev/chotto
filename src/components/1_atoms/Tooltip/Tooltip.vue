<template>
  <div 
    ref="container" 
    class="tooltip-wrapper" 
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <slot />
  </div>
  <Teleport to="body">
    <Transition>
      <div
        v-if="show"
      >
        <span
          v-for="(tooltipText, index) in resolvedTexts"
          :key="`${tooltipText}-${index}`"
          ref="tooltipItems"
          :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          :class="tooltipClasses"
          :style="tooltipStyle"
          @mouseenter="handleTooltipEnter"
          @mouseleave="handleTooltipLeave"
        >
          {{ tooltipText }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, unref, inject, nextTick, onMounted, onUnmounted } from 'vue';
// import { onMounted } from 'vue';
import { useTheme } from '@/hooks';

const chatAppId = inject<string | undefined>('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const container = ref<HTMLElement>() 
const tooltipItems = ref<HTMLElement[]>([])
const show = ref(false)
const autoTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const showTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const hideTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const STACK_GAP_PX = 6
const HIDE_DELAY_MS = 120
const isOverTrigger = ref(false)
const isOverTooltip = ref(false)

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: '',
  },
  texts: {
    type: Array,
    required: false,
    default: () => [],
  },
  position: {
    type: String,
    default: 'top',
  },
  offset: {
    type: Number,
    default: 8,
  },
  trigger: {
    type: String,
    default: 'hover',
  },
  autoShowDuration: {
    type: Number,
    default: 0,
  },
  delay: {
    type: Number,
    default: 600,
  },
  hideOnClick: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '',
  }
})

const tooltipClasses = computed(() => ({
  'tooltip__text': true,
  [`tooltip--${props.position}`]: true
}))

const tooltipStyle = computed(() => ({
  maxWidth: props.maxWidth || undefined,
}))

const resolvedTexts = computed(() => {
  const items = Array.isArray(props.texts)
    ? props.texts.map(item => String(item ?? '').trim()).filter(Boolean)
    : [];

  if (items.length > 0) return items;
  return props.text ? [props.text] : [];
});

const getTooltipPosition = (
  bounds: DOMRect,
  tBounds: DOMRect,
): { top: number; left: number } => {
  const correctLeft = tBounds.left < 0 ? tBounds.left : 0;
  const correctTop = tBounds.top < 0 ? tBounds.top : 0;
  const r: Record<string, { top: number; left: number }> = {
    left: {
      top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop,
      left: bounds.left - tBounds.width - correctLeft - props.offset,
    },
    right: {
      top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop,
      left: bounds.left + bounds.width - correctLeft + props.offset,
    },
    bottom: {
      top: bounds.bottom - correctTop + props.offset,
      left: bounds.left - correctLeft,
    },
    'bottom-center': {
      top: bounds.bottom - correctTop + props.offset,
      left: bounds.left + (bounds.width / 2) - (tBounds.width / 2) - correctLeft,
    },
    top: {
      top: bounds.top - tBounds.height - props.offset - correctTop,
      left: bounds.left - correctLeft,
    },
    'top-center': {
      top: bounds.top - tBounds.height - props.offset - correctTop,
      left: bounds.left + (bounds.width / 2) - (tBounds.width / 2) - correctLeft,
    },
    'bottom-left': {
      top: bounds.bottom - correctTop + props.offset,
      left: bounds.left + bounds.width - tBounds.width - correctLeft,
    },
  };
  return r[props.position];
};

const positionTooltips = () => {
  if (!container.value || tooltipItems.value.length === 0) return;
  const bounds = container.value.getBoundingClientRect();
  const isTopPosition = props.position.startsWith('top');
  const viewportPadding = 8;
  const appContainer = chatAppId ? document.getElementById(chatAppId) : null;
  const appBounds = appContainer?.getBoundingClientRect();
  const boundaryTop = appBounds?.top ?? 0;
  const boundaryLeft = appBounds?.left ?? 0;
  const boundaryRight = appBounds?.right ?? window.innerWidth;
  const boundaryBottom = appBounds?.bottom ?? window.innerHeight;

  tooltipItems.value.forEach((tooltipEl, index) => {
    const tBounds = tooltipEl.getBoundingClientRect();
    const coords = getTooltipPosition(bounds, tBounds);
    const shift = index * (tBounds.height + STACK_GAP_PX);
    const rawTop = isTopPosition ? coords.top - shift : coords.top + shift;
    const minTop = boundaryTop + viewportPadding;
    const maxTop = boundaryBottom - tBounds.height - viewportPadding;
    const minLeft = boundaryLeft + viewportPadding;
    const maxLeft = boundaryRight - tBounds.width - viewportPadding;
    const clampedTop = Math.min(Math.max(rawTop, minTop), Math.max(minTop, maxTop));
    const clampedLeft = Math.min(Math.max(coords.left, minLeft), Math.max(minLeft, maxLeft));

    tooltipEl.style.top = `${clampedTop}px`;
    tooltipEl.style.left = `${clampedLeft}px`;
  });
};

const updatePosition = () => {
  if (props.trigger === 'auto') {
    return;
  }
  
  // Очищаем предыдущий таймер, если он есть
  if (showTimer.value) {
    clearTimeout(showTimer.value);
    showTimer.value = null;
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
  
  // Устанавливаем задержку перед показом
  showTimer.value = setTimeout(() => {
    show.value = true
    nextTick(() => {
      positionTooltips();
    })
    showTimer.value = null;
  }, props.delay)
}

const hideTooltip = () => {
  if (props.trigger === 'auto') {
    return;
  }
  
  // Очищаем таймер задержки показа, если он еще не сработал
  if (showTimer.value) {
    clearTimeout(showTimer.value);
    showTimer.value = null;
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
  
  show.value = false
  nextTick(() => {
    const tooltipEls = unref(tooltipItems)
    tooltipEls.forEach((tooltipEl) => {
      tooltipEl.style.top = '0';
      tooltipEl.style.left = '0';
    });
  })
}

const scheduleHide = () => {
  if (props.trigger === 'auto') {
    return;
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
  }
  hideTimer.value = setTimeout(() => {
    if (!isOverTrigger.value && !isOverTooltip.value) {
      hideTooltip();
    }
  }, HIDE_DELAY_MS);
};

const handleTriggerEnter = () => {
  isOverTrigger.value = true;
  updatePosition();
};

const handleTriggerLeave = () => {
  isOverTrigger.value = false;
  scheduleHide();
};

const handleTooltipEnter = () => {
  isOverTooltip.value = true;
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
};

const handleTooltipLeave = () => {
  isOverTooltip.value = false;
  scheduleHide();
};

const handleDocumentMouseDown = () => {
  if (!props.hideOnClick) {
    return;
  }

  isOverTrigger.value = false;
  isOverTooltip.value = false;

  if (props.trigger === 'auto') {
    clearAutoTimer();
    show.value = false;
    return;
  }

  hideTooltip();
};

const startAutoShow = () => {
  clearAutoTimer();
  show.value = true;
  nextTick(() => {
    positionTooltips();
  });
  
  if (props.autoShowDuration > 0) {
    autoTimer.value = setTimeout(() => {
      show.value = false;
    }, props.autoShowDuration);
  }
};

const clearAutoTimer = () => {
  if (autoTimer.value) {
    clearTimeout(autoTimer.value);
    autoTimer.value = null;
  }
};

// Очищаем таймеры при размонтировании компонента
onMounted(() => {
  if (props.hideOnClick) {
    document.addEventListener('mousedown', handleDocumentMouseDown, true);
  }
});

onUnmounted(() => {
  if (props.hideOnClick) {
    document.removeEventListener('mousedown', handleDocumentMouseDown, true);
  }
  if (showTimer.value) {
    clearTimeout(showTimer.value);
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
  }
  clearAutoTimer();
});

defineExpose({
  startAutoShow,
  clearAutoTimer,
  hide: hideTooltip,
})

</script>

<style scoped lang="scss">
@use './styles/Tooltip.scss';
</style>
