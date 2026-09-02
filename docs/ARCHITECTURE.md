# Архитектура проекта Chotto UI

## Обзор

**Chotto UI** — это современная Vue 3 UI библиотека компонентов для создания чат-интерфейсов и AI-ассистентов. Библиотека построена на принципах атомарного дизайна с полной поддержкой TypeScript и продвинутой системой тем.

### Основные характеристики

- **Версия Vue**: 3.5.22+
- **TypeScript**: 5.9.3+
- **Сборщик**: Vite 6.3.6
- **Архитектурный подход**: Компонентная архитектура + Атомарный дизайн
- **Система стилей**: SCSS с CSS переменными
- **Состояние**: Pinia (для демо-приложений)

---

## 1. Общая архитектура

### 1.1 Структура проекта

```
chotto-0.3/
├── src/                      # Исходный код библиотеки
│   ├── components/          # UI компоненты (атомарный дизайн)
│   ├── apps/                # Демо-приложения и примеры использования
│   ├── hooks/               # Композируемые функции (composables)
│   ├── functions/           # Утилитарные функции
│   ├── themes/              # Глобальная система тем
│   ├── types/               # TypeScript типы и интерфейсы
│   ├── locale/              # Система локализации
│   └── index.ts             # Главная точка входа библиотеки
├── scripts/                 # Скрипты валидации и сборки
├── dist/                    # Собранная библиотека
└── docs/                    # Документация (Storybook output)
```

### 1.2 Принципы архитектуры

1. **Модульность** — каждый компонент независим и может использоваться отдельно
2. **Типобезопасность** — полная типизация на TypeScript
3. **Темизация** — все компоненты поддерживают кастомизацию через CSS переменные
4. **Композиция** — использование Composition API Vue 3
5. **Изоляция стилей** — каждый компонент имеет scoped стили
6. **Провайдеры** — абстракция для интеграции с различными бэкендами

---

## 2. Архитектура компонентов

### 2.1 Атомарный дизайн (Atomic Design)

Компоненты организованы по уровням сложности:

#### **1_atoms** — Атомарные компоненты

Базовые неделимые элементы интерфейса:
- `Tooltip` — всплывающие подсказки
- `ContextMenu` — контекстное меню
- `LinkPreview` — превью ссылок
- `EmbedPreview` — превью встроенного контента
- `ButtonContextMenu` — кнопка контекстного меню

**Особенность**: Атомы исключены из системы компонентных тем (используют только глобальные переменные).

#### **1_icons** — Иконки

Набор SVG иконок:
- `AvatarIcon`, `CheckIcon`, `MenuIcon`, `SearchIcon`
- `TelegramIcon`, `WhatsAppIcon`
- `ContactCRMIcon`, `SettingsIcon`

#### **2_blocks** — Блочные компоненты

Простые функциональные блоки:
- `FeedSearch` — поиск по сообщениям
- `FeedFoundObjects` — результаты поиска
- `SelectUser` / `SelectUser2` — выбор пользователя
- `CommunicationPanel` — панель коммуникации с каналами

#### **2_chatinput_elements** — Элементы ввода сообщений

Компоненты для работы с вводом:
- `FileUploader` — загрузка файлов
- `FilePreview` — превью файлов
- `ButtonEmojiPicker` — выбор эмодзи
- `ButtonTemplateSelector` — выбор шаблона сообщения
- `WABATemplateSelector` — WABA шаблоны
- `ButtonCommandsSelector` — команды бота

#### **2_chatlist_elements** — Элементы списка чатов

- `ChatItem` — элемент списка чата
- `ChatFilter` — фильтр чатов
- `ChatTabs` — табы для категорий чатов

#### **2_elements** — Общие элементы

Переиспользуемые элементы:
- `ChatInfo` — информация о чате
- `ChatPanel` — боковая панель чата
- `ContactInfo` — информация о контакте
- `UserProfile` — профиль пользователя
- `ThemeMode` — переключатель тем
- `AudioRecorder` — запись аудио
- `VideoRecorder` — запись видео
- `ChannelSelector` — выбор канала коммуникации

