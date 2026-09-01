# Feed

Лента сообщений чата. Свежие сообщения внизу.

## Производительность (смена чата)

Публичный API без breaking changes. Virtual scroll нет — скролл нативный.

- **Цитата в пузыре** — лёгкий `FeedReplyQuote` (текст + опциональное превью), без markdown, tooltip и динамического `Reply*`. `BaseReplyMessage` остаётся для превью в инпуте.
- **Первый кадр** — хвост ленты (~28 сообщений). Остальное дорисовывается пачками по ~24 кадра. `@load-more` не уходит, пока дорисовка не дошла до начала данных.
- **Группировка серий** не копирует `objects`.
- **`v-memo`** на пузырях, чтобы зря не патчить уже показанные сообщения.
- **Реакции** — один `MessageReactionsOverlay` на Feed (панели + один `document` listener). В пузыре только чипы; mount по `pointerenter`, если `reactions.items` пустой. `EmojiPicker` — lazy import при открытии полного пикера.

`scroll-to-bottom`, `scroll-to`, `#prepend`, `#empty-feed`, реакции и keyboards работают как раньше. `scroll-to` на сообщение, которое ещё не дорисовано, сначала раскрывает диапазон до него.

## Контракт

```vue
<Feed
  :objects="messages"
  :scroll-to-bottom="isScrollToBottomEnabled"
  :scroll-to="scrollToId"
  :is-loading-more="isLoadingMore"
  @load-more="onLoadMore"
  @click-replied-message="onClickReplied"
>
  <template #empty-feed>...</template>
  <template #prepend>...</template>
</Feed>
```
