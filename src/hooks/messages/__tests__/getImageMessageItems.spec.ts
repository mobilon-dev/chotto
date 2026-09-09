import { describe, expect, it } from 'vitest'
import { getImageMessageItems, getPrimaryImageItem } from '../getImageMessageItems'

describe('getImageMessageItems', () => {
  it('берёт items, если массив не пустой', () => {
    const items = getImageMessageItems({
      url: 'https://example.com/root.jpg',
      items: [
        { url: 'https://example.com/1.jpg', imagePreviewUrl: 'https://example.com/1p.jpg' },
        { url: 'https://example.com/2.jpg' },
      ],
    })
    expect(items).toHaveLength(2)
    expect(items[0].url).toBe('https://example.com/1.jpg')
    expect(items[0].imagePreviewUrl).toBe('https://example.com/1p.jpg')
  })

  it('отбрасывает элементы без url', () => {
    expect(getImageMessageItems({
      url: 'https://example.com/root.jpg',
      imagePreviewUrl: 'https://example.com/root-p.jpg',
      items: [{ url: '' }, { url: 'https://example.com/ok.jpg' }],
    })).toEqual([
      { url: 'https://example.com/ok.jpg' },
    ])
  })

  it('если все items пустые, берёт корневой url', () => {
    const items = getImageMessageItems({
      url: 'https://example.com/root.jpg',
      imagePreviewUrl: 'https://example.com/p.jpg',
      filename: 'a.jpg',
      items: [{ url: '' }],
    })
    expect(items).toEqual([{
      url: 'https://example.com/root.jpg',
      imagePreviewUrl: 'https://example.com/p.jpg',
      filename: 'a.jpg',
    }])
  })

  it('без items возвращает одно фото из url', () => {
    expect(getImageMessageItems({
      url: 'https://example.com/root.jpg',
      imagePreviewUrl: 'https://example.com/p.jpg',
      filename: 'a.jpg',
    })).toEqual([{
      url: 'https://example.com/root.jpg',
      imagePreviewUrl: 'https://example.com/p.jpg',
      filename: 'a.jpg',
    }])
  })

  it('без url и items возвращает пустой список', () => {
    expect(getImageMessageItems({})).toEqual([])
    expect(getPrimaryImageItem(undefined)).toBeUndefined()
  })
})
