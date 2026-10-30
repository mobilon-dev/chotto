import { computed, ref, watch, type Ref } from 'vue'

/**
 * Можно ли один раз переключить битый preview на original url.
 * Не ретраим, если preview === url или url пустой (избежать цикла).
 */
export function canFallbackImagePreviewToUrl(
  currentSrc: string,
  imagePreviewUrl?: string,
  url?: string,
): boolean {
  return Boolean(
    imagePreviewUrl &&
    url &&
    imagePreviewUrl !== url &&
    currentSrc === imagePreviewUrl,
  )
}

export function getImageFeedSrc(
  imagePreviewUrl?: string,
  url?: string,
  preferOriginal = false,
): string {
  if (preferOriginal) return url || imagePreviewUrl || ''
  return imagePreviewUrl || url || ''
}

type ImageSrcSource = () => string | undefined

/**
 * Src для ленты: сначала imagePreviewUrl, при @error — однократно url.
 */
export function useImageFeedSrc(getPreviewUrl: ImageSrcSource, getUrl: ImageSrcSource) {
  const preferOriginal = ref(false)

  watch(
    () => [getPreviewUrl(), getUrl()] as const,
    () => {
      preferOriginal.value = false
    },
  )

  const displaySrc = computed(() =>
    getImageFeedSrc(getPreviewUrl(), getUrl(), preferOriginal.value),
  )

  function onImageError() {
    if (canFallbackImagePreviewToUrl(displaySrc.value, getPreviewUrl(), getUrl())) {
      preferOriginal.value = true
    }
  }

  return { displaySrc, onImageError, preferOriginal }
}

export interface AlbumFeedImageItem {
  imagePreviewUrl?: string
  url?: string
}

/**
 * Per-tile fallback для альбома: битый preview одного tile не трогает остальные.
 */
export function useAlbumImageFeedSrc(getItems: () => AlbumFeedImageItem[]) {
  const failedPreviews: Ref<Set<string>> = ref(new Set())

  watch(
    () => getItems().map((item) => `${item.imagePreviewUrl ?? ''}\0${item.url ?? ''}`).join('\n'),
    () => {
      failedPreviews.value = new Set()
    },
  )

  function getItemSrc(item: AlbumFeedImageItem): string {
    const preview = item.imagePreviewUrl
    const preferOriginal = Boolean(preview && failedPreviews.value.has(preview))
    return getImageFeedSrc(preview, item.url, preferOriginal)
  }

  function onItemError(item: AlbumFeedImageItem) {
    const preview = item.imagePreviewUrl
    const url = item.url
    if (!canFallbackImagePreviewToUrl(getItemSrc(item), preview, url) || !preview) return
    const next = new Set(failedPreviews.value)
    next.add(preview)
    failedPreviews.value = next
  }

  return { getItemSrc, onItemError, failedPreviews }
}
