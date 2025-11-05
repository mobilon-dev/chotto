# TGS Player (локальная копия)

Это локальная копия `tgs-player` из библиотеки `@lottiefiles/lottie-player`.

## Источник

Библиотека: `@lottiefiles/lottie-player` версия 2.0.12
Файлы скопированы из: `node_modules/@lottiefiles/lottie-player/dist/`

## Файлы

- `tgs-player.esm.js` - ES модуль версия компонента TGS Player
- `tgs-player.d.ts` - TypeScript определения типов для TGS Player
- `lottie-player.esm.js` - ES модуль версия базового компонента Lottie Player (требуется для tgs-player)
- `lottie-player.d.ts` - TypeScript определения типов для Lottie Player (требуется для tgs-player)

**Примечание:** `tgs-player` наследуется от `lottie-player`, поэтому требуются оба файла.

## Лицензия

MIT License © LottieFiles.com

## Зависимости

**Все зависимости уже включены в файлы `.esm.js`!**

Файлы `lottie-player.esm.js` и `tgs-player.esm.js` являются полностью самодостаточными бандлами, которые включают все необходимые зависимости:
- `lit` - для веб-компонентов (включен в бандл)
- `lottie-web` - для воспроизведения анимаций (включен в бандл)
- `pako` - для декомпрессии TGS файлов (включен в бандл)

**Никакие дополнительные зависимости не требуются в `package.json`!**

Файлы `.d.ts` содержат импорты типов из `lit`, но они используются только TypeScript для проверки типов и не требуются во время выполнения.

## Использование

Импортируется в компоненте `StickerMessage.vue` для поддержки анимированных TGS стикеров.

**Важно:** `lottie-player.esm.js` должен быть импортирован **перед** `tgs-player.esm.js`, так как `tgs-player` наследуется от `lottie-player`.

```typescript
// Правильный порядок импорта:
import './libs/tgs-player/lottie-player.esm.js';  // Сначала базовый компонент
import './libs/tgs-player/tgs-player.esm.js';      // Затем расширенный
```

