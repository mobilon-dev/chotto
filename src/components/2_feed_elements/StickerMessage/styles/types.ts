/**
 * CSS variables for StickerMessage component
 */
export interface StickerMessageThemeCSSVariables {
  /** Позиционирование контейнера контента стикера */
  '--chotto-stickermessage-content-position': string;
  /** Максимальная ширина контейнера контента стикера */
  '--chotto-stickermessage-content-max-width': string;
  /** Скругление контейнера контента стикера */
  '--chotto-stickermessage-content-border-radius': string;

  /** Ряд грида аватара */
  '--chotto-stickermessage-avatar-grid-row': string;
  /** Выравнивание аватара относительно себя */
  '--chotto-stickermessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-stickermessage-avatar-object-fit': string;
  /** Отступ снизу аватара */
  '--chotto-stickermessage-avatar-margin-bottom': string;
  /** Минимальная ширина аватара */
  '--chotto-stickermessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-stickermessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-stickermessage-avatar-border-radius': string;

  /** Позиционирование контейнера информации */
  '--chotto-stickermessage-info-container-position': string;
  /** Отступ контейнера информации справа */
  '--chotto-stickermessage-info-container-right': string;
  /** Отступ контейнера информации снизу */
  '--chotto-stickermessage-info-container-bottom': string;
  /** Отображение контейнера информации */
  '--chotto-stickermessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации */
  '--chotto-stickermessage-info-container-align-items': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-stickermessage-info-container-column-gap': string;
  /** Скругление контейнера информации */
  '--chotto-stickermessage-info-container-border-radius': string;
  /** Внутренние отступы контейнера информации */
  '--chotto-stickermessage-info-container-padding': string;
  /** Цвет текста/иконок контейнера информации */
  '--chotto-stickermessage-info-container-color': string;
  /** Цвет фона контейнера информации */
  '--chotto-stickermessage-info-container-background-color': string;

  /** Позиционирование кнопки скачивания */
  '--chotto-stickermessage-download-button-position': string;
  /** Отступ кнопки скачивания слева */
  '--chotto-stickermessage-download-button-left': string;
  /** Отступ кнопки скачивания снизу */
  '--chotto-stickermessage-download-button-bottom': string;
  /** Отображение кнопки скачивания */
  '--chotto-stickermessage-download-button-display': string;
  /** Выравнивание содержимого кнопки по главной оси */
  '--chotto-stickermessage-download-button-justify-content': string;
  /** Выравнивание содержимого кнопки по поперечной оси */
  '--chotto-stickermessage-download-button-align-items': string;
  /** Граница кнопки скачивания */
  '--chotto-stickermessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-stickermessage-download-button-border-radius': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-stickermessage-download-button-padding': string;
  /** Цвет фона кнопки скачивания */
  '--chotto-stickermessage-download-button-background-color': string;
  /** Курсор кнопки скачивания */
  '--chotto-stickermessage-download-button-cursor': string;
  /** Цвет текста/иконки внутри кнопки */
  '--chotto-stickermessage-download-button-span-color': string;
  /** Размер текста/иконки внутри кнопки */
  '--chotto-stickermessage-download-button-span-font-size': string;

  /** Отображение блока просмотров */
  '--chotto-stickermessage-views-display': string;
  /** Выравнивание элементов блока просмотров */
  '--chotto-stickermessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-stickermessage-views-column-gap': string;
  /** Курсор при наведении на блок просмотров */
  '--chotto-stickermessage-views-cursor': string;
  /** Размер иконки просмотров */
  '--chotto-stickermessage-views-span-font-size': string;
  /** Размер текста количества просмотров */
  '--chotto-stickermessage-views-p-font-size': string;

  /** Размер шрифта времени */
  '--chotto-stickermessage-time-font-size': string;

  /** Отображение статуса доставки/прочтения */
  '--chotto-stickermessage-status-display': string;
  /** Размер иконок статуса */
  '--chotto-stickermessage-status-span-font-size': string;
  /** Отрицательный отступ для иконки "доставлено" */
  '--chotto-stickermessage-status-received-first-child-margin-right': string;
  /** Отрицательный отступ для иконки "прочитано" */
  '--chotto-stickermessage-status-read-first-child-margin-right': string;
  /** Цвет иконок статуса "прочитано" */
  '--chotto-stickermessage-status-read-color': string;
  /** Цвет иконок статуса "в ожидании" */
  '--chotto-stickermessage-status-pending-color': string;
  /** Цвет иконок статуса "ошибка" */
  '--chotto-stickermessage-status-error-color': string;

  /** Размер шрифта подписи */
  '--chotto-stickermessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-stickermessage-subtext-color': string;

  /** Позиционирование кнопки превью */
  '--chotto-stickermessage-preview-button-position': string;
  /** Отображение кнопки превью */
  '--chotto-stickermessage-preview-button-display': string;
  /** Направление флекс-контейнера кнопки превью */
  '--chotto-stickermessage-preview-button-flex-direction': string;
  /** Внутренние отступы кнопки превью */
  '--chotto-stickermessage-preview-button-padding': string;

