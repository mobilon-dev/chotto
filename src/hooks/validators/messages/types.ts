/**
 * Типы для данных сообщений
 */

export interface MessageAction {
  action: string;
  title: string;
  icon?: string;
}

export interface MessageReply {
  messageId: string | number;
  type: string;
  text?: string;
  url?: string;
  filename?: string;
}

export interface MessageEmbed {
  type: string;
  url: string;
}

export interface MessageLinkPreview {
  title: string;
  imageUrl: string;
  url: string;
  description: string;
}

export interface MessageTranscript {
  text?: string;
  dialog?: Array<{
    time: string;
    text: string;
    position: string;
  }>;
}

export interface MessageKeyboardButton {
  key: string;
  text: string;
  action: any;
  color: any;
  order: number;
}

export interface Message {
  chatId: number;
  dialogId?: string;
  messageId: string | number;
  type: string;
  timestamp: string | number;
  direction?: 'incoming' | 'outgoing';
  status?: 'read' | 'sent' | 'received' | 'pending' | 'error';
  statusMsg?: string;
  text?: string;
  header?: string;
  subText?: string;
  avatar?: string;
  url?: string;
  filename?: string;
  alt?: string;
  views?: number;
  actions?: MessageAction[];
  reply?: MessageReply;
  embed?: MessageEmbed;
  linkPreview?: MessageLinkPreview;
  transcript?: MessageTranscript;
  keyboard?: MessageKeyboardButton[];
  callDuration?: string;
  isMissedCall?: boolean;
}

export type MessageList = Message[];

