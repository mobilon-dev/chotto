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

  /** Шаблон колонок правой раскладки */
  '--chotto-callmessage-right-grid-template-columns': string;
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
  /** Цвет текста времени */
  '--chotto-callmessage-time-text-color': string;
  /** Размер шрифта времени */
  '--chotto-callmessage-time-font-size': string;
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


