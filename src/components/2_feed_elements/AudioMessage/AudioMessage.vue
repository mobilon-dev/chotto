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
          <div class="audio-message__play-icon">  
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.99 12.9934L3.0825 22.2234C1.7325 23.0059 0 22.0584 0 20.4809V2.02087C0 0.44587 1.73 -0.50413 3.0825 0.28087L18.99 9.51087C19.2971 9.68618 19.5524 9.93959 19.7299 10.2454C19.9075 10.5512 20.001 10.8985 20.001 11.2521C20.001 11.6057 19.9075 11.953 19.7299 12.2589C19.5524 12.5647 19.2971 12.8181 18.99 12.9934Z"
                fill="#5F5F5F"
              />
            </svg>
          </div>
        </button>
        <button
          v-show="isPlaying"
          class="audio-message__pause"
          @click="togglePlayPause"
        >
          <div class="audio-message__pause-icon">
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 0C4.74456 0 5.69839 0.395088 6.40165 1.09835C7.10491 1.80161 7.5 2.75544 7.5 3.75V18.75C7.5 19.7446 7.10491 20.6984 6.40165 21.4017C5.69839 22.1049 4.74456 22.5 3.75 22.5C2.75544 22.5 1.80161 22.1049 1.09835 21.4017C0.395088 20.6984 2.09588e-08 19.7446 0 18.75V3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0ZM16.25 0C17.2446 0 18.1984 0.395088 18.9017 1.09835C19.6049 1.80161 20 2.75544 20 3.75V18.75C20 19.7446 19.6049 20.6984 18.9017 21.4017C18.1984 22.1049 17.2446 22.5 16.25 22.5C15.2554 22.5 14.3016 22.1049 13.5983 21.4017C12.8951 20.6984 12.5 19.7446 12.5 18.75V3.75C12.5 2.75544 12.8951 1.80161 13.5983 1.09835C14.3016 0.395088 15.2554 0 16.25 0Z"
                fill="#5F5F5F"
              />
            </svg>
          </div>
        </button>
        <div class="audio-message__progress-wrapper">
          <input 
            v-model="currentTime"
            class="audio-message__progress-bar-container" 
            type="range" 
            :min="0" 
            :max="audioDuration" 
            step="0.1"
            @mousedown="isSeeking = true"
            @mouseup="handleSeekEnd"
            @touchstart="isSeeking = true"
            @touchend="handleSeekEnd"
          >
          <div class="audio-message__speed-btn-container">
            <button
              type="button"
              class="audio-message__speed-btn"
              @click="cycleSpeed"
            >
              {{ currentSpeed.text }}
            </button>
          </div>
        </div>
        <div class="audio-message__player-controls">
          <p class="audio-message__current-time">
            {{ formatCurrentTime }}
          </p>
          <p class="audio-message__duration">
            {{ formatDuration }}
          </p>
        </div>
        
        <!-- <a
          class="audio-message__download-button"
          :href="message.url"
          download
          target="_blank"
          @click.stop="() => '//Предотвращаем всплытие события клика'"
        >
          <span class="pi pi-download" />
        </a> -->
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

      <MessageReactions
        :reactions="message.reactions"
        :message-id="message.messageId"
        :enabled="reactionsEnabled"
        @toggle-reaction="onToggleReaction"
        @add-reaction="onAddReaction"
        @remove-reaction="onRemoveReaction"
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
        <MessageStatusIndicator
          base-class="audio-message"
          :message-class="getClass(message)"
          :message-status="message.status"
          :status-class="status"
          :status-title="statusTitle"
        />
      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="audio-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <svg
          width="4"
          height="17"
          viewBox="0 0 4 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 14.375C3.75 14.8723 3.55246 15.3492 3.20083 15.7008C2.84919 16.0525 2.37228 16.25 1.875 16.25C1.37772 16.25 0.900805 16.0525 0.549175 15.7008C0.197544 15.3492 0 14.8723 0 14.375C0 13.8777 0.197544 13.4008 0.549175 13.0492C0.900805 12.6975 1.37772 12.5 1.875 12.5C2.37228 12.5 2.84919 12.6975 3.20083 13.0492C3.55246 13.4008 3.75 13.8777 3.75 14.375ZM3.75 8.125C3.75 8.62228 3.55246 9.09919 3.20083 9.45083C2.84919 9.80246 2.37228 10 1.875 10C1.37772 10 0.900805 9.80246 0.549175 9.45083C0.197544 9.09919 0 8.62228 0 8.125C0 7.62772 0.197544 7.15081 0.549175 6.79917C0.900805 6.44754 1.37772 6.25 1.875 6.25C2.37228 6.25 2.84919 6.44754 3.20083 6.79917C3.55246 7.15081 3.75 7.62772 3.75 8.125ZM3.75 1.875C3.75 2.37228 3.55246 2.84919 3.20083 3.20083C2.84919 3.55246 2.37228 3.75 1.875 3.75C1.37772 3.75 0.900805 3.55246 0.549175 3.20083C0.197544 2.84919 0 2.37228 0 1.875C0 1.37772 0.197544 0.900806 0.549175 0.549175C0.900805 0.197544 1.37772 0 1.875 0C2.37228 0 2.84919 0.197544 3.20083 0.549175C3.55246 0.900806 3.75 1.37772 3.75 1.875Z"
            fill="#5F5F5F"
          />
        </svg>
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="audio-message__context-menu"
          :actions="message.actions"
          @click="handleActionClick"
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

