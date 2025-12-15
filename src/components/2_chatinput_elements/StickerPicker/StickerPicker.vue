<template>
  <button
    v-if="!getMessage().isRecording"
    ref="stickerButton"
    class="button"
    :class="{ 'button-disabled': state === 'disabled' }"
    @click="handleClick"
    @mouseenter="handleMouseEnterWithHover"
    @mouseleave="handleMouseLeaveWithHover"
  >
    <span>
      <StickerIcon :fill="currentIconColor" />
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
          @wheel.passive="handleTabsWheel"
        >
          <button
            v-for="(tab, tabIndex) in stickerTabs"
            :key="tabIndex"
            class="sticker-picker__tab"
            :class="{ 'sticker-picker__tab--active': activeTabIndex === tabIndex }"
            @click="activeTabIndex = tabIndex"
            @mouseenter="handleTabMouseEnter(tabIndex)"
            @mouseleave="handleTabMouseLeave(tabIndex)"
          >
            <!-- TGS анимированные стикеры для иконок вкладок -->
            <tgs-player
              v-if="tab.iconUrl && isAnimatedSticker(tab.iconUrl) && tgsLibsLoaded"
              :ref="(el: unknown) => setTgsTabPlayerRef(tabIndex, el)"
              :src="tab.iconUrl"
              class="sticker-picker__tab-icon sticker-picker__tab-icon-animated"
              loop
              mode="normal"
            />
            <!-- WebP и другие статические стикеры для иконок вкладок -->
            <img
              v-else-if="tab.iconUrl"
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
              @click="handleStickerClick(sticker)"
              @mouseenter="handleStickerMouseEnter(sticker, index)"
              @mouseleave="handleStickerMouseLeave"
            >
              <!-- TGS анимированные стикеры -->
              <tgs-player
                v-if="isTgsSticker(sticker) && tgsLibsLoaded"
                :ref="(el: unknown) => setTgsPlayerRef(index, el)"
                :src="sticker.url"
                class="sticker-picker__image sticker-picker__image-animated"
                loop
                mode="normal"
              />
              <!-- WebP и другие статические стикеры -->
              <img
                v-else
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
      <!-- TGS анимированные стикеры -->
      <tgs-player
        v-if="isTgsSticker(previewSticker) && tgsLibsLoaded"
        :src="previewSticker.url"
        class="sticker-picker__preview-image sticker-picker__preview-image-animated"
        autoplay
        loop
        mode="normal"
      />
      <!-- WebP и другие статические стикеры -->
      <img
        v-else
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

<script setup lang="ts">
import { onMounted, onUnmounted, ref, inject, computed, watch, watchEffect } from 'vue';
import { useMessageDraft } from '@/hooks';
import { StickerIcon } from './icons';
import { isAnimatedSticker } from '@/components/2_feed_elements/StickerMessage/utils/stickerUtils';
import '@/components/2_feed_elements/StickerMessage/utils/suppress-lit-warning';

interface Sticker {
  url: string;
  alt?: string;
}

interface StickerTab {
  id?: string;
  label?: string;
  stickers: Sticker[];
  iconUrl?: string | null;
}

type StickerData = Sticker[] | Sticker[][] | StickerTab[];

const props = withDefaults(defineProps<{
  state?: string;
  mode?: 'click' | 'hover';
  stickers?: StickerData;
  emptyText?: string;
}>(), {
  state: 'active',
  mode: 'click',
  stickers: () => [],
  emptyText: 'Нет доступных стикеров',
});

const stickerPicker = ref<HTMLElement | null>(null);
const stickerButton = ref<HTMLButtonElement | null>(null);
const tabsContainer = ref<HTMLElement | null>(null);
const previewElement = ref<HTMLElement | null>(null);
const isStickerPickerVisible = ref(false);
const activeTabIndex = ref(0);
const chatAppId = inject<string>('chatAppId');
const { getMessage, setMessageFile, setForceSendMessage } = useMessageDraft(chatAppId as string);

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
  const color = computedStyle.getPropertyValue('--chotto-stickerpicker-button-span-color').trim();
  const hoverColor = computedStyle.getPropertyValue('--chotto-stickerpicker-button-span-hover-color').trim();
  iconFillColor.value = color || '#5F5F5F';
  iconHoverColor.value = hoverColor || '#404040';
};

const currentIconColor = computed(() => {
  return isHovered.value ? iconHoverColor.value : iconFillColor.value;
});

watchEffect(() => {
  updateIconColor();
})

// Состояние для предпросмотра
const previewSticker = ref<Sticker | null>(null);
const previewStyle = ref<Record<string, string>>({});
const previewTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const previewDelay = 700; // время для показа предпросмотра при наведении

