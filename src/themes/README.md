# Chotto Themes

Система тем для проекта chotto-themes-prototype с полной типизацией TypeScript.

## 📁 Структура

```
src/themes/
├── types.ts          # TypeScript типы для тем
├── constants.ts      # Константы и конфигурация
├── index.ts          # Главный экспорт
├── index.scss        # Основные стили тем
├── dark/             # Темная тема
├── default/          # Светлая тема по умолчанию
├── green/            # Зеленая тема
└── mobilon1/         # Тема Mobilon
```

## 🎯 Основные типы

### ThemeName
```typescript
type ThemeName = 'dark' | 'default' | 'green' | 'mobilon1';
```

### ChottoThemeVariables
Интерфейс всех CSS переменных темы:
```typescript
interface ChottoThemeVariables {
  '--chotto-theme-font-family': FontFamily;
  '--chotto-theme-container-font-weight': FontWeight;
  // ... все остальные переменные
}
```

### ThemeConfig
Конфигурация темы:
```typescript
interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  description: string;
  variables: ChottoThemeVariables;
}
```

## 🔧 Константы

### THEME_NAMES
```typescript
const THEME_NAMES: ThemeName[] = ['dark', 'default', 'green', 'mobilon1'];
```

### REQUIRED_THEME_VARIABLES
Список обязательных переменных (должны быть во всех темах):
```typescript
const REQUIRED_THEME_VARIABLES = [
  '--chotto-theme-font-family',
  '--chotto-theme-container-font-weight',
  // ... 67 переменных
];
```

### OPTIONAL_THEME_VARIABLES
Список опциональных переменных (только в некоторых темах):
```typescript
const OPTIONAL_THEME_VARIABLES = [
  '--chotto-theme-header-font',
  '--chotto-theme-header-font-color',
  // ... 7 переменных
];
```

## 🚀 Использование

### Импорт типов
```typescript
import type { ThemeName, ChottoThemeVariables } from '@/themes';
```

### Импорт констант
```typescript
import { THEME_NAMES, REQUIRED_THEME_VARIABLES } from '@/themes';
```

### Проверка темы
```typescript
function isValidTheme(theme: string): theme is ThemeName {
  return THEME_NAMES.includes(theme as ThemeName);
}
```

### Работа с переменными
```typescript
function getThemeVariable(theme: ThemeName, variable: ChottoThemeVariableName): string {
  // Получение значения переменной темы
}
```

## ✅ Валидация

Система включает встроенную валидацию тем:

```bash
# Проверка консистентности тем
npm run validate-themes

# TypeScript версия с полной типизацией
npm run validate-themes:ts
```

## 📋 Требования к темам

1. **Обязательные переменные** - должны быть во всех темах
2. **Опциональные переменные** - могут быть только в некоторых темах
3. **Консистентность** - все темы должны иметь одинаковый набор переменных
4. **Синтаксис** - корректные CSS значения

## 🎨 Поддерживаемые темы

- **dark** - Темная тема с нейтральными цветами
- **default** - Светлая тема по умолчанию
- **green** - Зеленая тема с изумрудными акцентами
- **mobilon1** - Брендовая тема Mobilon

## 🔍 Отладка

Для отладки проблем с темами используйте скрипт валидации:

```bash
npm run validate-themes:ts
```

Скрипт покажет:
- ❌ Отсутствующие переменные
- ⚠️ Лишние переменные
- 📊 Статистику по темам
- 🔍 Детальную информацию
