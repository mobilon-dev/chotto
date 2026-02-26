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
      <span 
        v-if="show"
        ref="tooltip"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        :class="tooltipClasses" 
      >
        {{ text }}
      </span>
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
const tooltip = ref<HTMLElement>()
const show = ref(false)
const autoTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const showTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const props = defineProps({
  text: {
    type: String,
    required: true
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
  }
})

const tooltipClasses = computed(() => ({
  'tooltip__text': true,
  [`tooltip--${props.position}`]: true
}))

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
      if (container.value && tooltip.value){
        const t = tooltip.value
        const bounds = container.value.getBoundingClientRect()
        const tBounds = tooltip.value.getBoundingClientRect()
        const correctLeft = tBounds.left < 0 ? tBounds.left : 0
        const correctTop = tBounds.top < 0 ? tBounds.top : 0
        const r: Record<string, {top: number, left: number}> = {
          'left'  : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left - tBounds.width - correctLeft - props.offset},
          'right' : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left + bounds.width - correctLeft + props.offset},
          'bottom': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left - correctLeft},
          'bottom-center': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left + (bounds.width / 2) - (tBounds.width / 2) - correctLeft},
          'top'   : {top: bounds.top - tBounds.height - props.offset - correctTop, left: bounds?.left - correctLeft},
          'bottom-left': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left + bounds.width - tBounds.width - correctLeft},
        }
        t.style.top = r[props.position].top + 'px'
        t.style.left = r[props.position].left + 'px'
      }
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
    const t = unref(tooltip)
    if (t){
      t.style.top = '0'
      t.style.left = '0'
    }
  })
}

const startAutoShow = () => {
  clearAutoTimer();
  show.value = true;
  nextTick(() => {
    if (container.value && tooltip.value){
      const t = tooltip.value
      const bounds = container.value.getBoundingClientRect()
      const tBounds = tooltip.value.getBoundingClientRect()
      const correctLeft = tBounds.left < 0 ? tBounds.left : 0
      const correctTop = tBounds.top < 0 ? tBounds.top : 0
      const r: Record<string, {top: number, left: number}> = {
        'left'  : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left - tBounds.width - correctLeft - props.offset},
        'right' : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left + bounds.width - correctLeft + props.offset},
        'bottom': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left - correctLeft},
        'bottom-center': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left + (bounds.width / 2) - (tBounds.width / 2) - correctLeft},
        'top'   : {top: bounds.top - tBounds.height - props.offset - correctTop, left: bounds?.left - correctLeft},
        'bottom-left': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left + bounds.width - tBounds.width - correctLeft},
      }
      t.style.top = r[props.position].top + 'px'
      t.style.left = r[props.position].left + 'px'
    }
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
