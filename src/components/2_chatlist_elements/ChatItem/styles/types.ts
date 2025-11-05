/**
 * CSS переменные для компонента ChatItem
 */
export interface ChatItemThemeCSSVariables {
  // Container
  /** Строка сетки контейнера */
  '--chotto-chatitem-container-grid-row': string;
  /** Колонка сетки контейнера */
  '--chotto-chatitem-container-grid-column': string;
  /** Отображение контейнера */
  '--chotto-chatitem-container-display': string;
  /** Позиционирование контейнера */
  '--chotto-chatitem-container-position': string;
  /** Курсор контейнера */
  '--chotto-chatitem-container-cursor': string;
  /** Отступы контейнера */
  '--chotto-chatitem-padding-container': string;
  /** Радиус границы элемента чата */
  '--chotto-chatitem-border-radius': string;

  // Divider
  /** Содержимое разделителя */
  '--chotto-chatitem-divider-content': string;
  /** Позиционирование разделителя */
  '--chotto-chatitem-divider-position': string;
  /** Смещение разделителя по X */
  '--chotto-chatitem-divider-translate-x': string;
  /** Ширина разделителя */
  '--chotto-chatitem-divider-width': string;
  /** Высота разделителя */
  '--chotto-chatitem-divider-height': string;
  /** Цвет разделителя */
  '--chotto-chatitem-divider-color': string;
  /** Позиция разделителя снизу */
  '--chotto-chatitem-divider-bottom': string;

  // Selected state
  /** Курсор выбранного элемента */
  '--chotto-chatitem-selected-cursor': string;
  /** Фон контейнера при наведении */
  '--chotto-chatitem-container-hover-bg': string;
  /** Фон выбранного элемента */
  '--chotto-chatitem-selected-bg': string;

  // Avatar container
  /** Позиционирование контейнера аватара */
  '--chotto-chatitem-avatar-container-position': string;
  /** Отображение контейнера аватара */
  '--chotto-chatitem-avatar-container-display': string;
  /** Выравнивание по главной оси контейнера аватара */
  '--chotto-chatitem-avatar-container-justify': string;
  /** Выравнивание по поперечной оси контейнера аватара */
  '--chotto-chatitem-avatar-container-align': string;
  /** Выравнивание контейнера аватара относительно себя */
  '--chotto-chatitem-avatar-container-align-self': string;
  /** Обрезка объекта контейнера аватара */
  '--chotto-chatitem-avatar-container-object-fit': string;
  /** Отступ справа от аватара */
  '--chotto-chatitem-avatar-margin-right': string;
  /** Размер плейсхолдера аватара */
  '--chotto-chatitem-avatar-placeholder-size': string;
  /** Минимальная ширина аватара */
  '--chotto-chatitem-avatar-min-width': string;
  /** Минимальная высота аватара */
  '--chotto-chatitem-avatar-min-height': string;
  /** Радиус границы аватара */
  '--chotto-chatitem-avatar-border-radius': string;
  /** Размер шрифта текста аватара */
  '--chotto-chatitem-avatar-text-font-size': string;
  /** Радиус границы изображения аватара */
  '--chotto-chatitem-avatar-img-border-radius': string;
  /** Обрезка изображения аватара */
  '--chotto-chatitem-avatar-img-object-fit': string;

  // Status user
  /** Позиционирование статуса пользователя */
  '--chotto-chatitem-status-user-position': string;
  /** Позиция статуса пользователя справа */
  '--chotto-chatitem-status-user-right': string;
  /** Размер статуса пользователя */
  '--chotto-chatitem-status-user-size': string;
  /** Радиус границы статуса пользователя */
  '--chotto-chatitem-status-user-border-radius': string;
  /** Позиция статуса пользователя снизу */
  '--chotto-chatitem-status-user-bottom': string;
  /** Отображение статуса пользователя */
  '--chotto-chatitem-status-user-display': string;
  /** Фон статуса пользователя */
  '--chotto-chatitem-status-user-bg': string;
  /** Z-index статуса пользователя */
  '--chotto-chatitem-status-user-z-index': string;

  // Info container
  /** Коэффициент роста контейнера информации */
  '--chotto-chatitem-info-container-flex-grow': string;
  /** Выравнивание контейнера информации относительно себя */
  '--chotto-chatitem-info-container-align-self': string;
  /** Переполнение контейнера информации */
  '--chotto-chatitem-info-container-overflow': string;
  /** Отступ справа от контейнера информации */
  '--chotto-chatitem-info-margin-right': string;

  // Name
  /** Отступ сверху от имени */
  '--chotto-chatitem-name-margin-top': string;
  /** Отступ снизу от имени */
  '--chotto-chatitem-name-margin-bottom': string;
  /** Переполнение имени */
  '--chotto-chatitem-name-overflow': string;
  /** Обрезка текста имени */
  '--chotto-chatitem-name-text-overflow': string;
  /** Отображение имени */
  '--chotto-chatitem-name-display': string;
  /** Количество строк имени */
  '--chotto-chatitem-name-line-clamp': string;
  /** Ориентация блока имени */
  '--chotto-chatitem-name-box-orient': string;
  /** Размер шрифта имени */
  '--chotto-chatitem-name-font-size': string;
  /** Толщина шрифта имени */
  '--chotto-chatitem-name-font-weight': string;

