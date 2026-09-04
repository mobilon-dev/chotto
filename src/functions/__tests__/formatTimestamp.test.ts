import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { formatTimestamp } from '../formatTimestamp'

const FIXED_NOW = new Date('2024-09-23T12:00:00Z')

describe('formatTimestamp', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает undefined для пустой строки', () => {
    expect(formatTimestamp('')).toBeUndefined()
  })

  it('возвращает «Только что» для текущего момента', () => {
    const nowSec = String(Math.floor(FIXED_NOW.getTime() / 1000))
    expect(formatTimestamp(nowSec)).toBe('Только что')
  })

  it('форматирует секунды назад', () => {
    const ts = String(Math.floor(FIXED_NOW.getTime() / 1000) - 5)
    expect(formatTimestamp(ts)).toBe('5 секунды назад')
  })

  it('форматирует минуты назад', () => {
    const ts = String(Math.floor(FIXED_NOW.getTime() / 1000) - 120)
    expect(formatTimestamp(ts)).toBe('2 минуты назад')
  })

  it('форматирует часы назад', () => {
    const ts = String(Math.floor(FIXED_NOW.getTime() / 1000) - 7200)
    expect(formatTimestamp(ts)).toBe('2 часа назад')
  })

  it('форматирует дни назад', () => {
    const ts = String(Math.floor(FIXED_NOW.getTime() / 1000) - 86400 * 3)
    expect(formatTimestamp(ts)).toBe('3 дня назад')
  })

  it('показывает дату для событий старше 30 дней', () => {
    const old = new Date('2024-01-01T00:00:00Z')
    const ts = String(Math.floor(old.getTime() / 1000))
    expect(formatTimestamp(ts)).toBe(old.toLocaleDateString('ru-RU'))
  })
})
