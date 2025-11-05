/**
 * CSS переменные для компонента TemplateSelector
 */
export interface TemplateSelectorThemeCSSVariables {
  // Main container
  /** Базовый фон TemplateSelector */
  '--chotto-templateselector-primary-color': string;
  /** Цвет границ элементов TemplateSelector */
  '--chotto-templateselector-item-border-color': string;
  /** Позиционирование селектора шаблонов */
  '--chotto-templateselector-position': string;
  /** Позиция селектора шаблонов снизу */
  '--chotto-templateselector-bottom': string;
  /** Позиция селектора шаблонов слева */
  '--chotto-templateselector-left': string;
  /** Позиция селектора шаблонов справа */
  '--chotto-templateselector-right': string;
  /** Z-index селектора шаблонов */
  '--chotto-templateselector-z-index': string;
  /** Контейнерный запрос селектора шаблонов */
  '--chotto-templateselector-container': string;

  // Container inline
  /** Максимальная высота встроенного контейнера */
  '--chotto-templateselector-container-inline-max-height': string;
  /** Отступы встроенного контейнера */
  '--chotto-templateselector-container-inline-padding': string;
  /** Граница сверху встроенного контейнера */
  '--chotto-templateselector-container-inline-border-top': string;
  /** Граница снизу встроенного контейнера */
  '--chotto-templateselector-container-inline-border-bottom': string;
  /** Размер коробки встроенного контейнера */
  '--chotto-templateselector-container-inline-box-sizing': string;
  /** Минимальная ширина встроенного контейнера */
  '--chotto-templateselector-container-inline-min-width': string;

  // Container elevated
  /** Цвет тени контейнера */
  '--chotto-templateselector-shadow-color': string;
  /** Позиционирование приподнятого контейнера */
  '--chotto-templateselector-container-elevated-position': string;
  /** Максимальная высота приподнятого контейнера */
  '--chotto-templateselector-container-elevated-max-height': string;
  /** Отступы приподнятого контейнера */
  '--chotto-templateselector-container-elevated-padding': string;
  /** Граница приподнятого контейнера */
  '--chotto-templateselector-container-elevated-border': string;
  /** Минимальная ширина приподнятого контейнера */
  '--chotto-templateselector-container-elevated-min-width': string;
  /** Тень приподнятого контейнера */
  '--chotto-templateselector-container-elevated-box-shadow': string;
  /** Позиция приподнятого контейнера снизу */
  '--chotto-templateselector-container-elevated-bottom': string;
  /** Позиция приподнятого контейнера справа */
  '--chotto-templateselector-container-elevated-right': string;

  // Layout
  /** Максимальная высота макета */
  '--chotto-templateselector-layout-max-height': string;
  /** Отображение макета */
  '--chotto-templateselector-layout-display': string;
  /** Размер коробки макета */
  '--chotto-templateselector-layout-box-sizing': string;
  /** Шаблон колонок сетки макета */
  '--chotto-templateselector-layout-grid-template-columns': string;
  /** Шаблон строк сетки макета */
  '--chotto-templateselector-layout-grid-template-rows': string;
  /** Промежуток между колонками макета */
  '--chotto-templateselector-layout-column-gap': string;

  // First column
  /** Отображение первой колонки */
  '--chotto-templateselector-first-col-display': string;
  /** Колонка сетки первой колонки */
  '--chotto-templateselector-first-col-grid-column': string;
  /** Строка сетки первой колонки */
  '--chotto-templateselector-first-col-grid-row': string;
  /** Шаблон строк сетки первой колонки */
  '--chotto-templateselector-first-col-grid-template-rows': string;

  // Second column
  /** Отображение второй колонки */
  '--chotto-templateselector-second-col-display': string;
  /** Колонка сетки второй колонки */
  '--chotto-templateselector-second-col-grid-column': string;
  /** Строка сетки второй колонки */
  '--chotto-templateselector-second-col-grid-row': string;
  /** Шаблон строк сетки второй колонки */
  '--chotto-templateselector-second-col-grid-template-rows': string;

