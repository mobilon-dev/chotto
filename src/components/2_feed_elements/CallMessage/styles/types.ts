/**
 * CSS variables for CallMessage component
 */
export interface CallMessageThemeCSSVariables {
  /** Цвет иконки пропущенного звонка */
  '--chotto-callmessage-icon-missed-color': string;

  /** Позиционирование контейнера контента звонка */
  '--chotto-callmessage-content-position': string;
  /** Перенос слов в контейнере контента */
  '--chotto-callmessage-content-word-wrap': string;
  /** Ширина контейнера контента */
  '--chotto-callmessage-content-width': string;
  /** Отображение контейнера контента */
  '--chotto-callmessage-content-display': string;
  /** Шаблон колонок грида */
  '--chotto-callmessage-content-grid-template-columns': string;
  /** Промежуток между колонками */
  '--chotto-callmessage-content-column-gap': string;
  /** Максимальная ширина контейнера */
  '--chotto-callmessage-content-max-width': string;
  /** Минимальная ширина контейнера */
  '--chotto-callmessage-content-min-width': string;
  /** Внутренние отступы контейнера */
  '--chotto-callmessage-content-padding': string;

  /** Колонки грида инфо-контейнера */
  '--chotto-callmessage-info-container-grid-column': string;
  /** Отступ слева у инфо-контейнера */
  '--chotto-callmessage-info-container-margin-left': string;
  /** Отображение инфо-контейнера */
  '--chotto-callmessage-info-container-display': string;
  /** Выравнивание элементов инфо-контейнера */
  '--chotto-callmessage-info-container-align-items': string;
  /** Промежуток между элементами инфо-контейнера */
  '--chotto-callmessage-info-container-column-gap': string;

  /** Отступ снизу у заголовка */
  '--chotto-callmessage-title-margin-bottom': string;
  /** Цвет участника звонка */
  '--chotto-callmessage-call-participant-color': string;
  /** Отображение пропущенного звонка в заголовке */
  '--chotto-callmessage-title-missed-display': string;

  /** Колонка грида обёртки заголовка */
  '--chotto-callmessage-title-wrapper-grid-column': string;
  /** Отображение обёртки заголовка */
  '--chotto-callmessage-title-wrapper-display': string;
  /** Выравнивание элементов обёртки заголовка */
  '--chotto-callmessage-title-wrapper-align-items': string;
  /** Промежуток между колонками обёртки заголовка */
  '--chotto-callmessage-title-wrapper-column-gap': string;

  /** Колонка грида иконки */
  '--chotto-callmessage-icon-grid-column': string;
  /** Ряд грида иконки */
  '--chotto-callmessage-icon-grid-row': string;
  /** Выравнивание иконки относительно себя */
  '--chotto-callmessage-icon-align-self': string;
  /** Отображение иконки */
  '--chotto-callmessage-icon-display': string;
  /** Выравнивание иконки по главной оси */
  '--chotto-callmessage-icon-justify-content': string;
  /** Выравнивание иконки по поперечной оси */
  '--chotto-callmessage-icon-align-items': string;
  /** Скругление иконки */
  '--chotto-callmessage-icon-border-radius': string;
  /** Высота иконки */
  '--chotto-callmessage-icon-height': string;
  /** Ширина иконки */
  '--chotto-callmessage-icon-width': string;

  /** Позиционирование кнопки скачивания */
  '--chotto-callmessage-download-button-position': string;
  /** Отступ справа кнопки скачивания */
  '--chotto-callmessage-download-button-right': string;
  /** Отступ сверху кнопки скачивания */
  '--chotto-callmessage-download-button-top': string;
  /** Отображение кнопки скачивания */
  '--chotto-callmessage-download-button-display': string;
  /** Выравнивание содержимого кнопки по главной оси */
  '--chotto-callmessage-download-button-justify-content': string;
  /** Выравнивание содержимого кнопки по поперечной оси */
  '--chotto-callmessage-download-button-align-items': string;
  /** Граница кнопки скачивания */
  '--chotto-callmessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-callmessage-download-button-border-radius': string;
  /** Прозрачный фон кнопки скачивания */
  '--chotto-callmessage-download-button-background-color': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-callmessage-download-button-padding': string;
  /** Курсор кнопки скачивания */
  '--chotto-callmessage-download-button-cursor': string;

  /** Отображение статуса */
  '--chotto-callmessage-status-display': string;

