/**
 * SMS-канал: `channelId` начинается с `sms` (например `sms.M444`).
 * В message-server на диалогах обычно `chn_*`, поэтому одного префикса недостаточно —
 * см. `isSmsFeedMessage`.
 */
export function isSmsChannel(channelId?: string | null): boolean {
  const normalized = channelId?.toLowerCase().trim()
  if (!normalized) return false
  return normalized.split('.')[0] === 'sms'
}

type SmsMessageLike = {
  channelId?: string
  messageStyle?: string
  channel?: { channelId?: string; serviceType?: string; type?: string }
  meta?: { messageStyle?: string; serviceType?: string; channelId?: string }
}

function smsStyleOf(message?: SmsMessageLike | null): string {
  return String(
    message?.meta?.messageStyle
    ?? message?.messageStyle
    ?? message?.channel?.serviceType
    ?? message?.channel?.type
    ?? message?.meta?.serviceType
    ?? '',
  ).toLowerCase().trim()
}

/** SMS в демо (`sms.M444`) и в message-server (`chn_*` + `meta.messageStyle: 'sms'`). */
export function isSmsFeedMessage(
  message?: object | null,
  channelId?: string | null,
): boolean {
  const feedMessage = message as SmsMessageLike | null | undefined
  if (smsStyleOf(feedMessage) === 'sms') return true
  return (
    isSmsChannel(channelId)
    || isSmsChannel(feedMessage?.channelId)
    || isSmsChannel(feedMessage?.channel?.channelId)
    || isSmsChannel(feedMessage?.meta?.channelId)
  )
}
