<template>
  <button
    v-if="!getMessage().isRecording"
    ref="stickerButton"
    class="button"
    :class="{ 'button-disabled': state === 'disabled' }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span>
      <StickerIcon />
    </span>
  </button>

  <Transition>
    <div
      v-show="isStickerPickerVisible"
      ref="stickerPicker"
      class="sticker-picker"
      @mouseenter="handlePickerMouseEnter"
      @mouseleave="handlePickerMouseLeave"
    >
      <div class="sticker-picker__container">
        <!-- Вкладки -->
        <div
          v-if="hasTabs"
          ref="tabsContainer"
          class="sticker-picker__tabs"
          @wheel="handleTabsWheel"
        >
          <button
            v-for="(tab, tabIndex) in stickerTabs"
            :key="tabIndex"
            class="sticker-picker__tab"
            :class="{ 'sticker-picker__tab--active': activeTabIndex === tabIndex }"
            @click="activeTabIndex = tabIndex"
          >
            <img
              v-if="tab.iconUrl"
              :src="tab.iconUrl"
              :alt="tab.label || `Tab ${tabIndex + 1}`"
              class="sticker-picker__tab-icon"
            >
            <span
              v-else
              class="sticker-picker__tab-icon-placeholder"
            >
              <StickerIcon />
            </span>
          </button>
        </div>

        <!-- Контент стикеров -->
        <div class="sticker-picker__content">
          <div
            v-if="currentStickers.length === 0"
            class="sticker-picker__empty"
          >
            {{ emptyText }}
          </div>
          <div
            v-else
            class="sticker-picker__grid"
          >
            <button
              v-for="(sticker, index) in currentStickers"
              :key="index"
              class="sticker-picker__item"
              @click="handleStickerClick(sticker, $event)"
              @mousedown="handleStickerMouseDown(sticker, $event)"
              @mouseup="handleStickerMouseUp"
              @mouseleave="handleStickerMouseLeave"
              @touchstart="handleStickerTouchStart(sticker, $event)"
              @touchend="handleStickerTouchEnd"
              @touchcancel="handleStickerTouchEnd"
            >
              <img
                :src="sticker.url"
                :alt="sticker.alt || `Sticker ${index + 1}`"
                class="sticker-picker__image"
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Предпросмотр стикера -->
  <Transition name="preview">
    <div
      v-if="previewSticker"
      ref="previewElement"
      class="sticker-picker__preview"
      :style="previewStyle"
      @click="handlePreviewClick"
    >
      <img
        :src="previewSticker.url"
        :alt="previewSticker.alt || 'Preview'"
        class="sticker-picker__preview-image"
      >
      <div
        v-if="previewSticker.alt"
        class="sticker-picker__preview-label"
      >
        {{ previewSticker.alt }}
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref, inject, computed, watch } from 'vue';
import { useMessageDraft } from '@/hooks';
import { StickerIcon } from './icons';

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
  stickers: {
    type: Array,
    default: () => [],
    // Поддерживаем два формата:
    // 1. Массив стикеров: [{ url, alt? }, ...]
    // 2. Массив наборов (вкладок): [[{ url, alt? }, ...], ...] или [{ stickers: [...], label?, iconUrl? }, ...]
  },
  emptyText: {
    type: String,
    default: 'Нет доступных стикеров',
  },
});

const stickerPicker = ref(null);
const stickerButton = ref(null);
const tabsContainer = ref(null);
const previewElement = ref(null);
const isStickerPickerVisible = ref(false);
const activeTabIndex = ref(0);
const chatAppId = inject('chatAppId');
const { getMessage, setMessageFile, setForceSendMessage } = useMessageDraft(chatAppId);

// Состояние для предпросмотра
const previewSticker = ref(null);
const previewStyle = ref({});
const longPressTimer = ref(null);
const longPressDelay = 500; // 500ms для долгого нажатия
const isLongPress = ref(false);
const currentStickerElement = ref(null);