  /** Колонка грида контейнера заголовка */
  '--chotto-callmessage-header-container-grid-column': string;
  /** Отображение контейнера заголовка */
  '--chotto-callmessage-header-container-display': string;
  /** Промежуток между рядами контейнера заголовка */
  '--chotto-callmessage-header-container-row-gap': string;
  /** Внутренние отступы контейнера заголовка */
  '--chotto-callmessage-header-container-padding': string;
  /** Граница контейнера заголовка */
  '--chotto-callmessage-header-container-border': string;
  /** Скругление контейнера заголовка */
  '--chotto-callmessage-header-container-border-radius': string;
  /** Цвет фона контейнера заголовка */
  '--chotto-callmessage-header-container-background-color': string;
  /** Эффект размытия фона контейнера заголовка */
  '--chotto-callmessage-header-container-backdrop-filter': string;
  /** Тень контейнера заголовка */
  '--chotto-callmessage-header-container-box-shadow': string;

  /** Выравнивание аватара */
  '--chotto-callmessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-callmessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-callmessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-callmessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-callmessage-avatar-border-radius': string;

  /** Колонка грида обёртки аудио */
  '--chotto-callmessage-audio-wrapper-grid-column': string;
  /** Отображение обёртки аудио */
  '--chotto-callmessage-audio-wrapper-display': string;
  /** Шаблон колонок грида обёртки аудио */
  '--chotto-callmessage-audio-wrapper-grid-template-columns': string;
  /** Промежуток между колонками обёртки аудио */
  '--chotto-callmessage-audio-wrapper-column-gap': string;
  /** Выравнивание элементов обёртки аудио */
  '--chotto-callmessage-audio-wrapper-align-items': string;
  /** Внутренний отступ сверху обёртки аудио */
  '--chotto-callmessage-audio-wrapper-padding-top': string;
  /** Внутренний отступ снизу обёртки аудио */
  '--chotto-callmessage-audio-wrapper-padding-bottom': string;
  /** Граница кнопки аудио */
  '--chotto-callmessage-audio-button-border': string;
  /** Курсор кнопки аудио */
  '--chotto-callmessage-audio-button-cursor': string;
  /** Ширина кнопки аудио */
  '--chotto-callmessage-audio-button-width': string;
  /** Высота кнопки аудио */
  '--chotto-callmessage-audio-button-height': string;
  /** Скругление кнопки аудио */
  '--chotto-callmessage-audio-button-border-radius': string;
  /** Цвет фона кнопки аудио */
  '--chotto-callmessage-audio-button-background-color': string;
  /** Эффект размытия фона кнопки аудио */
  '--chotto-callmessage-audio-button-backdrop-filter': string;
  /** Тень кнопки аудио */
  '--chotto-callmessage-audio-button-box-shadow': string;
  /** Отображение кнопки аудио */
  '--chotto-callmessage-audio-button-display': string;
  /** Выравнивание элементов кнопки аудио */
  '--chotto-callmessage-audio-button-align-items': string;
  /** Выравнивание содержимого кнопки аудио по главной оси */
  '--chotto-callmessage-audio-button-justify-content': string;
  /** Ряд грида кнопки аудио */
  '--chotto-callmessage-audio-button-grid-row': string;
  /** Отображение иконки аудио */
  '--chotto-callmessage-audio-icon-display': string;
  /** Выравнивание элементов иконки аудио */
  '--chotto-callmessage-audio-icon-align-items': string;
  /** Выравнивание содержимого иконки аудио по главной оси */
  '--chotto-callmessage-audio-icon-justify-content': string;
  /** Колонка грида прогресса аудио */
  '--chotto-callmessage-audio-progress-grid-column': string;
  /** Ряд грида прогресса аудио */
  '--chotto-callmessage-audio-progress-grid-row': string;
  /** Отображение прогресса аудио */
  '--chotto-callmessage-audio-progress-display': string;
  /** Направление флекс-контейнера прогресса аудио */
  '--chotto-callmessage-audio-progress-flex-direction': string;
  /** Промежуток между рядами прогресса аудио */
  '--chotto-callmessage-audio-progress-row-gap': string;
  /** Выравнивание прогресса аудио относительно себя */
  '--chotto-callmessage-audio-progress-align-self': string;
  /** Выравнивание содержимого прогресса аудио по главной оси */
  '--chotto-callmessage-audio-progress-justify-content': string;
  /** Отображение полосы прогресса аудио */
  '--chotto-callmessage-audio-progress-bar-display': string;
  /** Выравнивание элементов полосы прогресса аудио */
  '--chotto-callmessage-audio-progress-bar-align-items': string;
  /** Промежуток между колонками полосы прогресса аудио */
  '--chotto-callmessage-audio-progress-bar-column-gap': string;
  /** Внешний отступ сверху полосы прогресса аудио */
  '--chotto-callmessage-audio-progress-bar-margin-top': string;
  /** Трансформация полосы прогресса аудио */
  '--chotto-callmessage-audio-progress-bar-transform': string;
  /** Внешний вид слайдера аудио для WebKit */
  '--chotto-callmessage-audio-slider-webkit-appearance': string;
  /** Внешний вид слайдера аудио */
  '--chotto-callmessage-audio-slider-appearance': string;
  /** Фон слайдера аудио */
  '--chotto-callmessage-audio-slider-background': string;
  /** Курсор слайдера аудио */
  '--chotto-callmessage-audio-slider-cursor': string;
  /** Высота слайдера аудио */
  '--chotto-callmessage-audio-slider-height': string;
  /** Максимальная ширина слайдера аудио */
  '--chotto-callmessage-audio-slider-max-width': string;
  /** Скругление слайдера аудио */
  '--chotto-callmessage-audio-slider-border-radius': string;
  /** Flex-свойство слайдера аудио */
  '--chotto-callmessage-audio-slider-flex': string;
  /** Внешние отступы слайдера аудио */
  '--chotto-callmessage-audio-slider-margin': string;
  /** Внешний отступ сверху слайдера аудио */
  '--chotto-callmessage-audio-slider-margin-top': string;
  /** Высота дорожки слайдера аудио */
  '--chotto-callmessage-audio-slider-track-height': string;
  /** Фон дорожки слайдера аудио */
  '--chotto-callmessage-audio-slider-track-background': string;
  /** Ширина ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-width': string;
  /** Высота ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-height': string;
  /** Цвет фона ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-background-color': string;
  /** Граница ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-border': string;
  /** Тень ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-box-shadow': string;
  /** Внешний отступ сверху ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-margin-top': string;
  /** Скругление ползунка слайдера аудио */
  '--chotto-callmessage-audio-slider-thumb-border-radius': string;
  /** Цвет фона кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-background-color': string;
  /** Граница кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-border': string;
  /** Размер шрифта кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-font-size': string;
  /** Жирность шрифта кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-font-weight': string;
  /** Цвет кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-color': string;
  /** Курсор кнопки скорости аудио */
  '--chotto-callmessage-audio-speed-btn-cursor': string;
  /** Жирность шрифта кнопки скорости аудио при наведении */
  '--chotto-callmessage-audio-speed-btn-hover-font-weight': string;
  /** Отображение времени аудио */
  '--chotto-callmessage-audio-time-display': string;
  /** Выравнивание содержимого времени аудио по главной оси */
  '--chotto-callmessage-audio-time-justify-content': string;
  /** Размер шрифта времени аудио */
  '--chotto-callmessage-audio-time-font-size': string;
  /** Цвет времени аудио */
  '--chotto-callmessage-audio-time-color': string;

