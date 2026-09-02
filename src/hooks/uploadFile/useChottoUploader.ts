import { inject, toValue, type MaybeRefOrGetter } from 'vue'
import { generatePreview } from './generatePreview'
import { getTypeFileByMime } from './getTypeFileByMime'
import {
  chottoUploadFileKey,
  type ChottoUploadFileFn,
  type ChottoUploadMeta,
  type ChottoUploadResult,
} from './types'
import { uploadFile, type UploadFileResult } from './uploadFile'

const MISSING_UPLOADER_MESSAGE =
  '[chotto] Uploader is not provided and filebump-url is missing. Pass `uploader` prop, provide(chottoUploadFileKey), or `filebump-url`.'

function ensureFile(file: File | Blob, fallbackName = 'file'): File {
  if (file instanceof File) return file
  return new File([file], fallbackName, { type: file.type })
}

function resolveChottoUploadFileFn(
  propUploader?: ChottoUploadFileFn | null,
  injectedUploader?: ChottoUploadFileFn | null,
): ChottoUploadFileFn | undefined {
  if (typeof propUploader === 'function') return propUploader
  if (typeof injectedUploader === 'function') return injectedUploader
  return undefined
}

function normalizeFilebumpUrl(filebumpUrl?: string | null): string {
  return typeof filebumpUrl === 'string' ? filebumpUrl.trim() : ''
}

function toUploadFileResult(file: File, result: ChottoUploadResult): UploadFileResult {
  const name = result.filename || file.name || 'file'
  return {
    url: result.url,
    name,
    size: file.size,
    type: getTypeFileByMime(file.type),
    status: 'success',
    preview: generatePreview(file),
  }
}

export async function runChottoUpload(params: {
  file: File | Blob
  meta?: ChottoUploadMeta
  uploader?: ChottoUploadFileFn | null
  injectedUploader?: ChottoUploadFileFn | null
  filebumpUrl?: string | null
}): Promise<UploadFileResult> {
  const custom = resolveChottoUploadFileFn(params.uploader, params.injectedUploader)

  if (custom) {
    try {
      const result = await custom(params.file, params.meta)
      if (!result?.url) {
        console.error('[chotto] Uploader returned no url')
        return { status: 'error' }
      }
      const file = params.file instanceof File
        ? params.file
        : ensureFile(params.file, result.filename || 'file')
      return toUploadFileResult(file, result)
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error)
      return { status: 'error' }
    }
  }

  const filebumpUrl = normalizeFilebumpUrl(params.filebumpUrl)
  if (!filebumpUrl) {
    console.error(MISSING_UPLOADER_MESSAGE)
    return { status: 'error' }
  }

  return uploadFile(filebumpUrl, ensureFile(params.file))
}

export function useChottoUploader(options?: {
  uploader?: MaybeRefOrGetter<ChottoUploadFileFn | undefined>
  filebumpUrl?: MaybeRefOrGetter<string | null | undefined>
}) {
  const injectedUploader = inject(chottoUploadFileKey, undefined)

  const upload = (
    file: File | Blob,
    meta?: ChottoUploadMeta,
  ): Promise<UploadFileResult> => {
    return runChottoUpload({
      file,
      meta,
      uploader: options ? toValue(options.uploader) : undefined,
      injectedUploader,
      filebumpUrl: options ? toValue(options.filebumpUrl) : undefined,
    })
  }

  return { upload }
}