  /** Ширина превью-стикера */
  '--chotto-stickermessage-preview-image-width': string;
  /** Высота превью-стикера */
  '--chotto-stickermessage-preview-image-height': string;
  /** Максимальная ширина превью-стикера */
  '--chotto-stickermessage-preview-image-max-width': string;
  /** Максимальная высота превью-стикера */
  '--chotto-stickermessage-preview-image-max-height': string;
  /** Курсор при наведении на превью */
  '--chotto-stickermessage-preview-image-cursor': string;
  /** Вписывание изображения стикера */
  '--chotto-stickermessage-preview-image-object-fit': string;

  /** Ширина анимированного превью-стикера (TGS) */
  '--chotto-stickermessage-preview-image-animated-width': string;
  /** Высота анимированного превью-стикера (TGS) */
  '--chotto-stickermessage-preview-image-animated-height': string;
  /** Максимальная ширина анимированного превью-стикера (TGS) */
  '--chotto-stickermessage-preview-image-animated-max-width': string;
  /** Максимальная высота анимированного превью-стикера (TGS) */
  '--chotto-stickermessage-preview-image-animated-max-height': string;
  /** Курсор при наведении на анимированное превью (TGS) */
  '--chotto-stickermessage-preview-image-animated-cursor': string;
  /** Вписывание анимированного изображения стикера (TGS) */
  '--chotto-stickermessage-preview-image-animated-object-fit': string;

  /** Позиционирование кнопки меню сообщения */
  '--chotto-stickermessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-stickermessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-stickermessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-stickermessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-stickermessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-stickermessage-menu-button-transition': string;
  /** Цвет иконки внутри кнопки меню */
  '--chotto-stickermessage-menu-button-span-color': string;
  /** Размер иконки внутри кнопки меню */
  '--chotto-stickermessage-menu-button-span-font-size': string;
  /** Цвет иконки при наведении */
  '--chotto-stickermessage-menu-button-span-hover-color': string;
  /** Переход при наведении */
  '--chotto-stickermessage-menu-button-hover-transition': string;

  /** Позиционирование контекстного меню */
  '--chotto-stickermessage-context-menu-position': string;

  /** Внутренние отступы контейнера текста */
  '--chotto-stickermessage-text-container-padding': string;
  /** Скругление контейнера текста */
  '--chotto-stickermessage-text-container-border-radius': string;
  /** Перенос слов в контейнере текста */
  '--chotto-stickermessage-text-container-word-wrap': string;
  /** Размер шрифта абзаца текста */
  '--chotto-stickermessage-text-container-p-font-size': string;
  /** Перенос слов в абзаце текста */
  '--chotto-stickermessage-text-container-p-word-break': string;

  /** Внешние отступы блока превью ссылки */
  '--chotto-stickermessage-link-preview-margin': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-stickermessage-left-right-display': string;
  /** Шаблон строк грида для лево/право */
  '--chotto-stickermessage-left-right-grid-template-rows': string;
  /** Внешние отступы общего контейнера */
  '--chotto-stickermessage-left-right-margin': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-stickermessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-stickermessage-left-avatar-grid-column': string;
  /** Отступ справа от аватара слева */
  '--chotto-stickermessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-stickermessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-stickermessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-stickermessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-stickermessage-left-content-grid-column': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-stickermessage-left-content-with-avatar-indent-margin-left': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-stickermessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-stickermessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-stickermessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-stickermessage-left-context-menu-left': string;
  /** Отступ контекстного меню слева сверху */
  '--chotto-stickermessage-left-context-menu-margin-top': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-stickermessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-stickermessage-right-avatar-grid-column': string;
  /** Отступ слева от аватара справа */
  '--chotto-stickermessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-stickermessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-stickermessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-stickermessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-stickermessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-stickermessage-right-content-margin-left': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-stickermessage-right-content-with-avatar-indent-margin-right': string;
  /** Отступ текстового контейнера справа */
  '--chotto-stickermessage-right-text-container-margin-left': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-stickermessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-stickermessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-stickermessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-stickermessage-right-context-menu-right': string;
  /** Отступ контекстного меню справа сверху */
  '--chotto-stickermessage-right-context-menu-margin-top': string;

  /** Переход появления контекстного меню */
  '--chotto-stickermessage-context-menu-enter-active-transition': string;
  /** Переход скрытия контекстного меню */
  '--chotto-stickermessage-context-menu-leave-active-transition': string;
  /** Стартовая трансформация контекстного меню */
  '--chotto-stickermessage-context-menu-enter-from-transform': string;
  /** Стартовая прозрачность контекстного меню */
  '--chotto-stickermessage-context-menu-enter-from-opacity': string;
  /** Переход появления модального окна */
  '--chotto-stickermessage-modal-fade-enter-active-transition': string;
  /** Прозрачность модального окна в начале */
  '--chotto-stickermessage-modal-fade-enter-from-opacity': string;
  /** Прозрачность модального окна в конце */
  '--chotto-stickermessage-modal-fade-enter-to-opacity': string;
}


