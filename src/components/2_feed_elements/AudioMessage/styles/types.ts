/**
 * CSS variables for AudioMessage component
 */
export interface AudioMessageThemeCSSVariables {
  /** Цвет фона прогресс-бара-контейнера */
  '--chotto-audiomessage-pbc-background-color': string;
  /** Цвет фона самого прогресс-бара */
  '--chotto-audiomessage-pb-background-color': string;
  /** Цвет разделителя транскрипта */
  '--chotto-audiomessage-transcript-delimiter-color': string;

  /** Позиционирование контейнера контента аудио */
  '--chotto-audiomessage-content-position': string;
  /** Отображение контейнера контента аудио */
  '--chotto-audiomessage-content-display': string;
  /** Шаблон колонок грида */
  '--chotto-audiomessage-content-grid-template-columns': string;
  /** Промежуток между колонками */
  '--chotto-audiomessage-content-column-gap': string;
  /** Ширина контейнера контента */
  '--chotto-audiomessage-content-width': string;
  /** Максимальная ширина контейнера */
  '--chotto-audiomessage-content-max-width': string;
  /** Минимальная ширина контейнера */
  '--chotto-audiomessage-content-min-width': string;
  /** Внутренние отступы контейнера */
  '--chotto-audiomessage-content-padding': string;

  /** Контент псевдоэлемента "хвостик" слева */
  '--chotto-audiomessage-left-arrow-content': string;
  /** Позиционирование хвостика слева */
  '--chotto-audiomessage-left-arrow-position': string;
  /** Смещение хвостика слева по вертикали */
  '--chotto-audiomessage-left-arrow-top': string;
  /** Смещение хвостика слева по горизонтали */
  '--chotto-audiomessage-left-arrow-left': string;
  /** Ширина хвостика слева */
  '--chotto-audiomessage-left-arrow-width': string;
  /** Высота хвостика слева */
  '--chotto-audiomessage-left-arrow-height': string;
  /** Базовая рамка хвостика слева */
  '--chotto-audiomessage-left-arrow-border': string;
  /** Верхняя часть рамки хвостика слева (цвет пузыря) */
  '--chotto-audiomessage-left-arrow-border-top': string;
  /** Слой псевдоэлемента слева */
  '--chotto-audiomessage-left-arrow-z-index': string;

  /** Контент псевдоэлемента "хвостик" справа */
  '--chotto-audiomessage-right-arrow-content': string;
  /** Позиционирование хвостика справа */
  '--chotto-audiomessage-right-arrow-position': string;
  /** Смещение хвостика справа по вертикали */
  '--chotto-audiomessage-right-arrow-top': string;
  /** Смещение хвостика справа по горизонтали */
  '--chotto-audiomessage-right-arrow-right': string;
  /** Ширина хвостика справа */
  '--chotto-audiomessage-right-arrow-width': string;
  /** Высота хвостика справа */
  '--chotto-audiomessage-right-arrow-height': string;
  /** Базовая рамка хвостика справа */
  '--chotto-audiomessage-right-arrow-border': string;
  /** Верхняя часть рамки хвостика справа (цвет пузыря) */
  '--chotto-audiomessage-right-arrow-border-top': string;
  /** Слой псевдоэлемента справа */
  '--chotto-audiomessage-right-arrow-z-index': string;

  /** Позиционирование контейнера аудио-плеера */
  '--chotto-audiomessage-audio-container-position': string;
  /** Отображение контейнера аудио-плеера */
  '--chotto-audiomessage-audio-container-display': string;
  /** Шаблон колонок грида плеера */
  '--chotto-audiomessage-audio-container-grid-template-columns': string;
  /** Промежуток между колонками плеера */
  '--chotto-audiomessage-audio-container-column-gap': string;
  /** Максимальная ширина контейнера плеера */
  '--chotto-audiomessage-audio-container-max-width': string;
  /** Скругление контейнера плеера */
  '--chotto-audiomessage-audio-container-border-radius': string;
  /** Внутренние отступы контейнера плеера */
  '--chotto-audiomessage-audio-container-padding': string;
  /** Захват двух колонок в сетке */
  '--chotto-audiomessage-audio-container-grid-column': string;

