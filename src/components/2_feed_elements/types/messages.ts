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

/** Сообщение в режиме редактирования (превью над инпутом) */
export interface Edit {
  messageId: string
  type: string
  text?: string
}

/**
 * Одна запись в истории правки сообщения
 */
export interface MessageEditRecord {
  /** Текст сообщения после этой правки */
  text?: string
  /** Кто изменил */
  editedBy?: string
  /** Когда изменили (уже отформатированная строка, напр. «20.07.2026 в 11:08») */
  editedAt?: string
}

/**
 * Снимок правки для метки «изменено» и тултипа.
 * При отправке заполняется сразу; при наведении хост может обновить через fetchEditInfo.
 */
export interface MessageEditInfo {
  /** Оригинальный текст до первой правки */
  originalText?: string
  /** Кто изменил (последняя правка; для обратной совместимости) */
  editedBy?: string
  /** Когда изменили (последняя правка; для обратной совместимости) */
  editedAt?: string
  /** История правок от старых к новым */
  history?: MessageEditRecord[]
}

/**
 * Данные удаления для тултипа «Сообщение удалено»:
 * текст + «Имя, дата в время».
 */
export interface MessageDeleteInfo {
  /** Кто удалил */
  deletedBy?: string
  /** Когда удалили (уже отформатированная строка, напр. «20.07.26 в 11:08») */
  deletedAt?: string
}

/** Контекст сообщения для условий пунктов меню */
export type MessageMenuActionContext = {
  messageId?: string
  position?: string
  type?: string
  deleted?: boolean
  /** Можно ли ещё редактировать (окно не истекло); `false` — пункт «Редактировать» disabled */
  canEdit?: boolean
  /** Можно ли ещё удалить (окно не истекло); `false` — пункт «Удалить» disabled */
  canDelete?: boolean
}

/** Пункт контекстного меню сообщения (задаётся пропом Feed) */
export interface IFeedMessageMenuAction {
  action?: string
  title?: string
  /** URL или Vue-компонент иконки */
  icon?: string | object
  prime?: string
  /** Недоступен: флаг или функция от сообщения */
  disabled?: boolean | ((message: MessageMenuActionContext) => boolean)
  /** Красный пункт (например, «Удалить») */
  danger?: boolean
  /** Разделитель между группами пунктов */
  separator?: boolean
}

export interface ILinkPreview {
  title: string,
  imageUrl: string,
  url: string,
  description: string
}

// Reactions types (event-list: UI сам считает count / reactedByMe)
export type ReactionKey = string

/** Одна реакция от конкретного пользователя */
export interface MessageReactionItem {
  key: ReactionKey
  userId: string | number
  date?: number
  /** Имя автора (snapshot); если нет — берётся из reactionUserNames */
  name?: string
}

/** Агрегированный чип для отображения (считается в UI) */
export interface MessageReactionChip {
  key: ReactionKey
  count: number
  reactedByMe: boolean
  /** Исходные события по этому эмодзи (для тултипа) */
  events: MessageReactionItem[]
}

export interface MessageReactions {
  items: MessageReactionItem[]
  meta?: {
    mode?: 'single' | 'multi'
  }
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
  views?: number,
  text?: string,
  /** Транскрипт со статусом и HTML */
  transcript?: IAudioRecognitionPayload
  /** Резюме со статусом и HTML */
  summary?: IAudioSummaryPayload
  /** Сырые поля API для audio (пример: meta.transcript/meta.summary/meta.url) */
  meta?: Record<string, unknown> & {
    transcript?: IAudioRecognitionPayload
    summary?: IAudioSummaryPayload
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
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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

export type AudioRecognitionStatus =
  | 'RECOGNITION_PLANNED'
  | 'RECOGNITION_READY'
  | 'RECOGNITION_NOT_CONFIGURED'
  | 'RECOGNITION_ERROR'

export type AudioSummaryStatus =
  | 'SUMMARY_PLANNED'
  | 'SUMMARY_READY'
  | 'SUMMARY_NOT_CONFIGURED'
  | 'SUMMARY_ERROR'

export interface IAudioRecognitionPayload {
  status?: AudioRecognitionStatus
  html?: string
}

export interface IAudioSummaryPayload {
  status?: AudioSummaryStatus
  html?: string
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
  views?: number
  /** Транскрипт со статусом и HTML */
  transcript?: IAudioRecognitionPayload
  /** Резюме со статусом и HTML */
  summary?: IAudioSummaryPayload
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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
  views?: number
  reply?: Reply
  /** Данные правки: наличие поля показывает метку «изменено» */
  edited?: MessageEditInfo
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview,
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
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
  views?: number
  text?: string
  reply?: Reply,
  linkPreview?: ILinkPreview
  embed?: object
  keyboard?: IKeyBoard[]
  reactions?: MessageReactions
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
}

export interface IMissedCallMessage {
  messageId: string
  position: string
  time: string
  avatar?: string
  header?: string
  subText?: string
  backgroundColor?: string
  hasMessengerAccount?: boolean
  deleted?: boolean
  deletion?: MessageDeleteInfo
  /** Можно ли ещё редактировать (если `false` — пункт меню disabled) */
  canEdit?: boolean
  /** Можно ли ещё удалить (если `false` — пункт меню disabled) */
  canDelete?: boolean
}