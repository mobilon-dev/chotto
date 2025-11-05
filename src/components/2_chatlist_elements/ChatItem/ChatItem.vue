<template>
  <div>
    <div
      class="chat-item__container"
      :class="getClass()"
      @mouseenter="buttonMenuVisible = true"
      @mouseleave="onMouseLeave"
      @click="selectChat"
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
        <div
          v-if="chat.countUnread > 0"
          class="chat-item__unread"
        >
          {{ chat.countUnread > 99 ? '99+' : chat.countUnread }}
        </div>

        <ButtonContextMenu
          v-if="buttonMenuVisible && chat.actions"
          mode="click"
          menu-side="bottom"
          :actions="chat.actions"
          @click="clickAction"
          @button-click="BCMclick"
          @menu-mouse-leave="buttonMenuVisible = false"
        >
          <span class="pi pi-ellipsis-h chat-item__actions-trigger" />
        </ButtonContextMenu>

        <div
          v-if="chat.countUnread < 1"
          class="chat-item__status-chat-container"
        >
          <div
            v-if="statuses.includes(chat['lastMessage.status'])"
            class="chat-item__status-message"
            :class="status"
          >
            <span
              v-if="chat['lastMessage.status'] !== 'sent'"
              class="pi pi-check"
            />
            <span class="pi pi-check" />
          </div>

          <span
            v-if="(chat.isFixedTop || chat.isFixedBottom)"
            class="chat-item__fixed pi pi-thumbtack"
          />
        </div>
      </div>

      <div
        v-if="chat.dialogs" 
        class="chat-item__dialog-buttons"
        @click="emit('expand', props.chat)"
      >
        <button
          v-if="!chat.dialogsExpanded"
          id="noSelectButton"
          class="chat-item__menu-button"
        >
          <span
            id="noSelectButton"
            class="pi pi-angle-down"
          />
        </button>
        <button
          v-if="chat.dialogsExpanded"
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
      v-if="chat.dialogsExpanded"
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
import { ref, computed, watch} from 'vue'

import { getStatus, statuses } from '@/functions';
import { t } from '../../../locale/useLocale'
import { Tooltip, ButtonContextMenu, AvatarIcon } from '@/components';
import { IAction, IChatItem, IChatDialog } from './types';

const props = defineProps<{
  chat: IChatItem;
}>();

const emit = defineEmits<{
  select: [{ chat: IChatItem; dialog: IChatDialog | null }];
  action: [{ chat: IChatItem } & IAction];
  expand: [IChatItem];
}>();

const buttonMenuVisible = ref(false);
const preventEmit = ref(false)

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
  emit('action', { chat: props.chat, ...action });
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

const onMouseLeave = (event: MouseEvent) => {
  if (event.relatedTarget instanceof HTMLElement && event.relatedTarget.className == 'context-menu__list')
    buttonMenuVisible.value = true
  else 
    buttonMenuVisible.value = false
}

</script>

<style scoped lang="scss">
@use './styles/ChatItem.scss';
</style>
