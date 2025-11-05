/**
 * CSS переменные для компонента FilePreview
 */
export interface FilePreviewThemeCSSVariables {
  // Container
  /** Позиционирование контейнера предпросмотра файла */
  '--chotto-filepreview-container-position': string;
  /** Отображение контейнера предпросмотра файла */
  '--chotto-filepreview-container-display': string;
  /** Граница контейнера предпросмотра файла */
  '--chotto-filepreview-container-border': string;

  // Image/Video
  /** Максимальная ширина изображения/видео */
  '--chotto-filepreview-image-max-width': string;
  /** Максимальная высота изображения/видео */
  '--chotto-filepreview-image-max-height': string;

  // Modal
  /** Высота модального окна */
  '--chotto-filepreview-modal-height': string;
  /** Подгонка объекта модального окна */
  '--chotto-filepreview-modal-object-fit': string;
  /** Радиус границы модального окна */
  '--chotto-filepreview-modal-border-radius': string;
  /** Максимальная высота модального окна */
  '--chotto-filepreview-modal-max-height': string;
  /** Максимальная ширина модального окна */
  '--chotto-filepreview-modal-max-width': string;

  // Shadow
  /** Отображение тени */
  '--chotto-filepreview-shadow-display': string;
  /** Отображение тени при наведении */
  '--chotto-filepreview-shadow-hover-display': string;
  /** Курсор тени при наведении */
  '--chotto-filepreview-shadow-hover-cursor': string;
  /** Позиционирование тени при наведении */
  '--chotto-filepreview-shadow-hover-position': string;
  /** Позиция тени сверху при наведении */
  '--chotto-filepreview-shadow-hover-top': string;
  /** Позиция тени слева при наведении */
  '--chotto-filepreview-shadow-hover-left': string;
  /** Трансформация тени при наведении */
  '--chotto-filepreview-shadow-hover-transform': string;
  /** Ширина тени при наведении */
  '--chotto-filepreview-shadow-hover-width': string;
  /** Высота тени при наведении */
  '--chotto-filepreview-shadow-hover-height': string;
  /** Фон тени при наведении */
  '--chotto-filepreview-shadow-hover-background': string;
  /** Прозрачность тени при наведении */
  '--chotto-filepreview-shadow-hover-opacity': string;
  /** Позиция span тени сверху при наведении */
  '--chotto-filepreview-shadow-hover-span-top': string;
  /** Позиция span тени слева при наведении */
  '--chotto-filepreview-shadow-hover-span-left': string;
  /** Трансформация span тени при наведении */
  '--chotto-filepreview-shadow-hover-span-transform': string;
  /** Позиционирование span тени при наведении */
  '--chotto-filepreview-shadow-hover-span-position': string;
  /** Цвет span тени при наведении */
  '--chotto-filepreview-shadow-hover-span-color': string;

  // Audio control
  /** Граница элемента управления аудио */
  '--chotto-filepreview-audio-control-border': string;
  /** Курсор элемента управления аудио */
  '--chotto-filepreview-audio-control-cursor': string;
  /** Позиционирование элемента управления аудио */
  '--chotto-filepreview-audio-control-position': string;
  /** Grid row элемента управления аудио */
  '--chotto-filepreview-audio-control-grid-row': string;
  /** Ширина элемента управления аудио */
  '--chotto-filepreview-audio-control-width': string;
  /** Высота элемента управления аудио */
  '--chotto-filepreview-audio-control-height': string;
  /** Радиус границы элемента управления аудио */
  '--chotto-filepreview-audio-control-border-radius': string;
  /** Цвет фона элемента управления аудио */
  '--chotto-filepreview-audio-control-background-color': string;
  /** Отображение span элемента управления аудио */
  '--chotto-filepreview-audio-control-span-display': string;
  /** Позиционирование span элемента управления аудио */
  '--chotto-filepreview-audio-control-span-position': string;
  /** Позиция span элемента управления аудио сверху */
  '--chotto-filepreview-audio-control-span-top': string;
  /** Позиция span элемента управления аудио слева */
  '--chotto-filepreview-audio-control-span-left': string;
  /** Трансформация span элемента управления аудио */
  '--chotto-filepreview-audio-control-span-transform': string;
  /** Размер шрифта span элемента управления аудио */
  '--chotto-filepreview-audio-control-span-font-size': string;
  /** Цвет span элемента управления аудио */
  '--chotto-filepreview-audio-control-span-color': string;

  // Block
  /** Максимальная ширина блока */
  '--chotto-filepreview-block-max-width': string;
  /** Максимальная высота блока */
  '--chotto-filepreview-block-max-height': string;
  /** Минимальная ширина блока */
  '--chotto-filepreview-block-min-width': string;
  /** Минимальная высота блока */
  '--chotto-filepreview-block-min-height': string;
  /** Отступы блока */
  '--chotto-filepreview-block-margin': string;
  /** Переполнение блока */
  '--chotto-filepreview-block-overflow': string;
  /** Радиус границы блока */
  '--chotto-filepreview-block-border-radius': string;
  /** Отображение блока */
  '--chotto-filepreview-block-display': string;
  /** Выравнивание по поперечной оси блока */
  '--chotto-filepreview-block-align-items': string;
  /** Выравнивание по главной оси блока */
  '--chotto-filepreview-block-justify-content': string;

  // Information
  /** Отступ слева информации */
  '--chotto-filepreview-information-margin-left': string;
  /** Отображение информации */
  '--chotto-filepreview-information-display': string;
  /** Отображение span информации */
  '--chotto-filepreview-information-span-display': string;
  /** Размер шрифта span информации */
  '--chotto-filepreview-information-span-font-size': string;

  // Name
  /** Выравнивание по поперечной оси имени */
  '--chotto-filepreview-name-align-items': string;
  /** Переполнение имени */
  '--chotto-filepreview-name-overflow': string;
  /** Перенос строк имени */
  '--chotto-filepreview-name-white-space': string;
  /** Перенос слов имени */
  '--chotto-filepreview-name-word-break': string;
  /** Обрезка текста имени */
  '--chotto-filepreview-name-text-overflow': string;

  // Reset
  /** Отображение кнопки сброса */
  '--chotto-filepreview-reset-display': string;
  /** Отступ справа кнопки сброса */
  '--chotto-filepreview-reset-margin-right': string;
  /** Размер шрифта кнопки сброса */
  '--chotto-filepreview-reset-font-size': string;
  /** Отступы span кнопки сброса */
  '--chotto-filepreview-reset-span-margin': string;
  /** Курсор кнопки сброса при наведении */
  '--chotto-filepreview-reset-hover-cursor': string;

  // Control block
  /** Отображение блока управления */
  '--chotto-filepreview-control-block-display': string;
  /** Выравнивание по главной оси блока управления */
  '--chotto-filepreview-control-block-justify-content': string;
  /** Гибкость блока управления */
  '--chotto-filepreview-control-block-flex': string;
}