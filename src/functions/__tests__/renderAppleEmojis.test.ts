import { describe, expect, it } from 'vitest'
import {
  APPLE_EMOJI_CDN,
  normalizeEmojiCdn,
  textContainsEmoji,
  textToAppleEmojiHtml,
} from '../renderAppleEmojis'

describe('renderAppleEmojis helpers', () => {
  it('normalizeEmojiCdn обрезает слэши и подставляет дефолт', () => {
    expect(normalizeEmojiCdn('https://cdn.example/emoji/')).toBe('https://cdn.example/emoji')
    expect(normalizeEmojiCdn('')).toBe(APPLE_EMOJI_CDN)
    expect(normalizeEmojiCdn(undefined)).toBe(APPLE_EMOJI_CDN)
  })

  it('textContainsEmoji: пустая строка и обычный текст', () => {
    expect(textContainsEmoji('')).toBe(false)
    expect(textContainsEmoji('привет')).toBe(false)
  })

  it('textContainsEmoji: emoji-only и смешанный текст', () => {
    expect(textContainsEmoji('😀')).toBe(true)
    expect(textContainsEmoji('привет 😀')).toBe(true)
  })

  it('textToAppleEmojiHtml: пустая строка', () => {
    expect(textToAppleEmojiHtml('')).toBe('')
  })

  it('textToAppleEmojiHtml: обычный текст без эмодзи экранируется', () => {
    expect(textToAppleEmojiHtml('a < b')).toBe('a &lt; b')
  })

  it('textToAppleEmojiHtml: emoji заменяется на img-слот', () => {
    const html = textToAppleEmojiHtml('😀')
    expect(html).toContain('chotto-emoji-slot')
    expect(html).toContain('chotto-emoji')
    expect(html).toContain(APPLE_EMOJI_CDN)
  })
})
