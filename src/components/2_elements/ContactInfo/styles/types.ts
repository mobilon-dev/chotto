/**
 * CSS переменные для компонента ContactInfo
 */
export interface ContactInfoThemeCSSVariables {
  // Main container
  /** Верхний отступ контейнера информации о контакте */
  '--chotto-contactinfo-margin-top': string;
  /** Минимальная ширина контейнера информации о контакте */
  '--chotto-contactinfo-min-width': string;
  /** Размер шрифта контейнера информации о контакте */
  '--chotto-contactinfo-font-size': string;

  // Attribute list
  /** Нижний отступ списка атрибутов */
  '--chotto-contactinfo-attribute-list-padding-bottom': string;
  /** Левый отступ списка атрибутов */
  '--chotto-contactinfo-attribute-list-margin-left': string;

  // Attribute item
  /** Отображение элемента атрибута */
  '--chotto-contactinfo-attribute-item-display': string;
  /** Выравнивание элементов элемента атрибута по вертикали */
  '--chotto-contactinfo-attribute-item-align-items': string;
  /** Нижний отступ элемента атрибута */
  '--chotto-contactinfo-attribute-item-margin-bottom': string;
  /** Непрозрачность input элемента атрибута */
  '--chotto-contactinfo-attribute-item-input-opacity': string;
  /** Позиционирование input элемента атрибута */
  '--chotto-contactinfo-attribute-item-input-position': string;
  /** Ширина input элемента атрибута */
  '--chotto-contactinfo-attribute-item-input-width': string;
  /** Высота input элемента атрибута */
  '--chotto-contactinfo-attribute-item-input-height': string;
  /** Отображение label элемента атрибута */
  '--chotto-contactinfo-attribute-item-label-display': string;
  /** Выравнивание элементов label элемента атрибута по вертикали */
  '--chotto-contactinfo-attribute-item-label-align-items': string;
  /** Курсор label элемента атрибута */
  '--chotto-contactinfo-attribute-item-label-cursor': string;
  /** Отступы label элемента атрибута */
  '--chotto-contactinfo-attribute-item-label-margin': string;
  /** Левый отступ значка текущего чата */
  '--chotto-contactinfo-attribute-item-current-chat-badge-margin-left': string;
  /** Размер шрифта значка текущего чата */
  '--chotto-contactinfo-attribute-item-current-chat-badge-font-size': string;
  /** Цвет значка текущего чата */
  '--chotto-contactinfo-attribute-item-current-chat-badge-color': string;

  // Custom radio
  /** Отображение кастомного радио */
  '--chotto-contactinfo-custom-radio-display': string;
  /** Выравнивание элементов кастомного радио по вертикали */
  '--chotto-contactinfo-custom-radio-align-items': string;
  /** Выравнивание содержимого кастомного радио по горизонтали */
  '--chotto-contactinfo-custom-radio-justify-content': string;
  /** Ширина кастомного радио */
  '--chotto-contactinfo-custom-radio-width': string;
  /** Высота кастомного радио */
  '--chotto-contactinfo-custom-radio-height': string;
  /** Граница кастомного радио */
  '--chotto-contactinfo-custom-radio-border': string;
  /** Радиус границы кастомного радио */
  '--chotto-contactinfo-custom-radio-border-radius': string;
  /** Правый отступ кастомного радио */
  '--chotto-contactinfo-custom-radio-margin-right': string;
  /** Сжатие кастомного радио */
  '--chotto-contactinfo-custom-radio-flex-shrink': string;
  /** Переход кастомного радио */
  '--chotto-contactinfo-custom-radio-transition': string;

