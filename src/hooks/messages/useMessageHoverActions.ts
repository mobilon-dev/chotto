import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { isSmsFeedMessage } from '@/functions/isSmsChannel'

type HoverActionsMessage = {
  deleted?: boolean
} | null | undefined

/**
 * Hover-панели сообщения (реакции и меню по трём точкам).
 * Недоступны для SMS (канал не поддерживает реакции, ответ и редактирование)
 * и для удалённых сообщений (tombstone).
 */
export function useMessageHoverActions(
  channel: MaybeRefOrGetter<string | undefined>,
  reactionsEnabled: MaybeRefOrGetter<boolean> = true,
  message: MaybeRefOrGetter<unknown> = undefined,
) {
  const hoverActionsEnabled = computed(() => {
    const msg = toValue(message) as HoverActionsMessage
    if (msg?.deleted === true) return false
    return !isSmsFeedMessage(msg as any, toValue(channel))
  })
  const reactionsActive = computed(
    () => toValue(reactionsEnabled) && hoverActionsEnabled.value
  )

  return { hoverActionsEnabled, reactionsActive }
}
