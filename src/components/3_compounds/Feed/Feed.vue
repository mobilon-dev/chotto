<template>
  <div
    class="message-feed-wrapper"
    data-testid="feed"
  >
    <div
      v-if="objects.length > 0 || typing"
      :id="'feed-container-' + chatAppId"
      ref="refFeed"
      class="message-feed"
      data-testid="feed-scroll"
      :style="{ backgroundImage: `url(${defaultBackground})` }"
      @scroll="throttledScrollTopCheck()"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <!-- Контент перед сообщениями -->
      <slot name="prepend" />
      <div
        v-show="isLoadingMore"
        class="message-feed__loading"
      >
        <LoadingIndicator
          :is-loading="isLoadingMore"
          size="small"
          position="top"
        />
      </div>
      <transition>
        <DateMessageSticky
          v-if="showStickyDate && !isLoadingMore"
          class="message-feed__sticky-date"
          :text="stickyDateText"
        />
      </transition>
      <div
        v-for="(object, index) in visibleObjects"
        :id="'msg-' + feedItemKey(object, index)"
        :key="feedItemKey(object, index)"
        v-memo="[object.messageId, object.text, object.status, object.reply, seriesFlags[renderStart + index], feedReactionsMemoKey(object)]"
        :data-timestamp="getMessageTimestamp(object)"
        data-testid="feed-message"
        :data-message-id="object.messageId"
        class="tracking-message"
        @dblclick="feedObjectDoubleClick($event, object)"
      >
        <component
          :is="componentsMap(object)"
          :key="feedItemKey(object, index)"
          class="message-feed__message"
          :message="object"
          :apply-style="applyStyle"
          :is-first-in-series="seriesFlags[renderStart + index]"
          :reactions-enabled="reactionsEnabled"
          :reactions-mode="reactionsMode"
          :current-user-id="currentUserId"
          :reaction-user-names="reactionUserNames"
          :subtext-tooltip-data="subtextTooltipData"
          :channel="getChannelForMessage(object)"
          v-bind="getExtraMessageProps(object)"
          @action="messageAction"
          @reply="handleClickReplied"
          @sms-invite="handleSmsInvite(object)"
          @read="handleDelimiterRead"
        />
      </div>
      <typing-message
        v-if="typing"
        :message="{
          subText: (typing as IFeedTyping).title,
          avatar: (typing as IFeedTyping).avatar,
        }"
      />
      <Transition>
        <MessageKeyboard
          v-if="showKeyboard"
          ref="keyboardRef"
          class="message-feed__keyboard"
          :keyboard="objects[objects.length - 1].keyboard!"
          :align="keyboardAlign"
          @action="keyboardAction"
        />
      </Transition>
      
      <FeedKeyboard
        v-if="feedKeyboards && feedKeyboards.length > 0"
        :buttons="feedKeyboards"
        :align="feedKeyboardAlign"
        @action="feedKeyboardAction"
      />
    </div>
    <div 
      v-else
      ref="refFeed"
      class="message-feed"
      :style="{ backgroundImage: `url(${defaultBackground})` }"
    >
      <div style="margin: auto;">
        <slot name="empty-feed" />
      </div>
    </div>

    <transition>
      <button
        v-if="isShowButton"
        class="message-feed__button-down"
        @click="scrollToBottomForce"
      >
        <div
          v-if="buttonParams"
          class="message-feed__unread-amount"
        >
          {{ buttonParams.unreadAmount }}
        </div>
        <span class="pi pi-angle-down message-feed__icon-down" />
      </button>
    </transition>

    <teleport
      v-if="getMessage().reply"
      :to="'#chat-input-reply-line-'+chatAppId"
    >
      <BaseReplyMessage
        class="chat-input-reply"
        :message="getMessage().reply"
        @reset="handleResetReply"
      />
    </teleport>

    <teleport
      v-if="getMessage().edit"
      :to="'#chat-input-reply-line-'+chatAppId"
    >
      <BaseEditMessage
        class="chat-input-reply"
        :message="getMessage().edit"
        @reset="handleResetEdit"
      />
    </teleport>

    <MessageReactionsOverlay v-if="reactionsEnabled" />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch, nextTick, inject, provide, computed, onMounted, unref, type Ref } from 'vue';
