/**
 * CSS переменные для компонента EmbedPreview
 */
export interface EmbedPreviewThemeCSSVariables {
  // Main container
  /** Радиус границы превью встраиваемого контента */
  '--chotto-embedpreview-border-radius': string;
  /** Позиционирование превью встраиваемого контента */
  '--chotto-embedpreview-position': string;
  /** Отступы превью встраиваемого контента */
  '--chotto-embedpreview-margin': string;
  /** Внутренние отступы превью встраиваемого контента */
  '--chotto-embedpreview-padding': string;
  /** Переполнение превью встраиваемого контента */
  '--chotto-embedpreview-overflow': string;

  // Player
  /** Подгонка объекта плеера */
  '--chotto-embedpreview-player-object-fit': string;
  /** Ширина плеера */
  '--chotto-embedpreview-player-width': string;
  /** Максимальная высота плеера */
  '--chotto-embedpreview-player-max-height': string;
  /** Радиус границы плеера */
  '--chotto-embedpreview-player-border-radius': string;
  /** Граница плеера */
  '--chotto-embedpreview-player-border': string;

  // Background colors
  /** Цвет фона для левого сообщения */
  '--chotto-embedpreview-left-background-color': string;
  /** Цвет фона для правого сообщения */
  '--chotto-embedpreview-right-background-color': string;
}
