/**
 * CSS переменные для компонента Modal
 */
export interface ModalThemeCSSVariables {
  // Modal backdrop
  /** Позиционирование фона модального окна */
  '--chotto-modal-backdrop-position': string;
  /** Позиция фона модального окна сверху */
  '--chotto-modal-backdrop-top': string;
  /** Позиция фона модального окна снизу */
  '--chotto-modal-backdrop-bottom': string;
  /** Позиция фона модального окна слева */
  '--chotto-modal-backdrop-left': string;
  /** Позиция фона модального окна справа */
  '--chotto-modal-backdrop-right': string;
  /** Фон фона модального окна */
  '--chotto-modal-backdrop-bg': string;
  /** Отображение фона модального окна */
  '--chotto-modal-backdrop-display': string;
  /** Выравнивание фона модального окна по горизонтали */
  '--chotto-modal-backdrop-justify': string;
  /** Выравнивание фона модального окна по вертикали */
  '--chotto-modal-backdrop-align': string;
  /** Фильтр фона модального окна */
  '--chotto-modal-backdrop-filter': string;
  /** Z-index модального окна */
  '--chotto-modal-z-index': string;

  // Modal container
  /** Фон модального окна */
  '--chotto-modal-background': string;
  /** Тень модального окна */
  '--chotto-modal-box-shadow': string;
  /** Граница модального окна */
  '--chotto-modal-border': string;
  /** Радиус границы модального окна */
  '--chotto-modal-border-radius': string;
  /** Позиционирование модального окна */
  '--chotto-modal-position': string;
  /** Отображение модального окна */
  '--chotto-modal-display': string;
  /** Направление flex модального окна */
  '--chotto-modal-flex-direction': string;

  // Modal sizing
  /** Минимальная ширина модального окна */
  '--chotto-modal-min-width': string;
  /** Минимальная высота модального окна */
  '--chotto-modal-min-height': string;
  /** Максимальная ширина модального окна */
  '--chotto-modal-max-width': string;
  /** Максимальная высота модального окна */
  '--chotto-modal-max-height': string;
  /** Ширина модального окна */
  '--chotto-modal-width': string;
  /** Высота модального окна */
  '--chotto-modal-height': string;
  /** Переполнение по горизонтали модального окна */
  '--chotto-modal-overflow-x': string;
  /** Переполнение по вертикали модального окна */
  '--chotto-modal-overflow-y': string;

  // Modal body
  /** Позиционирование тела модального окна */
  '--chotto-modal-body-position': string;
  /** Отступы тела модального окна */
  '--chotto-modal-body-padding': string;
  /** Внешние отступы тела модального окна */
  '--chotto-modal-body-margin': string;
  /** Рост flex тела модального окна */
  '--chotto-modal-body-flex-grow': string;
  /** Переполнение тела модального окна */
  '--chotto-modal-body-overflow': string;
  /** Цвет текста модального окна */
  '--chotto-modal-text-color': string;
  /** Размер шрифта модального окна */
  '--chotto-modal-font-size': string;
  /** Семейство шрифтов модального окна */
  '--chotto-modal-font-family': string;
  /** Высота строки модального окна */
  '--chotto-modal-line-height': string;
  /** Выравнивание текста модального окна */
  '--chotto-modal-text-align': string;

  // Modal buttons container
  /** Отображение контейнера кнопок модального окна */
  '--chotto-modal-buttons-display': string;
  /** Внешние отступы контейнера кнопок модального окна */
  '--chotto-modal-buttons-margin': string;
  /** Внутренние отступы контейнера кнопок модального окна */
  '--chotto-modal-buttons-padding': string;
  /** Промежуток между кнопками модального окна */
  '--chotto-modal-buttons-gap': string;
  /** Выравнивание кнопок модального окна по горизонтали */
  '--chotto-modal-buttons-justify': string;
  /** Выравнивание кнопок модального окна по вертикали */
  '--chotto-modal-buttons-align': string;
  /** Перенос кнопок модального окна */
  '--chotto-modal-buttons-wrap': string;

