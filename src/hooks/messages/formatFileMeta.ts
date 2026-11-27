const SIZE_UNITS = ['Б', 'КБ', 'МБ', 'ГБ'] as const

const PRE_FORMATTED_SIZE = /(Б|КБ|МБ|ГБ)$/i

function parseByteCount(size: number | string): number | undefined {
  if (typeof size === 'number') {
    return Number.isFinite(size) && size >= 0 ? size : undefined
  }
  const trimmed = size.trim()
  if (!trimmed) return undefined
  if (PRE_FORMATTED_SIZE.test(trimmed)) return undefined
  const num = Number(trimmed)
  if (!Number.isFinite(num) || num < 0) return undefined
  return num
}

type FormatFileByteSizeOptions = {
  /** «256КБ» без пробела перед единицей (строка в ленте) */
  compact?: boolean
}

/** Человекочитаемый размер файла (байты → Б / КБ / МБ / ГБ), как в превью вложений. */
export function formatFileByteSize(
  size?: number | string,
  options?: FormatFileByteSizeOptions,
): string | undefined {
  if (size === undefined || size === null) return undefined
  if (typeof size === 'string' && PRE_FORMATTED_SIZE.test(size.trim())) {
    return size.trim()
  }

  const bytes = parseByteCount(size)
  if (bytes === undefined) {
    return typeof size === 'string' && size.trim() ? size.trim() : undefined
  }

  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  const formatted = unitIndex === 0
    ? String(Math.round(value))
    : (Math.abs(value - Math.round(value)) < 0.05 ? String(Math.round(value)) : value.toFixed(1))

  const unit = SIZE_UNITS[unitIndex]
  return options?.compact ? `${formatted}${unit}` : `${formatted} ${unit}`
}

function nameFromUrl(url?: string): string | undefined {
  if (!url) return undefined
  try {
    const pathname = new URL(url, 'https://placeholder.local').pathname
    const segment = pathname.split('/').filter(Boolean).pop()
    return segment || undefined
  } catch {
    const match = url.match(/\/([^/?#]+)(?:[?#]|$)/)
    return match?.[1]
  }
}

/** Расширение файла в верхнем регистре (PDF, DOCX …). */
export function getFileTypeLabel(filename?: string, url?: string): string | undefined {
  const name = filename?.trim() || nameFromUrl(url)
  if (!name) return undefined
  const dotIndex = name.lastIndexOf('.')
  if (dotIndex <= 0 || dotIndex === name.length - 1) return undefined
  return name.slice(dotIndex + 1).toUpperCase()
}

export function formatFileMetaLine(
  filename: string | undefined,
  url: string | undefined,
  size?: number | string,
): string | undefined {
  const typeLabel = getFileTypeLabel(filename, url)
  const sizeLabel = formatFileByteSize(size, { compact: true })
  if (typeLabel && sizeLabel) return `${typeLabel} - ${sizeLabel}`
  return typeLabel ?? sizeLabel
}