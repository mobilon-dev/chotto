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
}

export interface ICallMessage {
  messageId: string
  position: string
  time: string
  // status: string   //??? 
  url?: string
  isMissedCall?: boolean
  callDuration?: string
  avatar?: string
  header?: string
  subText?: string
  actions?: IAction[]
  views?: number
  transcript?: {
    dialog: IDialog[];
  };
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
}

export interface ISystemMessage {
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
}