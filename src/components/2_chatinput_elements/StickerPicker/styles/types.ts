/**
 * CSS переменные для компонента StickerPicker
 */
export interface StickerPickerThemeCSSVariables {
  // Button
  /** Цвет фона кнопки */
  '--chotto-stickerpicker-button-background-color': string;
  /** Граница кнопки */
  '--chotto-stickerpicker-button-border': string;
  /** Высота кнопки */
  '--chotto-stickerpicker-button-height': string;
  /** Отображение span кнопки */
  '--chotto-stickerpicker-button-span-display': string;
  /** Курсор span кнопки */
  '--chotto-stickerpicker-button-span-cursor': string;
  /** Отступы span кнопки */
  '--chotto-stickerpicker-button-span-padding': string;
  /** Размер шрифта span кнопки */
  '--chotto-stickerpicker-button-span-font-size': string;
  /** Цвет span кнопки */
  '--chotto-stickerpicker-button-span-color': string;
  /** Цвет span кнопки при наведении */
  '--chotto-stickerpicker-button-span-hover-color': string;

  // Button disabled
  /** События указателя отключенной кнопки */
  '--chotto-stickerpicker-button-disabled-pointer-events': string;
  /** Курсор span отключенной кнопки */
  '--chotto-stickerpicker-button-disabled-span-cursor': string;
  /** Цвет span отключенной кнопки */
  '--chotto-stickerpicker-button-disabled-span-color': string;

  // Picker
  /** Позиционирование пикера стикеров */
  '--chotto-stickerpicker-picker-position': string;
  /** Позиция пикера снизу */
  '--chotto-stickerpicker-picker-bottom': string;
  /** Z-индекс пикера */
  '--chotto-stickerpicker-picker-z-index': string;
  /** Цвет фона пикера */
  '--chotto-stickerpicker-picker-background-color': string;
  /** Скругление углов пикера */
  '--chotto-stickerpicker-picker-border-radius': string;
  /** Тень пикера */
  '--chotto-stickerpicker-picker-box-shadow': string;
  /** Отступы пикера */
  '--chotto-stickerpicker-picker-padding': string;
  /** Ширина пикера */
  '--chotto-stickerpicker-picker-width': string;
  /** Высота пикера */
  '--chotto-stickerpicker-picker-height': string;
  /** Отображение пикера */
  '--chotto-stickerpicker-picker-display': string;
  /** Направление flex пикера */
  '--chotto-stickerpicker-picker-flex-direction': string;
  /** Переполнение пикера */
  '--chotto-stickerpicker-picker-overflow': string;

  // Container
  /** Отображение контейнера */
  '--chotto-stickerpicker-container-display': string;
  /** Направление flex контейнера */
  '--chotto-stickerpicker-container-flex-direction': string;
  /** Переполнение контейнера */
  '--chotto-stickerpicker-container-overflow': string;

  // Content
  /** Flex контента */
  '--chotto-stickerpicker-content-flex': string;
  /** Переполнение по вертикали контента */
  '--chotto-stickerpicker-content-overflow-y': string;
  /** Переполнение по горизонтали контента */
  '--chotto-stickerpicker-content-overflow-x': string;
  /** Ширина скроллбара контента (Firefox) */
  '--chotto-stickerpicker-content-scrollbar-width': string;
  /** Цвет скроллбара контента (Firefox) */
  '--chotto-stickerpicker-content-scrollbar-color': string;
  /** Минимальная высота контента */
  '--chotto-stickerpicker-content-min-height': string;
  /** Ширина скроллбара контента (webkit) */
  '--chotto-stickerpicker-content-scrollbar-width-webkit': string;
  /** Фон трека скроллбара контента */
  '--chotto-stickerpicker-content-scrollbar-track-background': string;
  /** Цвет фона ползунка скроллбара контента */
  '--chotto-stickerpicker-content-scrollbar-thumb-background-color': string;
  /** Скругление ползунка скроллбара контента */
  '--chotto-stickerpicker-content-scrollbar-thumb-border-radius': string;

  // Empty state
  /** Отступы пустого состояния */
  '--chotto-stickerpicker-empty-padding': string;
  /** Выравнивание текста пустого состояния */
  '--chotto-stickerpicker-empty-text-align': string;
  /** Цвет текста пустого состояния */
  '--chotto-stickerpicker-empty-color': string;
  /** Размер шрифта пустого состояния */
  '--chotto-stickerpicker-empty-font-size': string;

