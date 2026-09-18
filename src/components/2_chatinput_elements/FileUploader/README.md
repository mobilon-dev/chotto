# FileUploader

Компонент для загрузки файлов во вложение черновика сообщения.

## Функциональность

- Выбор нескольких файлов
- Вставка изображений из буфера обмена
- Индикация загрузки и ошибки
- Загрузка через injectable adapter (prop `uploader` / Vue `provide`); legacy `filebump-url` deprecated

## Props

- `uploader` (Function, optional) — `ChottoUploadFileFn`. Приоритет: prop `uploader` > `inject(chottoUploadFileKey)` > legacy `filebump-url`.
- `filebumpUrl` (String, optional, **deprecated**) — базовый URL filebump для default adapter: `POST {filebumpUrl}/upload`. Не нужен при `uploader` / inject. Будет удалён в следующем major.
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