  // Radio inner
  /** Позиционирование внутренней части радио */
  '--chotto-contactinfo-radio-inner-position': string;
  /** Ширина внутренней части радио */
  '--chotto-contactinfo-radio-inner-width': string;
  /** Высота внутренней части радио */
  '--chotto-contactinfo-radio-inner-height': string;
  /** Отображение внутренней части радио */
  '--chotto-contactinfo-radio-inner-display': string;
  /** Выравнивание элементов внутренней части радио по вертикали */
  '--chotto-contactinfo-radio-inner-align-items': string;
  /** Выравнивание содержимого внутренней части радио по горизонтали */
  '--chotto-contactinfo-radio-inner-justify-content': string;
  /** Переход внутренней части радио */
  '--chotto-contactinfo-radio-inner-transition': string;

  // Attribute item label hover custom radio
  /** Цвет границы кастомного радио при наведении на label элемента атрибута */
  '--chotto-contactinfo-attribute-item-label-hover-custom-radio-border-color': string;

  // Channel section
  /** Нижний отступ секции канала */
  '--chotto-contactinfo-channel-section-margin-bottom': string;

  // Channel label
  /** Отображение метки канала */
  '--chotto-contactinfo-channel-label-display': string;
  /** Размер шрифта метки канала */
  '--chotto-contactinfo-channel-label-font-size': string;
  /** Цвет метки канала */
  '--chotto-contactinfo-channel-label-color': string;
  /** Отступы метки канала */
  '--chotto-contactinfo-channel-label-margin': string;

  // Custom select
  /** Позиционирование кастомного селекта */
  '--chotto-contactinfo-custom-select-position': string;
  /** Ширина кастомного селекта */
  '--chotto-contactinfo-custom-select-width': string;

  // Select trigger
  /** Отображение триггера селекта */
  '--chotto-contactinfo-select-trigger-display': string;
  /** Выравнивание элементов триггера селекта по вертикали */
  '--chotto-contactinfo-select-trigger-align-items': string;
  /** Отступы триггера селекта */
  '--chotto-contactinfo-select-trigger-padding': string;
  /** Граница триггера селекта */
  '--chotto-contactinfo-select-trigger-border': string;
  /** Радиус границы триггера селекта */
  '--chotto-contactinfo-select-trigger-border-radius': string;
  /** Фон триггера селекта */
  '--chotto-contactinfo-select-trigger-background': string;
  /** Курсор триггера селекта */
  '--chotto-contactinfo-select-trigger-cursor': string;
  /** Размер шрифта триггера селекта */
  '--chotto-contactinfo-select-trigger-font-size': string;
  /** Цвет триггера селекта */
  '--chotto-contactinfo-select-trigger-color': string;
  /** Выбор текста триггера селекта */
  '--chotto-contactinfo-select-trigger-user-select': string;
  /** Левый отступ триггера селекта */
  '--chotto-contactinfo-select-trigger-margin-left': string;

  // Icon
  /** Ширина иконки */
  '--chotto-contactinfo-icon-width': string;
  /** Высота иконки */
  '--chotto-contactinfo-icon-height': string;
  /** Правый отступ иконки */
  '--chotto-contactinfo-icon-margin-right': string;
  /** Отображение иконки */
  '--chotto-contactinfo-icon-display': string;
  /** Выравнивание элементов иконки по вертикали */
  '--chotto-contactinfo-icon-align-items': string;
  /** Выравнивание содержимого иконки по горизонтали */
  '--chotto-contactinfo-icon-justify-content': string;
  /** Ширина SVG иконки */
  '--chotto-contactinfo-icon-svg-width': string;
  /** Высота SVG иконки */
  '--chotto-contactinfo-icon-svg-height': string;

  // Arrow
  /** Левый отступ стрелки */
  '--chotto-contactinfo-arrow-margin-left': string;
  /** Переход стрелки */
  '--chotto-contactinfo-arrow-transition': string;
  /** Трансформация открытой стрелки */
  '--chotto-contactinfo-arrow-open-transform': string;

