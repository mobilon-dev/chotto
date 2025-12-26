<template>
  <div
    class="sticker-message"
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
          v-if="isTgsFile && tgsLibsLoaded"
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

            <MessageStatusIndicator
              base-class="sticker-message"
              :message-class="getClass(message)"
              :message-status="message.status"
              :status-class="status"
              :status-title="statusTitle"
            />
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

      <MessageSmsInvite
        :status="message.status"
        :has-messenger-account="message.hasMessengerAccount"
        :channel="channel"
        @sms-invite="handleSmsInvite"
      />

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
          <!-- TGS анимированные стикеры -->
          <tgs-player
            v-if="isTgsFile && tgsLibsLoaded"
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
import { ref, computed, inject, watch, onMounted } from 'vue';

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import { useMessageLinks, useMessageActions, useChannelAccentColor } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from "@/functions";
import { useTheme } from "@/hooks";
import { IStickerMessage } from '@/types';
import { isAnimatedSticker } from './utils/stickerUtils';
import './utils/suppress-lit-warning';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

// Оптимизация: динамическая загрузка библиотек TGS только при необходимости
// Библиотеки tgs-player и lottie-player весят ~700KB, поэтому загружаем их только
// когда в сообщении действительно есть TGS стикер (isTgsFile === true)
// Это позволяет значительно уменьшить размер основного бандла приложения
const tgsLibsLoaded = ref(false);
const tgsLibsLoading = ref(false);

// Динамическая загрузка библиотек TGS только при необходимости
async function loadTgsLibs() {
  if (tgsLibsLoaded.value || tgsLibsLoading.value) return;
  
  tgsLibsLoading.value = true;
  try {
    await import('./libs/tgs-player/lottie-player.esm.js');
    await import('./libs/tgs-player/tgs-player.esm.js');
    tgsLibsLoaded.value = true;
  } catch (error) {
    console.error('Failed to load TGS libraries:', error);
  } finally {
    tgsLibsLoading.value = false;
  }
}

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
  },
  reactionsEnabled: {
    type: Boolean,
    default: true
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

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-stickermessage-right-bg', position: 'right' }
)

// Определяем, является ли файл TGS форматом
// Используем утилиту для единообразной проверки во всех компонентах
const isTgsFile = computed(() => {
  return isAnimatedSticker(props.message.url, props.message.isAnimated);
});

// Загружаем библиотеки TGS при необходимости
watch(isTgsFile, (needsTgs) => {
  if (needsTgs && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
}, { immediate: true });

onMounted(() => {
  if (isTgsFile.value && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
});

function getClass(message: IStickerMessage) {
  return getMessageClass(message.position, 'sticker-message')
}

const closeModal = () => isOpenModal.value = false

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}
</script>

<style scoped lang="scss">
@use './styles/StickerMessage.scss';
</style>