  /** Граница кнопки play/pause */
  '--chotto-audiomessage-play-pause-border': string;
  /** Курсор кнопки play/pause */
  '--chotto-audiomessage-play-pause-cursor': string;
  /** Позиционирование кнопки play/pause */
  '--chotto-audiomessage-play-pause-position': string;
  /** Ряд грида кнопки play/pause */
  '--chotto-audiomessage-play-pause-grid-row': string;
  /** Ширина кнопки play/pause */
  '--chotto-audiomessage-play-pause-width': string;
  /** Высота кнопки play/pause */
  '--chotto-audiomessage-play-pause-height': string;
  /** Скругление кнопки play/pause */
  '--chotto-audiomessage-play-pause-border-radius': string;

  /** Отображение иконки play/pause */
  '--chotto-audiomessage-play-pause-span-display': string;
  /** Позиционирование иконки play/pause */
  '--chotto-audiomessage-play-pause-span-position': string;
  /** Смещение иконки сверху */
  '--chotto-audiomessage-play-pause-span-top': string;
  /** Смещение иконки слева */
  '--chotto-audiomessage-play-pause-span-left': string;
  /** Трансформация для центрирования иконки */
  '--chotto-audiomessage-play-pause-span-transform': string;

  /** Внешний вид прогресс-бара (webkit) */
  '--chotto-audiomessage-progress-bar-webkit-appearance': string;
  /** Внешний вид прогресс-бара */
  '--chotto-audiomessage-progress-bar-appearance': string;
  /** Курсор над прогресс-баром */
  '--chotto-audiomessage-progress-bar-cursor': string;
  /** Высота прогресс-бара */
  '--chotto-audiomessage-progress-bar-height': string;
  /** Переполнение прогресс-бара */
  '--chotto-audiomessage-progress-bar-overflow': string;
  /** Скругление прогресс-бара */
  '--chotto-audiomessage-progress-bar-border-radius': string;
  /** Отступ сверху прогресс-бара */
  '--chotto-audiomessage-progress-bar-margin-top': string;
  /** Отступ слева прогресс-бара */
  '--chotto-audiomessage-progress-bar-margin-left': string;

  /** Ширина бегунка прогресс-бара */
  '--chotto-audiomessage-progress-bar-thumb-width': string;
  /** Высота бегунка прогресс-бара */
  '--chotto-audiomessage-progress-bar-thumb-height': string;
  /** Внешний вид бегунка */
  '--chotto-audiomessage-progress-bar-thumb-appearance': string;
  /** Граница бегунка */
  '--chotto-audiomessage-progress-bar-thumb-border': string;
  /** Скругление бегунка */
  '--chotto-audiomessage-progress-bar-thumb-border-radius': string;
  /** Тень бегунка (для заливки полосы) */
  '--chotto-audiomessage-progress-bar-thumb-box-shadow': string;

  /** Отображение блока управления плеером */
  '--chotto-audiomessage-player-controls-display': string;
  /** Выравнивание элементов управления плеером */
  '--chotto-audiomessage-player-controls-justify-content': string;

  /** Отображение контейнера кнопок скорости */
  '--chotto-audiomessage-speed-btn-container-display': string;
  /** Промежуток между кнопками скорости */
  '--chotto-audiomessage-speed-btn-container-gap': string;
  /** Отступ справа контейнера кнопок скорости */
  '--chotto-audiomessage-speed-btn-container-margin-right': string;

  /** Цвет фона кнопки скорости */
  '--chotto-audiomessage-speed-btn-background-color': string;
  /** Граница кнопки скорости */
  '--chotto-audiomessage-speed-btn-border': string;
  /** Ширина кнопки скорости */
  '--chotto-audiomessage-speed-btn-width': string;
  /** Толщина шрифта кнопки скорости */
  '--chotto-audiomessage-speed-btn-font-weight': string;
  /** Курсор при наведении на кнопку скорости */
  '--chotto-audiomessage-speed-btn-hover-cursor': string;
  /** Толщина шрифта при наведении */
  '--chotto-audiomessage-speed-btn-hover-font-weight': string;
  /** Толщина шрифта выбранной кнопки */
  '--chotto-audiomessage-speed-btn-selected-font-weight': string;