  // Grid
  /** Отображение сетки */
  '--chotto-stickerpicker-grid-display': string;
  /** Колонки сетки */
  '--chotto-stickerpicker-grid-template-columns': string;
  /** Отступы между элементами сетки */
  '--chotto-stickerpicker-grid-gap': string;

  // Item
  /** Фон элемента стикера */
  '--chotto-stickerpicker-item-background': string;
  /** Граница элемента стикера */
  '--chotto-stickerpicker-item-border': string;
  /** Скругление углов элемента */
  '--chotto-stickerpicker-item-border-radius': string;
  /** Отступы элемента */
  '--chotto-stickerpicker-item-padding': string;
  /** Курсор элемента */
  '--chotto-stickerpicker-item-cursor': string;
  /** Переход элемента */
  '--chotto-stickerpicker-item-transition': string;
  /** Соотношение сторон элемента */
  '--chotto-stickerpicker-item-aspect-ratio': string;
  /** Фон элемента при наведении */
  '--chotto-stickerpicker-item-hover-background-color': string;

  // Image
  /** Ширина изображения */
  '--chotto-stickerpicker-image-width': string;
  /** Высота изображения */
  '--chotto-stickerpicker-image-height': string;
  /** Объект-фит изображения */
  '--chotto-stickerpicker-image-object-fit': string;
  /** Отображение изображения */
  '--chotto-stickerpicker-image-display': string;

  // Tabs
  /** Отображение вкладок */
  '--chotto-stickerpicker-tabs-display': string;
  /** Отступы между вкладками */
  '--chotto-stickerpicker-tabs-gap': string;
  /** Отступ снизу вкладок */
  '--chotto-stickerpicker-tabs-padding-bottom': string;
  /** Отступ снизу вкладок */
  '--chotto-stickerpicker-tabs-margin-bottom': string;
  /** Граница снизу вкладок */
  '--chotto-stickerpicker-tabs-border-bottom': string;
  /** Переполнение по горизонтали */
  '--chotto-stickerpicker-tabs-overflow-x': string;
  /** Переполнение по вертикали */
  '--chotto-stickerpicker-tabs-overflow-y': string;
  /** Ширина скроллбара (Firefox) */
  '--chotto-stickerpicker-tabs-scrollbar-width': string;
  /** Цвет скроллбара (Firefox) */
  '--chotto-stickerpicker-tabs-scrollbar-color': string;
  /** Сжатие вкладок */
  '--chotto-stickerpicker-tabs-flex-shrink': string;
  /** Отображение скроллбара (webkit) */
  '--chotto-stickerpicker-tabs-scrollbar-display': string;
  /** Ширина скроллбара (webkit) */
  '--chotto-stickerpicker-tabs-scrollbar-width-webkit': string;
  /** Высота скроллбара (webkit) */
  '--chotto-stickerpicker-tabs-scrollbar-height': string;

  // Tab
  /** Фон вкладки */
  '--chotto-stickerpicker-tab-background': string;
  /** Граница вкладки */
  '--chotto-stickerpicker-tab-border': string;
  /** Скругление углов вкладки */
  '--chotto-stickerpicker-tab-border-radius': string;
  /** Отступы вкладки */
  '--chotto-stickerpicker-tab-padding': string;
  /** Курсор вкладки */
  '--chotto-stickerpicker-tab-cursor': string;
  /** Переход вкладки */
  '--chotto-stickerpicker-tab-transition': string;
  /** Сжатие вкладки */
  '--chotto-stickerpicker-tab-flex-shrink': string;
  /** Ширина вкладки */
  '--chotto-stickerpicker-tab-width': string;
  /** Высота вкладки */
  '--chotto-stickerpicker-tab-height': string;
  /** Отображение вкладки */
  '--chotto-stickerpicker-tab-display': string;
  /** Выравнивание элементов вкладки */
  '--chotto-stickerpicker-tab-align-items': string;
  /** Выравнивание по главной оси вкладки */
  '--chotto-stickerpicker-tab-justify-content': string;
  /** Позиционирование вкладки */
  '--chotto-stickerpicker-tab-position': string;
  /** Фон вкладки при наведении */
  '--chotto-stickerpicker-tab-hover-background-color': string;
  /** Фон активной вкладки */
  '--chotto-stickerpicker-tab-active-background-color': string;

