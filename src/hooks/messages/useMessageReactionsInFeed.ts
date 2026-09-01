import { toValue, provide, type InjectionKey, type MaybeRefOrGetter, type Ref } from 'vue'
import type { MessageReactions, Reply } from '@/types'
import { useFeedReactionsConsumer } from '@/components/3_compounds/Feed/composables/useFeedReactionsOverlay'
import type { FeedReactionsHandlers } from '@/components/3_compounds/Feed/composables/useFeedReactionsOverlay'
import { useMessageReactionsMount } from './useMessageReactionsMount'

type MessageWithReactions = { reactions?: MessageReactions }

export const MESSAGE_REACTIONS_PATCH_KEY: InjectionKey<(next: MessageReactions) => void> = Symbol(
  'messageReactionsPatch',
)

interface UseMessageReactionsInFeedOptions {
  message: MaybeRefOrGetter<MessageWithReactions>
  messageId: MaybeRefOrGetter<string | number>
  reactions: MaybeRefOrGetter<MessageReactions | undefined>
  reactionsActive: MaybeRefOrGetter<boolean>
  reactionsMode: MaybeRefOrGetter<'single' | 'multi'>
  reply: MaybeRefOrGetter<Reply | undefined>
  menuEnabled: MaybeRefOrGetter<boolean>
  contentRef: Ref<HTMLElement | null>
  chipsRef?: Ref<HTMLElement | null>
  handlers: FeedReactionsHandlers
}

export function useMessageReactionsInFeed(options: UseMessageReactionsInFeedOptions) {
  const { showReactions, engageReactionsMount } = useMessageReactionsMount(
    options.reactions,
    options.reactionsActive,
  )
  const overlay = useFeedReactionsConsumer()

  function patchReactions(next: MessageReactions): void {
    const msg = toValue(options.message)
    msg.reactions = next
  }

  provide(MESSAGE_REACTIONS_PATCH_KEY, patchReactions)

  function onContentPointerEnter(): void {
    if (!toValue(options.reactionsActive)) return

    engageReactionsMount()

    const anchorEl = options.contentRef.value
    if (!anchorEl || !overlay) return

    overlay.activate({
      messageId: toValue(options.messageId),
      anchorEl,
      chipsEl: options.chipsRef?.value ?? null,
      reactions: toValue(options.reactions),
      reply: toValue(options.reply),
      replyEnabled: true,
      menuEnabled: toValue(options.menuEnabled),
      mode: toValue(options.reactionsMode),
      enabled: true,
      handlers: options.handlers,
      patchReactions,
    })
  }

  function onContentPointerLeave(event: PointerEvent): void {
    overlay?.handlePointerLeave(
      event,
      options.contentRef.value,
      options.chipsRef?.value ?? undefined,
    )
  }

  return {
    showReactions,
    onContentPointerEnter,
    onContentPointerLeave,
  }
}
