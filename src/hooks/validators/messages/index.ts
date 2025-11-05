/**
 * Валидатор сообщений
 * Экспорт всех компонентов валидации сообщений
 */

export * from './types';
export { 
  validateMessages, 
  getMessageValidationReport,
  type MessageValidationError,
  type MessageValidationResult 
} from './messageValidator';
export * from './useMessageValidator';

