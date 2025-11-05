/**
 * Валидатор для данных сообщений
 */

export interface MessageValidationError {
  path: string;
  message: string;
  value?: any;
}

export interface MessageValidationResult {
  isValid: boolean;
  errors: MessageValidationError[];
  warnings: MessageValidationError[];
}

/**
 * Валидатор действий сообщения
 */
function validateMessageAction(action: any, messageIndex: number, actionIndex: number): MessageValidationError[] {
  const errors: MessageValidationError[] = [];
  const path = `messages[${messageIndex}].actions[${actionIndex}]`;

  if (typeof action !== 'object' || action === null) {
    errors.push({ path, message: 'Action должен быть объектом', value: action });
    return errors;
  }

  if (!action.action || typeof action.action !== 'string') {
    errors.push({ path: `${path}.action`, message: 'Поле action обязательно и должно быть строкой', value: action.action });
  }

  if (!action.title || typeof action.title !== 'string') {
    errors.push({ path: `${path}.title`, message: 'Поле title обязательно и должно быть строкой', value: action.title });
  }

  if (action.icon !== undefined && typeof action.icon !== 'string') {
    errors.push({ path: `${path}.icon`, message: 'Поле icon должно быть строкой', value: action.icon });
  }

  return errors;
}

/**
 * Валидатор reply сообщения
 */
function validateMessageReply(reply: any, messageIndex: number): MessageValidationError[] {
  const errors: MessageValidationError[] = [];
  const path = `messages[${messageIndex}].reply`;

  if (typeof reply !== 'object' || reply === null) {
    errors.push({ path, message: 'Reply должен быть объектом', value: reply });
    return errors;
  }

  if (reply.messageId === undefined) {
    errors.push({ path: `${path}.messageId`, message: 'Поле messageId обязательно', value: reply.messageId });
  } else if (typeof reply.messageId !== 'string' && typeof reply.messageId !== 'number') {
    errors.push({ path: `${path}.messageId`, message: 'Поле messageId должно быть строкой или числом', value: reply.messageId });
  }

  if (!reply.type || typeof reply.type !== 'string') {
    errors.push({ path: `${path}.type`, message: 'Поле type обязательно и должно быть строкой', value: reply.type });
  }

  if (reply.text !== undefined && typeof reply.text !== 'string') {
    errors.push({ path: `${path}.text`, message: 'Поле text должно быть строкой', value: reply.text });
  }

  if (reply.url !== undefined && typeof reply.url !== 'string') {
    errors.push({ path: `${path}.url`, message: 'Поле url должно быть строкой', value: reply.url });
  }

  if (reply.filename !== undefined && typeof reply.filename !== 'string') {
    errors.push({ path: `${path}.filename`, message: 'Поле filename должно быть строкой', value: reply.filename });
  }

  return errors;
}

/**
 * Валидатор отдельного сообщения
 */
function validateMessage(message: any, index: number): MessageValidationError[] {
  const errors: MessageValidationError[] = [];
  const path = `messages[${index}]`;

  if (typeof message !== 'object' || message === null) {
    errors.push({ path, message: 'Сообщение должно быть объектом', value: message });
    return errors;
  }

  // Обязательные поля
  // chatId необязательное для всех типов сообщений, но если есть, то должно быть строкой
  if (message.chatId !== undefined && typeof message.chatId !== 'string') {
    errors.push({ path: `${path}.chatId`, message: 'Поле chatId должно быть строкой', value: message.chatId });
  }

  // Исключение для системных сообщений типа "system.date"
  if (message.type !== 'system.date') {
    if (message.messageId === undefined) {
      errors.push({ path: `${path}.messageId`, message: 'Поле messageId обязательно', value: message.messageId });
    } else if (typeof message.messageId !== 'string' && typeof message.messageId !== 'number') {
      errors.push({ path: `${path}.messageId`, message: 'Поле messageId должно быть строкой или числом', value: message.messageId });
    }
  }

  if (!message.type || typeof message.type !== 'string') {
    errors.push({ path: `${path}.type`, message: 'Поле type обязательно и должно быть строкой', value: message.type });
  }

  // Исключение для системных сообщений типа "system.date"
  if (message.type !== 'system.date') {
    if (message.timestamp === undefined) {
      errors.push({ path: `${path}.timestamp`, message: 'Поле timestamp обязательно', value: message.timestamp });
    } else if (typeof message.timestamp !== 'string' && typeof message.timestamp !== 'number') {
      errors.push({ path: `${path}.timestamp`, message: 'Поле timestamp должно быть строкой или числом', value: message.timestamp });
    }
  }

  // Опциональные поля
  if (message.dialogId !== undefined && typeof message.dialogId !== 'string') {
    errors.push({ path: `${path}.dialogId`, message: 'Поле dialogId должно быть строкой', value: message.dialogId });
  }

  if (message.direction !== undefined) {
    const validDirections = ['incoming', 'outgoing'];
    if (!validDirections.includes(message.direction)) {
      errors.push({ 
        path: `${path}.direction`, 
        message: `Поле direction должно быть одним из: ${validDirections.join(', ')}`, 
        value: message.direction 
      });
    }
  }

  if (message.status !== undefined) {
    const validStatuses = ['read', 'sent', 'received'];
    if (!validStatuses.includes(message.status)) {
      errors.push({ 
        path: `${path}.status`, 
        message: `Поле status должно быть одним из: ${validStatuses.join(', ')}`, 
        value: message.status 
      });
    }
  }

  if (message.text !== undefined && typeof message.text !== 'string') {
    errors.push({ path: `${path}.text`, message: 'Поле text должно быть строкой', value: message.text });
  }

  if (message.header !== undefined && typeof message.header !== 'string') {
    errors.push({ path: `${path}.header`, message: 'Поле header должно быть строкой', value: message.header });
  }

  if (message.subText !== undefined && typeof message.subText !== 'string') {
    errors.push({ path: `${path}.subText`, message: 'Поле subText должно быть строкой', value: message.subText });
  }

  if (message.avatar !== undefined && typeof message.avatar !== 'string') {
    errors.push({ path: `${path}.avatar`, message: 'Поле avatar должно быть строкой', value: message.avatar });
  }

  if (message.url !== undefined && typeof message.url !== 'string') {
    errors.push({ path: `${path}.url`, message: 'Поле url должно быть строкой', value: message.url });
  }

  if (message.filename !== undefined && typeof message.filename !== 'string') {
    errors.push({ path: `${path}.filename`, message: 'Поле filename должно быть строкой', value: message.filename });
  }

  if (message.views !== undefined && typeof message.views !== 'number') {
    errors.push({ path: `${path}.views`, message: 'Поле views должно быть числом', value: message.views });
  }

  // Валидация вложенных структур
  if (message.actions !== undefined) {
    if (!Array.isArray(message.actions)) {
      errors.push({ path: `${path}.actions`, message: 'Поле actions должно быть массивом', value: message.actions });
    } else {
      message.actions.forEach((action: any, actionIndex: number) => {
        errors.push(...validateMessageAction(action, index, actionIndex));
      });
    }
  }

  if (message.reply !== undefined) {
    errors.push(...validateMessageReply(message.reply, index));
  }

  if (message.embed !== undefined) {
    if (typeof message.embed !== 'object' || message.embed === null) {
      errors.push({ path: `${path}.embed`, message: 'Поле embed должно быть объектом', value: message.embed });
    } else {
      if (!message.embed.type || typeof message.embed.type !== 'string') {
        errors.push({ path: `${path}.embed.type`, message: 'Поле embed.type обязательно и должно быть строкой', value: message.embed.type });
      }
      if (!message.embed.url || typeof message.embed.url !== 'string') {
        errors.push({ path: `${path}.embed.url`, message: 'Поле embed.url обязательно и должно быть строкой', value: message.embed.url });
      }
    }
  }

  return errors;
}

