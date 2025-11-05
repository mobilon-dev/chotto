<template>
  <div
    class="file-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
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
      {{ message.subText }}
    </p>

    <div
      class="file-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar }"
      :style="{ gridRow: message.subText ? '2' : '1' }"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        :message="message.reply"
        :class="message.position"
        @reply="handleClickReplied"
      />
      <a
        class="file-message__link"
        :href="message.url"
        download
        target="_blank"
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

        <Tooltip
          v-if="getClass(message) === 'file-message__right' && statuses.includes(message.status)"
          :text="statusTitle"
          position="bottom-left"
        >
          <div
            class="file-message__status"
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
        class="file-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="file-message__context-menu"
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

function getClass(message: { position: string }) {
  return getMessageClass(message.position, 'file-message')
}

</script>

<style scoped lang="scss">
@use './styles/FileMessage.scss';
</style>
