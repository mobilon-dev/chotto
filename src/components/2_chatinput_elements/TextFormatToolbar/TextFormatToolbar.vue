<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        ref="toolbarRef"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        class="text-format-toolbar"
        :style="toolbarStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Жирный -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Bold')"
          @click="applyFormat('bold')"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            preserveAspectRatio="xMidYMid meet"
            class=""
            fill="currentColor"
          >
            <path d="M6.8 19V5h5.525q1.624 0 3 1T16.7 8.775q0 1.275-.575 1.963-.575.687-1.075.987.626.275 1.387 1.025.763.75.763 2.25 0 2.224-1.625 3.113-1.625.887-3.05.887zm3.025-2.8h2.6q1.2 0 1.462-.612.263-.614.263-.888 0-.275-.263-.887-.262-.613-1.537-.613H9.825zm0-5.7h2.325q.825 0 1.2-.425a1.4 1.4 0 0 0 .375-.95q0-.6-.425-.975t-1.1-.375H9.825z" /></svg>
        </button>

        <!-- Курсив -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Italic')"
          @click="applyFormat('italic')"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            preserveAspectRatio="xMidYMid meet"
            class=""
            fill="currentColor"
          ><path d="M5 19v-2.5h4l3-9H8V5h10v2.5h-3.5l-3 9H15V19z" /></svg>
        </button>
        
        <!-- Подчёркнутый -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Underline')"
          @click="applyFormat('underline')"
        >
          <svg
            viewBox="0 0 512 512"
            width="13"
            height="13"
            preserveAspectRatio="xMidYMid meet"
            class=""
            fill="currentColor"
          >
            <rect
              x="16.65"
              y="443.317"
              width="478.699"
              height="68.683"
            />
            <path
              d="M303.383,0h-94L87.689,376.715h88.041l21.225-72.846H315.81l21.496,72.846h88.043L303.383,0z M216.38,235.187
              l39.103-133.203h1.544l39.362,133.203H216.38z"
            />
          </svg>
        </button>
        
        <!-- Зачёркнутый -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Strikethrough')"
          @click="applyFormat('strikethrough')"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            preserveAspectRatio="xMidYMid meet"
            class=""
            fill="currentColor"
          >
            <path d="M13.99 15.27q0-.83-.586-1.27-.585-.45-2.11-.937L11.107 13H4v-2h16v2h-3.76q.69.96.69 2.25 0 1.845-1.397 2.9-1.396 1.045-3.76 1.045-1.64 0-2.988-.595-1.347-.606-2.06-1.65a4 4 0 0 1-.472-.951l2.451-.98c.145.303.363.651.667.962l.014.019h.004a2.87 2.87 0 0 0 1.971.867q.199.014.413.014 1.045 0 1.631-.42.586-.43.586-1.191M10.548 10h-3.79a3.5 3.5 0 0 1-.297-1.44q0-1.152.644-2.05.655-.909 1.866-1.416 1.22-.508 2.734-.508 1.523 0 2.715.557 1.191.546 1.846 1.552.26.394.418.831l-2.492.997C13.85 7.823 13 7 11.656 6.92q-1.074 0-1.67.459a1.42 1.42 0 0 0-.595 1.191q0 .694.693 1.162.204.136.464.268" />
          </svg>
        </button>
        
        <!-- Встроенный код -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Code')"
          @click="applyFormat('code')"
        >
          <span class="pi pi-code" />
        </button>
        
        <!-- Цитата -->
        <button
          class="text-format-toolbar__button"
          :title="t('component.TextFormatToolbar.Quote')"
          @click="applyFormat('quote')"
        >
          <svg
            viewBox="0 0 512 512"
            width="13"
            height="13"
            preserveAspectRatio="xMidYMid meet"
            class=""
            fill="currentColor"
          >
            <path
              d="M119.472,66.59C53.489,66.59,0,120.094,0,186.1c0,65.983,53.489,119.487,119.472,119.487
              c0,0-0.578,44.392-36.642,108.284c-4.006,12.802,3.135,26.435,15.945,30.418c9.089,2.859,18.653,0.08,24.829-6.389
              c82.925-90.7,115.385-197.448,115.385-251.8C238.989,120.094,185.501,66.59,119.472,66.59z"
            />
            <path
              d="M392.482,66.59c-65.983,0-119.472,53.505-119.472,119.51c0,65.983,53.489,119.487,119.472,119.487
              c0,0-0.578,44.392-36.642,108.284c-4.006,12.802,3.136,26.435,15.945,30.418c9.089,2.859,18.653,0.08,24.828-6.389
              C479.539,347.2,512,240.452,512,186.1C512,120.094,458.511,66.59,392.482,66.59z"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useTheme } from '@/hooks';
import { t } from '@/locale/useLocale';

const props = defineProps({
  textarea: {
    type: Object as () => HTMLTextAreaElement | null,
    default: null,
  },
});

const emit = defineEmits<{
  'format-applied': [data: { format: string; selectedText: string; start: number; end: number; newText: string }]
}>();

const chatAppId = inject('chatAppId');
const { getTheme } = useTheme(chatAppId as string);

const toolbarRef = ref<HTMLElement>();
const isVisible = ref(false);
const toolbarStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' });
const selectedText = ref('');
const selectionStart = ref(0);
const selectionEnd = ref(0);

let isMouseOverToolbar = false;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;
let currentTextarea: HTMLTextAreaElement | null = null;
let mouseX = 0;
let mouseY = 0;

