import type { EditMessageSource } from './buildEditPayload'

export type ResolveEditLastSentMessage = () =>
  | (EditMessageSource & { canEdit?: boolean; deleted?: boolean })
  | null
  | undefined

export function isCursorOnFirstLine(text: string, selectionStart: number): boolean {
  const caret = Math.max(0, selectionStart)
  return !text.slice(0, caret).includes('\n')
}

export function canStartEditLastSent(options: {
  key: string
  altKey?: boolean
  metaKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  hasResolver: boolean
  disabled: boolean
  isRecording: boolean
  draftText: string
  replyMessageId?: string | number | null
  editMessageId?: string | number | null
  textareaText: string
  selectionStart: number
}): boolean {
  if (options.key !== 'ArrowUp') return false
  if (options.altKey || options.metaKey || options.ctrlKey || options.shiftKey) return false
  if (!options.hasResolver) return false
  if (options.disabled || options.isRecording) return false
  if ((options.draftText ?? '').trim() !== '') return false
  if (options.replyMessageId != null && options.replyMessageId !== '') return false
  if (options.editMessageId != null && options.editMessageId !== '') return false
  return isCursorOnFirstLine(options.textareaText ?? '', options.selectionStart)
}

export function isEditableLastSentCandidate(
  message: ReturnType<ResolveEditLastSentMessage>,
): message is EditMessageSource {
  if (!message || message.messageId == null || message.messageId === '') return false
  if (message.deleted === true) return false
  if (message.canEdit === false) return false
  return true
}
