<template>
  <div>
    <div
      ref="containerRef"
      class="chat-item__container"
      :class="getClass()"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="selectChat"
      @contextmenu.prevent="onRightClick"
    >
      <div class="chat-item__avatar-container">
        <span
          class="chat-item__status-user"
          :style="{ backgroundColor: props.chat.status }"
        />
        <img
          v-if="props.chat.avatar"
          :src="props.chat.avatar"
          height="48"
          width="48"
        >
        <div
          v-else
          class="chat-item__avatar-placeholder"
        >
          <AvatarIcon />
        </div>
      </div>

      <div class="chat-item__info-container">
        <Tooltip
          :text="chat.name"
          position="bottom"
        >
          <div class="chat-item__name">
            {{ chat.name }}
          </div>
        </Tooltip>
        
        <Tooltip
          :text="chat.lastMessage"
          position="bottom"
        >
          <div
            v-if="chat.lastMessage || chat.typing"
            class="chat-item__last-message"
          >
            {{ showText }}
          </div>
        </Tooltip>
      </div>

      <div class="chat-item__details-container">
        <div
          v-if="chat['lastActivity.time'] && (chat.actions ? !buttonMenuVisible : true)"
          class="chat-item__time"
        >
          {{ chat['lastActivity.time'] }}
        </div>

        <!-- Кнопка меню размещена выше статуса и индикатора -->
        <ButtonContextMenu
          v-if="buttonMenuVisible && chat.actions && contextMenuTrigger === 'hover'"
          mode="click"
          menu-side="bottom-right"
          :actions="chat.actions"
          @click="clickAction"
          @button-click="BCMclick"
          @menu-mouse-leave="buttonMenuVisible = false"
        >
          <span class="pi pi-ellipsis-h chat-item__actions-trigger" />
        </ButtonContextMenu>
        
        <!-- Контекстное меню для режима rightClick -->
        <Teleport to="body">
          <ContextMenu
            v-if="contextMenuTrigger === 'rightClick' && chat.actions && contextMenuVisible"
            :id="'context-menu-rightclick-' + contextMenuId"
            :actions="chat.actions"
            :data-theme="getTheme().theme ? getTheme().theme : 'light'"
            @click="clickAction"
            @mouseenter="onContextMenuMouseEnter"
            @mouseleave="onContextMenuMouseLeave"
          />
        </Teleport>

        <!-- Контейнер для статуса и непрочитанных -->
        <div class="chat-item__status-unread-container">
          <div
            v-if="statuses.includes(chat['lastMessage.status'])"
            class="chat-item__status-message"
            :class="status"
          >
            <template v-if="chat['lastMessage.status'] === 'pending'">
              <span class="pi pi-clock" />
            </template>
            <template v-else-if="chat['lastMessage.status'] === 'error'">
              <span class="pi pi-exclamation-circle" />
            </template>
            <template v-else>
              <span
                v-if="chat['lastMessage.status'] !== 'sent'"
                class="pi pi-check"
              />
              <span class="pi pi-check" />
            </template>
          </div>

          <div
            v-if="showChatUnread"
            class="chat-item__unread"
          >
            {{ chatUnreadText }}
          </div>
        </div>

        <div
          v-if="chat.countUnread < 1"
          class="chat-item__status-chat-container"
        >
          <span
            v-if="(chat.isFixedTop || chat.isFixedBottom)"
            class="chat-item__fixed pi pi-thumbtack"
          />
        </div>
      </div>

      <div
        v-if="props.showDialogs && chat.dialogs" 
        class="chat-item__dialog-buttons"
        @click="emit('expand', props.chat)"
      >
        <button
          v-if="props.showDialogs && !chat.dialogsExpanded"
          id="noSelectButton"
          class="chat-item__menu-button"
        >
          <span
            id="noSelectButton"
            class="pi pi-angle-down"
          />
        </button>
        <button
          v-if="props.showDialogs && chat.dialogsExpanded"
          id="noSelectButton"
          class="chat-item__menu-button"
        >
          <span
            id="noSelectButton"
            class="pi pi-angle-up"
          />
        </button>
      </div>
    </div>

    <div 
      v-if="props.showDialogs && chat.dialogsExpanded"
      class="dialog__container"
    >
      <div
        v-for="dialog in getSortedDialogs()"
        :key="dialog.dialogId"
        class="dialog__item"
        :class="getDialogClass(dialog)"
        @click="selectDialog(dialog)"
      >
        <img
          v-if="dialog.icon"
          class="dialog__icon"
          :src="dialog.icon"
          height="16"
          width="16"
        >
        <span
          v-else
          class="dialog__icon pi pi-user"
        />
        <div class="dialog__text-container">
          <div class="dialog__name">
            {{ dialog.name }}
          </div>
          <div class="dialog__time">
            {{ dialog['lastActivity.time'] }}
          </div>
        </div>
        <div
          v-if="dialog.countUnread > 0"
          class="chat-item__unread"
          :style="dialog.colorUnread ? {backgroundColor: dialog.colorUnread} : {}"
        >
          {{ dialog.countUnread > 99 ? '99+' : dialog.countUnread }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, useId, inject, nextTick} from 'vue'

