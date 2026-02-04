<template>
  <div 
    v-if="isLoading" 
    :class="[
      'loading-indicator',
      { 'loading-indicator--small': size === 'small' }
    ]"
  >
    <svg
      :width="svgWidth"
      :height="svgHeight"
      viewBox="-8 -8 120 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        class="dot dot-1"
        cx="51.75"
        cy="18.82"
        rx="12.18"
        ry="12.14"
      />
      <ellipse
        class="dot dot-2"
        cx="84.42"
        cy="42.24"
        rx="12.18"
        ry="12.14"
      />
      <ellipse
        class="dot dot-3"
        cx="72.00"
        cy="80.35"
        rx="12.18"
        ry="12.14"
      />
      <ellipse
        class="dot dot-4"
        cx="31.51"
        cy="80.35"
        rx="12.18"
        ry="12.14"
      />
      <ellipse
        class="dot dot-5"
        cx="18.86"
        cy="42.24"
        rx="12.18"
        ry="12.14"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'small'].includes(value)
  },
  position: {
    type: String,
    default: 'center',
    validator: (value) => ['center', 'top'].includes(value)
  }
});

const svgWidth = computed(() => props.size === 'small' ? '36px' : '120px');
const svgHeight = computed(() => props.size === 'small' ? '35px' : '116px');
</script>

<style scoped lang="scss">
@use './styles/LoadingIndicator.scss';
</style>
