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
  status: string
  statusMsg?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  transcript?: {
    text: string;
  };
  reply?: Reply,
  linkPreview?: ILinkPreview,
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
}

export interface ICallMessage {
  messageId: string
  position: string
  time: string
  status?: string
  statusMsg?: string
  url?: string
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
  transcript?: {
    dialog?: IDialog[]
    text?: string
  }
  reactions?: MessageReactions
  backgroundColor?: string
}

export interface IDateMessage {
  messageId?: string
  text: string
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
}

export interface ISystemMessage {
  messageId: string
  text: string
}

export interface IDelimiterMessage {
  messageId: string
  text: string
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
}

export interface ITypingMessage {
  avatar?: string
  subText?: string
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
}