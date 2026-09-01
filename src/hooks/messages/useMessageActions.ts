/**
 * Composable для общих действий в компонентах сообщений (контекстное меню, просмотры, ответ)
 *
 * Предназначен для элементов ленты (`TextMessage`, `ImageMessage`, `VideoMessage`, `FileMessage`, `AudioMessage`).
 * Централизует управление состоянием кнопки меню/контекстного меню и единообразно эмитит события наружу.
 *
 * @example
 * const { isOpenMenu, toggleMenu, openMenu, menuStyle, menuRef, menuAnchorRef } = useMessageActions(...)
 * // <button @click="toggleMenu">
 * // <MessageReactions @menu="openMenu" />
 * // <Teleport to="body"><ContextMenu v-if="isOpenMenu" ref="menuRef" :style="menuStyle" /></Teleport>
 */
import {
  ref,
  watch,
  nextTick,
  inject,
  onMounted,
  onUnmounted,
  computed,
  type ComponentPublicInstance,
} from 'vue'
import { useConfirmDeleteMessage } from '@/hooks/modals/useConfirmDeleteMessage'
import { useTheme } from '@/hooks/useTheme'
import {
  calculateMessageMenuPosition,
  type MenuTriggerRect,
} from './calculateMessageMenuPosition'

type ActionPayload = { messageId: string; type: string } & Record<string, unknown>
type EmitFn = (event: 'action' | 'reply', payload: ActionPayload | string) => void

export interface MessageWithMeta {
  messageId: string
}

type UseMessageActionsOptions = {
  onReply?: () => void
  onEdit?: () => void
}

/** Payload от MessageReactions @menu или клик по кнопке */
export type OpenMessageMenuSource =
  | Event
  | { event?: Event; triggerRect?: MenuTriggerRect; messageId?: string | number }
  | MenuTriggerRect
  | undefined

function resolveEl(
  value: HTMLElement | ComponentPublicInstance | null | undefined
): HTMLElement | null {
  if (!value) return null
  if (value instanceof HTMLElement) return value
  const el = (value as ComponentPublicInstance).$el
  return el instanceof HTMLElement ? el : null
}

type OutsideClickHandler = (event: MouseEvent) => void

const outsideClickHandlers = new Set<OutsideClickHandler>()

function handleDocumentClick(event: MouseEvent): void {
  for (const handler of outsideClickHandlers) {
    handler(event)
  }
}

function subscribeDocumentClick(handler: OutsideClickHandler): () => void {
  if (outsideClickHandlers.size === 0) {
    document.addEventListener('click', handleDocumentClick, true)
  }
  outsideClickHandlers.add(handler)
  return () => {
    outsideClickHandlers.delete(handler)
    if (outsideClickHandlers.size === 0) {
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }
}

function toTriggerRect(source?: OpenMessageMenuSource): MenuTriggerRect | null {
  if (!source) return null

  if (source instanceof Event) {
    const target = source.currentTarget
    if (target instanceof HTMLElement) {
      const r = target.getBoundingClientRect()
      return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height }
    }
    return null
  }

  if ('triggerRect' in source && source.triggerRect) {
    return source.triggerRect
  }

  if ('event' in source && source.event instanceof Event) {
    return toTriggerRect(source.event)
  }

  if ('top' in source && 'left' in source && 'bottom' in source && 'right' in source) {
    return source as MenuTriggerRect
  }

  return null
}

export const useMessageActions = <T extends MessageWithMeta>(
  message: T,
  emit: EmitFn,
  options: UseMessageActionsOptions = {}
) => {
  const isOpenMenu = ref(false)
  const buttonMenuVisible = ref(false)
  const menuAnchorRef = ref<HTMLElement | null>(null)
  const menuRef = ref<HTMLElement | ComponentPublicInstance | null>(null)
  const menuStyle = ref<Record<string, string>>({})
  const menuTriggerRect = ref<MenuTriggerRect | null>(null)

  const chatAppId = inject<string | undefined>('chatAppId', undefined)
  const { getTheme } = useTheme(chatAppId || '')
  const menuTheme = computed(() => getTheme().theme || 'light')

  const showMenu = () => {
    buttonMenuVisible.value = true
  }

  /**
   * Скрыть кнопку меню. Открытое меню в body не закрываем здесь.
   */
  const hideMenu = (event?: MouseEvent) => {
    const menuEl = resolveEl(menuRef.value)
    if (event?.relatedTarget && menuEl?.contains(event.relatedTarget as Node)) {
      return
    }
    buttonMenuVisible.value = false
  }

  const closeMenu = () => {
    buttonMenuVisible.value = false
    isOpenMenu.value = false
    menuTriggerRect.value = null
  }

  const onMenuMouseEnter = () => {
    buttonMenuVisible.value = true
  }

  const onMenuMouseLeave = () => {
    closeMenu()
  }

  /** Открыть меню рядом с триггером (кнопка / пункт реакций) */
  const openMenu = (source?: OpenMessageMenuSource) => {
    menuTriggerRect.value = toTriggerRect(source)
    isOpenMenu.value = true
  }

  /** Переключить меню (клик по трём точкам на сообщении) */
  const toggleMenu = (event?: Event) => {
    if (isOpenMenu.value) {
      closeMenu()
      return
    }
    openMenu(event)
  }

  async function updateMenuPosition() {
    await nextTick()

    let attempts = 0
    while (!resolveEl(menuRef.value) && attempts < 20) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      attempts++
    }

    const menuEl = resolveEl(menuRef.value)

    attempts = 0
    while (menuEl && menuEl.offsetWidth === 0 && attempts < 10) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      attempts++
    }

    menuStyle.value = await calculateMessageMenuPosition(menuEl, {
      triggerRect: menuTriggerRect.value,
      boundsElement: menuAnchorRef.value,
    })
  }

  watch(isOpenMenu, async (isOpen) => {
    if (isOpen) {
      await updateMenuPosition()
    } else {
      menuStyle.value = {}
      menuTriggerRect.value = null
    }
  })

  function handleClickOutside(event: MouseEvent) {
    if (!isOpenMenu.value) return
    const target = event.target as Node
    const menuEl = resolveEl(menuRef.value)
    const anchorEl = menuAnchorRef.value

    if (menuEl?.contains(target)) return
    if (anchorEl?.contains(target)) return

    closeMenu()
  }

  let unsubscribeDocumentClick: (() => void) | undefined

  onMounted(() => {
    unsubscribeDocumentClick = subscribeDocumentClick(handleClickOutside)
  })

  onUnmounted(() => {
    unsubscribeDocumentClick?.()
  })

  const clickAction = async (action: Record<string, unknown>) => {
    closeMenu()
    if (action.action === 'reply' && options.onReply) {
      options.onReply()
      return
    }
    if (action.action === 'edit' && options.onEdit) {
      options.onEdit()
      return
    }
    if (action.action === 'delete') {
      const confirmed = await useConfirmDeleteMessage()
      if (!confirmed) return
    }
    emit('action', { messageId: message.messageId, type: 'menu', ...action })
  }

  const viewsAction = () => {
    closeMenu()
    emit('action', { messageId: message.messageId, type: 'views' })
  }

  const handleClickReplied = (replyMessageId: string) => {
    emit('reply', replyMessageId)
  }

  return {
    isOpenMenu,
    buttonMenuVisible,
    menuAnchorRef,
    menuRef,
    menuStyle,
    menuTheme,
    showMenu,
    hideMenu,
    openMenu,
    toggleMenu,
    onMenuMouseEnter,
    onMenuMouseLeave,
    clickAction,
    viewsAction,
    handleClickReplied,
  }
}
