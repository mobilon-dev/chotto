import { IAudioMessage, ICallMessage, IDateMessage, IFileMessage, 
  IImageMessage, IKeyBoard, ILinkPreview, ISystemMessage, 
  ITextMessage, ITypingMessage, IVideoMessage, Reply,
  IAction,
} from "@/types"

export interface IFeedObject {
  messageId: string
  type: string
  header?: string
  text?: string
  position?: string
  status?: string
  time?: string
  url?: string
  alt?: string
  filename?: string
  avatar?: string
  subtext?: string
  actions?: IAction[]
  views?: number
  callDuration?: string
  isMissedCall?: boolean
  reply?: Reply
  linkPreview?: ILinkPreview
  keyboard?: IKeyBoard[]
}

export type TFeedObject =
  IAudioMessage |
  ICallMessage |
  IDateMessage |
  IFileMessage |
  IImageMessage |
  ISystemMessage |
  ITextMessage |
  ITypingMessage |
  IVideoMessage

export interface IFeedTyping {
  title?: string
  avatar?: string
}

export interface IFeedUnreadButton {
  // color: string
  unreadAmount: number
}

export interface IDialog {
  time: string,
  text: string,
  position: string
} 

export interface IFilePreview {
  previewUrl?: string
  isImage: boolean  
  isVideo: boolean
  isAudio: boolean
  fileName?: string
  fileSize: string
}
