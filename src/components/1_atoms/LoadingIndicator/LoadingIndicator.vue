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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="dot dot-1"
        cx="84.71"
        cy="43.91"
        r="12.18"
        stroke="url(#paint0_linear_10781_5111)"
      />
      <circle
        class="dot dot-2"
        cx="73.05"
        cy="82.12"
        r="12.18"
        stroke="url(#paint1_linear_10781_5111)"
      />
      <circle
        class="dot dot-3"
        cx="32.24"
        cy="82.12"
        r="12.18"
        stroke="url(#paint2_linear_10781_5111)"
      />
      <circle
        class="dot dot-4"
        cx="19.29"
        cy="43.91"
        r="12.18"
        stroke="url(#paint3_linear_10781_5111)"
      />
      <circle
        class="dot dot-5"
        cx="52.76"
        cy="19.29"
        r="12.18"
        stroke="url(#paint4_linear_10781_5111)"
      />
      <defs>
        <linearGradient id="paint0_linear_10781_5111" x1="18.12" y1="10.7" x2="85.37" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="#426CFF"/>
          <stop offset="1" stop-color="#734AFD"/>
        </linearGradient>
        <linearGradient id="paint1_linear_10781_5111" x1="18.12" y1="10.7" x2="85.37" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="#426CFF"/>
          <stop offset="1" stop-color="#734AFD"/>
        </linearGradient>
        <linearGradient id="paint2_linear_10781_5111" x1="18.12" y1="10.7" x2="85.37" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="#426CFF"/>
          <stop offset="1" stop-color="#734AFD"/>
        </linearGradient>
        <linearGradient id="paint3_linear_10781_5111" x1="18.12" y1="10.7" x2="85.37" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="#426CFF"/>
          <stop offset="1" stop-color="#734AFD"/>
        </linearGradient>
        <linearGradient id="paint4_linear_10781_5111" x1="18.12" y1="10.7" x2="85.37" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="#426CFF"/>
          <stop offset="1" stop-color="#734AFD"/>
        </linearGradient>
      </defs>
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
