import type { MessageReactionChip, MessageReactions } from '@/types'

export type ReactionsMode = 'single' | 'multi'

export type ReactionsRef = { value: MessageReactions | undefined }

export function sameUserId(
  a: string | number | undefined | null,
  b: string | number | undefined | null
): boolean {
  if (a == null || b == null) return false
  return String(a) === String(b)
}

export function hasMyReaction(
  localReactions: ReactionsRef,
  key: string,
  currentUserId: string | number | undefined | null
): boolean {
  if (currentUserId == null) return false
  return localReactions.value?.items?.some(
    item => item.key === key && sameUserId(item.userId, currentUserId)
  ) ?? false
}

export function getMyReactionKey(
  localReactions: ReactionsRef,
  currentUserId: string | number | undefined | null
): string | undefined {
  if (currentUserId == null) return undefined
  return localReactions.value?.items?.find(
    item => sameUserId(item.userId, currentUserId)
  )?.key
}

/** Группирует event-list в чипы для UI */
export function aggregateReactions(
  reactions: MessageReactions | undefined,
  currentUserId: string | number | undefined | null
): MessageReactionChip[] {
  if (!reactions?.items?.length) return []

  const map = new Map<string, MessageReactionChip>()

  for (const item of reactions.items) {
    const existing = map.get(item.key)
    const isMine = sameUserId(item.userId, currentUserId)

    if (existing) {
      existing.count++
      if (isMine) existing.reactedByMe = true
      existing.events.push({ ...item })
    } else {
      map.set(item.key, {
        key: item.key,
        count: 1,
        reactedByMe: isMine,
        events: [{ ...item }],
      })
    }
  }

  return Array.from(map.values())
}

/**
 * Добавляет реакцию текущего пользователя
 */
export function updateLocalReactionsAdd(
  localReactions: ReactionsRef,
  key: string,
  currentUserId: string | number,
  mode: ReactionsMode = 'multi',
  name?: string
): void {
  if (!localReactions.value) {
    localReactions.value = {
      items: [],
      meta: { mode },
    }
  } else {
    localReactions.value.meta = { ...localReactions.value.meta, mode }
  }

  if (hasMyReaction(localReactions, key, currentUserId)) return

  localReactions.value.items.push({
    key,
    userId: currentUserId,
    date: Math.floor(Date.now() / 1000),
    ...(name ? { name } : {}),
  })
}

/**
 * Удаляет реакцию текущего пользователя по ключу
 */
export function updateLocalReactionsRemove(
  localReactions: ReactionsRef,
  key: string,
  currentUserId: string | number
): void {
  if (!localReactions.value) return

  localReactions.value.items = localReactions.value.items.filter(
    item => !(item.key === key && sameUserId(item.userId, currentUserId))
  )

  if (localReactions.value.items.length === 0) {
    localReactions.value = undefined
  }
}

/**
 * В single-режиме заменяет свою текущую реакцию на новую.
 * Возвращает ключ снятой реакции (если была).
 */
export function updateLocalReactionsReplace(
  localReactions: ReactionsRef,
  key: string,
  currentUserId: string | number,
  name?: string
): string | undefined {
  const previousKey = getMyReactionKey(localReactions, currentUserId)

  if (previousKey && previousKey !== key) {
    updateLocalReactionsRemove(localReactions, previousKey, currentUserId)
  }

  updateLocalReactionsAdd(localReactions, key, currentUserId, 'single', name)
  return previousKey && previousKey !== key ? previousKey : undefined
}

/**
 * Переключает реакцию (добавляет, если нет, или удаляет, если есть)
 */
export function updateLocalReactionsToggle(
  localReactions: ReactionsRef,
  key: string,
  currentUserId: string | number,
  mode: ReactionsMode = 'multi',
  name?: string
): void {
  if (hasMyReaction(localReactions, key, currentUserId)) {
    updateLocalReactionsRemove(localReactions, key, currentUserId)
    return
  }

  if (mode === 'single') {
    updateLocalReactionsReplace(localReactions, key, currentUserId, name)
    return
  }

  updateLocalReactionsAdd(localReactions, key, currentUserId, mode, name)
}
