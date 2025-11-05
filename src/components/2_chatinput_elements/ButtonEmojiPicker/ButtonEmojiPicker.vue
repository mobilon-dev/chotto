<template>
  <button
    v-if="!getMessage().isRecording"
    ref="emojiButton"
    class="button"
    :class="{ 'button-disabled': state === 'disabled' }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span>
      <SmilesIcon />
    </span>
  </button>

  <Transition>
    <div
      v-show="isEmojiPickerVisible"
      ref="emoji"
      class="emoji"
      @mouseenter="handlePickerMouseEnter"
      @mouseleave="handlePickerMouseLeave"
    >
      <EmojiPicker
        :native="true"
        :theme="emojiTheme"
        picker-type=""
        @select="onSelectEmoji"
      />
    </div>
  </Transition>
</template>

<script setup>
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { onMounted, onUnmounted, ref, inject } from 'vue';
import { useMessageDraft } from '@/hooks';
import { SmilesIcon } from './icons';

const props = defineProps({
  state: {
    type: String,
    default: 'active',
  },
  mode: {
    type: String,
    default: 'click', // или 'hover'
    validator: (value) => ['click', 'hover'].includes(value),
  },
});

const emoji = ref(null);
const emojiButton = ref(null);
const isEmojiPickerVisible = ref(false);
const emojiTheme = ref('light');
const chatAppId = inject('chatAppId');
const { setMessageText, getMessage } = useMessageDraft(chatAppId);

// Вспомогательные флаги для hover-режима
let isMouseOverButton = false;
let isMouseOverPicker = false;

const changeThemeDialogEmoji = () => {
  const el = document.getElementById(chatAppId);
  return el?.getAttribute('data-theme')?.includes('dark') ? 'dark' : 'light';
};

const onSelectEmoji = (emojiObj) => {
  setMessageText(getMessage().text + emojiObj.i);
  if (props.mode === 'click') {
    isEmojiPickerVisible.value = false;
  }
};

// Общая функция открытия
const openPicker = () => {
  if (props.state !== 'active') return;
  emojiTheme.value = changeThemeDialogEmoji();
  isEmojiPickerVisible.value = true;
};

// Общая функция закрытия
const closePicker = () => {
  isEmojiPickerVisible.value = false;
};

// Обработчики событий
const handleClick = () => {
  if (props.mode === 'click') {
    isEmojiPickerVisible.value = !isEmojiPickerVisible.value;
    if (isEmojiPickerVisible.value) {
      openPicker();
    }
  }
};

const handleMouseEnter = () => {
  if (props.mode === 'hover') {
    isMouseOverButton = true;
    openPicker();
  }
};

const handleMouseLeave = () => {
  if (props.mode === 'hover') {
    isMouseOverButton = false;
    // Закрываем с задержкой, чтобы дать время перейти на пикер
    setTimeout(() => {
      if (!isMouseOverPicker && !isMouseOverButton) {
        closePicker();
      }
    }, 150);
  }
};

const handlePickerMouseEnter = () => {
  if (props.mode === 'hover') {
    isMouseOverPicker = true;
  }
};

const handlePickerMouseLeave = () => {
  if (props.mode === 'hover') {
    isMouseOverPicker = false;
    setTimeout(() => {
      if (!isMouseOverButton && !isMouseOverPicker) {
        closePicker();
      }
    }, 150);
  }
};

// Закрытие по клику вне (только для click-режима)
const handleClickOutside = (event) => {
  if (
    props.mode === 'click' &&
    isEmojiPickerVisible.value &&
    emojiButton.value &&
    emoji.value &&
    !emojiButton.value.contains(event.target) &&
    !emoji.value.contains(event.target)
  ) {
    closePicker();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use './styles/ButtonEmojiPicker.scss';
</style>