/**
 * CSS переменные для компонента ChatInput
 */
export interface ChatInputThemeCSSVariables {
  // Container
  /** Позиционирование контейнера ввода чата */
  '--chotto-chatinput-container-position': string;
  /** Отображение контейнера ввода чата */
  '--chotto-chatinput-container-display': string;
  /** Выравнивание элементов контейнера ввода чата */
  '--chotto-chatinput-container-align-items': string;
  /** Граница сверху контейнера ввода чата */
  '--chotto-chatinput-container-border-top': string;
  /** Цвет фона контейнера ввода чата */
  '--chotto-chatinput-container-bg': string;
  /** Отступы контейнера ввода чата */
  '--chotto-chatinput-container-padding': string;
  /** Промежуток между элементами сетки контейнера ввода чата */
  '--chotto-chatinput-container-grid-gap': string;
  /** Шаблон колонок сетки контейнера ввода чата */
  '--chotto-chatinput-container-grid-template-columns': string;
  /** Шаблон строк сетки контейнера ввода чата */
  '--chotto-chatinput-container-grid-template-rows': string;

  // Reply line
  /** Колонка сетки строки ответа */
  '--chotto-chatinput-reply-line-grid-column': string;
  /** Строка сетки строки ответа */
  '--chotto-chatinput-reply-line-grid-row': string;
  /** Отображение строки ответа */
  '--chotto-chatinput-reply-line-display': string;
  /** Отступ снизу строки ответа */
  '--chotto-chatinput-reply-line-margin-bottom': string;

  // File line
  /** Колонка сетки строки файла */
  '--chotto-chatinput-file-line-grid-column': string;
  /** Строка сетки строки файла */
  '--chotto-chatinput-file-line-grid-row': string;
  /** Отображение строки файла */
  '--chotto-chatinput-file-line-display': string;
  /** Выравнивание элементов строки файла */
  '--chotto-chatinput-file-line-align-items': string;
  /** Промежуток в строке файла */
  '--chotto-chatinput-file-line-gap': string;
  /** Минимальная ширина строки файла */
  '--chotto-chatinput-file-line-min-width': string;
  /** Ширина строки файла */
  '--chotto-chatinput-file-line-width': string;
  /** Отступ снизу строки файла */
  '--chotto-chatinput-file-line-margin-bottom': string;
  /** Отступ слева строки файла */
  '--chotto-chatinput-file-line-padding-left': string;
  /** Отступ справа строки файла */
  '--chotto-chatinput-file-line-padding-right': string;
  /** Переполнение строки файла */
  '--chotto-chatinput-file-line-overflow': string;
  /** Отображение видимой строки файла */
  '--chotto-chatinput-file-line-visible-display': string;
  /** Отображение счётчика файлов */
  '--chotto-chatinput-file-counter-display': string;
  /** Направление счётчика файлов */
  '--chotto-chatinput-file-counter-flex-direction': string;
  /** Сжатие счётчика файлов */
  '--chotto-chatinput-file-counter-flex-shrink': string;
  /** Размер шрифта счётчика файлов */
  '--chotto-chatinput-file-counter-font-size': string;
  /** Высота строки счётчика файлов */
  '--chotto-chatinput-file-counter-line-height': string;
  /** Перенос строк счётчика файлов */
  '--chotto-chatinput-file-counter-white-space': string;
  /** Цвет счётчика файлов */
  '--chotto-chatinput-file-counter-color': string;
  /** Отображение списка чипов */
  '--chotto-chatinput-file-chips-display': string;
  /** Гибкость списка чипов */
  '--chotto-chatinput-file-chips-flex': string;
  /** Минимальная ширина списка чипов */
  '--chotto-chatinput-file-chips-min-width': string;
  /** Промежуток между чипами */
  '--chotto-chatinput-file-chips-gap': string;
  /** Горизонтальное переполнение списка чипов */
  '--chotto-chatinput-file-chips-overflow-x': string;
  /** Позиционирование обёртки чипов */
  '--chotto-chatinput-file-chips-wrap-position': string;
  /** Ширина полосы прокрутки чипов */
  '--chotto-chatinput-file-chips-scrollbar-width': string;
  /** Отображение webkit-полосы прокрутки чипов */
  '--chotto-chatinput-file-chips-webkit-scrollbar-display': string;
  /** Позиционирование кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-position': string;
  /** Смещение кнопки прокрутки файлов сверху */
  '--chotto-chatinput-file-scroll-top': string;
  /** Слой кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-z-index': string;
  /** Отображение кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-display': string;
  /** Отступы кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-padding': string;
  /** Граница кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-border': string;
  /** Фон кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-background': string;
  /** Курсор кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-cursor': string;
  /** Высота строки кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-line-height': string;
  /** Трансформация кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-transform': string;
  /** Смещение левой кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-left': string;
  /** Трансформация левой кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-left-transform': string;
  /** Смещение правой кнопки прокрутки файлов */
  '--chotto-chatinput-file-scroll-right': string;

