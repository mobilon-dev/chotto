import { describe, expect, it } from 'vitest'
import { getFileMessageItems, getPrimaryFileItem } from '../getFileMessageItems'

describe('getFileMessageItems', () => {
  it('берёт items, если массив не пустой', () => {
    const items = getFileMessageItems({
      url: 'https://example.com/root.pdf',
      items: [
        { url: 'https://example.com/1.pdf', filename: 'one.pdf' },
        { url: 'https://example.com/2.pdf', filename: 'two.pdf' },
      ],
    })
    expect(items).toHaveLength(2)
    expect(items[0].filename).toBe('one.pdf')
  })

  it('отбрасывает элементы без url', () => {
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'root.pdf',
      items: [{ url: '' }, { url: 'https://example.com/ok.pdf' }],
    })).toEqual([
      { url: 'https://example.com/ok.pdf' },
    ])
  })

  it('если все items пустые, берёт корневой url', () => {
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'root.pdf',
      items: [{ url: '' }],
    })).toEqual([{
      url: 'https://example.com/root.pdf',
      filename: 'root.pdf',
    }])
  })

  it('без items возвращает один файл из url', () => {
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
    })).toEqual([{
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
    }])
  })

  it('без url и items возвращает пустой список', () => {
    expect(getFileMessageItems({})).toEqual([])
    expect(getPrimaryFileItem(undefined)).toBeUndefined()
  })
})
