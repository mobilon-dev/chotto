# ChatList

Компонент для отображения списка чатов.

## ключевые требования

- отображение списка ChatItem
- сохранять порядок отображения ChatItem в массиве
- отправлять события при прокрутке для инициирования подгрузки сообщений
- функционал фильтра/поиска чатов (колбек-функция)
- возможность выставления флагов/табов


## Функциональность

- Отображает список элементов чатов
- Поддерживает фильтрацию и поиск
- Обрабатывает выбор чатов
- Поддерживает скроллинг
- Управляет состоянием загрузки

## События

- `select` - вызывается при выборе чата
- `action` - вызывается при выполнении действия с чатом

## Props

- `chats` (Array, required) - массив объектов чатов
- `loading` (Boolean, optional) - состояние загрузки
- `filter` (String, optional) - фильтр для поиска чатов
- `listMode` (`'chats' | 'pick' | 'create'`, default `chats`) — стек видов колонки списка (in-column «Новый чат» / «Новый контакт»)

## Слоты (listMode)

| Режим | Слот | Назначение |
|-------|------|------------|
| `pick` | `#pick` | Экран выбора контакта (`ContactPickSubheader`, `ContactPickList`, …) |
| `create` | `#create` | Форма нового контакта + `ContactPickFooterButton` |

В режимах `pick` / `create` обычный список чатов, фильтр и табы не рендерятся. Заголовок колонки (`#header`) переключается на стороне приложения.

## Связанные компоненты

- `ChatListAddButton` — кнопка «+» по макету mobilon1
- Модуль `ContactPick/`: `ContactPickSubheader`, `ContactPickSearchField`, `ContactPickList`, `ContactPickInfoBanner`, `ContactPickFooterButton`

## Deprecation

Для нового флоу не используйте `useModalCreateChat2` из header: обрабатывайте `chat.new` / клик по `ChatListAddButton` и переключайте `listMode` на `pick`.