  // Third line
  /** Отображение третьей строки */
  '--chotto-chatinput-third-line-display': string;
  /** Строка сетки третьей строки */
  '--chotto-chatinput-third-line-grid-row': string;
  /** Начальная колонка сетки третьей строки */
  '--chotto-chatinput-third-line-grid-column-start': string;
  /** Конечная колонка сетки третьей строки */
  '--chotto-chatinput-third-line-grid-column-end': string;

  // Input
  /** Строка сетки поля ввода */
  '--chotto-chatinput-input-grid-row': string;
  /** Колонка сетки поля ввода */
  '--chotto-chatinput-input-grid-column': string;
  /** Граница поля ввода */
  '--chotto-chatinput-input-border': string;
  /** Цвет фона поля ввода */
  '--chotto-chatinput-input-background-color': string;
  /** Отступы поля ввода */
  '--chotto-chatinput-input-padding': string;
  /** Размер шрифта поля ввода */
  '--chotto-chatinput-input-font-size': string;
  /** Переполнение по вертикали поля ввода */
  '--chotto-chatinput-input-overflow-y': string;
  /** Изменение размера поля ввода */
  '--chotto-chatinput-input-resize': string;
  /** Перенос пробелов поля ввода */
  '--chotto-chatinput-input-white-space': string;
  /** Высота строки поля ввода */
  '--chotto-chatinput-input-line-height': string;
  /** Минимальная высота поля ввода */
  '--chotto-chatinput-input-min-height': string;
  /** Максимальное количество строк поля ввода */
  '--chotto-chatinput-input-max-rows': string;
  /** Радиус границы поля ввода */
  '--chotto-chatinput-input-border-radius': string;
  /** Контур поля ввода при фокусе */
  '--chotto-chatinput-input-focus-outline': string;
  /** Радиус скругления выделения эмодзи */
  '--chotto-chatinput-selection-border-radius': string;

  // Disabled placeholder
  /** Выравнивание текста отключенного плейсхолдера */
  '--chotto-chatinput-disabled-placeholder-text-align': string;
  /** Выбор пользователем отключенного плейсхолдера */
  '--chotto-chatinput-disabled-placeholder-user-select': string;
  /** Цвет текста отключенного плейсхолдера */
  '--chotto-chatinput-disabled-placeholder-text-color': string;

  // Typography
  /** Основной цвет текста */
  '--chotto-chatinput-input-text-color': string;
  /** Вторичный цвет текста */
  '--chotto-chatinput-secondary-text-color': string;
  /** Семейство шрифта */
  '--chotto-chatinput-font-family': string;

