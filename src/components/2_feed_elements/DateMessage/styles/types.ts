/**
 * CSS переменные для компонента DateMessage
 *
 * Назначение: контракт переменных тем между `styles/themes/*.scss` и стилями компонента.
 * Правила: префикс `--chotto-datemessage-*`; обновляйте список при изменениях тем.
 */
export interface DateMessageThemeCSSVariables {
  /** Отображение контейнера даты */
  '--chotto-datemessage-container-display': string;
  /** Выравнивание элементов контейнера даты по поперечной оси */
  '--chotto-datemessage-container-align-items': string;
  /** Выравнивание элементов контейнера даты по главной оси */
  '--chotto-datemessage-container-justify-content': string;
  /** Внешние отступы контейнера даты */
  '--chotto-datemessage-container-margin': string;
  /** Внутренние отступы контейнера даты */
  '--chotto-datemessage-container-padding': string;
  /** Отступ снизу контейнера даты */
  '--chotto-datemessage-container-margin-bottom': string;
  /** Ширина контейнера даты */
  '--chotto-datemessage-container-width': string;
  /** Цвет фона контейнера даты */
  '--chotto-datemessage-container-background-color': string;

  /** Внутренние отступы текста даты */
  '--chotto-datemessage-text-padding': string;
  /** Скругление фона текста даты */
  '--chotto-datemessage-text-border-radius': string;
  /** Цвет фона текста даты */
  '--chotto-datemessage-text-background-color': string;
  /** Размер шрифта текста даты */
  '--chotto-datemessage-text-font-size': string;
  /** Цвет текста даты */
  '--chotto-datemessage-text-color': string;
}


