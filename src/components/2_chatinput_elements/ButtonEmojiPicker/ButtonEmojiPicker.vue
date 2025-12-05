<template>
  <button
    v-if="!getMessage().isRecording"
    ref="emojiButton"
    class="button"
    :class="{ 'button-disabled': state === 'disabled' }"
    @click="handleClick"
    @mouseenter="handleMouseEnterWithHover"
    @mouseleave="handleMouseLeaveWithHover"
  >
    <span>
      <SmilesIcon :fill="currentIconColor" />
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
        :native="native"
        :theme="emojiTheme"
        picker-type=""
        @select="onSelectEmoji"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker-ru';
import 'vue3-emoji-picker-ru/css';
import { onMounted, onUnmounted, ref, computed, watchEffect, inject } from 'vue';
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
    validator: (value: string) => ['click', 'hover'].includes(value),
  },
  native: {
    type: Boolean,
    default: true,
  },
});

const emoji = ref<HTMLElement | null>(null);
const emojiButton = ref<HTMLButtonElement | null>(null);
const isEmojiPickerVisible = ref(false);
const emojiTheme = ref<'light' | 'dark'>('light');
const chatAppId = inject<string>('chatAppId');
const { setMessageText, getMessage } = useMessageDraft(chatAppId as string);

const iconFillColor = ref('#5F5F5F');
const iconHoverColor = ref('#404040');
const isHovered = ref(false);
let themeObserver: MutationObserver | null = null;

const updateIconColor = () => {
  if (!chatAppId) {
    iconFillColor.value = '#5F5F5F';
    iconHoverColor.value = '#404040';
    return;
  }
  const element = document.getElementById(chatAppId as string);
  if (!element) {
    iconFillColor.value = '#5F5F5F';
    iconHoverColor.value = '#404040';
    return;
  }
  const computedStyle = window.getComputedStyle(element);
  const color = computedStyle.getPropertyValue('--chotto-buttonemojipicker-button-span-color').trim();
  const hoverColor = computedStyle.getPropertyValue('--chotto-buttonemojipicker-button-span-hover-color').trim();
  iconFillColor.value = color || '#5F5F5F';
  iconHoverColor.value = hoverColor || '#404040';
};

const currentIconColor = computed(() => {
  return isHovered.value ? iconHoverColor.value : iconFillColor.value;
});

watchEffect(() => {
  updateIconColor();
})

// Вспомогательные флаги для hover-режима
let isMouseOverButton = false;
let isMouseOverPicker = false;

const changeThemeDialogEmoji = (): 'light' | 'dark' => {
  const el = document.getElementById(chatAppId as string);
  return el?.getAttribute('data-theme')?.includes('dark') ? 'dark' : 'light';
};

const onSelectEmoji = (emojiObj: { i: string }) => {
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

const handleMouseEnterWithHover = () => {
  isHovered.value = true;
  handleMouseEnter();
};

const handleMouseLeaveWithHover = () => {
  isHovered.value = false;
  handleMouseLeave();
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
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.mode === 'click' &&
    isEmojiPickerVisible.value &&
    emojiButton.value &&
    emoji.value &&
    event.target instanceof Node &&
    !emojiButton.value.contains(event.target) &&
    !emoji.value.contains(event.target)
  ) {
    closePicker();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Принудительно обновляем цвет после монтирования
  updateIconColor();
  
  // Настраиваем MutationObserver для отслеживания изменений темы
  if (chatAppId) {
    const element = document.getElementById(chatAppId as string);
    if (element) {
      themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            updateIconColor();
          }
        });
      });
      
      themeObserver.observe(element, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
});
</script>

<style scoped lang="scss">
@use './styles/ButtonEmojiPicker.scss';
</style>