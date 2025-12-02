# StickerPicker

Компонент кнопки для выбора и отправки стикеров.

## Функциональность

- Отображает кнопку для открытия селектора стикеров
- Поддерживает отображение сетки стикеров
- **Поддерживает несколько наборов стикеров с вкладками**
- **Иконки вкладок автоматически генерируются из первого стикера набора**
- **Вкладки всегда отображаются, даже если набор один**
- **Горизонтальный скролл вкладок колесиком мыши** (скроллбар скрыт)
- **Предпросмотр стикеров при долгом нажатии** (500ms) - появляется в центре экрана
- **Короткое нажатие** - стикер отправляется сразу
- **Долгое нажатие** - показывается предпросмотр, клик по предпросмотру отправляет стикер
- Автоматически отправляет выбранный стикер как сообщение
- Определяет тип файла по расширению URL (webp)
- Поддерживает различные темы (включая разные темы для предпросмотра)
- Автоматически закрывается при клике вне области
- Поддерживает режимы click и hover
- **Фиксированный размер окна пикера** (320x217px)
- **Вкладки закреплены сверху, скролл только в секции со стикерами**

## Особенности

Компонент работает как отправщик файлов формата tgs (анимированные стикеры Telegram) или webp (статические стикеры). При выборе стикера он автоматически:
1. Устанавливает стикер как файл через `useMessageDraft`
2. Принудительно отправляет сообщение через `setForceSendMessage`

### Предпросмотр стикеров

При долгом нажатии (удержании) на стикер (500ms) появляется предпросмотр в центре экрана:
- Показывает увеличенное изображение стикера (200x200px)
- Отображает подпись стикера (если указана в `alt`)
- Клик по предпросмотру отправляет стикер
- Предпросмотр автоматически скрывается при:
  - Отпускании кнопки мыши/пальца (если это было короткое нажатие)
  - Уходе курсора со стикера
  - Клике вне предпросмотра
- Поддерживает сенсорные устройства (touch events)

### Размеры и скролл

- Окно пикера имеет фиксированный размер: **320x217px**
- Вкладки закреплены сверху и не прокручиваются
- Скролл работает только в секции со стикерами
- Вкладки поддерживают горизонтальный скролл колесиком мыши (скроллбар скрыт)

## Props

- `state` (String, optional) - состояние кнопки ('active', 'disabled'), по умолчанию 'active'
- `mode` (String, optional) - режим активации ('click', 'hover'), по умолчанию 'click'
- `stickers` (Array, required) - массив стикеров, каждый стикер должен быть объектом с полем `url` и опциональным `alt`
- `emptyText` (String, optional) - текст, отображаемый когда нет доступных стикеров, по умолчанию 'Нет доступных стикеров'

## Формат данных стикеров

Компонент поддерживает три формата данных:

### 1. Простой массив стикеров (один набор)
```typescript
[
  { url: 'https://example.com/sticker1.webp', alt: 'Sticker 1' },
  { url: 'https://example.com/sticker2.webp', alt: 'Sticker 2' },
]
```

### 2. Массив массивов (несколько наборов с вкладками)
```typescript
[
  [
    { url: 'https://example.com/sticker1.webp', alt: 'Sticker 1' },
    { url: 'https://example.com/sticker2.webp', alt: 'Sticker 2' },
  ],
  [
    { url: 'https://example.com/sticker3.tgs', alt: 'Sticker 3' },
    { url: 'https://example.com/sticker4.tgs', alt: 'Sticker 4' },
  ],
]
```

### 3. Массив объектов с вкладками (расширенный формат)
```typescript
[
  {
    id: 'set1',
    label: 'Набор 1',
    iconUrl: 'https://example.com/icon1.webp', // опционально, по умолчанию первый стикер
    stickers: [
      { url: 'https://example.com/sticker1.webp', alt: 'Sticker 1' },
      { url: 'https://example.com/sticker2.webp', alt: 'Sticker 2' },
    ]
  },
  {
    id: 'set2',
    label: 'Набор 2',
    stickers: [
      { url: 'https://example.com/sticker3.webp', alt: 'Sticker 3' },
    ]
  },
]
```