  /** Колонка грида оставшегося времени */
  '--chotto-audiomessage-remaining-time-grid-column': string;
  /** Отступ снизу у оставшегося времени */
  '--chotto-audiomessage-remaining-time-margin-bottom': string;
  /** Высота контейнера оставшегося времени */
  '--chotto-audiomessage-remaining-time-height': string;

  /** Выравнивание аватара */
  '--chotto-audiomessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-audiomessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-audiomessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-audiomessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-audiomessage-avatar-border-radius': string;

  /** Колонка грида инфо-контейнера */
  '--chotto-audiomessage-info-container-grid-column': string;
  /** Отступ слева у инфо-контейнера */
  '--chotto-audiomessage-info-container-margin-left': string;
  /** Отображение инфо-контейнера */
  '--chotto-audiomessage-info-container-display': string;
  /** Выравнивание элементов инфо-контейнера */
  '--chotto-audiomessage-info-container-align-items': string;
  /** Промежуток между элементами инфо-контейнера */
  '--chotto-audiomessage-info-container-column-gap': string;

  /** Позиционирование кнопки скачивания */
  '--chotto-audiomessage-download-button-position': string;
  /** Отступ справа кнопки скачивания */
  '--chotto-audiomessage-download-button-right': string;
  /** Отступ сверху кнопки скачивания */
  '--chotto-audiomessage-download-button-top': string;
  /** Отображение кнопки скачивания */
  '--chotto-audiomessage-download-button-display': string;
  /** Выравнивание содержимого кнопки по главной оси */
  '--chotto-audiomessage-download-button-justify-content': string;
  /** Выравнивание содержимого кнопки по поперечной оси */
  '--chotto-audiomessage-download-button-align-items': string;
  /** Граница кнопки скачивания */
  '--chotto-audiomessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-audiomessage-download-button-border-radius': string;
  /** Прозрачный фон кнопки скачивания */
  '--chotto-audiomessage-download-button-background-color': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-audiomessage-download-button-padding': string;
  /** Курсор кнопки скачивания */
  '--chotto-audiomessage-download-button-cursor': string;

  /** Отображение статуса */
  '--chotto-audiomessage-status-display': string;

  /** Отображение блока просмотров */
  '--chotto-audiomessage-views-display': string;
  /** Выравнивание элементов блока просмотров */
  '--chotto-audiomessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-audiomessage-views-column-gap': string;

  /** Позиционирование кнопки меню */
  '--chotto-audiomessage-menu-button-position': string;
  /** Фон кнопки меню */
  '--chotto-audiomessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-audiomessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-audiomessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-audiomessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-audiomessage-menu-button-transition': string;

  /** Позиционирование контекстного меню */
  '--chotto-audiomessage-context-menu-position': string;

  /** Колонка грида текстового контейнера */
  '--chotto-audiomessage-text-container-grid-column': string;
  /** Перенос слов в текстовом контейнере */
  '--chotto-audiomessage-text-container-word-wrap': string;
  /** Максимальная ширина текстового контейнера */
  '--chotto-audiomessage-text-container-max-width': string;

  /** Колонка грида превью ссылки */
  '--chotto-audiomessage-link-preview-grid-column': string;

  /** Позиционирование контейнера транскрипта */
  '--chotto-audiomessage-transcript-container-position': string;
  /** Левый внутренний отступ транскрипта */
  '--chotto-audiomessage-transcript-container-padding-left': string;
  /** Отступ снизу транскрипта */
  '--chotto-audiomessage-transcript-container-margin-bottom': string;
  /** Курсор транскрипта */
  '--chotto-audiomessage-transcript-container-cursor': string;
  /** Запрет выделения текста транскрипта */
  '--chotto-audiomessage-transcript-container-user-select': string;