  // Last message
  /** Переполнение последнего сообщения */
  '--chotto-chatitem-last-message-overflow': string;
  /** Обрезка текста последнего сообщения */
  '--chotto-chatitem-last-message-text-overflow': string;
  /** Отображение последнего сообщения */
  '--chotto-chatitem-last-message-display': string;
  /** Количество строк последнего сообщения */
  '--chotto-chatitem-last-message-line-clamp': string;
  /** Ориентация блока последнего сообщения */
  '--chotto-chatitem-last-message-box-orient': string;
  /** Размер шрифта последнего сообщения */
  '--chotto-chatitem-last-message-font-size': string;
  /** Цвет текста последнего сообщения */
  '--chotto-chatitem-last-message-text-color': string;

  // Details container
  /** Позиционирование контейнера деталей */
  '--chotto-chatitem-details-container-position': string;
  /** Отображение контейнера деталей */
  '--chotto-chatitem-details-container-display': string;
  /** Направление флекс-контейнера деталей */
  '--chotto-chatitem-details-container-flex-direction': string;
  /** Выравнивание по главной оси контейнера деталей */
  '--chotto-chatitem-details-container-justify': string;
  /** Выравнивание по поперечной оси контейнера деталей */
  '--chotto-chatitem-details-container-align': string;
  /** Активный цвет в контейнере деталей */
  '--chotto-chatitem-button-color-active': string;

  // Actions trigger
  /** Отображение триггера действий */
  '--chotto-chatitem-actions-trigger-display': string;
  /** Курсор триггера действий */
  '--chotto-chatitem-actions-trigger-cursor': string;
  /** Размер иконки триггера действий */
  '--chotto-chatitem-actions-trigger-font-size': string;
  /** Цвет иконки триггера действий */
  '--chotto-chatitem-actions-trigger-color': string;
  /** Цвет иконки при наведении */
  '--chotto-chatitem-actions-trigger-color-hover': string;

  // Menu button
  /** Порядок кнопки меню */
  '--chotto-chatitem-menu-button-order': string;
  /** Размер шрифта кнопки меню */
  '--chotto-chatitem-menu-button-font-size': string;
  /** Ширина кнопки меню */
  '--chotto-chatitem-menu-button-width': string;
  /** Граница кнопки меню */
  '--chotto-chatitem-menu-button-border': string;
  /** Фон кнопки меню */
  '--chotto-chatitem-menu-button-bg': string;
  /** Курсор кнопки меню */
  '--chotto-chatitem-menu-button-cursor': string;
  /** Отступы кнопки меню */
  '--chotto-chatitem-menu-button-padding': string;
  /** Переход кнопки меню */
  '--chotto-chatitem-menu-button-transition': string;
  /** Переход кнопки меню при наведении */
  '--chotto-chatitem-menu-button-hover-transition': string;
  /** Отображение span кнопки меню */
  '--chotto-chatitem-menu-button-span-display': string;
  /** Ширина span кнопки меню */
  '--chotto-chatitem-menu-button-span-width': string;
  /** Отступ слева span кнопки меню */
  '--chotto-chatitem-menu-button-span-margin-left': string;
  /** Цвет иконки при наведении в кнопке меню */
  '--chotto-chatitem-menu-button-hover-color': string;

  // Unread
  /** Порядок непрочитанных сообщений */
  '--chotto-chatitem-unread-order': string;
  /** Отображение непрочитанных сообщений */
  '--chotto-chatitem-unread-display': string;
  /** Выравнивание по главной оси непрочитанных сообщений */
  '--chotto-chatitem-unread-justify': string;
  /** Выравнивание по поперечной оси непрочитанных сообщений */
  '--chotto-chatitem-unread-align': string;
  /** Отступ слева от непрочитанных сообщений */
  '--chotto-chatitem-unread-margin-left': string;
  /** Отступ сверху от непрочитанных сообщений */
  '--chotto-chatitem-unread-margin-top': string;
  /** Максимальная высота непрочитанных сообщений */
  '--chotto-chatitem-unread-max-height': string;
  /** Отступы непрочитанных сообщений */
  '--chotto-chatitem-unread-padding': string;
  /** Размер шрифта бейджа непрочитанного */
  '--chotto-chatitem-unread-font-size': string;
  /** Цвет текста бейджа непрочитанного */
  '--chotto-chatitem-unread-text-color': string;
  /** Цвет фона бейджа непрочитанного */
  '--chotto-chatitem-unread-background-color': string;

  // Time
  /** Перенос строк времени */
  '--chotto-chatitem-time-white-space': string;
  /** Размер шрифта времени */
  '--chotto-chatitem-time-font-size': string;
  /** Цвет текста времени */
  '--chotto-chatitem-time-text-color': string;

