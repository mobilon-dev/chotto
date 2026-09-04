import { describe, expect, it } from 'vitest'
import { getTypeFileByMime } from '../getTypeFileByMime'

describe('getTypeFileByMime', () => {
  it('определяет image / video / audio', () => {
    expect(getTypeFileByMime('image/png')).toBe('image')
    expect(getTypeFileByMime('video/mp4')).toBe('video')
    expect(getTypeFileByMime('audio/mpeg')).toBe('audio')
  })

  it('возвращает file для неизвестных mime', () => {
    expect(getTypeFileByMime('application/pdf')).toBe('file')
    expect(getTypeFileByMime('')).toBe('file')
    expect(getTypeFileByMime('text/plain')).toBe('file')
  })
})