// Вспомогательные флаги для hover-режима
let isMouseOverButton = false;
let isMouseOverPicker = false;

// Нормализация данных стикеров
const normalizeStickerData = () => {
  if (!props.stickers || props.stickers.length === 0) {
    return { hasTabs: false, tabs: [] };
  }

  // Проверяем, является ли первый элемент массивом или объектом с массивом
  const firstItem = props.stickers[0];
  const isArrayOfArrays = Array.isArray(firstItem);
  const isArrayOfObjects = firstItem && typeof firstItem === 'object' && firstItem.stickers;

  if (isArrayOfArrays) {
    // Формат: [[{ url, alt? }, ...], ...]
    return {
      hasTabs: true,
      tabs: props.stickers.map((stickerArray, index) => ({
        id: `tab-${index}`,
        label: `Set ${index + 1}`,
        stickers: stickerArray,
        iconUrl: stickerArray && stickerArray.length > 0 ? stickerArray[0].url : null,
      })),
    };
  } else if (isArrayOfObjects && firstItem.stickers) {
    // Формат: [{ stickers: [...], label?, iconUrl? }, ...]
    return {
      hasTabs: true,
      tabs: props.stickers.map((tab, index) => ({
        id: tab.id || `tab-${index}`,
        label: tab.label || `Set ${index + 1}`,
        stickers: tab.stickers || [],
        iconUrl: tab.iconUrl || (tab.stickers && tab.stickers.length > 0 ? tab.stickers[0].url : null),
      })),
    };
  } else {
    // Формат: [{ url, alt? }, ...] - один набор стикеров
    return {
      hasTabs: true,
      tabs: [{
        id: 'default',
        label: 'Stickers',
        stickers: props.stickers,
        iconUrl: props.stickers.length > 0 ? props.stickers[0].url : null,
      }],
    };
  }
};

const stickerData = computed(() => normalizeStickerData());
const hasTabs = computed(() => stickerData.value.hasTabs && stickerData.value.tabs.length > 0);
const stickerTabs = computed(() => stickerData.value.tabs);
const currentStickers = computed(() => {
  if (stickerTabs.value.length === 0) return [];
  return stickerTabs.value[activeTabIndex.value]?.stickers || [];
});

// Сброс активной вкладки при изменении данных
watch(() => props.stickers, () => {
  if (activeTabIndex.value >= stickerTabs.value.length) {
    activeTabIndex.value = 0;
  }
}, { deep: true });

// Определение типа файла по расширению URL
const getFileTypeFromUrl = (url) => {
  if (!url) return 'image';
  const urlLower = url.toLowerCase();
  if (urlLower.endsWith('.tgs')) {
    return 'sticker'; // TGS - анимированные стикеры Telegram
  } else if (urlLower.endsWith('.webp')) {
    return 'sticker'; // WebP - статические стикеры
  }
  return 'image'; // По умолчанию считаем изображением
};

const onSelectSticker = (sticker) => {
  if (props.state === 'disabled') return;
  
  // Определяем тип файла
  const fileType = getFileTypeFromUrl(sticker.url);
  
  // Устанавливаем стикер как файл
  setMessageFile({
    url: sticker.url,
    name: sticker.alt || `sticker.${fileType === 'sticker' ? (sticker.url.toLowerCase().endsWith('.tgs') ? 'tgs' : 'webp') : 'png'}`,
    type: fileType,
  });
  
  // Принудительно отправляем сообщение
  setForceSendMessage(true);
  
  // Закрываем пикер после выбора
  if (props.mode === 'click') {
    isStickerPickerVisible.value = false;
  }
};

// Обработка долгого нажатия на стикер
const handleStickerMouseDown = (sticker, event) => {
  currentStickerElement.value = event.currentTarget;
  isLongPress.value = false;
  
  // Очищаем предыдущий таймер
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
  }
  
  // Устанавливаем таймер для долгого нажатия
  longPressTimer.value = setTimeout(() => {
    isLongPress.value = true;
    showPreview(sticker);
  }, longPressDelay);
};

