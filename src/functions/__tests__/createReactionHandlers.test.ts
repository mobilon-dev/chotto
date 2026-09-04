import { describe, expect, it, vi } from 'vitest'
import { createReactionHandlers } from '../createReactionHandlers'

describe('createReactionHandlers', () => {
  it('эмитит toggle / add / remove с приведением messageId к строке', () => {
    const emit = vi.fn()
    const handlers = createReactionHandlers(emit)

    handlers.onToggleReaction({ messageId: 42, key: '👍' })
    handlers.onAddReaction({ messageId: 'm1', key: '❤️' })
    handlers.onRemoveReaction({ messageId: 7, key: '😂' })

    expect(emit).toHaveBeenCalledTimes(3)
    expect(emit).toHaveBeenNthCalledWith(1, 'action', {
      messageId: '42',
      type: 'reaction.toggle',
      key: '👍',
    })
    expect(emit).toHaveBeenNthCalledWith(2, 'action', {
      messageId: 'm1',
      type: 'reaction.add',
      key: '❤️',
    })
    expect(emit).toHaveBeenNthCalledWith(3, 'action', {
      messageId: '7',
      type: 'reaction.remove',
      key: '😂',
    })
  })
})
