# TGS Player (локальная копия)

Это локальная копия `tgs-player` из библиотеки `@lottiefiles/lottie-player`.

## Источник

Библиотека: `@lottiefiles/lottie-player` версия 2.0.12
Файлы скопированы из: `node_modules/@lottiefiles/lottie-player/dist/`

## Файлы

- `tgs-player.esm.js` — ES‑модуль компонента TGS Player (используется в рантайме)
- `lottie-player.esm.js` — ES‑модуль базового Lottie Player (нужен до tgs-player)
- `tgs-player.d.ts` — (опционально) TS‑типы для TGS Player, не требуются в рантайме
- `lottie-player.d.ts` — (опционально) TS‑типы для Lottie Player, не требуются в рантайме

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

Файлы `.d.ts` содержат импорты типов из `lit` и используются только TypeScript для проверки типов. В рантайме не требуются. В текущем проекте типы явно не импортируются — их можно безопасно удалить. Оставляйте их только если планируете использовать классы `LottiePlayer`/`TGSPlayer` в TS‑коде или объявлять глобальные типы для тега `tgs-player`.

## Использование

Импортируется в компонентах `StickerMessage.vue` и `ReplyStickerMessage.vue` для поддержки анимированных TGS‑стикеров. Также перед импортами подключается утилита подавления предупреждения из `lit`:

**Важно:** `lottie-player.esm.js` должен быть импортирован **перед** `tgs-player.esm.js`, так как `tgs-player` наследуется от `lottie-player`.

```typescript
import '@/utils/suppress-lit-warning';

// Правильный порядок импорта:
import './libs/tgs-player/lottie-player.esm.js';  // Сначала базовый компонент
import './libs/tgs-player/tgs-player.esm.js';      // Затем расширенный
```

### Удаление файлов типов (`*.d.ts`)

Если вы не используете классы `LottiePlayer`/`TGSPlayer` в TypeScript и не добавляете глобальные декларации для HTML‑тегов, файлы `lottie-player.d.ts` и `tgs-player.d.ts` можно удалить — это не повлияет на сборку и работу приложения.

