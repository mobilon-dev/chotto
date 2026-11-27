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

  it('берёт size из filesize / fileSize на корне', () => {
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
      filesize: 2048,
    })[0].size).toBe(2048)
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
      fileSize: '4096',
    })[0].size).toBe('4096')
  })

  it('подставляет корневой size первому элементу items без size', () => {
    expect(getFileMessageItems({
      size: 512,
      items: [
        { url: 'https://example.com/1.pdf', filename: 'one.pdf' },
        { url: 'https://example.com/2.pdf', filename: 'two.pdf', size: 1024 },
      ],
    })).toEqual([
      { url: 'https://example.com/1.pdf', filename: 'one.pdf', size: 512 },
      { url: 'https://example.com/2.pdf', filename: 'two.pdf', size: 1024 },
    ])
  })

  it('прокидывает size из корня сообщения', () => {
    expect(getFileMessageItems({
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
      size: 2048,
    })).toEqual([{
      url: 'https://example.com/root.pdf',
      filename: 'a.pdf',
      size: 2048,
    }])
  })

  it('без url и items возвращает пустой список', () => {
    expect(getFileMessageItems({})).toEqual([])
    expect(getPrimaryFileItem(undefined)).toBeUndefined()
  })
})
