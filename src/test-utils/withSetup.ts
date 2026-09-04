import { computed, effectScope, ref, type EffectScope } from 'vue'

/**
 * Запускает composable внутри effectScope и возвращает dispose.
 * Нужен для watch/onUnmounted в unit-тестах без mount компонента.
 */
export function withSetup<T>(factory: () => T): { result: T; scope: EffectScope } {
  const scope = effectScope(true)
  const result = scope.run(factory)
  if (result === undefined) {
    throw new Error('withSetup: factory returned undefined')
  }
  return { result, scope }
}

export function makeFeedObject(
  partial: Partial<{
    messageId: string
    type: string
    position: string
    header: string
    text: string
    timestamp: number
    status: string
    time: string
    deleted: boolean
  }> = {},
) {
  return {
    messageId: partial.messageId ?? 'm1',
    type: partial.type ?? 'message.text',
    position: partial.position ?? 'left',
    header: partial.header,
    text: partial.text ?? '',
    timestamp: partial.timestamp ?? 1,
    status: partial.status ?? 'read',
    time: partial.time ?? '12:00',
    ...(partial.deleted !== undefined ? { deleted: partial.deleted } : {}),
  }
}

export function makeChatItem(
  partial: Partial<{
    chatId: string
    name: string
    lastMessage: string
    countUnread: number
    isSelected: boolean
    isFixedTop: boolean
    isFixedBottom: boolean
    metadata: string
  }> = {},
) {
  return {
    chatId: partial.chatId ?? '1',
    name: partial.name ?? 'Alice',
    lastMessage: partial.lastMessage ?? 'Hi',
    countUnread: partial.countUnread ?? 0,
    'lastActivity.time': '12:00',
    'lastActivity.timestamp': 1732779106,
    'lastMessage.status': 'read',
    status: '#00ff00',
    typing: false,
    metadata: partial.metadata ?? '',
    isSelected: partial.isSelected ?? false,
    isFixedTop: partial.isFixedTop ?? false,
    isFixedBottom: partial.isFixedBottom ?? false,
    dialogsExpanded: false,
  }
}

export { computed, ref }
