/**
 * Реактивный composable для валидации sidebar items
 */

import { ref, computed, watch, type Ref } from 'vue';
import { validateSidebarItems, getSidebarValidationReport, type SidebarValidationResult } from './sidebarValidator';

export interface UseSidebarValidatorOptions {
  autoValidate?: boolean;
  debounce?: number;
}

export interface UseSidebarValidatorReturn {
  validationResult: Ref<SidebarValidationResult | null>;
  isValid: Ref<boolean>;
  errors: Ref<SidebarValidationResult['errors']>;
  warnings: Ref<SidebarValidationResult['warnings']>;
  errorCount: Ref<number>;
  warningCount: Ref<number>;
  report: Ref<string>;
  validate: () => SidebarValidationResult;
  reset: () => void;
  showReport: () => void;
}

/**
 * Composable для реактивной валидации sidebar items
 * 
 * @param sidebarData - реактивная ссылка на данные sidebar items
 * @param options - опции валидатора
 * @returns объект с реактивными свойствами и методами валидации
 * 
 * @example
 * ```ts
 * import { ref } from 'vue';
 * import { useSidebarValidator } from '@/apps/validators/sidebar';
 * import { sidebarItems } from '@/apps/data/sidebarItems';
 * 
 * const sidebarData = ref(sidebarItems);
 * const { isValid, errorCount, showReport } = useSidebarValidator(sidebarData, {
 *   autoValidate: true,
 *   debounce: 300
 * });
 * 
 * // Показать полный отчет в консоли
 * showReport();
 * ```
 */
export function useSidebarValidator(
  sidebarData: Ref<any>,
  options: UseSidebarValidatorOptions = {}
): UseSidebarValidatorReturn {
  const { autoValidate = true, debounce = 0 } = options;

  // Реактивное состояние
  const validationResult = ref<SidebarValidationResult | null>(null);

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
    return getSidebarValidationReport(validationResult.value);
  });

  /**
   * Выполнить валидацию
   */
  function validate(): SidebarValidationResult {
    const result = validateSidebarItems(sidebarData.value);
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

    console.group('📋 Детальный отчет валидации sidebar items');
    console.log(report.value);
    
    if (errors.value.length > 0) {
      console.log('\n📊 Детали ошибок:');
      
      // Группируем ошибки по items
      const errorsByItem = new Map<number, typeof errors.value>();
      
      errors.value.forEach((error) => {
        const match = error.path.match(/sidebarItems\[(\d+)\]/);
        if (match) {
          const itemIndex = parseInt(match[1]);
          if (!errorsByItem.has(itemIndex)) {
            errorsByItem.set(itemIndex, []);
          }
          errorsByItem.get(itemIndex)!.push(error);
        }
      });
      
      // Выводим ошибки по items
      let globalErrorIndex = 1;
      errorsByItem.forEach((itemErrors, itemIndex) => {
        console.group(`\n🔴 Sidebar Item [${itemIndex}] - ошибок: ${itemErrors.length}`);
        
        itemErrors.forEach((error) => {
          console.log(`\n${globalErrorIndex}. ${error.path}`);
          console.log(`   Сообщение: ${error.message}`);
          if (error.value !== undefined) {
            console.log(`   Значение поля:`, error.value);
          }
          globalErrorIndex++;
        });
        
        // Выводим весь проблемный объект item
        if (sidebarData.value && sidebarData.value[itemIndex]) {
          console.log('\n📦 Полный объект sidebar item:');
          console.log(sidebarData.value[itemIndex]);
        }
        
        console.groupEnd();
      });
      
      // Ошибки не привязанные к конкретному item
      const generalErrors = errors.value.filter(error => !error.path.match(/sidebarItems\[(\d+)\]/));
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
      sidebarData,
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