const handleStickerMouseUp = () => {
  clearLongPressTimer();
  
  // Если это было долгое нажатие, не отправляем стикер
  if (isLongPress.value) {
    isLongPress.value = false;
    // Предпросмотр останется видимым, пока пользователь не кликнет на него или вне его
    return;
  }
};

const handleStickerMouseLeave = () => {
  // Если это долгое нажатие и предпросмотр показан, не скрываем его
  // (пользователь может двигать мышью, и курсор может быть над предпросмотром)
  if (isLongPress.value && previewSticker.value) {
    return;
  }
  clearLongPressTimer();
  hidePreview();
};

const handleStickerTouchStart = (sticker, event) => {
  handleStickerMouseDown(sticker, event);
};

const handleStickerTouchEnd = () => {
  handleStickerMouseUp();
};

const handleStickerClick = (sticker, event) => {
  // Если это было долгое нажатие, не отправляем стикер
  if (isLongPress.value) {
    event.preventDefault();
    event.stopPropagation();
    isLongPress.value = false;
    hidePreview();
    return;
  }
  
  // Обычный клик - отправляем стикер
  onSelectSticker(sticker);
};

const clearLongPressTimer = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
};

const showPreview = (sticker) => {
  previewSticker.value = sticker;
  
  // Позиционируем предпросмотр в центре экрана
  previewStyle.value = {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
};

const hidePreview = () => {
  previewSticker.value = null;
  previewStyle.value = {};
};

const handlePreviewClick = () => {
  if (previewSticker.value) {
    onSelectSticker(previewSticker.value);
    hidePreview();
  }
};

// Общая функция открытия
const openPicker = () => {
  if (props.state !== 'active') return;
  isStickerPickerVisible.value = true;
};

// Общая функция закрытия
const closePicker = () => {
  isStickerPickerVisible.value = false;
};

// Обработчики событий
const handleClick = () => {
  if (props.mode === 'click') {
    isStickerPickerVisible.value = !isStickerPickerVisible.value;
    if (isStickerPickerVisible.value) {
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

// Обработчик прокрутки колесиком мыши для вкладок
const handleTabsWheel = (event) => {
  if (!tabsContainer.value) return;
  
  // Если есть горизонтальная прокрутка (shift + колесико), используем её
  // Иначе преобразуем вертикальную прокрутку в горизонтальную
  const scrollDelta = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) 
    ? event.deltaX 
    : event.deltaY;
  
  // Прокручиваем контейнер вкладок
  tabsContainer.value.scrollLeft += scrollDelta;
  
  // Предотвращаем прокрутку родительского элемента
  event.preventDefault();
};

// Закрытие по клику вне (только для click-режима)
const handleClickOutside = (event) => {
  if (
    props.mode === 'click' &&
    isStickerPickerVisible.value &&
    stickerButton.value &&
    stickerPicker.value &&
    !stickerButton.value.contains(event.target) &&
    !stickerPicker.value.contains(event.target)
  ) {
    closePicker();
  }
  
  // Скрываем предпросмотр при клике вне стикера
  if (previewSticker.value && previewElement.value && !previewElement.value.contains(event.target)) {
    hidePreview();
  }
};

// Глобальный обработчик для отслеживания отпускания кнопки мыши
const handleGlobalMouseUp = () => {
  // Если это было долгое нажатие и предпросмотр показан, сбрасываем флаг
  // Предпросмотр останется видимым до клика на него или вне его
  if (isLongPress.value) {
    isLongPress.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('mouseup', handleGlobalMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('mouseup', handleGlobalMouseUp);
  clearLongPressTimer();
  hidePreview();
});
</script>

<style scoped lang="scss">
@use './styles/StickerPicker.scss';
</style>