  // Third column
  /** Отображение третьей колонки */
  '--chotto-templateselector-third-col-display': string;
  /** Колонка сетки третьей колонки */
  '--chotto-templateselector-third-col-grid-column': string;
  /** Строка сетки третьей колонки */
  '--chotto-templateselector-third-col-grid-row': string;
  /** Шаблон строк сетки третьей колонки */
  '--chotto-templateselector-third-col-grid-template-rows': string;

  // Button close
  /** Размер иконок кнопок */
  '--chotto-templateselector-button-icon-size': string;
  /** Активный цвет кнопок */
  '--chotto-templateselector-button-color-active': string;
  /** Строка сетки кнопки закрытия */
  '--chotto-templateselector-button-close-grid-row': string;
  /** Выравнивание кнопки закрытия */
  '--chotto-templateselector-button-close-align-self': string;
  /** Отображение кнопки закрытия */
  '--chotto-templateselector-button-close-display': string;
  /** Цвет фона кнопки закрытия */
  '--chotto-templateselector-button-close-background-color': string;
  /** Граница кнопки закрытия */
  '--chotto-templateselector-button-close-border': string;
  /** Ширина кнопки закрытия */
  '--chotto-templateselector-button-close-width': string;
  /** Курсор кнопки закрытия */
  '--chotto-templateselector-button-close-cursor': string;
  /** Отступы кнопки закрытия */
  '--chotto-templateselector-button-close-margin': string;

  // List groups
  /** Строка сетки списка групп */
  '--chotto-templateselector-list-groups-grid-row': string;
  /** Переполнение по вертикали списка групп */
  '--chotto-templateselector-list-groups-overflow-y': string;
  /** Граница списка групп */
  '--chotto-templateselector-list-groups-border': string;
  /** Отступы списка групп */
  '--chotto-templateselector-list-groups-padding': string;
  /** Отступы списка групп */
  '--chotto-templateselector-list-groups-margin': string;
  /** Цвет фона скроллбара */
  '--chotto-templateselector-scrollbar-bg': string;
  /** Цвет ползунка скроллбара */
  '--chotto-templateselector-scrollbar-thumb-bg': string;
  /** Ширина webkit скроллбара списка групп */
  '--chotto-templateselector-list-groups-webkit-scrollbar-width': string;
  /** Радиус границы ползунка webkit скроллбара списка групп */
  '--chotto-templateselector-list-groups-webkit-scrollbar-thumb-border-radius': string;
  /** Радиус границы дорожки webkit скроллбара списка групп */
  '--chotto-templateselector-list-groups-webkit-scrollbar-track-border-radius': string;

  // List templates
  /** Отступы списка шаблонов */
  '--chotto-templateselector-list-templates-padding': string;
  /** Отступы списка шаблонов */
  '--chotto-templateselector-list-templates-margin': string;

  // Templates
  /** Строка сетки шаблонов */
  '--chotto-templateselector-templates-grid-row': string;
  /** Граница шаблонов */
  '--chotto-templateselector-templates-border': string;
  /** Переполнение по вертикали шаблонов */
  '--chotto-templateselector-templates-overflow-y': string;
  /** Ширина webkit скроллбара шаблонов */
  '--chotto-templateselector-templates-webkit-scrollbar-width': string;
  /** Радиус границы ползунка webkit скроллбара шаблонов */
  '--chotto-templateselector-templates-webkit-scrollbar-thumb-border-radius': string;
  /** Радиус границы дорожки webkit скроллбара шаблонов */
  '--chotto-templateselector-templates-webkit-scrollbar-track-border-radius': string;

  // Items
  /** Переход элемента */
  '--chotto-templateselector-item-transition': string;
  /** Граница снизу элемента */
  '--chotto-templateselector-item-border-bottom': string;
  /** Цвет фона элемента при ховере */
  '--chotto-templateselector-item-background-color-hover': string;
  /** Цвет фона элемента в фокусе/selected */
  '--chotto-templateselector-item-background-color-focus': string;

  // Item group
  /** Отображение элемента группы */
  '--chotto-templateselector-item-group-display': string;
  /** Выравнивание по поперечной оси элемента группы */
  '--chotto-templateselector-item-group-align-items': string;

  // Item template
  /** Курсор элемента шаблона */
  '--chotto-templateselector-item-template-cursor': string;
  /** Отступы элемента шаблона */
  '--chotto-templateselector-item-template-padding': string;

