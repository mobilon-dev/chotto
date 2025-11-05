/**
 * CSS переменные для компонента SideBar
 */
export interface SideBarThemeCSSVariables {
  // Container
  /** Отступы контейнера */
  '--chotto-sidebar-padding-container': string;
  /** Промежуток между строками списка */
  '--chotto-sidebar-row-gap-list': string;
  /** Граница активного изображения */
  '--chotto-sidebar-image-active-border': string;
  /** Граница сверху фиксированного списка */
  '--chotto-sidebar-list-fixed-border-top': string;
  /** Граница снизу фиксированного списка */
  '--chotto-sidebar-list-fixed-border-bottom': string;
  /** Высота счетчика уведомлений */
  '--chotto-sidebar-notification-count-height': string;
  /** Радиус наведения */
  '--chotto-sidebar-hover-radius': string;

  // Main container
  /** Отображение контейнера */
  '--chotto-sidebar-container-display': string;
  /** Направление флекс-контейнера */
  '--chotto-sidebar-container-flex-direction': string;
  /** Высота контейнера */
  '--chotto-sidebar-container-height': string;
  /** Цвет фона контейнера */
  '--chotto-sidebar-container-background-color': string;
  /** Позиционирование контейнера */
  '--chotto-sidebar-container-position': string;
  /** Переполнение контейнера */
  '--chotto-sidebar-container-overflow': string;

  // Scroll container
  /** Коэффициент роста контейнера прокрутки */
  '--chotto-sidebar-scroll-container-flex': string;
  /** Переполнение по вертикали контейнера прокрутки */
  '--chotto-sidebar-scroll-container-overflow-y': string;
  /** Переполнение по горизонтали контейнера прокрутки */
  '--chotto-sidebar-scroll-container-overflow-x': string;
  /** Отступ снизу контейнера прокрутки */
  '--chotto-sidebar-scroll-container-padding-bottom': string;
  /** Ширина скроллбара контейнера прокрутки */
  '--chotto-sidebar-scroll-container-scrollbar-width': string;
  /** Стиль переполнения MS контейнера прокрутки */
  '--chotto-sidebar-scroll-container-ms-overflow-style': string;
  /** Отображение webkit скроллбара контейнера прокрутки */
  '--chotto-sidebar-scroll-container-webkit-scrollbar-display': string;

  // List fixed
  /** Позиционирование фиксированного списка */
  '--chotto-sidebar-list-fixed-position': string;
  /** Позиция фиксированного списка сверху */
  '--chotto-sidebar-list-fixed-top': string;
  /** Z-index фиксированного списка */
  '--chotto-sidebar-list-fixed-z-index': string;
  /** Фон расширенной первой колонки лэйаута */
  '--chotto-sidebar-layout-extended-first-col-bg': string;
  /** Отступы фиксированного списка */
  '--chotto-sidebar-list-fixed-padding': string;
  /** Отступ снизу фиксированного списка */
  '--chotto-sidebar-list-fixed-margin-bottom': string;
  /** Отображение фиксированного списка */
  '--chotto-sidebar-list-fixed-display': string;
  /** Направление флекс-контейнера фиксированного списка */
  '--chotto-sidebar-list-fixed-flex-direction': string;
  /** Содержимое псевдоэлемента after фиксированного списка */
  '--chotto-sidebar-list-fixed-after-content': string;
  /** Позиционирование псевдоэлемента after фиксированного списка */
  '--chotto-sidebar-list-fixed-after-position': string;
  /** Позиция псевдоэлемента after фиксированного списка снизу */
  '--chotto-sidebar-list-fixed-after-bottom': string;
  /** Позиция псевдоэлемента after фиксированного списка слева */
  '--chotto-sidebar-list-fixed-after-left': string;
  /** Трансформация псевдоэлемента after фиксированного списка */
  '--chotto-sidebar-list-fixed-after-transform': string;
  /** Ширина псевдоэлемента after фиксированного списка */
  '--chotto-sidebar-list-fixed-after-width': string;
  /** Ширина границы снизу фиксированного списка */
  '--chotto-sidebar-list-fixed-border-bottom-width': string;
  /** Цвет границы снизу фиксированного списка */
  '--chotto-sidebar-list-fixed-border-bottom-color': string;
  /** Отображение границы снизу фиксированного списка */
  '--chotto-sidebar-list-fixed-border-bottom-display': string;

  // List
  /** Отображение списка */
  '--chotto-sidebar-list-display': string;
  /** Направление флекс-контейнера списка */
  '--chotto-sidebar-list-flex-direction': string;
  /** Отступы списка */
  '--chotto-sidebar-list-padding': string;
  /** Z-index списка */
  '--chotto-sidebar-list-z-index': string;

