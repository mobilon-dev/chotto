/**
 * CSS переменные для компонента LinkPreview
 */
export interface LinkPreviewThemeCSSVariables {
  // Main container
  /** Радиус границы превью ссылки */
  '--chotto-linkpreview-border-radius': string;
  /** Позиционирование превью ссылки */
  '--chotto-linkpreview-position': string;
  /** Отступы превью ссылки */
  '--chotto-linkpreview-margin': string;
  /** Внутренние отступы превью ссылки */
  '--chotto-linkpreview-padding': string;
  /** Переполнение превью ссылки */
  '--chotto-linkpreview-overflow': string;

  // Before pseudo-element
  /** Содержимое псевдоэлемента ::before */
  '--chotto-linkpreview-before-content': string;
  /** Позиционирование псевдоэлемента ::before */
  '--chotto-linkpreview-before-position': string;
  /** Верхняя позиция псевдоэлемента ::before */
  '--chotto-linkpreview-before-top': string;
  /** Левая позиция псевдоэлемента ::before */
  '--chotto-linkpreview-before-left': string;
  /** Ширина псевдоэлемента ::before */
  '--chotto-linkpreview-before-width': string;
  /** Высота псевдоэлемента ::before */
  '--chotto-linkpreview-before-height': string;
  /** Цвет фона псевдоэлемента ::before */
  '--chotto-linkpreview-before-background-color': string;

  // Link container
  /** Отображение контейнера ссылки */
  '--chotto-linkpreview-link-container-display': string;
  /** Направление флекс-элементов контейнера ссылки */
  '--chotto-linkpreview-link-container-flex-direction': string;
  /** Цвет текста контейнера ссылки */
  '--chotto-linkpreview-link-container-color': string;
  /** Размер шрифта контейнера ссылки */
  '--chotto-linkpreview-link-container-font-size': string;

  // Title
  /** Толщина шрифта заголовка */
  '--chotto-linkpreview-title-font-weight': string;
  /** Нижний отступ заголовка */
  '--chotto-linkpreview-title-margin-bottom': string;

  // Description
  /** Нижний отступ описания */
  '--chotto-linkpreview-description-margin-bottom': string;

  // Image
  /** Подгонка объекта изображения */
  '--chotto-linkpreview-image-object-fit': string;
  /** Ширина изображения */
  '--chotto-linkpreview-image-width': string;
  /** Максимальная высота изображения */
  '--chotto-linkpreview-image-max-height': string;
  /** Радиус границы изображения */
  '--chotto-linkpreview-image-border-radius': string;

  // Background colors
  /** Цвет фона для левого сообщения */
  '--chotto-linkpreview-left-background-color': string;
  /** Цвет фона для правого сообщения */
  '--chotto-linkpreview-right-background-color': string;
}
