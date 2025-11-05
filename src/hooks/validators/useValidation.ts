/**
 * Composable для объединённой валидации чатов и сообщений
 * Переносит типовую оркестрацию из приложений в саму библиотеку,
 * чтобы сократить пользовательский код.
 *
 * Примеры использования:
 *
 * 1) Только чаты и сообщения (без sidebar):
 * ```ts
 * import { useValidation } from '@mobilon-dev/chotto';
 *
 * const { chatValidator, messageValidator, validateAll } = useValidation(
 *   chatsRef,
 *   messagesRef,
 *   {
 *     enable: { chats: true, messages: true, sidebar: false },
 *     debounce: 300,
 *     // validateMessagesOnlyWhenSelected: true, // по умолчанию true
 *   }
 * );
 *
 * validateAll();
 * ```
 *
 * 2) Все три валидатора (чаты, сообщения, sidebar):
 * ```ts
 * import { useValidation } from '@mobilon-dev/chotto';
 *
 * const { validateAll, validateSidebar } = useValidation(
 *   chatsRef,
 *   messagesRef,
 *   {
 *     enable: { chats: true, messages: true, sidebar: true },
 *     sidebarData: sidebarItemsRef,
 *     debounce: 300,
 *   }
 * );
 *
 * validateSidebar();
 * validateAll();
 * ```
 */

import { watch, type Ref } from 'vue';
import { useChatValidator } from './chats/useChatValidator';
import { useMessageValidator } from './messages/useMessageValidator';
import { useSidebarValidator } from './sidebar/useSidebarValidator';

export interface UseCombinedValidationOptions {
  autoValidate?: boolean;
  debounce?: number;
  enableConsoleLogging?: boolean;
  validateMessagesOnlyWhenSelected?: boolean;
  // Какие валидаторы активировать
  enable?: {
    chats?: boolean;
    messages?: boolean;
    sidebar?: boolean;
  };
  // Опциональные данные sidebar (если активирована валидация sidebar)
  sidebarData?: Ref<unknown>;
}

export interface UseCombinedValidationReturn {
  chatValidator: ReturnType<typeof useChatValidator>;
  messageValidator: ReturnType<typeof useMessageValidator>;
  sidebarValidator: ReturnType<typeof useSidebarValidator> | null;

  validateChats: () => void;
  validateMessages: () => void;
  validateSidebar: () => void;
  validateAll: () => void;

  getValidationStats: () => {
    chatErrors: number;
    chatWarnings: number;
    messageErrors: number;
    messageWarnings: number;
    sidebarErrors: number;
    sidebarWarnings: number;
    totalErrors: number;
    totalWarnings: number;
  };

  setupGlobalValidationFunctions: () => void;
  logValidationInfo: () => void;
  validateOnChatSelect: () => void;

  updateChatsData: (chats: unknown[]) => void;
  updateSidebarData: (items: unknown[]) => void;
  initializeValidation: () => void;
}

