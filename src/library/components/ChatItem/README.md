# ChatItem Component

## Структура стилей с TypeScript и CSS валидацией

Компонент ChatItem использует CSS файлы для тем и TypeScript для валидации. Система автоматически генерирует конфигурацию валидатора на основе TypeScript интерфейсов.

### Структура файлов

```
ChatItem/
├── ChatItem.vue              # Основной компонент
├── types.ts                  # TypeScript типы для валидации
├── validateTheme.ts          # Валидатор тем (TypeScript + CSS)
├── ThemeTester.vue           # Тестер тем
└── styles/
    ├── index.css             # Стили компонента + импорты тем
    └── themes/
        ├── default.css       # Светлая тема
        ├── dark.css          # Темная тема
        └── green.css         # Зеленая тема
```

### Использование

В компоненте стили подключаются через:

```vue
<style scoped>
@import './styles/index.css';
</style>
```

### Валидация

#### 1. TypeScript валидация (на этапе компиляции)

```typescript
// types.ts - определяет все необходимые переменные
export interface ChatItemThemeVariables {
  '--chat-item-padding-container': string
  '--chat-item-background': string
  // ... все переменные
}

// TypeScript покажет ошибку если переменная отсутствует
const invalidTheme: ChatItemThemeVariables = {
  '--chat-item-padding-container': '10px',
  // ❌ Ошибка: отсутствует '--chat-item-background'
}
```

#### 2. Автоматическая генерация конфигурации

```bash
# Генерирует конфигурацию на основе TypeScript интерфейсов
npm run generate-validator-config
```

Генератор:
- Сканирует все компоненты в `src/library/components/`
- Ищет файлы `types.ts` с интерфейсами `*ThemeVariables`
- Проверяет наличие директории `styles/themes/`
- Создает конфигурацию в `scripts/validator-config.js`

#### 3. CSS валидация (проверка файлов)

```bash
# Проверить CSS файлы тем
npm run validate-css-themes:chat-item

# Или полная проверка с генерацией конфигурации
npm run validate-all
```

Валидатор:
- Читает CSS файлы тем
- Извлекает все переменные с помощью regex
- Сравнивает с списком из TypeScript интерфейса
- Показывает отсутствующие переменные

#### 4. Runtime валидация (в браузере)

```typescript
import { validateChatItemTheme } from './validateTheme'

// Проверить активную тему
const isValid = validateChatItemTheme('green')
```

### Как работает система

#### Автоматическая генерация конфигурации

1. **Сканирование компонентов**:
   ```javascript
   // Ищет компоненты с интерфейсами тем
   const themeInterfaceMatch = typesContent.match(/export\s+interface\s+(\w+ThemeVariables)/)
   ```

2. **Создание конфигурации**:
   ```javascript
   // Генерирует scripts/validator-config.js
   const COMPONENTS_CONFIG = {
     'ChatItem': {
       path: 'src/library/components/ChatItem/styles/themes',
       typesFile: 'src/library/components/ChatItem/types.ts',
       interfaceName: 'ChatItemThemeVariables'
     }
   }
   ```

#### CSS валидация

1. **Извлечение переменных из TypeScript**:
   ```javascript
   const variableRegex = /'--[a-zA-Z0-9-]+':\s*string/g
   const matches = interfaceMatch[0].match(variableRegex)
   ```

2. **Парсинг CSS файлов**:
   ```javascript
   const variableRegex = /--chat-item-[a-zA-Z0-9-]+/g
   const matches = cssContent.match(variableRegex)
   ```

3. **Сравнение и отчет**:
   ```
   ✅ ChatItem - light theme
      Found: 43/32 variables
   
   ❌ ChatItem - green theme
      Missing variables (1):
        - --chat-item-background-selected
      Found: 40/32 variables
   ```

### CLI команды

```bash
# Генерировать конфигурацию
npm run generate-validator-config

# Проверить все компоненты
npm run validate-css-themes

# Проверить конкретный компонент
npm run validate-css-themes:chat-item

# Полная проверка (генерация + валидация)
npm run validate-all
```

### Тестирование тем

```vue
<template>
  <ThemeTester />
</template>

<script setup>
import ThemeTester from './ThemeTester.vue'
</script>
```

### Преимущества

1. **TypeScript как источник истины** - все валидаторы используют один интерфейс
2. **Автоматическая генерация** - конфигурация создается автоматически
3. **Масштабируемость** - легко добавлять новые компоненты
4. **TypeScript безопасность** - проверка типов на этапе компиляции
5. **CSS валидация** - проверка файлов на этапе сборки
6. **Runtime проверка** - валидация в браузере
7. **Автодополнение** - IDE подсказывает доступные переменные

### Добавление нового компонента

1. **Создать TypeScript интерфейс** `NewComponent/types.ts`:
   ```typescript
   export interface NewComponentThemeVariables {
     '--new-component-padding': string
     '--new-component-background': string
     // ... переменные
   }
   ```

2. **Создать CSS темы** `NewComponent/styles/themes/`:
   ```css
   [data-theme="light"] {
     --new-component-padding: 10px;
     --new-component-background: white;
   }
   ```

3. **Автоматическое обнаружение**:
   ```bash
   npm run generate-validator-config
   # Автоматически найдет новый компонент
   ```

4. **Проверить валидацию**:
   ```bash
   npm run validate-all
   ```

### Создание новой темы

1. **Создать CSS файл** `themes/new-theme.css`:
   ```css
   [data-theme="new-theme"] {
     --chat-item-padding-container: 15px 30px;
     --chat-item-background: #f0f8ff;
     /* ... остальные переменные */
   }
   ```

2. **Добавить импорт** в `styles/index.css`:
   ```css
   @import './themes/new-theme.css';
   ```

3. **Проверить валидацию**:
   ```bash
   npm run validate-all
   ```

### Переменные для кастомизации

#### Layout
- `--chat-item-padding-container`: Отступы контейнера
- `--chat-item-border-radius`: Радиус границ
- `--chat-item-border`: Границы

#### Avatar
- `--chat-item-avatar-size`: Размер аватара
- `--chat-item-avatar-background`: Фон аватара
- `--chat-item-avatar-icon-color`: Цвет иконки

#### Colors
- `--chat-item-background`: Фон компонента
- `--chat-item-name-color`: Цвет имени
- `--chat-item-message-color`: Цвет сообщения
- `--chat-item-unread-background`: Фон счетчика непрочитанных

#### Spacing
- `--chat-item-avatar-margin-right`: Отступ аватара
- `--chat-item-info-margin-right`: Отступ информации
- `--chat-item-details-gap`: Отступы в деталях

### Пример кастомизации

```css
[data-theme="custom"] {
  /* Изменяем размеры */
  --chat-item-padding-container: 15px 30px 15px 20px;
  --chat-item-avatar-size: 60px;
  --chat-item-border-radius: 12px;
  
  /* Изменяем цвета */
  --chat-item-background: #f0f8ff;
  --chat-item-name-color: #2c3e50;
  --chat-item-unread-background: #e74c3c;
}
```