/**
 * Основная функция валидации списка сообщений
 */
export function validateMessages(messages: any): MessageValidationResult {
  const errors: MessageValidationError[] = [];
  const warnings: MessageValidationError[] = [];

  // Проверка что это массив
  if (!Array.isArray(messages)) {
    return {
      isValid: false,
      errors: [{ path: 'messages', message: 'Данные должны быть массивом', value: messages }],
      warnings: []
    };
  }

  // Проверка что массив не пустой
  if (messages.length === 0) {
    warnings.push({ path: 'messages', message: 'Массив сообщений пустой' });
  }

  // Проверка уникальности messageId в пределах одного чата/диалога
  const messageIdsByChatDialog = new Map<string, Set<string | number>>();
  
  messages.forEach((message: any, index: number) => {
    if (message && typeof message === 'object' && message.chatId !== undefined && message.messageId !== undefined) {
      // Ключ: chatId:dialogId (если dialogId есть) или просто chatId
      const key = message.dialogId 
        ? `${message.chatId}:${message.dialogId}`
        : `${message.chatId}`;
      
      if (!messageIdsByChatDialog.has(key)) {
        messageIdsByChatDialog.set(key, new Set());
      }
      
      const messageIds = messageIdsByChatDialog.get(key)!;
      if (messageIds.has(message.messageId)) {
        const location = message.dialogId 
          ? `в чате ${message.chatId}, диалоге ${message.dialogId}`
          : `в чате ${message.chatId}`;
        errors.push({ 
          path: `messages[${index}].messageId`, 
          message: `Дублирующийся messageId ${location}`, 
          value: message.messageId 
        });
      } else {
        messageIds.add(message.messageId);
      }
    }
  });

  // Валидация каждого сообщения
  messages.forEach((message: any, index: number) => {
    errors.push(...validateMessage(message, index));
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Получить читаемый отчет о валидации
 */
export function getMessageValidationReport(result: MessageValidationResult): string {
  const lines: string[] = [];
  
  lines.push('=== РЕЗУЛЬТАТ ВАЛИДАЦИИ СООБЩЕНИЙ ===\n');
  
  if (result.isValid) {
    lines.push('✅ Данные валидны!\n');
  } else {
    lines.push('❌ Обнаружены ошибки!\n');
  }

  if (result.errors.length > 0) {
    lines.push(`\n🔴 ОШИБКИ (${result.errors.length}):`);
    result.errors.forEach((error, index) => {
      lines.push(`  ${index + 1}. [${error.path}] ${error.message}`);
      if (error.value !== undefined) {
        lines.push(`     Значение: ${JSON.stringify(error.value)}`);
      }
    });
  }

  if (result.warnings.length > 0) {
    lines.push(`\n⚠️  ПРЕДУПРЕЖДЕНИЯ (${result.warnings.length}):`);
    result.warnings.forEach((warning, index) => {
      lines.push(`  ${index + 1}. [${warning.path}] ${warning.message}`);
      if (warning.value !== undefined) {
        lines.push(`     Значение: ${JSON.stringify(warning.value)}`);
      }
    });
  }

  lines.push('\n' + '='.repeat(40));
  
  return lines.join('\n');
}