#### **2_feed_elements** — Элементы ленты сообщений

Типы сообщений:
- `TextMessage` — текстовое сообщение
- `ImageMessage` — изображение
- `AudioMessage` — аудио с плеером
- `VideoMessage` — видео с плеером
- `FileMessage` — файл
- `CallMessage` — звонок с транскрипцией
- `SystemMessage` — системное уведомление
- `DateMessage` — разделитель даты
- `DateMessageSticky` — липкий разделитель даты
- `TypingMessage` — индикатор печати

Ответы на сообщения (Reply):
- `ReplyTextMessage`, `ReplyImageMessage`, `ReplyAudioMessage`
- `ReplyVideoMessage`, `ReplyFileMessage`, `ReplyCallMessage`
- `BaseReplyMessage` — базовый компонент ответа

Специальные элементы:
- `FeedKeyboard` — клавиатура быстрых ответов
- `MessageKeyboard` — клавиатура в сообщении
- `SplashScreen` — экран-заглушка

#### **2_modals** — Модальные окна

- `Modal` — базовое модальное окно
- `ModalFullscreen` — полноэкранная модалка
- `ModalNoFooter` — модалка без футера
- `CreateChat` / `CreateChat2` — создание чата
- `CreateDialog` — создание диалога
- `ModalVideoRecorder` — запись видео в модалке

#### **3_compounds** — Составные компоненты

Сложные компоненты из нескольких элементов:
- `ChatInput` — полнофункциональное поле ввода сообщения
- `ChatList` — список чатов с фильтрацией и поиском
- `Feed` — лента сообщений с виртуальной прокруткой
- `SideBar` — боковое меню навигации

#### **4_layouts** — Макеты (Layouts)

Компоненты структуры приложения:
- `BaseLayout` — базовый 2-колоночный макет
- `ExtendedLayout` — расширенный 3-колоночный макет
- `AdaptiveExtendedLayout` — адаптивный 3-колоночный макет
- `FeedLayout` — макет для ленты сообщений
- `ChatWrapper` — обертка для области чата

#### **5_containers** — Контейнеры

Высокоуровневые обертки:
- `BaseContainer` — базовый контейнер приложения
- `FloatContainer` — плавающий контейнер

### 2.2 Структура компонента

Каждый компонент имеет стандартизированную структуру:

```
ComponentName/
├── ComponentName.vue        # Vue компонент
├── README.md               # Документация компонента
├── stories/                # Storybook истории
│   └── ComponentName.stories.ts
└── styles/                 # Стили компонента
    ├── types.ts           # TypeScript интерфейс темы
    ├── ComponentName.scss # Основные стили (scoped)
    └── themes/            # Темы компонента
        ├── default.scss   # Светлая тема
        ├── dark.scss      # Темная тема
        ├── green.scss     # Зеленая тема
        └── mobilon1.scss  # Тема Mobilon
```

**Пример типов темы** (`styles/types.ts`):

```typescript
export interface ComponentNameThemeCSSVariables {
  '--chotto-componentname-property': string;
  '--chotto-componentname-background': string;
  '--chotto-componentname-text-color': string;
  // ...
}
```

**Пример файла темы** (`styles/themes/dark.scss`):

```scss
[data-theme="dark"] {
  --chotto-componentname-property: var(--chotto-theme-primary-color);
  --chotto-componentname-background: #1a1a1a;
  --chotto-componentname-text-color: var(--chotto-theme-primary-text-color);
}
```

---

## 3. Система тем

### 3.1 Двухуровневая архитектура тем

#### Уровень 1: Глобальные темы (`src/themes/`)

Определяют базовые переменные для всего приложения:

```
src/themes/
├── types.ts              # TypeScript интерфейс ChottoThemeVariables
├── index.ts              # Экспорты
├── index.scss            # Импорт всех тем
├── global.scss           # Глобальные стили
├── default/              # Светлая тема
│   └── vars.scss
├── dark/                 # Темная тема
│   └── vars.scss
├── green/                # Зеленая тема
│   └── vars.scss
└── mobilon1/             # Тема Mobilon
    └── vars.scss
```

