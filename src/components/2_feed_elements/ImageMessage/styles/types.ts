/**
 * CSS variables for ImageMessage component
 */
export interface ImageMessageThemeCSSVariables {
  /** Позиционирование контейнера контента изображения */
  '--chotto-imagemessage-content-position': string;
  /** Максимальная ширина контейнера контента изображения */
  '--chotto-imagemessage-content-max-width': string;
  /** Скругление контейнера контента изображения */
  '--chotto-imagemessage-content-border-radius': string;

  /** Ряд грида аватара */
  '--chotto-imagemessage-avatar-grid-row': string;
  /** Выравнивание аватара относительно себя */
  '--chotto-imagemessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-imagemessage-avatar-object-fit': string;
  /** Отступ снизу аватара */
  '--chotto-imagemessage-avatar-margin-bottom': string;
  /** Минимальная ширина аватара */
  '--chotto-imagemessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-imagemessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-imagemessage-avatar-border-radius': string;

  /** Позиционирование контейнера информации */
  '--chotto-imagemessage-info-container-position': string;
  /** Отступ контейнера информации справа */
  '--chotto-imagemessage-info-container-right': string;
  /** Отступ контейнера информации снизу */
  '--chotto-imagemessage-info-container-bottom': string;
  /** Отображение контейнера информации */
  '--chotto-imagemessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации */
  '--chotto-imagemessage-info-container-align-items': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-imagemessage-info-container-column-gap': string;
  /** Скругление контейнера информации */
  '--chotto-imagemessage-info-container-border-radius': string;
  /** Внутренние отступы контейнера информации */
  '--chotto-imagemessage-info-container-padding': string;
  /** Цвет текста/иконок контейнера информации */
  '--chotto-imagemessage-info-container-color': string;
  /** Цвет фона контейнера информации */
  '--chotto-imagemessage-info-container-background-color': string;

  /** Позиционирование кнопки скачивания */
  '--chotto-imagemessage-download-button-position': string;
  /** Отступ кнопки скачивания слева */
  '--chotto-imagemessage-download-button-left': string;
  /** Отступ кнопки скачивания снизу */
  '--chotto-imagemessage-download-button-bottom': string;
  /** Отображение кнопки скачивания */
  '--chotto-imagemessage-download-button-display': string;
  /** Выравнивание содержимого кнопки по главной оси */
  '--chotto-imagemessage-download-button-justify-content': string;
  /** Выравнивание содержимого кнопки по поперечной оси */
  '--chotto-imagemessage-download-button-align-items': string;
  /** Граница кнопки скачивания */
  '--chotto-imagemessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-imagemessage-download-button-border-radius': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-imagemessage-download-button-padding': string;
  /** Цвет фона кнопки скачивания */
  '--chotto-imagemessage-download-button-background-color': string;
  /** Курсор кнопки скачивания */
  '--chotto-imagemessage-download-button-cursor': string;
  /** Цвет текста/иконки внутри кнопки */
  '--chotto-imagemessage-download-button-span-color': string;
  /** Размер текста/иконки внутри кнопки */
  '--chotto-imagemessage-download-button-span-font-size': string;

  /** Отображение блока просмотров */
  '--chotto-imagemessage-views-display': string;
  /** Выравнивание элементов блока просмотров */
  '--chotto-imagemessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-imagemessage-views-column-gap': string;
  /** Курсор при наведении на блок просмотров */
  '--chotto-imagemessage-views-cursor': string;
  /** Размер иконки просмотров */
  '--chotto-imagemessage-views-span-font-size': string;
  /** Размер текста количества просмотров */
  '--chotto-imagemessage-views-p-font-size': string;

  /** Размер шрифта времени */
  '--chotto-imagemessage-time-font-size': string;

  /** Отображение статуса доставки/прочтения */
  '--chotto-imagemessage-status-display': string;
  /** Размер иконок статуса */
  '--chotto-imagemessage-status-span-font-size': string;
  /** Отрицательный отступ для иконки "доставлено" */
  '--chotto-imagemessage-status-received-first-child-margin-right': string;
  /** Отрицательный отступ для иконки "прочитано" */
  '--chotto-imagemessage-status-read-first-child-margin-right': string;
  /** Цвет иконок статуса "прочитано" */
  '--chotto-imagemessage-status-read-color': string;
  /** Цвет иконок статуса "в ожидании" */
  '--chotto-imagemessage-status-pending-color': string;
  /** Цвет иконок статуса "ошибка" */
  '--chotto-imagemessage-status-error-color': string;

  /** Размер шрифта подписи */
  '--chotto-imagemessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-imagemessage-subtext-color': string;

  /** Позиционирование кнопки превью */
  '--chotto-imagemessage-preview-button-position': string;
  /** Отображение кнопки превью */
  '--chotto-imagemessage-preview-button-display': string;
  /** Направление флекс-контейнера кнопки превью */
  '--chotto-imagemessage-preview-button-flex-direction': string;
  /** Внутренние отступы кнопки превью */
  '--chotto-imagemessage-preview-button-padding': string;

