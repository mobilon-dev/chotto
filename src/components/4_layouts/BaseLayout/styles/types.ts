/**
 * CSS переменные для компонента BaseLayout
 */
export interface BaseLayoutThemeCSSVariables {
  // Container
  /** Высота контейнера базового макета */
  '--chotto-baselayout-container-height': string;
  /** Ширина контейнера базового макета */
  '--chotto-baselayout-container-width': string;
  /** Отображение контейнера базового макета */
  '--chotto-baselayout-container-display': string;
  /** Колонки сетки контейнера базового макета */
  '--chotto-baselayout-container-grid-template-columns': string;
  /** Переход контейнера базового макета */
  '--chotto-baselayout-container-transition': string;
  /** Позиционирование контейнера базового макета */
  '--chotto-baselayout-container-position': string;
  /** Верхняя граница контейнера базового макета */
  '--chotto-baselayout-container-border-top': string;
  /** Левая граница контейнера базового макета */
  '--chotto-baselayout-container-border-left': string;

  // First column
  /** Позиционирование первой колонки */
  '--chotto-baselayout-first-col-position': string;
  /** Колонка сетки первой колонки */
  '--chotto-baselayout-first-col-grid-column': string;
  /** Отображение первой колонки */
  '--chotto-baselayout-first-col-display': string;
  /** Направление флекс-элементов первой колонки */
  '--chotto-baselayout-first-col-flex-direction': string;
  /** Высота первой колонки */
  '--chotto-baselayout-first-col-height': string;
  /** Цвет фона первой колонки */
  '--chotto-baselayout-first-col-background-color': string;
  /** Правая граница первой колонки */
  '--chotto-baselayout-first-col-border-right': string;
  /** Нижняя граница первой колонки */
  '--chotto-baselayout-first-col-border-bottom': string;
  /** Ширина первой колонки */
  '--chotto-baselayout-first-col-width': string;

  // Second column
  /** Позиционирование второй колонки */
  '--chotto-baselayout-second-col-position': string;
  /** Отображение второй колонки */
  '--chotto-baselayout-second-col-display': string;
  /** Направление флекс-элементов второй колонки */
  '--chotto-baselayout-second-col-flex-direction': string;
  /** Колонка сетки второй колонки */
  '--chotto-baselayout-second-col-grid-column': string;
  /** Высота второй колонки */
  '--chotto-baselayout-second-col-height': string;
  /** Ширина второй колонки */
  '--chotto-baselayout-second-col-width': string;
  /** Цвет фона второй колонки */
  '--chotto-baselayout-second-col-background-color': string;
  /** Правая граница второй колонки */
  '--chotto-baselayout-second-col-border-right': string;
  /** Нижняя граница второй колонки */
  '--chotto-baselayout-second-col-border-bottom': string;

  // Transition
  /** Переход для активного состояния Vue Transition */
  '--chotto-baselayout-transition-enter-active-transition': string;
  /** Непрозрачность для активного состояния Vue Transition */
  '--chotto-baselayout-transition-enter-active-opacity': string;
  /** Непрозрачность для начального состояния Vue Transition */
  '--chotto-baselayout-transition-enter-from-opacity': string;
}
