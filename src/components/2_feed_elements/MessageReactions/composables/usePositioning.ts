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
 * Вычисляет позицию панели реакций относительно кнопки и feed контейнера
 */
export async function calculatePanelPosition(
  panelElement: HTMLElement | null,
  buttonElement: HTMLElement | null,
  estimatedWidth: number = 300
): Promise<Record<string, string>> {
  if (!buttonElement) return {} as Record<string, string>

  const feedContainer = findFeedContainer(buttonElement)
  if (!feedContainer) return {} as Record<string, string>

  const isRight = isRightMessage(buttonElement)
  await nextTick()

  // Находим контейнер реакций (родитель кнопки)
  const reactionsContainer = buttonElement.closest('.message-reactions') as HTMLElement
  if (!reactionsContainer) return {} as Record<string, string>

  const buttonRect = buttonElement.getBoundingClientRect()
  const feedRect = feedContainer.getBoundingClientRect()
  const containerRect = reactionsContainer.getBoundingClientRect()
  const panelActualWidth = panelElement?.offsetWidth || estimatedWidth

  const padding = 8 // Отступ от краев
  
  // Для правых сообщений позиционируем панель справа от кнопки
  if (isRight) {
    // Вычисляем расстояние от правого края кнопки до правого края feed
    const spaceRight = feedRect.right - buttonRect.right
    
    // Вычисляем позицию кнопки относительно контейнера реакций
    const buttonPositionInContainer = buttonRect.left - containerRect.left
    const buttonWidth = buttonRect.width
    
    // Если панель помещается справа от кнопки
    if (panelActualWidth <= spaceRight - padding) {
      // Позиционируем панель справа от кнопки (относительно левого края контейнера)
      return {
        left: `${buttonPositionInContainer + buttonWidth + 6}px`, // справа от кнопки с gap 6px
        right: 'auto',
        transform: 'none',
      }
    }
    // Если не помещается справа, позиционируем слева от кнопки
    return {
      left: `${buttonPositionInContainer - panelActualWidth - 6}px`,
      right: 'auto',
      transform: 'none',
    }
  }

  // Для левых сообщений - позиционируем панель слева от кнопки
  const buttonPositionInContainer = buttonRect.left - containerRect.left
  const buttonWidth = buttonRect.width
  
  // Вычисляем доступное пространство слева от кнопки
  const spaceLeft = buttonRect.left - feedRect.left
  
  // Если панель помещается слева от кнопки
  if (panelActualWidth <= spaceLeft - padding) {
    // Позиционируем панель слева от кнопки (относительно левого края контейнера)
    return {
      left: `${buttonPositionInContainer - panelActualWidth - 6}px`, // слева от кнопки с gap 6px
      right: 'auto',
      transform: 'none',
    }
  }
  
  // Если не помещается слева, позиционируем справа от кнопки
  return {
    left: `${buttonPositionInContainer + buttonWidth + 6}px`, // справа от кнопки с gap 6px
    right: 'auto',
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

  const buttonRect = buttonElement.getBoundingClientRect()
  const feedRect = feedContainer.getBoundingClientRect()
  const panelActualWidth = panelElement?.offsetWidth || estimatedWidth
  const panelActualHeight = panelElement?.offsetHeight || 450 // Примерная высота EmojiPicker

  const padding = 8
  const gap = 6

  // Проверяем, помещается ли picker снизу от кнопки
  const spaceBelow = window.innerHeight - buttonRect.bottom - gap
  const spaceAbove = buttonRect.top - gap
  
  // Определяем, позиционировать ли picker снизу или сверху от кнопки
  let verticalPosition: { top?: string; bottom?: string }
  if (spaceBelow >= panelActualHeight || spaceBelow >= spaceAbove) {
    // Позиционируем снизу от кнопки
    verticalPosition = { top: `${buttonRect.bottom + gap}px` }
  } else {
    // Позиционируем сверху от кнопки
    verticalPosition = { bottom: `${window.innerHeight - buttonRect.top + gap}px` }
  }

  // Для правых сообщений позиционируем панель справа от кнопки
  if (isRight) {
    const spaceRight = feedRect.right - buttonRect.right
    
    // Если панель помещается справа от кнопки
    if (panelActualWidth <= spaceRight - padding) {
      return {
        position: 'fixed',
        ...verticalPosition,
        left: `${buttonRect.right + gap}px`,
        right: 'auto',
        transform: 'none',
      }
    }
    // Если не помещается справа, позиционируем слева от кнопки
    return {
      position: 'fixed',
      ...verticalPosition,
      left: `${buttonRect.left - panelActualWidth - gap}px`,
      right: 'auto',
      transform: 'none',
    }
  }

  // Для левых сообщений - позиционируем панель слева от кнопки
  const spaceLeft = buttonRect.left - feedRect.left
  
  // Если панель помещается слева от кнопки
  if (panelActualWidth <= spaceLeft - padding) {
    return {
      position: 'fixed',
      ...verticalPosition,
      left: `${buttonRect.left - panelActualWidth - gap}px`,
      right: 'auto',
      transform: 'none',
    }
  }
  
  // Если не помещается слева, позиционируем справа от кнопки
  return {
    position: 'fixed',
    ...verticalPosition,
    left: `${buttonRect.right + gap}px`,
    right: 'auto',
    transform: 'none',
  }
}

