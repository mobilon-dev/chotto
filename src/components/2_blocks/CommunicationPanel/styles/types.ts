/**
 * CSS переменные для компонента CommunicationPanel
 */
export interface CommunicationPanelThemeCSSVariables {
  // Main panel
  /** Позиционирование основной панели */
  '--chotto-communicationpanel-main-position': string;
  /** Отображение основной панели */
  '--chotto-communicationpanel-main-display': string;

  // Channels panel
  /** Отображение панели каналов */
  '--chotto-communicationpanel-channels-display': string;
  /** Позиционирование панели каналов */
  '--chotto-communicationpanel-channels-position': string;
  /** Цвет фона панели каналов */
  '--chotto-communicationpanel-background': string;
  /** Ширина границы панели каналов */
  '--chotto-communicationpanel-border-width': string;
  /** Радиус границы панели каналов */
  '--chotto-communicationpanel-border-radius': string;
  /** Цвет границы панели каналов */
  '--chotto-communicationpanel-border-color': string;
  /** Отступы панели каналов */
  '--chotto-communicationpanel-padding': string;
  /** Промежуток между элементами панели каналов */
  '--chotto-communicationpanel-gap': string;
  /** Высота панели каналов */
  '--chotto-communicationpanel-height': string;
  /** Тень панели каналов */
  '--chotto-communicationpanel-box-shadow': string;

  // Channel button
  /** Отображение кнопки канала */
  '--chotto-communicationpanel-btn-display': string;
  /** Выравнивание по поперечной оси кнопки канала */
  '--chotto-communicationpanel-btn-align-items': string;
  /** Выравнивание по главной оси кнопки канала */
  '--chotto-communicationpanel-btn-justify-content': string;
  /** Отступы кнопки канала */
  '--chotto-communicationpanel-btn-padding': string;
  /** Граница кнопки канала */
  '--chotto-communicationpanel-btn-border': string;
  /** Цвет фона кнопки канала */
  '--chotto-communicationpanel-btn-background': string;
  /** Радиус границы кнопки канала */
  '--chotto-communicationpanel-btn-border-radius': string;
  /** Курсор кнопки канала */
  '--chotto-communicationpanel-btn-cursor': string;
  /** Переход кнопки канала */
  '--chotto-communicationpanel-btn-transition': string;
  /** Позиционирование кнопки канала */
  '--chotto-communicationpanel-btn-position': string;
  /** Ширина кнопки канала */
  '--chotto-communicationpanel-btn-width': string;
  /** Высота кнопки канала */
  '--chotto-communicationpanel-btn-height': string;
  /** Цвет кнопки канала */
  '--chotto-communicationpanel-btn-color': string;
  /** Размер шрифта кнопки канала */
  '--chotto-communicationpanel-btn-font-size': string;
  /** Жирность шрифта кнопки канала */
  '--chotto-communicationpanel-btn-font-weight': string;
  /** Цвет фона кнопки канала при наведении */
  '--chotto-communicationpanel-btn-hover-background': string;
  /** Цвет кнопки канала при наведении */
  '--chotto-communicationpanel-btn-hover-color': string;
  /** Трансформация кнопки канала при наведении */
  '--chotto-communicationpanel-btn-hover-transform': string;
  /** Цвет активной кнопки канала */
  '--chotto-communicationpanel-btn-active-color': string;
  /** Цвет фона активной кнопки канала */
  '--chotto-communicationpanel-btn-active-background': string;
  /** Жирность шрифта активной кнопки канала */
  '--chotto-communicationpanel-btn-active-font-weight': string;
  /** Содержимое разделителя кнопки канала */
  '--chotto-communicationpanel-btn-divider-content': string;
  /** Позиционирование разделителя кнопки канала */
  '--chotto-communicationpanel-btn-divider-position': string;
  /** Позиция разделителя кнопки канала справа */
  '--chotto-communicationpanel-btn-divider-right': string;
  /** Позиция разделителя кнопки канала сверху */
  '--chotto-communicationpanel-btn-divider-top': string;
  /** Позиция разделителя кнопки канала снизу */
  '--chotto-communicationpanel-btn-divider-bottom': string;
  /** Ширина разделителя кнопки канала */
  '--chotto-communicationpanel-btn-divider-width': string;
  /** Цвет разделителя кнопки канала */
  '--chotto-communicationpanel-btn-divider-color': string;
  /** Радиус границы разделителя кнопки канала */
  '--chotto-communicationpanel-btn-divider-border-radius': string;
  /** Радиус границы первой кнопки канала */
  '--chotto-communicationpanel-btn-first-border-radius': string;
  /** Радиус границы последней кнопки канала */
  '--chotto-communicationpanel-btn-last-border-radius': string;

