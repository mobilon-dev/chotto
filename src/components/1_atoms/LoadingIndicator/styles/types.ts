/**
 * CSS переменные для компонента LoadingIndicator
 */
export interface LoadingIndicatorThemeCSSVariables {
  // LoadingIndicator container
  /** Позиционирование индикатора загрузки */
  '--chotto-loadingindicator-position': string;
  /** Позиция индикатора сверху */
  '--chotto-loadingindicator-top': string;
  /** Позиция индикатора слева */
  '--chotto-loadingindicator-left': string;
  /** Позиция индикатора справа */
  '--chotto-loadingindicator-right': string;
  /** Позиция индикатора снизу */
  '--chotto-loadingindicator-bottom': string;
  /** Отображение индикатора */
  '--chotto-loadingindicator-display': string;
  /** Выравнивание элементов по вертикали */
  '--chotto-loadingindicator-align-items': string;
  /** Выравнивание элементов по горизонтали */
  '--chotto-loadingindicator-justify-content': string;
  /** Z-index индикатора */
  '--chotto-loadingindicator-z-index': string;

  // LoadingIndicator dots
  /** Цвет обводки точек */
  '--chotto-loadingindicator-dot-stroke': string;
  /** Толщина обводки точек */
  '--chotto-loadingindicator-dot-stroke-width': string;
  /** Заливка точек */
  '--chotto-loadingindicator-dot-fill': string;

  // LoadingIndicator animation
  /** Длительность анимации */
  '--chotto-loadingindicator-animation-duration': string;
  /** Задержка анимации для первой точки */
  '--chotto-loadingindicator-dot-1-delay': string;
  /** Задержка анимации для второй точки */
  '--chotto-loadingindicator-dot-2-delay': string;
  /** Задержка анимации для третьей точки */
  '--chotto-loadingindicator-dot-3-delay': string;
  /** Задержка анимации для четвертой точки */
  '--chotto-loadingindicator-dot-4-delay': string;
  /** Задержка анимации для пятой точки */
  '--chotto-loadingindicator-dot-5-delay': string;

  // LoadingIndicator pulse animation
  /** Минимальная прозрачность при пульсации */
  '--chotto-loadingindicator-pulse-opacity-min': string;
  /** Максимальная прозрачность при пульсации */
  '--chotto-loadingindicator-pulse-opacity-max': string;
  /** Минимальная толщина обводки при пульсации */
  '--chotto-loadingindicator-pulse-stroke-width-min': string;
  /** Максимальная толщина обводки при пульсации */
  '--chotto-loadingindicator-pulse-stroke-width-max': string;
}


