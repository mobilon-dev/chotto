import { type ComputedRef, type Ref } from 'vue';

/**
 * Композабл для управления выбором чатов и диалогов в списке.
 * Инкапсулирует логику установки состояния выбранного чата/диалога,
 * сброса предыдущих выборов и эмита событий выбора.
 */

/**
 * Тип элемента чата.
 */
type ChatItem = {
  chatId: string;
  isSelected?: boolean;
  dialogs?: Array<{
    dialogId: string;
    isSelected?: boolean;
  }>;
  [key: string]: unknown;
};

/**
 * Тип элемента диалога.
 */
type Dialog = {
  dialogId: string;
  [key: string]: unknown;
};

/**
 * Аргументы для выбора чата.
 */
type SelectChatArgs = {
  /** Выбранный чат */
  chat: ChatItem;
  /** Опциональный выбранный диалог */
  dialog?: Dialog;
  [key: string]: unknown;
};

/**
 * Тип эмиттера событий для выбора.
 */
type ChatListSelectionEmit = {
  /** Событие выбора чата/диалога */
  (event: 'select', args: SelectChatArgs): void;
};

/**
 * Параметры и зависимости композабла.
 */
interface UseChatListSelectionOptions {
  /** Реактивный список чатов */
  chats: ComputedRef<ChatItem[]> | Ref<ChatItem[]>;
  /** Функция эмита событий */
  emit: ChatListSelectionEmit;
}

export function useChatListSelection({ chats, emit }: UseChatListSelectionOptions) {
  /**
   * Выбирает диалог в списке чатов.
   * Сбрасывает выбор всех чатов и диалогов, затем устанавливает
   * выбранным указанный диалог.
   */
  const selectDialog = (dialog: Dialog) => {
    const chatsArray = chats.value;
    if (!chatsArray || !Array.isArray(chatsArray)) {
      return;
    }

    chatsArray.forEach(c => {
      c.isSelected = false;
      if (c.dialogs && Array.isArray(c.dialogs)) {
        c.dialogs.forEach(d => {
          d.isSelected = false;
          if (d.dialogId == dialog.dialogId) {
            d.isSelected = true;
          }
        });
      }
    });
  };

  /**
   * Выбирает чат в списке.
   * Сбрасывает выбор всех чатов и диалогов, затем устанавливает
   * выбранным указанный чат. Если передан диалог, также выбирает его.
   * Эмитит событие выбора с переданными аргументами.
   */
  const selectChat = (args: SelectChatArgs) => {
    const chatsArray = chats.value;
    if (!chatsArray || !Array.isArray(chatsArray)) {
      return;
    }

    chatsArray.forEach(c => {
      c.isSelected = false;
      if (c.dialogs && Array.isArray(c.dialogs)) {
        c.dialogs.forEach(d => {
          d.isSelected = false;
        });
      }
    });

    if (args.dialog) {
      selectDialog(args.dialog);
    }

    const c = chatsArray.find(c => c.chatId === args.chat.chatId);
    if (c) {
      c.isSelected = true;
    }

    emit('select', args);
  };

  return {
    selectChat,
    selectDialog,
  };
}