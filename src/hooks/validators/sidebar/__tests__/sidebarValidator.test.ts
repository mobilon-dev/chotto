import { describe, expect, it } from 'vitest'
import { validateSidebarItems } from '../sidebarValidator'

const validItem = {
  itemId: 'chats',
  icon: 'pi pi-comments',
  notificationCount: 0,
  selected: true,
  name: 'Чаты',
}

describe('validateSidebarItems', () => {
  it('отклоняет не-массив', () => {
    const result = validateSidebarItems(null)
    expect(result.isValid).toBe(false)
    expect(result.errors[0].path).toBe('sidebarItems')
  })

  it('принимает валидный item', () => {
    expect(validateSidebarItems([validItem]).isValid).toBe(true)
  })

  it('требует обязательные поля', () => {
    const result = validateSidebarItems([{}])
    expect(result.isValid).toBe(false)
    const paths = result.errors.map((e) => e.path)
    expect(paths).toContain('sidebarItems[0].itemId')
    expect(paths).toContain('sidebarItems[0].icon')
    expect(paths).toContain('sidebarItems[0].notificationCount')
    expect(paths).toContain('sidebarItems[0].selected')
  })

  it('отклоняет отрицательный notificationCount', () => {
    const result = validateSidebarItems([{ ...validItem, notificationCount: -1 }])
    expect(result.isValid).toBe(false)
  })

  it('валидирует опциональные boolean-флаги', () => {
    const result = validateSidebarItems([
      { ...validItem, isFixedBottom: 'yes', isFixedTop: 1 },
    ])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.path.includes('isFixedBottom'))).toBe(true)
    expect(result.errors.some((e) => e.path.includes('isFixedTop'))).toBe(true)
  })
})
