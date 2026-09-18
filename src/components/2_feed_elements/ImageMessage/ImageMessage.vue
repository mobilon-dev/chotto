<template>
  <div
    ref="menuAnchorRef"
    class="image-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
    :style="rightBubbleStyle"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar && isFirstInSeries"
      class="image-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="image-message__subtext"
    >
      <Tooltip
        :text="channelInfo"
        :position="message.position === 'left' ? 'right' : 'left'"
        :offset="8"
      >
        {{ message.subText }}
      </Tooltip>
    </p>

    <div
      ref="contentRef"
      class="image-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar, 'has-caption': Boolean(message.text) }"
      @pointerenter="onContentPointerEnter"
      @pointerleave="onContentPointerLeave"
    >
      <div
        class="image-message__bottom-shadow"
        aria-hidden="true"
      />
      <template v-if="message.deleted">
        <DeletedMessageContent />
        <div class="image-message__info-container">
          <span
            v-if="message.time"
            class="image-message__time"
          >{{ message.time }}</span>
          <MessageStatusIndicator
            base-class="image-message"
            :message-class="getClass(message)"
            :message-status="message.status"
            :status-class="status"
            :status-title="statusTitle"
          />
        </div>
      </template>
      <template v-else>
        <FeedReplyQuote
          v-if="message.reply"
          style="margin: 10px 10px 4px 16px;"
          :class="message.position"
          :message="message.reply"
          @reply="handleClickReplied"
        />

        <div
          class="image-message__preview-button"
          :class="{
            'image-message__preview-button--blur-edges': shouldApplyBlur,
            'image-message__preview-button--album': isAlbum,
          }"
          :style="isAlbum ? { borderRadius: imageBorderRadius } : undefined"
          @click="onPreviewClick"
          @mouseenter="showMenu"
          @mouseleave="hideMenu"
        >
          <template v-if="isAlbum">
            <div
              class="image-message__album"
              :class="'image-message__album--' + albumLayout"
            >
              <button
                v-for="(item, index) in visibleAlbumItems"
                :key="(item.url || '') + '-' + index"
                type="button"
                class="image-message__album-tile"
                @click.stop="onAlbumTileClick(index)"
              >
                <img
                  class="image-message__album-image"
                  :src="item.imagePreviewUrl || item.url"
                  :alt="item.filename"
                >
                <span
                  v-if="albumOverflow > 0 && index === visibleAlbumItems.length - 1"
                  class="image-message__album-overflow"
                >+{{ albumOverflow }}</span>
              </button>
            </div>
          </template>
          <template v-else>
            <div
              v-if="shouldApplyBlur"
              class="image-message__blur-wrapper"
            >
              <img
                class="image-message__blur-left"
                :src="feedImageUrl"
                :alt="message.alt"
              >
              <img
                class="image-message__blur-right"
                :src="feedImageUrl"
                :alt="message.alt"
              >
            </div>
            <img
              ref="imageRef"
              class="image-message__preview-image"
              :style="{ borderRadius: imageBorderRadius }"
              :src="feedImageUrl"
              :alt="message.alt"
            >
          </template>

          <transition name="modal-fade">
            <div
              v-if="buttonDownloadVisible"
              class="image-message__info-container"
            >
              <div
                v-if="message.views"
                class="image-message__views"
                @click.stop="viewsAction"
              >
                <span class="pi pi-eye" />
                <p>{{ message.views }}</p>
              </div>

              <span class="image-message__time">{{ message.time }}</span>

              <MessageStatusIndicator
                base-class="image-message"
                :message-class="getClass(message)"
                :message-status="message.status"
                :status-class="status"
                :status-title="statusTitle"
              />
            </div>
          </transition>

          <transition name="modal-fade">
            <button
              v-if="buttonDownloadVisible"
              class="image-message__download-button"
              @click.stop="downloadImage"
            >
              <span class="pi pi-download" />
            </button>
          </transition>
        </div>

        <transition name="modal-fade">
          <button
            v-if="buttonMenuVisible && menuActions.length && !reactionsEnabled && hoverActionsEnabled"
            class="image-message__menu-button"
            @click="toggleMenu"
          >
            <span class="pi pi-ellipsis-h" />
          </button>
        </transition>


        <Teleport to="body">
          <transition name="context-menu">
            <ContextMenu
              v-if="isOpenMenu && menuActions.length"
              ref="menuRef"
              class="image-message__context-menu message-actions-menu"
              :style="menuStyle"
              :data-theme="menuTheme"
              :actions="menuActions"
              @click="clickAction"
              @mouseenter="onMenuMouseEnter"
              @mouseleave="onMenuMouseLeave"
            />
          </transition>
        </Teleport>

        <div
          v-if="message.text"
          ref="textRef"
          class="image-message__text-container"
        >
          <p
            @click="inNewWindow"
            v-html="linkedHtml"
          />
        </div>

        <MessageSmsInvite
          :status="message.status"
          :has-messenger-account="message.hasMessengerAccount"
          :channel="channel"
          @sms-invite="handleSmsInvite"
        />

        <LinkPreview
          v-if="message.linkPreview"
          class="image-message__link-preview"
          :class="message.position"
          :link-preview="message.linkPreview"
        />

        <EmbedPreview
          v-if="message.embed"
          :class="message.position"
          :embed="message.embed"
        />

        <MessageReactions
          v-if="showReactions"
          ref="reactionsRef"
          :reactions="message.reactions"
          :message-id="message.messageId"
          :enabled="reactionsActive"
          :mode="reactionsMode"
          :current-user-id="currentUserId"
          :reaction-user-names="reactionUserNames"
          @toggle-reaction="onToggleReaction"
          @add-reaction="onAddReaction"
          @remove-reaction="onRemoveReaction"
        />
      </template>
    </div>


    <Teleport to="body">
      <transition name="modal-fade">
        <ModalFullscreen
          v-if="isOpenModal && !message.deleted"
          :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          :title="modalTitle"
          @close="closeModal"
        >
          <div class="image-message__modal-body">
            <button
              v-if="isAlbum"
              type="button"
              class="image-message__modal-nav image-message__modal-nav--prev"
              aria-label="Предыдущее изображение"
              @click.stop="showPrevModalImage"
            >
              <span class="pi pi-chevron-left" />
            </button>
            <img
              class="image-message__modal-image"
              :src="modalImageUrl"
              :alt="modalImageAlt"
            >
            <button
              v-if="isAlbum"
              type="button"
              class="image-message__modal-nav image-message__modal-nav--next"
              aria-label="Следующее изображение"
              @click.stop="showNextModalImage"
            >
              <span class="pi pi-chevron-right" />
            </button>
            <span
              v-if="isAlbum"
              class="image-message__modal-counter"
            >{{ modalIndex + 1 }} / {{ imageItems.length }}</span>
          </div>
        </ModalFullscreen>
      </transition>
    </Teleport>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, computed, inject, onMounted, onUnmounted, nextTick, watch } from 'vue';

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import FeedReplyQuote from '@/components/2_feed_elements/FeedReplyQuote/FeedReplyQuote.vue';
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import DeletedMessageContent from '@/components/2_feed_elements/DeletedMessageContent/DeletedMessageContent.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageLinks, useMessageActions, useMessageMenuActions, useMessageHoverActions, useMessageReactionsInFeed, useChannelAccentColor, useSubtextTooltip, buildReplyPayload, useStartReply, getImageMessageItems } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from "@/functions";
import { useTheme } from "@/hooks";
import { IImageMessage } from '@/types';