import { ContextMenu, LinkPreview, EmbedPreview, BaseReplyMessage, MessageReactions, MessageStatusIndicator } from '@/components';
import { useMessageActions, useMessageLinks } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from '@/functions';
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
  },
  reactionsEnabled: {
    type: Boolean,
    default: true
  }
});

const speed = ref([
  {
    text: '1.0x',
    speed: 1,
  },
  {
    text: '1.25x',
    speed: 1.25,
  },
  {
    text: '1.5x',
    speed: 1.5,
  },
  {
    text: '2.0x',
    speed: 2,
  },
]) 

const speedIndex = ref(0)

const currentSpeed = computed(() => speed.value[speedIndex.value] ?? speed.value[0])

const cycleSpeed = () => {
  speedIndex.value = (speedIndex.value + 1) % speed.value.length
  if (player.value) {
    player.value.playbackRate = currentSpeed.value.speed
  }
}

const emit = defineEmits(['action','reply']);

const player = ref<HTMLAudioElement | null>();
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0);
const isSeeking = ref(false); // Флаг для предотвращения циклических обновлений

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

// Функция для скачивания аудио
const downloadAudio = () => {
  if (props.message.url) {
    const link = document.createElement('a')
    link.href = props.message.url
    // Используем messageId для имени файла или дефолтное имя
    link.download = `audio-${props.message.messageId}`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Обработчик клика по действию из меню
const handleActionClick = (action: Record<string, unknown>) => {
  // Если действие - скачивание, выполняем его локально
  if (action.action === 'download') {
    downloadAudio()
    hideMenu()
  } else {
    // Для остальных действий используем стандартный обработчик
    clickAction(action)
  }
}

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
    if (player.value && isSeeking.value) {
      if (player.value.duration != Infinity && !Number.isNaN(player.value.duration))
        player.value.currentTime = currentTime.value;

      if (currentTime.value == audioDuration.value)
        isPlaying.value = false
    }
  }
)

const handleSeekEnd = () => {
  if (player.value && isSeeking.value) {
    // Устанавливаем финальное время при завершении перетаскивания
    if (player.value.duration != Infinity && !Number.isNaN(player.value.duration))
      player.value.currentTime = currentTime.value;
  }
  isSeeking.value = false;
}

const formatDuration = computed(() => {
  if (player.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00';
});

function getClass(message: IAudioMessage) {
  return getMessageClass(message.position, 'audio-message')
}

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

onMounted(() => {
  if (player.value != null) {
    player.value.playbackRate = currentSpeed.value.speed;
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
      // Обновляем currentTime только если пользователь не перетаскивает слайдер
      if (!isSeeking.value && player.value != null) {
        currentTime.value = player.value.currentTime;
      }
    });
  }
});
</script>

<style scoped lang="scss">
@use './styles/AudioMessage.scss';
</style>
