import { describe, expect, it } from 'vitest'
import { useMessageHoverActions } from '../useMessageHoverActions'

describe('useMessageHoverActions', () => {
  it('отключает hover actions для deleted сообщений (#15621)', () => {
    const { hoverActionsEnabled, reactionsActive } = useMessageHoverActions(
      undefined,
      true,
      { deleted: true, type: 'message.text' },
    )

    expect(hoverActionsEnabled.value).toBe(false)
    expect(reactionsActive.value).toBe(false)
  })

  it('включает hover actions для обычного сообщения', () => {
    const { hoverActionsEnabled } = useMessageHoverActions(
      undefined,
      true,
      { deleted: false, type: 'message.text' },
    )
    expect(hoverActionsEnabled.value).toBe(true)
  })

  it('отключает для SMS-канала', () => {
    const { hoverActionsEnabled } = useMessageHoverActions(
      'sms.M444',
      true,
      { type: 'message.text' },
    )
    expect(hoverActionsEnabled.value).toBe(false)
  })
})
