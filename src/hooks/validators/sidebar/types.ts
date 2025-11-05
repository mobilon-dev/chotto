/**
 * Типы для данных sidebar items
 */

export interface SidebarItem {
  itemId: string;
  icon: string;
  name?: string;
  notificationCount: number;
  notificationColor?: string;
  selected: boolean;
  isFixedBottom?: boolean;
  isFixedTop?: boolean;
}

export type SidebarItemList = SidebarItem[];


