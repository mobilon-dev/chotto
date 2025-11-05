<template>
  <div
    v-if="objects.length > 0 || typing"
    :id="'feed-container-' + chatAppId"
    ref="refFeed"
    class="message-feed"
    :style="{ backgroundImage: `url(${defaultBackground})` }"
    @scroll="throttledScrollTopCheck()"
    @mousedown="startScrollWatch"
    @mouseup="stopScrollWatch"
  >
    <transition>
      <DateMessageSticky
        v-if="showStickyDate"
        class="message-feed__sticky-date"
        :text="stickyDateText"
      />
    </transition>
    <div
      v-for="(object, index) in groupedObjects"
      :id="JSON.stringify(object)"
      :key="`${object.messageId ?? 'mid'}-${index}`"
      class="tracking-message"
      @dblclick="feedObjectDoubleClick($event,object)"
    >
      <component
        :is="componentsMap(object.type)"
        :key="`${object.messageId ?? 'mid'}-${index}`"
        class="message-feed__message"
        :message="object"
        :apply-style="applyStyle"
        :is-first-in-series="object.isFirstInSeries"
        @action="messageAction"
        @reply="handleClickReplied"
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
  >
    <div style="margin: auto;">
      <slot name="empty-feed" />
    </div>
  </div>
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
</template>

<script
  setup
  lang="ts"
>
import { ref, watch, nextTick, inject, computed, onMounted } from 'vue';
import { 
  DateMessageSticky,
  BaseReplyMessage,
  MessageKeyboard,
  FeedKeyboard,
  TypingMessage
} from '@/components';

import { IFeedObject, IFeedTyping, IFeedUnreadButton, IFeedKeyboard } from '@/types';
import { useStickyDate, useFeedScroll, useFeedButton, useFeedGrouping, useFeedLoadMore, useFeedMessageVisibility, useFeedComponents, useFeedReply, useFeedKeyboard, useFeedScrollTo } from './composables';
import { throttle } from './functions/throttle';

import chatBackgroundRaw from './assets/chat-background.svg?raw';

const props = defineProps({
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
  }
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

// Инициализация логики группировки
const { groupedObjects } = useFeedGrouping({
  objects: computed(() => props.objects),
})

const chatAppId = inject('chatAppId')

const emit = defineEmits([
  'messageAction',
  'loadMore', 
  'loadMoreDown',
  'messageVisible', 
  'clickRepliedMessage',
  'forceScrollToBottom',
  'keyboardAction',
  'feedAction'
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
  handleResetReply
} = useFeedReply({
  enableDoubleClickReply: props.enableDoubleClickReply,
  emit
})

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
  performScrollToBottom,
  ensureScrollToBottom,
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
  // обновляем видимость кнопки и положение клавиатуры через композабл
  checkButtonVisibility();
  // делегируем вычисления подгрузки в композабл
  checkScrollPosition(allowLoadMore);
  // Показываем sticky date
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

const { restartObserving } = useFeedMessageVisibility<IFeedObject>({
  feedRef: refFeed,
  trackingObjects,
  chatAppId: chatAppId as string,
  onMessageVisible: (message) => emit('messageVisible', message)
})

// Логика инициализации скролла при появлении объектов перенесена в useFeedScroll

watch(
  () => props.objects,
  () => {
    nextTick(() => {
      // Сбрасываем флаги подгрузки
      resetAllowFlags()
      // Проверяем позицию без авто-триггера подгрузки, чтобы избежать цепной загрузки
      scrollTopCheck(false)
      // Обновляем наблюдаемые элементы и перезапускаем наблюдение
      trackingObjects.value = document.querySelectorAll('.tracking-message')
      restartObserving()
    })
  },
  { immediate: true }
)

// Логика прокрутки к заданному сообщению
useFeedScrollTo({
  targetIdRef: computed(() => props.scrollTo),
  feedContainerId: `feed-container-${chatAppId}`,
})

// watcher для инициализации при монтировании
onMounted(() => {
  nextTick(() => {
    if (props.objects.length > 0 && !isInitialized.value) {
      initializeScroll();
    }
    
    // Наблюдатель за изменениями размера контента
    const resizeObserver = new ResizeObserver(() => {
      if (props.scrollToBottom) {
        // При изменении размера окна принудительно скроллим вниз
        performScrollToBottom();
        setTimeout(() => {
          ensureScrollToBottom();
        }, 200);
        // Дополнительная проверка для медленных чатов
        setTimeout(() => {
          ensureScrollToBottom();
        }, 800);
      }
    });
    
    if (refFeed.value) {
      resizeObserver.observe(refFeed.value);
    }
  });
});

</script>

<style scoped lang="scss">
@use './styles/Feed.scss';
</style>
