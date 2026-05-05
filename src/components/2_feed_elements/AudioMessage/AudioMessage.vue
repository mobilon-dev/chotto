<template>
  <div
    class="audio-message"
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
      <Tooltip
        :text="channelInfo"
        :position="message.position === 'left' ? 'right' : 'left'"
        :offset="8"
      >
        {{ message.subText }}
      </Tooltip>
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
          :src="lazyAudioSrc"
          type="audio/webm"
          @loadedmetadata="handleLoadedMetadata"
          @timeupdate="handleTimeUpdate"
          @ended="handleEnded"
          @error="handleAudioError"
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
            @touchstart.passive="isSeeking = true"
            @touchend.passive="handleSeekEnd"
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

      <!-- transcript/summary shown via expandable panel (buttons below) -->
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
          v-if="hasTextOption || hasSummaryOption"
          class="audio-message__actions"
        >
          <button
            v-if="hasTextOption"
            :class="[
              'audio-message__action-button',
              { 'audio-message__action-button--active': expandedPanel === 'text' }
            ]"
            type="button"
            @click="handleText"
          >
            Текст
          </button>
          <button
            v-if="hasSummaryOption"
            :class="[
              'audio-message__action-button',
              { 'audio-message__action-button--active': expandedPanel === 'summary' }
            ]"
            type="button"
            @click="handleSummary"
          >
            Резюме
          </button>
        </div>

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

      <transition name="audio-message-expand">
        <div
          v-if="isExpandedPanelVisible"
          class="audio-message__expand-panel"
        >
          <div class="audio-message__expand-inner">
            <template v-if="expandedPanel === 'text'">
              <p
                v-if="!isTranscriptReady"
                class="audio-message__expand-placeholder"
              >
                {{ transcriptPlaceholderText }}
              </p>

              <p
                v-else
                class="audio-message__expand-plain"
                v-html="transcriptHtml"
              />
            </template>

            <p
              v-else
              class="audio-message__expand-plain"
            >
              <span
                v-if="!isSummaryReady"
                class="audio-message__expand-placeholder"
              >
                {{ summaryPlaceholderText }}
              </span>
              <template v-else>
                <span v-html="summaryHtml" />
              </template>
            </p>
          </div>

          <div class="audio-message__expand-close-wrap">
            <button
              type="button"
              class="audio-message__expand-close"
              @click="expandedPanel = null"
            >
              Закрыть
            </button>
          </div>
        </div>
      </transition>

      <MessageSmsInvite
        :status="message.status"
        :has-messenger-account="message.hasMessengerAccount"
        :channel="channel"
        @sms-invite="handleSmsInvite"
      />

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
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, computed, watch, nextTick } from 'vue'

import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue';
import LinkPreview from '@/components/1_atoms/LinkPreview/LinkPreview.vue';
import EmbedPreview from '@/components/1_atoms/EmbedPreview/EmbedPreview.vue';
import BaseReplyMessage from '@/components/2_feed_elements/BaseReplyMessage/BaseReplyMessage.vue';
import MessageReactions from '@/components/2_feed_elements/MessageReactions/MessageReactions.vue';
import MessageStatusIndicator from '@/components/2_feed_elements/MessageStatusIndicator/MessageStatusIndicator.vue';
import MessageSmsInvite from '@/components/2_feed_elements/MessageSmsInvite/MessageSmsInvite.vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageActions, useMessageLinks, useChannelAccentColor, useSubtextTooltip } from '@/hooks/messages';
import { getStatus, getMessageClass, getStatusTitle, createReactionHandlers } from '@/functions';
import type { IAudioMessage, IAudioRecognitionPayload, IAudioSummaryPayload } from '@/types';

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

const emit = defineEmits(['action','reply','sms-invite']);

const player = ref<HTMLAudioElement | null>(null)
const lazyAudioSrc = ref<string | undefined>(undefined)
const isPlaying = ref(false)
const audioDuration = ref(0)
const currentTime = ref(0)
const isSeeking = ref(false)

const audioSrc = computed(() => {
  const m = props.message as unknown as IAudioMessage & { data?: { url?: string } }
  return m.url || (typeof m.meta?.url === 'string' ? m.meta.url : undefined) || m.data?.url
})