import DateMessageSticky from '@/components/2_feed_elements/DateMessageSticky/DateMessageSticky.vue';
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import BaseEditMessage from '@/components/2_feed_elements/BaseEditMessage/BaseEditMessage.vue';
import MessageKeyboard from '@/components/2_feed_elements/MessageKeyboard/MessageKeyboard.vue';
import FeedKeyboard from '@/components/2_feed_elements/FeedKeyboard/FeedKeyboard.vue';
import TypingMessage from '@/components/2_feed_elements/TypingMessage/TypingMessage.vue';
import LoadingIndicator from '@/components/1_atoms/LoadingIndicator/LoadingIndicator.vue';
import MessageReactionsOverlay from '@/components/2_feed_elements/MessageReactions/MessageReactionsOverlay.vue';

import { IFeedObject, IFeedTyping, IFeedUnreadButton, IFeedKeyboard, IFeedMessageMenuAction, MessageReactions } from '@/types';
import { useStickyDate, useFeedScroll, useFeedButton, useFeedGrouping, useFeedLoadMore, useFeedMessageVisibility, useFeedComponents, useFeedReply, useFeedKeyboard, useFeedScrollTo, useFeedProgressiveRender, provideFeedReactionsOverlay } from './composables';
import { throttle } from './functions/throttle';
import { getDefaultMessageMenuActions } from './utils/getDefaultMessageMenuActions';
import { isSmsFeedMessage } from '@/functions';

import chatBackgroundRaw from './assets/chat-background.svg?raw';

type DialogWithChannel = { dialogId: string; channelId?: string }
type SelectedChat = { dialogs?: DialogWithChannel[] }

const props = defineProps({
  /**
   * Объекты ленты. При смене чата сначала рисуется хвост, остальное дорисовывается пачками.
   */
  objects: {
    type: Array <IFeedObject>,
    required: true,
  },
  buttonParams: {
    type: Object as () => IFeedUnreadButton,
    required: false,
    default: undefined,
  },
  // принудительный скролл вниз по событию извне (сообщение, смена чата)
  scrollToBottom: {
    type: Boolean,
    default: false,
  },
  typing: {
    type: [Object as () => IFeedTyping, Boolean],
    default: false,
  },
  enableDoubleClickReply: {
    type: Boolean,
    default: false,
  },
  scrollTo:{
    type: String,
    default: null,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  },
  keyboardAlign: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  },
  feedKeyboards: {
    type: Array as () => IFeedKeyboard[],
    required: false,
    default: undefined
  },
  feedKeyboardAlign: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  },
  chatBackground: {
    type: String,
    default: undefined
  },
  isLoadingMore: {
    type: Boolean,
    default: false
  },
  reactionsEnabled: {
    type: Boolean,
    default: true
  },
  reactionsMode: {
    type: String as () => 'single' | 'multi',
    default: 'single',
    validator: (value: string) => ['single', 'multi'].includes(value)
  },
  /** Id текущего пользователя — для расчёта «моих» реакций */
  currentUserId: {
    type: [String, Number] as unknown as () => string | number | undefined,
    default: undefined,
  },
  /** userId → имя для тултипов реакций */
  reactionUserNames: {
    type: Object as () => Record<string, string>,
    default: undefined,
  },
  subtextTooltipData: {
    type: Object,
    required: false,
    default: () => ({})
  },
  /**
   * Позволяет переопределить действие "Перезвонить" для `message.call`.
   * Будет передано внутрь `CallMessage` как проп `onCall`.
   */
  callMessageOnCallback: {
    type: Function as unknown as () => ((message: IFeedObject) => void) | undefined,
    required: false,
    default: undefined,
  },
  /**
   * Пункты контекстного меню сообщений (с иконками).
   * По умолчанию: Ответить, Редактировать, разделитель, Удалить (красный).
   */
  messageMenuActions: {
    type: Array as () => IFeedMessageMenuAction[],
    default: () => getDefaultMessageMenuActions(),
  },
});

const trackingObjects = ref();
const refFeed = ref();
const keyboardRef = ref();

