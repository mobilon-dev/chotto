<template>
  <div
    ref="reactionsContainerRef"
    class="message-reactions"
    :class="{ 'has-reactions': hasReactions, 'is-right-message': isRight, 'is-disabled': !enabled }"
    @pointerenter="onMessageMouseEnter"
    @pointerleave="onMessageMouseLeave"
  >
    <button
      v-for="item in displayedReactions"
      :key="item.key"
      class="message-reactions__chip"
      :class="{ 'is-active': item.reactedByMe }"
      :title="item.key"
      @click="onToggle(item.key)"
    >
      <span class="message-reactions__emoji">
        <EmojiGlyph :emoji="item.key" />
      </span>
      <span
        v-if="showCount"
        class="message-reactions__count"
      >{{ item.count }}</span>
    </button>

    <!-- Панель быстрых реакций и полный EmojiPicker — в body, чтобы не обрезались overflow ленты -->
    <Teleport to="body">
      <transition name="message-reactions-popover">
        <div
          v-show="isQuickReactionsOpen && !readonly && enabled"
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
            <EmojiGlyph :emoji="emoji" />
          </button>
          <button
            class="message-reactions__expand"
            title="Развернуть"
            @click.stop="onExpandClick"
          >
            <ExpandReactionsIcon />
          </button>
          <button
            v-if="replyEnabled && reply"
            class="message-reactions__quick-item"
            title="Ответить"
            @click.stop="onReplyClick"
          >
            <ReplyIcon />
          </button>
        </div>
      </transition>

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
            :native="isNative"
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
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import EmojiPicker from 'vue3-emoji-picker-ru'
import 'vue3-emoji-picker-ru/css'
import type { MessageReactions, Reply } from '@/types'
import { useEmojiNative, useStartReply } from '@/hooks'
import EmojiGlyph from '@/components/1_atoms/EmojiGlyph/EmojiGlyph.vue'
import ExpandReactionsIcon from './icons/ExpandReactionsIcon.vue'
import ReplyIcon from './icons/ReplyIcon.vue'
import { QUICK_REACTION_EMOJIS } from './utils/quickReactions'
import {
  findMessageContent,
  isRightMessage,
  useReactionsState,
  useReactionsPanel,
  type ReactionsMode,
} from './composables'

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
  mode: {
    type: String as () => ReactionsMode,
    default: 'single',
    validator: (value: string) => ['single', 'multi'].includes(value),
  },
  reply: {
    type: Object as () => Reply | undefined,
    default: undefined,
  },
  replyEnabled: {
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
const { startReply } = useStartReply(chatAppId || '')
const reactionsContainerRef = ref<HTMLElement | null>(null)
const messageContentEl = ref<HTMLElement | null>(null)
const emojiTheme = ref<'light' | 'dark'>('light')
const { isNative } = useEmojiNative(chatAppId || '')

const quickEmojis = computed(() => QUICK_REACTION_EMOJIS)
const reactionsMode = computed(() => props.mode)
const showCount = computed(() => props.mode === 'multi')

// Используем композабл для управления состоянием реакций
const reactionsState = useReactionsState(computed(() => props.reactions), reactionsMode)
const { displayedReactions, hasReactions, addReaction, removeReaction, toggleReaction } = reactionsState

// Используем композабл для управления панелями реакций
const panel = useReactionsPanel(quickEmojis, reactionsContainerRef)
const {
  isQuickReactionsOpen,
  isFullPickerOpen,
  pickerRef,
  quickReactionsRef,
  quickPanelStyle,
  pickerStyle,
  closeQuickPanel,
  handleMessageMouseEnter,
  handleMessageMouseLeave,
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

  if (props.mode === 'single') {
    const myKey = reactionsState.myReactionKey.value
    if (myKey === key) {
      removeReaction(key)
      emit('remove-reaction', { messageId: props.messageId, key })
    } else {
      const previousKey = addReaction(key)
      if (previousKey) {
        emit('remove-reaction', { messageId: props.messageId, key: previousKey })
      }
      emit('add-reaction', { messageId: props.messageId, key })
    }
    return
  }

  toggleReaction(key)
  emit('toggle-reaction', { messageId: props.messageId, key })
}

function isStillInsideMessage(relatedTarget: EventTarget | null): boolean {
  if (!(relatedTarget instanceof Node)) return false
  if (messageContentEl.value?.contains(relatedTarget)) return true
  if (reactionsContainerRef.value?.contains(relatedTarget)) return true
  return false
}

function onMessageMouseEnter() {
  if (props.readonly || !props.enabled) return
  handleMessageMouseEnter()
}

function onMessageMouseLeave(event: PointerEvent) {
  if (props.readonly || !props.enabled) return
  // Игнорируем уход на соседний элемент внутри того же сообщения
  // (иначе узкий absolute-hitbox реакций сбрасывает таймер открытия панели)
  if (isStillInsideMessage(event.relatedTarget)) return
  handleMessageMouseLeave()
}

function onQuickEmojiClick(key: string) {
  if (props.readonly || !props.enabled) return

  const existingReaction = reactionsState.localReactions.value?.items?.find(
    item => item.key === key && item.reactedByMe
  )

  if (existingReaction) {
    removeReaction(key)
    emit('remove-reaction', { messageId: props.messageId, key })
  } else {
    const previousKey = addReaction(key)
    if (previousKey) {
      emit('remove-reaction', { messageId: props.messageId, key: previousKey })
    }
    emit('add-reaction', { messageId: props.messageId, key })
  }

  closeQuickPanel()
}

function onReplyClick() {
  if (props.readonly || !props.enabled || !props.reply) return

  startReply(props.reply)
  closeQuickPanel()
}

async function onExpandClick() {
  if (props.readonly || !props.enabled) return
  emojiTheme.value = changeThemeDialogEmoji()
  await openFullPicker()
}

function onSelectEmoji(emojiObj: { i: string }) {
  closeFullPicker()
  closeQuickPanel()
  if (props.readonly || !props.enabled) return

  const key = emojiObj.i
  const existingReaction = reactionsState.localReactions.value?.items?.find(
    item => item.key === key && item.reactedByMe
  )

  if (existingReaction) {
    // Та же реакция уже стоит — ничего не меняем
    return
  }

  const previousKey = addReaction(key)
  if (previousKey) {
    emit('remove-reaction', { messageId: props.messageId, key: previousKey })
  }
  emit('add-reaction', { messageId: props.messageId, key })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Делаем hover более надёжным: слушаем `*__content`, чтобы курсор попадал даже когда
  // у `.message-reactions` нет удобной hitbox-области (например, когда нет реакций).
  const contentEl = findMessageContent(reactionsContainerRef.value)
  if (contentEl) {
    messageContentEl.value = contentEl
    contentEl.addEventListener('pointerenter', onMessageMouseEnter)
    contentEl.addEventListener('pointerleave', onMessageMouseLeave)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (messageContentEl.value) {
    messageContentEl.value.removeEventListener('pointerenter', onMessageMouseEnter)
    messageContentEl.value.removeEventListener('pointerleave', onMessageMouseLeave)
  }
})

watch(
  () => [props.enabled, props.readonly],
  ([enabled, readonly]) => {
    if (!enabled || readonly) {
      closeQuickPanel()
      closeFullPicker()
    }
  }
)
</script>

<style scoped lang="scss">
@use './styles/MessageReactions.scss';
</style>
