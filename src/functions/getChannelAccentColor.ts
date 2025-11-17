/**
 * Возвращает цвет акцента для пузыря сообщения на основе идентификатора канала.
 *
 * Сопоставляет `channelId` с набором правил (`CHANNEL_COLOR_RULES`) и если совпадение найдено —
 * возвращает цвет, заданный для этого канала. В противном случае отдает цвет по умолчанию или
 * переданный `fallback`.
 *
 * @example
 * getChannelAccentColor('telegram') // '#DAF0FF'
 * getChannelAccentColor(undefined, '#fff') // '#fff'
 */
const DEFAULT_CHANNEL_COLOR = '#25D366'

const CHANNEL_COLOR_RULES: Array<{ includes: string[]; color: string }> = [
  {
    includes: ['whatsapp', 'waba'],
    color: '#D9FDD3'
  },
  {
    includes: ['telegram'],
    color: '#DAF0FF'
  },
  {
    includes: ['sms'],
    color: '#E6EBF0'
  },
  {
    includes: ['max'],
    color: '#E6D9F2'
  },
]

export function getChannelAccentColor(channelId?: string | null, fallback: string | null = null) {
  const normalized = channelId?.toLowerCase().trim()

  if (!normalized) {
    return fallback
  }

  for (const rule of CHANNEL_COLOR_RULES) {
    if (rule.includes.some((token) => normalized.includes(token))) {
      return rule.color
    }
  }

  return DEFAULT_CHANNEL_COLOR
}

