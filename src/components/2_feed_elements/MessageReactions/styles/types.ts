/**
 * CSS variables for MessageReactions component
 */
export interface MessageReactionsThemeCSSVariables {
  /** Отображение контейнера реакций */
  '--chotto-messagereactions-display': string;
  /** Выравнивание элементов контейнера реакций */
  '--chotto-messagereactions-align-items': string;
  /** Промежуток между элементами реакций */
  '--chotto-messagereactions-gap': string;
  /** Позиционирование контейнера реакций */
  '--chotto-messagereactions-position': string;
  /** Минимальная высота контейнера реакций */
  '--chotto-messagereactions-min-height': string;
  /** Z-index контейнера реакций */
  '--chotto-messagereactions-z-index': string;

  /** Позиционирование контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-position': string;
  /** Отступ снизу контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-bottom': string;
  /** Высота контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-height': string;
  /** Ширина контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-width': string;
  /** Переполнение контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-overflow': string;
  /** Минимальная высота контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-min-height': string;
  /** Внешние отступы контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-margin': string;
  /** Внутренние отступы контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-padding': string;
  /** Z-index контейнера реакций без реакций */
  '--chotto-messagereactions-no-reactions-z-index': string;

  /** Отступ справа для левых сообщений без реакций */
  '--chotto-messagereactions-left-no-reactions-right': string;
  /** Отступ слева для левых сообщений без реакций */
  '--chotto-messagereactions-left-no-reactions-left': string;

  /** Отступ слева для правых сообщений без реакций */
  '--chotto-messagereactions-right-no-reactions-left': string;
  /** Отступ справа для правых сообщений без реакций */
  '--chotto-messagereactions-right-no-reactions-right': string;

  /** Отображение чипа реакции */
  '--chotto-messagereactions-chip-display': string;
  /** Выравнивание элементов чипа реакции */
  '--chotto-messagereactions-chip-align-items': string;
  /** Промежуток между элементами чипа реакции */
  '--chotto-messagereactions-chip-gap': string;
  /** Граница чипа реакции */
  '--chotto-messagereactions-chip-border': string;
  /** Фон чипа реакции */
  '--chotto-messagereactions-chip-bg': string;
  /** Цвет текста чипа реакции */
  '--chotto-messagereactions-chip-fg': string;
  /** Скругление чипа реакции */
  '--chotto-messagereactions-chip-border-radius': string;
  /** Внутренние отступы чипа реакции */
  '--chotto-messagereactions-chip-padding': string;
  /** Размер шрифта чипа реакции */
  '--chotto-messagereactions-chip-font-size': string;
  /** Курсор чипа реакции */
  '--chotto-messagereactions-chip-cursor': string;

  /** Граница активного чипа реакции */
  '--chotto-messagereactions-chip-active-border': string;
  /** Фон активного чипа реакции */
  '--chotto-messagereactions-chip-active-bg': string;
  /** Толщина шрифта активного чипа реакции */
  '--chotto-messagereactions-chip-active-font-weight': string;

  /** Высота строки эмодзи реакции */
  '--chotto-messagereactions-emoji-line-height': string;

  /** Высота строки счётчика реакции */
  '--chotto-messagereactions-count-line-height': string;

  /** Отображение кнопки добавления реакции */
  '--chotto-messagereactions-add-display': string;
  /** Выравнивание элементов кнопки добавления реакции */
  '--chotto-messagereactions-add-align-items': string;
  /** Выравнивание содержимого кнопки добавления реакции */
  '--chotto-messagereactions-add-justify-content': string;
  /** Ширина кнопки добавления реакции */
  '--chotto-messagereactions-add-width': string;
  /** Высота кнопки добавления реакции */
  '--chotto-messagereactions-add-height': string;
  /** Скругление кнопки добавления реакции */
  '--chotto-messagereactions-add-border-radius': string;
  /** Граница кнопки добавления реакции */
  '--chotto-messagereactions-add-border': string;
  /** Фон кнопки добавления реакции */
  '--chotto-messagereactions-add-bg': string;
  /** Цвет кнопки добавления реакции */
  '--chotto-messagereactions-add-color': string;
  /** Курсор кнопки добавления реакции */
  '--chotto-messagereactions-add-cursor': string;
  /** Размер шрифта кнопки добавления реакции */
  '--chotto-messagereactions-add-font-size': string;
  /** Прозрачность кнопки добавления реакции */
  '--chotto-messagereactions-add-opacity': string;
  /** Переход кнопки добавления реакции */
  '--chotto-messagereactions-add-transition': string;
  /** События указателя кнопки добавления реакции */
  '--chotto-messagereactions-add-pointer-events': string;
  /** Позиционирование кнопки добавления реакции */
  '--chotto-messagereactions-add-position': string;
  /** Отступ снизу кнопки добавления реакции */
  '--chotto-messagereactions-add-bottom': string;
  /** Z-index кнопки добавления реакции */
  '--chotto-messagereactions-add-z-index': string;

  /** Отступ справа кнопки добавления реакции для левых сообщений */
  '--chotto-messagereactions-add-left-right': string;
  /** Отступ слева кнопки добавления реакции для левых сообщений */
  '--chotto-messagereactions-add-left-left': string;
  /** Отступ слева кнопки добавления реакции для правых сообщений */
  '--chotto-messagereactions-add-right-left': string;
  /** Отступ справа кнопки добавления реакции для правых сообщений */
  '--chotto-messagereactions-add-right-right': string;

