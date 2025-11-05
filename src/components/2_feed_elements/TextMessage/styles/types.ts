/**
 * CSS переменные для компонента TextMessage
 */
export interface TextMessageThemeCSSVariables {
  /** Позиционирование контейнера контента текста */
  '--chotto-textmessage-content-position': string;
  /** Перенос слов внутри контента */
  '--chotto-textmessage-content-word-wrap': string;
  /** Ширина контейнера контента */
  '--chotto-textmessage-content-width': string;
  /** Максимальная ширина контейнера контента */
  '--chotto-textmessage-content-max-width': string;
  /** Скругление пузыря сообщения */
  '--chotto-textmessage-content-border-radius': string;
  /** Внутренние отступы пузыря сообщения */
  '--chotto-textmessage-content-padding': string;

  /** Содержимое псевдоэлемента "хвостик" слева */
  '--chotto-textmessage-left-before-content': string;
  /** Позиционирование псевдоэлемента слева */
  '--chotto-textmessage-left-before-position': string;
  /** Смещение хвостика слева по вертикали */
  '--chotto-textmessage-left-before-top': string;
  /** Смещение хвостика слева по горизонтали */
  '--chotto-textmessage-left-before-left': string;
  /** Ширина хвостика слева */
  '--chotto-textmessage-left-before-width': string;
  /** Высота хвостика слева */
  '--chotto-textmessage-left-before-height': string;
  /** Базовая рамка хвостика слева */
  '--chotto-textmessage-left-before-border': string;
  /** Верхняя часть рамки хвостика слева (цвет пузыря) */
  '--chotto-textmessage-left-before-border-top': string;
  /** Слой псевдоэлемента слева */
  '--chotto-textmessage-left-before-z-index': string;

  /** Содержимое псевдоэлемента "хвостик" справа */
  '--chotto-textmessage-right-after-content': string;
  /** Позиционирование псевдоэлемента справа */
  '--chotto-textmessage-right-after-position': string;
  /** Смещение хвостика справа по вертикали */
  '--chotto-textmessage-right-after-top': string;
  /** Смещение хвостика справа по горизонтали */
  '--chotto-textmessage-right-after-right': string;
  /** Ширина хвостика справа */
  '--chotto-textmessage-right-after-width': string;
  /** Высота хвостика справа */
  '--chotto-textmessage-right-after-height': string;
  /** Базовая рамка хвостика справа */
  '--chotto-textmessage-right-after-border': string;
  /** Верхняя часть рамки хвостика справа (цвет пузыря) */
  '--chotto-textmessage-right-after-border-top': string;
  /** Слой псевдоэлемента справа */
  '--chotto-textmessage-right-after-z-index': string;

  /** Отображение контейнера информации */
  '--chotto-textmessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации по поперечной оси */
  '--chotto-textmessage-info-container-align-items': string;
  /** Выравнивание элементов контейнера информации по главной оси */
  '--chotto-textmessage-info-container-justify-content': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-textmessage-info-container-column-gap': string;

  /** Отображение блока просмотров */
  '--chotto-textmessage-views-display': string;
  /** Выравнивание элементов блока просмотров */
  '--chotto-textmessage-views-align-items': string;
  /** Промежуток между элементами блока просмотров */
  '--chotto-textmessage-views-column-gap': string;
  /** Размер иконки просмотров */
  '--chotto-textmessage-views-span-font-size': string;
  /** Цвет иконки просмотров */
  '--chotto-textmessage-views-span-color': string;
  /** Размер текста просмотров */
  '--chotto-textmessage-views-p-font-size': string;
  /** Цвет текста просмотров */
  '--chotto-textmessage-views-p-color': string;

  /** Размер шрифта времени */
  '--chotto-textmessage-time-font-size': string;
  /** Цвет времени */
  '--chotto-textmessage-time-color': string;

  /** Отображение статуса доставки/прочтения */
  '--chotto-textmessage-status-display': string;
  /** Цвет иконки статуса */
  '--chotto-textmessage-status-span-color': string;
  /** Размер иконки статуса */
  '--chotto-textmessage-status-span-font-size': string;
  /** Цвет статуса "доставлено" */
  '--chotto-textmessage-status-received-color': string;
  /** Отрицательный отступ первой иконки статуса "доставлено" */
  '--chotto-textmessage-status-received-first-child-margin-right': string;
  /** Цвет статуса "прочитано" */
  '--chotto-textmessage-status-read-color': string;
  /** Отрицательный отступ первой иконки статуса "прочитано" */
  '--chotto-textmessage-status-read-first-child-margin-right': string;
  /** Цвет статуса "в ожидании" */
  '--chotto-textmessage-status-pending-color': string;
  /** Цвет статуса "ошибка" */
  '--chotto-textmessage-status-error-color': string;

  /** Размер шрифта текста сообщения */
  '--chotto-textmessage-text-font-size': string;
  /** Правила перевода строк текста */
  '--chotto-textmessage-text-white-space': string;

  /** Размер шрифта подписи */
  '--chotto-textmessage-subtext-font-size': string;
  /** Цвет подписи */
  '--chotto-textmessage-subtext-color': string;