  /** Позиционирование кнопки меню */
  '--chotto-callmessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-callmessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-callmessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-callmessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-callmessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-callmessage-menu-button-transition': string;
  /** Слой кнопки меню */
  '--chotto-callmessage-menu-button-z-index': string;

  /** Позиционирование контекстного меню */
  '--chotto-callmessage-context-menu-position': string;

  /** Позиционирование текстового диалога */
  '--chotto-callmessage-text-dialog-position': string;
  /** Ширина текстового диалога */
  '--chotto-callmessage-text-dialog-width': string;
  /** Максимальная ширина текстового диалога */
  '--chotto-callmessage-text-dialog-max-width': string;
  /** Левый внутренний отступ для левой стороны */
  '--chotto-callmessage-text-dialog-left-padding-left': string;

  /** Контент псевдоэлемента до текстового диалога */
  '--chotto-callmessage-text-dialog-before-content': string;
  /** Позиционирование псевдоэлемента до */
  '--chotto-callmessage-text-dialog-before-position': string;
  /** Смещение сверху псевдоэлемента до */
  '--chotto-callmessage-text-dialog-before-top': string;
  /** Смещение слева псевдоэлемента до */
  '--chotto-callmessage-text-dialog-before-left': string;
  /** Ширина псевдоэлемента до */
  '--chotto-callmessage-text-dialog-before-width': string;
  /** Высота псевдоэлемента до */
  '--chotto-callmessage-text-dialog-before-height': string;

