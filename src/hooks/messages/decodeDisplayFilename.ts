const URI_ENCODED_SEGMENT = /%[0-9A-Fa-f]{2}/

/** Имя файла из API часто приходит в percent-encoding — декодируем для отображения. */
export function decodeDisplayFilename(filename: string | undefined): string | undefined {
  if (filename === undefined || filename === '') return filename
  if (!URI_ENCODED_SEGMENT.test(filename)) return filename
  try {
    return decodeURIComponent(filename.replace(/\+/g, ' '))
  } catch {
    return filename
  }
}