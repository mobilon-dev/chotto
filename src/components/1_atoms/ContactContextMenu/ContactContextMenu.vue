<template>
  <div class="contact-context-menu__wrapper">
    <button
      :id="'container-' + contextMenuId + extChatAppId"
      ref="actionScope"
      class="contact-context-menu__button"
      @mouseenter="hover"
      @mouseleave="hoverOut"
      @click="toggle"
    >
      <span class="contact-context-menu__icon">
        <MenuIcon />
      </span>
      <Teleport to="body">
        <ContextMenu
          :id="'context-menu-' + contextMenuId + extChatAppId"
          :actions="actions"
          :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          @mouseenter="hoverCM"
          @mouseleave="hoverOutCM"
          @click="click"
        />
      </Teleport>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useId, inject, nextTick, type Component} from 'vue';
import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import { useTheme } from '@/hooks';
import MenuIcon from '../../1_icons/MenuIcon.vue';

interface ContextMenuAction {
  id?: string;
  title?: string;
  disabled?: boolean;
  icon?: string | Component;
  prime?: string;
  description?: string;
  action?: () => void;
  [key: string]: unknown;
}

const chatAppId = inject('chatAppId')
const extChatAppId = inject('extChatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'hover',
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  menuSide: {
    type: String,
    required: false,
    default: 'top'
  },
});

const contextMenuId = useId()

const emit = defineEmits(['click', 'buttonClick', 'menuMouseEnter', 'menuMouseLeave']);

const contextMenu = ref()
const actionScope = ref()
const isOpened = ref(false)

const click = (action: ContextMenuAction) => {
  hideMenu()
  emit('click', action);
}

const toggle = () => {
  if (!props.disabled) {
    if (props.mode == 'click' && !isOpened.value) {
      updatePosition()
    }
    else if (props.mode == 'click' && isOpened.value) {
      hideMenu()
    }
    emit('buttonClick')
  }
}

const hover = () => {
  if (!props.disabled) {
    if (props.mode == 'hover') {
      updatePosition()
    }
  }
}

const hoverOut = () => {
  if (!props.disabled) {
    if (props.mode == 'hover') {
      hideMenu()
    }
  }
}

const hoverCM = () => {
  emit('menuMouseEnter')
  if (!props.disabled) {
    if (props.mode == 'hover') {
      updatePosition()
    }
  }
}

const hoverOutCM = () => {
  emit('menuMouseLeave')
  if (!props.disabled) {
    if (props.mode == 'hover') {
      hideMenu()
    }
  }
}

const updatePosition = () => {
  if (actionScope.value && contextMenu.value){
    const t = contextMenu.value
    const bounds = actionScope.value.getBoundingClientRect()
    t.style.display = 'inherit'
    const cmBounds = contextMenu.value.getBoundingClientRect()
    t.style.display = 'none'
    nextTick(() => {
      const r: Record<string, { top: number; left: number }> = {
        'left'  : {top: bounds.top - ((cmBounds.height - bounds.height) / 2) - cmBounds.top, left: bounds.left - cmBounds.width - cmBounds.left},
        'right' : {top: bounds.top - ((cmBounds.height - bounds.height) / 2) - cmBounds.top, left: bounds.left + bounds.width - cmBounds.left},
        'bottom': {top: bounds?.bottom - cmBounds.top, left: bounds?.left - ((cmBounds.width - bounds.width) / 2) - cmBounds.left},
        'top'   : {top: bounds.top - cmBounds.height - cmBounds.top, left: bounds?.left - ((cmBounds.width - bounds.width) / 2) - cmBounds.left},
        'top-right': { top: bounds.top - cmBounds.height, left: bounds.right - (cmBounds.width / 2) },
        'bottom-left': {top: bounds?.bottom - cmBounds.top + 10, left: bounds.left - cmBounds.width - cmBounds.left + 50},
      }
      //console.log(bounds, cmBounds, 'top: ', r[props.menuSide].top + 'px', ' left: ', r[props.menuSide].left + 'px')
      t.style.top = r[props.menuSide].top + 'px'
      t.style.left = r[props.menuSide].left + 'px'
      t.style.opacity = '1'
      t.style.visibility = 'visible'
      t.style.display = 'inherit'
      isOpened.value = true
    })
  }
}

const hideMenu = () => {
  if (contextMenu.value){
    const t = contextMenu.value
    if (t){
      t.style.top = '0'
      t.style.left = '0'
      t.style.opacity = '0'
      t.style.visibility = 'hidden'
      t.style.display = 'none'
      isOpened.value = false
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.mode == 'click' && actionScope.value && !actionScope.value.contains(event.target as Node)) {
    hideMenu()
  }
}

onMounted(() => {
  nextTick(() => {
    contextMenu.value = document.getElementById('context-menu-' + contextMenuId + extChatAppId)
    if (contextMenu.value) {
      // Скрываем меню сразу при монтировании
      const t = contextMenu.value
      t.style.display = 'none'
      t.style.visibility = 'hidden'
      t.style.opacity = '0'
      hideMenu()
      document.addEventListener("click", handleClickOutside)
    }
  })
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
  // Гарантируем скрытие меню при размонтировании
  if (contextMenu.value) {
    hideMenu()
  }
})

defineExpose({
  updatePosition,
  hideMenu,
})

</script>

<style
  scoped
  lang="scss"
>
@use './styles/ContactContextMenu.scss';
</style>
