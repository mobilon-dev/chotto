import { IAction, IDialog } from '@types'

export interface Reply {
  messageId: string
  type: string
  text?: string
  url?: string
  filename?: string
  header?: string
  callDuration?: string
  isMissedCall?: boolean
}

export interface ILinkPreview {
  title: string,
  imageUrl: string,
  url: string,
  description: string
}

// Reactions types (унифицировано для Telegram/WhatsApp)
export type ReactionKey = string

export interface MessageReactionItem {
  key: ReactionKey
  count: number
  reactedByMe?: boolean
}

export interface MessageRecentReaction {
  userId: string | number
  key: ReactionKey
  date?: number
}

export interface MessageReactions {
  items: MessageReactionItem[]
  meta?: {
    mode?: 'single' | 'multi'
  }
  recent?: MessageRecentReaction[]
  vendor?: {
    telegram?: {
      total_count?: number
      recent_reactions?: Array<{
        type: { type: string; emoji?: string }
        actor?: { id?: number; is_bot?: boolean; first_name?: string }
        date?: number
      }>
      counts?: Array<{ type: { type: string; emoji: string }; count: number }>
    }
    whatsapp?: {
      lastEventAt?: number
    }
  }
}

export interface IKeyBoard {
  key: string,
  text: string,
  order: number,
  action?: string,
  color?: string,
}

export interface IAudioMessage {
  messageId: string
  position: string
  time: string
  url: string
  /** Длительность: секунды (число) или строка MM:SS / H:MM:SS */
  duration?: string | number
  status: string
  statusMsg?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  /** Транскрипт: мок {text}, JSON-строка {"replies":[...]}, либо объект {replies} */
  transcript?: { text: string } | string | ICallTranscriptPayload;
  /** Резюме: JSON-строка {"summary":"..."}, либо объект {summary} */
  summary?: string | ICallSummaryPayload;
  /** Сырые поля API для audio (пример: meta.transcript/meta.summary/meta.url) */
  meta?: Record<string, unknown> & {
    transcript?: string | ICallTranscriptPayload
    summary?: string | ICallSummaryPayload
    url?: string
  }
  reply?: Reply,
  linkPreview?: ILinkPreview,
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  isVoiceMessage?: boolean
}

/** Реплика в JSON из meta.transcript (ответ API) */
export interface ICallTranscriptReply {
  timecode: number
  user: string
  text: string
}

/** Распарсенное тело строки meta.transcript */
export interface ICallTranscriptPayload {
  replies?: ICallTranscriptReply[]
}

/** Распарсенное тело строки meta.callSummary */
export interface ICallSummaryPayload {
  summary?: string
}

export interface ICallMessage {
  messageId: string
  position: string
  time: string
  status?: string
  statusMsg?: string
  url?: string
  /** URL записи звонка, если нет в url */
  recordUrl?: string
  isMissedCall?: boolean
  callDuration?: string
  callAttemptDuration?: string
  callParticipant?: string
  direction?: 'incoming' | 'outgoing'
  avatar?: string
  header?: string
  subText?: string
  text?: string
  actions?: IAction[]
  views?: number
  /**
   * Транскрипт: JSON-строка {"replies":[...]}, объект с replies, либо мок { dialog, text }
   */
  transcript?:
    | string
    | ICallTranscriptPayload
    | {
        dialog?: IDialog[]
        text?: string
      }
  /** Резюме: строка, JSON-строка {"summary":"..."} или объект { summary } */
  callSummary?: string | ICallSummaryPayload
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface IDateMessage {
  messageId?: string
  text: string
  hasMessengerAccount?: boolean
}

export interface IFileMessage {
  messageId: string
  filename: string
  position: string
  time: string
  url: string
  status: string
  statusMsg?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  direction?: string
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface IImageMessage {
  messageId: string
  position: string
  time: string
  url: string
  alt?: string
  status: string
  statusMsg?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface ISystemMessage {
  messageId: string
  text: string
  hasMessengerAccount?: boolean
}

export interface IDelimiterMessage {
  messageId: string
  text: string
  autoRemove?: boolean
  /** Текст подсказки при наведении (передаётся в Tooltip) */
  tooltipText?: string
}

export interface ITextMessage {
  messageId: string
  text: string
  position: string
  status: string
  statusMsg?: string
  time: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  reply?: Reply
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface ITypingMessage {
  avatar?: string
  subText?: string
  hasMessengerAccount?: boolean
}

export interface IVideoMessage {
  messageId: string
  position: string
  status: string
  statusMsg?: string
  time: string
  url: string
  alt?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview,
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface IStickerMessage {
  messageId: string
  position: string
  time: string
  url: string
  alt?: string
  isAnimated?: boolean
  status: string
  statusMsg?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
}

export interface IMissedCallMessage {
  messageId: string
  position: string
  time: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  backgroundColor?: string
  hasMessengerAccount?: boolean
}