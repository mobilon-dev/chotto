# TGS Player (локальная копия)

Это локальная копия `tgs-player` из библиотеки `@lottiefiles/lottie-player`.

## Источник

Библиотека: `@lottiefiles/lottie-player` версия 2.0.12
Файлы скопированы из: `node_modules/@lottiefiles/lottie-player/dist/`

## Файлы

- `tgs-player.esm.js` - ES модуль версия компонента
- `tgs-player.d.ts` - TypeScript определения типов

## Лицензия

MIT License © LottieFiles.com

## Зависимости

TGS Player использует следующие зависимости:

В настоящее время зависимости доступны через транзитивную зависимость `@lottiefiles/lottie-player`:
- `lit` (^2.1.2) - для веб-компонентов
- `lottie-web` (^5.12.2) - для воспроизведения анимаций
- `pako` (^2.0.4) - для декомпрессии TGS файлов

**Для полной независимости от `@lottiefiles/lottie-player`:**
Если в будущем потребуется убрать зависимость `@lottiefiles/lottie-player` из `package.json`, нужно будет явно добавить эти зависимости:

```json
{
  "dependencies": {
    "lit": "^2.1.2",
    "lottie-web": "^5.12.2",
    "pako": "^2.0.4"
  }
}
```

## Использование

Импортируется автоматически в `main.ts` и `StickerMessage.vue`.