**Глобальные переменные** (82 переменные):

```scss
[data-theme="default"] {
  // Основные цвета
  --chotto-theme-primary-color: #10b981;
  --chotto-theme-secondary-color: #6b7280;
  --chotto-theme-tertiary-color: #f3f4f6;
  
  // Типографика
  --chotto-theme-font-family: 'Inter', sans-serif;
  --chotto-theme-header-font-size: 1.5rem;
  --chotto-theme-text-font-size: 0.875rem;
  
  // Сообщения
  --chotto-theme-message-right-bg: #dcf8c6;
  --chotto-theme-message-left-bg: #ffffff;
  
  // ... и т.д.
}
```

#### Уровень 2: Компонентные темы (`src/components/**/styles/themes/`)

Переопределяют стили для конкретного компонента:

```scss
[data-theme="dark"] {
  --chotto-modal-backdrop-bg: rgba(0, 0, 0, 0.8);
  --chotto-modal-text-color: var(--chotto-theme-primary-text-color);
  --chotto-modal-border: 1px solid var(--chotto-theme-border-color);
}
```

### 3.2 Принципы работы с темами

1. **Использование CSS переменных** — все значения через `var(--variable-name, fallback)`
2. **Обязательные фолбеки** — каждая переменная имеет значение по умолчанию
3. **Префиксы** — глобальные `--chotto-theme-*`, компонентные `--chotto-componentname-*`
4. **Запрет хардкода** — нельзя использовать прямые значения цветов, размеров и т.д.
5. **Изоляция** — файлы тем содержат только CSS переменные, без классов

### 3.3 Доступные темы

| Тема | data-theme | Описание |
|------|-----------|----------|
| Default | `"default"` | Светлая тема по умолчанию |
| Dark | `"dark"` | Темная тема с нейтральными цветами |
| Green | `"green"` | Зеленая тема с изумрудными акцентами |
| Mobilon1 | `"mobilon1"` | Брендовая тема Mobilon |

### 3.4 Система валидации тем

Проект включает комплексную систему валидации (**11 типов проверок**):

```bash
npm run validate-themes
```

**Проверки:**
1. Соответствие интерфейсам TypeScript
2. Правильность префиксов CSS переменных
3. Отсутствие глобальных переменных в компонентах
4. Использование только разрешенных переменных в темах
5. Отсутствие хардкода (цвета, размеры, шрифты)
6. Отсутствие `data-theme` в основных стилях
7. Отсутствие CSS классов в файлах тем
8. Отсутствие импортов тем в стилях
9. Использование фолбеков в CSS переменных
10. Scoped стили в `.vue` файлах
11. Соответствие глобальных тем интерфейсу

---

## 4. Система типов

### 4.1 Типы сообщений

Определены в `src/types/index.ts` и `src/components/2_feed_elements/types/`:

```typescript
// Текстовое сообщение
interface ITextMessage {
  messageId: string;
  text: string;
  position: 'left' | 'right';  // входящее/исходящее
  status: 'sent' | 'delivered' | 'read' | 'error';
  time: string;
  avatar?: string;
  header?: string;
  subText?: string;
  actions?: IAction[];
  views?: number;
  reply?: Reply;
  linkPreview?: ILinkPreview;
  embed?: object;
  keyboard?: IKeyBoard[];
}

// Медиа сообщения
interface IImageMessage { /* ... */ }
interface IAudioMessage { /* ... */ }
interface IVideoMessage { /* ... */ }
interface IFileMessage { /* ... */ }
interface ICallMessage { /* ... */ }

// Системные
interface ISystemMessage { /* ... */ }
interface IDateMessage { /* ... */ }
interface ITypingMessage { /* ... */ }
```

### 4.2 Типы чатов

Определены в `src/components/2_chatlist_elements/ChatItem/types.ts`:

```typescript
interface IChat {
  chatId: string;
  title: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  status?: 'online' | 'offline' | 'away';
  typing?: boolean;
  pinned?: boolean;
  // ...
}
```

### 4.3 Типы для валидации

Система валидации с типизацией (`src/hooks/validators/`):