// Хранилище ссылок на tgs-player элементы для управления анимацией
const tgsPlayerRefs = ref(new Map<number, { play?: () => void; pause?: () => void }>());
// Хранилище ссылок на tgs-player элементы вкладок для управления анимацией
const tgsTabPlayerRefs = ref(new Map<number, { play?: () => void; pause?: () => void }>());

// Вспомогательные флаги для hover-режима
let isMouseOverButton = false;
let isMouseOverPicker = false;

// Оптимизация: динамическая загрузка библиотек TGS только при необходимости
// Библиотеки tgs-player и lottie-player весят ~700KB, поэтому загружаем их только
// когда в стикерах действительно есть TGS файлы
const tgsLibsLoaded = ref(false);
const tgsLibsLoading = ref(false);

// Динамическая загрузка библиотек TGS только при необходимости
async function loadTgsLibs() {
  if (tgsLibsLoaded.value || tgsLibsLoading.value) return;
  
  tgsLibsLoading.value = true;
  try {
    await import('@/components/2_feed_elements/StickerMessage/libs/tgs-player/lottie-player.esm.js');
    await import('@/components/2_feed_elements/StickerMessage/libs/tgs-player/tgs-player.esm.js');
    tgsLibsLoaded.value = true;
  } catch (error) {
    console.error('Failed to load TGS libraries:', error);
  } finally {
    tgsLibsLoading.value = false;
  }
}

