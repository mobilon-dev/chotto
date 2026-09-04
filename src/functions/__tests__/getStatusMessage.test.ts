import { describe, expect, it } from 'vitest'
import { getStatus, getStatusTitle, statuses } from '../getStatusMessage'

describe('getStatus', () => {
  it('маппит известные статусы в CSS-классы', () => {
    expect(getStatus('read')).toBe('status--read')
    expect(getStatus('received')).toBe('status--received')
    expect(getStatus('pending')).toBe('status--pending')
    expect(getStatus('error')).toBe('status--error')
  })

  it('возвращает пустую строку для sent и неизвестных', () => {
    expect(getStatus('sent')).toBe('')
    expect(getStatus('unknown')).toBe('')
  })
})

describe('getStatusTitle', () => {
  it('возвращает базовые заголовки', () => {
    expect(getStatusTitle('pending')).toBe('Отправляется')
    expect(getStatusTitle('sent')).toBe('Отправлено')
    expect(getStatusTitle('received')).toBe('Доставлено')
    expect(getStatusTitle('read')).toBe('Прочитано')
    expect(getStatusTitle('error')).toBe('Ошибка')
  })

  it('подставляет statusMsg, если он задан', () => {
    expect(getStatusTitle('error', 'Таймаут')).toBe('Таймаут')
  })

  it('игнорирует пустой statusMsg', () => {
    expect(getStatusTitle('sent', '   ')).toBe('Отправлено')
  })

  it('возвращает пустую строку для неизвестного статуса', () => {
    expect(getStatusTitle('unknown')).toBe('')
  })
})

describe('statuses', () => {
  it('содержит ожидаемый набор статусов', () => {
    expect(statuses).toEqual(['read', 'received', 'sent', 'pending', 'error'])
  })
})
