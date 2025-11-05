/**
 * CSS variables for FileMessage component
 */
export interface FileMessageThemeCSSVariables {
  /** Позиционирование контейнера контента файла */
  '--chotto-filemessage-content-position': string;
  /** Ширина контейнера контента файла */
  '--chotto-filemessage-content-width': string;
  /** Скругление пузыря файла */
  '--chotto-filemessage-content-border-radius': string;
  /** Внутренние отступы пузыря файла */
  '--chotto-filemessage-content-padding': string;
  /** Максимальная ширина контейнера контента файла */
  '--chotto-filemessage-content-max-width': string;

  /** Содержимое псевдоэлемента "хвостик" слева */
  '--chotto-filemessage-left-triangle-content': string;
  /** Позиционирование хвостика слева */
  '--chotto-filemessage-left-triangle-position': string;
  /** Смещение хвостика слева по вертикали */
  '--chotto-filemessage-left-triangle-top': string;
  /** Смещение хвостика слева по горизонтали */
  '--chotto-filemessage-left-triangle-left': string;
  /** Ширина хвостика слева */
  '--chotto-filemessage-left-triangle-width': string;
  /** Высота хвостика слева */
  '--chotto-filemessage-left-triangle-height': string;
  /** Базовая рамка хвостика слева */
  '--chotto-filemessage-left-triangle-border': string;
  /** Верхняя часть рамки хвостика слева (цвет пузыря) */
  '--chotto-filemessage-left-triangle-border-top': string;
  /** Слой псевдоэлемента слева */
  '--chotto-filemessage-left-triangle-z-index': string;

  /** Содержимое псевдоэлемента "хвостик" справа */
  '--chotto-filemessage-right-triangle-content': string;
  /** Позиционирование хвостика справа */
  '--chotto-filemessage-right-triangle-position': string;
  /** Смещение хвостика справа по вертикали */
  '--chotto-filemessage-right-triangle-top': string;
  /** Смещение хвостика справа по горизонтали */
  '--chotto-filemessage-right-triangle-right': string;
  /** Ширина хвостика справа */
  '--chotto-filemessage-right-triangle-width': string;
  /** Высота хвостика справа */
  '--chotto-filemessage-right-triangle-height': string;
  /** Базовая рамка хвостика справа */
  '--chotto-filemessage-right-triangle-border': string;
  /** Верхняя часть рамки хвостика справа (цвет пузыря) */
  '--chotto-filemessage-right-triangle-border-top': string;
  /** Слой псевдоэлемента справа */
  '--chotto-filemessage-right-triangle-z-index': string;

  /** Цвет фона пузыря слева */
  '--chotto-filemessage-left-bg': string;
  /** Цвет фона пузыря справа */
  '--chotto-filemessage-right-bg': string;

  /** Выравнивание аватара относительно себя */
  '--chotto-filemessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-filemessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-filemessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-filemessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-filemessage-avatar-border-radius': string;

  /** Отступ сверху текстового контейнера */
  '--chotto-filemessage-text-container-margin-top': string;
  /** Перенос слов в текстовом контейнере */
  '--chotto-filemessage-text-container-word-wrap': string;
  /** Перевод строк в абзаце текста */
  '--chotto-filemessage-text-container-p-white-space': string;
  /** Размер шрифта абзаца текста */
  '--chotto-filemessage-text-container-p-font-size': string;

  /** Размер шрифта подписи */
  '--chotto-filemessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-filemessage-subtext-color': string;

  /** Отображение ссылки на файл */
  '--chotto-filemessage-link-display': string;
  /** Выравнивание по главной оси ссылки */
  '--chotto-filemessage-link-justify-content': string;
  /** Выравнивание по поперечной оси ссылки */
  '--chotto-filemessage-link-align-items': string;
  /** Промежуток между элементами ссылки */
  '--chotto-filemessage-link-column-gap': string;
  /** Цвет иконки в ссылке */
  '--chotto-filemessage-link-span-color': string;
  /** Размер иконки в ссылке */
  '--chotto-filemessage-link-span-font-size': string;

  /** Управление переполнением текста имени файла */
  '--chotto-filemessage-filename-text-overflow': string;
  /** Обрезка текста имени файла */
  '--chotto-filemessage-filename-text-text-overflow': string;
  /** Количество строк имени файла (webkit) */
  '--chotto-filemessage-filename-text-webkit-line-clamp': string;
  /** Количество строк имени файла */
  '--chotto-filemessage-filename-text-line-clamp': string;
  /** Ориентация блоков строк имени файла */
  '--chotto-filemessage-filename-text-webkit-box-orient': string;
  /** Отступ справа у имени файла */
  '--chotto-filemessage-filename-text-margin-right': string;
  /** Размер шрифта имени файла */
  '--chotto-filemessage-filename-text-font-size': string;
  /** Цвет имени файла */
  '--chotto-filemessage-filename-text-color': string;

  /** Отображение контейнера информации */
  '--chotto-filemessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации */
  '--chotto-filemessage-info-container-align-items': string;
  /** Выравнивание по главной оси контейнера информации */
  '--chotto-filemessage-info-container-justify-content': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-filemessage-info-container-column-gap': string;