import { getStatus, statuses } from '@/functions';
import { t } from '../../../locale/useLocale'
import { useTheme } from '@/hooks';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import ButtonContextMenu from '@/components/1_atoms/ButtonContextMenu/ButtonContextMenu.vue';
import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import AvatarIcon from '@/components/1_icons/AvatarIcon.vue';
import { IAction, IChatItem, IChatDialog } from './types';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const props = withDefaults(defineProps<{
  chat: IChatItem;
  showDialogs?: boolean;
  contextMenuTrigger?: 'hover' | 'rightClick';
}>(), {
  showDialogs: true,
  contextMenuTrigger: 'hover',
});

const emit = defineEmits<{
  select: [{ chat: IChatItem; dialog: IChatDialog | null }];
  action: [{ chat: IChatItem } & IAction];
  expand: [IChatItem];
}>();

const contextMenuId = useId()
const buttonMenuVisible = ref(false);
const contextMenuVisible = ref(false);
const preventEmit = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const BCMclick = () => {
  preventEmit.value = true
}

const selectChat = (event: MouseEvent) => { 
  if (!preventEmit.value){
    if (event.target instanceof HTMLElement && event.target.id != 'noSelectButton')
      emit('select', {chat: props.chat, dialog: null});
  }
  preventEmit.value = false
}

const selectDialog = (dialog: IChatDialog) => {
    emit('select', {chat: props.chat, dialog: dialog});
}

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : '';
}

const getDialogClass = (dialog: IChatDialog) => {
  return dialog.isSelected ? 'dialog__selected' : ''
}

const clickAction = (action: IAction) => {
  // console.log('action', props.chat.chatId, action);
  if (props.contextMenuTrigger === 'rightClick') {
    hideContextMenu()
  }
  emit('action', { chat: props.chat, ...action });
}

const hideContextMenu = () => {
  const contextMenu = document.getElementById('context-menu-rightclick-' + contextMenuId)
  if (contextMenu) {
    contextMenu.style.top = '0'
    contextMenu.style.left = '0'
    contextMenu.style.opacity = '0'
    contextMenu.style.display = 'none'
  }
  contextMenuVisible.value = false
}

const closeAllOtherContextMenus = () => {
  // Находим все контекстные меню на странице
  const allMenus = document.querySelectorAll('[id^="context-menu-rightclick-"]')
  allMenus.forEach((menu) => {
    const menuElement = menu as HTMLElement
    if (menuElement.id !== 'context-menu-rightclick-' + contextMenuId) {
      // Закрываем все меню, кроме текущего
      menuElement.style.top = '0'
      menuElement.style.left = '0'
      menuElement.style.opacity = '0'
      menuElement.style.display = 'none'
    }
  })
}


const getSortedDialogs = (): IChatDialog[] => {
  if (!props.chat.dialogs) return [];
  return [...props.chat.dialogs]
    .sort((a: IChatDialog, b: IChatDialog) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1;
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1;
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0;
      return 0;
    })
}

const status = computed(() => getStatus(props.chat['lastMessage.status']))

const showChatUnread = computed(() => {
  return props.chat.showEmptyIndicator || props.chat.countUnread > 0;
});

const chatUnreadText = computed(() => {
  if (props.chat.countUnread > 0) {
    return props.chat.countUnread > 99 ? '99+' : props.chat.countUnread;
  }
  return props.chat.showEmptyIndicator ? '' : undefined;
});

let timer: ReturnType<typeof setInterval> | undefined;
const typingIndex = ref(0)
const typingText = [t('component.ChatItem.typing') + '.', t('component.ChatItem.typing') + '..', t('component.ChatItem.typing') + '...']