export function useValidation(
  chatsData: Ref<unknown>,
  messagesData: Ref<unknown>,
  options: UseCombinedValidationOptions = {}
): UseCombinedValidationReturn {
  const {
    autoValidate = true,
    debounce = 500,
    enableConsoleLogging = true,
    validateMessagesOnlyWhenSelected = true,
    enable = { chats: true, messages: true, sidebar: true },
    sidebarData,
  } = options;

  const chatValidator = useChatValidator(chatsData, {
    autoValidate: enable.chats ? autoValidate : false,
    debounce,
  });

  const messageValidator = useMessageValidator(messagesData, {
    autoValidate: enable.messages ? (autoValidate && !validateMessagesOnlyWhenSelected) : false,
    debounce,
  });

  const sidebarValidator = enable.sidebar && sidebarData
    ? useSidebarValidator(sidebarData, { autoValidate, debounce })
    : null;

  const validateChats = () => {
    if (enableConsoleLogging) console.log('🔍 Ручная валидация чатов...');
    if (enable.chats) {
      chatValidator.validate();
      chatValidator.showReport();
    } else if (enableConsoleLogging) {
      console.log('⏭️ Валидация чатов отключена настройками');
    }
  };

  const validateMessages = () => {
    if (enableConsoleLogging) console.log('🔍 Ручная валидация сообщений...');
    if (enable.messages) {
      messageValidator.validate();
      messageValidator.showReport();
    } else if (enableConsoleLogging) {
      console.log('⏭️ Валидация сообщений отключена настройками');
    }
  };

  const validateSidebar = () => {
    if (enableConsoleLogging) console.log('🔍 Ручная валидация sidebar...');
    if (enable.sidebar && sidebarValidator) {
      sidebarValidator.validate();
      sidebarValidator.showReport();
    } else if (enableConsoleLogging) {
      console.log('⏭️ Валидация sidebar отключена или не переданы данные');
    }
  };

  const validateAll = () => {
    if (enableConsoleLogging) console.log('🔍 Полная валидация всех данных...');
    if (enable.chats) {
      chatValidator.validate();
      chatValidator.showReport();
    }
    if (enable.messages) {
      messageValidator.validate();
      messageValidator.showReport();
    }
    if (enable.sidebar && sidebarValidator) {
      sidebarValidator.validate();
      sidebarValidator.showReport();
    }
  };

  const getValidationStats = () => {
    const chatErrors = chatValidator.errorCount.value;
    const chatWarnings = chatValidator.warningCount.value;
    const messageErrors = messageValidator.errorCount.value;
    const messageWarnings = messageValidator.warningCount.value;
    const sidebarErrors = sidebarValidator ? sidebarValidator.errorCount.value : 0;
    const sidebarWarnings = sidebarValidator ? sidebarValidator.warningCount.value : 0;
    return {
      chatErrors,
      chatWarnings,
      messageErrors,
      messageWarnings,
      sidebarErrors,
      sidebarWarnings,
      totalErrors: chatErrors + messageErrors + sidebarErrors,
      totalWarnings: chatWarnings + messageWarnings + sidebarWarnings,
    };
  };

  const setupGlobalValidationFunctions = () => {
    if (typeof window !== 'undefined') {
      const w = window as unknown as Record<string, unknown>;
      w.validateChats = validateChats as unknown;
      w.validateMessages = validateMessages as unknown;
      w.validateAll = validateAll as unknown;
      w.validateSidebar = validateSidebar as unknown;
    }
  };

  const logValidationInfo = () => {
    if (!enableConsoleLogging) return;
    console.log('💡 Доступные функции валидации в консоли:');
    console.log('   - validateChats() - валидация списка чатов');
    console.log('   - validateMessages() - валидация списка сообщений');
    console.log('   - validateAll() - полная валидация всех данных');
    console.log('   - validateSidebar() - валидация sidebar');
    if (validateMessagesOnlyWhenSelected) {
      console.log('⏳ Валидация сообщений будет выполнена после выбора чата...');
    }
  };

  const validateOnChatSelect = () => {
    if (enableConsoleLogging) console.log('🔍 Выполнение валидации после выбора чата...');

    chatValidator.validate();
    const chatErrors = chatValidator.errorCount.value;
    const chatWarnings = chatValidator.warningCount.value;
    if (enableConsoleLogging) {
      if (chatErrors > 0 || chatWarnings > 0) {
        console.log(`📋 Валидация чатов: найдено ${chatErrors} ошибок и ${chatWarnings} предупреждений`);
      } else {
        console.log('✅ Валидация чатов: все данные корректны');
      }
    }
    chatValidator.showReport();

    const hasMessages = Array.isArray(messagesData.value) && messagesData.value.length > 0;
    if (enable.messages && hasMessages) {
      messageValidator.validate();
      const messageErrors = messageValidator.errorCount.value;
      const messageWarnings = messageValidator.warningCount.value;
      if (enableConsoleLogging) {
        if (messageErrors > 0 || messageWarnings > 0) {
          console.log(`💬 Валидация сообщений: найдено ${messageErrors} ошибок и ${messageWarnings} предупреждений`);
        } else {
          console.log('✅ Валидация сообщений: все данные корректны');
        }
      }
      messageValidator.showReport();
    } else if (enable.messages && enableConsoleLogging) {
      console.log('⚠️ Сообщения не загружены для валидации');
    }

    if (enable.sidebar) {
      if (sidebarValidator) {
        sidebarValidator.validate();
        const sErrors = sidebarValidator.errorCount.value;
        const sWarnings = sidebarValidator.warningCount.value;
        if (enableConsoleLogging) {
          if (sErrors > 0 || sWarnings > 0) {
            console.log(`📚 Валидация sidebar: найдено ${sErrors} ошибок и ${sWarnings} предупреждений`);
          } else {
            console.log('✅ Валидация sidebar: все данные корректны');
          }
        }
        sidebarValidator.showReport();
      } else if (enableConsoleLogging) {
        console.log('⚠️ Данные sidebar не переданы — валидация пропущена');
      }
    }
  };

  const updateChatsData = (chats: unknown[]) => {
    if (chats && Array.isArray(chats) && chats.length > 0) {
      chatsData.value = chats;
    }
  };

  const updateSidebarData = (items: unknown[]) => {
    if (!sidebarData) return;
    if (items && Array.isArray(items) && items.length > 0) {
      sidebarData.value = items;
    }
  };

  const initializeValidation = () => {
    setupGlobalValidationFunctions();
    logValidationInfo();
  };

  if (enableConsoleLogging) {
    watch(() => chatValidator.errorCount.value, (newCount, oldCount) => {
      if (newCount !== oldCount) {
        console.log(`📊 Статистика валидации чатов: ${newCount} ошибок, ${chatValidator.warningCount.value} предупреждений`);
      }
    });

    watch(() => messageValidator.errorCount.value, (newCount, oldCount) => {
      if (newCount !== oldCount) {
        console.log(`📊 Статистика валидации сообщений: ${newCount} ошибок, ${messageValidator.warningCount.value} предупреждений`);
      }
    });

    if (sidebarValidator) {
      watch(() => sidebarValidator.errorCount.value, (newCount, oldCount) => {
        if (newCount !== oldCount) {
          console.log(`📊 Статистика валидации sidebar: ${newCount} ошибок, ${sidebarValidator.warningCount.value} предупреждений`);
        }
      });
    }
  }

  return {
    chatValidator,
    messageValidator,
    sidebarValidator,
    validateChats,
    validateMessages,
    validateSidebar,
    validateAll,
    getValidationStats,
    setupGlobalValidationFunctions,
    logValidationInfo,
    validateOnChatSelect,
    updateChatsData,
    updateSidebarData,
    initializeValidation,
  };
}