  // Active indicator
  /** Позиционирование индикатора активности */
  '--chotto-communicationpanel-active-indicator-position': string;
  /** Позиция индикатора активности снизу */
  '--chotto-communicationpanel-active-indicator-bottom': string;
  /** Позиция индикатора активности слева */
  '--chotto-communicationpanel-active-indicator-left': string;
  /** Трансформация индикатора активности */
  '--chotto-communicationpanel-active-indicator-transform': string;
  /** Ширина индикатора активности */
  '--chotto-communicationpanel-active-indicator-width': string;
  /** Высота индикатора активности */
  '--chotto-communicationpanel-active-indicator-height': string;
  /** Цвет фона индикатора активности */
  '--chotto-communicationpanel-active-indicator-background': string;
  /** Радиус границы индикатора активности */
  '--chotto-communicationpanel-active-indicator-border-radius': string;
  /** Прозрачность индикатора активности */
  '--chotto-communicationpanel-active-indicator-opacity': string;
  /** Переход индикатора активности */
  '--chotto-communicationpanel-active-indicator-transition': string;

  // Channel icon
  /** Отображение иконки канала */
  '--chotto-communicationpanel-icon-display': string;
  /** Выравнивание по поперечной оси иконки канала */
  '--chotto-communicationpanel-icon-align-items': string;
  /** Выравнивание по главной оси иконки канала */
  '--chotto-communicationpanel-icon-justify-content': string;
  /** Ширина иконки канала */
  '--chotto-communicationpanel-icon-width': string;
  /** Высота иконки канала */
  '--chotto-communicationpanel-icon-height': string;
  /** Цвет иконки канала */
  '--chotto-communicationpanel-icon-color': string;
  /** Размер шрифта иконки канала */
  '--chotto-communicationpanel-icon-font-size': string;
  /** Переход иконки канала */
  '--chotto-communicationpanel-icon-transition': string;

  // Channel icon small
  /** Отображение маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-display': string;
  /** Выравнивание по поперечной оси маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-align-items': string;
  /** Выравнивание по главной оси маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-justify-content': string;
  /** Ширина маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-width': string;
  /** Высота маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-height': string;
  /** Отступ слева маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-margin-left': string;
  /** Цвет маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-color': string;
  /** Размер шрифта маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-font-size': string;
  /** Сжатие маленькой иконки канала */
  '--chotto-communicationpanel-icon-small-flex-shrink': string;

  // Attributes menu
  /** Позиционирование меню атрибутов */
  '--chotto-communicationpanel-menu-position': string;
  /** Позиция меню атрибутов сверху */
  '--chotto-communicationpanel-menu-top': string;
  /** Позиция меню атрибутов слева */
  '--chotto-communicationpanel-menu-left': string;
  /** Позиция меню атрибутов справа */
  '--chotto-communicationpanel-menu-right': string;
  /** Цвет фона меню атрибутов */
  '--chotto-communicationpanel-menu-background': string;
  /** Граница меню атрибутов */
  '--chotto-communicationpanel-menu-border': string;
  /** Радиус границы меню атрибутов */
  '--chotto-communicationpanel-menu-border-radius': string;
  /** Тень меню атрибутов */
  '--chotto-communicationpanel-menu-box-shadow': string;
  /** Отступы меню атрибутов */
  '--chotto-communicationpanel-menu-padding': string;
  /** Z-index меню атрибутов */
  '--chotto-communicationpanel-menu-z-index': string;
  /** Максимальная высота меню атрибутов */
  '--chotto-communicationpanel-menu-max-height': string;
  /** Минимальная ширина меню атрибутов */
  '--chotto-communicationpanel-menu-min-width': string;
  /** Промежуток между элементами меню атрибутов */
  '--chotto-communicationpanel-menu-gap': string;
  /** Прозрачность меню атрибутов */
  '--chotto-communicationpanel-menu-opacity': string;
  /** Трансформация меню атрибутов */
  '--chotto-communicationpanel-menu-transform': string;
  /** Переход меню атрибутов */
  '--chotto-communicationpanel-menu-transition': string;