const chatAppId = inject('chatAppId') as string | undefined

const { getTheme } = useTheme(chatAppId || '')
const { menuActions } = useMessageMenuActions(() => props.message)
const { hoverActionsEnabled, reactionsActive } = useMessageHoverActions(
  () => props.channel,
  () => props.reactionsEnabled,
  () => props.message,
)
const { startReply } = useStartReply(chatAppId || '')

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
    required: true,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  },
  isFirstInSeries: {
    type: Boolean,
    default: true
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
  currentUserId: {
    type: [String, Number] as unknown as () => string | number | undefined,
    default: undefined,
  },
  reactionUserNames: {
    type: Object as () => Record<string, string>,
    default: undefined,
  },
  subtextTooltipData: {
    type: Object as () => Record<string, string>,
    required: false,
    default: () => ({})
  },
  channel: {
    type: String,
    required: false,
    default: undefined
  }
});

const emit = defineEmits(['action', 'reply', 'sms-invite']);

const isOpenModal = ref(false);
const modalIndex = ref(0)
const ALBUM_VISIBLE_LIMIT = 4

const imageItems = computed(() => getImageMessageItems(props.message))
const isAlbum = computed(() => imageItems.value.length > 1)
const visibleAlbumItems = computed(() => imageItems.value.slice(0, ALBUM_VISIBLE_LIMIT))
const albumOverflow = computed(() => Math.max(0, imageItems.value.length - ALBUM_VISIBLE_LIMIT))
const albumLayout = computed(() => String(Math.min(imageItems.value.length, ALBUM_VISIBLE_LIMIT)))

