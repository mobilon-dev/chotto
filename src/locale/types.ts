export type LocaleCode = 'en' | 'ru'

export interface LocaleInfo {
  code: LocaleCode
  name: string
  flag: string
}

/** Ключи словаря — единый контракт для en/ru */
export type LocaleMessageKey =
  | 'component.ChatList.Title'
  | 'component.ChatFilter.InputPlaceholder'
  | 'layout.ChatWrapper.noSelectedChat'
  | 'component.ChatItem.typing'
  | 'component.ChatItem.draft'
  | 'component.ChatInput.InputPlaceholder'
  | 'component.ChatInput.TelegramInputPlaceholder'
  | 'component.ChatInput.WhatsappInputPlaceholder'
  | 'component.ChatInput.SmsInputPlaceholder'
  | 'component.ChatInput.MaxInputPlaceholder'
  | 'component.ChatInput.FilesSelected'
  | 'component.ChatInput.FilesSelectedCount'
  | 'component.ChatInput.FilesScrollLeft'
  | 'component.ChatInput.FilesScrollRight'
  | 'component.FeedFoundObjects.results'
  | 'component.FeedFoundObjects.notFound'
  | 'component.FeedFoundObjects.notSearched'
  | 'component.FeedSearch.SearchLabel'
  | 'component.FeedSearch.SearchPlaceholder'
  | 'component.ChannelSelector.Placeholder'
  | 'component.TextFormatToolbar.Bold'
  | 'component.TextFormatToolbar.Italic'
  | 'component.TextFormatToolbar.Underline'
  | 'component.TextFormatToolbar.Strikethrough'
  | 'component.TextFormatToolbar.Code'
  | 'component.TextFormatToolbar.Quote'
  | 'component.TextMessage.sendSmsInvite'
  | 'component.TextMessage.edited'
  | 'component.ConfirmDeleteMessage.title'
  | 'component.ConfirmDeleteMessage.delete'
  | 'component.ConfirmDeleteMessage.cancel'
  | 'component.DeletedMessageContent.text'

export type LocaleMessages = Record<LocaleMessageKey, string>