```typescript
// Валидатор чатов
interface ChatValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  errorCount: number;
}

// Валидатор сообщений
interface MessageValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  errorCount: number;
}
```

---

## 5. Hooks (Композируемые функции)

### 5.1 Структура hooks

```
src/hooks/
├── index.ts                    # Главный экспорт
├── modals/                     # Хуки для модальных окон
│   ├── useCreateChat.ts
│   ├── useCreateChat2.ts
│   ├── useCreateDialog.ts
│   ├── useModalSelectUser2.ts
│   └── useVideoRecorder.ts
├── uploadFile/                 # Хуки для загрузки файлов
│   ├── types.ts                # ChottoUploadFileFn, chottoUploadFileKey
│   ├── useChottoUploader.ts    # DI: prop > inject > default
│   ├── uploadFile.ts           # Default adapter: POST {filebumpUrl}/upload
│   ├── generatePreview.ts
│   └── getTypeFileByMime.ts
├── validators/                 # Хуки для валидации
│   ├── chats/
│   ├── messages/
│   └── sidebar/
├── useTheme.ts                # Управление темами
├── useMessage.ts              # Работа с сообщениями
├── useSearchModel.ts          # Поиск
├── useDelayDebouncedRef.ts    # Дебаунс с задержкой
└── useImmediateDebouncedRef.ts # Мгновенный дебаунс
```

### 5.2 Примеры использования хуков

#### useTheme — Управление темами

```typescript
import { useTheme } from '@mobilon-dev/chotto';

const { getTheme } = useTheme('container-id');
const theme = getTheme(); // { id: 'container-id', theme: 'dark' }
```

#### useModalCreateChat — Модальное окно создания чата

```typescript
import { useModalCreateChat } from '@mobilon-dev/chotto';

const { showModal } = useModalCreateChat({
  onConfirm: (chatData) => {
    console.log('Создан чат:', chatData);
  }
});

showModal();
```

#### useChatValidator — Валидация чатов

```typescript
import { useChatValidator } from '@mobilon-dev/chotto';

const { validateChats, isValid, errors } = useChatValidator();

const result = validateChats(chatsArray);
console.log('Валидно:', result.isValid);
console.log('Ошибки:', result.errors);
```

---

## 6. Провайдеры (Providers)

### 6.1 Архитектура провайдеров

Библиотека использует паттерн **Provider** для абстракции от конкретной реализации бэкенда.

```typescript
// Auth Provider — авторизация
interface AuthProvider {
  getUserProfile(): UserProfile;
}

// Data Provider — работа с данными
interface DataProvider {
  getFeed(chatId: string): Message[];
  getMoreFeedUp(chatId: string, messageId: string, length: number): Message[];
  getMoreFeedDown(chatId: string, messageId: string, length: number): Message[];
  getFeedByMessage(chatId: string, messageId: string): Message[];
  getMessagesBySearch(chatId: string, query: string): Message[];
  getLastMessage(chatId: string): Message;
  getChats(): Chat[];
  getUsers(): User[];
  getChannels(): Channel[];
  getTemplates(): Template[];
  getWABATemplates(): WABATemplate[];
  getGroupTemplates(): GroupTemplate[];
  addMessage(message: Message): void;
  getSidebarItems(): SidebarItem[];
}

// Event Provider — события в реальном времени
interface Eventor {
  push(event: Event): void;
  subscribe(callback: (event: Event) => void): void;
}
```

### 6.2 Использование провайдеров

```vue
<template>
  <ChatApp
    :auth-provider="authProvider"
    :data-provider="dataProvider"
    :eventor="eventor"
  />
</template>

<script setup>
import { authProvider, dataProvider, eventor } from './providers';
</script>
```

**Преимущества:**
- Легкая интеграция с любым бэкендом
- Тестируемость (mock-провайдеры)
- Разделение ответственности
- Единый интерфейс

---

## 7. Демо-приложения

### 7.1 Примеры приложений

Проект включает **7 готовых примеров** (`src/apps/`):

