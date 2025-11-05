<template>
  <div
    class="sticker-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar && isFirstInSeries"
      class="sticker-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="sticker-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="sticker-message__content"
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
        class="sticker-message__preview-button"
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
      >
        <!-- TGS анимированные стикеры -->
        <tgs-player
          v-if="isTgsFile"
          class="sticker-message__preview-image-animated"
          :src="message.url"
          autoplay
          loop
          mode="normal"
        />
        <!-- WebP и другие статические стикеры -->
        <img
          v-else
          class="sticker-message__preview-image"
          :src="message.url"
          :alt="message.alt"
        >

        <transition name="modal-fade">
          <div
            v-if="buttonDownloadVisible"
            class="sticker-message__info-container"
          >
            <div
              v-if="message.views"
              class="sticker-message__views"
              @click.stop="viewsAction"
            >
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>

            <span class="sticker-message__time">{{ message.time }}</span>

            <Tooltip
              v-if="getClass(message) === 'sticker-message__right' && statuses.includes(message.status)"
              :text="statusTitle"
              position="bottom-left"
            >
              <div
                class="sticker-message__status"
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
            class="sticker-message__download-button"
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
          class="sticker-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>


      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="sticker-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <div
        v-if="message.text"
        class="sticker-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedHtml"
        />
      </div>

      <LinkPreview
        v-if="message.linkPreview"
        class="sticker-message__link-preview"
        :class="message.position"
        :link-preview="message.linkPreview"
      />

      <EmbedPreview
        v-if="message.embed"
        :class="message.position"
        :embed="message.embed"
      />
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <ModalFullscreen
          v-if="isOpenModal"
          :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          @close="closeModal"
        >
          <!-- TGS анимированные стикеры -->
          <tgs-player
            v-if="isTgsFile"
            class="sticker-message__modal-image-animated"
            :src="message.url"
            autoplay
            loop
            mode="normal"
          />
          <!-- WebP и другие статические стикеры -->
          <img
            v-else
            class="sticker-message__modal-image"
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

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, ModalFullscreen, Tooltip } from '@/components';
import { useMessageLinks, useMessageActions } from '@/hooks/messages';
import { getStatus, statuses, getMessageClass, getStatusTitle } from "@/functions";
import { useTheme } from "@/hooks";
import { IStickerMessage } from '@/types';

import '@/utils/suppress-lit-warning';
import './libs/tgs-player/lottie-player.esm.js';
import './libs/tgs-player/tgs-player.esm.js';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  message: {
    type: Object as () => IStickerMessage,
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

const showMenu = () => {
  baseShowMenu()
  buttonDownloadVisible.value = true
}

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

// Определяем, является ли файл TGS форматом (определяется только по URL)
const isTgsFile = computed(() => {
  const url = props.message.url;
  if (!url) return false;
  
  const urlString = String(url);
  const urlLower = urlString.toLowerCase();
  
  // Проверка по расширению в URL (работает даже после обработки Vite с хешами)
  if (urlLower.includes('.tgs') || urlLower.includes('animatedsticker')) {
    return true;
  }
  
  return false;
});

function getClass(message: IStickerMessage) {
  return getMessageClass(message.position, 'sticker-message')
}

const closeModal = () => isOpenModal.value = false
</script>

<style scoped lang="scss">
@use './styles/StickerMessage.scss';
</style>