  // Label group
  /** Отступы метки группы */
  '--chotto-templateselector-label-group-padding': string;
  /** Отображение метки группы */
  '--chotto-templateselector-label-group-display': string;
  /** Выравнивание по поперечной оси метки группы */
  '--chotto-templateselector-label-group-align-items': string;
  /** Промежуток между колонками метки группы */
  '--chotto-templateselector-label-group-column-gap': string;
  /** Ширина метки группы */
  '--chotto-templateselector-label-group-width': string;
  /** Высота метки группы */
  '--chotto-templateselector-label-group-height': string;
  /** Курсор метки группы */
  '--chotto-templateselector-label-group-cursor': string;
  /** Ширина изображения метки группы */
  '--chotto-templateselector-label-group-img-width': string;
  /** Высота изображения метки группы */
  '--chotto-templateselector-label-group-img-height': string;
  /** Отображение ввода метки группы */
  '--chotto-templateselector-label-group-input-display': string;
  /** Высота строки span метки группы */
  '--chotto-templateselector-label-group-span-line-height': string;

  // Item title
  /** Отступ снизу заголовка элемента */
  '--chotto-templateselector-item-title-margin-bottom': string;
  /** Жирность заголовков */
  '--chotto-templateselector-title-font-weight': string;
  /** Размер шрифта заголовков */
  '--chotto-templateselector-title-font-size': string;

  // Item text
  /** Переполнение текста элемента */
  '--chotto-templateselector-item-text-overflow': string;
  /** Обрезка текста элемента */
  '--chotto-templateselector-item-text-text-overflow': string;
  /** Отображение текста элемента */
  '--chotto-templateselector-item-text-display': string;
  /** Количество строк webkit текста элемента */
  '--chotto-templateselector-item-text-webkit-line-clamp': string;
  /** Количество строк текста элемента */
  '--chotto-templateselector-item-text-line-clamp': string;
  /** Ориентация webkit коробки текста элемента */
  '--chotto-templateselector-item-text-webkit-box-orient': string;
  /** Размер основного текста */
  '--chotto-templateselector-text-font-size': string;

  // Searching container
  /** Строка сетки контейнера поиска */
  '--chotto-templateselector-searching-container-grid-row': string;
  /** Ширина контейнера поиска */
  '--chotto-templateselector-searching-container-width': string;
  /** Отступ снизу контейнера поиска */
  '--chotto-templateselector-searching-container-margin-bottom': string;
  /** Отступ справа контейнера поиска */
  '--chotto-templateselector-searching-container-margin-right': string;

  // Searching input
  /** Цвет фона ввода поиска */
  '--chotto-templateselector-searching-input-background-color': string;
  /** Ширина ввода поиска */
  '--chotto-templateselector-searching-input-width': string;
  /** Переход ввода поиска */
  '--chotto-templateselector-searching-input-transition': string;
  /** Размер коробки ввода поиска */
  '--chotto-templateselector-searching-input-box-sizing': string;
  /** Контур фокуса ввода поиска */
  '--chotto-templateselector-searching-input-focus-outline': string;
  /** Основной цвет текста */
  '--chotto-templateselector-primary-text-color': string;
  /** Вторичный цвет текста */
  '--chotto-templateselector-secondary-text-color': string;

  // Preview container
  /** Строка сетки контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-grid-row': string;
  /** Граница контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-border': string;
  /** Максимальная высота контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-max-height': string;
  /** Переполнение по вертикали контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-overflow-y': string;
  /** Ширина webkit скроллбара контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-webkit-scrollbar-width': string;
  /** Радиус границы ползунка webkit скроллбара контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-webkit-scrollbar-thumb-border-radius': string;
  /** Радиус границы дорожки webkit скроллбара контейнера предварительного просмотра */
  '--chotto-templateselector-preview-container-webkit-scrollbar-track-border-radius': string;
  /** Вторичный фон */
  '--chotto-templateselector-secondary-color': string;

  // Preview
  /** Высота предварительного просмотра */
  '--chotto-templateselector-preview-height': string;
  /** Размер коробки предварительного просмотра */
  '--chotto-templateselector-preview-box-sizing': string;
  /** Отступы предварительного просмотра */
  '--chotto-templateselector-preview-padding': string;