const feedImageUrl = computed(() => {
  const primary = imageItems.value[0]
  return primary?.imagePreviewUrl || primary?.url || ''
})

const modalImage = computed(() => imageItems.value[modalIndex.value] || imageItems.value[0])
const modalImageUrl = computed(() => modalImage.value?.url || '')
const modalImageAlt = computed(() => modalImage.value?.filename || props.message.alt)
const modalTitle = computed(() => {
  if (!isAlbum.value) return modalImageAlt.value
  return modalImageAlt.value || `${modalIndex.value + 1} / ${imageItems.value.length}`
})

function openModal(index: number) {
  modalIndex.value = index
  isOpenModal.value = true
}

function onPreviewClick() {
  if (!isAlbum.value) openModal(0)
}

function onAlbumTileClick(index: number) {
  const isOverflowTile = albumOverflow.value > 0 && index === visibleAlbumItems.value.length - 1
  openModal(isOverflowTile ? ALBUM_VISIBLE_LIMIT : index)
}

function showPrevModalImage() {
  const count = imageItems.value.length
  if (count < 2) return
  modalIndex.value = (modalIndex.value - 1 + count) % count
}

function showNextModalImage() {
  const count = imageItems.value.length
  if (count < 2) return
  modalIndex.value = (modalIndex.value + 1) % count
}

function onModalKeydown(event: KeyboardEvent) {
  if (!isOpenModal.value || !isAlbum.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPrevModalImage()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNextModalImage()
  }
}

watch(isOpenModal, (open) => {
  if (open) window.addEventListener('keydown', onModalKeydown)
  else window.removeEventListener('keydown', onModalKeydown)
})

const {
  isOpenMenu,
  buttonMenuVisible,
  menuAnchorRef,
  menuRef,
  menuStyle,
  menuTheme,
  showMenu: baseShowMenu,
  hideMenu: baseHideMenu,
  openMenu,
  toggleMenu,
  onMenuMouseEnter,
  onMenuMouseLeave: baseOnMenuMouseLeave,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit, {
  onReply: () => startReply(buildReplyPayload(props.message, 'message.image')),
})
const buttonDownloadVisible = ref(false)
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

// обработчик открытия ссылок предоставлен useMessageLinks

const imageRef = ref<HTMLImageElement | null>(null)
const textRef = ref<HTMLDivElement | null>(null)
const imageWidth = ref(0)
const textWidth = ref(0)

watch(
  () => linkedHtml.value,
  () => {
    updateWidths()
    // Переподключаем ResizeObserver после изменения текста
    nextTick(() => {
      if (resizeObserver && textRef.value) {
        resizeObserver.observe(textRef.value)
      }
    })
  }
)

const updateWidths = () => {
  nextTick(() => {
    if (imageRef.value) {
      imageWidth.value = imageRef.value.offsetWidth
    }
    if (textRef.value) {
      textWidth.value = textRef.value.offsetWidth
    }
  })
}

let resizeObserver: ResizeObserver | null = null
let windowResizeHandler: (() => void) | null = null

onMounted(() => {
  updateWidths()
  
  // Обновляем размеры при изменении размера окна
  windowResizeHandler = () => updateWidths()
  window.addEventListener('resize', windowResizeHandler)
  
  // Используем ResizeObserver для отслеживания изменений размеров элементов
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateWidths()
    })
    
    if (imageRef.value) {
      resizeObserver.observe(imageRef.value)
    }
    if (textRef.value) {
      resizeObserver.observe(textRef.value)
    }
  }
})

