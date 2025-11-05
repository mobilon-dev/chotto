/**
 * CSS переменные для компонента ChatPanel
 */
export interface ChatPanelThemeCSSVariables {
  // Main container
  /** Отображение панели чата */
  '--chotto-chatpanel-display': string;
  /** Выравнивание элементов панели чата */
  '--chotto-chatpanel-align-items': string;
  /** Направление флекс-контейнера панели чата */
  '--chotto-chatpanel-flex-direction': string;
  /** Высота панели чата */
  '--chotto-chatpanel-height': string;

  // Header
  /** Отображение заголовка панели чата */
  '--chotto-chatpanel-header-display': string;
  /** Промежуток между элементами заголовка */
  '--chotto-chatpanel-header-gap': string;

  // Title container
  /** Отображение контейнера заголовка */
  '--chotto-chatpanel-title-container-display': string;
  /** Выравнивание по главной оси контейнера заголовка */
  '--chotto-chatpanel-title-container-justify': string;
  /** Выравнивание по поперечной оси контейнера заголовка */
  '--chotto-chatpanel-title-container-align': string;

  // Title
  /** Межбуквенное расстояние заголовка */
  '--chotto-chatpanel-title-letter-spacing': string;
  /** Размер шрифта заголовка */
  '--chotto-chatpanel-title-font-size': string;
  /** Толщина шрифта заголовка */
  '--chotto-chatpanel-title-font-weight': string;
  /** Семейство шрифта заголовка */
  '--chotto-chatpanel-title-font-family': string;
  /** Цвет текста заголовка */
  '--chotto-chatpanel-title-text-color': string;

  // Button close
  /** Цвет фона кнопки закрытия */
  '--chotto-chatpanel-button-close-bg': string;
  /** Граница кнопки закрытия */
  '--chotto-chatpanel-button-close-border': string;
  /** Курсор кнопки закрытия */
  '--chotto-chatpanel-button-close-cursor': string;
  /** Размер иконки кнопки */
  '--chotto-chatpanel-button-icon-size': string;
  /** Цвет активной кнопки */
  '--chotto-chatpanel-button-color-active': string;

  // Scrollbar
  /** Ширина полосы прокрутки */
  '--chotto-chatpanel-scrollbar-width': string;
  /** Цвет фона полосы прокрутки */
  '--chotto-chatpanel-scrollbar-bg': string;
  /** Радиус границы ползунка полосы прокрутки */
  '--chotto-chatpanel-scrollbar-thumb-radius': string;
  /** Цвет фона ползунка полосы прокрутки */
  '--chotto-chatpanel-scrollbar-thumb-bg': string;
  /** Радиус границы дорожки полосы прокрутки */
  '--chotto-chatpanel-scrollbar-track-radius': string;
}
