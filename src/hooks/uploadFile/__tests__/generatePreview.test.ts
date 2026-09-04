import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { generatePreview, buildFilePreview } from '../generatePreview'

describe('generatePreview', () => {
  const createObjectURL = vi.fn(() => 'blob:preview')

  beforeEach(() => {
    createObjectURL.mockClear()
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL,
      revokeObjectURL: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('создаёт preview URL для image', () => {
    const file = new File(['x'], 'photo.png', { type: 'image/png' })
    const preview = generatePreview(file)

    expect(preview.isImage).toBe(true)
    expect(preview.isVideo).toBe(false)
    expect(preview.isAudio).toBe(false)
    expect(preview.previewUrl).toBe('blob:preview')
    expect(createObjectURL).toHaveBeenCalledWith(file)
  })

  it('создаёт preview URL для video и audio', () => {
    const video = generatePreview(new File(['x'], 'v.mp4', { type: 'video/mp4' }))
    const audio = generatePreview(new File(['x'], 'a.mp3', { type: 'audio/mpeg' }))

    expect(video.isVideo).toBe(true)
    expect(audio.isAudio).toBe(true)
    expect(video.previewUrl).toBe('blob:preview')
    expect(audio.previewUrl).toBe('blob:preview')
  })

  it('не создаёт preview для обычного файла', () => {
    const preview = generatePreview(new File(['x'], 'doc.pdf', { type: 'application/pdf' }))

    expect(preview.isImage).toBe(false)
    expect(preview.previewUrl).toBe('')
    expect(createObjectURL).not.toHaveBeenCalled()
  })

  it('форматирует размер файла', () => {
    const bytes = new Uint8Array(2048)
    const preview = generatePreview(new File([bytes], 'a.bin', { type: 'application/octet-stream' }))
    expect(preview.fileSize).toMatch(/КБ/)
  })
})

describe('buildFilePreview', () => {
  it('возвращает undefined без preview', () => {
    expect(buildFilePreview('a.png', undefined)).toBeUndefined()
  })

  it('собирает IFilePreview', () => {
    const preview = {
      isImage: true,
      isVideo: false,
      isAudio: false,
      previewUrl: 'blob:1',
      fileSize: '1 КБ',
    }
    expect(buildFilePreview('photo.png', preview)).toEqual({
      ...preview,
      fileName: 'photo.png',
    })
  })
})
