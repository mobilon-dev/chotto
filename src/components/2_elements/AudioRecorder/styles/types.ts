/**
 * CSS переменные для компонента AudioRecorder
 */
export interface AudioRecorderThemeCSSVariables {
  // Container
  /** Позиционирование контейнера */
  '--chotto-audiorecorder-container-position': string;
  /** Отображение контейнера */
  '--chotto-audiorecorder-container-display': string;
  /** Выравнивание элементов контейнера */
  '--chotto-audiorecorder-container-align-items': string;
  /** Цвет фона контейнера */
  '--chotto-audiorecorder-container-background-color': string;
  /** Высота контейнера */
  '--chotto-audiorecorder-container-height': string;

  // Recording container
  /** Отображение контейнера записи */
  '--chotto-audiorecorder-recording-container-display': string;
  /** Промежуток между элементами контейнера записи */
  '--chotto-audiorecorder-recording-container-gap': string;
  /** Высота строки контейнера записи */
  '--chotto-audiorecorder-recording-container-line-height': string;

  // Recording icon
  /** Высота строки иконки записи */
  '--chotto-audiorecorder-recording-icon-line-height': string;
  /** Размер шрифта иконки записи */
  '--chotto-audiorecorder-recording-icon-font-size': string;
  /** Webkit анимация иконки записи */
  '--chotto-audiorecorder-recording-icon-webkit-animation': string;
  /** Анимация иконки записи */
  '--chotto-audiorecorder-recording-icon-animation': string;

  // Stop button
  /** Ширина кнопки остановки */
  '--chotto-audiorecorder-stop-width': string;
  /** Высота кнопки остановки */
  '--chotto-audiorecorder-stop-height': string;
  /** Цвет фона кнопки остановки */
  '--chotto-audiorecorder-stop-background-color': string;
  /** Курсор кнопки остановки */
  '--chotto-audiorecorder-stop-cursor': string;
  /** Радиус границы кнопки остановки */
  '--chotto-audiorecorder-stop-border-radius': string;

  // Blink keyframes
  /** Цвет начала анимации мигания */
  '--chotto-audiorecorder-blink-keyframes-0-color': string;
  /** Цвет середины анимации мигания */
  '--chotto-audiorecorder-blink-keyframes-50-color': string;
  /** Цвет конца анимации мигания */
  '--chotto-audiorecorder-blink-keyframes-100-color': string;

  // Button
  /** Цвет фона кнопки */
  '--chotto-audiorecorder-button-background-color': string;
  /** Граница кнопки */
  '--chotto-audiorecorder-button-border': string;
  /** Отображение span кнопки */
  '--chotto-audiorecorder-button-span-display': string;
  /** Курсор span кнопки */
  '--chotto-audiorecorder-button-span-cursor': string;
  /** Отступы span кнопки */
  '--chotto-audiorecorder-button-span-padding': string;
  /** Размер шрифта span кнопки */
  '--chotto-audiorecorder-button-span-font-size': string;
  /** Цвет span кнопки */
  '--chotto-audiorecorder-button-span-color': string;
  /** Цвет span кнопки при наведении */
  '--chotto-audiorecorder-button-span-hover-color': string;

  // Button record
  /** Отображение span кнопки записи */
  '--chotto-audiorecorder-button-record-span-display': string;
  /** Курсор span кнопки записи */
  '--chotto-audiorecorder-button-record-span-cursor': string;
  /** Отступы span кнопки записи */
  '--chotto-audiorecorder-button-record-span-padding': string;
  /** Размер шрифта span кнопки записи */
  '--chotto-audiorecorder-button-record-span-font-size': string;
  /** Цвет span кнопки записи */
  '--chotto-audiorecorder-button-record-span-color': string;
  /** Цвет span кнопки записи при наведении */
  '--chotto-audiorecorder-button-record-span-hover-color': string;

  // Button disabled
  /** События указателя отключенной кнопки */
  '--chotto-audiorecorder-button-disabled-pointer-events': string;
  /** Курсор span отключенной кнопки */
  '--chotto-audiorecorder-button-disabled-span-cursor': string;
  /** Цвет span отключенной кнопки */
  '--chotto-audiorecorder-button-disabled-span-color': string;
}