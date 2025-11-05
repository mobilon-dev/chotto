/**
 * Composable для общих действий в компонентах сообщений (контекстное меню, просмотры, ответ)
 * 
 * Предназначен для элементов ленты (`TextMessage`, `ImageMessage`, `VideoMessage`, `FileMessage`, `AudioMessage`).
 * Централизует управление состоянием кнопки меню/контекстного меню и единообразно эмитит события наружу.
 * 
 * Использование: импортируйте в компонент сообщения и передайте текущий объект сообщения и `emit` компонента.
 * 
 * @example
 * import { useMessageActions } from '@/hooks/messages'
 * 
 * const emit = defineEmits(['action','reply'])
 * const { isOpenMenu, buttonMenuVisible, showMenu, hideMenu, clickAction, viewsAction, handleClickReplied } = useMessageActions(props.message, emit)
 * 
 * // шаблон
 * // <button v-if="buttonMenuVisible && message.actions" @click="isOpenMenu = !isOpenMenu" />
 * // <ContextMenu v-if="isOpenMenu && message.actions" :actions="message.actions" @click="clickAction" />
 */
import { ref } from 'vue'

/**
 * Полезная нагрузка для событий действия сообщения
 * @typedef ActionPayload
 * @property {string} messageId - Идентификатор сообщения
 * @property {string} type - Тип действия (например, 'menu' | 'views')
 */
type ActionPayload = { messageId: string; type: string } & Record<string, unknown>

/**
 * Тип эмиттера событий компонентов сообщений
 * @typedef EmitFn
 * @param {'action' | 'reply'} event - Имя события
 * @param {ActionPayload | string} payload - Данные события
 */
type EmitFn = (event: 'action' | 'reply', payload: ActionPayload | string) => void

/**
 * Минимально необходимая структура сообщения для работы composable
 * @interface MessageWithMeta
 * @property {string} messageId - Идентификатор сообщения
 * @property {unknown} [actions] - Описание доступных действий (передается в `ContextMenu`)
 */
export interface MessageWithMeta {
  messageId: string
  actions?: unknown
}

/**
 * Composable для унификации поведения контекстного меню и связанных действий у сообщений ленты
 * 
 * Предоставляет реактивные флаги и обработчики действий: показать/скрыть меню, клик по пункту меню,
 * клик по просмотрам, эмит события ответа.
 * 
 * @template T Расширяет {@link MessageWithMeta}
 * @param {T} message - Сообщение с `messageId` (и опционально `actions`)
 * @param {EmitFn} emit - Эмиттер событий из компонента сообщения
 * 
 * @returns {object} Объект с состояниями и методами
 * @returns {import('vue').Ref<boolean>} returns.isOpenMenu - Открыт ли контекстное меню
 * @returns {import('vue').Ref<boolean>} returns.buttonMenuVisible - Видна ли кнопка вызова меню
 * @returns {Function} returns.showMenu - Показать кнопку меню
 * @returns {Function} returns.hideMenu - Скрыть кнопку и закрыть меню
 * @returns {Function} returns.clickAction - Обработчик клика по пункту контекстного меню
 * @returns {Function} returns.viewsAction - Обработчик клика по просмотрам
 * @returns {Function} returns.handleClickReplied - Эмит события ответа по `replyMessageId`
 */
export const useMessageActions = <T extends MessageWithMeta>(message: T, emit: EmitFn) => {
  const isOpenMenu = ref(false)
  const buttonMenuVisible = ref(false)

  /**
   * Показать кнопку меню (обычно по `mouseenter` на контейнере сообщения)
   */
  const showMenu = () => {
    buttonMenuVisible.value = true
  }

  /**
   * Скрыть кнопку меню и закрыть контекстное меню
   */
  const hideMenu = () => {
    buttonMenuVisible.value = false
    isOpenMenu.value = false
  }

  /**
   * Эмит события клика по пункту контекстного меню
   * @param {Record<string, unknown>} action - Объект выбранного действия из `ContextMenu`
   */
  const clickAction = (action: Record<string, unknown>) => {
    hideMenu()
    emit('action', { messageId: message.messageId, type: 'menu', ...action })
  }

  /**
   * Эмит события клика по просмотрам для сообщения
   */
  const viewsAction = () => {
    hideMenu()
    emit('action', { messageId: message.messageId, type: 'views' })
  }

  /**
   * Эмит события ответа на сообщение по идентификатору цитируемого сообщения
   * @param {string} replyMessageId - Идентификатор сообщения, к которому происходит скролл/фокус
   */
  const handleClickReplied = (replyMessageId: string) => {
    emit('reply', replyMessageId)
  }

  return {
    // state
    isOpenMenu,
    buttonMenuVisible,
    // actions
    showMenu,
    hideMenu,
    clickAction,
    viewsAction,
    handleClickReplied,
  }
}