// Markdown форматирование
const formatMap: Record<string, { prefix: string; suffix: string }> = {
  bold: { prefix: '**', suffix: '**' },
  italic: { prefix: '*', suffix: '*' },
  underline: { prefix: '<u>', suffix: '</u>' },
  strikethrough: { prefix: '~~', suffix: '~~' },
  code: { prefix: '`', suffix: '`' },
  quote: { prefix: '> ', suffix: '' },
};

// Отслеживаем положение курсора мыши
const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
};

const handleSelection = () => {
  const textarea = currentTextarea || props.textarea;
  if (!textarea) {
    return;
  }

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  
  // Проверяем, что есть выделение
  if (start === end) {
    hideToolbar();
    return;
  }

  const text = textarea.value.substring(start, end);

  // Показываем тултип только если есть выделенный текст (не пустой)
  if (text.trim().length > 0) {
    selectedText.value = text;
    selectionStart.value = start;
    selectionEnd.value = end;
    updateToolbarPosition();
    isVisible.value = true;
    
    // Отменяем предыдущий таймер скрытия
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  } else {
    hideToolbar();
  }
};

const handleSelectionChange = () => {
  // Проверяем, что активный элемент - наш textarea
  const textarea = currentTextarea || props.textarea;
  if (!textarea || document.activeElement !== textarea) {
    return;
  }
  handleSelection();
};

const setupTextareaListeners = (textarea: HTMLTextAreaElement | null) => {
  // Удаляем старые слушатели, если они есть
  if (currentTextarea) {
    currentTextarea.removeEventListener('mouseup', handleSelection);
    currentTextarea.removeEventListener('keyup', handleSelection);
    currentTextarea.removeEventListener('select', handleSelection);
    currentTextarea.removeEventListener('mousemove', handleMouseMove);
  }
  document.removeEventListener('selectionchange', handleSelectionChange);

  // Устанавливаем новые слушатели
  if (textarea) {
    currentTextarea = textarea;
    textarea.addEventListener('mouseup', handleSelection);
    textarea.addEventListener('keyup', handleSelection);
    textarea.addEventListener('select', handleSelection);
    textarea.addEventListener('mousemove', handleMouseMove);
    // Также слушаем глобальное событие selectionchange для более надежного отслеживания
    document.addEventListener('selectionchange', handleSelectionChange);
  } else {
    currentTextarea = null;
  }
};

const updateToolbarPosition = () => {
  nextTick(() => {
    if (!toolbarRef.value) return;

    const toolbarRect = toolbarRef.value.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Позиционируем тултип над курсором мыши
    let left = mouseX - (toolbarRect.width / 2);
    let top = mouseY - toolbarRect.height - 10;

    // Проверяем границы экрана
    // Горизонтальные границы
    if (left < 10) {
      left = 10;
    } else if (left + toolbarRect.width > windowWidth - 10) {
      left = windowWidth - toolbarRect.width - 10;
    }

    // Вертикальные границы (если не помещается сверху, показываем снизу)
    if (top < 10) {
      top = mouseY + 20;
    } else if (top + toolbarRect.height > windowHeight - 10) {
      top = windowHeight - toolbarRect.height - 10;
    }

    toolbarStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
  });
};

const applyFormat = (format: string) => {
  const textarea = props.textarea;
  if (!textarea) return;

  const formatConfig = formatMap[format];
  if (!formatConfig) return;

  const text = textarea.value;
  const start = selectionStart.value;
  const end = selectionEnd.value;
  const selected = text.substring(start, end);

  let formattedText: string;
  let newText: string;

  // Для цитаты обрабатываем каждую строку
  if (format === 'quote') {
    const lines = selected.split('\n');
    const formattedLines = lines.map(line => 
      line.trim() ? `${formatConfig.prefix}${line}${formatConfig.suffix}` : line
    );
    formattedText = formattedLines.join('\n');
    newText = text.substring(0, start) + formattedText + text.substring(end);
  } else {
    // Для остальных форматов просто оборачиваем выделенный текст
    formattedText = `${formatConfig.prefix}${selected}${formatConfig.suffix}`;
    newText = text.substring(0, start) + formattedText + text.substring(end);
  }

  // Обновляем значение через событие, чтобы избежать мутации пропса
  emit('format-applied', { 
    format, 
    selectedText: selected, 
    start, 
    end,
    newText 
  });

  // Обновляем выделение и позицию тултипа
  setTimeout(() => {
    handleSelection();
  }, 10);
};

const hideToolbar = () => {
  if (!isMouseOverToolbar) {
    isVisible.value = false;
  }
};

const handleMouseEnter = () => {
  isMouseOverToolbar = true;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

const handleMouseLeave = () => {
  isMouseOverToolbar = false;
  hideTimeout = setTimeout(() => {
    hideToolbar();
  }, 200);
};

// Отслеживаем изменения textarea
watch(() => props.textarea, (newTextarea, oldTextarea) => {
  if (newTextarea !== oldTextarea) {
    setupTextareaListeners(newTextarea);
  }
}, { immediate: true });

onMounted(() => {
  // Устанавливаем слушатели при монтировании
  if (props.textarea) {
    setupTextareaListeners(props.textarea);
  }
});

onUnmounted(() => {
  if (currentTextarea) {
    currentTextarea.removeEventListener('mouseup', handleSelection);
    currentTextarea.removeEventListener('keyup', handleSelection);
    currentTextarea.removeEventListener('select', handleSelection);
    currentTextarea.removeEventListener('mousemove', handleMouseMove);
  }
  document.removeEventListener('selectionchange', handleSelectionChange);
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});
</script>

<style scoped lang="scss">
@use './styles/TextFormatToolbar.scss';
</style>

