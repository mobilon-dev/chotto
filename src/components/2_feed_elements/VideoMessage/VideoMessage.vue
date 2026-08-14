<template>
  <div
    ref="menuAnchorRef"
    class="video-message"
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
      class="video-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="video-message__subtext"
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
      class="video-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar, 'has-caption': Boolean(message.text) }"
    >
      <div
        class="video-message__bottom-shadow"
        aria-hidden="true"
      />
      <template v-if="message.deleted">
        <DeletedMessageContent />
        <div class="video-message__info-container">
          <span
            v-if="message.time"
            class="video-message__time"
          >{{ message.time }}</span>
          <MessageStatusIndicator
            base-class="video-message"
            :message-class="getClass(message)"
            :message-status="message.status"
            :status-class="status"
            :status-title="statusTitle"
          />
        </div>
      </template>
      <template v-else>
        <BaseReplyMessage
          v-if="message.reply"
          style="margin: 10px 10px 4px 16px;"
          :class="message.position"
          :message="message.reply"
          @reply="handleClickReplied"
        />
        <div
          class="video-message__preview-button"
          @click="isOpenModal = true"
          @mouseenter="showMenu"
          @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
        >
          <video
            ref="previewPlayer"
            class="video-message__video"
            :style="{ borderRadius: videoBorderRadius }"
            :src="message.url"
            :muted="true"
            autoplay
            @ended="playAgain"
          />

          <transition name="modal-fade">
            <div
              v-if="buttonDownloadVisible"
              class="video-message__info-container"
            >
              <div
                v-if="message.views"
                class="video-message__views"
                @click.stop="viewsAction"
              >
                <span class="pi pi-eye" />
                <p>{{ message.views }}</p>
              </div>

              <span class="video-message__time">{{ message.time }}</span>

              <MessageStatusIndicator
                base-class="video-message"
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
              class="video-message__download-button"
              type="button"
              @click.stop="downloadVideo"
            >
              <span class="pi pi-download" />
            </button>
          </transition>
        </div>

        <transition name="modal-fade">
          <button
            v-if="buttonMenuVisible && menuActions.length && !reactionsEnabled"
            class="video-message__menu-button"
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
              class="video-message__context-menu message-actions-menu"
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
          class="video-message__text-container"
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
          class="video-message__link-preview"
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
          :reply="buildReplyPayload(message, 'message.video')"
          :enabled="reactionsEnabled"
          :mode="reactionsMode"
          :current-user-id="currentUserId"
          :reaction-user-names="reactionUserNames"
          :menu-enabled="menuActions.length > 0"
          @toggle-reaction="onToggleReaction"
          @add-reaction="onAddReaction"
          @remove-reaction="onRemoveReaction"
          @menu="openMenu"
        />
      </template>
    </div>
  </div>
  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal && !message.deleted"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        :title="message.alt"
        @close="closeModal"
      >
        <video
          ref="player"
          class="video-message__modal-video"
          :src="message.url"
          :alt="message.alt"
          controls
          autoplay
        />
      </ModalFullscreen>
    </transition>
  </Teleport>
</template>

<script
  setup
  lang="ts"
>
import { ref, computed, watch, inject } from 'vue'

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import DeletedMessageContent from '@/components/2_feed_elements/DeletedMessageContent/DeletedMessageContent.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageLinks, useMessageActions, useMessageMenuActions, useChannelAccentColor, useSubtextTooltip, buildReplyPayload, useStartReply } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers, safeMediaPlayVoid } from "@/functions";
import { useTheme } from "@/hooks";
import { IVideoMessage } from '@/types';

const chatAppId = inject('chatAppId') as string | undefined

const { getTheme } = useTheme(chatAppId || '')
const { menuActions } = useMessageMenuActions(() => props.message)
const { startReply } = useStartReply(chatAppId || '')

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
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

const emit = defineEmits(['action','reply','sms-invite']);

function getClass(message: IVideoMessage) {
  return getMessageClass(message.position, 'video-message')
}

const player = ref<HTMLVideoElement | null>();
const previewPlayer = ref<HTMLVideoElement | null>();
// const isPlaying = ref(false);
// const audioDuration = ref(0);
// const currentTime = ref(0)

const isOpenModal = ref(false);
const buttonDownloadVisible = ref(false)
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

const {
  isOpenMenu,
  buttonMenuVisible,
  menuAnchorRef,
  menuRef,
  menuStyle,
  menuTheme,
  showMenu: baseShowMenu,
  hideMenu,
  openMenu,
  toggleMenu,
  onMenuMouseEnter,
  onMenuMouseLeave,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit, {
  onReply: () => startReply(buildReplyPayload(props.message, 'message.video')),
})

// linkified текст формируется в useMessageLinks

// обработчик открытия ссылок предоставлен useMessageLinks

// расширяем showMenu чтобы дополнительно показывать кнопку скачивания
const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-videomessage-right-bg', position: 'right' }
)

const playAgain = () => {
  if (previewPlayer.value) {
    previewPlayer.value.currentTime = 0;
    safeMediaPlayVoid(previewPlayer.value);
  }
};


watch([player, previewPlayer], ([playerVal, previewVal]) => {
  if (playerVal) {
    if (previewVal) {
      previewVal.pause();
      previewVal.currentTime = 0;
    }
  } else if (previewVal) {
    previewVal.currentTime = 0;
    safeMediaPlayVoid(previewVal);
  }
});

const videoBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) return 'var(--chotto-videomessage-preview-with-caption-border-radius, 7px 7px 0 0)'
  if (props.message.reply) return 'var(--chotto-videomessage-preview-with-reply-border-radius, 0 0 7px 7px)'
  return 'var(--chotto-videomessage-preview-border-radius, 7px)'
})

const closeModal = () => isOpenModal.value = false

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

const downloadVideo = async () => {
  if (!props.message.url) return

  try {
    const response = await fetch(props.message.url, {
      headers: {
        Accept: 'video/*'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    const blob = await response.blob()

    const urlExtension = props.message.url.split('.').pop()?.split('?')[0]?.toLowerCase() || ''

    const mimeToExt: Record<string, string> = {
      'video/mp4': 'mp4',
      'video/webm': 'webm',
      'video/ogg': 'ogv',
      'video/quicktime': 'mov',
      'video/x-matroska': 'mkv',
      'application/octet-stream': urlExtension || 'mp4'
    }

    const knownExtensions = ['mp4', 'mov', 'webm', 'ogv', 'mkv']

    let extension = urlExtension && knownExtensions.includes(urlExtension)
      ? urlExtension
      : (mimeToExt[contentType] || 'mp4')

    const filename = props.message.alt
      ? (props.message.alt.includes('.') ? props.message.alt : `${props.message.alt}.${extension}`)
      : `video-${props.message.messageId}.${extension}`

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка при скачивании видео:', error)
    window.open(props.message.url, '_blank')
  }
}

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

</script>

<style scoped lang="scss">
@use './styles/VideoMessage.scss';
</style>