  // Button
  /** Строка сетки кнопки */
  '--chotto-chatinput-button-grid-row': string;
  /** Колонка сетки кнопки */
  '--chotto-chatinput-button-grid-column': string;
  /** Цвет фона кнопки */
  '--chotto-chatinput-button-background-color': string;
  /** Граница кнопки */
  '--chotto-chatinput-button-border': string;
  /** Высота кнопки по содержимому */
  '--chotto-chatinput-button-height-fit': string;
  /** Ширина кнопки по содержимому */
  '--chotto-chatinput-button-width-fit': string;
  /** Отображение кнопки */
  '--chotto-chatinput-button-display': string;
  /** Выравнивание кнопки относительно себя */
  '--chotto-chatinput-button-align-self': string;
  /** Отступ снизу кнопки */
  '--chotto-chatinput-button-margin-bottom': string;
  /** Прозрачность кнопки */
  '--chotto-chatinput-button-opacity': string;
  /** Отображение span кнопки */
  '--chotto-chatinput-button-span-display': string;
  /** Курсор span кнопки */
  '--chotto-chatinput-button-span-cursor': string;
  /** Отступы кнопки */
  '--chotto-chatinput-button-padding': string;
  /** Отступы кнопки */
  '--chotto-chatinput-button-margin': string;
  /** Высота кнопки */
  '--chotto-chatinput-button-height': string;
  /** Курсор отключенной кнопки */
  '--chotto-chatinput-button-disabled-cursor': string;
  /** Прозрачность отключенной кнопки */
  '--chotto-chatinput-button-disabled-opacity': string;
  /** Размер иконки кнопки */
  '--chotto-chatinput-button-icon-size': string;

  // Inline buttons
  /** Отображение встроенных кнопок */
  '--chotto-chatinput-inline-buttons-display': string;
  /** Строка сетки встроенных кнопок */
  '--chotto-chatinput-inline-buttons-grid-row': string;
  /** Колонка сетки встроенных кнопок */
  '--chotto-chatinput-inline-buttons-grid-column': string;
  /** Отступы встроенных кнопок */
  '--chotto-chatinput-inline-buttons-margin': string;
  /** Промежуток между встроенными кнопками */
  '--chotto-chatinput-inline-buttons-gap': string;
  /** Высота встроенных кнопок */
  '--chotto-chatinput-inline-buttons-height': string;
  /** Выравнивание встроенных кнопок относительно себя */
  '--chotto-chatinput-inline-buttons-align-self': string;

  // Scrollbar
  /** Ширина полосы прокрутки */
  '--chotto-chatinput-scrollbar-width': string;
  /** Цвет фона полосы прокрутки */
  '--chotto-chatinput-scrollbar-bg': string;
  /** Радиус границы ползунка полосы прокрутки */
  '--chotto-chatinput-scrollbar-thumb-radius': string;
  /** Цвет фона ползунка полосы прокрутки */
  '--chotto-chatinput-scrollbar-thumb-bg': string;
  /** Радиус границы дорожки полосы прокрутки */
  '--chotto-chatinput-scrollbar-track-radius': string;

  // Icon colors
  /** Цвет иконки */
  '--chotto-chatinput-icon-color': string;
  /** Цвет отключенной иконки */
  '--chotto-chatinput-icon-color-disabled': string;

  // Animations
  /** Длительность входа */
  '--chotto-chatinput-enter-duration': string;
  /** Длительность выхода */
  '--chotto-chatinput-leave-duration': string;
  /** Смещение входа по Y */
  '--chotto-chatinput-enter-translate-y': string;
  /** Переход входа */
  '--chotto-chatinput-enter-transition': string;
  /** Переход выхода */
  '--chotto-chatinput-leave-transition': string;
  /** Трансформация входа */
  '--chotto-chatinput-enter-transform': string;
  /** Прозрачность входа */
  '--chotto-chatinput-enter-opacity': string;
  /** CSS variable chatinput input align self */
  '--chotto-chatinput-input-align-self': string;
  /** CSS variable chatinput input margin bottom */
  '--chotto-chatinput-input-margin-bottom': string;
  /** CSS variable chatinput selection bg */
  '--chotto-chatinput-selection-bg': string;
  /** CSS variable chatinput inline buttons align items */
  '--chotto-chatinput-inline-buttons-align-items': string;
}
