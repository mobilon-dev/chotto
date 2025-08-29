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
import { useTheme } from '../../helpers/useTheme';

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
      const r = {
        'left'  : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left - tBounds.width - correctLeft - props.offset},
        'right' : {top: bounds.top - ((tBounds.height - bounds.height) / 2) - correctTop, left: bounds?.left + bounds.width - correctLeft + props.offset},
        'bottom': {top: bounds?.bottom - correctTop + props.offset, left: bounds?.left - correctLeft},
        'top'   : {top: bounds.top - tBounds.height - props.offset - correctTop, left: bounds?.left - correctLeft},
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

.tooltip__text {
  max-width: 300px;
  color: var(--chotto-tooltip-text-color);
  text-align: center;
  padding: 7px;
  border-radius: 8px;
  background: var(--chotto-tooltip-bg-color);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99999;
  font-family: var(--chotto-container-font-family);
  font-weight: var(--chotto-container-font-weight);
}

.tooltip-wrapper {
  position: relative;
  width: fit-content;
}

.tooltip__text::after {
  content: " ";
  position: absolute;
  border-width: 5px;
  border-style: solid;
  border-color: var(--chotto-tooltip-bg-color) transparent transparent transparent;
}

.tooltip--left::after {
  inset-block-start: 50%;
  inset-inline-start: 100%;
  border-color: transparent transparent transparent var(--chotto-tooltip-bg-color);
}

.tooltip--right::after {
  inset-block-start: 50%;
  inset-inline-end: 100%;
  border-color: transparent var(--chotto-tooltip-bg-color) transparent transparent;
}

.tooltip--top::after {
  inset-block-start: 100%;
  inset-inline-start: 50%;
  border-color: var(--chotto-tooltip-bg-color) transparent transparent  transparent;
}

.tooltip--bottom::after {
  inset-block-end: 100%;
  inset-inline-start: 50%;
  border-color: transparent transparent var(--chotto-tooltip-bg-color) transparent;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>