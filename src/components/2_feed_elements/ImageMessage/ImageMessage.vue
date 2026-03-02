<template>
  <div
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
      class="image-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar }"
    >
      <BaseReplyMessage
        v-if="message.reply"
        style="margin: 10px 10px 4px 16px;"
        :class="message.position"
        :message="message.reply"
        @reply="handleClickReplied"
      />

      <div
        class="image-message__preview-button"
        :class="{ 'image-message__preview-button--blur-edges': shouldApplyBlur }"
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="hideMenu"
      >
        <div
          v-if="shouldApplyBlur"
          class="image-message__blur-wrapper"
        >
          <img
            class="image-message__blur-left"
            :src="message.url"
            :alt="message.alt"
          >
          <img
            class="image-message__blur-right"
            :src="message.url"
            :alt="message.alt"
          >
        </div>
        <img
          ref="imageRef"
          class="image-message__preview-image"
          :style="{ borderRadius: imageBorderRadius }"
          :src="message.url"
          :alt="message.alt"
        >

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
          v-if="buttonMenuVisible && message.actions"
          class="image-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>


      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="image-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

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
        :reactions="message.reactions"
        :message-id="message.messageId"
        :enabled="reactionsEnabled"
        @toggle-reaction="onToggleReaction"
        @add-reaction="onAddReaction"
        @remove-reaction="onRemoveReaction"
      />
    </div>


    <Teleport to="body">
      <transition name="modal-fade">
        <ModalFullscreen
          v-if="isOpenModal"
          :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          :title="message.alt"
          @close="closeModal"
        >
          <img
            class="image-message__modal-image"
            :src="message.url"
            :alt="message.alt"
          >
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
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageLinks, useMessageActions, useChannelAccentColor, useSubtextTooltip } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from "@/functions";
import { useTheme } from "@/hooks";
import { IImageMessage } from '@/types';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

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

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu: baseShowMenu,
  hideMenu: baseHideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)
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
})

watch(
  () => [props.message.text, props.message.url],
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
  return props.message.text && textWidth.value > imageWidth.value && imageWidth.value > 0
})

const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const hideMenu = () => {
  baseHideMenu()
  buttonDownloadVisible.value = false
}

const imageBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) {
    // Если текст шире изображения, возвращаем '0'
    if (textWidth.value > imageWidth.value && imageWidth.value > 0) {
      return '0'
    }
    return '8px 8px 0 0'
  }
  if (props.message.reply) return '0 0 8px 8px'
  return '8px'
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

const closeModal = () => isOpenModal.value = false

const downloadImage = async () => {
  if (!props.message.url) return
  
  try {
    const response = await fetch(props.message.url, {
      headers: {
        'Accept': 'image/*'
      }
    })
    
    // Получаем оригинальный Content-Type
    const contentType = response.headers.get('content-type') || ''
    
    // Создаем blob с явным указанием типа из ответа сервера
    const blob = await response.blob()
    
    // Получаем расширение из URL
    const urlExtension = props.message.url.split('.').pop()?.split('?')[0]?.toLowerCase() || ''
    
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
    
    const filename = props.message.alt 
      ? (props.message.alt.includes('.') ? props.message.alt : `${props.message.alt}.${extension}`)
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

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

</script>

<style scoped lang="scss">
@use './styles/ImageMessage.scss';
</style>
