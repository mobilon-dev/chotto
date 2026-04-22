<template>
  <div 
    ref="container" 
    class="tooltip-wrapper" 
    @mouseover="updatePosition"
    @mouseout="hideTooltip"
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
        >
          {{ tooltipText }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, unref, inject, nextTick, onUnmounted } from 'vue';
// import { onMounted } from 'vue';
import { useTheme } from '@/hooks';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const container = ref<HTMLElement>() 
const tooltipItems = ref<HTMLElement[]>([])
const show = ref(false)
const autoTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const showTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const STACK_GAP_PX = 6

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

  tooltipItems.value.forEach((tooltipEl, index) => {
    const tBounds = tooltipEl.getBoundingClientRect();
    const coords = getTooltipPosition(bounds, tBounds);
    const shift = index * (tBounds.height + STACK_GAP_PX);
    const top = isTopPosition ? coords.top - shift : coords.top + shift;
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${coords.left}px`;
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
  
  show.value = false
  nextTick(() => {
    const tooltipEls = unref(tooltipItems)
    tooltipEls.forEach((tooltipEl) => {
      tooltipEl.style.top = '0';
      tooltipEl.style.left = '0';
    });
  })
}

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
onUnmounted(() => {
  if (showTimer.value) {
    clearTimeout(showTimer.value);
  }
  clearAutoTimer();
});

defineExpose({
  startAutoShow,
  clearAutoTimer
})

</script>

<style scoped lang="scss">
@use './styles/Tooltip.scss';
</style>
