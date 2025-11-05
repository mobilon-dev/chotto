/**
 * Типы для данных чатов
 */

export interface ChatAction {
  action: string;
  title: string;
  icon?: string;
}

export interface ContactAttribute {
  id: string;
  type?: string;
  data?: string | {
    id: string;
    nickname: string;
    phone: string;
  };
  value: string;
}

export interface Contact {
  attributes: ContactAttribute[];
}

export interface Dialog {
  branchId?: string;
  dialogId: string;
  attributeId?: string;
  channelId?: string;
  icon?: string;
  name: string;
  fullname?: string;
  countUnread?: number;
  'lastActivity.time'?: string;
  'lastActivity.timestamp': number;
  isSelected: boolean;
}

export interface Command {
  action: string;
  title: string;
  description: string;
}

export interface Chat {
  chatId: number;
  name: string;
  avatar?: string;
  countUnread: number;
  lastMessage: string;
  'lastActivity.time'?: string;
  'lastActivity.timestamp': string;
  'lastMessage.status'?: 'read' | 'sent' | 'received';
  isFixedTop?: boolean;
  isFixedBottom?: boolean;
  isFixed?: boolean;
  status?: string;
  statusMessage?: string;
  colorUnread?: string;
  actions?: ChatAction[];
  typing?: boolean;
  metadata?: string;
  dialogsExpanded?: boolean;
  dialogs?: Dialog[];
  contact?: Contact;
  commands?: Command[];
}

export type ChatsArray = Chat[];

