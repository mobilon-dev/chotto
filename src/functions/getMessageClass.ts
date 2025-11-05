/**
 * Возвращает CSS-класс для сообщения в зависимости от позиции
 *
 * Используется в компонентах сообщений, чтобы единообразно формировать
 * классы вида `<prefix>__left` и `<prefix>__right`.
 *
 * @param {string} position - позиция сообщения: 'left' | 'right'
 * @param {string} prefix - префикс CSS-блока (например, 'text-message')
 * @returns {string} CSS-класс с учетом позиции
 */
export function getMessageClass(position: string, prefix: string): string {
  return position === 'left' ? `${prefix}__left` : `${prefix}__right`
}


