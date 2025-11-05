/**
 * CSS переменные для компонента VideoMessage
 */
export interface VideoMessageThemeCSSVariables {
  /** Позиционирование контейнера контента видео */
  '--chotto-videomessage-content-position': string;
  /** Максимальная ширина контейнера контента видео */
  '--chotto-videomessage-content-max-width': string;
  /** Скругление контейнера контента видео */
  '--chotto-videomessage-content-border-radius': string;

  /** Позиционирование контейнера информации (время/статус/просмотры) */
  '--chotto-videomessage-info-container-position': string;
  /** Отступ контейнера информации снизу */
  '--chotto-videomessage-info-container-bottom': string;
  /** Отступ контейнера информации справа */
  '--chotto-videomessage-info-container-right': string;
  /** Отображение контейнера информации */
  '--chotto-videomessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации по поперечной оси */
  '--chotto-videomessage-info-container-align-items': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-videomessage-info-container-column-gap': string;
  /** Скругление контейнера информации */
  '--chotto-videomessage-info-container-border-radius': string;
  /** Внутренние отступы контейнера информации */
  '--chotto-videomessage-info-container-padding': string;
  /** Цвет фона контейнера информации */
  '--chotto-videomessage-info-container-background-color': string;
  /** Цвет текста/иконок контейнера информации */
  '--chotto-videomessage-info-container-color': string;

  /** Позиционирование кнопки скачивания */
  '--chotto-videomessage-download-button-position': string;
  /** Отступ кнопки скачивания слева */
  '--chotto-videomessage-download-button-left': string;
  /** Отступ кнопки скачивания снизу */
  '--chotto-videomessage-download-button-bottom': string;
  /** Отображение кнопки скачивания */
  '--chotto-videomessage-download-button-display': string;
  /** Выравнивание содержимого кнопки скачивания по главной оси */
  '--chotto-videomessage-download-button-justify-content': string;
  /** Выравнивание содержимого кнопки скачивания по поперечной оси */
  '--chotto-videomessage-download-button-align-items': string;
  /** Граница кнопки скачивания */
  '--chotto-videomessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-videomessage-download-button-border-radius': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-videomessage-download-button-padding': string;
  /** Цвет фона кнопки скачивания */
  '--chotto-videomessage-download-button-background-color': string;
  /** Курсор кнопки скачивания */
  '--chotto-videomessage-download-button-cursor': string;
  /** Цвет текста/иконки внутри кнопки скачивания */
  '--chotto-videomessage-download-button-span-color': string;
  /** Размер иконки/текста внутри кнопки скачивания */
  '--chotto-videomessage-download-button-span-font-size': string;

  /** Отображение блока просмотров */
  '--chotto-videomessage-views-display': string;
  /** Выравнивание элементов блока просмотров по поперечной оси */
  '--chotto-videomessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-videomessage-views-column-gap': string;
  /** Размер иконки просмотров */
  '--chotto-videomessage-views-span-font-size': string;
  /** Размер текста количества просмотров */
  '--chotto-videomessage-views-p-font-size': string;

  /** Размер шрифта времени сообщения */
  '--chotto-videomessage-time-font-size': string;

  /** Отображение статуса доставки/прочтения */
  '--chotto-videomessage-status-display': string;
  /** Размер иконок статуса */
  '--chotto-videomessage-status-span-font-size': string;
  /** Отрицательный отступ для иконки "доставлено" */
  '--chotto-videomessage-status-received-first-child-margin-right': string;
  /** Цвет иконок статуса "прочитано" */
  '--chotto-videomessage-status-read-color': string;
  /** Отрицательный отступ для иконки "прочитано" */
  '--chotto-videomessage-status-read-first-child-margin-right': string;
  /** Цвет иконок статуса "в ожидании" */
  '--chotto-videomessage-status-pending-color': string;
  /** Цвет иконок статуса "ошибка" */
  '--chotto-videomessage-status-error-color': string;

  /** Ряд грида для аватара */
  '--chotto-videomessage-avatar-grid-row': string;
  /** Выравнивание аватара относительно себя */
  '--chotto-videomessage-avatar-align-self': string;
  /** Отступ снизу аватара */
  '--chotto-videomessage-avatar-margin-bottom': string;
  /** Вписывание изображения аватара */
  '--chotto-videomessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-videomessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-videomessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-videomessage-avatar-border-radius': string;

  /** Вписывание видео */
  '--chotto-videomessage-video-object-fit': string;
  /** Ширина видео */
  '--chotto-videomessage-video-width': string;
  /** Максимальная высота видео */
  '--chotto-videomessage-video-max-height': string;
  /** Тип курсора над видео */
  '--chotto-videomessage-video-cursor': string;

  /** Размер шрифта подписи */
  '--chotto-videomessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-videomessage-subtext-color': string;

