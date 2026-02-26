<template>
  <div v-if="effectiveTooltipText" class="delimiter-message__tooltip-root">
    <Tooltip
      :text="effectiveTooltipText"
      :position="tooltipPosition"
      :offset="tooltipOffset"
      :delay="tooltipDelay"
    >
      <div
        ref="containerRef"
        class="delimiter-message__container"
        :class="{ 'delimiter-message__container--removing': isRemoving }"
      >
        <p class="delimiter-message__text">
          {{ message.text }}
        </p>
      </div>
    </Tooltip>
  </div>
  <div
    v-else
    ref="containerRef"
    class="delimiter-message__container"
    :class="{ 'delimiter-message__container--removing': isRemoving }"
  >
    <p class="delimiter-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { IDelimiterMessage } from '@types';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';

const props = defineProps({
  message: {
    type: Object as () => IDelimiterMessage,
    required: true,
  },
  /** Текст подсказки при наведении. Если не передан — берётся из message.tooltipText */
  tooltipText: {
    type: String,
    default: '',
  },
  /** Позиция тултипа: top | right | bottom | left | bottom-left | top-center */
  tooltipPosition: {
    type: String,
    default: 'top-center',
  },
  /** Отступ тултипа от элемента (px) */
  tooltipOffset: {
    type: Number,
    default: 8,
  },
  /** Задержка показа тултипа (ms) */
  tooltipDelay: {
    type: Number,
    default: 100,
  },
});

/** Текст тултипа: приоритет у пропа, иначе из message */
const effectiveTooltipText = computed(() =>
  props.tooltipText || props.message.tooltipText || ''
);

const emit = defineEmits<{
  read: [messageId: string]
}>();

const containerRef = ref<HTMLElement | null>(null);
const isRemoving = ref(false);
let observer: IntersectionObserver | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
const READ_DURATION = 3000; // 3 секунды
const FADE_OUT_DURATION = 400; // Длительность анимации исчезновения

const setupObserver = () => {
  if (!props.message.autoRemove || !containerRef.value) {
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      
      if (entry.isIntersecting) {
        // Элемент виден - запускаем таймер
        if (timer) {
          clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
          // Элемент был виден 3 секунды - запускаем анимацию исчезновения
          isRemoving.value = true;
          
          // Отключаем observer
          if (observer && containerRef.value) {
            observer.disconnect();
            observer = null;
          }
          
          // Эмитим событие после завершения анимации
          setTimeout(() => {
            emit('read', props.message.messageId);
          }, FADE_OUT_DURATION);
        }, READ_DURATION);
      } else {
        // Элемент не виден - сбрасываем таймер
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
    },
    {
      threshold: 0.75, // Элемент должен быть виден минимум на 75%
      rootMargin: '0px',
    }
  );

  observer.observe(containerRef.value);
};

onMounted(() => {
  if (props.message.autoRemove) {
    // Небольшая задержка для корректной инициализации
    setTimeout(() => {
      setupObserver();
    }, 100);
  }
});

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

// Переинициализация при изменении флага autoRemove
watch(
  () => props.message.autoRemove,
  (newValue) => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    if (newValue) {
      setTimeout(() => {
        setupObserver();
      }, 100);
    }
  }
);

</script>

<style
  scoped
  lang="scss"
>
@use './styles/DelimiterMessage.scss';
</style>