const parseMessageDurationToSeconds = (value?: string | number): number | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0) return undefined
    return Math.floor(value)
  }
  const trimmed = String(value).trim()
  if (!trimmed) return undefined
  if (/^\d+$/.test(trimmed)) {
    const n = Number(trimmed)
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined
  }
  const hms = trimmed.match(/^(\d+):([0-5]\d):([0-5]\d)$/)
  if (hms) {
    const h = Number(hms[1])
    const m = Number(hms[2])
    const s = Number(hms[3])
    return h * 3600 + m * 60 + s
  }
  const ms = trimmed.match(/^(\d+):([0-5]\d)$/)
  if (ms) return Number(ms[1]) * 60 + Number(ms[2])
  return undefined
}

const resetAudioState = () => {
  isPlaying.value = false
  currentTime.value = 0
  audioDuration.value = parseMessageDurationToSeconds(props.message.duration) ?? 0
  isSeeking.value = false
}

resetAudioState()

watch(
  () => audioSrc.value,
  (newUrl, oldUrl) => {
    if (newUrl !== oldUrl) {
      resetAudioState()
      lazyAudioSrc.value = undefined
      if (player.value) {
        player.value.pause()
        player.value.currentTime = 0
        player.value.removeAttribute('src')
        player.value.load()
      }
    }
  }
)

watch(
  () => props.message.duration,
  () => {
    if (lazyAudioSrc.value === undefined) {
      audioDuration.value = parseMessageDurationToSeconds(props.message.duration) ?? 0
    }
  }
)

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu,
  hideMenu,
  clickAction,
  viewsAction,
  handleClickReplied
} = useMessageActions(props.message, emit)

const expandedPanel = ref<null | 'text' | 'summary'>(null)
const requestedOnDemand = ref<{ text: boolean; summary: boolean }>({ text: false, summary: false })
const recognitionReadyStatus = 'RECOGNITION_READY'
const summaryReadyStatus = 'SUMMARY_READY'

const transcriptData = computed<IAudioRecognitionPayload | null>(() => {
  const m = props.message as IAudioMessage
  const raw = m.transcript ?? (m.meta?.transcript as IAudioRecognitionPayload | undefined)
  if (!raw || typeof raw !== 'object') return null
  return raw
})

const summaryData = computed<IAudioSummaryPayload | null>(() => {
  const m = props.message as IAudioMessage
  const raw = m.summary ?? (m.meta?.summary as IAudioSummaryPayload | undefined)
  if (!raw || typeof raw !== 'object') return null
  return raw
})

const transcriptHtml = computed(() => {
  const html = transcriptData.value?.html
  if (typeof html !== 'string') return ''
  return html.trim()
})

const isTranscriptReady = computed(() => {
  return transcriptData.value?.status === recognitionReadyStatus && transcriptHtml.value.length > 0
})

const summaryHtml = computed(() => {
  const html = summaryData.value?.html
  if (typeof html !== 'string') return ''
  return html.trim()
})

const isSummaryReady = computed(() => {
  return summaryData.value?.status === summaryReadyStatus && summaryHtml.value.length > 0
})

const hasTextOption = computed(() => {
  return Boolean(transcriptData.value?.status)
})

const hasSummaryOption = computed(() => {
  return Boolean(summaryData.value?.status)
})

const isExpandedPanelVisible = computed(() => {
  if (expandedPanel.value === 'text') return hasTextOption.value
  if (expandedPanel.value === 'summary') return hasSummaryOption.value
  return false
})

const transcriptPlaceholderText = computed(() => {
  switch (transcriptData.value?.status) {
    case 'RECOGNITION_PLANNED':
      return 'Распознаем сообщение, пожалуйста подождите...'
    case 'RECOGNITION_ERROR':
      return 'Не удалось распознать сообщение'
    case 'RECOGNITION_NOT_CONFIGURED':
      return 'Опция распознавания не включена'
    default:
      return 'Текст сообщения недоступен'
  }
})

const summaryPlaceholderText = computed(() => {
  switch (summaryData.value?.status) {
    case 'SUMMARY_PLANNED':
      return 'Формируем резюме, пожалуйста подождите...'
    case 'SUMMARY_ERROR':
      return 'Не удалось сформировать резюме'
    case 'SUMMARY_NOT_CONFIGURED':
      return 'Опция формирования резюме не включена'
    default:
      return 'Резюме недоступно'
  }
})

