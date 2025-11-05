/**
 * CSS переменные для компонента FeedLayout
 */
export interface FeedLayoutThemeCSSVariables {
  // Container
  /** Высота контейнера макета ленты */
  '--chotto-feedlayout-container-height': string;
  /** Отображение контейнера макета ленты */
  '--chotto-feedlayout-container-display': string;
  /** Колонки сетки контейнера макета ленты */
  '--chotto-feedlayout-container-grid-template-columns': string;
  /** Переход контейнера макета ленты */
  '--chotto-feedlayout-container-transition': string;
  /** Позиционирование контейнера макета ленты */
  '--chotto-feedlayout-container-position': string;

  // First column
  /** Позиционирование первой колонки */
  '--chotto-feedlayout-first-col-position': string;
  /** Колонка сетки первой колонки */
  '--chotto-feedlayout-first-col-grid-column': string;
  /** Отображение первой колонки */
  '--chotto-feedlayout-first-col-display': string;
  /** Направление флекс-элементов первой колонки */
  '--chotto-feedlayout-first-col-flex-direction': string;
  /** Высота первой колонки */
  '--chotto-feedlayout-first-col-height': string;
  /** Цвет фона первой колонки */
  '--chotto-feedlayout-first-col-background-color': string;

  // Transition
  /** Переход для активного состояния Vue Transition */
  '--chotto-feedlayout-transition-enter-active-transition': string;
  /** Непрозрачность для активного состояния Vue Transition */
  '--chotto-feedlayout-transition-enter-active-opacity': string;
  /** Непрозрачность для начального состояния Vue Transition */
  '--chotto-feedlayout-transition-enter-from-opacity': string;
}
