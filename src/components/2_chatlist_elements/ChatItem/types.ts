export interface IAction {
  action: string
  title: string
  icon?: string
  prime?: string
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

export interface IChatItem {
  chatId: number;
  name: string;
  avatar?: string;
  countUnread: number;
  lastMessage: string;
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
}

