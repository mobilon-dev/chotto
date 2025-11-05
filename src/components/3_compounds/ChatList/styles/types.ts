/**
 * CSS переменные для компонента ChatList
 */
export interface ChatListThemeCSSVariables {
  // Main container
  /** Цвет фона списка чатов */
  '--chotto-chatlist-background-color': string;
  /** Коэффициент роста списка чатов */
  '--chotto-chatlist-flex-grow': string;
  /** Отображение списка чатов */
  '--chotto-chatlist-display': string;
  /** Выравнивание элементов списка чатов */
  '--chotto-chatlist-align-items': string;
  /** Направление флекс-контейнера списка чатов */
  '--chotto-chatlist-flex-direction': string;
  /** Высота списка чатов */
  '--chotto-chatlist-height': string;

  // Filter
  /** Отступы фильтра */
  '--chotto-chatlist-filter-margin': string;

  // Items container
  /** Отображение контейнера элементов */
  '--chotto-chatlist-items-display': string;
  /** Поведение прокрутки контейнера элементов */
  '--chotto-chatlist-items-scroll-behavior': string;
  /** Высота контейнера элементов */
  '--chotto-chatlist-items-height': string;
  /** Переполнение по вертикали контейнера элементов */
  '--chotto-chatlist-items-overflow-y': string;
  /** Переполнение по горизонтали контейнера элементов */
  '--chotto-chatlist-items-overflow-x': string;
  /** Отступы контейнера элементов */
  '--chotto-chatlist-items-padding': string;

  // Scrollbar
  /** Ширина полосы прокрутки */
  '--chotto-chatlist-scrollbar-width': string;
  /** Цвет фона полосы прокрутки */
  '--chotto-chatlist-scrollbar-bg': string;
  /** Радиус границы ползунка полосы прокрутки */
  '--chotto-chatlist-scrollbar-thumb-radius': string;
  /** Цвет фона ползунка полосы прокрутки */
  '--chotto-chatlist-scrollbar-thumb-bg': string;
  /** Радиус границы дорожки полосы прокрутки */
  '--chotto-chatlist-scrollbar-track-radius': string;

  // Fixed items
  /** Z-index зафиксированных элементов */
  '--chotto-chatlist-fixed-z-index': string;
  /** Отображение зафиксированных элементов */
  '--chotto-chatlist-fixed-display': string;
  /** Позиционирование зафиксированных элементов */
  '--chotto-chatlist-fixed-position': string;
  /** Цвет фона зафиксированных элементов */
  '--chotto-chatlist-fixed-background-color': string;
  /** Позиция зафиксированных элементов сверху */
  '--chotto-chatlist-fixed-top': string;
  /** Позиция зафиксированных элементов снизу */
  '--chotto-chatlist-fixed-bottom': string;

  // Title container
  /** Позиционирование контейнера заголовка */
  '--chotto-chatlist-title-container-position': string;
  /** Отображение контейнера заголовка */
  '--chotto-chatlist-title-container-display': string;
  /** Выравнивание по главной оси контейнера заголовка */
  '--chotto-chatlist-title-container-justify': string;
  /** Выравнивание по поперечной оси контейнера заголовка */
  '--chotto-chatlist-title-container-align': string;
  /** Промежуток между колонками заголовка */
  '--chotto-chatlist-title-column-gap': string;
  /** Отступы контейнера заголовка */
  '--chotto-chatlist-title-container-padding': string;

  // Title
  /** Семейство шрифта заголовка */
  '--chotto-chatlist-title-font-family': string;
  /** Размер шрифта заголовка */
  '--chotto-chatlist-title-font-size': string;
  /** Толщина шрифта заголовка */
  '--chotto-chatlist-title-font-weight': string;
  /** Цвет текста заголовка */
  '--chotto-chatlist-title-text-color': string;

  // Context menu
  /** Позиционирование контекстного меню */
  '--chotto-chatlist-context-menu-position': string;
  /** Позиция контекстного меню сверху */
  '--chotto-chatlist-context-menu-top': string;
  /** Позиция контекстного меню справа */
  '--chotto-chatlist-context-menu-right': string;

