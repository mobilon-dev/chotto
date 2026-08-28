import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { isSmsFeedMessage } from '@/functions/isSmsChannel'

/**
 * Hover-панели сообщения (реакции и меню по трём точкам).
 * Для SMS недоступны: канал не поддерживает реакции, ответ и редактирование.
 */
export function useMessageHoverActions(
  channel: MaybeRefOrGetter<string | undefined>,
  reactionsEnabled: MaybeRefOrGetter<boolean> = true,
  message: MaybeRefOrGetter<unknown> = undefined,
) {
  const hoverActionsEnabled = computed(
    () => !isSmsFeedMessage(toValue(message) as any, toValue(channel)),
  )
  const reactionsActive = computed(
    () => toValue(reactionsEnabled) && hoverActionsEnabled.value
  )

  return { hoverActionsEnabled, reactionsActive }
}