  // Menu header
  /** Отступы заголовка меню */
  '--chotto-communicationpanel-menu-header-padding': string;
  /** Размер шрифта заголовка меню */
  '--chotto-communicationpanel-menu-header-font-size': string;
  /** Цвет заголовка меню */
  '--chotto-communicationpanel-menu-header-color': string;
  /** Жирность шрифта заголовка меню */
  '--chotto-communicationpanel-menu-header-font-weight': string;
  /** Межбуквенное расстояние заголовка меню */
  '--chotto-communicationpanel-menu-header-letter-spacing': string;
  /** Трансформация текста заголовка меню */
  '--chotto-communicationpanel-menu-header-text-transform': string;
  /** Граница снизу заголовка меню */
  '--chotto-communicationpanel-menu-header-border-bottom': string;
  /** Отступ снизу заголовка меню */
  '--chotto-communicationpanel-menu-header-margin-bottom': string;

  // Attribute item
  /** Отображение элемента атрибута */
  '--chotto-communicationpanel-attribute-display': string;
  /** Выравнивание по главной оси элемента атрибута */
  '--chotto-communicationpanel-attribute-justify-content': string;
  /** Выравнивание по поперечной оси элемента атрибута */
  '--chotto-communicationpanel-attribute-align-items': string;
  /** Отступы элемента атрибута */
  '--chotto-communicationpanel-attribute-padding': string;
  /** Курсор элемента атрибута */
  '--chotto-communicationpanel-attribute-cursor': string;
  /** Переход элемента атрибута */
  '--chotto-communicationpanel-attribute-transition': string;
  /** Радиус границы элемента атрибута */
  '--chotto-communicationpanel-attribute-border-radius': string;
  /** Отступы элемента атрибута */
  '--chotto-communicationpanel-attribute-margin': string;
  /** Цвет фона элемента атрибута */
  '--chotto-communicationpanel-attribute-background': string;
  /** Цвет элемента атрибута */
  '--chotto-communicationpanel-attribute-color': string;
  /** Размер шрифта элемента атрибута */
  '--chotto-communicationpanel-attribute-font-size': string;
  /** Цвет фона элемента атрибута при наведении */
  '--chotto-communicationpanel-attribute-hover-background': string;
  /** Цвет элемента атрибута при наведении */
  '--chotto-communicationpanel-attribute-hover-color': string;
  /** Трансформация элемента атрибута при наведении */
  '--chotto-communicationpanel-attribute-hover-transform': string;

  // Attribute info
  /** Отображение информации атрибута */
  '--chotto-communicationpanel-attribute-info-display': string;
  /** Направление флекс-контейнера информации атрибута */
  '--chotto-communicationpanel-attribute-info-flex-direction': string;
  /** Промежуток между элементами информации атрибута */
  '--chotto-communicationpanel-attribute-info-gap': string;
  /** Коэффициент роста информации атрибута */
  '--chotto-communicationpanel-attribute-info-flex': string;

  // Attribute value
  /** Жирность шрифта значения атрибута */
  '--chotto-communicationpanel-attribute-value-font-weight': string;
  /** Размер шрифта значения атрибута */
  '--chotto-communicationpanel-attribute-value-font-size': string;
  /** Цвет значения атрибута */
  '--chotto-communicationpanel-attribute-value-color': string;
  /** Высота строки значения атрибута */
  '--chotto-communicationpanel-attribute-value-line-height': string;

