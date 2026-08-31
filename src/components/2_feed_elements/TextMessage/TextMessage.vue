<template>
  <div
    ref="menuAnchorRef"
    class="text-message"
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
      class="text-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: (message.subText && isFirstInSeries) ? '2' : '1' }"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="text-message__subtext"
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
      class="text-message__content"
      :class="{
        'is-first': isFirstInSeries,
        'with-avatar-indent': !isFirstInSeries && message.avatar,
        'has-reply': Boolean(message.reply),
      }"
      @mouseenter="hoverActionsEnabled && showMenu()"
    >
      <div
        class="text-message__bottom-shadow"
        aria-hidden="true"
      />
      <template v-if="message.deleted">
        <DeletedMessageContent
          :original-text="deletedTooltip.original"
          :meta="deletedTooltip.meta"
        />
        <div class="text-message__footer">
          <div class="text-message__info-container">
            <span
              v-if="message.time"
              class="text-message__time"
            >{{ message.time }}</span>
            <MessageStatusIndicator
              base-class="text-message"
              :message-class="getClass(message)"
              :message-status="message.status"
              :status-class="status"
              :status-title="statusTitle"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <FeedReplyQuote
          v-if="message.reply"
          :class="message.position"
          :message="message.reply"
          @reply="handleClickReplied"
        />
        <p
          class="text-message__text"
          @click="inNewWindow"
          v-html="linkedHtml"
        />

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

        <div class="text-message__footer">
          <MessageReactions
            v-if="reactionsActive"
            :reactions="message.reactions"
            :message-id="message.messageId"
            :reply="buildReplyPayload(message, 'message.text')"
            :enabled="reactionsActive"
            :mode="reactionsMode"
            :current-user-id="currentUserId"
            :reaction-user-names="reactionUserNames"
            :menu-enabled="menuActions.length > 0"
            @toggle-reaction="onToggleReaction"
            @add-reaction="onAddReaction"
            @remove-reaction="onRemoveReaction"
            @menu="openMenu"
          />

          <div class="text-message__info-container">
            <div
              v-if="message.views"
              class="text-message__views"
              @click="viewsAction"
            >
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>
            <Tooltip
              v-if="message.edited"
              position="bottom-right"
              :offset="8"
              :delay="400"
              max-width="280px"
              :bubble-style="editTooltipBubbleStyle"
            >
              <template
                v-if="hasEditTooltip"
                #content
              >
                <div class="text-message__edit-tooltip">
                  <div
                    v-if="editTooltipLines.original"
                    class="text-message__edit-tooltip-original"
                  >
                    {{ editTooltipLines.original }}
                  </div>
                  <div
                    v-for="(edit, index) in editTooltipLines.edits"
                    :key="`${edit.text}-${edit.meta}-${index}`"
                    class="text-message__edit-tooltip-entry"
                  >
                    <div
                      v-if="edit.text"
                      class="text-message__edit-tooltip-original"
                    >
                      {{ edit.text }}
                    </div>
                    <div
                      v-if="edit.meta"
                      class="text-message__edit-tooltip-meta"
                    >
                      {{ edit.meta }}
                    </div>
                  </div>
                </div>
              </template>
              <span
                class="text-message__edited"
                @mouseenter="onEditedHover"
              >{{ editedLabel }}</span>
            </Tooltip>
            <span
              v-if="message.time"
              class="text-message__time"
            >{{ message.time }}</span>
            <MessageStatusIndicator
              base-class="text-message"
              :message-class="getClass(message)"
              :message-status="message.status"
              :status-class="status"
              :status-title="statusTitle"
            />
          </div>
        </div>

        <MessageSmsInvite
          v-if="showSmsInvite"
          :status="message.status"
          :has-messenger-account="message.hasMessengerAccount"
          :channel="channel"
          @sms-invite="handleSmsInvite"
        />

        <button
          v-if="buttonMenuVisible && menuActions.length && !reactionsEnabled && hoverActionsEnabled"
          class="text-message__menu-button"
          @click="toggleMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>

        <Teleport to="body">
          <transition>
            <ContextMenu
              v-if="isOpenMenu && menuActions.length"
              ref="menuRef"
              class="text-message__context-menu message-actions-menu"
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
import { computed, inject, ref } from 'vue'

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import FeedReplyQuote from '@/components/2_feed_elements/FeedReplyQuote/FeedReplyQuote.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import DeletedMessageContent from '@/components/2_feed_elements/DeletedMessageContent/DeletedMessageContent.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import {
  useMessageLinks,
  useMessageActions,
  useMessageMenuActions,
  useMessageHoverActions,
  useChannelAccentColor,
  useSubtextTooltip,
  buildReplyPayload,
  buildEditPayload,
  useStartReply,
  useStartEdit,
  getEditTooltipLines,
  getDeletedTooltipLines,
} from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from "@/functions";
import { useLocale } from '@/locale/useLocale';
import { ITextMessage, MessageDeleteInfo } from '@/types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage & {
      filename?: string
      alt?: string
      deletion?: MessageDeleteInfo
    },
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
const { t } = useLocale()
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)
const { menuActions } = useMessageMenuActions(() => props.message)
const { hoverActionsEnabled, reactionsActive } = useMessageHoverActions(
  () => props.channel,
  () => props.reactionsEnabled,
  () => props.message,
)
const chatAppId = inject('chatAppId') as string | undefined
const { startReply } = useStartReply(chatAppId || '')
const { startEdit } = useStartEdit(chatAppId || '')
const editInfoRequested = ref(false)

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
  onReply: () => startReply(buildReplyPayload(props.message, 'message.text')),
  onEdit: () => startEdit(buildEditPayload(props.message, 'message.text')),
})

// обработчик открытия ссылок предоставлен useMessageLinks

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))
const editedLabel = computed(() => t('component.TextMessage.edited'))
const editTooltipLines = computed(() => getEditTooltipLines(props.message.edited))
const hasEditTooltip = computed(
  () => !!(editTooltipLines.value.original || editTooltipLines.value.edits.length)
)
const deletedTooltip = computed(() => getDeletedTooltipLines(props.message))
const editTooltipBubbleStyle = {
  '--chotto-tooltip-border': '1px solid #5F5F5F',
}

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-textmessage-right-bg', position: 'right' }
)

function getClass(message: ITextMessage) {
  return getMessageClass(message.position, 'text-message')
}

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

const showSmsInvite = computed(
  () =>
    props.message.status === 'error' &&
    props.message.hasMessengerAccount === false
)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

/** При наведении на «изменено» — запрос истории правки на бэк (один раз за жизнь компонента) */
function onEditedHover() {
  if (editInfoRequested.value || !props.message.edited) return
  editInfoRequested.value = true
  emit('action', {
    action: 'fetchEditInfo',
    messageId: props.message.messageId,
    type: 'editInfo',
  })
}
</script>

<style scoped lang="scss">
@use './styles/TextMessage.scss';
</style>
