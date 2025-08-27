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
          :style="{backgroundColor: chat.colorUnread ? chat.colorUnread : null}"
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
        v-if="chat.dialogs && chat.dialogs.length > 0"
        class="chat-item__dialog-buttons"
      >
        <button
          v-for="dialog in getSortedDialogs()"
          :key="dialog.dialogId"
          class="chat-item__menu-button"
          @click.stop="selectDialog(dialog)"
        >
          <div
            class="dialog__container"
            :class="getDialogClass(dialog)"
          >
            <div class="dialog__icon">
              <span class="pi pi-comments" />
            </div>
            <div class="dialog__item">
              <div class="dialog__text-container">
                <div class="dialog__name">
                  {{ dialog.name }}
                </div>
                <div class="dialog__time">
                  {{ dialog['lastActivity.time'] }}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLocale } from '../../locale/useLocale.js'
import Tooltip from '../Tooltip/Tooltip.vue'
import ButtonContextMenu from '../ButtonContextMenu/ButtonContextMenu.vue'
import { getStatus } from '../../helpers/getStatusMessage.js'

const { t } = useLocale()

const props = defineProps({
  chat: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select', 'action'])

const buttonMenuVisible = ref(false)

const statuses = ['sent', 'delivered', 'read']

const selectChat = () => {
  emit('select', { chat: props.chat })
}

const BCMclick = (action) => {
  emit('action', { chat: props.chat, ...action })
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
  emit('action', { chat: props.chat, ...action })
}

const getSortedDialogs = () => {
  return props.chat.dialogs
    .toSorted((a, b) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0
    })
}

const status = computed(() => getStatus(props.chat['lastMessage.status']))

let timer
const typingIndex = ref(0)
const typingText = [t('component.ChatItem.typing') + '.', t('component.ChatItem.typing') + '..', t('component.ChatItem.typing') + '...']

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
  if (event.relatedTarget?.className == 'context-menu__list') {
    buttonMenuVisible.value = true
  } else {
    buttonMenuVisible.value = false
  }
}
</script>

<style scoped>
@import './styles/index.css';
</style>