| Приложение | Описание | Макет |
|-----------|----------|-------|
| `BaseBaseChatApp` | Базовое чат-приложение | 2-колоночный |
| `BaseExtendedChatApp` | Расширенное приложение | 3-колоночный |
| `BaseAdaptiveExtendedChatApp` | Адаптивное приложение | Адаптивный 3-колоночный |
| `MobilonExtendedChatApp` | Полнофункциональное приложение Mobilon | 3-колоночный с валидацией |
| `BaseFeedChatApp` | Приложение только с лентой | FeedLayout |
| `FloatExtendedChatApp` | Плавающий чат-виджет | FloatContainer |

### 7.2 Пример использования

```vue
<template>
  <BaseContainer height="90vh" width="90vw">
    <ExtendedLayout>
      <!-- Sidebar -->
      <template #first-col>
        <SideBar :sidebar-items="sidebarItems" />
        <ThemeMode :themes="themes" />
      </template>
      
      <!-- Chat List -->
      <template #second-col>
        <ChatList 
          :chats="chats" 
          @select="selectChat"
        />
      </template>
      
      <!-- Chat Area -->
      <template #third-col>
        <ChatWrapper>
          <ChatInfo :chat="selectedChat" />
          <Feed :objects="messages" />
          <ChatInput @send="sendMessage" />
        </ChatWrapper>
      </template>
    </ExtendedLayout>
  </BaseContainer>
</template>
```

### 7.3 Демо-данные

Mock-данные для примеров (`src/apps/data/`):
- `messages.ts` — набор сообщений всех типов
- `chats.ts` — список чатов
- `channels.ts` — каналы коммуникации
- `templates.ts` — шаблоны сообщений
- `wabaTemplates.ts` — WABA шаблоны
- `userProfile.ts` — профиль пользователя
- `sidebarItems.ts` — элементы меню
- `themes.ts` — конфигурация тем

---

## 8. Система функций

### 8.1 Утилитарные функции (`src/functions/`)

```typescript
// Форматирование времени
export function formatTimestamp(timestamp: number): string;

// Получение статуса сообщения
export function getStatusMessage(status: string): string;

// Вставка разделителей дат
export function insertDaySeparators(messages: Message[]): Message[];

// Сортировка по времени
export function sortByTimestamp(objects: any[]): any[];

// Воспроизведение звука уведомления
export function playNotificationAudio(): void;
```

### 8.2 Использование

```typescript
import { 
  formatTimestamp, 
  insertDaySeparators 
} from '@mobilon-dev/chotto';

const formattedTime = formatTimestamp(Date.now() / 1000);
const messagesWithDates = insertDaySeparators(messages);
```

---

## 9. Локализация

### 9.1 Поддерживаемые языки

- 🇷🇺 Русский (`ru.js`)
- 🇺🇸 Английский (`en.js`)

### 9.2 Структура локализации

```javascript
// src/locale/ru.js
export default {
  component: {
    ChatInput: {
      InputPlaceholder: 'Введите сообщение...',
      SendButton: 'Отправить'
    },
    ChatList: {
      SearchPlaceholder: 'Поиск...',
      NoChats: 'Нет чатов'
    }
    // ...
  }
}
```

### 9.3 Использование

```typescript
import { useLocale } from '@mobilon-dev/chotto';

const { t, setLocale } = useLocale();

// Получение перевода
const placeholder = t('component.ChatInput.InputPlaceholder');

// Смена языка
setLocale('en');
```

---

## 10. Система сборки

### 10.1 Конфигурация Vite

**Основная сборка** (`vite.config.ts`):
- Сборка библиотеки в ES и UMD форматах
- Внешняя зависимость Vue (peer dependency)
- Поддержка SCSS с modern-compiler
- TypeScript декларации

**Сборка тем** (`vite.themes.config.ts`):
- Отдельная сборка CSS файлов тем
- Экспорт индивидуальных тем:
  - `themes/default.css`
  - `themes/dark.css`
  - `themes/green.css`
  - `themes/mobilon1.css`

### 10.2 NPM Scripts

