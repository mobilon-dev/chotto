<template>
  <svg
    :class="iconClass"
    :style="iconStyle"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_7935_4)">
      <path
        d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
        fill="currentColor"
      />
      <path
        d="M7.00195 11.0011C7.00195 10.8698 7.02782 10.7397 7.07807 10.6184C7.12833 10.4971 7.20199 10.3868 7.29485 10.294C7.38771 10.2011 7.49794 10.1275 7.61927 10.0772C7.7406 10.027 7.87063 10.0011 8.00195 10.0011C8.13328 10.0011 8.26331 10.027 8.38464 10.0772C8.50596 10.1275 8.6162 10.2011 8.70906 10.294C8.80192 10.3868 8.87558 10.4971 8.92583 10.6184C8.97609 10.7397 9.00195 10.8698 9.00195 11.0011C9.00195 11.2663 8.8966 11.5207 8.70906 11.7082C8.52152 11.8957 8.26717 12.0011 8.00195 12.0011C7.73674 12.0011 7.48238 11.8957 7.29485 11.7082C7.10731 11.5207 7.00195 11.2663 7.00195 11.0011ZM7.09995 4.99609C7.08664 4.86993 7.09999 4.74239 7.13915 4.62172C7.17831 4.50106 7.24241 4.38998 7.32727 4.29568C7.41214 4.20139 7.51588 4.12599 7.63176 4.07438C7.74765 4.02276 7.87309 3.99609 7.99995 3.99609C8.12681 3.99609 8.25226 4.02276 8.36814 4.07438C8.48403 4.12599 8.58777 4.20139 8.67263 4.29568C8.7575 4.38998 8.82159 4.50106 8.86075 4.62172C8.89991 4.74239 8.91327 4.86993 8.89995 4.99609L8.54995 8.50309C8.53819 8.64087 8.47516 8.76921 8.37331 8.86273C8.27146 8.95625 8.13823 9.00815 7.99995 9.00815C7.86168 9.00815 7.72844 8.95625 7.6266 8.86273C7.52475 8.76921 7.46171 8.64087 7.44995 8.50309L7.09995 4.99609Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_7935_4">
        <rect
          width="16"
          height="16"
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
  name: 'ErrorStatusIcon',
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
  return `status-icon status-icon--error ${props.class}`.trim();
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
  color: var(--chotto-message-status-indicator-color-error, #ef4444);
}
</style>

