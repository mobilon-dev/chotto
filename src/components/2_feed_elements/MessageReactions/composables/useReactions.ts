import type { MessageReactions } from '@/types'

/**
 * Добавляет или увеличивает реакцию в локальном состоянии
 */
export function updateLocalReactionsAdd(
  localReactions: { value: MessageReactions | undefined },
  key: string
): void {
  if (!localReactions.value) {
    localReactions.value = {
      items: [],
      meta: { mode: 'multi' }
    }
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
 * Переключает реакцию (добавляет, если нет, или удаляет, если есть)
 */
export function updateLocalReactionsToggle(
  localReactions: { value: MessageReactions | undefined },
  key: string
): void {
  if (!localReactions.value) {
    updateLocalReactionsAdd(localReactions, key)
    return
  }
  
  const existingItem = localReactions.value.items.find(item => item.key === key)
  if (existingItem?.reactedByMe) {
    updateLocalReactionsRemove(localReactions, key)
  } else {
    updateLocalReactionsAdd(localReactions, key)
  }
}