  /** Контент псевдоэлемента разделителя */
  '--chotto-audiomessage-transcript-delimiter-content': string;
  /** Позиционирование разделителя */
  '--chotto-audiomessage-transcript-delimiter-position': string;
  /** Смещение сверху разделителя */
  '--chotto-audiomessage-transcript-delimiter-top': string;
  /** Смещение слева разделителя */
  '--chotto-audiomessage-transcript-delimiter-left': string;
  /** Трансформация разделителя по Y */
  '--chotto-audiomessage-transcript-delimiter-transform': string;
  /** Ширина разделителя */
  '--chotto-audiomessage-transcript-delimiter-width': string;
  /** Высота разделителя */
  '--chotto-audiomessage-transcript-delimiter-height': string;
  /** Скругление разделителя */
  '--chotto-audiomessage-transcript-delimiter-border-radius': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-audiomessage-left-right-display': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-audiomessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-audiomessage-left-avatar-grid-column': string;
  /** Ряд грида аватара слева */
  '--chotto-audiomessage-left-avatar-grid-row': string;
  /** Отступ справа от аватара слева */
  '--chotto-audiomessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-audiomessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-audiomessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-audiomessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-audiomessage-left-content-grid-column': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-audiomessage-left-content-avatar-indent-margin-left': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-audiomessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-audiomessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-audiomessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-audiomessage-left-context-menu-left': string;
  /** Отступ контекстного меню слева сверху */
  '--chotto-audiomessage-left-context-menu-margin-top': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-audiomessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-audiomessage-right-avatar-grid-column': string;
  /** Ряд грида аватара справа */
  '--chotto-audiomessage-right-avatar-grid-row': string;
  /** Отступ слева от аватара справа */
  '--chotto-audiomessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-audiomessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-audiomessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-audiomessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-audiomessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-audiomessage-right-content-margin-left': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-audiomessage-right-content-avatar-indent-margin-right': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-audiomessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-audiomessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-audiomessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-audiomessage-right-context-menu-right': string;
  /** Отступ контекстного меню справа сверху */
  '--chotto-audiomessage-right-context-menu-margin-top': string;

  /** Позиционирование модального окна */
  '--chotto-audiomessage-modal-position': string;
  /** Отступ сверху модального окна */
  '--chotto-audiomessage-modal-top': string;
  /** Отступ слева модального окна */
  '--chotto-audiomessage-modal-left': string;
  /** Трансформация модального окна */
  '--chotto-audiomessage-modal-transform': string;
  /** Слой модального окна */
  '--chotto-audiomessage-modal-z-index': string;
  /** Максимальная ширина модального окна */
  '--chotto-audiomessage-modal-max-width': string;

  /** Позиционирование оверлея */
  '--chotto-audiomessage-modal-overlay-position': string;
  /** Отступ сверху оверлея */
  '--chotto-audiomessage-modal-overlay-top': string;
  /** Отступ слева оверлея */
  '--chotto-audiomessage-modal-overlay-left': string;
  /** Отступ справа оверлея */
  '--chotto-audiomessage-modal-overlay-right': string;
  /** Отступ снизу оверлея */
  '--chotto-audiomessage-modal-overlay-bottom': string;
  /** Слой оверлея */
  '--chotto-audiomessage-modal-overlay-z-index': string;

