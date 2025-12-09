<template>
  <Tooltip
    text="Шаблоны сообщений"
    position="left"
  >
    <button
      v-if="!getMessage().isRecording"
      ref="templateButton"
      class="button-template"
      :class="{'button-template-disabled' : state == 'disabled'}"
      @click="toggle"
      @mouseover="hover"
      @mouseout="hoverout"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <span class="">
        <ChatTemplatesIcon :fill="currentIconColor" />
      </span>
    </button>
  </Tooltip>
  <transition>
    <div
      v-show="props.state === 'active'"
      ref="template"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <TemplateSelector
        :templates="templates"
        :group-templates="groupTemplates"
        :elevated-window="elevatedWindow"
        :chat-background="chatBackground"
        @close-template-window="close"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect, inject } from 'vue';
import TemplateSelector from '@/components/2_chatinput_elements/TemplateSelector/TemplateSelector.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageDraft } from '@/hooks';
import { ChatTemplatesIcon } from './icons';

const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  groupTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  mode: {
    type: String,
    required: false,
    default: 'click'
  },
  state:{
    type: String,
    default: 'active',
  },
  elevatedWindow: {
    type: Boolean,
    required: false,
  },
  chatBackground: {
    type: String,
    default: undefined
  }
})

const chatAppId = inject('chatAppId') as string | undefined
const { getMessage } = useMessageDraft(chatAppId || '')

const templateButton = ref<HTMLButtonElement | null>(null)
const template = ref<HTMLElement | null>(null)

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
  const color = computedStyle.getPropertyValue('--chotto-buttontemplateselector-button-span-color').trim();
  const hoverColor = computedStyle.getPropertyValue('--chotto-buttontemplateselector-button-span-hover-color').trim();
  iconFillColor.value = color || '#5F5F5F';
  iconHoverColor.value = hoverColor || '#404040';
};

const currentIconColor = computed(() => {
  return isHovered.value ? iconHoverColor.value : iconFillColor.value;
});

watchEffect(() => {
  updateIconColor();
})


const toggle = () => {
  if (props.mode == 'click' && props.state == 'active' && template.value) {
    if (template.value.style.display == 'none') {
      template.value.style.display = 'inherit'
    }
    else if (template.value.style.display == 'inherit') {
      template.value.style.display = 'none'
    }
  }
}

const hover = () => {
  if (props.mode == 'hover' && props.state == 'active' && template.value) {
    template.value.style.display = 'inherit'
  }
}

const hoverout = () => {
  if (props.mode == 'hover' && props.state == 'active' && template.value) {
    template.value.style.display = 'none'
  }
}

const close = () => {
  if (template.value) {
    template.value.style.display = 'none'
  }
}

onMounted(() => {
  if (template.value) {
    template.value.style.display = 'none'
  }
  
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
})

onUnmounted(() => {
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
})


</script>

<style
  scoped
  lang="scss"
>
@use './styles/ButtonTemplateSelector.scss';
</style>