onUnmounted(() => {
  if (windowResizeHandler) {
    window.removeEventListener('resize', windowResizeHandler)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('keydown', onModalKeydown)
})

watch(
  () => [props.message.text, props.message.url, props.message.imagePreviewUrl, props.message.items],
  () => {
    updateWidths()
    // Переподключаем ResizeObserver после изменения элементов
    nextTick(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
        if (imageRef.value) {
          resizeObserver.observe(imageRef.value)
        }
        if (textRef.value) {
          resizeObserver.observe(textRef.value)
        }
      }
    })
  },
  { immediate: true }
)

const shouldApplyBlur = computed(() => {
  if (isAlbum.value) return false
  return Boolean(props.message.text) && textWidth.value > imageWidth.value && imageWidth.value > 0
})

const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const hideMenu = (event?: MouseEvent) => {
  baseHideMenu(event)
  if (!buttonMenuVisible.value) {
    buttonDownloadVisible.value = false
  }
}

const onMenuMouseLeave = () => {
  baseOnMenuMouseLeave()
  buttonDownloadVisible.value = false
}

const imageBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) {
    // Если текст шире изображения, возвращаем '0'
    if (textWidth.value > imageWidth.value && imageWidth.value > 0) {
      return '0'
    }
    return 'var(--chotto-imagemessage-preview-with-caption-border-radius, 7px 7px 0 0)'
  }
  if (props.message.reply) return 'var(--chotto-imagemessage-preview-with-reply-border-radius, 0 0 7px 7px)'
  return 'var(--chotto-imagemessage-preview-border-radius, 7px)'
})

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-imagemessage-right-bg', position: 'right' }
)

function getClass(message: IImageMessage) {
  return getMessageClass(message.position, 'image-message')
}

const closeModal = () => {
  isOpenModal.value = false
}

const downloadTarget = computed(() => {
  if (isOpenModal.value) return modalImage.value
  return imageItems.value[0]
})

const downloadImage = async () => {
  const target = downloadTarget.value
  if (!target?.url) return
  
  try {
    const response = await fetch(target.url, {
      headers: {
        'Accept': 'image/*'
      }
    })
    
    // Получаем оригинальный Content-Type
    const contentType = response.headers.get('content-type') || ''
    
    // Создаем blob с явным указанием типа из ответа сервера
    const blob = await response.blob()
    
    // Получаем расширение из URL
    const urlExtension = target.url.split('.').pop()?.split('?')[0]?.toLowerCase() || ''
    
    // Определяем расширение по Content-Type или URL
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'image/bmp': 'bmp'
    }
    
    let extension = urlExtension && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(urlExtension)
      ? urlExtension
      : (mimeToExt[contentType] || 'jpg')
    
    const nameSource = target.filename || props.message.alt
    const filename = nameSource
      ? (nameSource.includes('.') ? nameSource : `${nameSource}.${extension}`)
      : `image-${props.message.messageId}.${extension}`
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка при скачивании изображения:', error)
  }
}

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

const contentRef = ref<HTMLElement | null>(null)
const reactionsRef = ref<InstanceType<typeof MessageReactions> | null>(null)
const chipsRef = computed(() => {
  const el = reactionsRef.value?.$el
  return el instanceof HTMLElement ? el : null
})

const { showReactions, onContentPointerEnter, onContentPointerLeave } = useMessageReactionsInFeed({
  message: () => props.message,
  messageId: () => props.message.messageId,
  reactions: () => props.message.reactions,
  reactionsActive,
  reactionsMode: () => props.reactionsMode,
  reply: () => buildReplyPayload(props.message, 'message.image'),
  menuEnabled: () => menuActions.value.length > 0,
  contentRef,
  chipsRef,
  handlers: {
    onToggleReaction,
    onAddReaction,
    onRemoveReaction,
    onMenu: openMenu,
  },
})

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

</script>

<style scoped lang="scss">
@use './styles/ImageMessage.scss';
</style>
