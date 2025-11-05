/**
 * Валидатор для данных sidebar items
 */

export interface SidebarValidationError {
  path: string;
  message: string;
  value?: any;
}

export interface SidebarValidationResult {
  isValid: boolean;
  errors: SidebarValidationError[];
  warnings: SidebarValidationError[];
}

/**
 * Валидатор отдельного sidebar item
 */
function validateSidebarItem(item: any, index: number): SidebarValidationError[] {
  const errors: SidebarValidationError[] = [];
  const path = `sidebarItems[${index}]`;

  if (typeof item !== 'object' || item === null) {
    errors.push({ path, message: 'SidebarItem должен быть объектом', value: item });
    return errors;
  }

  // Обязательные поля
  if (!item.itemId || typeof item.itemId !== 'string') {
    errors.push({ path: `${path}.itemId`, message: 'Поле itemId обязательно и должно быть строкой', value: item.itemId });
  }

  if (!item.icon || typeof item.icon !== 'string') {
    errors.push({ path: `${path}.icon`, message: 'Поле icon обязательно и должно быть строкой', value: item.icon });
  }

  if (item.notificationCount === undefined || typeof item.notificationCount !== 'number') {
    errors.push({ path: `${path}.notificationCount`, message: 'Поле notificationCount обязательно и должно быть числом', value: item.notificationCount });
  } else if (item.notificationCount < 0) {
    errors.push({ path: `${path}.notificationCount`, message: 'Поле notificationCount не может быть отрицательным', value: item.notificationCount });
  }

  if (item.selected === undefined || typeof item.selected !== 'boolean') {
    errors.push({ path: `${path}.selected`, message: 'Поле selected обязательно и должно быть boolean', value: item.selected });
  }

  // Опциональные поля
  if (item.name !== undefined && typeof item.name !== 'string') {
    errors.push({ path: `${path}.name`, message: 'Поле name должно быть строкой', value: item.name });
  }

  if (item.notificationColor !== undefined && typeof item.notificationColor !== 'string') {
    errors.push({ path: `${path}.notificationColor`, message: 'Поле notificationColor должно быть строкой', value: item.notificationColor });
  }

  if (item.isFixedBottom !== undefined && typeof item.isFixedBottom !== 'boolean') {
    errors.push({ path: `${path}.isFixedBottom`, message: 'Поле isFixedBottom должно быть boolean', value: item.isFixedBottom });
  }

  if (item.isFixedTop !== undefined && typeof item.isFixedTop !== 'boolean') {
    errors.push({ path: `${path}.isFixedTop`, message: 'Поле isFixedTop должно быть boolean', value: item.isFixedTop });
  }

  return errors;
}

/**
 * Основная функция валидации списка sidebar items
 */
export function validateSidebarItems(items: any): SidebarValidationResult {
  const errors: SidebarValidationError[] = [];
  const warnings: SidebarValidationError[] = [];

  // Проверка что это массив
  if (!Array.isArray(items)) {
    return {
      isValid: false,
      errors: [{ path: 'sidebarItems', message: 'Данные должны быть массивом', value: items }],
      warnings: []
    };
  }

  // Проверка что массив не пустой
  if (items.length === 0) {
    warnings.push({ path: 'sidebarItems', message: 'Массив sidebar items пустой' });
  }

  // Проверка уникальности itemId
  const itemIds = new Set<string>();
  items.forEach((item: any, index: number) => {
    if (item && typeof item === 'object' && item.itemId !== undefined) {
      if (itemIds.has(item.itemId)) {
        errors.push({ 
          path: `sidebarItems[${index}].itemId`, 
          message: 'Дублирующийся itemId', 
          value: item.itemId 
        });
      } else {
        itemIds.add(item.itemId);
      }
    }
  });

  // Валидация каждого item
  items.forEach((item: any, index: number) => {
    errors.push(...validateSidebarItem(item, index));
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
export function getSidebarValidationReport(result: SidebarValidationResult): string {
  const lines: string[] = [];
  
  lines.push('=== РЕЗУЛЬТАТ ВАЛИДАЦИИ SIDEBAR ITEMS ===\n');
  
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

  lines.push('\n' + '='.repeat(42));
  
  return lines.join('\n');
}


