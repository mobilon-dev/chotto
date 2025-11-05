/**
 * CSS переменные для компонента Tooltip
 */
export interface TooltipThemeCSSVariables {
  // Tooltip text
  /** Цвет текста подсказки */
  '--chotto-tooltip-text-color': string;
  /** Фон подсказки */
  '--chotto-tooltip-bg-color': string;
  /** Граница подсказки */
  '--chotto-tooltip-border': string;
  /** Радиус границы подсказки */
  '--chotto-tooltip-border-radius': string;
  /** Отступы подсказки */
  '--chotto-tooltip-padding': string;
  /** Максимальная ширина подсказки */
  '--chotto-tooltip-max-width': string;
  /** Выравнивание текста подсказки */
  '--chotto-tooltip-text-align': string;
  /** Размер шрифта подсказки */
  '--chotto-tooltip-font-size': string;
  /** Семейство шрифтов подсказки */
  '--chotto-tooltip-font-family': string;
  /** Жирность шрифта подсказки */
  '--chotto-tooltip-font-weight': string;
  /** Высота строки подсказки */
  '--chotto-tooltip-line-height': string;
  /** Тень подсказки */
  '--chotto-tooltip-box-shadow': string;
  /** Z-index подсказки */
  '--chotto-tooltip-z-index': string;
  /** Позиционирование подсказки */
  '--chotto-tooltip-position': string;
  /** Позиция подсказки сверху */
  '--chotto-tooltip-top': string;
  /** Позиция подсказки слева */
  '--chotto-tooltip-left': string;
  /** Прозрачность подсказки */
  '--chotto-tooltip-opacity': string;
  /** Трансформация подсказки */
  '--chotto-tooltip-transform': string;
  /** Переход подсказки */
  '--chotto-tooltip-transition': string;

  // Tooltip animations
  /** Прозрачность при входе подсказки */
  '--chotto-tooltip-enter-opacity': string;
  /** Трансформация при входе подсказки */
  '--chotto-tooltip-enter-transform': string;
  /** Прозрачность при завершении входа подсказки */
  '--chotto-tooltip-enter-to-opacity': string;
  /** Трансформация при завершении входа подсказки */
  '--chotto-tooltip-enter-to-transform': string;

  // Tooltip wrapper
  /** Позиционирование обертки подсказки */
  '--chotto-tooltip-wrapper-position': string;
  /** Ширина обертки подсказки */
  '--chotto-tooltip-wrapper-width': string;
  /** Высота обертки подсказки */
  '--chotto-tooltip-wrapper-height': string;
  /** Отображение обертки подсказки */
  '--chotto-tooltip-wrapper-display': string;
  /** Курсор обертки подсказки */
  '--chotto-tooltip-wrapper-cursor': string;
}
