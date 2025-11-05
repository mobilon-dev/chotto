/**
 * CSS переменные для компонента Feed
 */
export interface FeedThemeCSSVariables {
  // Main container
  /** Высота ленты сообщений */
  '--chotto-feed-height': string;
  /** Максимальная высота ленты сообщений */
  '--chotto-feed-max-height': string;
  /** Отображение ленты сообщений */
  '--chotto-feed-display': string;
  /** Направление флекс-контейнера ленты сообщений */
  '--chotto-feed-flex-direction': string;
  /** Переполнение по вертикали ленты сообщений */
  '--chotto-feed-overflow-y': string;
  /** Переполнение по горизонтали ленты сообщений */
  '--chotto-feed-overflow-x': string;
  /** Поведение прокрутки ленты сообщений */
  '--chotto-feed-scroll-behavior': string;
  /** Отступы ленты сообщений */
  '--chotto-feed-padding': string;
  /** Позиционирование ленты сообщений */
  '--chotto-feed-position': string;

  // Message
  /** Позиционирование сообщения */
  '--chotto-feed-message-position': string;
  /** Переход сообщения */
  '--chotto-feed-message-transition': string;

  // Button down
  /** Позиционирование кнопки прокрутки вниз */
  '--chotto-feed-button-down-position': string;
  /** Z-index кнопки прокрутки вниз */
  '--chotto-feed-button-down-z-index': string;
  /** Позиция кнопки прокрутки вниз снизу */
  '--chotto-feed-button-down-bottom': string;
  /** Отступ слева кнопки прокрутки вниз */
  '--chotto-feed-button-down-margin-left': string;
  /** Граница кнопки прокрутки вниз */
  '--chotto-feed-button-down-border': string;
  /** Минимальная ширина кнопки прокрутки вниз */
  '--chotto-feed-button-down-min-width': string;
  /** Минимальная высота кнопки прокрутки вниз */
  '--chotto-feed-button-down-min-height': string;
  /** Радиус границы кнопки прокрутки вниз */
  '--chotto-feed-button-down-border-radius': string;
  /** Отображение кнопки прокрутки вниз */
  '--chotto-feed-button-down-display': string;
  /** Выравнивание по главной оси кнопки прокрутки вниз */
  '--chotto-feed-button-down-justify-content': string;
  /** Выравнивание по поперечной оси кнопки прокрутки вниз */
  '--chotto-feed-button-down-align-items': string;
  /** Курсор кнопки прокрутки вниз */
  '--chotto-feed-button-down-cursor': string;
  /** Цвет фона кнопки прокрутки вниз */
  '--chotto-feed-button-down-background-color': string;

  // Keyboard
  /** Позиционирование клавиатуры */
  '--chotto-feed-keyboard-position': string;
  /** Позиция клавиатуры снизу */
  '--chotto-feed-keyboard-bottom': string;
  /** Максимальная ширина клавиатуры */
  '--chotto-feed-keyboard-max-width': string;
  /** Ширина клавиатуры */
  '--chotto-feed-keyboard-width': string;

  // Icon down
  /** Размер шрифта иконки прокрутки вниз */
  '--chotto-feed-icon-down-font-size': string;
  /** Цвет иконки прокрутки вниз */
  '--chotto-feed-icon-down-color': string;

  // Unread amount
  /** Позиционирование счетчика непрочитанных */
  '--chotto-feed-unread-amount-position': string;
  /** Позиция счетчика непрочитанных сверху */
  '--chotto-feed-unread-amount-top': string;
  /** Позиция счетчика непрочитанных слева */
  '--chotto-feed-unread-amount-left': string;
  /** Позиция счетчика непрочитанных справа */
  '--chotto-feed-unread-amount-right': string;
  /** Отступы счетчика непрочитанных */
  '--chotto-feed-unread-amount-margin': string;
  /** Отображение счетчика непрочитанных */
  '--chotto-feed-unread-amount-display': string;
  /** Выравнивание по главной оси счетчика непрочитанных */
  '--chotto-feed-unread-amount-justify-content': string;
  /** Выравнивание по поперечной оси счетчика непрочитанных */
  '--chotto-feed-unread-amount-align-items': string;
  /** Размер шрифта счетчика непрочитанных */
  '--chotto-feed-unread-amount-font-size': string;
  /** Ширина счетчика непрочитанных */
  '--chotto-feed-unread-amount-width': string;
  /** Высота счетчика непрочитанных */
  '--chotto-feed-unread-amount-height': string;
  /** Цвет счетчика непрочитанных */
  '--chotto-feed-unread-amount-color': string;
  /** Цвет фона счетчика непрочитанных */
  '--chotto-feed-unread-amount-background-color': string;
  /** Радиус границы счетчика непрочитанных */
  '--chotto-feed-unread-amount-border-radius': string;

  // Scrollbar
  /** Ширина скроллбара */
  '--chotto-feed-scrollbar-width': string;
  /** Цвет фона скроллбара */
  '--chotto-feed-scrollbar-background-color': string;
  /** Альтернативный ключ для цвета фона скроллбара (исп. в scss) */
  '--chotto-feed-scrollbar-bg': string;
  /** Радиус границы ползунка скроллбара */
  '--chotto-feed-scrollbar-thumb-border-radius': string;
  /** Цвет фона ползунка скроллбара */
  '--chotto-feed-scrollbar-thumb-background-color': string;
  /** Альтернативный ключ для цвета ползунка скроллбара (исп. в scss) */
  '--chotto-feed-scrollbar-thumb-bg': string;
  /** Радиус границы дорожки скроллбара */
  '--chotto-feed-scrollbar-track-border-radius': string;

  // Focused message
  /** Цвет фона сфокусированного сообщения */
  '--chotto-feed-focused-message-background-color': string;
  /** Тень сфокусированного сообщения */
  '--chotto-feed-focused-message-box-shadow': string;

  // Animations
  /** Переход при входе */
  '--chotto-feed-enter-active-transition': string;
  /** Переход при выходе */
  '--chotto-feed-leave-active-transition': string;
  /** Трансформация при входе/выходе */
  '--chotto-feed-enter-leave-transform': string;
  /** Прозрачность при входе/выходе */
  '--chotto-feed-enter-leave-opacity': string;
}
