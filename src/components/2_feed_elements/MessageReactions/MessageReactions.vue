<template>
  <div
    ref="reactionsContainerRef"
    class="message-reactions"
    :class="{ 'has-reactions': hasReactions, 'is-right-message': isRight, 'is-disabled': !enabled }"
    @pointerenter="onMessageMouseEnter"
    @pointerleave="onMessageMouseLeave"
  >
    <Tooltip
      v-for="item in displayedReactions"
      :key="item.key"
      :text="getReactionTooltip(item)"
      position="bottom-right"
      :offset="6"
      :delay="400"
    >
      <button
        class="message-reactions__chip"
        :class="{ 'is-active': item.reactedByMe && item.count === 1 }"
        @click="onToggle(item.key)"
      >
        <span class="message-reactions__emoji">
          <EmojiGlyph :emoji="item.key" />
        </span>
        <span
          v-if="showCount || item.count > 1"
          class="message-reactions__count"
        >{{ item.count }}</span>
      </button>
    </Tooltip>

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
          <button
            v-if="menuEnabled"
            class="message-reactions__quick-item"
            title="Действия"
            @click.stop="onMenuClick"
          >
            <MessageActionsIcon />
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
import { ref, computed, inject, unref, onMounted, onUnmounted, watch } from 'vue'
import EmojiPicker from 'vue3-emoji-picker-ru'
import 'vue3-emoji-picker-ru/css'
import type { MessageReactionChip, MessageReactions, Reply } from '@/types'
import { useEmojiNative, useStartReply } from '@/hooks'
import EmojiGlyph from '@/components/1_atoms/EmojiGlyph/EmojiGlyph.vue'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'
import ExpandReactionsIcon from './icons/ExpandReactionsIcon.vue'
import ReplyIcon from './icons/ReplyIcon.vue'
import MessageActionsIcon from './icons/MessageActionsIcon.vue'
import { QUICK_REACTION_EMOJIS } from './utils/quickReactions'
import { buildReactionTooltipText } from './utils/reactionTooltip'
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
  /** Id текущего пользователя — для расчёта reactedByMe и локальных add/remove */
  currentUserId: {
    type: [String, Number] as unknown as () => string | number | undefined,
    default: undefined,
  },
  /** Имя текущего пользователя — для тултипа при локальном добавлении реакции */
  currentUserName: {
    type: String,
    default: undefined,
  },
  /** userId → имя (если в item нет name) */
  reactionUserNames: {
    type: Object as () => Record<string, string>,
    default: undefined,
  },
  reply: {
    type: Object as () => Reply | undefined,
    default: undefined,
  },
  replyEnabled: {
    type: Boolean,
    default: true,
  },
  /** Показывать кнопку меню действий сообщения в панели быстрых реакций */
  menuEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'toggle-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'add-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'remove-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'menu', payload: {
    messageId: string | number
    triggerRect?: { top: number; right: number; bottom: number; left: number; width: number; height: number }
    event?: MouseEvent
  }): void
}>()

const chatAppId = inject('chatAppId') as string | undefined
const injectedUserId = inject<string | number | undefined>('currentUserId', undefined)
const injectedUserNames = inject<Record<string, string> | undefined>('reactionUserNames', undefined)
const { startReply } = useStartReply(chatAppId || '')
const reactionsContainerRef = ref<HTMLElement | null>(null)
const messageContentEl = ref<HTMLElement | null>(null)
const emojiTheme = ref<'light' | 'dark'>('light')
const { isNative } = useEmojiNative(chatAppId || '')

const quickEmojis = computed(() => QUICK_REACTION_EMOJIS)
const reactionsMode = computed(() => props.mode)
const resolvedUserId = computed(() => props.currentUserId ?? unref(injectedUserId))
const resolvedUserNames = computed(() => props.reactionUserNames ?? unref(injectedUserNames))
const resolvedUserName = computed(() => {
  const explicit = props.currentUserName?.trim()
  if (explicit) return explicit
  const id = resolvedUserId.value
  if (id == null) return undefined
  return resolvedUserNames.value?.[String(id)]
})
// В multi всегда показываем счётчик; в single — только если реакцию поставили несколько человек (count > 1)
const showCount = computed(() => props.mode === 'multi')

const reactionsState = useReactionsState(
  computed(() => props.reactions),
  reactionsMode,
  resolvedUserId,
  resolvedUserName
)
const { displayedReactions, hasReactions, addReaction, removeReaction, toggleReaction, isMyReaction } = reactionsState

function getReactionTooltip(item: MessageReactionChip): string {
  return buildReactionTooltipText(item.events, resolvedUserNames.value)
}

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

function canMutate(): boolean {
  return !props.readonly && props.enabled && resolvedUserId.value != null
}

function onToggle(key: string) {
  if (!canMutate()) return

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
  if (isStillInsideMessage(event.relatedTarget)) return
  handleMessageMouseLeave()
}

function onQuickEmojiClick(key: string) {
  if (!canMutate()) return

  if (isMyReaction(key)) {
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

function onMenuClick(event: MouseEvent) {
  if (props.readonly || !props.enabled || !props.menuEnabled) return

  const target = event.currentTarget
  const triggerRect = target instanceof HTMLElement
    ? (() => {
      const r = target.getBoundingClientRect()
      return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height }
    })()
    : undefined

  emit('menu', { messageId: props.messageId, triggerRect, event })
}

async function onExpandClick() {
  if (props.readonly || !props.enabled) return
  emojiTheme.value = changeThemeDialogEmoji()
  await openFullPicker()
}

function onSelectEmoji(emojiObj: { i: string }) {
  closeFullPicker()
  closeQuickPanel()
  if (!canMutate()) return

  const key = emojiObj.i
  if (isMyReaction(key)) {
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
