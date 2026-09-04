import { describe, expect, it } from 'vitest'
import { getMessageClass } from '../getMessageClass'

describe('getMessageClass', () => {
  it('возвращает left-класс для позиции left', () => {
    expect(getMessageClass('left', 'text-message')).toBe('text-message__left')
  })

  it('возвращает right-класс для позиции right', () => {
    expect(getMessageClass('right', 'text-message')).toBe('text-message__right')
  })

  it('для любой не-left позиции использует right', () => {
    expect(getMessageClass('center', 'file-message')).toBe('file-message__right')
  })
})
