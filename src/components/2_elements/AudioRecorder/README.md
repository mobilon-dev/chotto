# AudioRecorder

Компонент для записи аудио сообщений.

## Функциональность

- Предоставляет интерфейс для записи аудио
- Поддерживает управление записью (старт, стоп, пауза)
- Показывает визуализацию записи
- Обрабатывает сохранение и отправку аудио
- Поддерживает предварительное прослушивание

## События

- `record-start` - вызывается при начале записи
- `record-stop` - вызывается при остановке записи
- `audio-save` - вызывается при сохранении аудио

## Props

- `state` (`'active'` | `'disabled'`, optional) — активность кнопки
- `filebumpUrl` (String, optional) — URL default adapter (`POST {filebumpUrl}/upload`)
- `uploader` (Function, optional) — `ChottoUploadFileFn`; иначе `inject(chottoUploadFileKey)`, иначе default + `filebump-url`
- `maxDuration` (Number, optional) - максимальная длительность записи
- `format` (String, optional) - формат аудио файла
