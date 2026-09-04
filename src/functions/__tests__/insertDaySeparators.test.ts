import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertDaySeparators } from '../insertDaySeparators'

const FIXED_NOW = new Date('2024-09-23T15:00:00')

function startOfDaySeconds(date: Date): number {
  return Math.floor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 1000,
  )
}

describe('insertDaySeparators', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает пустой массив для пустого входа', () => {
    expect(insertDaySeparators([])).toEqual([])
  })

  it('вставляет один разделитель для сообщений одного дня', () => {
    const today = startOfDaySeconds(FIXED_NOW) + 3600
    const messages = [{ timestamp: today, text: 'hi' }]

    const result = insertDaySeparators(messages)

    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      isSeparator: true,
      day: 'Сегодня',
      text: 'Сегодня',
      type: 'system.date',
    })
    expect(result[1]).toEqual(messages[0])
  })

  it('вставляет разделители между разными днями', () => {
    const today = startOfDaySeconds(FIXED_NOW) + 100
    const yesterdayDate = new Date(FIXED_NOW)
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = startOfDaySeconds(yesterdayDate) + 100
    const olderDate = new Date(FIXED_NOW)
    olderDate.setDate(olderDate.getDate() - 3)
    const older = startOfDaySeconds(olderDate) + 100

    const messages = [
      { timestamp: today, text: 'today' },
      { timestamp: yesterday, text: 'yesterday' },
      { timestamp: older, text: 'older' },
    ]

    const result = insertDaySeparators(messages)
    const separators = result.filter(
      (item): item is { isSeparator: true; day: string } =>
        typeof item === 'object' && item !== null && 'isSeparator' in item,
    )

    expect(separators).toHaveLength(3)
    expect(separators[0].day).toBe('Сегодня')
    expect(separators[1].day).toBe('Вчера')
    expect(separators[2].day).toBe(new Date(older * 1000).toLocaleDateString())
  })

  it('не дублирует разделитель, если outPreviousDay того же дня', () => {
    const today = startOfDaySeconds(FIXED_NOW) + 200
    const earlierToday = startOfDaySeconds(FIXED_NOW) + 50
    const messages = [{ timestamp: today, text: 'next' }]

    const result = insertDaySeparators(messages, earlierToday)

    expect(result).toEqual(messages)
  })

  it('добавляет разделитель, если outPreviousDay из другого дня', () => {
    const today = startOfDaySeconds(FIXED_NOW) + 200
    const yesterdayDate = new Date(FIXED_NOW)
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = startOfDaySeconds(yesterdayDate) + 50

    const result = insertDaySeparators([{ timestamp: today }], yesterday)

    expect(result[0]).toMatchObject({
      isSeparator: true,
      day: 'Сегодня',
      type: 'system.date',
    })
  })
})