```json
{
  "dev": "vite",                              // Запуск dev-сервера
  "build": "vite build && ...",               // Полная сборка
  "build:lib": "vite build && vue-tsc ...",   // Сборка библиотеки
  "build:themes": "vite build --config ...",  // Сборка тем
  "storybook": "storybook dev -p 6006",       // Запуск Storybook
  "build-storybook": "storybook build ...",   // Сборка Storybook
  "validate-themes": "tsx ./scripts/...",     // Валидация тем
  "prepublishOnly": "npm run build && ...",   // Pre-publish хук
  "lint": "npx eslint .",                     // Линтинг
  "lint-fix": "npx eslint . --fix"            // Автофикс линтинга
}
```

### 10.3 Экспорты пакета

```json
{
  "main": "./dist/vuessages.umd.js",
  "module": "./dist/vuessages.es.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/vuessages.es.js",
      "require": "./dist/vuessages.umd.js"
    },
    "./style.css": "./dist/chotto.css",
    "./themes/default.css": "./dist/themes/default.css",
    "./themes/dark.css": "./dist/themes/dark.css",
    "./themes/green.css": "./dist/themes/green.css",
    "./themes/mobilon1.css": "./dist/themes/mobilon1.css"
  }
}
```

---

## 11. Особенности архитектуры

### 11.1 Виртуальная прокрутка

Компонент `Feed` использует виртуальную прокрутку для оптимизации производительности при большом количестве сообщений.

### 11.2 Ленивая загрузка модальных окон

Модальные окна загружаются динамически через композируемые функции:

```typescript
// Компонент не импортируется напрямую
// Загружается только при вызове showModal()
const { showModal } = useModalCreateChat({...});
```

### 11.3 Реактивные события

Система событий через Eventor позволяет обновлять интерфейс в реальном времени:

```typescript
eventor.push({ 
  type: 'message', 
  data: newMessage 
});

eventor.push({ 
  type: 'notification', 
  data: systemNotification 
});
```

### 11.4 Адаптивность

Макеты автоматически адаптируются под размер экрана:
- **Desktop** — 3 колонки (Sidebar + ChatList + Feed)
- **Tablet** — 2 колонки (ChatList + Feed)
- **Mobile** — 1 колонка (переключение между ChatList и Feed)

### 11.5 Типобезопасность

Все компоненты, хуки и функции полностью типизированы:
- TypeScript интерфейсы для всех props
- Type guards для валидации данных
- Декларации типов в `dist/types/`

---

## 12. Паттерны и best practices

### 12.1 Composition API

