<template>
  <span
    class="communication-panel-confirm-spinner"
    role="status"
    aria-label="Подтверждение"
  />
</template>

<style scoped lang="scss">
.communication-panel-confirm-spinner {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: communication-panel-confirm-spin 0.65s linear infinite;
}

@keyframes communication-panel-confirm-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
