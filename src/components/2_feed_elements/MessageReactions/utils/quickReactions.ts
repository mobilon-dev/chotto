/**
 * Список популярных эмоджи для быстрых реакций
 * Используется в MessageReactions
 */
export const QUICK_REACTION_EMOJIS = [
  '👍', // thumbs up
  '❤️', // heart
  '🔥', // fire
  '😂', // laughing
  '😮', // surprised
  '😢', // sad
] as const

export type QuickReactionEmoji = typeof QUICK_REACTION_EMOJIS[number]

