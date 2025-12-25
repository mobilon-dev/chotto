export interface IAction {
  action: string
  title: string
  icon?: string
  prime?: string
  disabled?: boolean
}

export interface IChatDialog {
  branchId: string;
  dialogId: string;
  attributeId: string;
  channelId: string;
  icon?: string;
  name: string;
  fullname: string;
  countUnread: number;
  'lastActivity.time': string;
  'lastActivity.timestamp': number;
  isSelected: boolean;
  colorUnread?: string;
}

export interface ILastMessageObject {
  _id?: string;
  branchId?: string;
  contactId?: string;
  dialogId?: string;
  sessionId?: string;
  messageId?: string;
  channelId?: string;
  senderId?: string;
  type?: string;
  isVoiceMessage?: boolean;
  data?: {
    text?: string;
    url?: string;
    filename?: string;
    isVoiceMessage?: boolean;
  };
  timestampms?: number;
  channel?: {
    _id?: string;
    branchId?: string;
    channelId?: string;
    title?: string;
    status?: string;
  };
}

export interface IChatItem {
  chatId: number;
  name: string;
  avatar?: string;
  countUnread: number;
  lastMessage: string | ILastMessageObject;
  'lastActivity.time': string;
  'lastActivity.timestamp': string;
  isFixedBottom: boolean;
  isFixedTop?: boolean;
  status: string;
  'lastMessage.status': string;
  actions?: IAction[];
  typing: boolean;
  metadata: string;
  dialogsExpanded: boolean;
  dialogs?: IChatDialog[];
  isSelected: boolean;
  showEmptyIndicator?: boolean;
}

