import { describe, expect, it } from 'vitest'
import { sortByTimestamp } from '../sortByTimestamp'

describe('sortByTimestamp', () => {
  it('сортирует сообщения по возрастанию timestamp', () => {
    const messages = [
      { timestamp: 300, id: 'c' },
      { timestamp: 100, id: 'a' },
      { timestamp: 200, id: 'b' },
    ]

    expect(sortByTimestamp(messages).map((m) => m.id)).toEqual(['a', 'b', 'c'])
  })

  it('сохраняет относительный порядок при равных timestamp', () => {
    const messages = [
      { timestamp: 100, id: 'first' },
      { timestamp: 100, id: 'second' },
      { timestamp: 50, id: 'earlier' },
    ]

    expect(sortByTimestamp(messages).map((m) => m.id)).toEqual([
      'earlier',
      'first',
      'second',
    ])
  })

  it('сравнивает строковые timestamp как числа', () => {
    const messages = [
      { timestamp: '20', id: 'b' },
      { timestamp: '3', id: 'a' },
      { timestamp: '100', id: 'c' },
    ]

    expect(sortByTimestamp(messages).map((m) => m.id)).toEqual(['a', 'b', 'c'])
  })

  it('для невалидных timestamp сравнение даёт равенство (порядок сохраняется)', () => {
    const messages = [
      { timestamp: 'bad', id: 'invalid' },
      { timestamp: 10, id: 'valid' },
    ]

    // Number('bad') === NaN; NaN не меньше и не больше числа → comparator возвращает 0
    expect(sortByTimestamp(messages).map((m) => m.id)).toEqual(['invalid', 'valid'])
  })

  it('мутирует исходный массив', () => {
    const messages = [{ timestamp: 2 }, { timestamp: 1 }]
    const result = sortByTimestamp(messages)

    expect(result).toBe(messages)
    expect(messages.map((m) => m.timestamp)).toEqual([1, 2])
  })
})
