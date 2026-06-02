<template>
  <svg
    :class="iconClass"
    :style="iconStyle"
    width="16"
    height="16"
    viewBox="2 2 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

defineOptions({
  name: 'PendingStatusIcon',
});

const props = defineProps({
  size: {
    type: [String, Number],
    default: 'inherit',
  },
  class: {
    type: String,
    default: '',
  },
});

const iconClass = computed(() => {
  return `status-icon status-icon--pending ${props.class}`.trim();
});

const iconStyle = computed(() => {
  if (props.size === 'inherit') {
    return {};
  }
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return {
    width: size,
    height: size,
  };
});
</script>

<style scoped lang="scss">
.status-icon {
  display: inline-block;
  flex-shrink: 0;
  width: var(--chotto-message-status-indicator-icon-size, 12px);
  height: var(--chotto-message-status-indicator-icon-size, 12px);
  line-height: 1;
  color: var(--chotto-message-status-indicator-color-pending, #9ca3af);
}
</style>

