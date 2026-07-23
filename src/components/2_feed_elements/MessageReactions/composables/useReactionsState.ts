import { ref, computed, watch, type Ref } from 'vue'
import type { MessageReactions } from '@/types'
import {
  aggregateReactions,
  getMyReactionKey,
  hasMyReaction,
  updateLocalReactionsAdd,
  updateLocalReactionsRemove,
  updateLocalReactionsToggle,
  updateLocalReactionsReplace,
  type ReactionsMode,
} from './useReactions'

/** Глубокое копирование, чтобы локальные мутации не портили props и не сбрасывали UI через deep-watch */
function cloneReactions(reactions: MessageReactions | undefined): MessageReactions | undefined {
  if (!reactions) return undefined

  return {
    ...reactions,
    items: reactions.items.map(item => ({ ...item })),
    meta: reactions.meta ? { ...reactions.meta } : undefined,
  }
}

/**
 * Композабл для управления локальным состоянием реакций (event-list → агрегированные чипы)
 */
export function useReactionsState(
  initialReactions: Ref<MessageReactions | undefined>,
  mode: Ref<ReactionsMode>,
  currentUserId: Ref<string | number | undefined>,
  currentUserName?: Ref<string | undefined>
) {
  const localReactions = ref<MessageReactions | undefined>(cloneReactions(initialReactions.value))

  watch(initialReactions, (newReactions) => {
    localReactions.value = cloneReactions(newReactions)
  }, { deep: true, immediate: true })

  const displayedReactions = computed(() => {
    return aggregateReactions(localReactions.value, currentUserId.value)
  })

  const hasReactions = computed(() => displayedReactions.value.length > 0)

  const myReactionKey = computed(() => {
    return getMyReactionKey(localReactions, currentUserId.value)
  })

  function resolveMyName(): string | undefined {
    const name = currentUserName?.value?.trim()
    return name || undefined
  }

  function requireUserId(): string | number | undefined {
    return currentUserId.value
  }

  function addReaction(key: string): string | undefined {
    const userId = requireUserId()
    if (userId == null) return undefined
    const name = resolveMyName()

    if (mode.value === 'single') {
      return updateLocalReactionsReplace(localReactions, key, userId, name)
    }
    updateLocalReactionsAdd(localReactions, key, userId, mode.value, name)
    return undefined
  }

  function removeReaction(key: string) {
    const userId = requireUserId()
    if (userId == null) return
    updateLocalReactionsRemove(localReactions, key, userId)
  }

  function toggleReaction(key: string) {
    const userId = requireUserId()
    if (userId == null) return
    updateLocalReactionsToggle(localReactions, key, userId, mode.value, resolveMyName())
  }

  function isMyReaction(key: string): boolean {
    return hasMyReaction(localReactions, key, currentUserId.value)
  }

  return {
    localReactions,
    displayedReactions,
    hasReactions,
    myReactionKey,
    addReaction,
    removeReaction,
    toggleReaction,
    isMyReaction,
  }
}
