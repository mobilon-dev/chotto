/**
 * CSS переменные для компонента ThemeMode
 */
export interface ThemeModeThemeCSSVariables {
  // Button
  /** Отступы кнопки переключения темы */
  '--chotto-thememode-button-margin': string;

  // Switch
  /** Позиционирование переключателя */
  '--chotto-thememode-switch-position': string;
  /** Отображение переключателя */
  '--chotto-thememode-switch-display': string;
  /** Размеры переключателя */
  '--chotto-thememode-switch-box-sizing': string;
  /** Ширина переключателя */
  '--chotto-thememode-switch-width': string;
  /** Высота переключателя */
  '--chotto-thememode-switch-height': string;
  /** Граница переключателя */
  '--chotto-thememode-switch-border': string;
  /** Радиус границы переключателя */
  '--chotto-thememode-switch-border-radius': string;
  /** Фон переключателя */
  '--chotto-thememode-switch-background': string;
  /** Переход переключателя */
  '--chotto-thememode-switch-transition': string;
  /** Курсор переключателя */
  '--chotto-thememode-switch-cursor': string;

  // Switch span
  /** Позиционирование span внутри переключателя */
  '--chotto-thememode-switch-span-position': string;
  /** Верхняя позиция span внутри переключателя */
  '--chotto-thememode-switch-span-top': string;
  /** Нижняя позиция span внутри переключателя */
  '--chotto-thememode-switch-span-bottom': string;
  /** Отступы span внутри переключателя */
  '--chotto-thememode-switch-span-margin': string;
  /** Отображение span внутри переключателя */
  '--chotto-thememode-switch-span-display': string;
  /** Выравнивание содержимого span внутри переключателя по горизонтали */
  '--chotto-thememode-switch-span-justify-content': string;
  /** Выравнивание содержимого span внутри переключателя по вертикали */
  '--chotto-thememode-switch-span-align-items': string;

  // Switch sun
  /** Цвет фона иконки солнца */
  '--chotto-thememode-switch-sun-background-color': string;
  /** Цвет иконки солнца */
  '--chotto-thememode-switch-sun-color': string;
  /** Левая позиция иконки солнца */
  '--chotto-thememode-switch-sun-left': string;
  /** Ширина иконки солнца */
  '--chotto-thememode-switch-sun-width': string;
  /** Высота иконки солнца */
  '--chotto-thememode-switch-sun-height': string;
  /** Радиус границы иконки солнца */
  '--chotto-thememode-switch-sun-border-radius': string;
  /** Переход иконки солнца */
  '--chotto-thememode-switch-sun-transition': string;

  // Switch moon
  /** Непрозрачность иконки луны */
  '--chotto-thememode-switch-moon-opacity': string;
  /** Цвет фона иконки луны */
  '--chotto-thememode-switch-moon-background-color': string;
  /** Цвет иконки луны */
  '--chotto-thememode-switch-moon-color': string;
  /** Ширина иконки луны */
  '--chotto-thememode-switch-moon-width': string;
  /** Высота иконки луны */
  '--chotto-thememode-switch-moon-height': string;
  /** Радиус границы иконки луны */
  '--chotto-thememode-switch-moon-border-radius': string;
  /** Переход иконки луны */
  '--chotto-thememode-switch-moon-transition': string;

  // Input
  /** Отображение скрытого input */
  '--chotto-thememode-input-display': string;
  /** Ширина скрытого input */
  '--chotto-thememode-input-width': string;
  /** Высота скрытого input */
  '--chotto-thememode-input-height': string;
  /** Позиционирование скрытого input */
  '--chotto-thememode-input-position': string;
  /** Z-index скрытого input */
  '--chotto-thememode-input-z-index': string;
  /** Непрозрачность скрытого input */
  '--chotto-thememode-input-opacity': string;

  // Switch checked
  /** Фон переключателя в активном состоянии */
  '--chotto-thememode-switch-checked-background': string;
  /** Переход переключателя в активном состоянии */
  '--chotto-thememode-switch-checked-transition': string;

  // Switch sun checked
  /** Трансформация иконки солнца в активном состоянии */
  '--chotto-thememode-switch-sun-checked-transform': string;
  /** Непрозрачность иконки солнца в активном состоянии */
  '--chotto-thememode-switch-sun-checked-opacity': string;
  /** Переход иконки солнца в активном состоянии */
  '--chotto-thememode-switch-sun-checked-transition': string;

  // Switch moon checked
  /** Трансформация иконки луны в активном состоянии */
  '--chotto-thememode-switch-moon-checked-transform': string;
  /** Непрозрачность иконки луны в активном состоянии */
  '--chotto-thememode-switch-moon-checked-opacity': string;
  /** Переход иконки луны в активном состоянии */
  '--chotto-thememode-switch-moon-checked-transition': string;

  // Select
  /** Ширина выбора */
  '--chotto-thememode-select-width': string;
}