/**
 * Композабл для обработки действий в списке чатов.
 * Инкапсулирует логику эмита событий для расширения чата,
 * выполнения действий и обработки кликов по табам.
 */

/**
 * Тип эмиттера событий для действий списка чатов.
 */
type ChatListActionsEmit = {
  /** Событие расширения чата */
  (event: 'expand', args: unknown): void;
  /** Событие выполнения действия */
  (event: 'action', data: unknown): void;
  /** Событие клика по табу */
  (event: 'tab-click', tabId: string): void;
};

/**
 * Параметры и зависимости композабла.
 */
interface UseChatListActionsOptions {
  /** Функция эмита событий */
  emit: ChatListActionsEmit;
}

export function useChatListActions({ emit }: UseChatListActionsOptions) {
  /**
   * Обрабатывает расширение чата. Эмитит событие 'expand'
   * с переданными аргументами.
   */
  const expandChat = (args: unknown) => {
    emit('expand', args);
  };

  /**
   * Обрабатывает выполнение действия. Эмитит событие 'action'
   * с переданными данными.
   */
  const action = (data: unknown) => {
    emit('action', data);
  };

  /**
   * Обрабатывает клик по табу. Эмитит событие 'tab-click'
   * с идентификатором выбранного таба.
   */
  const handleTabClick = (tabId: string) => {
    emit('tab-click', tabId);
  };

  return {
    expandChat,
    action,
    handleTabClick,
  };
}

