/**
 * CSS variables for TypingMessage component
 */
export interface TypingMessageThemeCSSVariables {
  /** Отображение контейнера печатающего сообщения */
  '--chotto-typingmessage-container-display': string;
  /** Шаблон колонок контейнера печатающего сообщения */
  '--chotto-typingmessage-container-grid-template-columns': string;
  /** Позиционирование контейнера печатающего сообщения */
  '--chotto-typingmessage-container-position': string;
  /** Внешние отступы контейнера печатающего сообщения */
  '--chotto-typingmessage-container-margin': string;

  /** Колонка грида подписи */
  '--chotto-typingmessage-subtext-grid-column': string;
  /** Ряд грида подписи */
  '--chotto-typingmessage-subtext-grid-row': string;
  /** Внешние отступы подписи */
  '--chotto-typingmessage-subtext-margin': string;
  /** Размер шрифта подписи */
  '--chotto-typingmessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-typingmessage-subtext-color': string;

  /** Выравнивание аватара относительно себя */
  '--chotto-typingmessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-typingmessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-typingmessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-typingmessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-typingmessage-avatar-border-radius': string;
  /** Колонка грида аватара */
  '--chotto-typingmessage-avatar-grid-column': string;
  /** Ряд грида аватара */
  '--chotto-typingmessage-avatar-grid-row': string;
  /** Отступ справа от аватара */
  '--chotto-typingmessage-avatar-margin-right': string;

  /** Минимальная высота контейнера лоадера */
  '--chotto-typingmessage-loader-container-min-height': string;
  /** Колонка грида контейнера лоадера */
  '--chotto-typingmessage-loader-container-grid-column': string;
  /** Скругление контейнера лоадера */
  '--chotto-typingmessage-loader-container-border-radius': string;
  /** Внутренние отступы контейнера лоадера */
  '--chotto-typingmessage-loader-container-padding': string;
  /** Максимальная ширина контейнера лоадера */
  '--chotto-typingmessage-loader-container-max-width': string;
  /** Цвет фона контейнера лоадера */
  '--chotto-typingmessage-loader-container-background-color': string;

  /** Ширина индикатора набора */
  '--chotto-typingmessage-loader-width': string;
  /** Высота индикатора набора */
  '--chotto-typingmessage-loader-height': string;
  /** Позиционирование индикатора набора */
  '--chotto-typingmessage-loader-position': string;
  /** Смещение индикатора по вертикали */
  '--chotto-typingmessage-loader-top': string;
  /** Скругление индикатора набора */
  '--chotto-typingmessage-loader-border-radius': string;
  /** Анимация индикатора набора */
  '--chotto-typingmessage-loader-animation': string;
  /** Внешние отступы индикатора набора */
  '--chotto-typingmessage-loader-margin': string;

  /** Содержимое псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-content': string;
  /** Позиционирование псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-position': string;
  /** Ширина псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-width': string;
  /** Высота псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-height': string;
  /** Скругление псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-border-radius': string;
  /** Анимация псевдоэлемента точки */
  '--chotto-typingmessage-loader-pseudo-animation': string;

  /** Смещение левой точки индикатора */
  '--chotto-typingmessage-loader-before-left': string;
  /** Задержка анимации левой точки */
  '--chotto-typingmessage-loader-before-animation-delay': string;

  /** Смещение правой точки индикатора */
  '--chotto-typingmessage-loader-after-right': string;
  /** Задержка анимации правой точки */
  '--chotto-typingmessage-loader-after-animation-delay': string;

  /** Тень в начале анимации */
  '--chotto-typingmessage-keyframes-0-box-shadow': string;
  /** Тень в конце анимации */
  '--chotto-typingmessage-keyframes-100-box-shadow': string;
}