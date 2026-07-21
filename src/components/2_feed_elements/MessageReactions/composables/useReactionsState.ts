import { ref, computed, watch, type Ref } from 'vue'
import type { MessageReactions } from '@/types'
import {
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
 * Композабл для управления локальным состоянием реакций
 */
export function useReactionsState(
  initialReactions: Ref<MessageReactions | undefined>,
  mode: Ref<ReactionsMode>
) {
  // Локальное состояние реакций для немедленного обновления UI
  const localReactions = ref<MessageReactions | undefined>(cloneReactions(initialReactions.value))

  // Синхронизируем локальное состояние с props
  watch(initialReactions, (newReactions) => {
    localReactions.value = cloneReactions(newReactions)
  }, { deep: true, immediate: true })

  // Отфильтрованные реакции без count === 0
  const displayedReactions = computed(() => {
    if (!localReactions.value?.items) return []
    return localReactions.value.items.filter(item => item.count > 0)
  })

  const hasReactions = computed(() => {
    return displayedReactions.value.length > 0
  })

  const myReactionKey = computed(() => {
    return localReactions.value?.items?.find(item => item.reactedByMe)?.key
  })

  // Функции для обновления реакций
  function addReaction(key: string): string | undefined {
    if (mode.value === 'single') {
      return updateLocalReactionsReplace(localReactions, key)
    }
    updateLocalReactionsAdd(localReactions, key, mode.value)
    return undefined
  }

  function removeReaction(key: string) {
    updateLocalReactionsRemove(localReactions, key)
  }

  function toggleReaction(key: string) {
    updateLocalReactionsToggle(localReactions, key, mode.value)
  }

  return {
    localReactions,
    displayedReactions,
    hasReactions,
    myReactionKey,
    addReaction,
    removeReaction,
    toggleReaction,
  }
}