Все компоненты используют `<script setup>`:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
  chat: IChat;
  messages: IMessage[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [chatId: string];
}>();
</script>
```

### 12.2 Scoped стили

Каждый компонент имеет изолированные стили:

```vue
<style scoped lang="scss">
.component {
  background: var(--chotto-component-bg, #fff);
  color: var(--chotto-component-text, #000);
}
</style>
```

### 12.3 Props validation

Использование TypeScript интерфейсов для валидации:

```typescript
interface ChatInputProps {
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

const props = withDefaults(defineProps<ChatInputProps>(), {
  placeholder: 'Type a message...',
  disabled: false,
  maxLength: 5000
});
```

### 12.4 Events naming

События именуются в kebab-case:

```typescript
emit('select-chat', chatId);
emit('send-message', message);
emit('load-more', offset);
```

### 12.5 Composables pattern

Переиспользуемая логика выносится в композируемые функции:

```typescript
// useSearchModel.ts
export function useSearchModel() {
  const query = ref('');
  const results = ref([]);
  
  const search = (q: string) => {
    query.value = q;
    // search logic
  };
  
  return { query, results, search };
}
```

---

## 13. Расширяемость

### 13.1 Добавление новой темы

1. Создать директорию `src/themes/mytheme/`
2. Создать файл `vars.scss` с переменными
3. Добавить импорт в `src/themes/index.scss`
4. Обновить тип `ThemeName` в `src/themes/types.ts`
5. Запустить валидацию `npm run validate-themes`

### 13.2 Создание кастомного компонента

1. Создать директорию в соответствующей категории
2. Создать `.vue` файл с scoped стилями
3. Создать `styles/types.ts` с интерфейсом темы
4. Создать файлы тем в `styles/themes/*.scss`
5. Добавить экспорт в `src/components/index.ts`

### 13.3 Кастомизация провайдеров

Реализовать интерфейсы `AuthProvider`, `DataProvider`, `Eventor` под свой бэкенд:

```typescript
const myDataProvider: DataProvider = {
  async getFeed(chatId) {
    return await fetch(`/api/chats/${chatId}/messages`);
  },
  // ... остальные методы
};
```

---

## 14. Производительность

### 14.1 Оптимизации

- **Tree-shaking** — неиспользуемые компоненты не попадут в бандл
- **Виртуальная прокрутка** — рендер только видимых сообщений
- **Ленивая загрузка** — динамический импорт тяжелых компонентов
- **Debouncing** — оптимизация поиска и фильтрации
- **Мемоизация** — кеширование вычисляемых значений

### 14.2 Размер бандла

- **ES module**: ~XXX KB (gzipped)
- **UMD module**: ~XXX KB (gzipped)
- **CSS**: ~XX KB (gzipped)
- **Each theme**: ~X KB (gzipped)

---

## 15. Тестирование

### 15.1 Валидация тем

Автоматическая проверка корректности тем:

```bash
npm run validate-themes
```

11 типов проверок обеспечивают:
- Типобезопасность
- Консистентность тем
- Отсутствие хардкода
- Правильность именования

### 15.2 Storybook

Интерактивная документация всех компонентов:

```bash
npm run storybook
```

Каждый компонент имеет истории с различными состояниями и примерами использования.

---

## 16. Зависимости

### 16.1 Production зависимости

```json
{
  "vue": "^3.5.22",
  "linkify-string": "^4.3.2",
  "linkifyjs": "^4.3.2",
  "primeicons": "^7.0.0",
  "sass-embedded": "^1.93.2",
  "vue3-emoji-picker": "^1.1.8",
  "@fontsource/inter": "^5.2.8",
  "@fontsource/montserrat": "^5.2.8",
  "@fontsource/open-sans": "^5.2.7"
}
```

### 16.2 Peer зависимости

```json
{
  "vue": "^3.5.0"
}
```

---

## 17. Roadmap и развитие

Текущие приоритеты развития указаны в `TODO.md`:

### Компоненты требующие доработки

**Атомы (1_atoms)**:
- Tooltip, ContextMenu, EmbedPreview, LinkPreview

**Блоки (2_blocks)**:
- SelectUser2, FeedSearch, CommunicationPanel

**Элементы ввода (2_chatinput_elements)**:
- ButtonEmojiPicker, FileUploader, WABATemplateSelector

**Элементы (2_elements)**:
- ChatPanel, ChatInfo, ThemeMode, VideoRecorder

**Модали (2_modals)**:
- Modal, ModalFullscreen, CreateDialog

**Layouts (4_layouts)**:
- ExtendedLayout, AdaptiveExtendedLayout, ChatWrapper

---

## 18. Заключение

**Chotto UI** представляет собой хорошо продуманную архитектуру для создания современных чат-интерфейсов:

### Ключевые преимущества архитектуры:

1. **Модульность** — используйте только нужные компоненты
2. **Типобезопасность** — полная поддержка TypeScript
3. **Гибкая темизация** — двухуровневая система тем с валидацией
4. **Провайдеры** — легкая интеграция с любым бэкендом
5. **Атомарный дизайн** — понятная иерархия компонентов
6. **Производительность** — виртуальная прокрутка, tree-shaking
7. **Расширяемость** — четкие паттерны для добавления функциональности
8. **Документация** — Storybook с примерами всех компонентов

### Архитектурные решения:

- ✅ Композитный подход (Composition API)
- ✅ Изоляция стилей (scoped CSS)
- ✅ CSS переменные вместо хардкода
- ✅ Провайдеры вместо жесткой связи с бэкендом
- ✅ Валидация на уровне типов и рантайма
- ✅ Автоматизированная проверка консистентности

Библиотека готова к использованию в production и активно развивается сообществом.

---

**Версия документа**: 1.0  
**Дата**: 2025-10-16  
**Автор**: AI Architecture Analysis

