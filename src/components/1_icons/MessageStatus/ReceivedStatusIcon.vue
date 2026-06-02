<template>
  <svg
    :class="iconClass"
    :style="iconStyle"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_7951_852)">
      <path
        d="M15.4423 5.44329C15.5004 5.38518 15.5465 5.31619 15.578 5.24027C15.6094 5.16434 15.6256 5.08297 15.6256 5.00079C15.6256 4.91861 15.6094 4.83723 15.578 4.76131C15.5465 4.68539 15.5004 4.6164 15.4423 4.55829C15.3842 4.50018 15.3152 4.45408 15.2393 4.42264C15.1634 4.39119 15.082 4.375 14.9998 4.375C14.9176 4.375 14.8363 4.39119 14.7603 4.42264C14.6844 4.45408 14.6154 4.50018 14.5573 4.55829L6.24981 12.867L2.31731 8.93329C2.2592 8.87518 2.19022 8.82908 2.11429 8.79764C2.03837 8.76619 1.95699 8.75 1.87481 8.75C1.70884 8.75 1.54967 8.81593 1.43231 8.93329C1.31495 9.05065 1.24902 9.20982 1.24902 9.37579C1.24902 9.54176 1.31495 9.70093 1.43231 9.81829L5.80731 14.1933C5.86537 14.2515 5.93434 14.2977 6.01027 14.3292C6.0862 14.3607 6.1676 14.3769 6.24981 14.3769C6.33202 14.3769 6.41342 14.3607 6.48936 14.3292C6.56529 14.2977 6.63426 14.2515 6.69231 14.1933L15.4423 5.44329ZM10.1823 14.1933L9.06231 13.072L9.94606 12.1883L10.6248 12.867L18.9323 4.55829C19.0497 4.44093 19.2088 4.375 19.3748 4.375C19.5408 4.375 19.7 4.44093 19.8173 4.55829C19.9347 4.67565 20.0006 4.83482 20.0006 5.00079C20.0006 5.16676 19.9347 5.32593 19.8173 5.44329L11.0673 14.1933C11.0093 14.2515 10.9403 14.2977 10.8644 14.3292C10.7884 14.3607 10.707 14.3769 10.6248 14.3769C10.5426 14.3769 10.4612 14.3607 10.3853 14.3292C10.3093 14.2977 10.2404 14.2515 10.1823 14.1933Z"
        fill="currentColor"
      />
      <path
        d="M6.69231 8.93329L7.81231 10.0545L6.92856 10.9383L5.80731 9.81829C5.68995 9.70093 5.62402 9.54176 5.62402 9.37579C5.62402 9.20982 5.68995 9.05065 5.80731 8.93329C5.92467 8.81593 6.08384 8.75 6.24981 8.75C6.41578 8.75 6.57495 8.81593 6.69231 8.93329Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_7951_852">
        <rect
          width="20"
          height="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

defineOptions({
  name: 'ReceivedStatusIcon',
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
  return `status-icon status-icon--received ${props.class}`.trim();
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
  color: var(--chotto-message-status-indicator-color-received, #5F5F5F);
}
</style>

