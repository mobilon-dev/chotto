import type { MessageReactionItem } from '@/types'

/** timestamp в секундах или миллисекундах → ms */
export function normalizeReactionTimestamp(date?: number): number | undefined {
  if (date == null || !Number.isFinite(date)) return undefined
  return date > 1e12 ? date : date * 1000
}

/** Формат: 20.07.26 11:08 */
export function formatReactionDate(date?: number): string {
  const ms = normalizeReactionTimestamp(date)
  if (ms == null) return ''

  const d = new Date(ms)
  if (Number.isNaN(d.getTime())) return ''

  const pad = (n: number) => String(n).padStart(2, '0')
  const day = pad(d.getDate())
  const month = pad(d.getMonth() + 1)
  const year = String(d.getFullYear()).slice(-2)
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function resolveReactionUserName(
  item: MessageReactionItem,
  userNames?: Record<string, string> | null
): string {
  const fromItem = item.name?.trim()
  if (fromItem) return fromItem

  const fromMap = userNames?.[String(item.userId)]?.trim()
  if (fromMap) return fromMap

  return String(item.userId)
}

/** Сортировка событий по дате (старые сверху) */
export function sortReactionEvents(events: MessageReactionItem[]): MessageReactionItem[] {
  return [...events].sort((a, b) => {
    const aMs = normalizeReactionTimestamp(a.date) ?? 0
    const bMs = normalizeReactionTimestamp(b.date) ?? 0
    return aMs - bMs
  })
}

/**
 * Текст тултипа:
 * Василий Васильев, 20.07.26 11:08
 * Иван Иванов, 20.07.26 11:09
 */
export function buildReactionTooltipText(
  events: MessageReactionItem[],
  userNames?: Record<string, string> | null
): string {
  return sortReactionEvents(events)
    .map((event) => {
      const name = resolveReactionUserName(event, userNames)
      const date = formatReactionDate(event.date)
      return date ? `${name}, ${date}` : name
    })
    .filter(Boolean)
    .join('\n')
}
