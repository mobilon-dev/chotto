<template>
  <div
    class="feed-keyboard__container"
    :class="[
      `feed-keyboard__container--${align}`
    ]"
  >
    <div
      v-for="button in sortedButtons"
      :key="button.key"
      class="feed-keyboard__button"
      :style="{
        'box-shadow': button['shadow-color'] && button['shadow-color'] !== 'none'
          ? `0px 4px 4px ${button['shadow-color']}, 0px 1px 2px ${button['shadow-color']}`
          : 'none',
        'color': button['text-color'] || 'inherit'
      }"
      @click="handleClick(button)"
    >
      <p>{{ button.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IFeedKeyboard } from './types/IFeedKeyboard';

const props = defineProps({
  buttons: {
    type: Array as () => IFeedKeyboard[],
    required: true,
    default: () => []
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  }
});

const emit = defineEmits(['action']);

const sortedButtons = computed(() => {
  return [...props.buttons].sort((a, b) => a.order - b.order);
});

const handleClick = (button: IFeedKeyboard) => {
  if (typeof button.action === 'function') {
    button.action();
  } else if (button.action != null) {
    emit('action', button.action);
  }
};
</script>

<style scoped lang="scss">
@use './styles/FeedKeyboard.scss';
</style>