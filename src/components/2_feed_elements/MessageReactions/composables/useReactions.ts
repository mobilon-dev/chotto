import type { MessageReactions } from '@/types'

export type ReactionsMode = 'single' | 'multi'

/**
 * Добавляет или увеличивает реакцию в локальном состоянии
 */
export function updateLocalReactionsAdd(
  localReactions: { value: MessageReactions | undefined },
  key: string,
  mode: ReactionsMode = 'multi'
): void {
  if (!localReactions.value) {
    localReactions.value = {
      items: [],
      meta: { mode }
    }
  } else {
    localReactions.value.meta = { ...localReactions.value.meta, mode }
  }

  const existingItem = localReactions.value.items.find(item => item.key === key)
  if (existingItem) {
    // Увеличиваем счетчик и помечаем как reactedByMe
    existingItem.count++
    existingItem.reactedByMe = true
  } else {
    // Добавляем новую реакцию
    localReactions.value.items.push({
      key,
      count: 1,
      reactedByMe: true
    })
  }
}

/**
 * Удаляет или уменьшает реакцию в локальном состоянии
 */
export function updateLocalReactionsRemove(
  localReactions: { value: MessageReactions | undefined },
  key: string
): void {
  if (!localReactions.value) return

  const existingItem = localReactions.value.items.find(item => item.key === key)
  if (existingItem) {
    existingItem.count--
    existingItem.reactedByMe = false

    // Если счетчик стал 0 или меньше, удаляем реакцию
    if (existingItem.count <= 0) {
      localReactions.value.items = localReactions.value.items.filter(item => item.key !== key)

      // Если все реакции удалены, очищаем localReactions
      if (localReactions.value.items.length === 0) {
        localReactions.value = undefined
      }
    }
  }
}

/**
 * В single-режиме заменяет свою текущую реакцию на новую.
 * Возвращает ключ снятой реакции (если была).
 */
export function updateLocalReactionsReplace(
  localReactions: { value: MessageReactions | undefined },
  key: string
): string | undefined {
  const previousKey = localReactions.value?.items?.find(item => item.reactedByMe)?.key

  if (previousKey && previousKey !== key) {
    updateLocalReactionsRemove(localReactions, previousKey)
  }

  updateLocalReactionsAdd(localReactions, key, 'single')
  return previousKey && previousKey !== key ? previousKey : undefined
}

/**
 * Переключает реакцию (добавляет, если нет, или удаляет, если есть)
 */
export function updateLocalReactionsToggle(
  localReactions: { value: MessageReactions | undefined },
  key: string,
  mode: ReactionsMode = 'multi'
): void {
  if (!localReactions.value) {
    updateLocalReactionsAdd(localReactions, key, mode)
    return
  }

  const existingItem = localReactions.value.items.find(item => item.key === key)
  if (existingItem?.reactedByMe) {
    updateLocalReactionsRemove(localReactions, key)
    return
  }

  if (mode === 'single') {
    updateLocalReactionsReplace(localReactions, key)
    return
  }

  updateLocalReactionsAdd(localReactions, key, mode)
}
