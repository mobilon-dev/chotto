import type { InjectionKey } from 'vue'

/** Результат загрузки, который возвращает host adapter. */
export type ChottoUploadResult = {
  url: string
  filename: string
}

export type ChottoUploadMeta = {
  /** Кто инициировал: обычный файл, запись аудио, запись видео. */
  kind?: 'file' | 'audio' | 'video'
}

export type ChottoUploadFileFn = (
  file: File | Blob,
  meta?: ChottoUploadMeta,
) => Promise<ChottoUploadResult>

export const chottoUploadFileKey: InjectionKey<ChottoUploadFileFn> = Symbol('chottoUploadFile')