  // Menu icon
  /** Цвет серой иконки меню */
  '--chotto-communicationpanel-menu-icon-grey-color': string;
  /** Размер шрифта серой иконки меню */
  '--chotto-communicationpanel-menu-icon-grey-font-size': string;
  /** Цвет иконки меню */
  '--chotto-communicationpanel-menu-icon-color': string;
  /** Жирность шрифта иконки меню */
  '--chotto-communicationpanel-menu-icon-font-weight': string;
  /** Отступ слева иконки меню */
  '--chotto-communicationpanel-menu-icon-margin-left': string;
  /** Отображение иконки меню */
  '--chotto-communicationpanel-menu-icon-display': string;
  /** Выравнивание по поперечной оси иконки меню */
  '--chotto-communicationpanel-menu-icon-align-items': string;
  /** Выравнивание по главной оси иконки меню */
  '--chotto-communicationpanel-menu-icon-justify-content': string;
  /** Размер шрифта иконки меню */
  '--chotto-communicationpanel-menu-icon-font-size': string;
  /** Ширина иконки меню */
  '--chotto-communicationpanel-menu-icon-width': string;
  /** Высота иконки меню */
  '--chotto-communicationpanel-menu-icon-height': string;

  // Menu arrow
  /** Ширина стрелки меню */
  '--chotto-communicationpanel-menu-arrow-width': string;
  /** Высота стрелки меню */
  '--chotto-communicationpanel-menu-arrow-height': string;
  /** Граница сверху стрелки меню */
  '--chotto-communicationpanel-menu-arrow-border-top': string;
  /** Граница справа стрелки меню */
  '--chotto-communicationpanel-menu-arrow-border-right': string;
  /** Трансформация стрелки меню */
  '--chotto-communicationpanel-menu-arrow-transform': string;
  /** Переход стрелки меню */
  '--chotto-communicationpanel-menu-arrow-transition': string;

  // Menu divider
  /** Высота разделителя меню */
  '--chotto-communicationpanel-menu-divider-height': string;
  /** Цвет фона разделителя меню */
  '--chotto-communicationpanel-menu-divider-background': string;
  /** Отступы разделителя меню */
  '--chotto-communicationpanel-menu-divider-margin': string;
  /** Радиус границы разделителя меню */
  '--chotto-communicationpanel-menu-divider-border-radius': string;
  /** Прозрачность разделителя меню */
  '--chotto-communicationpanel-menu-divider-opacity': string;

  // Sub menu
  /** Позиционирование подменю */
  '--chotto-communicationpanel-submenu-position': string;
  /** Позиция подменю сверху */
  '--chotto-communicationpanel-submenu-top': string;
  /** Позиция подменю справа */
  '--chotto-communicationpanel-submenu-right': string;
  /** Позиция подменю слева */
  '--chotto-communicationpanel-submenu-left': string;
  /** Цвет фона подменю */
  '--chotto-communicationpanel-submenu-background': string;
  /** Граница подменю */
  '--chotto-communicationpanel-submenu-border': string;
  /** Радиус границы подменю */
  '--chotto-communicationpanel-submenu-border-radius': string;
  /** Тень подменю */
  '--chotto-communicationpanel-submenu-box-shadow': string;
  /** Отступы подменю */
  '--chotto-communicationpanel-submenu-padding': string;
  /** Минимальная ширина подменю */
  '--chotto-communicationpanel-submenu-min-width': string;
  /** Максимальная ширина подменю */
  '--chotto-communicationpanel-submenu-max-width': string;
  /** Z-index подменю */
  '--chotto-communicationpanel-submenu-z-index': string;
  /** Отображение подменю */
  '--chotto-communicationpanel-submenu-display': string;
  /** Направление флекс-контейнера подменю */
  '--chotto-communicationpanel-submenu-flex-direction': string;
  /** Промежуток между элементами подменю */
  '--chotto-communicationpanel-submenu-gap': string;
  /** Прозрачность подменю */
  '--chotto-communicationpanel-submenu-opacity': string;
  /** Трансформация подменю */
  '--chotto-communicationpanel-submenu-transform': string;
  /** Переход подменю */
  '--chotto-communicationpanel-submenu-transition': string;

  // Sub menu header
  /** Отступы заголовка подменю */
  '--chotto-communicationpanel-submenu-header-padding': string;
  /** Размер шрифта заголовка подменю */
  '--chotto-communicationpanel-submenu-header-font-size': string;
  /** Цвет заголовка подменю */
  '--chotto-communicationpanel-submenu-header-color': string;
  /** Жирность шрифта заголовка подменю */
  '--chotto-communicationpanel-submenu-header-font-weight': string;
  /** Межбуквенное расстояние заголовка подменю */
  '--chotto-communicationpanel-submenu-header-letter-spacing': string;
  /** Отступ снизу заголовка подменю */
  '--chotto-communicationpanel-submenu-header-margin-bottom': string;
  /** Трансформация текста заголовка подменю */
  '--chotto-communicationpanel-submenu-header-text-transform': string;
  /** Граница снизу заголовка подменю */
  '--chotto-communicationpanel-submenu-header-border-bottom': string;