  // Item
  /** Позиционирование элемента */
  '--chotto-sidebar-item-position': string;
  /** Курсор элемента */
  '--chotto-sidebar-item-cursor': string;
  /** Отображение элемента */
  '--chotto-sidebar-item-display': string;
  /** Направление флекс-контейнера элемента */
  '--chotto-sidebar-item-flex-direction': string;
  /** Промежуток между строками элемента */
  '--chotto-sidebar-item-row-gap': string;
  /** Выравнивание по поперечной оси элемента */
  '--chotto-sidebar-item-align-items': string;
  /** Цвет фона элемента */
  '--chotto-sidebar-item-background-color': string;
  /** Радиус границы элемента */
  '--chotto-sidebar-item-border-radius': string;
  /** Содержимое псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-content': string;
  /** Позиционирование псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-position': string;
  /** Ширина псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-width': string;
  /** Высота псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-height': string;
  /** Цвет фона псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-background-color': string;
  /** Позиция псевдоэлемента before элемента сверху */
  '--chotto-sidebar-item-before-top': string;
  /** Позиция псевдоэлемента before элемента слева */
  '--chotto-sidebar-item-before-left': string;
  /** Трансформация псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-transform': string;
  /** Z-index псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-z-index': string;
  /** Переход псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-transition': string;
  /** События указателя псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-pointer-events': string;
  /** Цвет фона hover псевдоэлемента before элемента */
  '--chotto-sidebar-item-before-background-color-hover': string;

  // Item span
  /** Цвет текста бейджа непрочитанных */
  '--chotto-sidebar-unread-text-color': string;
  /** Цвет фона бейджа непрочитанных */
  '--chotto-sidebar-unread-background-color': string;
  /** Позиционирование span элемента */
  '--chotto-sidebar-item-span-position': string;
  /** Позиция span элемента сверху */
  '--chotto-sidebar-item-span-top': string;
  /** Позиция span элемента справа */
  '--chotto-sidebar-item-span-right': string;
  /** Отображение span элемента */
  '--chotto-sidebar-item-span-display': string;
  /** Выравнивание по главной оси span элемента */
  '--chotto-sidebar-item-span-justify-content': string;
  /** Выравнивание по поперечной оси span элемента */
  '--chotto-sidebar-item-span-align-items': string;
  /** Отступы span элемента */
  '--chotto-sidebar-item-span-padding': string;
  /** Максимальная ширина span элемента */
  '--chotto-sidebar-item-span-max-width': string;
  /** Минимальная ширина span элемента */
  '--chotto-sidebar-item-span-min-width': string;
  /** Радиус границы span элемента */
  '--chotto-sidebar-item-span-border-radius': string;
  /** Высота строки span элемента */
  '--chotto-sidebar-item-span-line-height': string;
  /** Z-index span элемента */
  '--chotto-sidebar-item-span-z-index': string;

  // Item paragraph
  /** Размер шрифта маленького текста */
  '--chotto-sidebar-small-text-font-size': string;
  /** Начертание шрифта маленького текста */
  '--chotto-sidebar-small-text-font-weight': string;
  /** Цвет заголовка/подписи элемента */
  '--chotto-sidebar-header-font-color': string;
  /** Выравнивание текста параграфа элемента */
  '--chotto-sidebar-item-p-text-align': string;
  /** Высота строки параграфа элемента */
  '--chotto-sidebar-item-p-line-height': string;

  // Image
  /** Позиционирование изображения */
  '--chotto-sidebar-image-position': string;
  /** Z-index изображения */
  '--chotto-sidebar-image-z-index': string;
  /** Радиус границы изображения */
  '--chotto-sidebar-image-border-radius': string;
  /** Обрезка изображения */
  '--chotto-sidebar-image-object-fit': string;
  /** Переход изображения */
  '--chotto-sidebar-image-transition': string;
  /** Прозрачность изображения */
  '--chotto-sidebar-image-opacity': string;
  /** Прозрачность активного изображения */
  '--chotto-sidebar-image-active-opacity': string;

  // Settings container
  /** Позиционирование контейнера настроек */
  '--chotto-sidebar-settings-container-position': string;
  /** Позиция контейнера настроек снизу */
  '--chotto-sidebar-settings-container-bottom': string;
  /** Позиция контейнера настроек слева */
  '--chotto-sidebar-settings-container-left': string;
  /** Позиция контейнера настроек справа */
  '--chotto-sidebar-settings-container-right': string;
  /** Отображение контейнера настроек */
  '--chotto-sidebar-settings-container-display': string;
  /** Выравнивание по главной оси контейнера настроек */
  '--chotto-sidebar-settings-container-justify-content': string;
  /** Z-index контейнера настроек */
  '--chotto-sidebar-settings-container-z-index': string;

