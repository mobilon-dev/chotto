import type { IImageMessageItem, Reply } from '@/types'
import { getPrimaryImageItem } from './getImageMessageItems'

export interface ReplyMessageSource {
  messageId: string | number
  type?: string
  text?: string
  url?: string
  imagePreviewUrl?: string
  videoPreviewUrl?: string
  coverUrl?: string
  filename?: string
  header?: string
  callDuration?: string
  items?: IImageMessageItem[]
}

export function buildReplyPayload(message: ReplyMessageSource, fallbackType: string): Reply {
  const primaryImage = fallbackType === 'message.image' || message.type === 'message.image'
    ? getPrimaryImageItem(message)
    : undefined

  return {
    messageId: String(message.messageId),
    type: message.type ?? fallbackType,
    text: message.text,
    filename: message.filename ?? primaryImage?.filename,
    url: message.url || primaryImage?.url,
    imagePreviewUrl: message.imagePreviewUrl || primaryImage?.imagePreviewUrl,
    videoPreviewUrl: message.videoPreviewUrl,
    coverUrl: message.coverUrl,
    header: message.header,
    callDuration: message.callDuration,
  }
}
