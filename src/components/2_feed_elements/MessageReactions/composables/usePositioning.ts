import { nextTick } from 'vue'

/**
 * Находит ближайший feed-контейнер в DOM дереве
 */
export function findFeedContainer(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null
  let current = element.parentElement
  while (current) {
    if (current.classList.contains('message-feed')) {
      return current
    }
    current = current.parentElement
  }
  return null
}

/**
 * Находит контейнер содержимого сообщения (например, text-message__content)
 */
export function findMessageContent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null
  let current = element.parentElement
  while (current) {
    for (const className of current.classList) {
      if (className.endsWith('__content')) {
        return current
      }
    }
    if (current.classList.contains('message-feed')) {
      break
    }
    current = current.parentElement
  }
  return null
}

/**
 * Определяет, является ли сообщение правым (outgoing)
 */
export function isRightMessage(element: HTMLElement | null): boolean {
  if (!element) return false
  let current = element.parentElement
  while (current) {
    // Проверяем классы типа text-message__right, image-message__right и т.д.
    for (const className of current.classList) {
      if (className.includes('__right')) {
        return true
      }
    }
    if (current.classList.contains('message-feed')) {
      break
    }
    current = current.parentElement
  }
  return false
}

/**
 * Вычисляет позицию панели быстрых реакций в координатах viewport (position: fixed):
 * по центру высоты, слева для правых сообщений и справа для левых.
 * Fixed нужен, чтобы панель не обрезалась overflow ленты и могла перекрывать ChatList.
 */
export async function calculatePanelPosition(
  panelElement: HTMLElement | null,
  buttonElement: HTMLElement | null,
  estimatedWidth: number = 300
): Promise<Record<string, string>> {
  if (!buttonElement) return {} as Record<string, string>

  const feedContainer = findFeedContainer(buttonElement)
  const messageContent = findMessageContent(buttonElement)
  if (!feedContainer || !messageContent) return {} as Record<string, string>

  const isRight = isRightMessage(buttonElement)
  await nextTick()

  const messageRect = messageContent.getBoundingClientRect()
  const panelActualWidth = panelElement?.offsetWidth || estimatedWidth
  const panelActualHeight = panelElement?.offsetHeight || 44

  const gap = 6

  const top = messageRect.top + (messageRect.height / 2) - (panelActualHeight / 2)
  const left = isRight
    ? messageRect.left - panelActualWidth - gap
    : messageRect.right + gap

  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    right: 'auto',
    marginTop: '0',
    transform: 'none',
  }
}

/**
 * Вычисляет позицию для fixed-элемента относительно viewport
 */
export async function calculateFixedPanelPosition(
  panelElement: HTMLElement | null,
  buttonElement: HTMLElement | null,
  estimatedWidth: number = 300
): Promise<Record<string, string>> {
  if (!buttonElement) return {} as Record<string, string>

  const feedContainer = findFeedContainer(buttonElement)
  if (!feedContainer) return {} as Record<string, string>

  const isRight = isRightMessage(buttonElement)
  await nextTick()

  const messageContent = findMessageContent(buttonElement)
  if (!messageContent) return {} as Record<string, string>

  const anchorRect = messageContent.getBoundingClientRect()
  const feedRect = feedContainer.getBoundingClientRect()
  const panelActualWidth = panelElement?.offsetWidth || estimatedWidth
  const panelActualHeight = panelElement?.offsetHeight || 450 // Примерная высота EmojiPicker

  const padding = 8
  const gap = 6

  // Проверяем, помещается ли picker снизу от кнопки
  const spaceBelow = window.innerHeight - anchorRect.bottom - gap
  const spaceAbove = anchorRect.top - gap
  
  // Определяем, позиционировать ли picker снизу или сверху от кнопки
  let verticalPosition: { top?: string; bottom?: string }
  if (spaceBelow >= panelActualHeight || spaceBelow >= spaceAbove) {
    // Позиционируем снизу от кнопки
    verticalPosition = { top: `${anchorRect.bottom + gap}px` }
  } else {
    // Позиционируем сверху от кнопки
    verticalPosition = { bottom: `${window.innerHeight - anchorRect.top + gap}px` }
  }

  // Для правых сообщений позиционируем панель справа от кнопки
  if (isRight) {
    const spaceRight = feedRect.right - anchorRect.right
    
    // Если панель помещается справа от кнопки
    if (panelActualWidth <= spaceRight - padding) {
      return {
        position: 'fixed',
        ...verticalPosition,
        left: `${anchorRect.right + gap}px`,
        right: 'auto',
        transform: 'none',
      }
    }
    // Если не помещается справа, позиционируем слева от кнопки
    return {
      position: 'fixed',
      ...verticalPosition,
      left: `${anchorRect.left - panelActualWidth - gap}px`,
      right: 'auto',
      transform: 'none',
    }
  }

  // Для левых сообщений - позиционируем панель слева от кнопки
  const spaceLeft = anchorRect.left - feedRect.left
  
  // Если панель помещается слева от кнопки
  if (panelActualWidth <= spaceLeft - padding) {
    return {
      position: 'fixed',
      ...verticalPosition,
      left: `${anchorRect.left - panelActualWidth - gap}px`,
      right: 'auto',
      transform: 'none',
    }
  }
  
  // Если не помещается слева, позиционируем справа от кнопки
  return {
    position: 'fixed',
    ...verticalPosition,
    left: `${anchorRect.right + gap}px`,
    right: 'auto',
    transform: 'none',
  }
}

/**
 * Вычисляет позицию EmojiPicker над панелью быстрых реакций
 */
export async function calculatePickerPositionAboveQuickPanel(
  pickerElement: HTMLElement | null,
  quickPanelElement: HTMLElement | null,
  messageElement: HTMLElement | null,
  estimatedWidth: number = 350
): Promise<Record<string, string>> {
  if (!quickPanelElement || !messageElement) return {} as Record<string, string>

  const feedContainer = findFeedContainer(messageElement)
  if (!feedContainer) return {} as Record<string, string>

  await nextTick()

  const quickPanelRect = quickPanelElement.getBoundingClientRect()
  const feedRect = feedContainer.getBoundingClientRect()
  const panelActualWidth = pickerElement?.offsetWidth || estimatedWidth
  const panelActualHeight = pickerElement?.offsetHeight || 450

  const padding = 8
  const gap = 6

  // Центрируем picker по горизонтали относительно панели быстрых реакций
  let left = quickPanelRect.left + (quickPanelRect.width / 2) - (panelActualWidth / 2)
  if (left + panelActualWidth > feedRect.right - padding) {
    left = feedRect.right - padding - panelActualWidth
  }
  if (left < feedRect.left + padding) {
    left = feedRect.left + padding
  }

  const topAbove = quickPanelRect.top - panelActualHeight - gap
  const top = topAbove >= padding
    ? topAbove
    : quickPanelRect.bottom + gap

  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    right: 'auto',
    transform: 'none',
  }
}

