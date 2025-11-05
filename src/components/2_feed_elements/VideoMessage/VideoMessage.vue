<template>
  <div
    class="video-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
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
      {{ message.subText }}
    </p>

    <div
      class="video-message__content"
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

            <Tooltip
              v-if="getClass(message) === 'video-message__right' && statuses.includes(message.status)"
              :text="statusTitle"
              position="bottom-left"
            >
              <div
                class="video-message__status"
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
        </transition>


        <transition name="modal-fade">
          <a
            v-if="buttonDownloadVisible"
            class="video-message__download-button"
            :href="message.url"
            download
            target="_blank"
            @click.stop="() => '//Предотвращаем всплытие события клика'"
          >
            <span class="pi pi-download" />
          </a>
        </transition>
      </div>

      <transition name="modal-fade">
        <button
          v-if="buttonMenuVisible && message.actions"
          class="video-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>


      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="video-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <div
        v-if="message.text"
        class="video-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedHtml"
        />
      </div>

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
    </div>
  </div>
  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
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

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, ModalFullscreen, Tooltip } from '@/components';
import { useMessageLinks, useMessageActions } from '@/hooks/messages';
import { getStatus, statuses, getMessageClass, getStatusTitle } from "@/functions";
import { useTheme } from "@/hooks";
import { IVideoMessage } from '@/types';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

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
  }
});

const emit = defineEmits(['action','reply']);

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
  showMenu: baseShowMenu,
  hideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)

// linkified текст формируется в useMessageLinks

// обработчик открытия ссылок предоставлен useMessageLinks

// расширяем showMenu чтобы дополнительно показывать кнопку скачивания
const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

const playAgain = () => {
  if (previewPlayer.value) {
    previewPlayer.value.currentTime = 0;
    previewPlayer.value.play();
  }
};


watch([player, previewPlayer], ([playerVal, previewVal]) => {
  if (playerVal) {
    if (previewVal) {
      previewVal.pause();
      previewVal.currentTime = 0;
    }
  } else if (previewVal) {
    previewVal.play();
    previewVal.currentTime = 0;
  }
});

const videoBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) return '8px 8px 0 0'
  if (props.message.reply) return '0 0 8px 8px'
  return '8px'
})

const closeModal = () => isOpenModal.value = false

</script>

<style scoped lang="scss">
@use './styles/VideoMessage.scss';
</style>