  /** Позиционирование кнопки добавления реакции когда есть реакции */
  '--chotto-messagereactions-add-has-reactions-position': string;
  /** Отступ снизу кнопки добавления реакции когда есть реакции */
  '--chotto-messagereactions-add-has-reactions-bottom': string;
  /** Трансформация кнопки добавления реакции когда есть реакции */
  '--chotto-messagereactions-add-has-reactions-transform': string;

  /** Прозрачность кнопки добавления реакции когда есть чипы */
  '--chotto-messagereactions-add-has-chip-opacity': string;
  /** События указателя кнопки добавления реакции когда есть чипы */
  '--chotto-messagereactions-add-has-chip-pointer-events': string;

  /** Высота строки span внутри кнопки добавления реакции */
  '--chotto-messagereactions-add-span-line-height': string;
  /** Отображение span внутри кнопки добавления реакции */
  '--chotto-messagereactions-add-span-display': string;
  /** Вертикальное выравнивание span внутри кнопки добавления реакции */
  '--chotto-messagereactions-add-span-align-items': string;
  /** Горизонтальное выравнивание span внутри кнопки добавления реакции */
  '--chotto-messagereactions-add-span-justify-content': string;

  /** Позиционирование панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-position': string;
  /** Отступ сверху панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-top': string;
  /** Отступ слева панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-left': string;
  /** Внешний отступ сверху панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-margin-top': string;
  /** Фон панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-bg': string;
  /** Граница панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-border': string;
  /** Скругление панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-border-radius': string;
  /** Тень панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-box-shadow': string;
  /** Внутренние отступы панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-padding': string;
  /** Отображение панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-display': string;
  /** Выравнивание элементов панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-align-items': string;
  /** Промежуток между элементами панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-gap': string;
  /** Z-index панели быстрых реакций */
  '--chotto-messagereactions-quick-panel-z-index': string;

  /** Отступ слева панели быстрых реакций для правых сообщений */
  '--chotto-messagereactions-quick-panel-right-left': string;
  /** Отступ справа панели быстрых реакций для правых сообщений */
  '--chotto-messagereactions-quick-panel-right-right': string;

  /** Отображение элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-display': string;
  /** Выравнивание элементов элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-align-items': string;
  /** Выравнивание содержимого элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-justify-content': string;
  /** Ширина элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-width': string;
  /** Высота элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-height': string;
  /** Скругление элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-border-radius': string;
  /** Граница элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-border': string;
  /** Фон элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-bg': string;
  /** Курсор элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-cursor': string;
  /** Размер шрифта элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-font-size': string;
  /** Переход элемента быстрой реакции */
  '--chotto-messagereactions-quick-item-transition': string;
  /** Фон элемента быстрой реакции при наведении */
  '--chotto-messagereactions-quick-item-hover-bg': string;

  /** Отображение кнопки развернуть */
  '--chotto-messagereactions-expand-display': string;
  /** Выравнивание элементов кнопки развернуть */
  '--chotto-messagereactions-expand-align-items': string;
  /** Выравнивание содержимого кнопки развернуть */
  '--chotto-messagereactions-expand-justify-content': string;
  /** Ширина кнопки развернуть */
  '--chotto-messagereactions-expand-width': string;
  /** Высота кнопки развернуть */
  '--chotto-messagereactions-expand-height': string;
  /** Скругление кнопки развернуть */
  '--chotto-messagereactions-expand-border-radius': string;
  /** Граница кнопки развернуть */
  '--chotto-messagereactions-expand-border': string;
  /** Фон кнопки развернуть */
  '--chotto-messagereactions-expand-bg': string;
  /** Курсор кнопки развернуть */
  '--chotto-messagereactions-expand-cursor': string;
  /** Размер шрифта кнопки развернуть */
  '--chotto-messagereactions-expand-font-size': string;
  /** Цвет кнопки развернуть */
  '--chotto-messagereactions-expand-color': string;
  /** Переход кнопки развернуть */
  '--chotto-messagereactions-expand-transition': string;
  /** Фон кнопки развернуть при наведении */
  '--chotto-messagereactions-expand-hover-bg': string;

  /** Высота строки span внутри кнопки развернуть */
  '--chotto-messagereactions-expand-span-line-height': string;
  /** Толщина шрифта span внутри кнопки развернуть */
  '--chotto-messagereactions-expand-span-font-weight': string;

  /** Z-index пикера реакций */
  '--chotto-messagereactions-picker-z-index': string;
  /** Позиционирование emoji picker внутри пикера */
  '--chotto-messagereactions-picker-emoji-picker-position': string;
  /** Z-index emoji picker внутри пикера */
  '--chotto-messagereactions-picker-emoji-picker-z-index': string;

  /** Переход появления/исчезновения попапа реакций */
  '--chotto-messagereactions-popover-transition': string;
  /** Прозрачность попапа реакций в начале */
  '--chotto-messagereactions-popover-enter-from-opacity': string;
  /** Трансформация попапа реакций в начале */
  '--chotto-messagereactions-popover-enter-from-transform': string;
}

