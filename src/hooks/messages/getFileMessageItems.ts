import type { IFileMessageItem } from '@/types'

export interface FileMessageItemsSource {
  url?: string
  filename?: string
  items?: IFileMessageItem[]
}

function isFileItem(value: unknown): value is IFileMessageItem {
  if (!value || typeof value !== 'object') return false
  const url = (value as IFileMessageItem).url
  return typeof url === 'string' && url.length > 0
}

/**
 * Список файлов сообщения: `items`, если их больше нуля, иначе корневые `url` / `filename`.
 */
export function getFileMessageItems(message: FileMessageItemsSource | undefined): IFileMessageItem[] {
  if (!message) return []
  const fromItems = (message.items ?? []).filter(isFileItem)
  if (fromItems.length) return fromItems
  if (typeof message.url === 'string' && message.url) {
    return [{
      url: message.url,
      filename: message.filename,
    }]
  }
  return []
}

export function getPrimaryFileItem(message: FileMessageItemsSource | undefined): IFileMessageItem | undefined {
  return getFileMessageItems(message)[0]
}
