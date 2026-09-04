import { describe, expect, it } from 'vitest'
import {
  canStartEditLastSent,
  isCursorOnFirstLine,
  isEditableLastSentCandidate,
} from '../canStartEditLastSent'

const baseOk = {
  key: 'ArrowUp',
  hasResolver: true,
  disabled: false,
  isRecording: false,
  draftText: '',
  replyMessageId: null,
  editMessageId: null,
  textareaText: '',
  selectionStart: 0,
}

describe('isCursorOnFirstLine', () => {
  it('true, если каретка до первого переноса', () => {
    expect(isCursorOnFirstLine('hello\nworld', 3)).toBe(true)
    expect(isCursorOnFirstLine('hello\nworld', 5)).toBe(true)
  })

  it('false на второй строке', () => {
    expect(isCursorOnFirstLine('hello\nworld', 7)).toBe(false)
  })
})

describe('canStartEditLastSent', () => {
  it('разрешает ArrowUp в пустом инпуте на первой строке', () => {
    expect(canStartEditLastSent(baseOk)).toBe(true)
  })

  it('блокирует при модификаторах, записи, тексте черновика, reply/edit', () => {
    expect(canStartEditLastSent({ ...baseOk, key: 'ArrowDown' })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, ctrlKey: true })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, hasResolver: false })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, disabled: true })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, isRecording: true })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, draftText: 'x' })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, replyMessageId: 'r1' })).toBe(false)
    expect(canStartEditLastSent({ ...baseOk, editMessageId: 'e1' })).toBe(false)
  })

  it('блокирует, если каретка не на первой строке', () => {
    expect(
      canStartEditLastSent({
        ...baseOk,
        textareaText: 'a\nb',
        selectionStart: 3,
      }),
    ).toBe(false)
  })
})

describe('isEditableLastSentCandidate', () => {
  it('отклоняет deleted / canEdit=false / без id', () => {
    expect(isEditableLastSentCandidate(null)).toBe(false)
    expect(isEditableLastSentCandidate({ messageId: '', type: 'message.text' })).toBe(false)
    expect(isEditableLastSentCandidate({ messageId: '1', type: 'message.text', deleted: true })).toBe(false)
    expect(isEditableLastSentCandidate({ messageId: '1', type: 'message.text', canEdit: false })).toBe(false)
  })

  it('принимает валидного кандидата', () => {
    expect(isEditableLastSentCandidate({ messageId: '1', type: 'message.text', text: 'hi' })).toBe(true)
  })
})
