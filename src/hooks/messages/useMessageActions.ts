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
 * // <button v-if="buttonMenuVisible" @click="isOpenMenu = !isOpenMenu" />
 * // <ContextMenu v-if="isOpenMenu" :actions="menuActions" @click="clickAction" />
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
 */
export interface MessageWithMeta {
  messageId: string
}

type UseMessageActionsOptions = {
  /** Локальный обработчик «Ответить» из меню (вместо emit) */
  onReply?: () => void
  /** Локальный обработчик «Редактировать» из меню (вместо emit) */
  onEdit?: () => void
}

/**
 * Composable для унификации поведения контекстного меню и связанных действий у сообщений ленты
 * 
 * Предоставляет реактивные флаги и обработчики действий: показать/скрыть меню, клик по пункту меню,
 * клик по просмотрам, эмит события ответа.
 * 
 * @template T Расширяет {@link MessageWithMeta}
 * @param {T} message - Сообщение с `messageId`
 * @param {EmitFn} emit - Эмиттер событий из компонента сообщения
 * @param {UseMessageActionsOptions} [options] - Опции (например, локальный reply)
 * 
 * @returns {object} Объект с состояниями и методами
 */
export const useMessageActions = <T extends MessageWithMeta>(
  message: T,
  emit: EmitFn,
  options: UseMessageActionsOptions = {}
) => {
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
    if (action.action === 'reply' && options.onReply) {
      options.onReply()
      return
    }
    if (action.action === 'edit' && options.onEdit) {
      options.onEdit()
      return
    }
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
