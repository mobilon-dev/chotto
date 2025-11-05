/**
 * Реактивный composable для валидации сообщений
 */

import { ref, computed, watch, type Ref } from 'vue';
import { validateMessages, getMessageValidationReport, type MessageValidationResult } from './messageValidator';

export interface UseMessageValidatorOptions {
  autoValidate?: boolean;
  debounce?: number;
}

export interface UseMessageValidatorReturn {
  validationResult: Ref<MessageValidationResult | null>;
  isValid: Ref<boolean>;
  errors: Ref<MessageValidationResult['errors']>;
  warnings: Ref<MessageValidationResult['warnings']>;
  errorCount: Ref<number>;
  warningCount: Ref<number>;
  report: Ref<string>;
  validate: () => MessageValidationResult;
  reset: () => void;
  showReport: () => void;
}

/**
 * Composable для реактивной валидации сообщений
 * 
 * @param messagesData - реактивная ссылка на данные сообщений
 * @param options - опции валидатора
 * @returns объект с реактивными свойствами и методами валидации
 * 
 * @example
 * ```ts
 * import { ref } from 'vue';
 * import { useMessageValidator } from '@/apps/validators/useMessageValidator';
 * import { messages } from '@/apps/data/messages';
 * 
 * const messagesData = ref(messages);
 * const { isValid, errorCount, showReport } = useMessageValidator(messagesData, {
 *   autoValidate: true,
 *   debounce: 300
 * });
 * 
 * // Валидация запускается автоматически
 * console.log(isValid.value); // true/false
 * console.log(errorCount.value); // количество ошибок
 * 
 * // Показать полный отчет в консоли
 * showReport();
 * ```
 */
export function useMessageValidator(
  messagesData: Ref<any>,
  options: UseMessageValidatorOptions = {}
): UseMessageValidatorReturn {
  const { autoValidate = true, debounce = 0 } = options;

  // Реактивное состояние
  const validationResult = ref<MessageValidationResult | null>(null);

  // Вычисляемые свойства
  const isValid = computed(() => validationResult.value?.isValid ?? true);
  
  const errors = computed(() => validationResult.value?.errors ?? []);
  
  const warnings = computed(() => validationResult.value?.warnings ?? []);
  
  const errorCount = computed(() => errors.value.length);
  
  const warningCount = computed(() => warnings.value.length);
  
  const report = computed(() => {
    if (!validationResult.value) {
      return 'Валидация не выполнена';
    }
    return getMessageValidationReport(validationResult.value);
  });

  /**
   * Выполнить валидацию
   */
  function validate(): MessageValidationResult {
    const result = validateMessages(messagesData.value);
    validationResult.value = result;
    return result;
  }

  /**
   * Сбросить результаты валидации
   */
  function reset(): void {
    validationResult.value = null;
  }

  /**
   * Показать детальный отчет валидации в консоли
   */
  function showReport(): void {
    if (!validationResult.value) {
      console.log('Валидация не выполнена');
      return;
    }

    console.group('📋 Детальный отчет валидации сообщений');
    console.log(report.value);
    
    if (errors.value.length > 0) {
      console.log('\n📊 Детали ошибок:');
      
      // Группируем ошибки по сообщениям
      const errorsByMessage = new Map<number, typeof errors.value>();
      
      errors.value.forEach((error) => {
        const match = error.path.match(/messages\[(\d+)\]/);
        if (match) {
          const messageIndex = parseInt(match[1]);
          if (!errorsByMessage.has(messageIndex)) {
            errorsByMessage.set(messageIndex, []);
          }
          errorsByMessage.get(messageIndex)!.push(error);
        }
      });
      
      // Выводим ошибки по сообщениям
      let globalErrorIndex = 1;
      errorsByMessage.forEach((messageErrors, messageIndex) => {
        console.group(`\n🔴 Сообщение [${messageIndex}] - ошибок: ${messageErrors.length}`);
        
        messageErrors.forEach((error) => {
          console.log(`\n${globalErrorIndex}. ${error.path}`);
          console.log(`   Сообщение: ${error.message}`);
          if (error.value !== undefined) {
            console.log(`   Значение поля:`, error.value);
          }
          globalErrorIndex++;
        });
        
        // Выводим весь проблемный объект сообщения
        if (messagesData.value && messagesData.value[messageIndex]) {
          console.log('\n📦 Полный объект сообщения:');
          console.log(messagesData.value[messageIndex]);
        }
        
        console.groupEnd();
      });
      
      // Ошибки не привязанные к конкретному сообщению
      const generalErrors = errors.value.filter(error => !error.path.match(/messages\[(\d+)\]/));
      if (generalErrors.length > 0) {
        console.group(`\n⚠️ Общие ошибки - ${generalErrors.length}`);
        generalErrors.forEach((error, index) => {
          console.log(`\n${index + 1}. ${error.path}`);
          console.log(`   Сообщение: ${error.message}`);
          if (error.value !== undefined) {
            console.log(`   Значение:`, error.value);
          }
        });
        console.groupEnd();
      }
    }
    
    console.groupEnd();
  }

  // Автоматическая валидация при изменении данных
  if (autoValidate) {
    let timeoutId: number | null = null;

    watch(
      messagesData,
      () => {
        if (debounce > 0) {
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
          }
          timeoutId = window.setTimeout(() => {
            validate();
            timeoutId = null;
          }, debounce);
        } else {
          validate();
        }
      },
      { deep: true, immediate: true }
    );
  }

  return {
    validationResult,
    isValid,
    errors,
    warnings,
    errorCount,
    warningCount,
    report,
    validate,
    reset,
    showReport
  };
}

