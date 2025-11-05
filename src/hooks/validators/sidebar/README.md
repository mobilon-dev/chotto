# Валидатор Sidebar Items

Реактивная система валидации для данных sidebar items.

## Быстрый старт

### Простая валидация

```typescript
import { validateSidebarItems, getSidebarValidationReport } from '@/apps/validators/sidebar';
import { sidebarItems } from '@/apps/data/sidebarItems';

const result = validateSidebarItems(sidebarItems);
const report = getSidebarValidationReport(result);

console.log(report);

if (!result.isValid) {
  console.log('Ошибок:', result.errors.length);
}
```

### Реактивная валидация в Vue

```vue
<script setup>
import { ref } from 'vue';
import { useSidebarValidator } from '@/apps/validators/sidebar';
import { sidebarItems } from '@/apps/data/sidebarItems';

const sidebarData = ref(sidebarItems);

const { isValid, errorCount, showReport } = useSidebarValidator(sidebarData, {
  autoValidate: true,
  debounce: 300
});

// Вызвать отчет в консоли
// showReport();
</script>

<template>
  <button @click="showReport">
    Валидация sidebar: {{ isValid ? '✓' : `Ошибок: ${errorCount}` }}
  </button>
</template>
```

## Правила валидации

### Обязательные поля:
- `itemId` (string) - должен быть уникальным
- `icon` (string) - путь к иконке или URL
- `notificationCount` (number) - не может быть отрицательным
- `selected` (boolean)

### Опциональные поля:
- `name` (string) - имя элемента
- `notificationColor` (string) - цвет уведомлений
- `isFixedBottom` (boolean) - закреплен внизу
- `isFixedTop` (boolean) - закреплен вверху

## API

### validateSidebarItems(items: any): SidebarValidationResult

Основная функция валидации данных sidebar items.

**Возвращает:**
```typescript
{
  isValid: boolean;
  errors: SidebarValidationError[];
  warnings: SidebarValidationError[];
}
```

### useSidebarValidator(sidebarData, options)

Vue composable для реактивной валидации.

**Опции:**
- `autoValidate?: boolean` - автоматическая валидация (по умолчанию `true`)
- `debounce?: number` - задержка перед валидацией в мс (по умолчанию `0`)

**Возвращает:**
```typescript
{
  isValid: Ref<boolean>;
  errorCount: Ref<number>;
  showReport: () => void;
  validate: () => SidebarValidationResult;
  reset: () => void;
  // ... и другие
}
```

## Пример вывода

```
📋 Детальный отчет валидации sidebar items
=== РЕЗУЛЬТАТ ВАЛИДАЦИИ SIDEBAR ITEMS ===

❌ Обнаружены ошибки!

🔴 ОШИБКИ (2):
  1. [sidebarItems[0].itemId] Поле itemId обязательно...
  2. [sidebarItems[5].itemId] Дублирующийся itemId

==========================================

📊 Детали ошибок:

🔴 Sidebar Item [5] - ошибок: 1

1. sidebarItems[5].itemId
   Сообщение: Дублирующийся itemId
   Значение поля: "itemId4"

📦 Полный объект sidebar item:
{
  itemId: "itemId4",
  icon: "...",
  name: "Борис",
  notificationCount: 9,
  selected: true
}
```

## Интеграция в MobilonExtendedChatApp

```typescript
import { useSidebarValidator } from '@/apps/validators/sidebar';

const sidebarData = ref(sidebarItems);
const { isValid, errorCount, showReport } = useSidebarValidator(sidebarData, {
  autoValidate: true,
  debounce: 300
});
```

## Типы данных

```typescript
interface SidebarItem {
  itemId: string;              // обязательно, уникальный
  icon: string;                // обязательно
  notificationCount: number;   // обязательно, >= 0
  selected: boolean;           // обязательно
  name?: string;               // опционально
  notificationColor?: string;  // опционально
  isFixedBottom?: boolean;     // опционально
  isFixedTop?: boolean;        // опционально
}
```


