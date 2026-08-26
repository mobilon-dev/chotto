/**
 * CSS переменные для компонента FilePreview
 */
export interface FilePreviewThemeCSSVariables {
  /** Позиционирование чипа файла */
  '--chotto-filepreview-position': string;
  /** Отображение чипа файла */
  '--chotto-filepreview-display': string;
  /** Выравнивание по поперечной оси */
  '--chotto-filepreview-align-items': string;
  /** Выравнивание по главной оси */
  '--chotto-filepreview-justify-content': string;
  /** Промежуток между иконкой и текстом */
  '--chotto-filepreview-gap': string;
  /** Ширина чипа */
  '--chotto-filepreview-width': string;
  /** Высота чипа */
  '--chotto-filepreview-height': string;
  /** Минимальная ширина чипа */
  '--chotto-filepreview-min-width': string;
  /** Максимальная ширина чипа */
  '--chotto-filepreview-max-width': string;
  /** Гибкость чипа */
  '--chotto-filepreview-flex': string;
  /** Внутренние отступы чипа */
  '--chotto-filepreview-padding': string;
  /** Граница чипа */
  '--chotto-filepreview-border': string;
  /** Радиус скругления чипа */
  '--chotto-filepreview-border-radius': string;
  /** Фон чипа */
  '--chotto-filepreview-background': string;
  /** Фон чипа при наведении */
  '--chotto-filepreview-hover-background': string;
  /** Модель размеров чипа */
  '--chotto-filepreview-box-sizing': string;

  /** Сжатие иконки файла */
  '--chotto-filepreview-icon-flex-shrink': string;
  /** Размер иконки файла */
  '--chotto-filepreview-icon-font-size': string;
  /** Цвет иконки файла */
  '--chotto-filepreview-icon-color': string;

  /** Позиционирование миниатюры */
  '--chotto-filepreview-thumb-position': string;
  /** Сжатие миниатюры */
  '--chotto-filepreview-thumb-flex-shrink': string;
  /** Ширина миниатюры */
  '--chotto-filepreview-thumb-width': string;
  /** Высота миниатюры */
  '--chotto-filepreview-thumb-height': string;
  /** Радиус скругления миниатюры */
  '--chotto-filepreview-thumb-border-radius': string;
  /** Переполнение миниатюры */
  '--chotto-filepreview-thumb-overflow': string;
  /** Фон миниатюры */
  '--chotto-filepreview-thumb-background': string;
  /** Ширина медиа миниатюры */
  '--chotto-filepreview-thumb-media-width': string;
  /** Высота медиа миниатюры */
  '--chotto-filepreview-thumb-media-height': string;
  /** Вписывание медиа миниатюры */
  '--chotto-filepreview-thumb-media-object-fit': string;
  /** Отображение медиа миниатюры */
  '--chotto-filepreview-thumb-media-display': string;
  /** События указателя медиа миниатюры */
  '--chotto-filepreview-thumb-media-pointer-events': string;
  /** Позиционирование иконки воспроизведения */
  '--chotto-filepreview-thumb-play-position': string;
  /** Отступ сверху иконки воспроизведения */
  '--chotto-filepreview-thumb-play-top': string;
  /** Отступ слева иконки воспроизведения */
  '--chotto-filepreview-thumb-play-left': string;
  /** Трансформация иконки воспроизведения */
  '--chotto-filepreview-thumb-play-transform': string;
  /** Цвет иконки воспроизведения */
  '--chotto-filepreview-thumb-play-color': string;
  /** Размер шрифта иконки воспроизведения */
  '--chotto-filepreview-thumb-play-font-size': string;
  /** События указателя иконки воспроизведения */
  '--chotto-filepreview-thumb-play-pointer-events': string;
  /** Курсор миниатюры */
  '--chotto-filepreview-thumb-cursor': string;

  /** Отображение медиа в модальном окне */
  '--chotto-filepreview-modal-display': string;
  /** Ширина медиа в модальном окне */
  '--chotto-filepreview-modal-width': string;
  /** Высота медиа в модальном окне */
  '--chotto-filepreview-modal-height': string;
  /** Вписывание медиа в модальном окне */
  '--chotto-filepreview-modal-object-fit': string;
  /** Радиус скругления медиа в модальном окне */
  '--chotto-filepreview-modal-border-radius': string;
  /** Максимальная высота медиа в модальном окне */
  '--chotto-filepreview-modal-max-height': string;
  /** Максимальная ширина медиа в модальном окне */
  '--chotto-filepreview-modal-max-width': string;

  /** Отображение блока информации */
  '--chotto-filepreview-info-display': string;
  /** Направление блока информации */
  '--chotto-filepreview-info-flex-direction': string;
  /** Минимальная ширина блока информации */
  '--chotto-filepreview-info-min-width': string;
  /** Промежуток в блоке информации */
  '--chotto-filepreview-info-gap': string;

  /** Переполнение имени файла */
  '--chotto-filepreview-name-overflow': string;
  /** Перенос строк имени файла */
  '--chotto-filepreview-name-white-space': string;
  /** Обрезка имени файла */
  '--chotto-filepreview-name-text-overflow': string;
  /** Размер шрифта имени файла */
  '--chotto-filepreview-name-font-size': string;
  /** Высота строки имени файла */
  '--chotto-filepreview-name-line-height': string;
  /** Цвет имени файла */
  '--chotto-filepreview-name-color': string;

  /** Размер шрифта размера файла */
  '--chotto-filepreview-size-font-size': string;
  /** Высота строки размера файла */
  '--chotto-filepreview-size-line-height': string;
  /** Цвет размера файла */
  '--chotto-filepreview-size-color': string;

  /** Позиционирование кнопки удаления */
  '--chotto-filepreview-reset-position': string;
  /** Отступ сверху кнопки удаления */
  '--chotto-filepreview-reset-top': string;
  /** Отступ справа кнопки удаления */
  '--chotto-filepreview-reset-right': string;
  /** Сжатие кнопки удаления */
  '--chotto-filepreview-reset-flex-shrink': string;
  /** Прозрачность кнопки удаления */
  '--chotto-filepreview-reset-opacity': string;
  /** Прозрачность кнопки удаления при наведении */
  '--chotto-filepreview-reset-hover-opacity': string;
  /** Граница кнопки удаления */
  '--chotto-filepreview-reset-border': string;
  /** Фон кнопки удаления */
  '--chotto-filepreview-reset-background': string;
  /** Отступы кнопки удаления */
  '--chotto-filepreview-reset-padding': string;
  /** Курсор кнопки удаления */
  '--chotto-filepreview-reset-cursor': string;
  /** Цвет кнопки удаления */
  '--chotto-filepreview-reset-color': string;
  /** Размер шрифта кнопки удаления */
  '--chotto-filepreview-reset-font-size': string;
  /** Высота строки кнопки удаления */
  '--chotto-filepreview-reset-line-height': string;
}