const showText = computed(() => {
  if (props.chat.typing) {
    return typingText[typingIndex.value];
  } else {
    return props.chat.lastMessage;
  }
});

watch(
  () => props.chat.typing,
  () => {
    if (props.chat.typing) {
      timer = setInterval(() => {
        if (typingIndex.value < 2) {
          typingIndex.value += 1
        }
        else {
          typingIndex.value = 0
        }
      }, 1000);
    }
    else {
      typingIndex.value = 0
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    }
  },
  { immediate: true }
)

const onMouseEnter = () => {
  if (props.contextMenuTrigger === 'hover') {
    buttonMenuVisible.value = true
  }
}

const onMouseLeave = (event: MouseEvent) => {
  if (props.contextMenuTrigger === 'hover') {
    if (event.relatedTarget instanceof HTMLElement && event.relatedTarget.className == 'context-menu__list')
      buttonMenuVisible.value = true
    else 
      buttonMenuVisible.value = false
  }
}

const onRightClick = (event: MouseEvent) => {
  if (props.contextMenuTrigger === 'rightClick' && props.chat.actions) {
    showContextMenu(event)
  }
}

const showContextMenu = (event: MouseEvent) => {
  // Закрываем все другие открытые меню перед открытием нового
  closeAllOtherContextMenus()
  
  contextMenuVisible.value = true
  nextTick(() => {
    const contextMenu = document.getElementById('context-menu-rightclick-' + contextMenuId)
    if (contextMenu) {
      // Получаем координаты курсора
      const mouseX = event.clientX
      const mouseY = event.clientY
      
      // Получаем размеры меню для корректировки позиции
      contextMenu.style.display = 'inherit'
      const menuBounds = contextMenu.getBoundingClientRect()
      contextMenu.style.display = 'none'
      
      nextTick(() => {
        // Получаем размеры окна для проверки границ
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const scrollX = window.scrollX || window.pageXOffset
        const scrollY = window.scrollY || window.pageYOffset
        
        // Позиционируем меню относительно курсора
        // По умолчанию меню открывается справа и снизу от курсора
        let left = mouseX + scrollX
        let top = mouseY + scrollY
        
        // Проверяем, не выходит ли меню за правую границу экрана
        if (left + menuBounds.width > windowWidth + scrollX) {
          left = mouseX + scrollX - menuBounds.width
        }
        
        // Проверяем, не выходит ли меню за нижнюю границу экрана
        if (top + menuBounds.height > windowHeight + scrollY) {
          top = mouseY + scrollY - menuBounds.height
        }
        
        // Проверяем, не выходит ли меню за левую границу экрана
        if (left < scrollX) {
          left = scrollX
        }
        
        // Проверяем, не выходит ли меню за верхнюю границу экрана
        if (top < scrollY) {
          top = scrollY
        }
        
        contextMenu.style.top = top + 'px'
        contextMenu.style.left = left + 'px'
        contextMenu.style.opacity = '1'
        contextMenu.style.display = 'inherit'
      })
    }
  })
}

const onContextMenuMouseEnter = () => {
  // Меню остается открытым при наведении
}

const onContextMenuMouseLeave = () => {
  // Меню остается открытым при уходе мыши
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.contextMenuTrigger === 'rightClick' && contextMenuVisible.value) {
    const target = event.target as HTMLElement
    const contextMenu = document.getElementById('context-menu-rightclick-' + contextMenuId)
    
    // Закрываем меню при любом клике, кроме клика на само меню (чтобы можно было выбрать пункт)
    if (!contextMenu || !contextMenu.contains(target)) {
      hideContextMenu()
    }
  }
}

const handleScroll = () => {
  // Закрываем меню при скролле
  if (props.contextMenuTrigger === 'rightClick' && contextMenuVisible.value) {
    hideContextMenu()
  }
}

onMounted(() => {
  if (props.contextMenuTrigger === 'rightClick') {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    // Инициализируем меню как скрытое
    nextTick(() => {
      const contextMenu = document.getElementById('context-menu-rightclick-' + contextMenuId)
      if (contextMenu) {
        contextMenu.style.display = 'none'
        contextMenu.style.opacity = '0'
      }
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
})

</script>

<style scoped lang="scss">
@use './styles/ChatItem.scss';
</style>