  // Settings button
  /** Цвет фона кнопки настроек */
  '--chotto-sidebar-settings-btn-background': string;
  /** Граница кнопки настроек */
  '--chotto-sidebar-settings-btn-border': string;
  /** Отступы кнопки настроек */
  '--chotto-sidebar-settings-btn-padding': string;
  /** Отступы кнопки настроек */
  '--chotto-sidebar-settings-btn-margin': string;
  /** Контур кнопки настроек */
  '--chotto-sidebar-settings-btn-outline': string;
  /** Курсор кнопки настроек */
  '--chotto-sidebar-settings-btn-cursor': string;
  /** Отображение кнопки настроек */
  '--chotto-sidebar-settings-btn-display': string;
  /** Выравнивание по поперечной оси кнопки настроек */
  '--chotto-sidebar-settings-btn-align-items': string;
  /** Выравнивание по главной оси кнопки настроек */
  '--chotto-sidebar-settings-btn-justify-content': string;
  /** Радиус границы кнопки настроек */
  '--chotto-sidebar-settings-btn-border-radius': string;
  /** Переход кнопки настроек */
  '--chotto-sidebar-settings-btn-transition': string;
  /** Цвет фона hover кнопки настроек */
  '--chotto-sidebar-settings-btn-hover-background-color': string;

  // Selected bar
  /** Позиционирование выбранной полосы */
  '--chotto-sidebar-selected-bar-position': string;
  /** Ширина выбранной полосы */
  '--chotto-sidebar-selected-bar-width': string;
  /** Высота выбранной полосы */
  '--chotto-sidebar-selected-bar-height': string;
  /** Позиция выбранной полосы слева */
  '--chotto-sidebar-selected-bar-left': string;
  /** Позиция выбранной полосы сверху */
  '--chotto-sidebar-selected-bar-top': string;
  /** Радиус границы выбранной полосы */
  '--chotto-sidebar-selected-bar-border-radius': string;
  /** Цвет фона выбранной полосы */
  '--chotto-sidebar-selected-bar-background-color': string;
  /** Z-index выбранной полосы */
  '--chotto-sidebar-selected-bar-z-index': string;
  /** Переход выбранной полосы */
  '--chotto-sidebar-selected-bar-transition': string;

  // Horizontal sidebar container
  /** Направление флекс-контейнера горизонтального сайдбара */
  '--chotto-sidebar-horizontal-container-flex-direction': string;
  /** Высота контейнера горизонтального сайдбара */
  '--chotto-sidebar-horizontal-container-height': string;
  /** Отступ сверху контейнера горизонтального сайдбара */
  '--chotto-sidebar-horizontal-container-padding-top': string;
  /** Отступ снизу контейнера горизонтального сайдбара */
  '--chotto-sidebar-horizontal-container-padding-bottom': string;
  /** Цвет фона контейнера горизонтального сайдбара */
  '--chotto-sidebar-horizontal-container-background-color': string;

  // Horizontal sidebar list
  /** Направление флекс-контейнера списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-flex-direction': string;
  /** Позиционирование фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-position': string;
  /** Отступ слева фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-padding-left': string;
  /** Отступ сверху фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-padding-top': string;
  /** Граница сверху фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-border-top': string;
  /** Отступ справа фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-margin-right': string;
  /** Отступ снизу фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-margin-bottom': string;
  /** Сжатие фиксированного списка горизонтального сайдбара */
  '--chotto-sidebar-horizontal-list-fixed-flex-shrink': string;

  // Horizontal sidebar item
  /** Отображение элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-display': string;
  /** Максимальная ширина элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-max-width': string;
  /** Выравнивание текста элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-text-align': string;
  /** Ширина span элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-span-width': string;
  /** Высота span элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-span-height': string;
  /** Позиция span элемента горизонтального сайдбара слева */
  '--chotto-sidebar-horizontal-item-span-left': string;
  /** Размер шрифта параграфа элемента горизонтального сайдбара */
  '--chotto-sidebar-horizontal-item-p-font-size': string;

  // Horizontal sidebar image
  /** Ширина изображения горизонтального сайдбара */
  '--chotto-sidebar-horizontal-image-width': string;
  /** Высота изображения горизонтального сайдбара */
  '--chotto-sidebar-horizontal-image-height': string;
}