  /** Левый внутренний отступ правой стороны */
  '--chotto-callmessage-text-dialog-right-padding-left': string;
  /** Правый внутренний отступ правой стороны */
  '--chotto-callmessage-text-dialog-right-padding-right': string;
  /** Отступ слева для правой стороны */
  '--chotto-callmessage-text-dialog-right-margin-left': string;
  /** Смещение справа псевдоэлемента до */
  '--chotto-callmessage-text-dialog-right-before-right': string;
  /** Смещение слева псевдоэлемента до */
  '--chotto-callmessage-text-dialog-right-before-left': string;
  /** Ширина span справа */
  '--chotto-callmessage-text-dialog-right-span-width': string;
  /** Отображение span справа */
  '--chotto-callmessage-text-dialog-right-span-display': string;
  /** Отступ слева у span справа */
  '--chotto-callmessage-text-dialog-right-span-margin-left': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-callmessage-left-right-display': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-callmessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-callmessage-left-avatar-grid-column': string;
  /** Ряд грида аватара слева */
  '--chotto-callmessage-left-avatar-grid-row': string;
  /** Отступ справа от аватара слева */
  '--chotto-callmessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-callmessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-callmessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-callmessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-callmessage-left-content-grid-column': string;
  /** Эффект размытия фона блока слева */
  '--chotto-callmessage-left-backdrop-filter': string;
  /** Граница блока слева */
  '--chotto-callmessage-left-border': string;
  /** Тень блока слева */
  '--chotto-callmessage-left-box-shadow': string;
  /** Отступ сверху кнопки меню слева */
  '--chotto-callmessage-left-menu-button-top': string;
  /** Отступ справа кнопки меню слева */
  '--chotto-callmessage-left-menu-button-right': string;
  /** Отступ снизу кнопки меню слева */
  '--chotto-callmessage-left-menu-button-bottom': string;
  /** Отступ слева кнопки меню слева */
  '--chotto-callmessage-left-menu-button-left': string;
  /** Ширина контекстного меню слева */
  '--chotto-callmessage-left-context-menu-width': string;
  /** Высота контекстного меню слева */
  '--chotto-callmessage-left-context-menu-height': string;
  /** Отступ сверху контекстного меню слева */
  '--chotto-callmessage-left-context-menu-top': string;
  /** Отступ слева контекстного меню слева */
  '--chotto-callmessage-left-context-menu-left': string;
  /** Внешний отступ сверху контекстного меню слева */
  '--chotto-callmessage-left-context-menu-margin-top': string;
  /** Промежуток между рядами контекстного меню слева */
  '--chotto-callmessage-left-context-menu-row-gap': string;
  /** Внутренние отступы контекстного меню слева */
  '--chotto-callmessage-left-context-menu-padding': string;

  /** Позиционирование контейнера правой раскладки */
  '--chotto-callmessage-right-position': string;
  /** Шаблон колонок правой раскладки */
  '--chotto-callmessage-right-grid-template-columns': string;
  /** Правый внутренний отступ справа */
  '--chotto-callmessage-right-padding-right': string;
  /** Контент псевдоэлемента справа */
  '--chotto-callmessage-right-after-content': string;
  /** Позиционирование псевдоэлемента справа */
  '--chotto-callmessage-right-after-position': string;
  /** Смещение сверху псевдоэлемента справа */
  '--chotto-callmessage-right-after-top': string;
  /** Смещение справа псевдоэлемента справа */
  '--chotto-callmessage-right-after-right': string;
  /** Смещение снизу псевдоэлемента справа */
  '--chotto-callmessage-right-after-bottom': string;
  /** Ширина псевдоэлемента справа */
  '--chotto-callmessage-right-after-width': string;
  /** Колонка грида аватара справа */
  '--chotto-callmessage-right-avatar-grid-column': string;
  /** Ряд грида аватара справа */
  '--chotto-callmessage-right-avatar-grid-row': string;
  /** Отступ слева от аватара справа */
  '--chotto-callmessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-callmessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-callmessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-callmessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-callmessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-callmessage-right-content-margin-left': string;
  /** Эффект размытия фона блока справа */
  '--chotto-callmessage-right-backdrop-filter': string;
  /** Граница блока справа */
  '--chotto-callmessage-right-border': string;
  /** Тень блока справа */
  '--chotto-callmessage-right-box-shadow': string;
  /** Отступ сверху кнопки меню справа */
  '--chotto-callmessage-right-menu-button-top': string;
  /** Отступ справа кнопки меню справа */
  '--chotto-callmessage-right-menu-button-right': string;
  /** Отступ снизу кнопки меню справа */
  '--chotto-callmessage-right-menu-button-bottom': string;
  /** Отступ слева кнопки меню справа */
  '--chotto-callmessage-right-menu-button-left': string;
  /** Ширина контекстного меню справа */
  '--chotto-callmessage-right-context-menu-width': string;
  /** Высота контекстного меню справа */
  '--chotto-callmessage-right-context-menu-height': string;
  /** Отступ сверху контекстного меню справа */
  '--chotto-callmessage-right-context-menu-top': string;
  /** Отступ справа контекстного меню справа */
  '--chotto-callmessage-right-context-menu-right': string;
  /** Отступ слева контекстного меню справа */
  '--chotto-callmessage-right-context-menu-left': string;
  /** Внешний отступ сверху контекстного меню справа */
  '--chotto-callmessage-right-context-menu-margin-top': string;
  /** Промежуток между рядами контекстного меню справа */
  '--chotto-callmessage-right-context-menu-row-gap': string;
  /** Внутренние отступы контекстного меню справа */
  '--chotto-callmessage-right-context-menu-padding': string;

