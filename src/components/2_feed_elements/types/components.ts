import { IAudioMessage, ICallMessage, IDateMessage, IFileMessage, 
  IImageMessage, IKeyBoard, ILinkPreview, ISystemMessage, 
  ITextMessage, ITypingMessage, IVideoMessage, Reply,
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
  /** URL превью картинки для ленты (для `message.image`) */
  imagePreviewUrl?: string
  /** URL сжатого превью видео для ленты (для `message.video`) */
  videoPreviewUrl?: string
  /** URL обложки видео для ленты (для `message.video`) */
  coverUrl?: string
  alt?: string
  filename?: string
  avatar?: string
  subtext?: string
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
