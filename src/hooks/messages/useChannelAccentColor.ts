/**
 * Composable `useChannelAccentColor` возвращает цвет акцента канала для пузыря сообщения.
 *
 * Используется внутри компонентов сообщений (TextMessage, ImageMessage и др.), чтобы подкрасить
 * сообщение в цвет канала, учитывая выбранный чат и позицию сообщения.
 *
 * @example
 * import { useChannelAccentColor } from '@/hooks/messages'
 *
 * const { bubbleColor, bubbleStyle } = useChannelAccentColor(props.message, {
 *   cssVariable: '--bubble-color',
 *   position: 'right',
 * })
 *
 * <div class="bubble" :style="bubbleStyle" />
 */
import { computed, inject, unref, type Ref } from 'vue'

import { getChannelAccentColor } from '@/functions'

type DialogWithChannel = { dialogId: string; channelId?: string }
type SelectedChat = { dialogs?: DialogWithChannel[] }

type MessageWithChannelMeta = {
  dialogId?: string
  position?: string
  backgroundColor?: string | null
}

type MessageSource<T extends MessageWithChannelMeta> = Ref<T | undefined> | T | undefined

interface ChannelAccentOptions {
  cssVariable?: string
  position?: 'left' | 'right' | 'both'
}

/**
 * Конвертирует hex цвет в rgba с заданной прозрачностью
 */
function hexToRgba(hex: string, alpha: number = 0.6): string {
  // Убираем # если есть
  const cleanHex = hex.replace('#', '')
  
  // Парсим RGB компоненты
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Проверяет, активна ли тема glass
 */
function isGlassTheme(chatAppId?: string | null): boolean {
  if (typeof document === 'undefined') {
    return false
  }

  // Если передан chatAppId, проверяем конкретный элемент
  if (chatAppId) {
    const appElement = document.getElementById(chatAppId)
    return appElement?.dataset.theme === 'glass'
  }

  // Иначе проверяем любой элемент с data-theme="glass"
  const glassElement = document.querySelector('[data-theme="glass"]')
  return glassElement !== null
}

export function useChannelAccentColor<T extends MessageWithChannelMeta>(
  messageSource: MessageSource<T>,
  options: ChannelAccentOptions = {}
) {
  const { cssVariable, position = 'right' } = options

  const message = computed(() => unref(messageSource))

  const chatAppId = inject<string | undefined>('chatAppId', undefined)
  const selectedChatInjected = inject<Ref<SelectedChat> | SelectedChat | undefined>('selectedChat', undefined)

  const selectedChat = computed(() => {
    if (!selectedChatInjected) return undefined
    return unref(selectedChatInjected)
  })

  const messageChannelId = computed(() => {
    const chatValue = selectedChat.value
    const messageValue = message.value

    if (!messageValue?.dialogId || !chatValue?.dialogs) {
      return undefined
    }

    const dialog = chatValue.dialogs.find((dialog) => dialog.dialogId === messageValue.dialogId)
    return dialog?.channelId
  })

  const shouldApplyColor = computed(() => {
    if (position === 'both') return true
    if (!message.value?.position) return false
    return message.value.position === position
  })

  const bubbleColor = computed(() => {
    const messageValue = message.value

    if (!messageValue) {
      return null
    }

    if (!shouldApplyColor.value) {
      return null
    }

    let color: string | null = null

    if (messageValue.backgroundColor) {
      color = messageValue.backgroundColor
    } else {
      color = getChannelAccentColor(messageChannelId.value, null)
    }

    // Если тема glass и цвет задан, добавляем прозрачность
    if (color && isGlassTheme(chatAppId)) {
      // Проверяем, что цвет в формате hex (начинается с #)
      if (color.startsWith('#')) {
        return hexToRgba(color, 0.6)
      }
      // Если уже rgba, оставляем как есть или можно изменить альфа-канал
      // Для простоты оставляем как есть, если уже rgba
    }

    return color
  })

  const bubbleStyle = computed(() => {
    if (!cssVariable || !bubbleColor.value) {
      return null
    }

    return { [cssVariable]: bubbleColor.value }
  })

  return {
    bubbleColor,
    bubbleStyle,
    messageChannelId,
  }
}