  /** Позиционирование модального окна */
  '--chotto-callmessage-modal-position': string;
  /** Отступ сверху модального окна */
  '--chotto-callmessage-modal-top': string;
  /** Отступ слева модального окна */
  '--chotto-callmessage-modal-left': string;
  /** Трансформация модального окна */
  '--chotto-callmessage-modal-transform': string;
  /** Слой модального окна */
  '--chotto-callmessage-modal-z-index': string;
  /** Ширина модального окна */
  '--chotto-callmessage-modal-width': string;
  /** Максимальная высота модального окна */
  '--chotto-callmessage-modal-max-height': string;
  /** Прокрутка по вертикали */
  '--chotto-callmessage-modal-overflow-y': string;
  /** Отображение модального окна */
  '--chotto-callmessage-modal-display': string;
  /** Направление флекс-контейнера */
  '--chotto-callmessage-modal-flex-direction': string;
  /** Промежуток между элементами */
  '--chotto-callmessage-modal-row-gap': string;

  /** Ширина скроллбара */
  '--chotto-callmessage-modal-scrollbar-width': string;
  /** Скругление ползунка скроллбара */
  '--chotto-callmessage-modal-scrollbar-thumb-border-radius': string;
  /** Скругление дорожки скроллбара */
  '--chotto-callmessage-modal-scrollbar-track-border-radius': string;

  /** Позиционирование оверлея */
  '--chotto-callmessage-modal-overlay-position': string;
  /** Отступ сверху оверлея */
  '--chotto-callmessage-modal-overlay-top': string;
  /** Отступ слева оверлея */
  '--chotto-callmessage-modal-overlay-left': string;
  /** Отступ справа оверлея */
  '--chotto-callmessage-modal-overlay-right': string;
  /** Отступ снизу оверлея */
  '--chotto-callmessage-modal-overlay-bottom': string;
  /** Слой оверлея */
  '--chotto-callmessage-modal-overlay-z-index': string;

  /** Отображение кнопки закрытия */
  '--chotto-callmessage-modal-close-button-display': string;
  /** Фон кнопки закрытия */
  '--chotto-callmessage-modal-close-button-background-color': string;
  /** Граница кнопки закрытия */
  '--chotto-callmessage-modal-close-button-border': string;
  /** Внутренние отступы кнопки закрытия */
  '--chotto-callmessage-modal-close-button-padding': string;
  /** Внешние отступы кнопки закрытия */
  '--chotto-callmessage-modal-close-button-margin': string;
  /** Курсор кнопки закрытия */
  '--chotto-callmessage-modal-close-button-cursor': string;

  /** Переход для модального окна */
  '--chotto-callmessage-modal-fade-transition': string;
  /** Прозрачность модального окна в начале */
  '--chotto-callmessage-modal-fade-opacity-from': string;
  /** Прозрачность модального окна в конце */
  '--chotto-callmessage-modal-fade-opacity-to': string;

