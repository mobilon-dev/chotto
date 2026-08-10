import { computed, inject, toValue, unref, type MaybeRefOrGetter, type Ref } from 'vue'
import type { IFeedMessageMenuAction, MessageMenuActionContext } from '@/types'
import { getDefaultMessageMenuActions } from '@/components/3_compounds/Feed/utils/getDefaultMessageMenuActions'

/** Резолв disabled для пункта меню с учётом контекста сообщения */
function resolveDisabled(
  disabled: IFeedMessageMenuAction['disabled'],
  message: MessageMenuActionContext
): boolean {
  if (typeof disabled === 'function') return !!disabled(message)
  return !!disabled
}

/**
 * Пункты контекстного меню сообщения из Feed (`messageMenuActions`)
 * или дефолт: Ответить / Редактировать / Удалить.
 * `disabled` может быть функцией от сообщения — резолвится здесь.
 */
export function useMessageMenuActions(
  message: MaybeRefOrGetter<MessageMenuActionContext> = {}
) {
  const injected = inject<
    Ref<IFeedMessageMenuAction[]> | IFeedMessageMenuAction[] | undefined
  >('messageMenuActions', undefined)

  const menuActions = computed<IFeedMessageMenuAction[]>(() => {
    const value = unref(injected)
    const raw = Array.isArray(value) ? value : getDefaultMessageMenuActions()
    const msg = toValue(message) ?? {}

    return raw.map((action) => {
      if (action.separator) return action
      return {
        ...action,
        disabled: resolveDisabled(action.disabled, msg),
      }
    })
  })

  return { menuActions }
}
