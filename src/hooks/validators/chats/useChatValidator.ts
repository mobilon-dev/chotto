/**
 * Реактивный composable для валидации чатов
 */

import { ref, computed, watch, type Ref } from 'vue';
import { validateChats, getValidationReport, type ValidationResult } from './chatValidator';

export interface UseChatValidatorOptions {
  autoValidate?: boolean;
  debounce?: number;
}

export interface UseChatValidatorReturn {
  validationResult: Ref<ValidationResult | null>;
  isValid: Ref<boolean>;
  errors: Ref<ValidationResult['errors']>;
  warnings: Ref<ValidationResult['warnings']>;
  errorCount: Ref<number>;
  warningCount: Ref<number>;
  report: Ref<string>;
  validate: () => ValidationResult;
  reset: () => void;
  showReport: () => void;
}

/**
 * Composable для реактивной валидации чатов
 * 
 * @param chatsData - реактивная ссылка на данные чатов
 * @param options - опции валидатора
 * @returns объект с реактивными свойствами и методами валидации
 * 
 * @example
 * ```ts
 * import { ref } from 'vue';
 * import { useChatValidator } from '@/apps/validators/useChatValidator';
 * import { chats } from '@/apps/data/chats';
 * 
 * const chatsData = ref(chats);
 * const { isValid, errorCount, showReport } = useChatValidator(chatsData, {
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
export function useChatValidator(
  chatsData: Ref<any>,
  options: UseChatValidatorOptions = {}
): UseChatValidatorReturn {
  const { autoValidate = true, debounce = 0 } = options;

  // Реактивное состояние
  const validationResult = ref<ValidationResult | null>(null);

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
    return getValidationReport(validationResult.value);
  });

  /**
   * Выполнить валидацию
   */
  function validate(): ValidationResult {
    const result = validateChats(chatsData.value);
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

    console.group('📋 Детальный отчет валидации чатов');
    console.log(report.value);
    
    if (errors.value.length > 0) {
      console.log('\n📊 Детали ошибок:');
      
      // Группируем ошибки по чатам
      const errorsByChat = new Map<number, typeof errors.value>();
      
      errors.value.forEach((error) => {
        const match = error.path.match(/chats\[(\d+)\]/);
        if (match) {
          const chatIndex = parseInt(match[1]);
          if (!errorsByChat.has(chatIndex)) {
            errorsByChat.set(chatIndex, []);
          }
          errorsByChat.get(chatIndex)!.push(error);
        }
      });
      
      // Выводим ошибки по чатам
      let globalErrorIndex = 1;
      errorsByChat.forEach((chatErrors, chatIndex) => {
        console.group(`\n🔴 Чат [${chatIndex}] - ошибок: ${chatErrors.length}`);
        
        chatErrors.forEach((error) => {
          console.log(`\n${globalErrorIndex}. ${error.path}`);
          console.log(`   Сообщение: ${error.message}`);
          if (error.value !== undefined) {
            console.log(`   Значение поля:`, error.value);
          }
          globalErrorIndex++;
        });
        
        // Выводим весь проблемный объект чата
        if (chatsData.value && chatsData.value[chatIndex]) {
          console.log('\n📦 Полный объект чата:');
          console.log(chatsData.value[chatIndex]);
        }
        
        console.groupEnd();
      });
      
      // Ошибки не привязанные к конкретному чату
      const generalErrors = errors.value.filter(error => !error.path.match(/chats\[(\d+)\]/));
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
      chatsData,
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