const {
  isShowButton,
  isKeyboardPlace,
  checkButtonVisibility,
} = useFeedButton({
  feedRef: refFeed,
  keyboardRef,
})

// Инициализация маппинга компонентов
const { componentsMap } = useFeedComponents()

// Получаем значение reactionsEnabled из props
const reactionsEnabled = computed(() => props.reactionsEnabled)

provideFeedReactionsOverlay()
const reactionsMode = computed(() => props.reactionsMode)
const currentUserId = computed(() => props.currentUserId)
const reactionUserNames = computed(() => props.reactionUserNames)

provide('currentUserId', currentUserId)
provide('reactionUserNames', reactionUserNames)
provide(
  'messageMenuActions',
  computed(() => props.messageMenuActions)
)

// Инициализация логики группировки
const { seriesFlags } = useFeedGrouping({
  objects: computed(() => props.objects),
})

const {
  visibleObjects,
  renderStart,
  isBackfilling,
  revealThroughIndex,
  accelerateBackfill,
} = useFeedProgressiveRender({
  objectsRef: computed(() => props.objects),
  feedRef: refFeed,
})

const chatAppId = inject('chatAppId')
const selectedChatInjected = inject<Ref<SelectedChat> | SelectedChat | undefined>('selectedChat', undefined)

const selectedChat = computed(() => {
  if (!selectedChatInjected) return undefined
  return unref(selectedChatInjected)
})

/** timestamp для sticky date (data-атрибут), т.к. в IFeedObject поле может быть не объявлено */
function getMessageTimestamp(obj: IFeedObject & { timestamp?: number | string }): number | string | undefined {
  return obj.timestamp
}

function feedItemKey(object: IFeedObject, index: number): string {
  return object.messageId || `mid-${renderStart.value + index}`
}

function feedReactionsMemoKey(object: IFeedObject): string {
  const items = (object as IFeedObject & { reactions?: MessageReactions }).reactions?.items
  if (!items?.length) return ''
  return items.map((item) => `${item.key}:${item.userId}`).join(',')
}

/**
 * Канал сообщения: сначала с самого объекта (channelId / meta), иначе из диалога чата.
 * В message-server dialog.channelId часто `chn_*`, а тип SMS — в meta.messageStyle.
 */
function getChannelForMessage(message: IFeedObject): string | undefined {
  const messageWithDialog = message as IFeedObject & {
    dialogId?: string
    channelId?: string
    channel?: { channelId?: string }
    meta?: { channelId?: string }
  }
  const fromMessage =
    messageWithDialog.channelId
    || messageWithDialog.channel?.channelId
    || messageWithDialog.meta?.channelId
  if (fromMessage) return String(fromMessage)

  if (!messageWithDialog.dialogId || !selectedChat.value?.dialogs) {
    return undefined
  }

  const dialog = selectedChat.value.dialogs.find((dialog) => dialog.dialogId === messageWithDialog.dialogId)
  return dialog?.channelId
}

function getExtraMessageProps(object: IFeedObject): Record<string, unknown> {
  if (object.type === 'message.call' && typeof props.callMessageOnCallback === 'function') {
    return { onCall: props.callMessageOnCallback }
  }
  return {}
}

const emit = defineEmits([
  'messageAction',
  'loadMore', 
  'loadMoreDown',
  'messageVisible', 
  'clickRepliedMessage',
  'forceScrollToBottom',
  'keyboardAction',
  'feedAction',
  'smsInvite',
  'delimiterRead',
]);

// Инициализация логики подгрузки сообщений
const {
  checkScrollPosition,
  startScrollWatch,
  stopScrollWatch,
  resetAllowFlags,
} = useFeedLoadMore({
  feedRef: refFeed,
  emit,
  isLoadingMoreRef: computed(() => props.isLoadingMore),
})

// Инициализация логики ответов
const {
  getMessage,
  messageAction,
  handleClickReplied,
  feedObjectDoubleClick,
  handleResetReply,
  handleResetEdit,
} = useFeedReply({
  enableDoubleClickReply: props.enableDoubleClickReply,
  emit,
  isReplyAllowed: (object) => !isSmsFeedMessage(object, getChannelForMessage(object)),
})