  /** Отступ снизу кнопки скачивания */
  '--chotto-filemessage-download-button-margin-bottom': string;
  /** Граница кнопки скачивания */
  '--chotto-filemessage-download-button-border': string;
  /** Скругление кнопки скачивания */
  '--chotto-filemessage-download-button-border-radius': string;
  /** Фон кнопки скачивания */
  '--chotto-filemessage-download-button-background-color': string;
  /** Внутренние отступы кнопки скачивания */
  '--chotto-filemessage-download-button-padding': string;
  /** Курсор кнопки скачивания */
  '--chotto-filemessage-download-button-cursor': string;
  /** Цвет иконки внутри кнопки */
  '--chotto-filemessage-download-button-span-color': string;
  /** Размер иконки внутри кнопки */
  '--chotto-filemessage-download-button-span-font-size': string;

  /** Отображение статуса доставки/прочтения */
  '--chotto-filemessage-status-display': string;
  /** Толщина шрифта статуса */
  '--chotto-filemessage-status-span-font-weight': string;
  /** Отрицательный отступ первой иконки "доставлено" */
  '--chotto-filemessage-status-received-first-child-margin-right': string;
  /** Отрицательный отступ первой иконки "прочитано" */
  '--chotto-filemessage-status-read-first-child-margin-right': string;
  /** Цвет иконок статуса */
  '--chotto-filemessage-status-span-color': string;
  /** Размер иконок статуса */
  '--chotto-filemessage-status-span-font-size': string;
  /** Цвет статуса "доставлено" */
  '--chotto-filemessage-status-received-color': string;
  /** Цвет статуса "прочитано" */
  '--chotto-filemessage-status-read-color': string;
  /** Цвет статуса "в ожидании" */
  '--chotto-filemessage-status-pending-color': string;
  /** Цвет статуса "ошибка" */
  '--chotto-filemessage-status-error-color': string;

  /** Отображение блока просмотров */
  '--chotto-filemessage-views-display': string;
  /** Выравнивание элементов блока просмотров */
  '--chotto-filemessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-filemessage-views-column-gap': string;
  /** Размер иконки просмотров */
  '--chotto-filemessage-views-span-font-size': string;
  /** Цвет иконки просмотров */
  '--chotto-filemessage-views-span-color': string;
  /** Размер текста просмотров */
  '--chotto-filemessage-views-p-font-size': string;
  /** Цвет текста просмотров */
  '--chotto-filemessage-views-p-color': string;

  /** Размер шрифта времени */
  '--chotto-filemessage-time-font-size': string;
  /** Цвет времени */
  '--chotto-filemessage-time-color': string;

  /** Позиционирование кнопки меню сообщения */
  '--chotto-filemessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-filemessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-filemessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-filemessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-filemessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-filemessage-menu-button-transition': string;
  /** Переход при наведении */
  '--chotto-filemessage-menu-button-hover-transition': string;
  /** Цвет иконки внутри кнопки меню */
  '--chotto-filemessage-menu-button-span-color': string;
  /** Размер иконки внутри кнопки меню */
  '--chotto-filemessage-menu-button-span-font-size': string;
  /** Цвет иконки при наведении */
  '--chotto-filemessage-menu-button-span-hover-color': string;

  /** Позиционирование контекстного меню */
  '--chotto-filemessage-context-menu-position': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-filemessage-left-right-display': string;
  /** Внешние отступы общего контейнера */
  '--chotto-filemessage-left-right-margin': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-filemessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-filemessage-left-avatar-grid-column': string;
  /** Отступ справа от аватара слева */
  '--chotto-filemessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-filemessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-filemessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-filemessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-filemessage-left-content-grid-column': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-filemessage-left-content-with-avatar-indent-margin-left': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-filemessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-filemessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-filemessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-filemessage-left-context-menu-left': string;
  /** Отступ контекстного меню слева сверху */
  '--chotto-filemessage-left-context-menu-margin-top': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-filemessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-filemessage-right-avatar-grid-column': string;
  /** Ряд грида аватара справа */
  '--chotto-filemessage-right-avatar-grid-row': string;
  /** Отступ слева от аватара справа */
  '--chotto-filemessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-filemessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-filemessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-filemessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-filemessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-filemessage-right-content-margin-left': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-filemessage-right-content-with-avatar-indent-margin-right': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-filemessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-filemessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-filemessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-filemessage-right-context-menu-right': string;
  /** Отступ контекстного меню справа сверху */
  '--chotto-filemessage-right-context-menu-margin-top': string;

  /** Переход появления пузыря */
  '--chotto-filemessage-v-enter-active-transition': string;
  /** Переход скрытия пузыря */
  '--chotto-filemessage-v-leave-active-transition': string;
  /** Стартовая трансформация при появлении */
  '--chotto-filemessage-v-enter-from-transform': string;
  /** Стартовая прозрачность при появлении */
  '--chotto-filemessage-v-enter-from-opacity': string;
}