  // Button up
  /** Позиционирование кнопки "вверх" */
  '--chotto-chatlist-button-position': string;
  /** Z-index кнопки "вверх" */
  '--chotto-chatlist-button-z-index': string;
  /** Позиция кнопки "вверх" снизу */
  '--chotto-chatlist-button-bottom': string;
  /** Позиция кнопки "вверх" справа */
  '--chotto-chatlist-button-right': string;
  /** Отступ слева кнопки "вверх" */
  '--chotto-chatlist-button-margin-left': string;
  /** Граница кнопки "вверх" */
  '--chotto-chatlist-button-border': string;
  /** Минимальный размер кнопки "вверх" */
  '--chotto-chatlist-button-min': string;
  /** Радиус границы кнопки "вверх" */
  '--chotto-chatlist-button-border-radius': string;
  /** Отображение кнопки "вверх" */
  '--chotto-chatlist-button-display': string;
  /** Выравнивание по главной оси кнопки "вверх" */
  '--chotto-chatlist-button-justify': string;
  /** Выравнивание по поперечной оси кнопки "вверх" */
  '--chotto-chatlist-button-align': string;
  /** Курсор кнопки "вверх" */
  '--chotto-chatlist-button-cursor': string;
  /** Цвет фона кнопки "вверх" */
  '--chotto-chatlist-button-background-color': string;
  /** Размер иконки кнопки */
  '--chotto-chatlist-button-icon-size': string;
  /** Цвет активного состояния иконки */
  '--chotto-chatlist-button-color-active': string;

  // Menu animations
  /** Длительность входа меню */
  '--chotto-chatlist-menu-enter-duration': string;
  /** Длительность выхода меню */
  '--chotto-chatlist-menu-leave-duration': string;
  /** Масштаб меню */
  '--chotto-chatlist-menu-scale': string;
  /** Переход входа меню */
  '--chotto-chatlist-menu-enter-transition': string;
  /** Переход выхода меню */
  '--chotto-chatlist-menu-leave-transition': string;
  /** Трансформация меню */
  '--chotto-chatlist-menu-transform': string;
  /** Прозрачность меню */
  '--chotto-chatlist-menu-opacity': string;

  // Search indicator
  /** Отступы индикатора поиска */
  '--chotto-chatlist-search-indicator-margin': string;
  /** Отступы индикатора поиска */
  '--chotto-chatlist-search-indicator-padding': string;
  /** Цвет фона индикатора поиска */
  '--chotto-chatlist-search-indicator-bg': string;
  /** Радиус границы индикатора поиска */
  '--chotto-chatlist-search-indicator-radius': string;
  /** Граница индикатора поиска */
  '--chotto-chatlist-search-indicator-border': string;
  /** Отображение контента поиска */
  '--chotto-chatlist-search-content-display': string;
  /** Выравнивание элементов контента поиска */
  '--chotto-chatlist-search-content-align-items': string;
  /** Промежуток между элементами контента поиска */
  '--chotto-chatlist-search-content-gap': string;
  /** Цвет иконки поиска */
  '--chotto-chatlist-search-icon-color': string;
  /** Размер иконки поиска */
  '--chotto-chatlist-search-icon-font-size': string;
  /** Цвет текста поиска */
  '--chotto-chatlist-search-text-color': string;
  /** Размер текста поиска */
  '--chotto-chatlist-search-text-font-size': string;
  /** Цвет прогресса поиска */
  '--chotto-chatlist-search-progress-color': string;
  /** Толщина шрифта запроса поиска */
  '--chotto-chatlist-search-query-font-weight': string;
  /** Цвет статистики поиска */
  '--chotto-chatlist-search-stats-color': string;
  /** Размер текста статистики поиска */
  '--chotto-chatlist-search-stats-font-size': string;
  /** Толщина шрифта статистики поиска */
  '--chotto-chatlist-search-stats-font-weight': string;
  /** Цвет кнопки очистки поиска */
  '--chotto-chatlist-search-clear-color': string;
  /** Размер текста кнопки очистки поиска */
  '--chotto-chatlist-search-clear-font-size': string;
  /** Отступы кнопки очистки поиска */
  '--chotto-chatlist-search-clear-padding': string;
  /** Радиус границы кнопки очистки поиска */
  '--chotto-chatlist-search-clear-border-radius': string;
  /** Переход кнопки очистки поиска */
  '--chotto-chatlist-search-clear-transition': string;
  /** Цвет кнопки очистки поиска при наведении */
  '--chotto-chatlist-search-clear-hover-color': string;
  /** Цвет фона кнопки очистки поиска при наведении */
  '--chotto-chatlist-search-clear-hover-bg': string;
}
