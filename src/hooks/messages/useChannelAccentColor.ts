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

export function useChannelAccentColor<T extends MessageWithChannelMeta>(
  messageSource: MessageSource<T>,
  options: ChannelAccentOptions = {}
) {
  const { cssVariable, position = 'right' } = options

  const message = computed(() => unref(messageSource))

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

    if (messageValue.backgroundColor) {
      return messageValue.backgroundColor
    }

    return getChannelAccentColor(messageChannelId.value, null)
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

