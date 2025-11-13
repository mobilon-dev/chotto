<template>
  <div
    class="image-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
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
      {{ message.subText }}
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
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
      >
        <img
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
        class="image-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedHtml"
        />
      </div>

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
import { ref, computed, inject } from 'vue';

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, ModalFullscreen, MessageReactions, MessageStatusIndicator } from '@/components';
import { useMessageLinks, useMessageActions } from '@/hooks/messages';
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
  }
});

const emit = defineEmits(['action', 'reply']);

const isOpenModal = ref(false);

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu: baseShowMenu,
  hideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)
const buttonDownloadVisible = ref(false)
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

// обработчик открытия ссылок предоставлен useMessageLinks

const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const imageBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) return '8px 8px 0 0'
  if (props.message.reply) return '0 0 8px 8px'
  return '8px'
})

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

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

</script>

<style scoped lang="scss">
@use './styles/ImageMessage.scss';
</style>
