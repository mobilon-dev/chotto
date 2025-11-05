/**
 * CSS variables for ReplyStickerMessage component
 */
export interface ReplyStickerMessageThemeCSSVariables {
  /** Внешние отступы абзаца */
  '--chotto-replystickermessage-p-margin': string;
  /** Размер шрифта абзаца */
  '--chotto-replystickermessage-p-font-size': string;
  /** Цвет абзаца */
  '--chotto-replystickermessage-p-color': string;
  /** Переполнение абзаца */
  '--chotto-replystickermessage-p-overflow': string;
  /** Обрезка текста абзаца */
  '--chotto-replystickermessage-p-text-overflow': string;
  /** Отображение абзаца (webkit box) */
  '--chotto-replystickermessage-p-display': string;
  /** Лимит строк абзаца (webkit) */
  '--chotto-replystickermessage-p-webkit-line-clamp': string;
  /** Лимит строк абзаца */
  '--chotto-replystickermessage-p-line-clamp': string;
  /** Ориентация контейнера строк (webkit) */
  '--chotto-replystickermessage-p-webkit-box-orient': string;

  /** Колонка грида кнопки превью */
  '--chotto-replystickermessage-preview-button-grid-column': string;
  /** Позиционирование кнопки превью */
  '--chotto-replystickermessage-preview-button-position': string;
  /** Отображение кнопки превью */
  '--chotto-replystickermessage-preview-button-display': string;
  /** Направление флекс-контейнера кнопки превью */
  '--chotto-replystickermessage-preview-button-flex-direction': string;
  /** Внутренние отступы кнопки превью */
  '--chotto-replystickermessage-preview-button-padding': string;

  /** Ширина превью-стикера */
  '--chotto-replystickermessage-preview-image-width': string;
  /** Высота превью-стикера */
  '--chotto-replystickermessage-preview-image-height': string;
  /** Курсор при наведении на превью */
  '--chotto-replystickermessage-preview-image-cursor': string;
  /** Вписывание превью-стикера */
  '--chotto-replystickermessage-preview-image-object-fit': string;
  /** Скругление превью-стикера */
  '--chotto-replystickermessage-preview-image-border-radius': string;
  /** Внешние отступы превью-стикера */
  '--chotto-replystickermessage-preview-image-margin': string;

  /** Ширина анимированного превью-стикера (TGS) */
  '--chotto-replystickermessage-preview-image-animated-width': string;
  /** Высота анимированного превью-стикера (TGS) */
  '--chotto-replystickermessage-preview-image-animated-height': string;
  /** Курсор при наведении на анимированное превью */
  '--chotto-replystickermessage-preview-image-animated-cursor': string;
  /** Вписывание анимированного превью-стикера (TGS) */
  '--chotto-replystickermessage-preview-image-animated-object-fit': string;
  /** Скругление анимированного превью-стикера */
  '--chotto-replystickermessage-preview-image-animated-border-radius': string;
  /** Внешние отступы анимированного превью-стикера */
  '--chotto-replystickermessage-preview-image-animated-margin': string;

  /** Ширина стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-width': string;
  /** Высота стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-height': string;
  /** Вписывание стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-object-fit': string;
  /** Скругление стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-border-radius': string;
  /** Максимальная высота стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-max-height': string;

  /** Ширина анимированного стикера в модальном окне (TGS) */
  '--chotto-replystickermessage-modal-image-animated-width': string;
  /** Высота анимированного стикера в модальном окне (TGS) */
  '--chotto-replystickermessage-modal-image-animated-height': string;
  /** Вписывание анимированного стикера в модальном окне (TGS) */
  '--chotto-replystickermessage-modal-image-animated-object-fit': string;
  /** Скругление анимированного стикера в модальном окне */
  '--chotto-replystickermessage-modal-image-animated-border-radius': string;
  /** Максимальная высота анимированного стикера в модальном окне (TGS) */
  '--chotto-replystickermessage-modal-image-animated-max-height': string;

  /** Перенос слов в контейнере текста */
  '--chotto-replystickermessage-text-container-word-wrap': string;
  /** Выравнивание содержимого текстового контейнера */
  '--chotto-replystickermessage-text-container-align-content': string;
  /** Перенос слов в тексте */
  '--chotto-replystickermessage-text-container-word-break': string;

  /** Отступ сверху у текста */
  '--chotto-replystickermessage-text-margin-top': string;
  /** Размер шрифта текста */
  '--chotto-replystickermessage-text-font-size': string;
  /** Цвет текста */
  '--chotto-replystickermessage-text-color': string;

  /** Отображение описания ответа */
  '--chotto-replystickermessage-reply-description-display': string;
  /** Выравнивание элементов описания ответа */
  '--chotto-replystickermessage-reply-description-align-items': string;
  /** Промежуток между элементами описания ответа */
  '--chotto-replystickermessage-reply-description-column-gap': string;
  /** Отступ снизу описания ответа */
  '--chotto-replystickermessage-reply-description-margin-bottom': string;
  /** Непереносимый пробел в описании */
  '--chotto-replystickermessage-reply-description-white-space': string;
  /** Цвет спана в описании ответа */
  '--chotto-replystickermessage-reply-description-span-color': string;

  /** Переход появления модального окна */
  '--chotto-replystickermessage-modal-fade-enter-active-transition': string;
  /** Прозрачность модального окна в начале */
  '--chotto-replystickermessage-modal-fade-enter-from-opacity': string;
  /** Прозрачность модального окна в конце */
  '--chotto-replystickermessage-modal-fade-enter-to-opacity': string;
}



