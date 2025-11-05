/**
 * CSS переменные для компонента ModalFullscreen
 */
export interface ModalFullscreenThemeCSSVariables {
  // Modal container
  /** Позиционирование контейнера модального окна */
  '--chotto-modalfullscreen-container-position': string;
  /** Позиция контейнера модального окна сверху */
  '--chotto-modalfullscreen-container-top': string;
  /** Позиция контейнера модального окна слева */
  '--chotto-modalfullscreen-container-left': string;
  /** Позиция контейнера модального окна справа */
  '--chotto-modalfullscreen-container-right': string;
  /** Позиция контейнера модального окна снизу */
  '--chotto-modalfullscreen-container-bottom': string;
  /** Трансформация контейнера модального окна */
  '--chotto-modalfullscreen-container-transform': string;
  /** Z-index контейнера модального окна */
  '--chotto-modalfullscreen-container-z-index': string;
  /** Цвет текста модального окна */
  '--chotto-modalfullscreen-text-color': string;
  /** Фон модального окна */
  '--chotto-modalfullscreen-background': string;
  /** Граница модального окна */
  '--chotto-modalfullscreen-border': string;
  /** Радиус границы модального окна */
  '--chotto-modalfullscreen-border-radius': string;
  /** Отступы модального окна */
  '--chotto-modalfullscreen-padding': string;
  /** Внешние отступы модального окна */
  '--chotto-modalfullscreen-margin': string;
  /** Максимальная ширина модального окна */
  '--chotto-modalfullscreen-max-width': string;
  /** Максимальная высота модального окна */
  '--chotto-modalfullscreen-max-height': string;
  /** Минимальная ширина модального окна */
  '--chotto-modalfullscreen-min-width': string;
  /** Минимальная высота модального окна */
  '--chotto-modalfullscreen-min-height': string;
  /** Ширина модального окна */
  '--chotto-modalfullscreen-width': string;
  /** Высота модального окна */
  '--chotto-modalfullscreen-height': string;
  /** Тень модального окна */
  '--chotto-modalfullscreen-box-shadow': string;
  /** Переполнение модального окна */
  '--chotto-modalfullscreen-overflow': string;
  /** Отображение модального окна */
  '--chotto-modalfullscreen-display': string;
  /** Направление flex модального окна */
  '--chotto-modalfullscreen-flex-direction': string;
  /** Выравнивание элементов модального окна по вертикали */
  '--chotto-modalfullscreen-align-items': string;
  /** Выравнивание элементов модального окна по горизонтали */
  '--chotto-modalfullscreen-justify-content': string;

  // Modal overlay
  /** Позиционирование оверлея модального окна */
  '--chotto-modalfullscreen-overlay-position': string;
  /** Позиция оверлея модального окна сверху */
  '--chotto-modalfullscreen-overlay-top': string;
  /** Позиция оверлея модального окна слева */
  '--chotto-modalfullscreen-overlay-left': string;
  /** Позиция оверлея модального окна справа */
  '--chotto-modalfullscreen-overlay-right': string;
  /** Позиция оверлея модального окна снизу */
  '--chotto-modalfullscreen-overlay-bottom': string;
  /** Фон оверлея модального окна */
  '--chotto-modalfullscreen-overlay-bg': string;
  /** Фильтр оверлея модального окна */
  '--chotto-modalfullscreen-overlay-backdrop-filter': string;
  /** Z-index оверлея модального окна */
  '--chotto-modalfullscreen-overlay-z-index': string;
  /** Отображение оверлея модального окна */
  '--chotto-modalfullscreen-overlay-display': string;
  /** Прозрачность оверлея модального окна */
  '--chotto-modalfullscreen-overlay-opacity': string;
  /** Переход оверлея модального окна */
  '--chotto-modalfullscreen-overlay-transition': string;

  // Close button
  /** Отображение кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-display': string;
  /** Позиционирование кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-position': string;
  /** Фон кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-bg': string;
  /** Граница кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-border': string;
  /** Радиус границы кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-border-radius': string;
  /** Отступы кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-padding': string;
  /** Внешние отступы кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-margin': string;
  /** Курсор кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-cursor': string;
  /** Ширина кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-width': string;
  /** Высота кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-height': string;
  /** Минимальная ширина кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-min-width': string;
  /** Минимальная высота кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-min-height': string;
  /** Переход кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-transition': string;
  /** Контур кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-outline': string;
  /** Тень кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-box-shadow': string;

  // Close button states
  /** Фон кнопки закрытия модального окна при наведении */
  '--chotto-modalfullscreen-close-button-hover-bg': string;
  /** Трансформация кнопки закрытия модального окна при наведении */
  '--chotto-modalfullscreen-close-button-hover-transform': string;
  /** Тень кнопки закрытия модального окна при наведении */
  '--chotto-modalfullscreen-close-button-hover-box-shadow': string;
  /** Фон кнопки закрытия модального окна при нажатии */
  '--chotto-modalfullscreen-close-button-active-bg': string;
  /** Трансформация кнопки закрытия модального окна при нажатии */
  '--chotto-modalfullscreen-close-button-active-transform': string;
  /** Контур кнопки закрытия модального окна при фокусе */
  '--chotto-modalfullscreen-close-button-focus-outline': string;
  /** Смещение контура кнопки закрытия модального окна при фокусе */
  '--chotto-modalfullscreen-close-button-focus-outline-offset': string;

  // Close button span
  /** Цвет текста span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-text-color': string;
  /** Размер шрифта span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-font-size': string;
  /** Отображение span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-span-display': string;
  /** Выравнивание текста span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-span-text-align': string;
  /** Высота строки span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-span-line-height': string;
  /** Переход span кнопки закрытия модального окна */
  '--chotto-modalfullscreen-close-button-span-transition': string;
}
