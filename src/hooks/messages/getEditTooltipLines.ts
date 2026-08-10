import type { MessageEditInfo, MessageEditRecord } from '@/types'

export type EditTooltipEntry = {
  text: string
  meta: string
}

export type EditTooltipLines = {
  /** Оригинальный текст до первой правки */
  original?: string
  /** Правки: текст версии и «Имя, дата в время» */
  edits: EditTooltipEntry[]
}

function formatEditRecord({ editedBy, editedAt }: MessageEditRecord): string {
  const by = editedBy?.trim()
  const at = editedAt?.trim()
  if (by && at) return `${by}, ${at}`
  return by || at || ''
}

function resolveEditHistory(edited: MessageEditInfo): MessageEditRecord[] {
  if (edited.history?.length) {
    return edited.history
  }
  if (edited.editedBy || edited.editedAt || edited.originalText) {
    return [{
      text: edited.originalText,
      editedBy: edited.editedBy,
      editedAt: edited.editedAt,
    }]
  }
  return []
}

/**
 * Строки тултипа для метки «изменено»:
 * original — текст до первой правки;
 * edits — для каждой правки: текст версии + «Имя, дата в время».
 */
export function getEditTooltipLines(edited?: MessageEditInfo | null): EditTooltipLines {
  if (!edited) {
    return { edits: [] }
  }

  const original = edited.originalText?.trim() || undefined
  const edits = resolveEditHistory(edited)
    .map((record) => ({
      text: record.text?.trim() || '',
      meta: formatEditRecord(record),
    }))
    .filter((entry) => entry.text || entry.meta)

  return { original, edits }
}
