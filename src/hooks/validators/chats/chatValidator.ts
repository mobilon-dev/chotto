/**
 * Валидатор для данных чатов
 */

export interface ValidationError {
  path: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Валидатор действий чата
 */
function validateChatAction(action: any, chatIndex: number, actionIndex: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${chatIndex}].actions[${actionIndex}]`;

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
 * Валидатор атрибута контакта
 */
function validateContactAttribute(attr: any, chatIndex: number, attrIndex: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${chatIndex}].contact.attributes[${attrIndex}]`;

  if (typeof attr !== 'object' || attr === null) {
    errors.push({ path, message: 'Атрибут контакта должен быть объектом', value: attr });
    return errors;
  }

  if (!attr.id || typeof attr.id !== 'string') {
    errors.push({ path: `${path}.id`, message: 'Поле id обязательно и должно быть строкой', value: attr.id });
  }

  if (attr.type !== undefined && typeof attr.type !== 'string') {
    errors.push({ path: `${path}.type`, message: 'Поле type должно быть строкой', value: attr.type });
  }

  if (attr.data !== undefined) {
    if (typeof attr.data !== 'string' && typeof attr.data !== 'object') {
      errors.push({ path: `${path}.data`, message: 'Поле data должно быть строкой или объектом', value: attr.data });
    } else if (typeof attr.data === 'object') {
      if (!attr.data.id || typeof attr.data.id !== 'string') {
        errors.push({ path: `${path}.data.id`, message: 'Поле data.id должно быть строкой', value: attr.data.id });
      }
      if (!attr.data.nickname || typeof attr.data.nickname !== 'string') {
        errors.push({ path: `${path}.data.nickname`, message: 'Поле data.nickname должно быть строкой', value: attr.data.nickname });
      }
      if (!attr.data.phone || typeof attr.data.phone !== 'string') {
        errors.push({ path: `${path}.data.phone`, message: 'Поле data.phone должно быть строкой', value: attr.data.phone });
      }
    }
  }

  if (!attr.value || typeof attr.value !== 'string') {
    errors.push({ path: `${path}.value`, message: 'Поле value обязательно и должно быть строкой', value: attr.value });
  }

  return errors;
}

/**
 * Валидатор контакта
 */
function validateContact(contact: any, chatIndex: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${chatIndex}].contact`;

  if (typeof contact !== 'object' || contact === null) {
    errors.push({ path, message: 'Contact должен быть объектом', value: contact });
    return errors;
  }

  if (contact.attributes !== undefined && !Array.isArray(contact.attributes)) {
    errors.push({ path: `${path}.attributes`, message: 'Поле attributes должно быть массивом', value: contact.attributes });
    return errors;
  }

  if (contact.attributes) {
    contact.attributes.forEach((attr: any, index: number) => {
      errors.push(...validateContactAttribute(attr, chatIndex, index));
    });
  }

  return errors;
}

/**
 * Валидатор диалога
 */
function validateDialog(dialog: any, chatIndex: number, dialogIndex: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${chatIndex}].dialogs[${dialogIndex}]`;

  if (typeof dialog !== 'object' || dialog === null) {
    errors.push({ path, message: 'Диалог должен быть объектом', value: dialog });
    return errors;
  }

  // Обязательные поля
  if (!dialog.dialogId || typeof dialog.dialogId !== 'string') {
    errors.push({ path: `${path}.dialogId`, message: 'Поле dialogId обязательно и должно быть строкой', value: dialog.dialogId });
  }

  if (!dialog.name || typeof dialog.name !== 'string') {
    errors.push({ path: `${path}.name`, message: 'Поле name обязательно и должно быть строкой', value: dialog.name });
  }

  if (dialog['lastActivity.timestamp'] === undefined) {
    errors.push({ path: `${path}['lastActivity.timestamp']`, message: 'Поле lastActivity.timestamp обязательно', value: dialog['lastActivity.timestamp'] });
  } else if (typeof dialog['lastActivity.timestamp'] !== 'number') {
    errors.push({ path: `${path}['lastActivity.timestamp']`, message: 'Поле lastActivity.timestamp должно быть числом', value: dialog['lastActivity.timestamp'] });
  }

  if (dialog.isSelected === undefined || typeof dialog.isSelected !== 'boolean') {
    errors.push({ path: `${path}.isSelected`, message: 'Поле isSelected обязательно и должно быть boolean', value: dialog.isSelected });
  }

  // Опциональные поля
  if (dialog.branchId !== undefined && typeof dialog.branchId !== 'string') {
    errors.push({ path: `${path}.branchId`, message: 'Поле branchId должно быть строкой', value: dialog.branchId });
  }

  if (dialog.attributeId !== undefined && typeof dialog.attributeId !== 'string') {
    errors.push({ path: `${path}.attributeId`, message: 'Поле attributeId должно быть строкой', value: dialog.attributeId });
  }

  if (dialog.channelId !== undefined && typeof dialog.channelId !== 'string') {
    errors.push({ path: `${path}.channelId`, message: 'Поле channelId должно быть строкой', value: dialog.channelId });
  }

  if (dialog.icon !== undefined && typeof dialog.icon !== 'string') {
    errors.push({ path: `${path}.icon`, message: 'Поле icon должно быть строкой', value: dialog.icon });
  }

  if (dialog.fullname !== undefined && typeof dialog.fullname !== 'string') {
    errors.push({ path: `${path}.fullname`, message: 'Поле fullname должно быть строкой', value: dialog.fullname });
  }

  if (dialog.countUnread !== undefined && typeof dialog.countUnread !== 'number') {
    errors.push({ path: `${path}.countUnread`, message: 'Поле countUnread должно быть числом', value: dialog.countUnread });
  }

  if (dialog['lastActivity.time'] !== undefined && typeof dialog['lastActivity.time'] !== 'string') {
    errors.push({ path: `${path}['lastActivity.time']`, message: 'Поле lastActivity.time должно быть строкой', value: dialog['lastActivity.time'] });
  }

  return errors;
}