  // Sub menu item
  /** Отображение элемента подменю */
  '--chotto-communicationpanel-submenu-item-display': string;
  /** Выравнивание по поперечной оси элемента подменю */
  '--chotto-communicationpanel-submenu-item-align-items': string;
  /** Выравнивание по главной оси элемента подменю */
  '--chotto-communicationpanel-submenu-item-justify-content': string;
  /** Отступы элемента подменю */
  '--chotto-communicationpanel-submenu-item-padding': string;
  /** Курсор элемента подменю */
  '--chotto-communicationpanel-submenu-item-cursor': string;
  /** Переход элемента подменю */
  '--chotto-communicationpanel-submenu-item-transition': string;
  /** Радиус границы элемента подменю */
  '--chotto-communicationpanel-submenu-item-border-radius': string;
  /** Промежуток между элементами подменю */
  '--chotto-communicationpanel-submenu-item-gap': string;
  /** Цвет фона элемента подменю */
  '--chotto-communicationpanel-submenu-item-background': string;
  /** Цвет элемента подменю */
  '--chotto-communicationpanel-submenu-item-color': string;
  /** Размер шрифта элемента подменю */
  '--chotto-communicationpanel-submenu-item-font-size': string;
  /** Отступы элемента подменю */
  '--chotto-communicationpanel-submenu-item-margin': string;
  /** Цвет фона элемента подменю при наведении */
  '--chotto-communicationpanel-submenu-item-hover-background': string;
  /** Цвет элемента подменю при наведении */
  '--chotto-communicationpanel-submenu-item-hover-color': string;
  /** Трансформация элемента подменю при наведении */
  '--chotto-communicationpanel-submenu-item-hover-transform': string;

  // Sub menu icon
  /** Отображение иконки подменю */
  '--chotto-communicationpanel-submenu-icon-display': string;
  /** Выравнивание по поперечной оси иконки подменю */
  '--chotto-communicationpanel-submenu-icon-align-items': string;
  /** Выравнивание по главной оси иконки подменю */
  '--chotto-communicationpanel-submenu-icon-justify-content': string;
  /** Ширина иконки подменю */
  '--chotto-communicationpanel-submenu-icon-width': string;
  /** Высота иконки подменю */
  '--chotto-communicationpanel-submenu-icon-height': string;
  /** Сжатие иконки подменю */
  '--chotto-communicationpanel-submenu-icon-flex-shrink': string;
  /** Отступ слева иконки подменю */
  '--chotto-communicationpanel-submenu-icon-margin-left': string;
  /** Цвет иконки подменю */
  '--chotto-communicationpanel-submenu-icon-color': string;
  /** Размер шрифта иконки подменю */
  '--chotto-communicationpanel-submenu-icon-font-size': string;

  // Sub menu title
  /** Размер шрифта заголовка подменю */
  '--chotto-communicationpanel-submenu-title-font-size': string;
  /** Цвет заголовка подменю */
  '--chotto-communicationpanel-submenu-title-color': string;
  /** Перенос пробелов заголовка подменю */
  '--chotto-communicationpanel-submenu-title-white-space': string;
  /** Переполнение заголовка подменю */
  '--chotto-communicationpanel-submenu-title-overflow': string;
  /** Обрезка текста заголовка подменю */
  '--chotto-communicationpanel-submenu-title-text-overflow': string;
  /** Коэффициент роста заголовка подменю */
  '--chotto-communicationpanel-submenu-title-flex-grow': string;
  /** Жирность шрифта заголовка подменю */
  '--chotto-communicationpanel-submenu-title-font-weight': string;
  /** Высота строки заголовка подменю */
  '--chotto-communicationpanel-submenu-title-line-height': string;

  // Tooltip
  /** Отображение подсказки */
  '--chotto-communicationpanel-tooltip-display': string;
  /** Ширина подсказки */
  '--chotto-communicationpanel-tooltip-width': string;
}
