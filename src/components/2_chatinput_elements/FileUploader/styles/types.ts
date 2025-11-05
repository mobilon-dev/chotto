/**
 * CSS переменные для компонента FileUploader
 */
export interface FileUploaderThemeCSSVariables {
  // Trigger
  /** Отступы триггера загрузки файла */
  '--chotto-fileuploader-trigger-padding': string;
  /** Отображение триггера загрузки файла */
  '--chotto-fileuploader-trigger-display': string;
  /** Курсор триггера загрузки файла */
  '--chotto-fileuploader-trigger-cursor': string;
  /** Размер шрифта триггера загрузки файла */
  '--chotto-fileuploader-trigger-font-size': string;
  /** Цвет триггера загрузки файла */
  '--chotto-fileuploader-trigger-color': string;

  // Trigger hover
  /** Цвет триггера загрузки файла при наведении */
  '--chotto-fileuploader-trigger-hover-color': string;

  // Disabled
  /** Цвет отключенного триггера загрузки файла */
  '--chotto-fileuploader-disabled-color': string;
  /** Курсор отключенного триггера загрузки файла */
  '--chotto-fileuploader-disabled-cursor': string;
  /** События указателя для отключенного триггера загрузки файла */
  '--chotto-fileuploader-disabled-pointer-events': string;
}