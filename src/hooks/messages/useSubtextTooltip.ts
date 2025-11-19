import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'

type MessageWithSubtext = {
  messageId?: string | number
  subText?: string
}

type TooltipMap = Record<string, string>

/**
 * Возвращает текст тултипа для подписи сообщения с учётом карты `subtextTooltipData`
 */
export function useSubtextTooltip(
  message: MaybeRefOrGetter<MessageWithSubtext | undefined>,
  tooltipData: MaybeRefOrGetter<TooltipMap | undefined>
): ComputedRef<string> {
  return computed(() => {
    const currentMessage = toValue(message)
    if (!currentMessage) return ''

    const map = toValue(tooltipData)
    const messageId = currentMessage.messageId
    const tooltipKey =
      typeof messageId === 'number'
        ? messageId.toString()
        : messageId ?? ''

    const tooltip = tooltipKey ? map?.[tooltipKey] : undefined
    return tooltip ?? currentMessage.subText ?? ''
  })
}

