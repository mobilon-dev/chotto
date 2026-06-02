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
    <g clip-path="url(#clip0_8155_1633)">
      <path
        d="M15.4433 5.44329C15.5014 5.38518 15.5475 5.31619 15.5789 5.24027C15.6104 5.16434 15.6266 5.08297 15.6266 5.00079C15.6266 4.91861 15.6104 4.83723 15.5789 4.76131C15.5475 4.68539 15.5014 4.6164 15.4433 4.55829C15.3852 4.50018 15.3162 4.45408 15.2403 4.42264C15.1643 4.39119 15.083 4.375 15.0008 4.375C14.9186 4.375 14.8372 4.39119 14.7613 4.42264C14.6854 4.45408 14.6164 4.50018 14.5583 4.55829L6.25079 12.867L2.31829 8.93329C2.26018 8.87518 2.19119 8.82908 2.11527 8.79763C2.03934 8.76619 1.95797 8.75 1.87579 8.75C1.70982 8.75 1.55065 8.81593 1.43329 8.93329C1.31593 9.05065 1.25 9.20982 1.25 9.37579C1.25 9.54176 1.31593 9.70093 1.43329 9.81829L5.80829 14.1933C5.86635 14.2515 5.93532 14.2977 6.01125 14.3292C6.08718 14.3607 6.16858 14.3769 6.25079 14.3769C6.333 14.3769 6.4144 14.3607 6.49033 14.3292C6.56626 14.2977 6.63523 14.2515 6.69329 14.1933L15.4433 5.44329ZM10.1833 14.1933L9.06329 13.072L9.94704 12.1883L10.6258 12.867L18.9333 4.55829C19.0506 4.44093 19.2098 4.375 19.3758 4.375C19.5418 4.375 19.7009 4.44093 19.8183 4.55829C19.9356 4.67565 20.0016 4.83482 20.0016 5.00079C20.0016 5.16676 19.9356 5.32593 19.8183 5.44329L11.0683 14.1933C11.0102 14.2515 10.9413 14.2977 10.8653 14.3292C10.7894 14.3607 10.708 14.3769 10.6258 14.3769C10.5436 14.3769 10.4622 14.3607 10.3862 14.3292C10.3103 14.2977 10.2413 14.2515 10.1833 14.1933Z"
        fill="currentColor"
      />
      <path
        d="M6.69329 8.93329L7.81329 10.0545L6.92954 10.9383L5.80829 9.81829C5.69093 9.70093 5.625 9.54176 5.625 9.37579C5.625 9.20982 5.69093 9.05065 5.80829 8.93329C5.92565 8.81593 6.08482 8.75 6.25079 8.75C6.41676 8.75 6.57593 8.81593 6.69329 8.93329Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_8155_1633">
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
  name: 'ReadStatusIcon',
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
  return `status-icon status-icon--read ${props.class}`.trim();
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
  color: var(--chotto-message-status-indicator-color-read, #5F5F5F);
}
</style>

