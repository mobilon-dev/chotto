import { describe, expect, it } from 'vitest'
import { validateChats, getValidationReport } from '../chatValidator'

const validChat = {
  chatId: 'chat-1',
  name: 'Иван',
  countUnread: 0,
  lastMessage: 'Привет',
  'lastActivity.timestamp': 1727027959,
}

describe('validateChats', () => {
  it('отклоняет не-массив', () => {
    const result = validateChats({})
    expect(result.isValid).toBe(false)
    expect(result.errors[0].path).toBe('chats')
  })

  it('предупреждает о пустом массиве', () => {
    const result = validateChats([])
    expect(result.isValid).toBe(true)
    expect(result.warnings).toHaveLength(1)
  })

  it('принимает валидный чат', () => {
    expect(validateChats([validChat]).isValid).toBe(true)
  })

  it('требует обязательные поля', () => {
    const result = validateChats([{}])
    expect(result.isValid).toBe(false)
    const paths = result.errors.map((e) => e.path)
    expect(paths).toContain('chats[0].chatId')
    expect(paths).toContain('chats[0].name')
    expect(paths).toContain('chats[0].countUnread')
    expect(paths).toContain('chats[0].lastMessage')
    expect(paths).toContain("chats[0]['lastActivity.timestamp']")
  })

  it('отклоняет отрицательный countUnread', () => {
    const result = validateChats([{ ...validChat, countUnread: -1 }])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.path.endsWith('.countUnread'))).toBe(true)
  })

  it('валидирует actions', () => {
    const result = validateChats([
      {
        ...validChat,
        actions: [{ title: 'без action' }],
      },
    ])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.path.includes('.actions'))).toBe(true)
  })

  it('валидирует dialogs', () => {
    const result = validateChats([
      {
        ...validChat,
        dialogs: [
          {
            dialogId: 'd1',
            name: 'Диалог',
            'lastActivity.timestamp': 1,
            isSelected: true,
          },
        ],
      },
    ])
    expect(result.isValid).toBe(true)

    const invalid = validateChats([{ ...validChat, dialogs: [{}] }])
    expect(invalid.isValid).toBe(false)
  })

  it('ловит дублирующийся chatId', () => {
    const result = validateChats([validChat, { ...validChat, name: 'Другой' }])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.message.includes('Дублирующийся chatId'))).toBe(true)
  })

  it('формирует отчёт', () => {
    const report = getValidationReport(validateChats([{}]))
    expect(report).toContain('РЕЗУЛЬТАТ ВАЛИДАЦИИ ЧАТОВ')
  })
})
