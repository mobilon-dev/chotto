<template>
  <div
    ref="menuAnchorRef"
    class="file-message"
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
      class="file-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="file-message__subtext"
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
      class="file-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar }"
      :style="{ gridRow: message.subText ? '2' : '1' }"
      @mouseenter="showMenu"
    >
      <div
        class="file-message__bottom-shadow"
        aria-hidden="true"
      />
      <template v-if="message.deleted">
        <DeletedMessageContent />
        <div class="file-message__footer">
          <div class="file-message__info-container">
            <span
              v-if="message.time"
              class="file-message__time"
            >{{ message.time }}</span>
            <MessageStatusIndicator
              base-class="file-message"
              :message-class="getClass(message)"
              :message-status="message.status"
              :status-class="status"
              :status-title="statusTitle"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <BaseReplyMessage
          v-if="message.reply"
          :message="message.reply"
          :class="message.position"
          @reply="handleClickReplied"
        />
        <a
          class="file-message__link"
          :href="message.url"
          @click.prevent="downloadFile"
        >
          <span class="pi pi-file" />
          <p class="file-message__filename-text">
            {{ message.filename }}
          </p>
          <div class="file-message__download-button">
            <span class="pi pi-download" />
          </div>
        </a>
        <div
          v-if="message.text"
          class="file-message__text-container"
        >
          <p
            @click="inNewWindow"
            v-html="linkedHtml"
          />
        </div>

        <LinkPreview
          v-if="message.linkPreview"
          :class="message.position"
          :link-preview="message.linkPreview"
        />

        <EmbedPreview
          v-if="message.embed"
          :class="message.position"
          :embed="message.embed"
        />

        <div class="file-message__footer">
          <MessageReactions
            :reactions="message.reactions"
            :message-id="message.messageId"
            :reply="buildReplyPayload(message, 'message.file')"
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

          <div class="file-message__info-container">
            <div
              v-if="message.views"
              class="file-message__views"
              @click="viewsAction"
            >
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>

            <span class="file-message__time">{{ message.time }}</span>

            <MessageStatusIndicator
              base-class="file-message"
              :message-class="getClass(message)"
              :message-status="message.status"
              :status-class="status"
              :status-title="statusTitle"
            />
          </div>
        </div>

        <MessageSmsInvite
          :status="message.status"
          :has-messenger-account="message.hasMessengerAccount"
          :channel="channel"
          @sms-invite="handleSmsInvite"
        />

        <button
          v-if="buttonMenuVisible && menuActions.length && !reactionsEnabled"
          class="file-message__menu-button"
          @click="toggleMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>

        <Teleport to="body">
          <transition>
            <ContextMenu
              v-if="isOpenMenu && menuActions.length"
              ref="menuRef"
              class="file-message__context-menu message-actions-menu"
              :style="menuStyle"
              :data-theme="menuTheme"
              :actions="menuActions"
              @click="clickAction"
              @mouseenter="onMenuMouseEnter"
              @mouseleave="onMenuMouseLeave"
            />
          </transition>
        </Teleport>
      </template>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed, inject } from 'vue'

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import DeletedMessageContent from '@/components/2_feed_elements/DeletedMessageContent/DeletedMessageContent.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageLinks, useMessageActions, useMessageMenuActions, useChannelAccentColor, useSubtextTooltip, buildReplyPayload, useStartReply } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from "@/functions";
import { IFileMessage } from '@/types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
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
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)
const { menuActions } = useMessageMenuActions(() => props.message)
const chatAppId = inject('chatAppId') as string | undefined
const { startReply } = useStartReply(chatAppId || '')

const {
  isOpenMenu,
  buttonMenuVisible,
  menuAnchorRef,
  menuRef,
  menuStyle,
  menuTheme,
  showMenu,
  hideMenu,
  openMenu,
  toggleMenu,
  onMenuMouseEnter,
  onMenuMouseLeave,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit, {
  onReply: () => startReply(buildReplyPayload(props.message, 'message.file')),
})

// обработчик открытия ссылок предоставлен useMessageLinks

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-filemessage-right-bg', position: 'right' }
)

function getClass(message: { position: string }) {
  return getMessageClass(message.position, 'file-message')
}

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

const downloadFile = async () => {
  if (!props.message.url) return

  try {
    const targetUrl = new URL(props.message.url, window.location.href)
    const isSameOrigin = targetUrl.origin === window.location.origin

    if (isSameOrigin) {
      // Доверяем браузеру — он быстрее покажет диалог "Сохранить" для своих файлов
      const link = document.createElement('a')
      link.href = targetUrl.toString()
      link.download = props.message.filename || `file-${props.message.messageId}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Для внешних доменов остаёмся на fetch + blob, иначе download может быть заблокирован
    const response = await fetch(props.message.url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.message.filename || `file-${props.message.messageId}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error)
    // В случае ошибки открываем файл в новом окне
    window.open(props.message.url, '_blank')
  }
}

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

</script>

<style scoped lang="scss">
@use './styles/FileMessage.scss';
</style>
