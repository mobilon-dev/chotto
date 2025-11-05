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
import { computed, ref, unref, inject, nextTick } from 'vue';
// import { onMounted } from 'vue';
import { useTheme } from '@/hooks';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const container = ref<HTMLElement>() 
const tooltip = ref<HTMLElement>()
const show = ref(false)

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
  }
})

const tooltipClasses = computed(() => ({
  'tooltip__text': true,
  [`tooltip--${props.position}`]: true
}))

const updatePosition = () => {
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
        'top'   : {top: bounds.top - tBounds.height - props.offset - correctTop, left: bounds?.left - correctLeft},
        'bottom-left': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left + bounds.width - tBounds.width - correctLeft},
      }
      t.style.top = r[props.position].top + 'px'
      t.style.left = r[props.position].left + 'px'
    }
  })
}

const hideTooltip = () => {
  show.value = false
  nextTick(() => {
    const t = unref(tooltip)
    if (t){
      t.style.top = '0'
      t.style.left = '0'
    }
  })
  
}

</script>

<style scoped lang="scss">
@use './styles/Tooltip.scss';
</style>
