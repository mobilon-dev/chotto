<template>
  <Teleport to="body">
    <transition name="message-reactions-popover">
      <div
        v-if="isQuickReactionsOpen && target"
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
          v-if="target.replyEnabled && target.reply"
          class="message-reactions__quick-item"
          title="Ответить"
          @click.stop="onReplyClick"
        >
          <ReplyIcon />
        </button>
        <button
          v-if="target.menuEnabled"
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
        v-if="isFullPickerOpen && target && EmojiPicker"
        ref="pickerRef"
        class="message-reactions__picker"
        :style="pickerStyle"
        @mouseenter="handlePickerMouseEnter"
        @mouseleave="handlePickerMouseLeave"
      >
        <component
          :is="EmojiPicker"
          :native="isNative"
          :emoji-src="emojiSrc"
          :theme="emojiTheme"
          picker-type=""
          @select="onSelectEmoji"
        />
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  unref,
  onMounted,
  onUnmounted,
  watch,
  shallowRef,
  type Component,
  type Ref,
} from 'vue'
import { useEmojiNative, useStartReply } from '@/hooks'
import EmojiGlyph from '@/components/1_atoms/EmojiGlyph/EmojiGlyph.vue'
import ExpandReactionsIcon from './icons/ExpandReactionsIcon.vue'
import ReplyIcon from './icons/ReplyIcon.vue'
import MessageActionsIcon from './icons/MessageActionsIcon.vue'
import { QUICK_REACTION_EMOJIS } from './utils/quickReactions'
import {
  useReactionsState,
  useReactionsPanel,
  calculatePanelPosition,
} from './composables'
import {
  registerFeedReactionsPanelBridge,
  useFeedReactionsOverlayState,
} from '@/components/3_compounds/Feed/composables/useFeedReactionsOverlay'

const chatAppId = inject('chatAppId') as string | undefined
const injectedUserId = inject<string | number | undefined>('currentUserId', undefined)
const injectedUserNames = inject<Record<string, string> | undefined>('reactionUserNames', undefined)
const { startReply } = useStartReply(chatAppId || '')
const { isNative, emojiSrc } = useEmojiNative(chatAppId || '')

const overlayState = useFeedReactionsOverlayState()
const target = computed(() => overlayState?.activeTarget.value ?? null)
const anchorRef = ref<HTMLElement | null>(null)

watch(
  () => overlayState?.anchorRef.value,
  (el) => {
    anchorRef.value = el ?? null
  },
  { immediate: true },
)

const emojiTheme = ref<'light' | 'dark'>('light')
const EmojiPicker: Ref<Component | null> = shallowRef(null)
const quickEmojis = computed(() => QUICK_REACTION_EMOJIS)

const resolvedUserId = computed(() => unref(injectedUserId))
const resolvedUserNames = computed(() => unref(injectedUserNames))
const resolvedUserName = computed(() => {
  const id = resolvedUserId.value
  if (id == null) return undefined
  return resolvedUserNames.value?.[String(id)]
})

const reactionsMode = computed(() => target.value?.mode ?? 'single')
const reactionsRef = computed(() => target.value?.reactions)

const reactionsState = useReactionsState(
  reactionsRef,
  reactionsMode,
  resolvedUserId,
  resolvedUserName,
)
const { addReaction, removeReaction, isMyReaction, localReactions } = reactionsState

const panel = useReactionsPanel(quickEmojis, anchorRef)
const {
  isQuickReactionsOpen,
  isFullPickerOpen,
  pickerRef,
  quickReactionsRef,
  quickPanelStyle,
  pickerStyle,
  closeQuickPanel,
  closeFullPicker,
  handleMessageMouseEnter,
  handleMessageMouseLeave,
  openFullPicker,
  handleQuickPanelMouseEnter,
  handleQuickPanelMouseLeave,
  handlePickerMouseEnter,
  handlePickerMouseLeave,
  handleClickOutside,
} = panel

watch(anchorRef, async (el) => {
  if (!el || !isQuickReactionsOpen.value) return
  const estimatedWidth = quickReactionsRef.value?.offsetWidth || quickEmojis.value.length * 40 + 40
  quickPanelStyle.value = await calculatePanelPosition(quickReactionsRef.value, el, estimatedWidth)
})

function canMutate(): boolean {
  return !!(target.value?.enabled && resolvedUserId.value != null)
}

function changeThemeDialogEmoji(): 'light' | 'dark' {
  if (!chatAppId) return 'light'
  const el = document.getElementById(chatAppId)
  return el?.getAttribute('data-theme')?.includes('dark') ? 'dark' : 'light'
}

async function ensureEmojiPicker(): Promise<void> {
  if (EmojiPicker.value) return
  await import('vue3-emoji-picker-ru/css')
  const mod = await import('vue3-emoji-picker-ru')
  EmojiPicker.value = mod.default as Component
}

function syncReactionsToMessage(): void {
  const t = target.value
  const local = localReactions.value
  if (!t || !local) return
  t.patchReactions({
    ...local,
    items: local.items.map((item) => ({ ...item })),
    meta: local.meta ? { ...local.meta } : undefined,
  })
}

function onQuickEmojiClick(key: string) {
  const t = target.value
  if (!t || !canMutate()) return

  if (isMyReaction(key)) {
    removeReaction(key)
    t.handlers.onRemoveReaction({ messageId: t.messageId, key })
  } else {
    const previousKey = addReaction(key)
    if (previousKey) {
      t.handlers.onRemoveReaction({ messageId: t.messageId, key: previousKey })
    }
    t.handlers.onAddReaction({ messageId: t.messageId, key })
  }

  syncReactionsToMessage()
  closeQuickPanel()
}

function onReplyClick() {
  const t = target.value
  if (!t?.reply) return
  startReply(t.reply)
  closeQuickPanel()
}

function onMenuClick(event: MouseEvent) {
  const t = target.value
  if (!t?.menuEnabled) return

  const el = event.currentTarget
  const triggerRect = el instanceof HTMLElement
    ? (() => {
      const r = el.getBoundingClientRect()
      return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height }
    })()
    : undefined

  t.handlers.onMenu({ messageId: t.messageId, triggerRect, event })
}

async function onExpandClick() {
  if (!target.value?.enabled) return
  emojiTheme.value = changeThemeDialogEmoji()
  await ensureEmojiPicker()
  await openFullPicker()
}

function onSelectEmoji(emojiObj: { i: string }) {
  const t = target.value
  closeFullPicker()
  closeQuickPanel()
  if (!t || !canMutate()) return

  const key = emojiObj.i
  if (isMyReaction(key)) return

  const previousKey = addReaction(key)
  if (previousKey) {
    t.handlers.onRemoveReaction({ messageId: t.messageId, key: previousKey })
  }
  t.handlers.onAddReaction({ messageId: t.messageId, key })
  syncReactionsToMessage()
}

function containsPanelNode(node: Node): boolean {
  return !!(quickReactionsRef.value?.contains(node) || pickerRef.value?.contains(node))
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  registerFeedReactionsPanelBridge({
    onMessageEnter: handleMessageMouseEnter,
    onMessageLeave: handleMessageMouseLeave,
    isPanelOpen: () => isQuickReactionsOpen.value || isFullPickerOpen.value,
    containsNode: containsPanelNode,
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  registerFeedReactionsPanelBridge(null)
})

watch(
  () => target.value,
  (next) => {
    if (!next) {
      closeQuickPanel()
      closeFullPicker()
    }
  },
)
</script>

<style scoped lang="scss">
@use './styles/MessageReactions.scss';
</style>
