# CommunicationPanel

Компонент панели коммуникации для выбора каналов связи.

## Функциональность

- Отображает кнопки для различных каналов связи (SMS, Telegram, WhatsApp, Phone, Max)
- Поддерживает выпадающие меню с дополнительными опциями
- Обрабатывает выбор канала связи
- Поддерживает темизацию
- Адаптируется под различные размеры экрана

## События

- `select-attribute-channel` — выбор подтверждённого атрибута и канала (сразу переключение диалога)
- `confirm-attribute` — атрибут со статусом `unconfirmed`; родитель выполняет запрос на сервер, после успеха обновляет `status` и переключает диалог
- `reset-blocked-attributes` — сброс блокировки при повторном открытии меню канала (клик по кнопке канала)
- `phone-call` — звонок по атрибуту типа phone (для `unconfirmed` сначала `confirm-attribute`)

## Props

- `channels` (Array, optional) - доступные каналы связи
- `confirmingAttributeId` (String, optional) - id атрибута в процессе подтверждения (спиннер в слоте галочки; задаёт родитель на время запроса)
- `blockedAttributeIds` (Array, optional) - id атрибутов, заблокированных после неудачного подтверждения (серый #ACACAC, без клика до `reset-blocked-attributes`)
- `attributeIndicatorTooltips` (Object, optional) - подсказки для галочки / спиннера. Ключи: `selected`, `confirmed`, `confirming`, `blocked`
- `theme` (String, optional) - тема компонента