// Функция для скачивания аудио
const downloadAudio = async () => {
  const src = audioSrc.value
  if (!src) return

  try {
    const response = await fetch(src, {
      headers: {
        Accept: 'audio/*'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    const blob = await response.blob()

    const urlExtension = src.split('.').pop()?.split('?')[0]?.toLowerCase() || ''

    const mimeToExt: Record<string, string> = {
      'audio/mpeg': 'mp3',
      'audio/mp3': 'mp3',
      'audio/wav': 'wav',
      'audio/x-wav': 'wav',
      'audio/ogg': 'ogg',
      'audio/webm': 'webm',
      'audio/aac': 'aac',
      'audio/flac': 'flac',
      'audio/m4a': 'm4a',
      'audio/x-m4a': 'm4a',
      'application/octet-stream': urlExtension || 'mp3'
    }

    const knownExtensions = ['mp3', 'wav', 'ogg', 'webm', 'aac', 'flac', 'm4a']

    const extension = urlExtension && knownExtensions.includes(urlExtension)
      ? urlExtension
      : (mimeToExt[contentType] || 'mp3')

    const urlSegments = src.split('/')
    const rawFilename = decodeURIComponent(urlSegments[urlSegments.length - 1]?.split('?')[0] || '')

    const filename = rawFilename
      ? (rawFilename.includes('.') ? rawFilename : `${rawFilename}.${extension}`)
      : `audio-${props.message.messageId}.${extension}`

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка при скачивании аудио:', error)
    if (src) window.open(src, '_blank')
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

const { bubbleStyle: rightBubbleStyle } = useChannelAccentColor(
  computed(() => props.message),
  { cssVariable: '--chotto-audiomessage-right-background-color', position: 'right' }
)

const togglePlayPause = async () => {
  const src = audioSrc.value
  if (!player.value || !src) return

  if (isPlaying.value) {
    player.value.pause()
    isPlaying.value = false
  } else {
    try {
      if (!lazyAudioSrc.value) {
        lazyAudioSrc.value = src
        await nextTick()
        player.value.load()
      }
      await player.value.play()
      isPlaying.value = true
    } catch (error) {
      console.error('Не удалось воспроизвести аудио', error)
      isPlaying.value = false
    }
  }
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const formatCurrentTime = computed(() => formatTime(currentTime.value))

watch(
  () => currentTime.value,
  () => {
    if (player.value && isSeeking.value) {
      if (player.value.duration != Infinity && !Number.isNaN(player.value.duration))
        player.value.currentTime = currentTime.value;

      if (Math.abs(currentTime.value - audioDuration.value) < 0.1)
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

const formatDuration = computed(() => formatTime(audioDuration.value))

const handleLoadedMetadata = () => {
  if (!player.value) return

  const el = player.value
  currentTime.value = el.currentTime || 0

  if (el.duration === Infinity || Number.isNaN(el.duration)) {
    el.currentTime = 1e101
    const fixDuration = () => {
      if (!player.value) return
      audioDuration.value = player.value.duration || 0
      currentTime.value = 0
      player.value.currentTime = 0
    }
    el.addEventListener('timeupdate', fixDuration, { once: true })
  } else {
    audioDuration.value = el.duration || 0
  }

  el.playbackRate = currentSpeed.value.speed
}

const handleTimeUpdate = () => {
  if (!player.value) return
  if (!isSeeking.value) {
    currentTime.value = player.value.currentTime
  }
  if (player.value.ended && isPlaying.value) {
    isPlaying.value = false
  }
}

const handleEnded = () => {
  isPlaying.value = false
}

const handleAudioError = () => {
  console.error('Не удалось загрузить аудио')
  isPlaying.value = false
  lazyAudioSrc.value = undefined
  if (player.value) {
    player.value.pause()
    player.value.currentTime = 0
    player.value.removeAttribute('src')
    player.value.load()
  }
  audioDuration.value = parseMessageDurationToSeconds(props.message.duration) ?? 0
}

function getClass(message: IAudioMessage) {
  return getMessageClass(message.position, 'audio-message')
}

const { onToggleReaction, onAddReaction, onRemoveReaction } = createReactionHandlers(emit)

const channelInfo = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function handleSmsInvite() {
  emit('sms-invite', props.message)
}

const handleText = () => {
  if (!hasTextOption.value) return
  const next = expandedPanel.value === 'text' ? null : 'text'
  expandedPanel.value = next
  if (next === 'text' && !isTranscriptReady.value && !requestedOnDemand.value.text) {
    requestedOnDemand.value.text = true
    emit('action', { action: 'fetchTranscript', messageId: props.message.messageId })
  }
}

const handleSummary = () => {
  if (!hasSummaryOption.value) return
  const next = expandedPanel.value === 'summary' ? null : 'summary'
  expandedPanel.value = next
  if (next === 'summary' && !isSummaryReady.value && !requestedOnDemand.value.summary) {
    requestedOnDemand.value.summary = true
    emit('action', { action: 'fetchSummary', messageId: props.message.messageId })
  }
}
</script>

<style scoped lang="scss">
@use './styles/AudioMessage.scss';
</style>