  // Select options
  /** Позиционирование опций селекта */
  '--chotto-contactinfo-select-options-position': string;
  /** Верхняя позиция опций селекта */
  '--chotto-contactinfo-select-options-top': string;
  /** Левая позиция опций селекта */
  '--chotto-contactinfo-select-options-left': string;
  /** Правая позиция опций селекта */
  '--chotto-contactinfo-select-options-right': string;
  /** Фон опций селекта */
  '--chotto-contactinfo-select-options-background': string;
  /** Граница опций селекта */
  '--chotto-contactinfo-select-options-border': string;
  /** Верхняя граница опций селекта */
  '--chotto-contactinfo-select-options-border-top': string;
  /** Радиус границы опций селекта */
  '--chotto-contactinfo-select-options-border-radius': string;
  /** Максимальная высота опций селекта */
  '--chotto-contactinfo-select-options-max-height': string;
  /** Вертикальная прокрутка опций селекта */
  '--chotto-contactinfo-select-options-overflow-y': string;
  /** Z-index опций селекта */
  '--chotto-contactinfo-select-options-z-index': string;
  /** Тень опций селекта */
  '--chotto-contactinfo-select-options-box-shadow': string;

  // Select option
  /** Отображение опции селекта */
  '--chotto-contactinfo-select-option-display': string;
  /** Выравнивание элементов опции селекта по вертикали */
  '--chotto-contactinfo-select-option-align-items': string;
  /** Отступы опции селекта */
  '--chotto-contactinfo-select-option-padding': string;
  /** Курсор опции селекта */
  '--chotto-contactinfo-select-option-cursor': string;
  /** Размер шрифта опции селекта */
  '--chotto-contactinfo-select-option-font-size': string;
  /** Цвет опции селекта */
  '--chotto-contactinfo-select-option-color': string;
  /** Выбор текста опции селекта */
  '--chotto-contactinfo-select-option-user-select': string;
  /** Цвет фона опции селекта при наведении */
  '--chotto-contactinfo-select-option-hover-background-color': string;

  // Divider
  /** Ширина разделителя */
  '--chotto-contactinfo-divider-width': string;
  /** Высота разделителя */
  '--chotto-contactinfo-divider-height': string;
  /** Цвет фона разделителя */
  '--chotto-contactinfo-divider-background-color': string;
  /** Нижний отступ разделителя */
  '--chotto-contactinfo-divider-margin-bottom': string;
  /** Левый отступ разделителя */
  '--chotto-contactinfo-divider-margin-left': string;

  // Button
  /** Отображение кнопки */
  '--chotto-contactinfo-button-display': string;
  /** Выравнивание элементов кнопки по вертикали */
  '--chotto-contactinfo-button-align-items': string;
  /** Отступ между элементами кнопки */
  '--chotto-contactinfo-button-gap': string;
  /** Отступы кнопки */
  '--chotto-contactinfo-button-padding': string;
  /** Ширина кнопки */
  '--chotto-contactinfo-button-width': string;
  /** Граница кнопки */
  '--chotto-contactinfo-button-border': string;
  /** Фон кнопки */
  '--chotto-contactinfo-button-background': string;
  /** Курсор кнопки */
  '--chotto-contactinfo-button-cursor': string;
  /** Цвет кнопки */
  '--chotto-contactinfo-button-color': string;
  /** Размер шрифта кнопки */
  '--chotto-contactinfo-button-font-size': string;
  /** Выравнивание текста кнопки */
  '--chotto-contactinfo-button-text-align': string;
  /** Радиус границы кнопки */
  '--chotto-contactinfo-button-border-radius': string;
  /** Переход кнопки */
  '--chotto-contactinfo-button-transition': string;
  /** Цвет фона кнопки при наведении */
  '--chotto-contactinfo-button-hover-background-color': string;
  /** Ширина SVG/изображения кнопки */
  '--chotto-contactinfo-button-svg-img-width': string;
  /** Высота SVG/изображения кнопки */
  '--chotto-contactinfo-button-svg-img-height': string;
}