  // Modal buttons
  /** Фон кнопки модального окна */
  '--chotto-modal-button-bg': string;
  /** Цвет текста кнопки модального окна */
  '--chotto-modal-button-text-color': string;
  /** Граница кнопки модального окна */
  '--chotto-modal-button-border': string;
  /** Радиус границы кнопки модального окна */
  '--chotto-modal-button-border-radius': string;
  /** Отступы кнопки модального окна */
  '--chotto-modal-button-padding': string;
  /** Внешние отступы кнопки модального окна */
  '--chotto-modal-button-margin': string;
  /** Размер шрифта кнопки модального окна */
  '--chotto-modal-button-font-size': string;
  /** Семейство шрифтов кнопки модального окна */
  '--chotto-modal-button-font-family': string;
  /** Жирность шрифта кнопки модального окна */
  '--chotto-modal-button-font-weight': string;
  /** Курсор кнопки модального окна */
  '--chotto-modal-button-cursor': string;
  /** Переход кнопки модального окна */
  '--chotto-modal-button-transition': string;
  /** Минимальная ширина кнопки модального окна */
  '--chotto-modal-button-min-width': string;
  /** Минимальная высота кнопки модального окна */
  '--chotto-modal-button-min-height': string;
  /** Отображение кнопки модального окна */
  '--chotto-modal-button-display': string;
  /** Выравнивание текста кнопки модального окна */
  '--chotto-modal-button-text-align': string;
  /** Декорация текста кнопки модального окна */
  '--chotto-modal-button-text-decoration': string;
  /** Контур кнопки модального окна */
  '--chotto-modal-button-outline': string;
  /** Тень кнопки модального окна */
  '--chotto-modal-button-box-shadow': string;

  // Button states
  /** Фон кнопки модального окна при наведении */
  '--chotto-modal-button-hover-bg': string;
  /** Трансформация кнопки модального окна при наведении */
  '--chotto-modal-button-hover-transform': string;
  /** Тень кнопки модального окна при наведении */
  '--chotto-modal-button-hover-box-shadow': string;
  /** Фон кнопки модального окна при нажатии */
  '--chotto-modal-button-active-bg': string;
  /** Трансформация кнопки модального окна при нажатии */
  '--chotto-modal-button-active-transform': string;
  /** Тень кнопки модального окна при нажатии */
  '--chotto-modal-button-active-box-shadow': string;
  /** Контур кнопки модального окна при фокусе */
  '--chotto-modal-button-focus-outline': string;
  /** Смещение контура кнопки модального окна при фокусе */
  '--chotto-modal-button-focus-outline-offset': string;
  /** Фон отключенной кнопки модального окна */
  '--chotto-modal-button-disabled-bg': string;
  /** Цвет текста отключенной кнопки модального окна */
  '--chotto-modal-button-disabled-text-color': string;
  /** Курсор отключенной кнопки модального окна */
  '--chotto-modal-button-disabled-cursor': string;
  /** Прозрачность отключенной кнопки модального окна */
  '--chotto-modal-button-disabled-opacity': string;

  // Modal animations
  /** Переход анимации модального окна */
  '--chotto-modal-transition': string;
  /** Прозрачность при входе модального окна */
  '--chotto-modal-enter-opacity': string;
  /** Трансформация при входе модального окна */
  '--chotto-modal-enter-transform': string;
  /** Прозрачность при завершении входа модального окна */
  '--chotto-modal-enter-to-opacity': string;
  /** Трансформация при завершении входа модального окна */
  '--chotto-modal-enter-to-transform': string;

  // Modal cancel button
  /** Фон кнопки отмены модального окна */
  '--chotto-modal-cancel-button-bg': string;
  /** Граница кнопки отмены модального окна */
  '--chotto-modal-cancel-button-border': string;
}
