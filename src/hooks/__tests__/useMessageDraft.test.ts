import { describe, expect, it } from 'vitest'
import { getDraftFiles, useMessageDraft } from '../useMessageDraft'
import { withSetup } from '@/test-utils/withSetup'

describe('getDraftFiles', () => {
  it('возвращает пустой массив без черновика', () => {
    expect(getDraftFiles(undefined)).toEqual([])
  })

  it('предпочитает files над file', () => {
    expect(
      getDraftFiles({
        id: 'x',
        text: '',
        forceSend: false,
        isRecording: false,
        file: { url: 'a' },
        files: [{ url: 'b' }, { url: 'c' }],
      }),
    ).toEqual([{ url: 'b' }, { url: 'c' }])
  })
})

describe('useMessageDraft', () => {
  it('сохраняет и восстанавливает текст по chatAppId', () => {
    const id = `draft-test-${Date.now()}-a`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setMessageText('привет')
    expect(result.getMessage().text).toBe('привет')

    result.resetMessage()
    expect(result.getMessage().text).toBe('')
    scope.stop()
  })

  it('setReply / resetReply', () => {
    const id = `draft-test-${Date.now()}-b`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setReply({ messageId: 'm1', type: 'message.text', text: 'цитата' })
    expect(result.getMessage().reply).toMatchObject({ messageId: 'm1' })

    result.resetReply()
    expect(result.getMessage().reply).toBeUndefined()
    scope.stop()
  })

  it('режимы reply и edit взаимоисключающи', () => {
    const id = `draft-test-${Date.now()}-c`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setReply({ messageId: 'm1', type: 'message.text', text: 'r' })
    result.setEdit({ messageId: 'm2', type: 'message.text', text: 'e' })
    expect(result.getMessage().reply).toBeUndefined()
    expect(result.getMessage().edit?.messageId).toBe('m2')
    scope.stop()
  })

  it('addMessageFiles ограничивает количество', () => {
    const id = `draft-test-${Date.now()}-d`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.addMessageFiles(
      [
        { url: '1' },
        { url: '2' },
        { url: '3' },
        { url: '4' },
        { url: '5' },
        { url: '6' },
      ],
      5,
    )

    expect(getDraftFiles(result.getMessage())).toHaveLength(5)
    scope.stop()
  })
})
