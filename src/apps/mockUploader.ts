import type { ChottoUploadFileFn } from '@/hooks'

/**
 * Demo/story adapter: без реального filebump.
 * Возвращает object URL для локального preview загруженного файла.
 */
export const mockUploader: ChottoUploadFileFn = async (file) => {
  const filename = file instanceof File ? file.name : 'blob'
  return {
    url: URL.createObjectURL(file),
    filename,
  }
}