  /** Отображение кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-display': string;
  /** Фон кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-background-color': string;
  /** Граница кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-border': string;
  /** Внутренние отступы кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-padding': string;
  /** Внешние отступы кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-margin': string;
  /** Курсор кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-cursor': string;

  /** Переход появления/скрытия */
  '--chotto-audiomessage-v-enter-active-transition': string;
  /** Переход скрытия */
  '--chotto-audiomessage-v-leave-active-transition': string;
  /** Стартовая трансформация при появлении/скрытии */
  '--chotto-audiomessage-v-enter-leave-transform': string;
  /** Стартовая прозрачность при появлении/скрытии */
  '--chotto-audiomessage-v-enter-leave-opacity': string;
  /** Переход модального окна */
  '--chotto-audiomessage-modal-fade-transition': string;
  /** Прозрачность модального окна */
  '--chotto-audiomessage-modal-fade-opacity': string;
  /** Скругление контейнера контента */
  '--chotto-audiomessage-content-border-radius': string;
  /** Цвет фона левого пузыря */
  '--chotto-audiomessage-left-background-color': string;
  /** Цвет фона правого пузыря */
  '--chotto-audiomessage-right-background-color': string;
  /** Цвет фона иконки типа сообщения (play/pause) */
  '--chotto-audiomessage-type-icon-background-color': string;
  /** Размер иконки типа сообщения (play/pause) */
  '--chotto-audiomessage-type-icon-font-size': string;
  /** Цвет иконки типа сообщения (play/pause) */
  '--chotto-audiomessage-type-icon-color': string;
  /** Размер шрифта кнопки скорости */
  '--chotto-audiomessage-speed-btn-font-size': string;
  /** Размер шрифта оставшегося времени */
  '--chotto-audiomessage-remaining-time-font-size': string;
  /** Размер шрифта подписи */
  '--chotto-audiomessage-subtext-font-size': string;
  /** Цвет текста подписи */
  '--chotto-audiomessage-subtext-text-color': string;
  /** Цвет иконки кнопки скачивания */
  '--chotto-audiomessage-download-button-icon-color': string;
  /** Размер иконки кнопки скачивания */
  '--chotto-audiomessage-download-button-icon-size': string;
  /** Цвет статуса доставлено */
  '--chotto-audiomessage-status-color-received': string;
  /** Цвет статуса прочитано */
  '--chotto-audiomessage-status-color-read': string;
  /** Цвет статуса в ожидании */
  '--chotto-audiomessage-status-color-pending': string;
  /** Цвет статуса ошибка */
  '--chotto-audiomessage-status-color-error': string;
  /** Размер малого текста-иконки */
  '--chotto-audiomessage-small-text-icon-size': string;
  /** Цвет иконки/текста (span) просмотров */
  '--chotto-audiomessage-views-icon-text-color': string;
  /** Размер малого текста (p) просмотров */
  '--chotto-audiomessage-small-text-font-size': string;
  /** Цвет малого текста (p) просмотров */
  '--chotto-audiomessage-views-text-color': string;
  /** Размер шрифта времени */
  '--chotto-audiomessage-time-font-size': string;
  /** Цвет текста времени */
  '--chotto-audiomessage-time-text-color': string;
  /** Цвет иконки кнопки меню */
  '--chotto-audiomessage-menu-button-icon-color': string;
  /** Размер иконки кнопки меню */
  '--chotto-audiomessage-menu-button-icon-size': string;
  /** Цвет иконки кнопки меню при наведении */
  '--chotto-audiomessage-menu-button-icon-color-hover': string;
  /** Размер шрифта в текстовом контейнере */
  '--chotto-audiomessage-text-font-size': string;
  /** Цвет текста транскрипта */
  '--chotto-audiomessage-transcript-text-color': string;
  /** Внешний отступ общего контейнера */
  '--chotto-audiomessage-message-margin': string;
  /** Семейство шрифта модального окна */
  '--chotto-audiomessage-modal-font-family': string;
  /** Жирность шрифта модального окна */
  '--chotto-audiomessage-modal-font-weight': string;
  /** Размер шрифта модального окна */
  '--chotto-audiomessage-modal-font-size': string;
  /** Цвет текста модального окна */
  '--chotto-audiomessage-modal-text-color': string;
  /** Фон модального окна */
  '--chotto-audiomessage-modal-background-color': string;
  /** Радиус модального окна */
  '--chotto-audiomessage-modal-border-radius': string;
  /** Отступы модального окна */
  '--chotto-audiomessage-modal-padding': string;
  /** Тень модального окна */
  '--chotto-audiomessage-modal-overlay-shadow': string;
  /** Размер шрифта заголовка модала */
  '--chotto-audiomessage-modal-title-font-size': string;
  /** Цвет маски оверлея */
  '--chotto-audiomessage-modal-mask-background': string;
  /** Цвет иконки кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-icon-color': string;
  /** Размер иконки кнопки закрытия */
  '--chotto-audiomessage-modal-close-button-icon-size': string;
}


