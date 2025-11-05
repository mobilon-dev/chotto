export interface IFeedKeyboard {
  key: string;
  text: string;
  order: number;
  action?: (() => void) | string;
  'shadow-color'?: string;
  'text-color'?: string;
}