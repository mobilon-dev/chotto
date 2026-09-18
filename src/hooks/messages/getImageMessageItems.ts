import type { IImageMessageItem } from '@/types'

export interface ImageMessageItemsSource {
  url?: string
  imagePreviewUrl?: string
  filename?: string
  items?: IImageMessageItem[]
}

function isImageItem(value: unknown): value is IImageMessageItem {
  if (!value || typeof value !== 'object') return false
  const url = (value as IImageMessageItem).url
  return typeof url === 'string' && url.length > 0
}

/**
 * Список картинок сообщения: `items`, если их больше нуля, иначе корневые `url` / `imagePreviewUrl`.
 */
export function getImageMessageItems(message: ImageMessageItemsSource | undefined): IImageMessageItem[] {
  if (!message) return []
  const fromItems = (message.items ?? []).filter(isImageItem)
  if (fromItems.length) return fromItems
  if (typeof message.url === 'string' && message.url) {
    return [{
      url: message.url,
      imagePreviewUrl: message.imagePreviewUrl,
      filename: message.filename,
    }]
  }
  return []
}

export function getPrimaryImageItem(message: ImageMessageItemsSource | undefined): IImageMessageItem | undefined {
  return getImageMessageItems(message)[0]
}