function handleSmsInvite(message: IFeedObject) {
  emit('smsInvite', message)
}

function handleDelimiterRead(messageId: string) {
  emit('delimiterRead', messageId)
}

// Инициализация логики клавиатур
const {
  showKeyboard,
  keyboardAction,
  feedKeyboardAction
} = useFeedKeyboard({
  isKeyboardPlace,
  objects: computed(() => props.objects),
  emit
})

// Инициализация логики sticky date
const {
  showStickyDate,
  stickyDateText,
  show: showStickyDateComponent
} = useStickyDate({
  feedRef: refFeed,
  trackingObjects
})

// Инициализация логики скролла
const {
  isInitialized,
  initializeScroll,
  smoothScrollToBottom,
} = useFeedScroll({
  feedRef: refFeed,
  objectsRef: computed(() => props.objects),
  scrollToBottomRef: computed(() => props.scrollToBottom),
})

const defaultBackground = computed(() => {
  return props.chatBackground ?? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;
});

function scrollTopCheck (allowLoadMore: boolean = true) {
  checkButtonVisibility();
  if (isBackfilling.value) {
    const element = refFeed.value as HTMLElement | undefined
    if (element && element.scrollTop < 300) {
      accelerateBackfill()
    }
    showStickyDateComponent();
    return
  }
  checkScrollPosition(allowLoadMore);
  showStickyDateComponent();
};

// вотчеры для loadMore/loadMoreDown и restoreScrollPosition
// перенесены внутрь useFeedLoadMore

// обработчики перенесены в useFeedLoadMore

const throttledScrollTopCheck = throttle(() => scrollTopCheck(), 250)

function scrollToBottomForce() {
  emit('forceScrollToBottom')
  // Для кнопки "вниз" используем плавный скролл
  smoothScrollToBottom()
}

// наблюдение за props.scrollToBottom перенесено в useFeedScroll
// Логика ответов перенесена в useFeedReply

function getMessageById(id: string): IFeedObject | undefined {
  const list = props.objects
  if (id.startsWith('mid-')) {
    const idx = parseInt(id.slice(4), 10)
    return list[idx]
  }
  return list.find((m) => m.messageId === id)
}

const { restartObserving } = useFeedMessageVisibility<IFeedObject>({
  feedRef: refFeed,
  trackingObjects,
  chatAppId: chatAppId as string,
  getMessageById,
  onMessageVisible: (message) => emit('messageVisible', message)
})

// Логика инициализации скролла при появлении объектов перенесена в useFeedScroll

// Откладываем реакцию на смену списка в следующий кадр, чтобы не блокировать UI после тяжёлого ре-рендера
watch(
  () => props.objects,
  () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        resetAllowFlags()
        scrollTopCheck(false)
        trackingObjects.value = document.querySelectorAll('.tracking-message')
        restartObserving()
      })
    })
  },
  { immediate: true }
)

watch(renderStart, () => {
  nextTick(() => {
    trackingObjects.value = document.querySelectorAll('.tracking-message')
    restartObserving()
  })
})

// Логика прокрутки к заданному сообщению
watch(
  () => props.scrollTo,
  (targetId) => {
    if (!targetId) return
    const list = props.objects
    const trimmed = targetId.trim()
    const unprefixed = trimmed.startsWith('msg-') ? trimmed.slice(4) : trimmed
    let index = -1
    if (unprefixed.startsWith('mid-')) {
      index = Number.parseInt(unprefixed.slice(4), 10)
    } else {
      index = list.findIndex((item) => item.messageId === unprefixed || item.messageId === trimmed)
    }
    if (Number.isFinite(index)) {
      revealThroughIndex(index)
    }
  },
)

useFeedScrollTo({
  targetIdRef: computed(() => props.scrollTo),
  feedContainerId: `feed-container-${chatAppId}`,
})

onMounted(() => {
  nextTick(() => {
    if (props.objects.length > 0 && !isInitialized.value) {
      initializeScroll();
    }
  });
});

</script>

<style scoped lang="scss">
@use './styles/Feed.scss';
</style>