/**
 * Валидатор отдельного чата
 */
function validateChat(chat: any, index: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${index}]`;

  if (typeof chat !== 'object' || chat === null) {
    errors.push({ path, message: 'Чат должен быть объектом', value: chat });
    return errors;
  }

  // Обязательные поля
  if (chat.chatId === undefined || typeof chat.chatId !== 'string') {
    errors.push({ path: `${path}.chatId`, message: 'Поле chatId обязательно и должно быть строкой', value: chat.chatId });
  }

  if (!chat.name || typeof chat.name !== 'string') {
    errors.push({ path: `${path}.name`, message: 'Поле name обязательно и должно быть строкой', value: chat.name });
  }

  if (chat.countUnread === undefined || typeof chat.countUnread !== 'number') {
    errors.push({ path: `${path}.countUnread`, message: 'Поле countUnread обязательно и должно быть числом', value: chat.countUnread });
  } else if (chat.countUnread < 0) {
    errors.push({ path: `${path}.countUnread`, message: 'Поле countUnread не может быть отрицательным', value: chat.countUnread });
  }

  if (!chat.lastMessage || typeof chat.lastMessage !== 'string') {
    errors.push({ path: `${path}.lastMessage`, message: 'Поле lastMessage обязательно и должно быть строкой', value: chat.lastMessage });
  }

  if (!chat['lastActivity.timestamp'] || typeof chat['lastActivity.timestamp'] !== 'number') {
    errors.push({ path: `${path}['lastActivity.timestamp']`, message: 'Поле lastActivity.timestamp обязательно и должно быть числом', value: chat['lastActivity.timestamp'] });
  }

  // Опциональные поля
  if (chat.avatar !== undefined && typeof chat.avatar !== 'string') {
    errors.push({ path: `${path}.avatar`, message: 'Поле avatar должно быть строкой', value: chat.avatar });
  }

  if (chat['lastActivity.time'] !== undefined && typeof chat['lastActivity.time'] !== 'string') {
    errors.push({ path: `${path}['lastActivity.time']`, message: 'Поле lastActivity.time должно быть строкой', value: chat['lastActivity.time'] });
  }

  if (chat['lastMessage.status'] !== undefined) {
    const validStatuses = ['read', 'sent', 'received'];
    if (!validStatuses.includes(chat['lastMessage.status'])) {
      errors.push({ 
        path: `${path}['lastMessage.status']`, 
        message: `Поле lastMessage.status должно быть одним из: ${validStatuses.join(', ')}`, 
        value: chat['lastMessage.status'] 
      });
    }
  }

  if (chat.isFixedTop !== undefined && typeof chat.isFixedTop !== 'boolean') {
    errors.push({ path: `${path}.isFixedTop`, message: 'Поле isFixedTop должно быть boolean', value: chat.isFixedTop });
  }

  if (chat.isFixedBottom !== undefined && typeof chat.isFixedBottom !== 'boolean') {
    errors.push({ path: `${path}.isFixedBottom`, message: 'Поле isFixedBottom должно быть boolean', value: chat.isFixedBottom });
  }

  if (chat.isFixed !== undefined && typeof chat.isFixed !== 'boolean') {
    errors.push({ path: `${path}.isFixed`, message: 'Поле isFixed должно быть boolean', value: chat.isFixed });
  }

  if (chat.status !== undefined && typeof chat.status !== 'string') {
    errors.push({ path: `${path}.status`, message: 'Поле status должно быть строкой', value: chat.status });
  }

  if (chat.statusMessage !== undefined && typeof chat.statusMessage !== 'string') {
    errors.push({ path: `${path}.statusMessage`, message: 'Поле statusMessage должно быть строкой', value: chat.statusMessage });
  }

  if (chat.colorUnread !== undefined && typeof chat.colorUnread !== 'string') {
    errors.push({ path: `${path}.colorUnread`, message: 'Поле colorUnread должно быть строкой', value: chat.colorUnread });
  }

  if (chat.typing !== undefined && typeof chat.typing !== 'boolean') {
    errors.push({ path: `${path}.typing`, message: 'Поле typing должно быть boolean', value: chat.typing });
  }

  if (chat.metadata !== undefined && typeof chat.metadata !== 'string') {
    errors.push({ path: `${path}.metadata`, message: 'Поле metadata должно быть строкой', value: chat.metadata });
  }

  if (chat.dialogsExpanded !== undefined && typeof chat.dialogsExpanded !== 'boolean') {
    errors.push({ path: `${path}.dialogsExpanded`, message: 'Поле dialogsExpanded должно быть boolean', value: chat.dialogsExpanded });
  }

  // Валидация вложенных структур
  if (chat.actions !== undefined) {
    if (!Array.isArray(chat.actions)) {
      errors.push({ path: `${path}.actions`, message: 'Поле actions должно быть массивом', value: chat.actions });
    } else {
      chat.actions.forEach((action: any, actionIndex: number) => {
        errors.push(...validateChatAction(action, index, actionIndex));
      });
    }
  }

  if (chat.dialogs !== undefined) {
    if (!Array.isArray(chat.dialogs)) {
      errors.push({ path: `${path}.dialogs`, message: 'Поле dialogs должно быть массивом', value: chat.dialogs });
    } else {
      chat.dialogs.forEach((dialog: any, dialogIndex: number) => {
        errors.push(...validateDialog(dialog, index, dialogIndex));
      });
    }
  }

  if (chat.contact !== undefined) {
    errors.push(...validateContact(chat.contact, index));
  }

  return errors;
}

/**
 * Основная функция валидации списка чатов
 */
export function validateChats(chats: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Проверка что это массив
  if (!Array.isArray(chats)) {
    return {
      isValid: false,
      errors: [{ path: 'chats', message: 'Данные должны быть массивом', value: chats }],
      warnings: []
    };
  }

  // Проверка что массив не пустой
  if (chats.length === 0) {
    warnings.push({ path: 'chats', message: 'Массив чатов пустой' });
  }

  // Проверка уникальности chatId
  const chatIds = new Set<number>();
  chats.forEach((chat: any, index: number) => {
    if (chat && typeof chat === 'object' && chat.chatId !== undefined) {
      if (chatIds.has(chat.chatId)) {
        errors.push({ 
          path: `chats[${index}].chatId`, 
          message: 'Дублирующийся chatId', 
          value: chat.chatId 
        });
      } else {
        chatIds.add(chat.chatId);
      }
    }
  });

  // Валидация каждого чата
  chats.forEach((chat: any, index: number) => {
    errors.push(...validateChat(chat, index));
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
export function getValidationReport(result: ValidationResult): string {
  const lines: string[] = [];
  
  lines.push('=== РЕЗУЛЬТАТ ВАЛИДАЦИИ ЧАТОВ ===\n');
  
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

  lines.push('\n' + '='.repeat(35));
  
  return lines.join('\n');
}

