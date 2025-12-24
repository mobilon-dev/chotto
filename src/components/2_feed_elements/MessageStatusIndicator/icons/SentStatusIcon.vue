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
    <path
      d="M21.6469 5.69827C21.7196 5.77084 21.7774 5.85705 21.8167 5.95197C21.8561 6.04688 21.8764 6.14864 21.8764 6.2514C21.8764 6.35416 21.8561 6.45591 21.8167 6.55082C21.7774 6.64574 21.7196 6.73195 21.6469 6.80452L10.7094 17.742C10.6368 17.8148 10.5506 17.8725 10.4557 17.9119C10.3608 17.9513 10.259 17.9715 10.1563 17.9715C10.0535 17.9715 9.95175 17.9513 9.85683 17.9119C9.76192 17.8725 9.67571 17.8148 9.60314 17.742L4.13439 12.2733C3.98769 12.1266 3.90527 11.9276 3.90527 11.7201C3.90527 11.5127 3.98769 11.3137 4.13439 11.167C4.28108 11.0203 4.48005 10.9379 4.68751 10.9379C4.89497 10.9379 5.09394 11.0203 5.24064 11.167L10.1563 16.0842L20.5406 5.69827C20.6132 5.62552 20.6994 5.56779 20.7943 5.52841C20.8892 5.48902 20.991 5.46875 21.0938 5.46875C21.1965 5.46875 21.2983 5.48902 21.3932 5.52841C21.4881 5.56779 21.5743 5.62552 21.6469 5.69827Z"
      fill="currentColor"
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

defineOptions({
  name: 'SentStatusIcon',
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
  return `status-icon status-icon--sent ${props.class}`.trim();
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
  color: var(--chotto-message-status-indicator-icon-color, #5F5F5F);
}
</style>

