import type { IFileMessageItem } from '@/types'

export interface FileMessageItemsSource {
  url?: string
  filename?: string
  size?: number | string
  /** Альтернативные имена поля размера из API / WABA */
  filesize?: number | string
  fileSize?: number | string
  items?: IFileMessageItem[]
}

function isNonEmptySize(value: unknown): value is number | string {
  if (value === undefined || value === null) return false
  if (typeof value === 'string' && value.trim() === '') return false
  return typeof value === 'number' || typeof value === 'string'
}

export function getRootFileMessageSize(message: FileMessageItemsSource | undefined): number | string | undefined {
  if (!message) return undefined
  if (isNonEmptySize(message.size)) return message.size
  if (isNonEmptySize(message.filesize)) return message.filesize
  if (isNonEmptySize(message.fileSize)) return message.fileSize
  return undefined
}

function withResolvedSize(
  item: IFileMessageItem,
  index: number,
  rootSize: number | string | undefined,
): IFileMessageItem {
  if (isNonEmptySize(item.size)) return item
  if (index === 0 && rootSize !== undefined) {
    return { ...item, size: rootSize }
  }
  return item
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
  const rootSize = getRootFileMessageSize(message)
  const fromItems = (message.items ?? []).filter(isFileItem)
  if (fromItems.length) {
    return fromItems.map((item, index) => withResolvedSize(item, index, rootSize))
  }
  if (typeof message.url === 'string' && message.url) {
    return [{
      url: message.url,
      filename: message.filename,
      size: rootSize,
    }]
  }
  return []
}

export function getPrimaryFileItem(message: FileMessageItemsSource | undefined): IFileMessageItem | undefined {
  return getFileMessageItems(message)[0]
}