// Нормализация данных стикеров
const normalizeStickerData = (): { hasTabs: boolean; tabs: StickerTab[] } => {
  if (!props.stickers || !Array.isArray(props.stickers) || props.stickers.length === 0) {
    return { hasTabs: false, tabs: [] };
  }

  // Проверяем, является ли первый элемент массивом или объектом с массивом
  const firstItem = props.stickers[0];
  const isArrayOfArrays = Array.isArray(firstItem);
  const isArrayOfObjects = firstItem && typeof firstItem === 'object' && 'stickers' in firstItem;

  if (isArrayOfArrays) {
    // Формат: [[{ url, alt? }, ...], ...]
    return {
      hasTabs: true,
      tabs: (props.stickers as Sticker[][]).map((stickerArray, index) => ({
        id: `tab-${index}`,
        label: `Set ${index + 1}`,
        stickers: stickerArray,
        iconUrl: stickerArray && stickerArray.length > 0 ? stickerArray[0].url : null,
      })),
    };
  } else if (isArrayOfObjects && 'stickers' in firstItem) {
    // Формат: [{ stickers: [...], label?, iconUrl? }, ...]
    return {
      hasTabs: true,
      tabs: (props.stickers as StickerTab[]).map((tab, index) => ({
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
        stickers: props.stickers as Sticker[],
        iconUrl: (props.stickers as Sticker[]).length > 0 ? (props.stickers as Sticker[])[0].url : null,
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

// Проверяем, есть ли TGS файлы в стикерах (включая иконки вкладок)
const hasTgsStickers = computed(() => {
  // Проверяем текущие стикеры
  const hasTgsInCurrentStickers = currentStickers.value.some(sticker => isAnimatedSticker(sticker.url));
  
  // Проверяем иконки вкладок
  const hasTgsInTabIcons = stickerTabs.value.some(tab => tab.iconUrl && isAnimatedSticker(tab.iconUrl));
  
  return hasTgsInCurrentStickers || hasTgsInTabIcons;
});

// Загружаем библиотеки TGS при необходимости
watch(hasTgsStickers, (needsTgs) => {
  if (needsTgs && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
}, { immediate: true });

// Функция для проверки, является ли стикер TGS файлом
const isTgsSticker = (sticker: Sticker): boolean => {
  return isAnimatedSticker(sticker.url);
};

// Установка ref для tgs-player элемента
const setTgsPlayerRef = (index: number, el: unknown) => {
  if (el) {
    tgsPlayerRefs.value.set(index, el as { play?: () => void; pause?: () => void });
  } else {
    tgsPlayerRefs.value.delete(index);
  }
};

// Установка ref для tgs-player элемента вкладки
const setTgsTabPlayerRef = (tabIndex: number, el: unknown) => {
  if (el) {
    tgsTabPlayerRefs.value.set(tabIndex, el as { play?: () => void; pause?: () => void });
  } else {
    tgsTabPlayerRefs.value.delete(tabIndex);
  }
};

// Обработка наведения на вкладку
const handleTabMouseEnter = (tabIndex: number) => {
  // Запускаем анимацию TGS иконки вкладки при наведении
  const player = tgsTabPlayerRefs.value.get(tabIndex);
  if (player && typeof player.play === 'function') {
    player.play();
  }
};

// Обработка ухода курсора с вкладки
const handleTabMouseLeave = (tabIndex: number) => {
  // Останавливаем анимацию TGS иконки вкладки при уходе курсора
  const player = tgsTabPlayerRefs.value.get(tabIndex);
  if (player && typeof player.pause === 'function') {
    player.pause();
  }
};

// Очистка refs при смене вкладки
watch(activeTabIndex, () => {
  tgsPlayerRefs.value.clear();
});

// Сброс активной вкладки при изменении данных
watch(() => props.stickers, () => {
  if (activeTabIndex.value >= stickerTabs.value.length) {
    activeTabIndex.value = 0;
  }
}, { deep: true });

// Определение типа файла по расширению URL
const getFileTypeFromUrl = (url: string): string => {
  if (!url) return 'image';
  const urlLower = url.toLowerCase();
  if (urlLower.endsWith('.tgs')) {
    return 'sticker'; // TGS - анимированные стикеры Telegram
  } else if (urlLower.endsWith('.webp')) {
    return 'sticker'; // WebP - статические стикеры
  }
  return 'image'; // По умолчанию считаем изображением
};

const onSelectSticker = (sticker: Sticker) => {
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

const handleStickerMouseEnter = (sticker: Sticker, index: number) => {
  // Запускаем анимацию TGS стикера при наведении
  if (isTgsSticker(sticker) && tgsLibsLoaded.value) {
    const player = tgsPlayerRefs.value.get(index);
    if (player && typeof player.play === 'function') {
      player.play();
    }
  }
  
  // Очищаем предыдущий таймер, если он был установлен
  clearPreviewTimer();
  
  // Устанавливаем таймер для показа предпросмотра через 1 секунду
  previewTimer.value = setTimeout(() => {
    showPreview(sticker);
  }, previewDelay);
};

const handleStickerMouseLeave = () => {
  // Останавливаем анимацию всех TGS стикеров при уходе курсора
  tgsPlayerRefs.value.forEach((player) => {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  });
  
  // Очищаем таймер и скрываем предпросмотр
  clearPreviewTimer();
  hidePreview();
};

const handleStickerClick = (sticker: Sticker) => {
  // Очищаем таймер предпросмотра при клике
  clearPreviewTimer();
  hidePreview();
  
  // Отправляем стикер
  onSelectSticker(sticker);
};

const clearPreviewTimer = () => {
  if (previewTimer.value) {
    clearTimeout(previewTimer.value);
    previewTimer.value = null;
  }
};

const showPreview = (sticker: Sticker) => {
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
  // Останавливаем все анимации TGS стикеров при закрытии пикера
  tgsPlayerRefs.value.forEach((player) => {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  });
  // Останавливаем все анимации TGS иконок вкладок при закрытии пикера
  tgsTabPlayerRefs.value.forEach((player) => {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  });
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

// Обработчик прокрутки колесиком мыши для вкладок
const handleTabsWheel = (event: WheelEvent) => {
  if (!tabsContainer.value) return;
  
  // Если есть горизонтальная прокрутка (shift + колесико), используем её
  // Иначе преобразуем вертикальную прокрутку в горизонтальную
  const scrollDelta = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) 
    ? event.deltaX 
    : event.deltaY;
  
  // Прокручиваем контейнер вкладок
  tabsContainer.value.scrollLeft += scrollDelta;
};

// Закрытие по клику вне (только для click-режима)
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.mode === 'click' &&
    isStickerPickerVisible.value &&
    stickerButton.value &&
    stickerPicker.value &&
    event.target instanceof Node &&
    !stickerButton.value.contains(event.target) &&
    !stickerPicker.value.contains(event.target)
  ) {
    closePicker();
  }
  
  // Скрываем предпросмотр при клике вне стикера
  if (previewSticker.value && previewElement.value && event.target instanceof Node && !previewElement.value.contains(event.target)) {
    hidePreview();
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
  
  // Загружаем библиотеки TGS при монтировании, если есть TGS стикеры
  if (hasTgsStickers.value && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  clearPreviewTimer();
  hidePreview();
  
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
  
  // Останавливаем все анимации TGS стикеров при размонтировании
  tgsPlayerRefs.value.forEach((player) => {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  });
  tgsPlayerRefs.value.clear();
  
  // Останавливаем все анимации TGS иконок вкладок при размонтировании
  tgsTabPlayerRefs.value.forEach((player) => {
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
  });
  tgsTabPlayerRefs.value.clear();
});
</script>

<style scoped lang="scss">
@use './styles/StickerPicker.scss';
</style>

