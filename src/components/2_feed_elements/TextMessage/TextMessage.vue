<template>
  <div
    class="text-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
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
      {{ message.subText }}
    </p>

    <div
      class="text-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar }"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
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

      <div class="text-message__info-container">
        <div
          v-if="message.views"
          class="text-message__views"
          @click="viewsAction"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>
        <span
          v-if="message.time"
          class="text-message__time"
        >{{ message.time }}</span>
        <Tooltip
          v-if="getClass(message) === 'text-message__right' && statuses.includes(message.status)"
          :text="statusTitle"
          position="bottom-left"
        >
          <div
            class="text-message__status"
            :class="status"
          >
            <template v-if="message.status === 'pending'">
              <span class="pi pi-clock" />
            </template>
            <template v-else-if="message.status === 'error'">
              <span class="pi pi-times-circle" />
            </template>
            <template v-else>
              <span
                v-if="message.status !== 'sent'"
                class="pi pi-check"
              />
              <span class="pi pi-check" />
            </template>
          </div>
        </Tooltip>
      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="text-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="text-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, Tooltip } from '@/components';
import { useMessageLinks, useMessageActions } from '@/hooks/messages';
import { getStatus, statuses, getMessageClass, getStatusTitle } from "@/functions";
import { ITextMessage } from '@/types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  },
  isFirstInSeries: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['action','reply']);
const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

const { 
  isOpenMenu,
  buttonMenuVisible,
  showMenu,
  hideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)

// обработчик открытия ссылок предоставлен useMessageLinks

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

function getClass(message: ITextMessage) {
  return getMessageClass(message.position, 'text-message')
}
</script>

<style scoped lang="scss">
@use './styles/TextMessage.scss';
</style>
