<template>
  <div
    ref="reactionsContainerRef"
    class="message-reactions"
    :class="{ 'has-reactions': hasReactions, 'is-right-message': isRight, 'is-disabled': !enabled }"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, unref } from 'vue'
import type { MessageReactionChip, MessageReactions } from '@/types'
import { MESSAGE_REACTIONS_PATCH_KEY } from '@/hooks/messages/useMessageReactionsInFeed'
import EmojiGlyph from '@/components/1_atoms/EmojiGlyph/EmojiGlyph.vue'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'
import { buildReactionTooltipText } from './utils/reactionTooltip'
import {
  isRightMessage,
  useReactionsState,
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
  enabled: {
    type: Boolean,
    default: true,
  },
  mode: {
    type: String as () => ReactionsMode,
    default: 'single',
    validator: (value: string) => ['single', 'multi'].includes(value),
  },
  currentUserId: {
    type: [String, Number] as unknown as () => string | number | undefined,
    default: undefined,
  },
  currentUserName: {
    type: String,
    default: undefined,
  },
  reactionUserNames: {
    type: Object as () => Record<string, string>,
    default: undefined,
  },
})

const emit = defineEmits<{
  (e: 'toggle-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'add-reaction', payload: { messageId: string | number; key: string }): void
  (e: 'remove-reaction', payload: { messageId: string | number; key: string }): void
}>()

const injectedUserId = inject<string | number | undefined>('currentUserId', undefined)
const injectedUserNames = inject<Record<string, string> | undefined>('reactionUserNames', undefined)

const reactionsContainerRef = ref<HTMLElement | null>(null)

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

const showCount = computed(() => props.mode === 'multi')

const reactionsState = useReactionsState(
  computed(() => props.reactions),
  reactionsMode,
  resolvedUserId,
  resolvedUserName,
)
const { displayedReactions, hasReactions, addReaction, removeReaction, toggleReaction, localReactions } = reactionsState

const patchReactions = inject(MESSAGE_REACTIONS_PATCH_KEY, null)

function syncReactionsToMessage(): void {
  const local = localReactions.value
  if (!patchReactions || !local) return
  patchReactions({
    ...local,
    items: local.items.map((item) => ({ ...item })),
    meta: local.meta ? { ...local.meta } : undefined,
  })
}

function getReactionTooltip(item: MessageReactionChip): string {
  return buildReactionTooltipText(item.events, resolvedUserNames.value)
}

const isRight = computed(() => isRightMessage(reactionsContainerRef.value))

function canMutate(): boolean {
  return props.enabled && resolvedUserId.value != null
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
    syncReactionsToMessage()
    return
  }

  toggleReaction(key)
  emit('toggle-reaction', { messageId: props.messageId, key })
  syncReactionsToMessage()
}

defineExpose({ reactionsContainerRef })
</script>

<style scoped lang="scss">
@use './styles/MessageReactions.scss';
</style>
