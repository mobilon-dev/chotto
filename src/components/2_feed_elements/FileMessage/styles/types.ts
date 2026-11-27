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
  /** box-sizing контейнера контента */
  '--chotto-filemessage-content-box-sizing': string;
  /** Отступ справа у пузыря с файлом */
  '--chotto-filemessage-content-padding-right': string;
  /** Фиксированная ширина пузыря только с файлом (включая padding) */
  '--chotto-filemessage-block-width': string;

  /** Отображение нижней «тени» пузыря */
  '--chotto-filemessage-bottom-shadow-display': string;
  /** Позиционирование нижней «тени» */
  '--chotto-filemessage-bottom-shadow-position': string;
  /** Смещение нижней «тени» слева */
  '--chotto-filemessage-bottom-shadow-left': string;
  /** Смещение нижней «тени» справа */
  '--chotto-filemessage-bottom-shadow-right': string;
  /** Смещение нижней «тени» снизу */
  '--chotto-filemessage-bottom-shadow-bottom': string;
  /** Высота нижней «тени» */
  '--chotto-filemessage-bottom-shadow-height': string;
  /** Фон нижней «тени» */
  '--chotto-filemessage-bottom-shadow-background': string;
  /** Нижняя граница «тени» (stroke bottom) */
  '--chotto-filemessage-bottom-shadow-border-bottom': string;
  /** Скругление нижней «тени» */
  '--chotto-filemessage-bottom-shadow-border-radius': string;
  /** События указателя нижней «тени» */
  '--chotto-filemessage-bottom-shadow-pointer-events': string;
  /** Слой нижней «тени» */
  '--chotto-filemessage-bottom-shadow-z-index': string;

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
  /** Обрезка хвостика слева (скрывает часть внутри пузыря) */
  '--chotto-filemessage-left-triangle-clip-path': string;

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
  /** Слой псевдоэлемента справа */
  '--chotto-filemessage-right-triangle-z-index': string;
  /** Обрезка хвостика справа (скрывает часть внутри пузыря) */
  '--chotto-filemessage-right-triangle-clip-path': string;

  /** Цвет фона пузыря слева */
  '--chotto-filemessage-left-bg': string;
  /** Эффект размытия фона пузыря слева */
  '--chotto-filemessage-left-backdrop-filter': string;
  /** Граница пузыря слева */
  '--chotto-filemessage-left-border': string;
  /** Тень пузыря слева */
  '--chotto-filemessage-left-box-shadow': string;
  /** Цвет фона пузыря справа */
  '--chotto-filemessage-right-bg': string;
  /** Эффект размытия фона пузыря справа */
  '--chotto-filemessage-right-backdrop-filter': string;
  /** Граница пузыря справа */
  '--chotto-filemessage-right-border': string;
  /** Тень пузыря справа */
  '--chotto-filemessage-right-box-shadow': string;

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

  /** Отображение списка файлов */
  '--chotto-filemessage-files-display': string;
  /** Направление списка файлов */
  '--chotto-filemessage-files-flex-direction': string;
  /** Вертикальный промежуток между файлами (один файл) */
  '--chotto-filemessage-files-row-gap': string;
  /** Вертикальный промежуток между файлами (несколько файлов) */
  '--chotto-filemessage-files-many-row-gap': string;
  /** Фиксированная ширина блока с файлом(ами) */
  '--chotto-filemessage-files-width': string;
  /** Минимальная ширина блока с файлом(ами) */
  '--chotto-filemessage-files-min-width': string;
  /** Максимальная ширина блока с файлом(ами) */
  '--chotto-filemessage-files-max-width': string;
  /** box-sizing списка файлов */
  '--chotto-filemessage-files-box-sizing': string;
  /** Отображение ссылки на файл */
  '--chotto-filemessage-link-display': string;
  /** Выравнивание по главной оси ссылки */
  '--chotto-filemessage-link-justify-content': string;
  /** Выравнивание по поперечной оси ссылки */
  '--chotto-filemessage-link-align-items': string;
  /** Промежуток между элементами ссылки */
  '--chotto-filemessage-link-column-gap': string;
  /** Фиксированная ширина блока файла */
  '--chotto-filemessage-link-width': string;
  /** Минимальная ширина блока файла */
  '--chotto-filemessage-link-min-width': string;
  /** Максимальная ширина блока файла */
  '--chotto-filemessage-link-max-width': string;
  /** box-sizing строки файла */
  '--chotto-filemessage-link-box-sizing': string;
  /** overflow строки файла */
  '--chotto-filemessage-link-overflow': string;
  /** text-decoration строки файла */
  '--chotto-filemessage-link-text-decoration': string;
  /** text-decoration строки файла при наведении */
  '--chotto-filemessage-link-hover-text-decoration': string;
  /** Цвет иконки в ссылке */
  '--chotto-filemessage-link-span-color': string;
  /** Размер иконки в ссылке */
  '--chotto-filemessage-link-span-font-size': string;

  /** Сжатие SVG-иконки файла */
  '--chotto-filemessage-file-icon-flex-shrink': string;
  /** Размер SVG-иконки файла */
  '--chotto-filemessage-file-icon-size': string;
  /** Заливка круга SVG-иконки */
  '--chotto-filemessage-file-icon-circle-fill': string;
  /** Заливка глифа SVG-иконки */
  '--chotto-filemessage-file-icon-glyph-fill': string;

  /** Отображение блока имени и метаданных */
  '--chotto-filemessage-info-display': string;
  /** Направление блока имени и метаданных */
  '--chotto-filemessage-info-flex-direction': string;
  /** flex блока имени и метаданных */
  '--chotto-filemessage-info-flex': string;
  /** Промежуток между именем и метаданными */
  '--chotto-filemessage-info-row-gap': string;
  /** min-width блока имени и метаданных */
  '--chotto-filemessage-info-min-width': string;
  /** max-width блока имени и метаданных */
  '--chotto-filemessage-info-max-width': string;
  /** overflow блока имени и метаданных */
  '--chotto-filemessage-info-overflow': string;

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
  /** display имени файла */
  '--chotto-filemessage-filename-text-display': string;
  /** Внешние отступы имени файла */
  '--chotto-filemessage-filename-text-margin': string;
  /** Внутренние отступы имени файла */
  '--chotto-filemessage-filename-text-padding': string;
  /** width имени файла */
  '--chotto-filemessage-filename-text-width': string;
  /** min-width имени файла */
  '--chotto-filemessage-filename-text-min-width': string;
  /** max-width имени файла */
  '--chotto-filemessage-filename-text-max-width': string;
  /** line-height имени файла */
  '--chotto-filemessage-filename-text-line-height': string;
  /** max-height имени файла */
  '--chotto-filemessage-filename-text-max-height': string;
  /** overflow-wrap имени файла */
  '--chotto-filemessage-filename-text-overflow-wrap': string;
  /** word-break имени файла */
  '--chotto-filemessage-filename-text-word-break': string;
  /** hyphens имени файла */
  '--chotto-filemessage-filename-text-hyphens': string;
  /** Размер шрифта имени файла */
  '--chotto-filemessage-filename-text-font-size': string;
  /** Цвет имени файла */
  '--chotto-filemessage-filename-text-color': string;

  /** margin метаданных файла */
  '--chotto-filemessage-file-meta-margin': string;
  /** overflow метаданных файла */
  '--chotto-filemessage-file-meta-overflow': string;
  /** text-overflow метаданных файла */
  '--chotto-filemessage-file-meta-text-overflow': string;
  /** white-space метаданных файла */
  '--chotto-filemessage-file-meta-white-space': string;
  /** line-height метаданных файла */
  '--chotto-filemessage-file-meta-line-height': string;
  /** Размер шрифта метаданных (тип · размер) */
  '--chotto-filemessage-file-meta-font-size': string;
  /** Цвет метаданных файла */
  '--chotto-filemessage-file-meta-color': string;

  /** Отображение футера (реакции + время) */
  '--chotto-filemessage-footer-display': string;
  /** Выравнивание элементов футера по поперечной оси */
  '--chotto-filemessage-footer-align-items': string;
  /** Выравнивание элементов футера по главной оси */
  '--chotto-filemessage-footer-justify-content': string;
  /** Промежуток между элементами футера */
  '--chotto-filemessage-footer-column-gap': string;
  /** Отступ сверху футера */
  '--chotto-filemessage-footer-margin-top': string;

  /** Растягивание блока реакций в футере */
  '--chotto-filemessage-reactions-flex': string;
  /** Перенос реакций */
  '--chotto-filemessage-reactions-flex-wrap': string;
  /** Минимальная ширина блока реакций */
  '--chotto-filemessage-reactions-min-width': string;

  /** Отображение контейнера информации */
  '--chotto-filemessage-info-container-display': string;
  /** Выравнивание элементов контейнера информации */
  '--chotto-filemessage-info-container-align-items': string;
  /** Выравнивание по главной оси контейнера информации */
  '--chotto-filemessage-info-container-justify-content': string;
  /** Промежуток между элементами контейнера информации */
  '--chotto-filemessage-info-container-column-gap': string;
  /** Сжатие контейнера информации */
  '--chotto-filemessage-info-container-flex-shrink': string;
  /** Отступ слева у контейнера информации */
  '--chotto-filemessage-info-container-margin-left': string;

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
  /** Промежуток между колонками слева (аватар / пузырь) */
  '--chotto-filemessage-left-column-gap': string;
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
  /** Позиция контекстного меню слева (left) */
  '--chotto-filemessage-left-context-menu-left': string;

  /** Шаблон колонок правой раскладки */
  '--chotto-filemessage-right-grid-template-columns': string;
  /** Промежуток между колонками справа (пузырь / аватар) */
  '--chotto-filemessage-right-column-gap': string;
  /** Колонка грида аватара справа */
  '--chotto-filemessage-right-avatar-grid-column': string;
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
  /** Позиция контекстного меню справа (right) */
  '--chotto-filemessage-right-context-menu-right': string;

  /** Переход появления пузыря */
  '--chotto-filemessage-v-enter-active-transition': string;
  /** Переход скрытия пузыря */
  '--chotto-filemessage-v-leave-active-transition': string;
  /** Стартовая трансформация при появлении */
  '--chotto-filemessage-v-enter-from-transform': string;
  /** Стартовая прозрачность при появлении */
  '--chotto-filemessage-v-enter-from-opacity': string;

  /** Жирность жирного текста (markdown **текст**) */
  '--chotto-filemessage-markdown-strong-font-weight': string;
  /** Стиль курсива (markdown *текст*) */
  '--chotto-filemessage-markdown-em-font-style': string;
  /** Подчёркивание (markdown <u>текст</u>) */
  '--chotto-filemessage-markdown-u-text-decoration': string;
  /** Зачёркивание (markdown ~~текст~~) */
  '--chotto-filemessage-markdown-del-text-decoration': string;
  /** Фон встроенного кода (markdown `код`) */
  '--chotto-filemessage-markdown-code-bg': string;
  /** Внутренние отступы встроенного кода */
  '--chotto-filemessage-markdown-code-padding': string;
  /** Скругление встроенного кода */
  '--chotto-filemessage-markdown-code-border-radius': string;
  /** Шрифт встроенного кода */
  '--chotto-filemessage-markdown-code-font-family': string;
  /** Размер шрифта встроенного кода */
  '--chotto-filemessage-markdown-code-font-size': string;
  /** Левая граница цитаты (markdown > текст) */
  '--chotto-filemessage-markdown-blockquote-border-left': string;
  /** Левый отступ цитаты */
  '--chotto-filemessage-markdown-blockquote-padding-left': string;
  /** Внешние отступы цитаты */
  '--chotto-filemessage-markdown-blockquote-margin': string;
  /** Стиль шрифта цитаты */
  '--chotto-filemessage-markdown-blockquote-font-style': string;
  /** Цвет текста цитаты */
  '--chotto-filemessage-markdown-blockquote-color': string;
  /** Нижний отступ параграфов markdown */
  '--chotto-filemessage-markdown-p-margin-bottom': string;
}


