import { nextTick } from 'vue'
import {
  findMessageContent,
  isRightMessage,
} from '@/components/2_feed_elements/MessageReactions/composables/usePositioning'

export type MenuTriggerRect = Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>

/**
 * Границы приложения для встроек: .base__container / .base / .chat-app / [data-theme],
 * пересечённые с viewport.
 */
export function findAppBoundsRect(element: HTMLElement | null): DOMRect {
  const viewport = {
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  }

  if (!element) {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight)
  }

  let current: HTMLElement | null = element
  let themed: HTMLElement | null = null
  let appRoot: HTMLElement | null = null

  while (current) {
    if (
      current.classList.contains('base__container') ||
      current.classList.contains('base') ||
      current.classList.contains('chat-app')
    ) {
      appRoot = current
      break
    }
    if (current.hasAttribute('data-theme')) {
      themed = current
    }
    current = current.parentElement
  }

  const root = appRoot || themed
  if (!root) {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight)
  }

  const rect = root.getBoundingClientRect()
  const left = Math.max(viewport.left, rect.left)
  const top = Math.max(viewport.top, rect.top)
  const right = Math.min(viewport.right, rect.right)
  const bottom = Math.min(viewport.bottom, rect.bottom)

  return new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top))
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.max(min, Math.min(value, max))
}

/**
 * Позиция контекстного меню рядом с кнопкой «три точки» (position: fixed).
 * Не выходит за границы приложения (важно для встроек).
 */
export async function calculateMessageMenuPosition(
  menuElement: HTMLElement | null,
  options: {
    triggerRect: MenuTriggerRect | null
    boundsElement: HTMLElement | null
    estimatedWidth?: number
    estimatedHeight?: number
  }
): Promise<Record<string, string>> {
  const {
    triggerRect,
    boundsElement,
    estimatedWidth = 220,
    estimatedHeight = 152,
  } = options

  await nextTick()

  const menuWidth = menuElement?.offsetWidth || estimatedWidth
  const menuHeight = menuElement?.offsetHeight || estimatedHeight
  const bounds = findAppBoundsRect(boundsElement)
  const padding = 8
  const gap = 4

  // Фоллбек: якорь к содержимому сообщения, если нет rect кнопки
  let anchor = triggerRect
  if (!anchor && boundsElement) {
    const content = findMessageContent(boundsElement) || boundsElement
    const r = content.getBoundingClientRect()
    anchor = {
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      left: r.left,
      width: r.width,
      height: r.height,
    }
  }
  if (!anchor) return {} as Record<string, string>

  const isRight = boundsElement ? isRightMessage(boundsElement) : false

  // Вертикаль: предпочтительно под кнопкой, иначе над ней
  const spaceBelow = bounds.bottom - anchor.bottom - gap - padding
  const spaceAbove = anchor.top - bounds.top - gap - padding
  let top: number
  if (spaceBelow >= menuHeight || spaceBelow >= spaceAbove) {
    top = anchor.bottom + gap
  } else {
    top = anchor.top - menuHeight - gap
  }

  // Горизонталь: у правых сообщений выравниваем по правому краю кнопки, у левых — по левому
  let left = isRight ? anchor.right - menuWidth : anchor.left

  // Если не влезает — прижимаем к границам приложения
  left = clamp(left, bounds.left + padding, bounds.right - menuWidth - padding)
  top = clamp(top, bounds.top + padding, bounds.bottom - menuHeight - padding)

  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    right: 'auto',
    bottom: 'auto',
    marginTop: '0',
    transform: 'none',
    zIndex: '1000',
    display: 'block',
  }
}
