export type ContactPickItem = {
  id: string | number;
  name: string;
  initials?: string;
  avatarColor?: string;
};

export type ContactPickLetterGroup<T extends ContactPickItem = ContactPickItem> = {
  letter: string;
  items: T[];
};