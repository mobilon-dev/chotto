<template>
  <div
    ref="reactionsContainerRef"
    class="message-reactions"
    :class="{ 'has-reactions': hasReactions, 'is-right-message': isRight, 'is-disabled': !enabled }"
  >
    <button
      v-for="item in displayedReactions"
      :key="item.key"
      class="message-reactions__chip"
      :class="{ 'is-active': item.reactedByMe }"
      :title="item.key"
      @click="onToggle(item.key)"
    >
      <span class="message-reactions__emoji">{{ item.key }}</span>
      <span class="message-reactions__count">{{ item.count }}</span>
    </button>

    <button
      v-if="!readonly && enabled"
      ref="addButtonRef"
      class="message-reactions__add"
      aria-label="Add reaction"
      title="Добавить реакцию"
      @click="onAddClick"
    >
      <span>+</span>
    </button>

    <!-- Панель быстрых реакций -->
    <transition name="message-reactions-popover">
      <div
        v-show="isQuickReactionsOpen && !readonly && enabled && !isFullPickerOpen"
        ref="quickReactionsRef"
        class="message-reactions__quick-panel"
        :style="quickPanelStyle"
        @mouseenter="handleQuickPanelMouseEnter"
        @mouseleave="handleQuickPanelMouseLeave"
      >
        <button
          v-for="emoji in quickEmojis"
          :key="emoji"
          class="message-reactions__quick-item"
          :title="emoji"
          @click.stop="onQuickEmojiClick(emoji)"
        >
          {{ emoji }}
        </button>
        <button
          class="message-reactions__expand"
          title="Развернуть"
          @click.stop="onExpandClick"
        >
          <span>⋯</span>
        </button>
      </div>
    </transition>

    <!-- Полный EmojiPicker для выбора реакций -->
    <Teleport to="body">
      <transition name="message-reactions-popover">
        <div
          v-show="isFullPickerOpen && !readonly && enabled"
          ref="pickerRef"
          class="message-reactions__picker"
          :style="pickerStyle"
          @mouseenter="handlePickerMouseEnter"
          @mouseleave="handlePickerMouseLeave"
        >
          <EmojiPicker
            :native="true"
            :theme="emojiTheme"
            picker-type=""
            @select="onSelectEmoji"
          />
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import EmojiPicker from 'vue3-emoji-picker-ru'
import 'vue3-emoji-picker-ru/css'
import type { MessageReactions } from '@/types'
import { QUICK_REACTION_EMOJIS } from './utils/quickReactions'
import { isRightMessage, useReactionsState, useReactionsPanel } from './composables'

const props = defineProps({
  reactions: {
    type: Object as () => MessageReactions | undefined,
    required: false,
    default: undefined,
  },
  messageId: {
    type: [String, Number],
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'toggle-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'add-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'remove-reaction', payload: { messageId: string | number; key: string }): void
}>()

const chatAppId = inject('chatAppId') as string | undefined
const reactionsContainerRef = ref<HTMLElement | null>(null)
const addButtonRef = ref<HTMLButtonElement | null>(null)
const emojiTheme = ref<'light' | 'dark'>('light')

const quickEmojis = computed(() => QUICK_REACTION_EMOJIS)

// Используем композабл для управления состоянием реакций
const reactionsState = useReactionsState(computed(() => props.reactions))
const { displayedReactions, hasReactions, addReaction, removeReaction, toggleReaction } = reactionsState

// Используем композабл для управления панелями реакций
const panel = useReactionsPanel(quickEmojis, addButtonRef)
const {
  isQuickReactionsOpen,
  isFullPickerOpen,
  pickerRef,
  quickReactionsRef,
  quickPanelStyle,
  pickerStyle,
  openQuickPanel,
  closeQuickPanel,
  openFullPicker,
  closeFullPicker,
  handleQuickPanelMouseEnter,
  handleQuickPanelMouseLeave,
  handlePickerMouseEnter,
  handlePickerMouseLeave,
  handleClickOutside,
} = panel

const isRight = computed(() => {
  if (!reactionsContainerRef.value) return false
  return isRightMessage(reactionsContainerRef.value)
})

const changeThemeDialogEmoji = (): 'light' | 'dark' => {
  if (!chatAppId) return 'light'
  const el = document.getElementById(chatAppId)
  return el?.getAttribute('data-theme')?.includes('dark') ? 'dark' : 'light'
}

function onToggle(key: string) {
  if (props.readonly || !props.enabled) return
  toggleReaction(key)
  emit('toggle-reaction', { messageId: props.messageId, key })
}

function onAddClick() {
  if (props.readonly || !props.enabled) return
  if (isQuickReactionsOpen.value) {
    closeQuickPanel()
  } else {
    openQuickPanel()
  }
}

function onQuickEmojiClick(key: string) {
  if (props.readonly || !props.enabled) return
  // Проверяем, есть ли уже эта реакция у пользователя
  const existingReaction = reactionsState.localReactions.value?.items?.find(item => item.key === key && item.reactedByMe)
  
  if (existingReaction) {
    // Если реакция уже есть, удаляем её
    removeReaction(key)
    emit('remove-reaction', { messageId: props.messageId, key })
  } else {
    // Если реакции нет, добавляем её
    addReaction(key)
    emit('add-reaction', { messageId: props.messageId, key })
  }
  
  // Закрываем панель после выбора
  closeQuickPanel()
}

async function onExpandClick() {
  if (props.readonly || !props.enabled) return
  emojiTheme.value = changeThemeDialogEmoji()
  await openFullPicker()
}

function onSelectEmoji(emojiObj: { i: string }) {
  closeFullPicker()
  if (props.readonly || !props.enabled) return
  addReaction(emojiObj.i)
  emit('add-reaction', { messageId: props.messageId, key: emojiObj.i })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
@use './styles/MessageReactions.scss';
</style>


