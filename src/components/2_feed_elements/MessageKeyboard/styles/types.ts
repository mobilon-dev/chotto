/**
 * CSS переменные для компонента MessageKeyboard
 */
export interface MessageKeyboardThemeCSSVariables {
  // Container
  /** Отображение контейнера клавиатуры */
  '--chotto-messagekeyboard-container-display': string;
  /** Выравнивание по главной оси контейнера клавиатуры */
  '--chotto-messagekeyboard-container-justify': string;
  /** Перенос строк контейнера клавиатуры */
  '--chotto-messagekeyboard-container-flex-wrap': string;
  /** Промежуток между элементами клавиатуры */
  '--chotto-messagekeyboard-gap': string;

  // Container left alignment
  /** Выравнивание по главной оси контейнера слева */
  '--chotto-messagekeyboard-container-left-justify': string;
  /** Отступ слева контейнера слева */
  '--chotto-messagekeyboard-container-left-margin-left': string;
  /** Отступ справа контейнера слева */
  '--chotto-messagekeyboard-container-left-margin-right': string;

  // Container center alignment
  /** Выравнивание по главной оси контейнера по центру */
  '--chotto-messagekeyboard-container-center-justify': string;
  /** Отступ слева контейнера по центру */
  '--chotto-messagekeyboard-container-center-margin-left': string;
  /** Отступ справа контейнера по центру */
  '--chotto-messagekeyboard-container-center-margin-right': string;

  // Container right alignment
  /** Выравнивание по главной оси контейнера справа */
  '--chotto-messagekeyboard-container-right-justify': string;
  /** Отступ слева контейнера справа */
  '--chotto-messagekeyboard-container-right-margin-left': string;
  /** Отступ справа контейнера справа */
  '--chotto-messagekeyboard-container-right-margin-right': string;

  // Key
  /** Граница клавиши */
  '--chotto-messagekeyboard-key-border': string;
  /** Радиус границы клавиши */
  '--chotto-messagekeyboard-key-border-radius': string;
  /** Перенос слов клавиши */
  '--chotto-messagekeyboard-key-word-wrap': string;
  /** Тень клавиши */
  '--chotto-messagekeyboard-key-box-shadow': string;
  /** Максимальная ширина клавиши */
  '--chotto-messagekeyboard-key-max-width': string;
  /** Отступы клавиши */
  '--chotto-messagekeyboard-key-padding': string;
  /** Отступы параграфа клавиши */
  '--chotto-messagekeyboard-key-p-margin': string;
  /** Курсор параграфа клавиши при наведении */
  '--chotto-messagekeyboard-key-p-hover-cursor': string;
  /** Цвет фона клавиши */
  '--chotto-messagekeyboard-key-background-color': string;
  /** Размер шрифта клавиши */
  '--chotto-messagekeyboard-key-font-size': string;
}