  // Preview wrapper
  /** Отступы обертки предварительного просмотра */
  '--chotto-templateselector-preview-wrapper-padding': string;
  /** Радиус границы обертки предварительного просмотра */
  '--chotto-templateselector-preview-wrapper-border-radius': string;
  /** Максимальная ширина обертки предварительного просмотра */
  '--chotto-templateselector-preview-wrapper-max-width': string;
  /** Отступ снизу обертки предварительного просмотра */
  '--chotto-templateselector-preview-wrapper-margin-bottom': string;
  /** Фон левого сообщения (для превью) */
  '--chotto-templateselector-message-left-bg': string;

  // Plug
  /** Ширина заглушки */
  '--chotto-templateselector-plug-width': string;
  /** Высота заглушки */
  '--chotto-templateselector-plug-height': string;
  /** Отображение заглушки */
  '--chotto-templateselector-plug-display': string;
  /** Выравнивание по главной оси заглушки */
  '--chotto-templateselector-plug-justify-content': string;
  /** Выравнивание по поперечной оси заглушки */
  '--chotto-templateselector-plug-align-items': string;
  /** Отступы заглушки */
  '--chotto-templateselector-plug-padding': string;
  /** Отступы заглушки */
  '--chotto-templateselector-plug-margin': string;
  /** Высота строки заглушки */
  '--chotto-templateselector-plug-line-height': string;

  // Preview text
  /** Перенос слов текста предварительного просмотра */
  '--chotto-templateselector-preview-text-word-break': string;
  /** Перенос пробелов текста предварительного просмотра */
  '--chotto-templateselector-preview-text-white-space': string;

  // Preview time
  /** Ширина времени предварительного просмотра */
  '--chotto-templateselector-preview-time-width': string;
  /** Отступ слева времени предварительного просмотра */
  '--chotto-templateselector-preview-time-margin-left': string;
  /** Размер дополнительного текста (time и т.п.) */
  '--chotto-templateselector-additional-text-font-size': string;

  // Button paste
  /** Строка сетки кнопки вставки */
  '--chotto-templateselector-button-paste-grid-row': string;
  /** Отображение кнопки вставки */
  '--chotto-templateselector-button-paste-display': string;
  /** Ширина кнопки вставки */
  '--chotto-templateselector-button-paste-width': string;
  /** Выравнивание кнопки вставки */
  '--chotto-templateselector-button-paste-justify-self': string;
  /** Отступы кнопки вставки */
  '--chotto-templateselector-button-paste-margin': string;
  /** Граница кнопки вставки */
  '--chotto-templateselector-button-paste-border': string;
  /** Отступы кнопки вставки */
  '--chotto-templateselector-button-paste-padding': string;
  /** Радиус границы кнопки вставки */
  '--chotto-templateselector-button-paste-border-radius': string;
  /** Курсор кнопки вставки */
  '--chotto-templateselector-button-paste-cursor': string;
  /** Активный цвет кнопки-вставки */
  '--chotto-templateselector-action-button-color-active': string;
  /** Ховер цвет кнопки-вставки */
  '--chotto-templateselector-action-button-color-hover': string;

  // Input styling
  /** Размер шрифта поля ввода */
  '--chotto-templateselector-input-font-size': string;
  /** Цвет границы поля ввода при ховере */
  '--chotto-templateselector-input-border-color-hover': string;
  /** Цвет границы поля ввода при фокусе */
  '--chotto-templateselector-input-border-color-focus': string;
  /** Отступы поля ввода */
  '--chotto-templateselector-input-padding': string;
  /** Радиус границы поля ввода */
  '--chotto-templateselector-input-border-radius': string;
  /** Цвет границы поля ввода */
  '--chotto-templateselector-input-border-color': string;

  // Responsive layout
  /** Шаблон колонок сетки адаптивного макета */
  '--chotto-templateselector-layout-responsive-grid-template-columns': string;
  /** Колонка сетки первой колонки адаптивного макета */
  '--chotto-templateselector-first-col-responsive-grid-column': string;
  /** Колонка сетки второй колонки адаптивного макета */
  '--chotto-templateselector-second-col-responsive-grid-column': string;
  /** Колонка сетки третьей колонки адаптивного макета */
  '--chotto-templateselector-third-col-responsive-grid-column': string;
}
