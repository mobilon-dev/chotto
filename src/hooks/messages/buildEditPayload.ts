import type { Edit } from '@/types'

export interface EditMessageSource {
  messageId: string | number
  type?: string
  text?: string
}

export function buildEditPayload(message: EditMessageSource, fallbackType = 'message.text'): Edit {
  return {
    messageId: String(message.messageId),
    type: message.type ?? fallbackType,
    text: message.text,
  }
}
