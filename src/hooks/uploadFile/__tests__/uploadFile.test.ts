import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { uploadFile } from '../uploadFile'
import { runChottoUpload } from '../useChottoUploader'

describe('uploadFile', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('возвращает success при успешном ответе', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => ({ url: 'https://cdn.example/file.png' }),
    } as Response)

    const file = new File(['x'], 'photo.png', { type: 'image/png' })
    const result = await uploadFile('https://filebump.test', file)

    expect(fetch).toHaveBeenCalledWith(
      'https://filebump.test/upload',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(result).toMatchObject({
      status: 'success',
      url: 'https://cdn.example/file.png',
      name: 'photo.png',
      type: 'image',
    })
  })

  it('возвращает error при сетевой ошибке', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(fetch).mockRejectedValue(new Error('network'))

    const result = await uploadFile(
      'https://filebump.test',
      new File(['x'], 'a.txt', { type: 'text/plain' }),
    )

    expect(result).toEqual({ status: 'error' })
  })
})

describe('runChottoUpload', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('использует injectable adapter при успехе', async () => {
    const uploader = vi.fn(async () => ({ url: 'https://cdn/x', filename: 'x.png' }))
    const file = new File(['x'], 'x.png', { type: 'image/png' })

    const result = await runChottoUpload({ file, uploader })

    expect(uploader).toHaveBeenCalledWith(file, undefined)
    expect(result).toMatchObject({ status: 'success', url: 'https://cdn/x', name: 'x.png' })
  })

  it('возвращает error, если adapter бросил исключение', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const uploader = vi.fn(async () => {
      throw new Error('fail')
    })

    const result = await runChottoUpload({
      file: new File(['x'], 'a.txt', { type: 'text/plain' }),
      uploader,
    })

    expect(result).toEqual({ status: 'error' })
  })

  it('возвращает error без uploader и без filebumpUrl', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await runChottoUpload({
      file: new File(['x'], 'a.txt', { type: 'text/plain' }),
    })

    expect(result).toEqual({ status: 'error' })
  })

  it('возвращает error, если adapter не вернул url', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const uploader = vi.fn(async () => ({ url: '' }))

    const result = await runChottoUpload({
      file: new File(['x'], 'a.txt', { type: 'text/plain' }),
      uploader,
    })

    expect(result).toEqual({ status: 'error' })
  })
})