  /** Позиционирование кнопки превью */
  '--chotto-videomessage-preview-button-position': string;
  /** Отображение кнопки превью */
  '--chotto-videomessage-preview-button-display': string;
  /** Направление флекс-контейнера кнопки превью */
  '--chotto-videomessage-preview-button-flex-direction': string;

  /** Позиционирование кнопки меню сообщения */
  '--chotto-videomessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-videomessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-videomessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-videomessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-videomessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-videomessage-menu-button-transition': string;
  /** Цвет иконки внутри кнопки меню */
  '--chotto-videomessage-menu-button-span-color': string;
  /** Размер иконки внутри кнопки меню */
  '--chotto-videomessage-menu-button-span-font-size': string;
  /** Цвет иконки при наведении */
  '--chotto-videomessage-menu-button-span-hover-color': string;
  /** Переход при наведении */
  '--chotto-videomessage-menu-button-span-hover-transition': string;

  /** Позиционирование контекстного меню */
  '--chotto-videomessage-context-menu-position': string;

  /** Внутренние отступы контейнера текста */
  '--chotto-videomessage-text-container-padding': string;
  /** Скругление контейнера текста */
  '--chotto-videomessage-text-container-border-radius': string;
  /** Перенос слов в контейнере текста */
  '--chotto-videomessage-text-container-word-wrap': string;
  /** Максимальная ширина контейнера текста */
  '--chotto-videomessage-text-container-max-width': string;
  /** Пробелы в абзаце текста */
  '--chotto-videomessage-text-container-p-white-space': string;
  /** Размер шрифта текста */
  '--chotto-videomessage-text-container-p-font-size': string;

  /** Внешние отступы блока превью ссылки */
  '--chotto-videomessage-link-preview-margin': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-videomessage-left-right-display': string;
  /** Шаблон строк грида для лево/право */
  '--chotto-videomessage-left-right-grid-template-rows': string;
  /** Внешние отступы общего контейнера */
  '--chotto-videomessage-left-right-margin': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-videomessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-videomessage-left-avatar-grid-column': string;
  /** Отступ справа от аватара слева */
  '--chotto-videomessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-videomessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-videomessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-videomessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-videomessage-left-content-grid-column': string;
  /** Фон пузыря слева */
  '--chotto-videomessage-left-bg': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-videomessage-left-content-with-avatar-indent-margin-left': string;
  /** Колонка грида текстового контейнера слева */
  '--chotto-videomessage-left-text-container-grid-column': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-videomessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-videomessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-videomessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-videomessage-left-context-menu-left': string;
  /** Отступ контекстного меню слева сверху */
  '--chotto-videomessage-left-context-menu-margin-top': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-videomessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-videomessage-right-avatar-grid-column': string;
  /** Отступ слева от аватара справа */
  '--chotto-videomessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-videomessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-videomessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-videomessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-videomessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-videomessage-right-content-margin-left': string;
  /** Фон пузыря справа */
  '--chotto-videomessage-right-bg': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-videomessage-right-content-with-avatar-indent-margin-left': string;
  /** Колонка грида текстового контейнера справа */
  '--chotto-videomessage-right-text-container-grid-column': string;
  /** Отступ текстового контейнера справа */
  '--chotto-videomessage-right-text-container-margin-left': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-videomessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-videomessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-videomessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-videomessage-right-context-menu-right': string;
  /** Отступ контекстного меню справа сверху */
  '--chotto-videomessage-right-context-menu-margin-top': string;

  /** Высота видео в модальном окне */
  '--chotto-videomessage-modal-video-height': string;
  /** Вписывание видео в модальном окне */
  '--chotto-videomessage-modal-video-object-fit': string;
  /** Скругление видео в модальном окне */
  '--chotto-videomessage-modal-video-border-radius': string;
  /** Максимальная высота видео в модальном окне */
  '--chotto-videomessage-modal-video-max-height': string;
  /** Максимальная ширина видео в модальном окне */
  '--chotto-videomessage-modal-video-max-width': string;

  /** Переход появления контекстного меню */
  '--chotto-videomessage-context-menu-enter-active-transition': string;
  /** Переход скрытия контекстного меню */
  '--chotto-videomessage-context-menu-leave-active-transition': string;
  /** Стартовая трансформация контекстного меню */
  '--chotto-videomessage-context-menu-enter-from-transform': string;
  /** Стартовая прозрачность контекстного меню */
  '--chotto-videomessage-context-menu-enter-from-opacity': string;

  /** Переход появления модального окна */
  '--chotto-videomessage-modal-fade-enter-active-transition': string;
  /** Прозрачность модального окна в начале */
  '--chotto-videomessage-modal-fade-enter-from-opacity': string;
  /** Прозрачность модального окна в конце */
  '--chotto-videomessage-modal-fade-enter-to-opacity': string;
}


