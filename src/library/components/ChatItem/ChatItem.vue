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
        />
        <span
          v-else
          class="pi pi-user"
        />
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
          v-if="chat['lastActivity.time'] && !buttonMenuVisible"
          class="chat-item__time"
        >
          {{ chat['lastActivity.time'] }}
        </div>
        <div
          v-if="chat.countUnread > 0"
          class="chat-item__unread"
          :style="{
            backgroundColor: chat.colorUnread ? chat.colorUnread : null,
          }"
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
            v-if="chat.isFixedTop || chat.isFixedBottom"
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
        />
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
          :style="{
            backgroundColor: dialog.colorUnread ? dialog.colorUnread : null,
          }"
        >
          {{ dialog.countUnread > 99 ? '99+' : dialog.countUnread }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { getStatus, statuses } from '../../../helpers'
import { t } from '../../../locale/useLocale'
import { Tooltip, ButtonContextMenu } from '../'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select', 'action', 'expand'])

const buttonMenuVisible = ref(false)
const preventEmit = ref(false)

const BCMclick = () => {
  preventEmit.value = true
}

const selectChat = (event: MouseEvent) => {
  if (!preventEmit.value) {
    if (
      event.target instanceof HTMLElement &&
      event.target.id != 'noSelectButton'
    )
      emit('select', { chat: props.chat, dialog: null })
  }
  preventEmit.value = false
}

const selectDialog = (dialog) => {
  emit('select', { chat: props.chat, dialog: dialog })
}

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : ''
}

const getDialogClass = (dialog) => {
  return dialog.isSelected ? 'dialog__selected' : ''
}

const clickAction = (action) => {
  // console.log('action', props.chat.chatId, action);
  emit('action', { chat: props.chat, ...action })
}

const getSortedDialogs = () => {
  return props.chat.dialogs.toSorted((a, b) => {
    if (
      Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])
    )
      return -1
    if (
      Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])
    )
      return 1
    if (
      Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])
    )
      return 0
  })
}

const status = computed(() => getStatus(props.chat['lastMessage.status']))

let timer
const typingIndex = ref(0)
const typingText = [
  t('component.ChatItem.typing') + '.',
  t('component.ChatItem.typing') + '..',
  t('component.ChatItem.typing') + '...',
]

const showText = computed(() => {
  if (props.chat.typing) {
    return typingText[typingIndex.value]
  } else {
    return props.chat.lastMessage
  }
})

watch(
  () => props.chat.typing,
  () => {
    if (props.chat.typing) {
      timer = setInterval(() => {
        if (typingIndex.value < 2) {
          typingIndex.value += 1
        } else {
          typingIndex.value = 0
        }
      }, 1000)
    } else {
      typingIndex.value = 0
      clearInterval(timer)
    }
  },
  { immediate: true }
)

const onMouseLeave = (event) => {
  if (event.relatedTarget?.className == 'context-menu__list')
    buttonMenuVisible.value = true
  else buttonMenuVisible.value = false
}
</script>

<style scoped>
.text-enter-active,
.text-leave-active {
  transition: opacity 0.2s ease;
}

.text-enter-from,
.text-leave-to {
  opacity: 0;
}

.menu-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
