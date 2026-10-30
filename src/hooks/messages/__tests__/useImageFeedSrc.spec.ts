import { describe, expect, it } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  canFallbackImagePreviewToUrl,
  getImageFeedSrc,
  useAlbumImageFeedSrc,
  useImageFeedSrc,
} from '../useImageFeedSrc'

const previewUrl = 'https://example.com/preview.jpg'
const fullUrl = 'https://example.com/full.jpg'

describe('getImageFeedSrc / canFallbackImagePreviewToUrl', () => {
  it('предпочитает preview, иначе url', () => {
    expect(getImageFeedSrc(previewUrl, fullUrl)).toBe(previewUrl)
    expect(getImageFeedSrc(undefined, fullUrl)).toBe(fullUrl)
    expect(getImageFeedSrc(previewUrl, fullUrl, true)).toBe(fullUrl)
  })

  it('разрешает fallback только когда preview и url разные и текущий src — preview', () => {
    expect(canFallbackImagePreviewToUrl(previewUrl, previewUrl, fullUrl)).toBe(true)
    expect(canFallbackImagePreviewToUrl(fullUrl, previewUrl, fullUrl)).toBe(false)
    expect(canFallbackImagePreviewToUrl(previewUrl, previewUrl, previewUrl)).toBe(false)
    expect(canFallbackImagePreviewToUrl(previewUrl, previewUrl, undefined)).toBe(false)
  })
})

describe('useImageFeedSrc', () => {
  it('после error переключает displaySrc на url один раз', async () => {
    const preview = ref(previewUrl)
    const url = ref(fullUrl)
    const { displaySrc, onImageError } = useImageFeedSrc(
      () => preview.value,
      () => url.value,
    )

    expect(displaySrc.value).toBe(previewUrl)
    onImageError()
    expect(displaySrc.value).toBe(fullUrl)

    onImageError()
    expect(displaySrc.value).toBe(fullUrl)
  })

  it('не ретраит, если preview === url', () => {
    const { displaySrc, onImageError } = useImageFeedSrc(
      () => fullUrl,
      () => fullUrl,
    )
    expect(displaySrc.value).toBe(fullUrl)
    onImageError()
    expect(displaySrc.value).toBe(fullUrl)
  })

  it('сбрасывает fallback при смене url/preview', async () => {
    const preview = ref(previewUrl)
    const url = ref(fullUrl)
    const { displaySrc, onImageError } = useImageFeedSrc(
      () => preview.value,
      () => url.value,
    )

    onImageError()
    expect(displaySrc.value).toBe(fullUrl)

    preview.value = 'https://example.com/preview-2.jpg'
    await nextTick()
    expect(displaySrc.value).toBe('https://example.com/preview-2.jpg')
  })
})

describe('useAlbumImageFeedSrc', () => {
  it('фолбэчит только битый tile', async () => {
    const items = ref([
      { url: 'https://example.com/full-1.jpg', imagePreviewUrl: 'https://example.com/p-1.jpg' },
      { url: 'https://example.com/full-2.jpg', imagePreviewUrl: 'https://example.com/p-2.jpg' },
    ])
    const { getItemSrc, onItemError } = useAlbumImageFeedSrc(() => items.value)

    expect(getItemSrc(items.value[0])).toBe('https://example.com/p-1.jpg')
    expect(getItemSrc(items.value[1])).toBe('https://example.com/p-2.jpg')

    onItemError(items.value[0])
    await nextTick()

    expect(getItemSrc(items.value[0])).toBe('https://example.com/full-1.jpg')
    expect(getItemSrc(items.value[1])).toBe('https://example.com/p-2.jpg')
  })
})