**Примечания:**
- Каждый стикер должен быть объектом с полем `url` (обязательно) и `alt` (опционально)
- Если `iconUrl` не указан, используется URL первого стикера из набора
- Если в наборе нет стикеров, используется плейсхолдер с иконкой
- **Вкладки отображаются всегда**, даже если есть только один набор стикеров

Компонент автоматически определяет тип файла по расширению:
- `.webp` - статические стикеры (type: 'sticker')

## Пример использования

### Простой набор стикеров
```vue
<template>
  <StickerPicker
    :stickers="stickers"
    mode="click"
  />
</template>

<script setup>
import { ref } from 'vue';
import StickerPicker from '@/components/2_chatinput_elements/StickerPicker/StickerPicker.vue';

const stickers = ref([
  { url: 'https://example.com/sticker1.webp', alt: 'Static sticker' },
  { url: 'https://example.com/sticker2.webp', alt: 'Static sticker' },
]);
</script>
```

### Несколько наборов с вкладками (массив массивов)
```vue
<template>
  <StickerPicker
    :stickers="stickerSets"
    mode="click"
  />
</template>

<script setup>
import { ref } from 'vue';
import StickerPicker from '@/components/2_chatinput_elements/StickerPicker/StickerPicker.vue';

const stickerSets = ref([
  [
    { url: 'https://example.com/set1/sticker1.webp' },
    { url: 'https://example.com/set1/sticker2.webp' },
  ],
  [
    { url: 'https://example.com/set2/sticker1.tgs' },
    { url: 'https://example.com/set2/sticker2.tgs' },
  ],
]);
</script>
```

### Расширенный формат с метаданными
```vue
<template>
  <StickerPicker
    :stickers="stickerSets"
    mode="click"
  />
</template>

<script setup>
import { ref } from 'vue';
import StickerPicker from '@/components/2_chatinput_elements/StickerPicker/StickerPicker.vue';

const stickerSets = ref([
  {
    id: 'animals',
    label: 'Животные',
    iconUrl: 'https://example.com/animals-icon.webp',
    stickers: [
      { url: 'https://example.com/cat.webp', alt: 'Cat' },
      { url: 'https://example.com/dog.webp', alt: 'Dog' },
    ]
  },
  {
    id: 'emotions',
    label: 'Эмоции',
    stickers: [
      { url: 'https://example.com/happy.tgs', alt: 'Happy' },
      { url: 'https://example.com/sad.tgs', alt: 'Sad' },
    ]
  },
]);
</script>
```

## Интеграция с ChatInput

Компонент автоматически интегрируется с `ChatInput` через систему черновиков сообщений (`useMessageDraft`). При выборе стикера он автоматически отправляется как сообщение типа `message.sticker` или `message.image` в зависимости от формата файла.

## Темы и стилизация

Компонент поддерживает кастомизацию через CSS переменные. Все переменные имеют префикс `--chotto-stickerpicker-`.

### Предпросмотр

Предпросмотр имеет разные темы в зависимости от основной темы приложения:
- **Светлые темы** (default, green, mobilon1): светлый фон (`rgba(255, 255, 255, 0.95)`), темный текст
- **Темная тема** (dark): темный фон (`rgba(0, 0, 0, 0.9)`), светлый текст

Размер предпросмотра: 200x200px для изображения, контейнер адаптивный (min-width: 200px, max-width: 300px).

## Поведение при взаимодействии

### Короткое нажатие (клик)
- Стикер отправляется сразу
- Пикер закрывается (в режиме `click`)

### Долгое нажатие (удержание 500ms)
- Показывается предпросмотр стикера в центре экрана
- Стикер не отправляется автоматически
- Клик по предпросмотру отправляет стикер
- Предпросмотр скрывается при отпускании (если это было короткое нажатие) или при клике вне его
