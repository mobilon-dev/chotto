/**
 * Текст и мета для тултипа удалённого сообщения
 * (текст + «Имя, дата в время»).
 */
export type DeletedTooltipLines = {
  original: string
  meta: string
}

function formatDeleteMeta(deletedBy?: string, deletedAt?: string): string {
  const by = deletedBy?.trim()
  const at = deletedAt?.trim()
  if (by && at) return `${by}, ${at}`
  return by || at || ''
}

function resolveOriginalText(message: {
  text?: string
  filename?: string
  alt?: string
}): string {
  const text = typeof message.text === 'string' ? message.text.trim() : ''
  if (text) return text

  const filename = typeof message.filename === 'string' ? message.filename.trim() : ''
  if (filename) return filename

  const alt = typeof message.alt === 'string' ? message.alt.trim() : ''
  if (alt) return alt

  return ''
}

/**
 * Строки тултипа для «Сообщение удалено»:
 * original — исходный текст/подпись;
 * meta — «Имя, дата в время».
 */
export function getDeletedTooltipLines(message: {
  text?: string
  filename?: string
  alt?: string
  deletion?: {
    deletedBy?: string
    deletedAt?: string
  } | null
}): DeletedTooltipLines {
  return {
    original: resolveOriginalText(message),
    meta: formatDeleteMeta(message.deletion?.deletedBy, message.deletion?.deletedAt),
  }
}

/** @deprecated используйте getDeletedTooltipLines().original */
export function getDeletedOriginalText(message: {
  text?: string
  filename?: string
  alt?: string
}): string {
  return resolveOriginalText(message)
}
