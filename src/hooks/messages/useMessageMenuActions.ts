import { computed, inject, unref, type Ref } from 'vue'
import type { IFeedMessageMenuAction } from '@/types'
import { getDefaultMessageMenuActions } from '@/components/3_compounds/Feed/utils/getDefaultMessageMenuActions'

/**
 * Пункты контекстного меню сообщения из Feed (`messageMenuActions`)
 * или дефолт: Ответить / Редактировать / Удалить.
 */
export function useMessageMenuActions() {
  const injected = inject<
    Ref<IFeedMessageMenuAction[]> | IFeedMessageMenuAction[] | undefined
  >('messageMenuActions', undefined)

  const menuActions = computed<IFeedMessageMenuAction[]>(() => {
    const value = unref(injected)
    if (Array.isArray(value)) return value
    return getDefaultMessageMenuActions()
  })

  return { menuActions }
}