  // New component-scoped variables mapped from former theme tokens
  /** Скругление контейнера контента */
  '--chotto-callmessage-content-border-radius': string;
  /** Размер шрифта заголовка */
  '--chotto-callmessage-title-font-size': string;
  /** Фон иконки типа сообщения */
  '--chotto-callmessage-icon-background-color': string;
  /** Цвет иконки типа сообщения */
  '--chotto-callmessage-icon-color': string;
  /** Размер иконки типа сообщения */
  '--chotto-callmessage-icon-font-size': string;
  /** Цвет текста длительности */
  '--chotto-callmessage-duration-text-color': string;
  /** Размер шрифта длительности */
  '--chotto-callmessage-duration-font-size': string;
  /** Колонка грида информации о пропущенном звонке */
  '--chotto-callmessage-missed-info-grid-column': string;
  /** Размер шрифта информации о пропущенном звонке */
  '--chotto-callmessage-missed-info-font-size': string;
  /** Цвет текста информации о пропущенном звонке */
  '--chotto-callmessage-missed-info-text-color': string;
  /** Внешние отступы информации о пропущенном звонке */
  '--chotto-callmessage-missed-info-margin': string;
  /** Цвет текста времени */
  '--chotto-callmessage-time-text-color': string;
  /** Размер шрифта времени */
  '--chotto-callmessage-time-font-size': string;
  /** Отступ справа у времени */
  '--chotto-callmessage-time-margin-right': string;
  /** Цвет кнопки звонка */
  '--chotto-callmessage-call-button-color': string;
  /** Размер шрифта кнопки звонка */
  '--chotto-callmessage-call-button-font-size': string;
  /** Внешние отступы кнопки звонка */
  '--chotto-callmessage-call-button-margin': string;
  /** Цвет иконки кнопки скачивания */
  '--chotto-callmessage-download-button-icon-color': string;
  /** Размер иконки кнопки скачивания */
  '--chotto-callmessage-download-button-icon-size': string;
  /** Цвет статуса доставлено */
  '--chotto-callmessage-status-color-received': string;
  /** Цвет статуса прочитано */
  '--chotto-callmessage-status-color-read': string;
  /** Малый размер иконки текста */
  '--chotto-callmessage-small-text-icon-size': string;
  /** Размер шрифта подзаголовка */
  '--chotto-callmessage-subtext-font-size': string;
  /** Цвет текста подзаголовка */
  '--chotto-callmessage-subtext-text-color': string;
  /** Цвет before-полоски в текстовом диалоге */
  '--chotto-callmessage-text-dialog-before-background-color': string;
  /** Размер шрифта заголовка в текстовом диалоге */
  '--chotto-callmessage-text-dialog-title-font-size': string;
  /** Цвет текста подписи в текстовом диалоге */
  '--chotto-callmessage-text-dialog-subtext-text-color': string;
  /** Размер шрифта подписи в текстовом диалоге */
  '--chotto-callmessage-text-dialog-subtext-font-size': string;
  /** Внешний отступ сообщения (контейнер left/right) */
  '--chotto-callmessage-message-margin': string;
  /** Цвет фона блока слева */
  '--chotto-callmessage-left-background-color': string;
  /** Цвет фона блока справа */
  '--chotto-callmessage-right-background-color': string;
  /** Семейство шрифта модального окна */
  '--chotto-callmessage-modal-font-family': string;
  /** Жирность шрифта модального окна */
  '--chotto-callmessage-modal-font-weight': string;
  /** Размер шрифта модального окна */
  '--chotto-callmessage-modal-font-size': string;
  /** Цвет текста модального окна */
  '--chotto-callmessage-modal-text-color': string;
  /** Фон модального окна */
  '--chotto-callmessage-modal-background-color': string;
  /** Радиус модального окна */
  '--chotto-callmessage-modal-border-radius': string;
  /** Отступы модального окна */
  '--chotto-callmessage-modal-padding': string;
  /** Тень модального окна */
  '--chotto-callmessage-modal-overlay-shadow': string;
  /** Цвет фона скроллбара модального окна */
  '--chotto-callmessage-modal-scrollbar-bg': string;
  /** Цвет ползунка скроллбара модального окна */
  '--chotto-callmessage-modal-scrollbar-thumb-bg': string;
  /** Цвет маски оверлея модального окна */
  '--chotto-callmessage-modal-mask-background': string;
  /** Цвет иконки кнопки закрытия модального окна */
  '--chotto-callmessage-modal-close-button-icon-color': string;
  /** Размер иконки кнопки закрытия модального окна */
  '--chotto-callmessage-modal-close-button-icon-size': string;
  /** Цвет иконки кнопки меню */
  '--chotto-callmessage-menu-button-icon-color': string;
  /** Размер иконки кнопки меню */
  '--chotto-callmessage-menu-button-icon-size': string;
  /** Цвет иконки кнопки меню при наведении */
  '--chotto-callmessage-menu-button-icon-color-hover': string;
}


