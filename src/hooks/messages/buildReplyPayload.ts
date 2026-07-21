import type { Reply } from '@/types'

export interface ReplyMessageSource {
  messageId: string | number
  type?: string
  text?: string
  url?: string
  filename?: string
  header?: string
  callDuration?: string
}

export function buildReplyPayload(message: ReplyMessageSource, fallbackType: string): Reply {
  return {
    messageId: String(message.messageId),
    type: message.type ?? fallbackType,
    text: message.text,
    filename: message.filename,
    url: message.url,
    header: message.header,
    callDuration: message.callDuration,
  }
}
