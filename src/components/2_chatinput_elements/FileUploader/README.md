# FileUploader

Компонент для загрузки файлов во вложение черновика сообщения.

## Функциональность

- Выбор нескольких файлов
- Вставка изображений из буфера обмена
- Индикация загрузки и ошибки
- Загрузка через injectable adapter (prop `uploader` / Vue `provide`) или legacy `filebump-url`

## Props

- `filebumpUrl` (String, optional) — базовый URL filebump. Используется только default adapter: `POST {filebumpUrl}/upload`. Не нужен, если передан `uploader` или inject.
- `uploader` (Function, optional) — `ChottoUploadFileFn`. Приоритет: prop `uploader` > `inject(chottoUploadFileKey)` > default + `filebump-url`.
- `state` (`'active'` | `'disabled'`, optional) — активность кнопки
- `maxAttachedFiles` (Number, optional) — лимит вложений

## Загрузка файлов (DI)

```vue
<script setup>
import { FileUploader, type ChottoUploadFileFn } from '@mobilon-dev/chotto'

const uploadFile: ChottoUploadFileFn = async (file, meta) => {
  // host adapter: свой backend / filebump2 gear
  return hostUpload(file, meta)
}
</script>

<template>
  <FileUploader :uploader="uploadFile" />
</template>
```

Либо на корень чата, чтобы `AudioRecorder` / `VideoRecorder` внутри слотов `ChatInput` подхватили тот же adapter:

```ts
import { provide } from 'vue'
import { chottoUploadFileKey, type ChottoUploadFileFn } from '@mobilon-dev/chotto'

const uploadFile: ChottoUploadFileFn = async (file, meta) => {
  return hostUpload(file, meta)
}

provide(chottoUploadFileKey, uploadFile)
```

`meta.kind`: `'file'` | `'audio'` | `'video'`. Default adapter игнорирует `meta`.
