import { ref, computed, watch, type Ref } from 'vue'
import type { MessageReactions } from '@/types'
import { updateLocalReactionsAdd, updateLocalReactionsRemove, updateLocalReactionsToggle } from './useReactions'

/**
 * Композабл для управления локальным состоянием реакций
 */
export function useReactionsState(initialReactions: Ref<MessageReactions | undefined>) {
  // Локальное состояние реакций для немедленного обновления UI
  const localReactions = ref<MessageReactions | undefined>(initialReactions.value)

  // Синхронизируем локальное состояние с props
  watch(initialReactions, (newReactions) => {
    localReactions.value = newReactions ? { ...newReactions } : undefined
  }, { deep: true, immediate: true })

  // Отфильтрованные реакции без count === 0
  const displayedReactions = computed(() => {
    if (!localReactions.value?.items) return []
    return localReactions.value.items.filter(item => item.count > 0)
  })

  const hasReactions = computed(() => {
    return displayedReactions.value.length > 0
  })

  // Функции для обновления реакций
  function addReaction(key: string) {
    updateLocalReactionsAdd(localReactions, key)
  }

  function removeReaction(key: string) {
    updateLocalReactionsRemove(localReactions, key)
  }

  function toggleReaction(key: string) {
    updateLocalReactionsToggle(localReactions, key)
  }

  return {
    localReactions,
    displayedReactions,
    hasReactions,
    addReaction,
    removeReaction,
    toggleReaction,
  }
}