  // Context menu
  /** Позиционирование контекстного меню */
  '--chotto-chatitem-context-menu-position': string;
  /** Позиция контекстного меню сверху */
  '--chotto-chatitem-context-menu-top': string;
  /** Позиция контекстного меню справа */
  '--chotto-chatitem-context-menu-right': string;

  // Status chat container
  /** Отображение контейнера статуса чата */
  '--chotto-chatitem-status-chat-container-display': string;
  /** Выравнивание контейнера статуса чата */
  '--chotto-chatitem-status-chat-container-align': string;
  /** Отступ сверху контейнера статуса чата */
  '--chotto-chatitem-status-chat-container-margin-top': string;
  /** Промежуток между статусами */
  '--chotto-chatitem-status-gap': string;

  // Status message
  /** Отображение статуса сообщения */
  '--chotto-chatitem-status-message-display': string;
  /** Цвет статуса "доставлено" */
  '--chotto-chatitem-status-color-received': string;
  /** Цвет статуса "прочитано" */
  '--chotto-chatitem-status-color-read': string;
  /** Размер шрифта статуса */
  '--chotto-chatitem-status-font-size': string;

  // Dialog buttons
  /** Отображение кнопок диалога */
  '--chotto-chatitem-dialog-buttons-display': string;
  /** Отступ слева от кнопок диалога */
  '--chotto-chatitem-dialog-buttons-margin-left': string;

  // Dialog container
  /** Отображение контейнера диалога */
  '--chotto-chatitem-dialog-container-display': string;
  /** Направление флекс-контейнера диалога */
  '--chotto-chatitem-dialog-container-flex-direction': string;
  /** Позиционирование контейнера диалога */
  '--chotto-chatitem-dialog-container-position': string;
  /** Курсор контейнера диалога */
  '--chotto-chatitem-dialog-container-cursor': string;
  /** Промежуток между элементами диалога */
  '--chotto-chatitem-dialog-gap': string;
  /** Отступы контейнера диалога */
  '--chotto-chatitem-dialog-padding': string;

  // Dialog icon
  /** Отступы иконки диалога */
  '--chotto-chatitem-dialog-icon-margin': string;

  // Dialog item
  /** Отображение элемента диалога */
  '--chotto-chatitem-dialog-item-display': string;
  /** Отступы элемента диалога */
  '--chotto-chatitem-dialog-item-padding': string;

  // Dialog selected
  /** Курсор выбранного диалога */
  '--chotto-chatitem-dialog-selected-cursor': string;
  /** Фон выбранного диалога */
  '--chotto-chatitem-dialog-selected-bg': string;

  // Dialog text container
  /** Отображение контейнера текста диалога */
  '--chotto-chatitem-dialog-text-container-display': string;
  /** Выравнивание по главной оси контейнера текста диалога */
  '--chotto-chatitem-dialog-text-container-justify': string;
  /** Переполнение контейнера текста диалога */
  '--chotto-chatitem-dialog-text-container-overflow': string;
  /** Обрезка текста контейнера диалога */
  '--chotto-chatitem-dialog-text-container-text-overflow': string;
  /** Ширина контейнера текста диалога */
  '--chotto-chatitem-dialog-text-container-width': string;
  /** Отступы контейнера текста диалога */
  '--chotto-chatitem-dialog-text-container-margin': string;
  /** Отступы текстового контейнера */
  '--chotto-chatitem-text-container-padding': string;
  /** Размер шрифта текста диалога */
  '--chotto-chatitem-dialog-text-font-size': string;
  /** Цвет текста диалога */
  '--chotto-chatitem-dialog-text-color': string;

  // Dialog name
  /** Отображение имени диалога */
  '--chotto-chatitem-dialog-name-display': string;
  /** Количество строк имени диалога */
  '--chotto-chatitem-dialog-name-line-clamp': string;
  /** Ориентация блока имени диалога */
  '--chotto-chatitem-dialog-name-box-orient': string;

  // Dialog time
  /** Отображение времени диалога */
  '--chotto-chatitem-dialog-time-display': string;
  /** Количество строк времени диалога */
  '--chotto-chatitem-dialog-time-line-clamp': string;
  /** Ориентация блока времени диалога */
  '--chotto-chatitem-dialog-time-box-orient': string;
  /** Цвет времени диалога */
  '--chotto-chatitem-dialog-time-text-color': string;
  /** Размер шрифта времени диалога */
  '--chotto-chatitem-dialog-time-font-size': string;

  // Status first icon
  /** Отступ справа от первой иконки статуса */
  '--chotto-chatitem-status-first-icon-margin-right': string;

  // Animations
  /** Переход текста */
  '--chotto-chatitem-text-transition': string;
  /** Прозрачность текста */
  '--chotto-chatitem-text-opacity': string;
  /** Переход выхода меню */
  '--chotto-chatitem-menu-leave-transition': string;
  /** Смещение входа меню по Y */
  '--chotto-chatitem-menu-enter-translate-y': string;
  /** Прозрачность меню */
  '--chotto-chatitem-menu-opacity': string;
}