  /** Выравнивание аватара относительно себя */
  '--chotto-textmessage-avatar-align-self': string;
  /** Вписывание изображения аватара */
  '--chotto-textmessage-avatar-object-fit': string;
  /** Минимальная ширина аватара */
  '--chotto-textmessage-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-textmessage-avatar-min-height': string;
  /** Скругление аватара */
  '--chotto-textmessage-avatar-border-radius': string;

  /** Позиционирование кнопки меню сообщения */
  '--chotto-textmessage-menu-button-position': string;
  /** Прозрачный фон кнопки меню */
  '--chotto-textmessage-menu-button-background-color': string;
  /** Граница кнопки меню */
  '--chotto-textmessage-menu-button-border': string;
  /** Трансформация кнопки меню по оси Y */
  '--chotto-textmessage-menu-button-transform': string;
  /** Курсор кнопки меню */
  '--chotto-textmessage-menu-button-cursor': string;
  /** Переход кнопки меню */
  '--chotto-textmessage-menu-button-transition': string;
  /** Цвет иконки внутри кнопки меню */
  '--chotto-textmessage-menu-button-span-color': string;
  /** Размер иконки внутри кнопки меню */
  '--chotto-textmessage-menu-button-span-font-size': string;
  /** Цвет иконки при наведении */
  '--chotto-textmessage-menu-button-span-hover-color': string;
  /** Переход при наведении */
  '--chotto-textmessage-menu-button-span-hover-transition': string;

  /** Позиционирование контекстного меню */
  '--chotto-textmessage-context-menu-position': string;

  /** Отображение общего контейнера лево/право */
  '--chotto-textmessage-left-right-display': string;
  /** Внешние отступы общего контейнера */
  '--chotto-textmessage-left-right-margin': string;

  /** Шаблон колонок левой раскладки */
  '--chotto-textmessage-left-grid-template-columns': string;
  /** Колонка грида аватара слева */
  '--chotto-textmessage-left-avatar-grid-column': string;
  /** Ряд грида аватара слева */
  '--chotto-textmessage-left-avatar-grid-row': string;
  /** Отступ справа от аватара слева */
  '--chotto-textmessage-left-avatar-margin-right': string;
  /** Колонка грида подписи слева */
  '--chotto-textmessage-left-subtext-grid-column': string;
  /** Ряд грида подписи слева */
  '--chotto-textmessage-left-subtext-grid-row': string;
  /** Внешние отступы подписи слева */
  '--chotto-textmessage-left-subtext-margin': string;
  /** Колонка грида контента слева */
  '--chotto-textmessage-left-content-grid-column': string;
  /** Фон пузыря слева */
  '--chotto-textmessage-left-bg': string;
  /** Отступ контента слева с учётом аватара */
  '--chotto-textmessage-left-content-with-avatar-indent-margin-left': string;
  /** Положение кнопки меню слева (top) */
  '--chotto-textmessage-left-menu-button-top': string;
  /** Положение кнопки меню слева (right) */
  '--chotto-textmessage-left-menu-button-right': string;
  /** Позиция контекстного меню слева (top) */
  '--chotto-textmessage-left-context-menu-top': string;
  /** Позиция контекстного меню слева (left) */
  '--chotto-textmessage-left-context-menu-left': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-textmessage-right-grid-template-columns': string;
  /** Колонка грида аватара справа */
  '--chotto-textmessage-right-avatar-grid-column': string;
  /** Ряд грида аватара справа */
  '--chotto-textmessage-right-avatar-grid-row': string;
  /** Отступ слева от аватара справа */
  '--chotto-textmessage-right-avatar-margin-left': string;
  /** Колонка грида подписи справа */
  '--chotto-textmessage-right-subtext-grid-column': string;
  /** Ряд грида подписи справа */
  '--chotto-textmessage-right-subtext-grid-row': string;
  /** Внешние отступы подписи справа */
  '--chotto-textmessage-right-subtext-margin': string;
  /** Колонка грида контента справа */
  '--chotto-textmessage-right-content-grid-column': string;
  /** Выравнивание контента справа */
  '--chotto-textmessage-right-content-margin-left': string;
  /** Фон пузыря справа */
  '--chotto-textmessage-right-bg': string;
  /** Отступ контента справа с учётом аватара */
  '--chotto-textmessage-right-content-with-avatar-indent-margin-right': string;
  /** Положение кнопки меню справа (top) */
  '--chotto-textmessage-right-menu-button-top': string;
  /** Положение кнопки меню справа (left) */
  '--chotto-textmessage-right-menu-button-left': string;
  /** Позиция контекстного меню справа (top) */
  '--chotto-textmessage-right-context-menu-top': string;
  /** Позиция контекстного меню справа (right) */
  '--chotto-textmessage-right-context-menu-right': string;

  /** Переход появления пузыря */
  '--chotto-textmessage-v-enter-active-transition': string;
  /** Переход скрытия пузыря */
  '--chotto-textmessage-v-leave-active-transition': string;
  /** Стартовая трансформация при появлении */
  '--chotto-textmessage-v-enter-from-transform': string;
  /** Стартовая прозрачность при появлении */
  '--chotto-textmessage-v-enter-from-opacity': string;
}


