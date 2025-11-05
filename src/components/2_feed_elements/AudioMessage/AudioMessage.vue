<template>
  <div
    class="audio-message"
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar && isFirstInSeries"
      class="audio-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText && isFirstInSeries"
      class="audio-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="audio-message__content"
      :class="{ 'is-first': isFirstInSeries, 'with-avatar-indent': !isFirstInSeries && message.avatar }"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        style="grid-column: 1/3;"
        :message="message.reply"
        :class="message.position"
        @reply="handleClickReplied"
      />
      <div class="audio-message__audio-container">
        <audio
          ref="player"
          :src="message.url"
          type="audio/webm"
        />
        <button
          v-show="!isPlaying"
          class="audio-message__play"
          @click="togglePlayPause"
        >
          <span class="pi pi-play" />
        </button>
        <button
          v-show="isPlaying"
          class="audio-message__pause"
          @click="togglePlayPause"
        >
          <span class="pi pi-pause" />
        </button>
        <input 
          v-model="currentTime"
          class="audio-message__progress-bar-container" 
          type="range" 
          :min="0" 
          :max="audioDuration" 
          step="0.1"
        >
        <div class="audio-message__player-controls">
          <p class="audio-message__remaining-time">
            {{ `${formatCurrentTime} / ${formatDuration}` }}
          </p>
          <div class="audio-message__speed-btn-container">
            <p
              v-for="(s, index) in speed"
              :key="s.text"
              class="audio-message__speed-btn"
              :class="{'audio-message__speed-btn-selected' : s.selected}"
              @click="setPlayerSpeed(index)"
            >
              {{ s.text }}
            </p>
          </div>
        </div>
        
        <a
          class="audio-message__download-button"
          :href="message.url"
          download
          target="_blank"
          @click.stop="() => '//Предотвращаем всплытие события клика'"
        >
          <span class="pi pi-download" />
        </a>
      </div>

      <div
        v-if="message.transcript?.text"
        class="audio-message__transcript-container"
      >
        <p @click="isFullTranscript = !isFullTranscript">
          {{ message.transcript.text }}
        </p>
      </div>
      <div
        v-if="message.text"
        class="audio-message__text-container"
      >
        <p
          @click="inNewWindow"
          v-html="linkedHtml"
        />
      </div>

      <LinkPreview
        v-if="message.linkPreview"
        class="audio-message__link-preview"
        :class="message.position"
        :link-preview="message.linkPreview"
      />

      <EmbedPreview
        v-if="message.embed"
        :class="message.position"
        :embed="message.embed"
      />

      <div class="audio-message__info-container">
        <div
          v-if="message.views"
          class="audio-message__views"
          @click="viewsAction"
        >
          <span class="pi pi-eye" />
          <p>{{ message.views }}</p>
        </div>

        <span class="audio-message__time">{{ message.time }}</span>
        <Tooltip
          v-if="getClass(message) === 'audio-message__right' && statuses.includes(message.status)"
          :text="statusTitle"
          position="bottom-left"
        >
          <div
            class="audio-message__status"
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
        class="audio-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="audio-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <Teleport to="body">
        <transition name="modal-fade">
          <div
            v-if="isFullTranscript"
            class="audio-message__modal-overlay"
            :data-theme="getTheme().theme ? getTheme().theme : null"
          >
            <div class="audio-message__modal">
              <button
                class="audio-message__modal-close-button"
                @click="isFullTranscript = false"
              >
                <span>
                  <i class="pi pi-times" />
                </span>
              </button>
              <p
                style="
                word-wrap: break-word;
                max-width: 25rem;"
              >
                {{ message.transcript?.text }}
              </p>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted, computed, watch, inject } from 'vue'

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, Tooltip } from '@/components';
import { useMessageActions, useMessageLinks } from '@/hooks/messages';
import { getStatus, statuses, getMessageClass, getStatusTitle } from '@/functions';
import { useTheme } from '@/hooks';
import { IAudioMessage } from '@/types';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

// Define props
const props = defineProps({
  message: {
    type: Object as () => IAudioMessage,
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

const speed = ref([
  {
    text: '1.0x',
    speed: 1,
    selected: true,
  },
  {
    text: '1.2x',
    speed: 1.2,
    selected: false,
  },
  {
    text: '1.5x',
    speed: 1.5,
    selected: false,
  },
  {
    text: '2.0x',
    speed: 2,
    selected: false,
  },
]) 

const setPlayerSpeed = (index: number) => {
  
  for(let s of speed.value){
    s.selected = false
  }
  speed.value[index].selected = true
  if (player.value) player.value.playbackRate = speed.value[index].speed
}

const emit = defineEmits(['action','reply']);

const player = ref<HTMLAudioElement | null>();
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0)

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu,
  hideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)

const isFullTranscript = ref(false)

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

// reply handled by composable

// обработчик открытия ссылок предоставлен useMessageLinks

// menu handled by composable

// actions handled by composable

const status = computed(() => getStatus(props.message.status))
const statusTitle = computed(() => getStatusTitle(props.message.status, props.message.statusMsg))

function togglePlayPause() {
  if (player.value) {
    if (isPlaying.value) {
      player.value.pause();
    } else {
      player.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const formatCurrentTime = computed(() => {
  if (player.value) {
    return formatTime(currentTime.value)
  }
  return '0:00';
});

watch(
  () => currentTime.value,
  () => {
    if (player.value) {
      if (player.value.duration != Infinity && !Number.isNaN(player.value.duration))
        player.value.currentTime = currentTime.value;

      if (currentTime.value == audioDuration.value)
        isPlaying.value = false
    }
  }
)

const formatDuration = computed(() => {
  if (player.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00';
});

function getClass(message: IAudioMessage) {
  return getMessageClass(message.position, 'audio-message')
}

onMounted(() => {
  if (player.value != null) {
    player.value.addEventListener('loadedmetadata', () => {
      if (player.value != null) {
        if (player.value.duration == Infinity || Number.isNaN(player.value.duration)){
          player.value.currentTime = 1e101;
          player.value.addEventListener("timeupdate", () => {
            if (player.value){
              player.value.currentTime = 0;
              audioDuration.value = player.value.duration
            }
          }, { once: true });
        }
      }
      audioDuration.value = player.value != null ? player.value.duration : 0;
    });
    player.value.addEventListener('timeupdate', () => {
      currentTime.value = player.value != null ? player.value.currentTime : 0;
    });
  }
});
</script>

<style scoped lang="scss">
@use './styles/AudioMessage.scss';
</style>
