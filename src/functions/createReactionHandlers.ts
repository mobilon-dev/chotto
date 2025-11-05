/**
 * Создает обработчики событий для реакций на сообщения
 * @param emit - функция emit из компонента Vue
 * @returns Объект с обработчиками onToggleReaction, onAddReaction, onRemoveReaction
 */
export function createReactionHandlers(
  emit: (event: 'action', payload: { messageId: string; type: string; key: string }) => void
) {
  function onToggleReaction(payload: { messageId: string | number; key: string }) {
    emit('action', { messageId: String(payload.messageId), type: 'reaction.toggle', key: payload.key })
  }

  function onAddReaction(payload: { messageId: string | number; key: string }) {
    emit('action', { messageId: String(payload.messageId), type: 'reaction.add', key: payload.key })
  }

  function onRemoveReaction(payload: { messageId: string | number; key: string }) {
    emit('action', { messageId: String(payload.messageId), type: 'reaction.remove', key: payload.key })
  }

  return {
    onToggleReaction,
    onAddReaction,
    onRemoveReaction,
  }
}

