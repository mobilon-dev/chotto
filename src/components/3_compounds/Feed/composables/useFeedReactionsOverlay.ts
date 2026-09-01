import { computed, inject, provide, shallowRef, type InjectionKey, type Ref } from 'vue'
import type { ReactionsMode } from '@/components/2_feed_elements/MessageReactions/composables'
import type { MessageReactions, Reply } from '@/types'
import type { OpenMessageMenuSource } from '@/hooks/messages/useMessageActions'

export interface FeedReactionsHandlers {
  onToggleReaction: (payload: { messageId: string | number; key: string }) => void
  onAddReaction: (payload: { messageId: string | number; key: string }) => void
  onRemoveReaction: (payload: { messageId: string | number; key: string }) => void
  onMenu: (source?: OpenMessageMenuSource) => void
}

export interface FeedReactionsTarget {
  messageId: string | number
  anchorEl: HTMLElement
  chipsEl: HTMLElement | null
  reactions: MessageReactions | undefined
  reply: Reply | undefined
  replyEnabled: boolean
  menuEnabled: boolean
  mode: ReactionsMode
  enabled: boolean
  handlers: FeedReactionsHandlers
  /** Записать оптимистичное состояние реакций в объект сообщения ленты */
  patchReactions: (next: MessageReactions) => void
}

export interface FeedReactionsConsumerApi {
  activate: (target: FeedReactionsTarget) => void
  handlePointerLeave: (
    event: PointerEvent,
    contentEl: HTMLElement | null,
    chipsEl?: HTMLElement | null,
  ) => void
}

export interface FeedReactionsOverlayState {
  activeTarget: Ref<FeedReactionsTarget | null>
  anchorRef: Ref<HTMLElement | null>
}

const FEED_REACTIONS_CONSUMER_KEY: InjectionKey<FeedReactionsConsumerApi> = Symbol('feedReactionsConsumer')
const FEED_REACTIONS_STATE_KEY: InjectionKey<FeedReactionsOverlayState> = Symbol('feedReactionsState')

type PanelBridge = {
  onMessageEnter: () => void
  onMessageLeave: () => void
  isPanelOpen: () => boolean
  containsNode: (node: Node) => boolean
}

let panelBridge: PanelBridge | null = null

export function registerFeedReactionsPanelBridge(bridge: PanelBridge | null): void {
  panelBridge = bridge
}

export function provideFeedReactionsOverlay(): FeedReactionsOverlayState {
  const activeTarget = shallowRef<FeedReactionsTarget | null>(null)
  const anchorRef = computed(() => activeTarget.value?.anchorEl ?? null)

  const consumerApi: FeedReactionsConsumerApi = {
    activate(target) {
      activeTarget.value = target
      panelBridge?.onMessageEnter()
    },
    handlePointerLeave(event, contentEl, chipsEl) {
      if (!activeTarget.value || activeTarget.value.anchorEl !== contentEl) return

      const related = event.relatedTarget
      if (related instanceof Node) {
        if (contentEl?.contains(related)) return
        if (chipsEl?.contains(related)) return
        if (panelBridge?.containsNode(related)) return
      }

      panelBridge?.onMessageLeave()
      if (!panelBridge?.isPanelOpen()) {
        activeTarget.value = null
      }
    },
  }

  provide(FEED_REACTIONS_CONSUMER_KEY, consumerApi)
  provide(FEED_REACTIONS_STATE_KEY, { activeTarget, anchorRef })

  return { activeTarget, anchorRef }
}

export function useFeedReactionsConsumer(): FeedReactionsConsumerApi | null {
  return inject(FEED_REACTIONS_CONSUMER_KEY, null)
}

export function useFeedReactionsOverlayState(): FeedReactionsOverlayState | null {
  return inject(FEED_REACTIONS_STATE_KEY, null)
}