  /** Ширина превью-изображения */
  '--chotto-imagemessage-preview-image-width': string;
  /** Максимальная высота превью-изображения */
  '--chotto-imagemessage-preview-image-max-height': string;
  /** Курсор при наведении на превью */
  '--chotto-imagemessage-preview-image-cursor': string;

  /** Высота изображения в модальном окне */
  '--chotto-imagemessage-modal-image-height': string;
  /** Вписывание изображения в модальном окне */
  '--chotto-imagemessage-modal-image-object-fit': string;
  /** Скругление изображения в модальном окне */
  '--chotto-imagemessage-modal-image-border-radius': string;
  /** Максимальная высота изображения в модальном окне */
  '--chotto-imagemessage-modal-image-max-height': string;
  /** Максимальная ширина изображения в модальном окне */
  '--chotto-imagemessage-modal-image-max-width': string;

  /** Позиционирование кнопки меню сообщения */
  '--chotto-imagemessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-imagemessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-imagemessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-imagemessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-imagemessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-imagemessage-menu-button-transition': string;
  /** Цвет иконки внутри кнопки меню */
  '--chotto-imagemessage-menu-button-span-color': string;
  /** Размер иконки внутри кнопки меню */
  '--chotto-imagemessage-menu-button-span-font-size': string;
  /** Цвет иконки при наведении */
  '--chotto-imagemessage-menu-button-span-hover-color': string;
  /** Переход при наведении */
  '--chotto-imagemessage-menu-button-hover-transition': string;

  /** Позиционирование контекстного меню */
  '--chotto-imagemessage-context-menu-position': string;

  /** Внутренние отступы контейнера текста */
  '--chotto-imagemessage-text-container-padding': string;
  /** Скругление контейнера текста */
  '--chotto-imagemessage-text-container-border-radius': string;
  /** Перенос слов в контейнере текста */
  '--chotto-imagemessage-text-container-word-wrap': string;
  /** Размер шрифта абзаца текста */
  '--chotto-imagemessage-text-container-p-font-size': string;
  /** Перенос слов в абзаце текста */
  '--chotto-imagemessage-text-container-p-word-break': string;

  /** Внешние отступы блока превью ссылки */
  '--chotto-imagemessage-link-preview-margin': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-imagemessage-left-right-display': string;
  /** Шаблон строк грида для лево/право */
  '--chotto-imagemessage-left-right-grid-template-rows': string;
  /** Внешние отступы общего контейнера */
  '--chotto-imagemessage-left-right-margin': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-imagemessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-imagemessage-left-avatar-grid-column': string;
  /** Отступ справа от аватара слева */
  '--chotto-imagemessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-imagemessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-imagemessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-imagemessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-imagemessage-left-content-grid-column': string;
  /** Фон пузыря слева */
  '--chotto-imagemessage-left-bg': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-imagemessage-left-content-with-avatar-indent-margin-left': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-imagemessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-imagemessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-imagemessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-imagemessage-left-context-menu-left': string;
  /** Отступ контекстного меню слева сверху */
  '--chotto-imagemessage-left-context-menu-margin-top': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-imagemessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-imagemessage-right-avatar-grid-column': string;
  /** Отступ слева от аватара справа */
  '--chotto-imagemessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-imagemessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-imagemessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-imagemessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-imagemessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-imagemessage-right-content-margin-left': string;
  /** Фон пузыря справа */
  '--chotto-imagemessage-right-bg': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-imagemessage-right-content-with-avatar-indent-margin-right': string;
  /** Отступ текстового контейнера справа */
  '--chotto-imagemessage-right-text-container-margin-left': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-imagemessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-imagemessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-imagemessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-imagemessage-right-context-menu-right': string;
  /** Отступ контекстного меню справа сверху */
  '--chotto-imagemessage-right-context-menu-margin-top': string;

  /** Переход появления контекстного меню */
  '--chotto-imagemessage-context-menu-enter-active-transition': string;
  /** Переход скрытия контекстного меню */
  '--chotto-imagemessage-context-menu-leave-active-transition': string;
  /** Стартовая трансформация контекстного меню */
  '--chotto-imagemessage-context-menu-enter-from-transform': string;
  /** Стартовая прозрачность контекстного меню */
  '--chotto-imagemessage-context-menu-enter-from-opacity': string;
  /** Переход появления модального окна */
  '--chotto-imagemessage-modal-fade-enter-active-transition': string;
  /** Прозрачность модального окна в начале */
  '--chotto-imagemessage-modal-fade-enter-from-opacity': string;
  /** Прозрачность модального окна в конце */
  '--chotto-imagemessage-modal-fade-enter-to-opacity': string;
}


