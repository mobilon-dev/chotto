# Решение проблемы State Management в Chotto UI

## Содержание

1. [Текущая проблема](#текущая-проблема)
2. [Анализ требований](#анализ-требований)
3. [Варианты решения](#варианты-решения)
4. [Сравнение решений](#сравнение-решений)
5. [Рекомендуемое решение](#рекомендуемое-решение)
6. [План миграции](#план-миграции)
7. [Примеры использования](#примеры-использования)

---

## Текущая проблема

### Что не так?

```typescript
// src/hooks/useMessage.ts
const messages = ref<Message[]>([])  // ❌ ГЛОБАЛЬНОЕ СОСТОЯНИЕ!

export const useMessage = (outId: string) => {
  const foundMessage = messages.value.find(({id}) => id == outId)
  // Все экземпляры используют ОДИН И ТОТ ЖЕ массив
  // ...
}
```

```typescript
// src/hooks/useTheme.ts
const themes = ref<Theme[]>([])  // ❌ ГЛОБАЛЬНОЕ СОСТОЯНИЕ!

export const useTheme = (outId: string) => {
  const foundTheme = themes.value.find(({id}) => id == outId)
  // ...
}
```

### Последствия

#### 1. **Утечки памяти**
```typescript
// Пользователь открывает чат #1
const { getMessage } = useMessage('chat-1')
getMessage().text = 'Hello'

// Пользователь переходит в чат #2
const { getMessage } = useMessage('chat-2')

// Пользователь закрывает чат #1
// ❌ Сообщение chat-1 ОСТАЕТСЯ в памяти навсегда!
// messages = [
//   { id: 'chat-1', text: 'Hello' },  ← мертвое сообщение
//   { id: 'chat-2', text: '' }
// ]
```

**Проблема:** Нет механизма очистки неиспользуемых данных.

#### 2. **Проблемы с SSR**
```typescript
// Server-side rendering
// Рендерим страницу для пользователя A
useMessage('user-a-chat')  // messages = [{ id: 'user-a-chat' }]

// Рендерим страницу для пользователя B
useMessage('user-b-chat')  // messages = [{ id: 'user-a-chat' }, { id: 'user-b-chat' }]
//                                        ^^^^^^^^^^^^^^^^
//                                        УТЕЧКА ДАННЫХ пользователя A!
```

**Проблема:** На сервере глобальное состояние делится между запросами.

#### 3. **Невозможность использовать несколько экземпляров**
```vue
<template>
  <!-- Два чата на одной странице -->
  <ChatApp chat-id="chat-1" />
  <ChatApp chat-id="chat-2" />
  
  <!-- ❌ Оба используют ОДНО глобальное состояние! -->
</template>
```

#### 4. **Сложность тестирования**
```typescript
describe('ChatInput', () => {
  it('test 1', () => {
    const { getMessage } = useMessage('test')
    getMessage().text = 'Hello'
    // ...
  })
  
  it('test 2', () => {
    const { getMessage } = useMessage('test')
    // ❌ Состояние из test 1 все еще здесь!
    expect(getMessage().text).toBe('')  // FAIL: 'Hello'
  })
})
```

#### 5. **Нет изоляции компонентов**
```typescript
// Компонент A
const { getMessage } = useMessage('chat-1')
getMessage().text = 'Hello'

// Компонент B (в другом месте приложения)
const { getMessage } = useMessage('chat-1')
console.log(getMessage().text)  // 'Hello' - неожиданная связь!
```

---

## Анализ требований

### Что нужно библиотеке?

#### 1. **Изолированное состояние на экземпляр**
```typescript
// Каждый ChatApp должен иметь свое состояние
<ChatApp id="instance-1" />  // Свое состояние
<ChatApp id="instance-2" />  // Свое состояние
```

#### 2. **Управление временем жизни**
- Создание состояния при монтировании компонента
- Очистка состояния при размонтировании
- Garbage collection для неиспользуемых данных

#### 3. **SSR-совместимость**
- Отдельное состояние для каждого запроса на сервере
- Hydration на клиенте
- Нет утечек между пользователями

#### 4. **Типобезопасность**
- TypeScript типы для всего состояния
- Автокомплит в IDE
- Compile-time проверки

#### 5. **DevTools интеграция**
- Просмотр состояния в Vue DevTools
- Time-travel debugging (желательно)
- Логирование изменений

#### 6. **Производительность**
- Минимальные ре-рендеры
- Оптимизация для больших объемов данных
- Ленивая инициализация

#### 7. **Простота использования**
- Понятный API для разработчиков библиотеки
- Понятный API для пользователей библиотеки
- Минимум boilerplate кода

---

## Варианты решения

### Вариант 1: Pinia Store (рекомендуемый)

**Идея:** Использовать Pinia как официальное решение для Vue 3

#### Архитектура

```
Библиотека предоставляет:
├── stores/
│   ├── useMessageStore.ts
│   ├── useThemeStore.ts
│   └── useChatStore.ts
│
Пользователь в своем приложении:
├── main.ts  ← createPinia()
└── App.vue  ← использует stores
```

#### Реализация

```typescript
// src/stores/useMessageStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IInputMessage } from '@/types'

export const useMessageStore = defineStore('chotto-messages', () => {
  // State
  const messages = ref(new Map<string, IInputMessage>())

  // Getters
  const getMessage = computed(() => (chatId: string) => {
    return messages.value.get(chatId) ?? createDefaultMessage(chatId)
  })

  const hasMessage = computed(() => (chatId: string) => {
    return messages.value.has(chatId)
  })

  // Actions
  function createMessage(chatId: string): IInputMessage {
    const message: IInputMessage = {
      id: chatId,
      text: '',
      file: undefined,
      reply: undefined,
      forceSend: false,
      isRecording: false
    }
    messages.value.set(chatId, message)
    return message
  }

  function updateMessage(chatId: string, data: Partial<IInputMessage>) {
    const current = getMessage.value(chatId)
    messages.value.set(chatId, { ...current, ...data })
  }

  function updateMessageText(chatId: string, text: string) {
    updateMessage(chatId, { text })
  }

  function setMessageFile(chatId: string, file: IInputMessage['file']) {
    updateMessage(chatId, { file })
  }

  function resetMessageFile(chatId: string) {
    updateMessage(chatId, { file: undefined })
  }

  function setReply(chatId: string, reply: IInputMessage['reply']) {
    updateMessage(chatId, { reply })
  }

  function resetReply(chatId: string) {
    updateMessage(chatId, { reply: undefined })
  }

  function resetMessage(chatId: string) {
    const message = getMessage.value(chatId)
    messages.value.set(chatId, {
      ...message,
      text: '',
      file: undefined,
      reply: undefined,
      forceSend: false
    })
  }

  function deleteMessage(chatId: string) {
    messages.value.delete(chatId)
  }

  function setRecording(chatId: string, isRecording: boolean) {
    updateMessage(chatId, { isRecording })
  }

  function setForceSend(chatId: string, forceSend: boolean) {
    updateMessage(chatId, { forceSend })
  }

  // Cleanup
  function cleanup(chatId: string) {
    deleteMessage(chatId)
  }

  function cleanupAll() {
    messages.value.clear()
  }

  return {
    // State
    messages,
    
    // Getters
    getMessage,
    hasMessage,
    
    // Actions
    createMessage,
    updateMessage,
    updateMessageText,
    setMessageFile,
    resetMessageFile,
    setReply,
    resetReply,
    resetMessage,
    deleteMessage,
    setRecording,
    setForceSend,
    cleanup,
    cleanupAll
  }
})
```

```typescript
// src/stores/useThemeStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeName = 'default' | 'dark' | 'green' | 'mobilon1'

export const useThemeStore = defineStore('chotto-themes', () => {
  // State - тема для каждого экземпляра чата
  const instanceThemes = ref(new Map<string, ThemeName>())
  
  // Глобальная тема по умолчанию
  const defaultTheme = ref<ThemeName>('default')

  // Getters
  const getTheme = computed(() => (instanceId: string) => {
    return instanceThemes.value.get(instanceId) ?? defaultTheme.value
  })

  // Actions
  function setTheme(instanceId: string, theme: ThemeName) {
    instanceThemes.value.set(instanceId, theme)
  }

  function setDefaultTheme(theme: ThemeName) {
    defaultTheme.value = theme
  }

  function removeTheme(instanceId: string) {
    instanceThemes.value.delete(instanceId)
  }

  function cleanup(instanceId: string) {
    removeTheme(instanceId)
  }

  return {
    instanceThemes,
    defaultTheme,
    getTheme,
    setTheme,
    setDefaultTheme,
    removeTheme,
    cleanup
  }
})
```

```typescript
// src/stores/useChatStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IChat } from '@/types'

export const useChatStore = defineStore('chotto-chats', () => {
  // State - чаты для каждого экземпляра
  const instanceChats = ref(new Map<string, IChat[]>())

  // Getters
  const getChats = computed(() => (instanceId: string) => {
    return instanceChats.value.get(instanceId) ?? []
  })

  const getChat = computed(() => (instanceId: string, chatId: string) => {
    const chats = getChats.value(instanceId)
    return chats.find(c => c.chatId === chatId)
  })

  // Actions
  function setChats(instanceId: string, chats: IChat[]) {
    instanceChats.value.set(instanceId, chats)
  }

  function addChat(instanceId: string, chat: IChat) {
    const chats = getChats.value(instanceId)
    instanceChats.value.set(instanceId, [...chats, chat])
  }

  function updateChat(instanceId: string, chatId: string, data: Partial<IChat>) {
    const chats = getChats.value(instanceId)
    const updated = chats.map(c => 
      c.chatId === chatId ? { ...c, ...data } : c
    )
    instanceChats.value.set(instanceId, updated)
  }

  function removeChat(instanceId: string, chatId: string) {
    const chats = getChats.value(instanceId)
    instanceChats.value.set(
      instanceId, 
      chats.filter(c => c.chatId !== chatId)
    )
  }

  function setUnreadCount(instanceId: string, chatId: string, count: number) {
    updateChat(instanceId, chatId, { countUnread: count })
  }

  function cleanup(instanceId: string) {
    instanceChats.value.delete(instanceId)
  }

  return {
    instanceChats,
    getChats,
    getChat,
    setChats,
    addChat,
    updateChat,
    removeChat,
    setUnreadCount,
    cleanup
  }
})
```

#### Новый API для composables

```typescript
// src/hooks/useMessage.ts
import { computed, onUnmounted } from 'vue'
import { useMessageStore } from '@/stores/useMessageStore'

/**
 * Composable для работы с черновиком сообщения
 * @param chatId - ID чата
 * @param autoCleanup - автоматически очищать при unmount (по умолчанию true)
 */
export function useMessage(chatId: string, autoCleanup = true) {
  const store = useMessageStore()

  // Создаем сообщение если его нет
  if (!store.hasMessage(chatId)) {
    store.createMessage(chatId)
  }

  // Автоочистка при размонтировании
  if (autoCleanup) {
    onUnmounted(() => {
      store.cleanup(chatId)
    })
  }

  // Computed для реактивности
  const message = computed(() => store.getMessage(chatId))

  return {
    message,
    getMessage: () => store.getMessage(chatId),
    setText: (text: string) => store.updateMessageText(chatId, text),
    setFile: (file: any) => store.setMessageFile(chatId, file),
    resetFile: () => store.resetMessageFile(chatId),
    setReply: (reply: any) => store.setReply(chatId, reply),
    resetReply: () => store.resetReply(chatId),
    reset: () => store.resetMessage(chatId),
    setRecording: (val: boolean) => store.setRecording(chatId, val),
    setForceSend: (val: boolean) => store.setForceSend(chatId, val)
  }
}
```

```typescript
// src/hooks/useTheme.ts
import { computed } from 'vue'
import { useThemeStore, type ThemeName } from '@/stores/useThemeStore'

export function useTheme(instanceId: string) {
  const store = useThemeStore()

  const theme = computed(() => store.getTheme(instanceId))

  return {
    theme,
    getTheme: () => store.getTheme(instanceId),
    setTheme: (theme: ThemeName) => store.setTheme(instanceId, theme),
    cleanup: () => store.cleanup(instanceId)
  }
}
```

#### Использование в компонентах

```vue
<!-- src/components/3_compounds/ChatInput/ChatInput.vue -->
<script setup lang="ts">
import { inject, computed } from 'vue'
import { useMessage } from '@/hooks'

const chatAppId = inject<string>('chatAppId')
if (!chatAppId) throw new Error('chatAppId not provided')

const { message, setText, setFile, reset, setRecording } = useMessage(chatAppId)

// message реактивен и автоматически обновляется
const disabledSendButton = computed(() => {
  return !message.value.text && !message.value.file
})

function sendMessage() {
  emit('send', message.value)
  reset()
}
</script>

<template>
  <div class="chat-input">
    <textarea 
      :value="message.text"
      @input="setText($event.target.value)"
    />
    <button 
      :disabled="disabledSendButton"
      @click="sendMessage"
    >
      Send
    </button>
  </div>
</template>
```

#### Setup в приложении пользователя

```typescript
// main.ts (приложение пользователя)
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

#### ✅ Плюсы

1. **Официальное решение** — поддерживается командой Vue
2. **DevTools интеграция** — из коробки
3. **TypeScript поддержка** — отличная типизация
4. **Модульность** — легко разделить на несколько stores
5. **Плагины** — персистентность, логирование и т.д.
6. **SSR поддержка** — встроенная
7. **Composition API style** — привычный синтаксис
8. **Tree-shaking** — неиспользуемые stores не попадут в бандл
9. **Производительность** — оптимизировано для больших приложений

#### ❌ Минусы

1. **Зависимость** — добавляет Pinia в зависимости (~5KB gzip)
2. **Требует setup** — пользователь должен сделать `app.use(pinia)`
3. **Сложность** — может быть избыточно для простых случаев
4. **Breaking change** — изменение API

#### 💡 Решение минусов

```typescript
// Автоматический setup если Pinia еще не установлена
// src/index.ts
import { getCurrentInstance } from 'vue'
import { createPinia } from 'pinia'

export function installChotto(app: App) {
  // Проверяем есть ли уже Pinia
  if (!app.config.globalProperties.$pinia) {
    app.use(createPinia())
  }
}

// Или автоматически в composable
export function useMessageStore() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('Must be called in setup')
  }
  
  // Проверяем Pinia
  if (!instance.appContext.config.globalProperties.$pinia) {
    console.warn('Pinia not installed. Installing automatically...')
    instance.appContext.app.use(createPinia())
  }
  
  return defineStore(/* ... */)()
}
```

---

### Вариант 2: Provide/Inject с Symbol Keys

**Идея:** Использовать встроенный механизм Vue для передачи состояния

#### Реализация

```typescript
// src/stores/symbols.ts
import type { InjectionKey } from 'vue'
import type { IInputMessage } from '@/types'

export interface MessageStoreState {
  messages: Map<string, IInputMessage>
  getMessage: (chatId: string) => IInputMessage
  updateMessage: (chatId: string, data: Partial<IInputMessage>) => void
  resetMessage: (chatId: string) => void
  // ...
}

export const MessageStoreKey: InjectionKey<MessageStoreState> = 
  Symbol('chotto-message-store')

export const ThemeStoreKey: InjectionKey<ThemeStoreState> = 
  Symbol('chotto-theme-store')
```

```typescript
// src/stores/provideMessageStore.ts
import { provide, ref, readonly } from 'vue'
import { MessageStoreKey, type MessageStoreState } from './symbols'
import type { IInputMessage } from '@/types'

export function provideMessageStore() {
  const messages = ref(new Map<string, IInputMessage>())

  const getMessage = (chatId: string): IInputMessage => {
    if (!messages.value.has(chatId)) {
      const message: IInputMessage = {
        id: chatId,
        text: '',
        file: undefined,
        reply: undefined,
        forceSend: false,
        isRecording: false
      }
      messages.value.set(chatId, message)
    }
    return messages.value.get(chatId)!
  }

  const updateMessage = (chatId: string, data: Partial<IInputMessage>) => {
    const current = getMessage(chatId)
    messages.value.set(chatId, { ...current, ...data })
  }

  const resetMessage = (chatId: string) => {
    const message = getMessage(chatId)
    messages.value.set(chatId, {
      ...message,
      text: '',
      file: undefined,
      reply: undefined,
      forceSend: false
    })
  }

  const deleteMessage = (chatId: string) => {
    messages.value.delete(chatId)
  }

  const store: MessageStoreState = {
    messages: readonly(messages),
    getMessage,
    updateMessage,
    resetMessage,
    deleteMessage,
    // ...
  }

  provide(MessageStoreKey, store)

  return store
}
```

```typescript
// src/hooks/useMessage.ts
import { inject, onUnmounted } from 'vue'
import { MessageStoreKey } from '@/stores/symbols'

export function useMessage(chatId: string) {
  const store = inject(MessageStoreKey)
  
  if (!store) {
    throw new Error(
      'MessageStore not provided. ' +
      'Make sure to call provideMessageStore() in parent component.'
    )
  }

  // Автоочистка
  onUnmounted(() => {
    store.deleteMessage(chatId)
  })

  return {
    getMessage: () => store.getMessage(chatId),
    setText: (text: string) => 
      store.updateMessage(chatId, { text }),
    reset: () => 
      store.resetMessage(chatId),
    // ...
  }
}
```

#### Использование

```vue
<!-- BaseContainer.vue -->
<script setup lang="ts">
import { provideMessageStore } from '@/stores/provideMessageStore'
import { provideThemeStore } from '@/stores/provideThemeStore'

// Предоставляем stores для всех дочерних компонентов
provideMessageStore()
provideThemeStore()
</script>

<template>
  <div class="base-container">
    <slot />
  </div>
</template>
```

```vue
<!-- ChatInput.vue -->
<script setup lang="ts">
import { inject } from 'vue'
import { useMessage } from '@/hooks'

const chatAppId = inject<string>('chatAppId')!
const { getMessage, setText, reset } = useMessage(chatAppId)
</script>
```

#### ✅ Плюсы

1. **Нет зависимостей** — встроенный механизм Vue
2. **Автоматическая изоляция** — каждый BaseContainer имеет свой store
3. **TypeScript поддержка** — через InjectionKey
4. **SSR-совместимо** — работает из коробки
5. **Простота** — меньше boilerplate
6. **Гибкость** — можно легко заменить реализацию

#### ❌ Минусы

1. **Нет DevTools** — сложно отлаживать
2. **Нет time-travel** — нет истории изменений
3. **Нет плагинов** — нужно писать самому
4. **Ручная реактивность** — нужно использовать ref/reactive правильно
5. **Больше кода** — нужно писать провайдеры вручную

---

### Вариант 3: Composable без глобального состояния

**Идея:** Создавать новое состояние в каждом composable

#### Реализация

```typescript
// src/hooks/useMessage.ts
import { ref, onUnmounted } from 'vue'
import type { IInputMessage } from '@/types'

export function useMessage(chatId: string) {
  // Локальное состояние - создается для каждого вызова
  const message = ref<IInputMessage>({
    id: chatId,
    text: '',
    file: undefined,
    reply: undefined,
    forceSend: false,
    isRecording: false
  })

  const setText = (text: string) => {
    message.value.text = text
  }

  const setFile = (file: any) => {
    message.value.file = file
  }

  const reset = () => {
    message.value = {
      id: chatId,
      text: '',
      file: undefined,
      reply: undefined,
      forceSend: false,
      isRecording: false
    }
  }

  // Автоочистка
  onUnmounted(() => {
    message.value = null as any
  })

  return {
    message,
    setText,
    setFile,
    reset,
    // ...
  }
}
```

#### Проблема: как шарить между компонентами?

```vue
<!-- ChatInput.vue -->
<script setup>
const { message } = useMessage('chat-1')
// Создается НОВОЕ состояние
</script>

<!-- Feed.vue -->
<script setup>
const { message } = useMessage('chat-1')
// Создается ЕЩЕ ОДНО состояние!
// Нет связи с ChatInput
</script>
```

#### Решение: Combine с Provide/Inject

```typescript
// src/hooks/useMessage.ts
import { ref, provide, inject, onUnmounted, type InjectionKey } from 'vue'

const MessageKey = Symbol() as InjectionKey<ReturnType<typeof createMessageStore>>

function createMessageStore(chatId: string) {
  const message = ref<IInputMessage>({
    id: chatId,
    text: '',
    // ...
  })

  const setText = (text: string) => {
    message.value.text = text
  }

  return { message, setText, /* ... */ }
}

// Для провайдера
export function provideMessage(chatId: string) {
  const store = createMessageStore(chatId)
  provide(MessageKey, store)
  return store
}

// Для потребителей
export function useMessage() {
  const store = inject(MessageKey)
  if (!store) {
    throw new Error('Message not provided')
  }
  return store
}
```

#### ✅ Плюсы

1. **Простота** — понятный код
2. **Нет зависимостей** — чистый Vue
3. **Гибкость** — полный контроль
4. **Малый размер** — минимум кода

#### ❌ Минусы

1. **Много boilerplate** — нужно писать provide/inject для каждого
2. **Нет DevTools** — сложно отлаживать
3. **Ручное управление** — легко сделать ошибку
4. **Масштабируемость** — сложно для больших приложений

---

### Вариант 4: Внутреннее WeakMap-решение

**Идея:** Использовать WeakMap для автоматической очистки

#### Реализация

```typescript
// src/stores/internal/messageRegistry.ts
import { ref, watch, onUnmounted } from 'vue'
import type { IInputMessage } from '@/types'

class MessageRegistry {
  private messages = new Map<string, IInputMessage>()
  private refCounts = new Map<string, number>()
  
  acquire(chatId: string): IInputMessage {
    // Увеличиваем счетчик ссылок
    const count = this.refCounts.get(chatId) ?? 0
    this.refCounts.set(chatId, count + 1)
    
    // Создаем если нет
    if (!this.messages.has(chatId)) {
      this.messages.set(chatId, {
        id: chatId,
        text: '',
        file: undefined,
        reply: undefined,
        forceSend: false,
        isRecording: false
      })
    }
    
    return this.messages.get(chatId)!
  }
  
  release(chatId: string) {
    const count = this.refCounts.get(chatId) ?? 0
    
    if (count <= 1) {
      // Последняя ссылка - удаляем
      this.messages.delete(chatId)
      this.refCounts.delete(chatId)
    } else {
      this.refCounts.set(chatId, count - 1)
    }
  }
  
  get(chatId: string): IInputMessage | undefined {
    return this.messages.get(chatId)
  }
  
  update(chatId: string, data: Partial<IInputMessage>) {
    const message = this.messages.get(chatId)
    if (message) {
      Object.assign(message, data)
    }
  }
}

export const messageRegistry = new MessageRegistry()
```

```typescript
// src/hooks/useMessage.ts
import { ref, onUnmounted, watch } from 'vue'
import { messageRegistry } from '@/stores/internal/messageRegistry'

export function useMessage(chatId: string) {
  // Получаем message и увеличиваем ref count
  const message = ref(messageRegistry.acquire(chatId))
  
  // Следим за изменениями
  watch(message, (newValue) => {
    messageRegistry.update(chatId, newValue)
  }, { deep: true })
  
  // Автоматически освобождаем при unmount
  onUnmounted(() => {
    messageRegistry.release(chatId)
  })
  
  const setText = (text: string) => {
    message.value.text = text
  }
  
  return {
    message,
    setText,
    // ...
  }
}
```

#### ✅ Плюсы

1. **Автоматическая очистка** — через reference counting
2. **Нет зависимостей** — внутренняя реализация
3. **Простой API** — как старый useMessage
4. **Обратная совместимость** — минимальные изменения

#### ❌ Минусы

1. **Сложная реализация** — легко сделать ошибки
2. **Reference counting** — не всегда надежен
3. **Нет DevTools** — сложно отлаживать
4. **Скрытая магия** — неочевидное поведение

---

## Сравнение решений

| Критерий | Pinia | Provide/Inject | Composable | WeakMap |
|----------|-------|----------------|------------|---------|
| **Простота API** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Типобезопасность** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **DevTools** | ⭐⭐⭐⭐⭐ | ⭐ | ⭐ | ⭐ |
| **SSR поддержка** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Производительность** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Размер бандла** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Автоочистка** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Изоляция** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Тестируемость** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Расширяемость** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Breaking changes** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### Подробное сравнение

#### По размеру бандла

```
Pinia:        ~5 KB gzip
Provide:      0 KB (встроенное)
Composable:   0 KB (встроенное)
WeakMap:      ~1 KB (свой код)
```

#### По сложности setup

```typescript
// Pinia - требует setup
app.use(createPinia())

// Provide/Inject - setup в компоненте
provideMessageStore()

// Composable - нет setup
useMessage()

// WeakMap - нет setup
useMessage()
```

#### По migration effort

```
Pinia:        Высокий  (3-5 дней)
Provide:      Средний  (2-3 дня)
Composable:   Средний  (2-3 дня)
WeakMap:      Низкий   (1-2 дня)
```

---

## Рекомендуемое решение

### 🎯 Вариант: **Pinia + Backward Compatible Layer**

**Идея:** Использовать Pinia как основу, но сохранить обратную совместимость

### Архитектура

```
┌─────────────────────────────────────┐
│   New API (Pinia Stores)           │
│   ✓ Recommended для новых проектов  │
│   ✓ Full features                   │
├─────────────────────────────────────┤
│   Compatibility Layer               │
│   ✓ Старый API useMessage()         │
│   ✓ Deprecation warnings            │
│   ✓ Автоматический migration        │
└─────────────────────────────────────┘
```

### Реализация

#### 1. Pinia Stores (новый API)

```typescript
// src/stores/useMessageStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMessageStore = defineStore('chotto-messages', () => {
  const messages = ref(new Map<string, IInputMessage>())
  
  // ... полная реализация как выше
  
  return {
    messages,
    getMessage,
    updateMessage,
    // ...
  }
})
```

#### 2. Compatibility Layer (старый API с deprecation)

```typescript
// src/hooks/useMessage.ts (legacy)
import { useMessageStore } from '@/stores/useMessageStore'
import { onUnmounted } from 'vue'

let _deprecationWarningShown = false

/**
 * @deprecated Use useMessageStore() directly for better performance and features
 * 
 * Migration guide:
 * ```ts
 * // Before
 * const { getMessage, setText } = useMessage('chat-1')
 * 
 * // After
 * import { useMessageStore } from '@mobilon-dev/chotto/stores'
 * const messageStore = useMessageStore()
 * const message = computed(() => messageStore.getMessage('chat-1'))
 * messageStore.updateMessageText('chat-1', 'text')
 * ```
 */
export function useMessage(chatId: string) {
  // Show deprecation warning once
  if (!_deprecationWarningShown && process.env.NODE_ENV !== 'production') {
    console.warn(
      '[Chotto] useMessage() is deprecated. ' +
      'Use useMessageStore() directly for better performance. ' +
      'See migration guide: https://chotto.dev/migration/0.4.0'
    )
    _deprecationWarningShown = true
  }
  
  const store = useMessageStore()
  
  // Автоматически создаем сообщение
  if (!store.hasMessage(chatId)) {
    store.createMessage(chatId)
  }
  
  // Автоочистка
  onUnmounted(() => {
    store.cleanup(chatId)
  })
  
  // Эмулируем старый API
  return {
    getMessage: () => store.getMessage(chatId),
    resetMessage: () => store.resetMessage(chatId),
    setMessageText: (text: string) => store.updateMessageText(chatId, text),
    setMessageFile: (file: any) => store.setMessageFile(chatId, file),
    resetMessageFile: () => store.resetMessageFile(chatId),
    setReply: (reply: any) => store.setReply(chatId, reply),
    resetReply: () => store.resetReply(chatId),
    setForceSendMessage: (val: boolean) => store.setForceSend(chatId, val),
    setRecordingMessage: (val: boolean) => store.setRecording(chatId, val)
  }
}
```

#### 3. Автоматический Pinia setup

```typescript
// src/index.ts
import { App, getCurrentInstance } from 'vue'
import { createPinia, type Pinia } from 'pinia'

let _pinia: Pinia | null = null

export function ensurePinia(): Pinia {
  if (!_pinia) {
    _pinia = createPinia()
  }
  return _pinia
}

export function installChotto(app: App) {
  // Автоматически устанавливаем Pinia если еще не установлена
  if (!app.config.globalProperties.$pinia) {
    app.use(ensurePinia())
  }
}

// Для auto-install
export function autoInstallPinia() {
  const instance = getCurrentInstance()
  if (instance && !instance.appContext.config.globalProperties.$pinia) {
    instance.appContext.app.use(ensurePinia())
  }
}

// В каждом store
export const useMessageStore = defineStore('chotto-messages', () => {
  // Автоустановка при первом использовании
  autoInstallPinia()
  
  // ... store implementation
})
```

#### 4. Документация migration

```markdown
# Migration Guide: v0.3.x → v0.4.0

## Breaking Changes

### useMessage() is deprecated

**Before (v0.3.x):**
```ts
import { useMessage } from '@mobilon-dev/chotto'

const { getMessage, setText } = useMessage('chat-1')
setText('Hello')
console.log(getMessage().text)
```

**After (v0.4.0):**
```ts
import { useMessageStore } from '@mobilon-dev/chotto/stores'
import { computed } from 'vue'

const messageStore = useMessageStore()
const message = computed(() => messageStore.getMessage('chat-1'))

messageStore.updateMessageText('chat-1', 'Hello')
console.log(message.value.text)
```

## Setup Required

Add Pinia to your app:

```ts
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())  // ← Добавьте эту строку
app.mount('#app')
```

Or use auto-install:

```ts
import { installChotto } from '@mobilon-dev/chotto'

app.use(installChotto)  // Автоматически установит Pinia
```
```

### ✅ Преимущества этого подхода

1. **Плавный переход** — старый код продолжает работать
2. **Предупреждения** — разработчики знают что нужно мигрировать
3. **Лучшие практики** — новый код использует Pinia
4. **Автоустановка** — не требует обязательного setup
5. **Полная документация** — примеры миграции

---

## План миграции

### Фаза 1: Подготовка (1 неделя)

#### Задачи:

1. **Добавить Pinia в dependencies** (1 час)
```bash
npm install pinia
```

2. **Создать Pinia stores** (2 дня)
   - `useMessageStore.ts`
   - `useThemeStore.ts`
   - `useChatStore.ts`
   - Unit тесты для stores

3. **Создать compatibility layer** (1 день)
   - Обертки для старого API
   - Deprecation warnings
   - Auto-install helper

4. **Обновить документацию** (1 день)
   - Migration guide
   - API reference
   - Examples

5. **Написать тесты** (1 день)
   - Тесты обратной совместимости
   - Тесты новых stores
   - Integration тесты

### Фаза 2: Внутренняя миграция (1 неделя)

#### Задачи:

1. **Мигрировать демо-приложения** (2 дня)
   - MobilonExtendedChatApp
   - BaseExtendedChatApp
   - Остальные примеры

2. **Обновить Storybook** (1 день)
   - Setup Pinia в Storybook
   - Обновить stories

3. **Обновить тесты** (2 дня)
   - Использовать Pinia в тестах
   - Testing utilities

### Фаза 3: Релиз (1 день)

1. **Release v0.4.0** с deprecation warnings
2. **Опубликовать migration guide**
3. **Анонс в сообществе**

### Фаза 4: Удаление старого API (через 3-6 месяцев)

1. **Release v0.5.0 или v1.0.0** — удаление compatibility layer
2. **Только новый API**

---

## Примеры использования

### Пример 1: Базовое использование

```vue
<template>
  <div class="chat-app">
    <ChatInput chat-id="main-chat" />
    <Feed chat-id="main-chat" />
  </div>
</template>

<script setup lang="ts">
import { ChatInput, Feed } from '@mobilon-dev/chotto'

// Pinia автоматически установится при первом использовании stores
</script>
```

### Пример 2: Несколько чатов

```vue
<template>
  <div class="multi-chat">
    <div class="chat-panel">
      <ChatInput chat-id="chat-1" />
      <Feed chat-id="chat-1" />
    </div>
    
    <div class="chat-panel">
      <ChatInput chat-id="chat-2" />
      <Feed chat-id="chat-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatInput, Feed } from '@mobilon-dev/chotto'

// Каждый чат имеет изолированное состояние!
// Сообщение в chat-1 не влияет на chat-2
</script>
```

### Пример 3: Продвинутое использование

```vue
<script setup lang="ts">
import { useMessageStore, useChatStore } from '@mobilon-dev/chotto/stores'
import { computed, watch } from 'vue'

const messageStore = useMessageStore()
const chatStore = useChatStore()

const currentChatId = ref('chat-1')

// Реактивное сообщение для текущего чата
const currentMessage = computed(() => 
  messageStore.getMessage(currentChatId.value)
)

// Отправка сообщения
function sendMessage() {
  const message = currentMessage.value
  
  // Отправляем на сервер
  await api.sendMessage({
    chatId: currentChatId.value,
    text: message.text,
    file: message.file
  })
  
  // Очищаем
  messageStore.resetMessage(currentChatId.value)
}

// Автосохранение черновика
watch(currentMessage, (message) => {
  localStorage.setItem(
    `draft-${currentChatId.value}`,
    JSON.stringify(message)
  )
}, { deep: true })

// Восстановление черновика
onMounted(() => {
  const draft = localStorage.getItem(`draft-${currentChatId.value}`)
  if (draft) {
    const data = JSON.parse(draft)
    messageStore.updateMessage(currentChatId.value, data)
  }
})
</script>
```

### Пример 4: Тестирование

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMessageStore } from '@/stores/useMessageStore'

describe('MessageStore', () => {
  beforeEach(() => {
    // Создаем новую Pinia для каждого теста
    setActivePinia(createPinia())
  })

  it('создает новое сообщение', () => {
    const store = useMessageStore()
    
    store.createMessage('chat-1')
    
    expect(store.hasMessage('chat-1')).toBe(true)
    expect(store.getMessage('chat-1')).toEqual({
      id: 'chat-1',
      text: '',
      file: undefined,
      reply: undefined,
      forceSend: false,
      isRecording: false
    })
  })

  it('обновляет текст сообщения', () => {
    const store = useMessageStore()
    
    store.createMessage('chat-1')
    store.updateMessageText('chat-1', 'Hello!')
    
    expect(store.getMessage('chat-1').text).toBe('Hello!')
  })

  it('очищает сообщение', () => {
    const store = useMessageStore()
    
    store.createMessage('chat-1')
    store.updateMessageText('chat-1', 'Hello!')
    store.cleanup('chat-1')
    
    expect(store.hasMessage('chat-1')).toBe(false)
  })
})
```

### Пример 5: SSR

```typescript
// server.ts
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'

export async function render(url: string) {
  const app = createSSRApp(App)
  
  // Каждый запрос получает свой Pinia instance
  const pinia = createPinia()
  app.use(pinia)
  
  // Рендерим
  const html = await renderToString(app)
  
  // Сериализуем состояние для гидрации на клиенте
  const state = JSON.stringify(pinia.state.value)
  
  return { html, state }
}
```

```typescript
// client.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// Восстанавливаем состояние с сервера
if (window.__PINIA_STATE__) {
  pinia.state.value = window.__PINIA_STATE__
}

app.use(pinia)
app.mount('#app')
```

---

## Заключение

### Рекомендация

**Использовать Pinia с compatibility layer** — это оптимальное решение, которое:

1. ✅ Решает все текущие проблемы
2. ✅ Сохраняет обратную совместимость
3. ✅ Предоставляет путь миграции
4. ✅ Использует industry standard (Pinia)
5. ✅ Дает лучший DX (DevTools, типизация)
6. ✅ Подготавливает к будущему росту

### Альтернатива для простых случаев

Если **не хочется добавлять зависимость**, можно использовать **Provide/Inject решение** для простых сценариев. Но для production-ready библиотеки Pinia — правильный выбор.

### Следующие шаги

1. Обсудить с командой выбор решения
2. Создать proof-of-concept
3. Написать тесты
4. Провести миграцию поэтапно
5. Выпустить с хорошей документацией

---

**Версия:** 1.0  
**Дата:** 2025-10-16  
**Статус:** Ready for review



