import { describe, expect, it } from 'vitest'
import { isSmsChannel, isSmsFeedMessage } from '../isSmsChannel'

describe('isSmsChannel', () => {
  it('возвращает true для channelId с префиксом sms', () => {
    expect(isSmsChannel('sms.M444')).toBe(true)
    expect(isSmsChannel('SMS.foo')).toBe(true)
    expect(isSmsChannel('  sms  ')).toBe(true)
  })

  it('возвращает false для не-SMS каналов и пустых значений', () => {
    expect(isSmsChannel('whatsapp')).toBe(false)
    expect(isSmsChannel('chn_123')).toBe(false)
    expect(isSmsChannel('')).toBe(false)
    expect(isSmsChannel(null)).toBe(false)
    expect(isSmsChannel(undefined)).toBe(false)
  })
})

describe('isSmsFeedMessage', () => {
  it('определяет SMS по messageStyle / meta', () => {
    expect(isSmsFeedMessage({ messageStyle: 'sms' })).toBe(true)
    expect(isSmsFeedMessage({ meta: { messageStyle: 'SMS' } })).toBe(true)
    expect(isSmsFeedMessage({ channel: { serviceType: 'sms' } })).toBe(true)
  })

  it('определяет SMS по channelId сообщения или аргумента', () => {
    expect(isSmsFeedMessage({ channelId: 'sms.M444' })).toBe(true)
    expect(isSmsFeedMessage({}, 'sms.M444')).toBe(true)
    expect(isSmsFeedMessage({ channel: { channelId: 'sms.x' } })).toBe(true)
  })

  it('возвращает false для обычных сообщений', () => {
    expect(isSmsFeedMessage({ channelId: 'chn_1' })).toBe(false)
    expect(isSmsFeedMessage(null)).toBe(false)
    expect(isSmsFeedMessage(undefined, 'whatsapp')).toBe(false)
  })
})