  // Tab active indicator
  /** Ширина индикатора активной вкладки */
  '--chotto-stickerpicker-tab-active-indicator-width': string;
  /** Высота индикатора активной вкладки */
  '--chotto-stickerpicker-tab-active-indicator-height': string;
  /** Цвет индикатора активной вкладки */
  '--chotto-stickerpicker-tab-active-indicator-color': string;
  /** Скругление индикатора активной вкладки */
  '--chotto-stickerpicker-tab-active-indicator-border-radius': string;

  // Tab icon
  /** Ширина иконки вкладки */
  '--chotto-stickerpicker-tab-icon-width': string;
  /** Высота иконки вкладки */
  '--chotto-stickerpicker-tab-icon-height': string;
  /** Объект-фит иконки вкладки */
  '--chotto-stickerpicker-tab-icon-object-fit': string;
  /** Отображение иконки вкладки */
  '--chotto-stickerpicker-tab-icon-display': string;

  // Tab icon placeholder
  /** Ширина плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-width': string;
  /** Высота плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-height': string;
  /** Отображение плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-display': string;
  /** Выравнивание плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-align-items': string;
  /** Выравнивание по главной оси плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-justify-content': string;
  /** Цвет плейсхолдера иконки вкладки */
  '--chotto-stickerpicker-tab-icon-placeholder-color': string;

  // Preview
  /** Позиционирование предпросмотра */
  '--chotto-stickerpicker-preview-position': string;
  /** Z-индекс предпросмотра */
  '--chotto-stickerpicker-preview-z-index': string;
  /** События указателя предпросмотра */
  '--chotto-stickerpicker-preview-pointer-events': string;
  /** Курсор предпросмотра */
  '--chotto-stickerpicker-preview-cursor': string;
  /** Цвет фона предпросмотра */
  '--chotto-stickerpicker-preview-background-color': string;
  /** Скругление углов предпросмотра */
  '--chotto-stickerpicker-preview-border-radius': string;
  /** Отступы предпросмотра */
  '--chotto-stickerpicker-preview-padding': string;
  /** Тень предпросмотра */
  '--chotto-stickerpicker-preview-box-shadow': string;
  /** Отображение предпросмотра */
  '--chotto-stickerpicker-preview-display': string;
  /** Направление flex предпросмотра */
  '--chotto-stickerpicker-preview-flex-direction': string;
  /** Выравнивание элементов предпросмотра */
  '--chotto-stickerpicker-preview-align-items': string;
  /** Отступы между элементами предпросмотра */
  '--chotto-stickerpicker-preview-gap': string;
  /** Минимальная ширина предпросмотра */
  '--chotto-stickerpicker-preview-min-width': string;
  /** Максимальная ширина предпросмотра */
  '--chotto-stickerpicker-preview-max-width': string;
  /** Позиция слева предпросмотра */
  '--chotto-stickerpicker-preview-left': string;
  /** Позиция сверху предпросмотра */
  '--chotto-stickerpicker-preview-top': string;
  /** Трансформация предпросмотра */
  '--chotto-stickerpicker-preview-transform': string;

  // Preview image
  /** Ширина изображения предпросмотра */
  '--chotto-stickerpicker-preview-image-width': string;
  /** Высота изображения предпросмотра */
  '--chotto-stickerpicker-preview-image-height': string;
  /** Объект-фит изображения предпросмотра */
  '--chotto-stickerpicker-preview-image-object-fit': string;
  /** Отображение изображения предпросмотра */
  '--chotto-stickerpicker-preview-image-display': string;

  // Preview label
  /** Цвет текста метки предпросмотра */
  '--chotto-stickerpicker-preview-label-color': string;
  /** Размер шрифта метки предпросмотра */
  '--chotto-stickerpicker-preview-label-font-size': string;
  /** Выравнивание текста метки предпросмотра */
  '--chotto-stickerpicker-preview-label-text-align': string;
  /** Перенос слов метки предпросмотра */
  '--chotto-stickerpicker-preview-label-word-wrap': string;
  /** Максимальная ширина метки предпросмотра */
  '--chotto-stickerpicker-preview-label-max-width': string;

  // Preview animation
  /** Переход предпросмотра */
  '--chotto-stickerpicker-preview-transition': string;
  /** Прозрачность при входе предпросмотра */
  '--chotto-stickerpicker-preview-enter-opacity': string;
  /** Трансформация при входе предпросмотра */
  '--chotto-stickerpicker-preview-enter-transform': string;
  /** Прозрачность при завершении входа предпросмотра */
  '--chotto-stickerpicker-preview-enter-to-opacity': string;
  /** Трансформация при завершении входа предпросмотра */
  '--chotto-stickerpicker-preview-enter-to-transform': string;
}



