<template>
  <div 
    v-if="isLoading" 
    class="messages-loading-indicator"
  >
    <svg
      width="120px"
      height="116px"
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
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped lang="scss">
@use './styles/LoadingIndicator.scss';
</style>
