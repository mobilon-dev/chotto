/**
 * CSS переменные для компонента ChannelSelector
 */
export interface ChannelSelectorThemeCSSVariables {
  // Container
  /** Отображение контейнера */
  '--chotto-channelselector-container-display': string;
  /** Цвет отключенного контейнера */
  '--chotto-channelselector-container-disabled-color': string;

  // Title
  /** Размер шрифта заголовка */
  '--chotto-channelselector-title-font-size': string;

  // Selected
  /** Высота выбранного элемента */
  '--chotto-channelselector-selected-height': string;
  /** Отступы выбранного элемента */
  '--chotto-channelselector-selected-margin': string;
  /** Отображение выбранного элемента */
  '--chotto-channelselector-selected-display': string;
  /** Выравнивание по главной оси выбранного элемента */
  '--chotto-channelselector-selected-justify-content': string;
  /** Промежуток между колонками выбранного элемента */
  '--chotto-channelselector-selected-column-gap': string;
  /** Выравнивание по поперечной оси выбранного элемента */
  '--chotto-channelselector-selected-align-items': string;
  /** Отступ слева выбранного элемента */
  '--chotto-channelselector-selected-margin-left': string;

  // Icon
  /** Отображение иконки */
  '--chotto-channelselector-icon-display': string;
  /** Высота иконки */
  '--chotto-channelselector-icon-height': string;
  /** Ширина иконки */
  '--chotto-channelselector-icon-width': string;

  // Trigger
  /** Отступы триггера */
  '--chotto-channelselector-trigger-padding': string;
  /** Отображение триггера */
  '--chotto-channelselector-trigger-display': string;
  /** Курсор триггера */
  '--chotto-channelselector-trigger-cursor': string;
  /** Размер шрифта триггера */
  '--chotto-channelselector-trigger-font-size': string;
  /** Цвет триггера */
  '--chotto-channelselector-trigger-color': string;
  /** Цвет триггера при наведении */
  '--chotto-channelselector-trigger-hover-color': string;

  // Disabled
  /** Цвет отключенного элемента */
  '--chotto-channelselector-disabled-color': string;
  /** Курсор отключенного элемента */
  '--chotto-channelselector-disabled-cursor': string;
  /** События указателя отключенного элемента */
  '--chotto-channelselector-disabled-pointer-events': string;
}