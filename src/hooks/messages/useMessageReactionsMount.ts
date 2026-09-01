import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'
import type { MessageReactions } from '@/types'

/**
 * Отложенный mount MessageReactions: без items — только после pointerenter на контент.
 */
export function useMessageReactionsMount(
  reactions: MaybeRefOrGetter<MessageReactions | undefined>,
  reactionsActive: MaybeRefOrGetter<boolean>,
) {
  const hoverEngaged = ref(false)

  const hasReactionItems = computed(() => {
    const items = toValue(reactions)?.items
    return Array.isArray(items) && items.length > 0
  })

  const showReactions = computed(
    () => toValue(reactionsActive) && (hasReactionItems.value || hoverEngaged.value),
  )

  function engageReactionsMount(): void {
    hoverEngaged.value = true
  }

  return {
    showReactions,
    engageReactionsMount,
    hasReactionItems,
  }
}
