import { describe, expect, it } from 'vitest'
import { validateMessages, getMessageValidationReport } from '../messageValidator'

const validTextMessage = {
  messageId: 'm1',
  type: 'message.text',
  timestamp: 1727027959,
  chatId: 'chat-1',
  direction: 'outgoing',
  status: 'sent',
  text: 'Привет',
}

describe('validateMessages', () => {
  it('отклоняет не-массив', () => {
    const result = validateMessages(null)
    expect(result.isValid).toBe(false)
    expect(result.errors[0].path).toBe('messages')
  })

  it('предупреждает о пустом массиве, но считает валидным', () => {
    const result = validateMessages([])
    expect(result.isValid).toBe(true)
    expect(result.warnings).toHaveLength(1)
  })

  it('принимает валидное текстовое сообщение', () => {
    const result = validateMessages([validTextMessage])
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('требует messageId, type и timestamp', () => {
    const result = validateMessages([{}])
    expect(result.isValid).toBe(false)
    const paths = result.errors.map((e) => e.path)
    expect(paths).toContain('messages[0].messageId')
    expect(paths).toContain('messages[0].type')
    expect(paths).toContain('messages[0].timestamp')
  })

  it('разрешает system.date без messageId и timestamp', () => {
    const result = validateMessages([{ type: 'system.date', day: 'Сегодня', text: 'Сегодня' }])
    expect(result.isValid).toBe(true)
  })

  it('валидирует direction и status', () => {
    const result = validateMessages([
      { ...validTextMessage, direction: 'sideways', status: 'flying' },
    ])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.path.endsWith('.direction'))).toBe(true)
    expect(result.errors.some((e) => e.path.endsWith('.status'))).toBe(true)
  })

  it('валидирует file/image поля url и filename как строки', () => {
    const result = validateMessages([
      {
        ...validTextMessage,
        type: 'message.file',
        url: 123,
        filename: false,
      },
    ])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.path.endsWith('.url'))).toBe(true)
    expect(result.errors.some((e) => e.path.endsWith('.filename'))).toBe(true)
  })

  it('валидирует reply', () => {
    const invalid = validateMessages([
      { ...validTextMessage, reply: { text: 'без id' } },
    ])
    expect(invalid.isValid).toBe(false)
    expect(invalid.errors.some((e) => e.path.includes('.reply'))).toBe(true)

    const valid = validateMessages([
      {
        ...validTextMessage,
        reply: { messageId: 'm0', type: 'message.text', text: 'цитата' },
      },
    ])
    expect(valid.isValid).toBe(true)
  })

  it('ловит дублирующийся messageId в одном чате', () => {
    const result = validateMessages([
      validTextMessage,
      { ...validTextMessage, text: 'дубль' },
    ])
    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.message.includes('Дублирующийся messageId'))).toBe(true)
  })

  it('формирует читаемый отчёт', () => {
    const result = validateMessages([{ type: 'message.text' }])
    const report = getMessageValidationReport(result)
    expect(report).toContain('РЕЗУЛЬТАТ ВАЛИДАЦИИ СООБЩЕНИЙ')
    expect(report).toContain('ОШИБКИ')
  })
})
