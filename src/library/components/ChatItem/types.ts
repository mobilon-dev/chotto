/**
 * TypeScript типы для валидации переменных тем компонента ChatItem
 */

// Интерфейс для всех переменных ChatItem
export interface ChatItemThemeVariables {
  // Layout
  '--chat-item-padding-container': string
  '--chat-item-dialog-padding': string
  '--chat-item-border-radius': string
  
  // Avatar
  '--chat-item-avatar-size': string
  '--chat-item-avatar-margin-right': string
  '--chat-item-status-indicator-size': string
  '--chat-item-status-indicator-position': string
  
  // Info
  '--chat-item-info-margin-right': string
  '--chat-item-name-margin-bottom': string
  
  // Details
  '--chat-item-details-gap': string
  '--chat-item-unread-min-size': string
  
  // Dialog
  '--chat-item-dialog-gap': string
  '--chat-item-dialog-item-padding': string
  '--chat-item-dialog-text-padding': string
  
  // Colors
  '--chat-item-background': string
  '--chat-item-background-selected': string
  '--chat-item-border': string
  '--chat-item-name-color': string
  '--chat-item-message-color': string
  '--chat-item-time-color': string
  '--chat-item-avatar-background': string
  '--chat-item-avatar-icon-color': string
  '--chat-item-status-received-color': string
  '--chat-item-status-read-color': string
  '--chat-item-unread-background': string
  '--chat-item-unread-text-color': string
  '--chat-item-actions-color': string
  '--chat-item-actions-hover-color': string
  '--chat-item-dialog-background': string
  '--chat-item-dialog-background-selected': string
  '--chat-item-dialog-text-color': string
  '--chat-item-dialog-time-color': string
}

// Тип для названий переменных
export type ChatItemVariableName = keyof ChatItemThemeVariables

// Тип для названий тем
export type ChatItemThemeName = 'light' | 'dark' | 'green'

// Тип для проверки наличия всех переменных
export type ValidateTheme<T> = T extends ChatItemThemeVariables 
  ? keyof T extends keyof ChatItemThemeVariables
    ? keyof ChatItemThemeVariables extends keyof T
      ? true
      : `Missing variables: ${Exclude<keyof ChatItemThemeVariables, keyof T> & string}`
    : `Extra variables: ${Exclude<keyof T, keyof ChatItemThemeVariables> & string}`
  : false
