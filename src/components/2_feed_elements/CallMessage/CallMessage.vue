<template>
  <div
    :class="[
      getClass(message, elementType.message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="call-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <!-- <p
      v-if="message.subText"
      class="call-message__subtext"
    >
      {{ message.subText }}
    </p> -->

    <div 
      class="call-message__content"
    >
      <div class="call-message__header-container">
        <div class="call-message__title-wrapper">
          <IncomingCallIcon
            v-if="message.direction === 'incoming' || !message.direction"
            class="call-message__direction-icon"
            :color="callIconColor"
          />
          <OutgoingCallIcon
            v-else
            class="call-message__direction-icon"
            :color="callIconColor"
          />
          <Tooltip
            v-if="channelTitle"
            :text="channelTitle"
            position="top"
            :offset="8"
          >
            <span
              v-if="!message.isMissedCall"
              class="call-message__title"
            >
              {{ callDirectionTitle }} звонок <span class="call-message__call-participant">{{ callDirectionPreposition }} {{ message.callParticipant }}</span>
            </span>
            <span
              v-else
              class="call-message__title call-message__title--missed"
            >
              {{ callDirectionTitle }}
              <template v-if="message.direction !== 'incoming'">
                звонок <span class="call-message__call-participant">{{ callDirectionPreposition }} {{ message.callParticipant }}</span>
              </template>
              <template v-else>
                звонок
              </template>
            </span>
          </Tooltip>
          <template v-else>
            <span
              v-if="!message.isMissedCall"
              class="call-message__title"
            >
              {{ callDirectionTitle }} звонок <span class="call-message__call-participant">{{ callDirectionPreposition }} {{ message.callParticipant }}</span>
            </span>
            <span
              v-else
              class="call-message__title call-message__title--missed"
            >
              {{ callDirectionTitle }}
              <template v-if="message.direction !== 'incoming'">
                звонок <span class="call-message__call-participant">{{ callDirectionPreposition }} {{ message.callParticipant }}</span>
              </template>
              <template v-else>
                звонок
              </template>
            </span>
          </template>
        </div>

        <p
          v-if="message.isMissedCall"
          class="call-message__missed-info"
        >
          {{ missedCallLabel }}: {{ message.callAttemptDuration }}
        </p>

        <div
          v-if="message.url && !message.isMissedCall"
          class="call-message__audio-wrapper"
        >
          <audio
            ref="player"
            :src="message.url"
            type="audio/webm"
            @loadedmetadata="handleLoadedMetadata"
            @timeupdate="handleTimeUpdate"
            @ended="handleEnded"
          />
          <button
            v-show="!isPlaying"
            class="call-message__audio-play"
            type="button"
            @click="togglePlayPause"
          >
            <div class="call-message__audio-play-icon">
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
            class="call-message__audio-pause"
            type="button"
            @click="togglePlayPause"
          >
            <div class="call-message__audio-pause-icon">
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 0C4.74456 0 5.69839 0.395088 6.40165 1.09835C7.10491 1.80161 7.5 2.75544 7.5 3.75V18.75C7.5 19.7446 7.10491 20.6984 6.40165 21.4017C5.69839 22.1049 4.74456 22.5 3.75 22.5C2.75544 22.5 1.80161 22.1049 1.09835 21.4017C0.395088 20.6984 0 19.7446 0 18.75V3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0ZM16.25 0C17.2446 0 18.1984 0.395088 18.9017 1.09835C19.6049 1.80161 20 2.75544 20 3.75V18.75C20 19.7446 19.6049 20.6984 18.9017 21.4017C18.1984 22.1049 17.2446 22.5 16.25 22.5C15.2554 22.5 14.3016 22.1049 13.5983 21.4017C12.8951 20.6984 12.5 19.7446 12.5 18.75V3.75C12.5 2.75544 12.8951 1.80161 13.5983 1.09835C14.3016 0.395088 15.2554 0 16.25 0Z"
                  fill="#5F5F5F"
                />
              </svg>
            </div>
          </button>

          <div class="call-message__audio-progress">
            <div class="call-message__audio-progress-bar">
              <input
                v-model="currentTime"
                class="call-message__audio-slider"
                type="range"
                :min="0"
                :max="audioDuration"
                step="0.1"
                @mousedown="isSeeking = true"
                @mouseup="handleSeekEnd"
                @touchstart="isSeeking = true"
                @touchend="handleSeekEnd"
              >
              <button
                type="button"
                class="call-message__audio-speed-btn"
                @click="cycleSpeed"
              >
                {{ currentSpeed.text }}
              </button>
            </div>
            <div class="call-message__audio-time">
              <span>{{ formatCurrentTime }}</span>
              <span>{{ formatDuration }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="call-message__info-container">
        <button
          class="call-message__call-button"
          type="button"
          @click="handleCall"
        >
          Нажмите, чтобы перезвонить
        </button>
        <span class="call-message__time">{{ message.time }}</span>
      </div>

      <button
        v-if="message.transcript?.dialog"
        class="call-message__download-button"
        @click="isFullTranscript = !isFullTranscript"
      >
        <span class="pi pi-arrow-up-right" />
      </button>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="call-message__menu-button"
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
          class="call-message__context-menu"
          :actions="message.actions"
          @click="handleActionClick"
        />
      </transition>

      <Teleport to="body">
        <transition name="modal-fade">
          <div
            v-if="isFullTranscript"
            class="call-message__modal-overlay"
            :data-theme="getTheme().theme ? getTheme().theme : 'light'"
          >
            <div class="call-message__modal">
              <button
                class="call-message__modal-close-button"
                @click="isFullTranscript = false"
              >
                <span>
                  <i class="pi pi-times" />
                </span>
              </button>

              <div
                v-for="item in message.transcript?.dialog"
                :key="item.time"
                :class="getClass(item, elementType.textDialog)"
              >
                <p>{{ item.text }}</p>
                <span>{{ item.time }}</span>
              </div>
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
import { ref, inject, computed, watch, toRefs, unref, type Ref } from 'vue'
import { ICallMessage } from '@/types'
import { useTheme } from '@/hooks';
import { useMessageActions } from '@/hooks/messages';
import { ContextMenu, Tooltip } from '@/components';
import IncomingCallIcon from './icons/IncomingCallIcon.vue'
import OutgoingCallIcon from './icons/OutgoingCallIcon.vue'

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

// Получаем channels и selectedChat через inject (если доступны)
// inject может вернуть ref, поэтому используем computed для реактивности
const channelsInjected = inject<Ref<Array<{ channelId: string; title?: string }>> | Array<{ channelId: string; title?: string }> | undefined>('channels', undefined)
const selectedChatInjected = inject<Ref<{ dialogs?: Array<{ dialogId: string; channelId?: string }> }> | { dialogs?: Array<{ dialogId: string; channelId?: string }> } | undefined>('selectedChat', undefined)

const channels = computed(() => {
  if (!channelsInjected) return undefined
  // Если это ref, получаем его значение
  return unref(channelsInjected)
})

const selectedChat = computed(() => {
  if (!selectedChatInjected) return undefined
  // Если это ref, получаем его значение
  return unref(selectedChatInjected)
})

const emit = defineEmits(['action', 'reply'])

// Define props
const props = defineProps({
  message: {
    type: Object as () => ICallMessage,
    required: true,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  }
});

const { message, applyStyle } = toRefs(props)

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu,
  hideMenu,
  clickAction,
} = useMessageActions(props.message, emit)

const isFullTranscript = ref(false)

const player = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const audioDuration = ref(0)
const currentTime = ref(0)
const isSeeking = ref(false)
const speedIndex = ref(0)

const speedOptions = [
  {
    text: '1.0x',
    speed: 1
  },
  {
    text: '1.25x',
    speed: 1.25
  },
  {
    text: '1.5x',
    speed: 1.5
  },
  {
    text: '2.0x',
    speed: 2
  }
]

const currentSpeed = computed(() => speedOptions[speedIndex.value] ?? speedOptions[0])

const resetAudioState = () => {
  isPlaying.value = false
  currentTime.value = 0
  audioDuration.value = 0
  isSeeking.value = false
  speedIndex.value = 0
}

watch(
  () => message.value?.url,
  (newUrl, oldUrl) => {
    if (newUrl !== oldUrl) {
      resetAudioState()
      if (player.value) {
        player.value.pause()
        player.value.currentTime = 0
        player.value.load()
      }
    }
  }
)

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const formatCurrentTime = computed(() => formatTime(currentTime.value))
const formatDuration = computed(() => formatTime(audioDuration.value))

const togglePlayPause = async () => {
  if (!player.value) return

  if (isPlaying.value) {
    player.value.pause()
    isPlaying.value = false
  } else {
    try {
      await player.value.play()
      isPlaying.value = true
    } catch (error) {
      console.error('Не удалось воспроизвести запись звонка', error)
      isPlaying.value = false
    }
  }
}

const cycleSpeed = () => {
  speedIndex.value = (speedIndex.value + 1) % speedOptions.length
  if (player.value) {
    player.value.playbackRate = currentSpeed.value.speed
  }
}

watch(
  () => currentTime.value,
  () => {
    if (player.value && isSeeking.value) {
      if (player.value.duration !== Infinity && !Number.isNaN(player.value.duration)) {
        player.value.currentTime = currentTime.value
      }
      if (Math.abs(currentTime.value - audioDuration.value) < 0.1) {
        isPlaying.value = false
      }
    }
  }
)

const handleSeekEnd = () => {
  if (player.value && isSeeking.value) {
    if (player.value.duration !== Infinity && !Number.isNaN(player.value.duration)) {
      player.value.currentTime = currentTime.value
    }
  }
  isSeeking.value = false
}

const handleLoadedMetadata = () => {
  if (!player.value) return

  const el = player.value
  audioDuration.value = 0
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

const callDirectionTitle = computed(() => {
  switch (message.value?.direction) {
    case 'incoming':
      return 'Входящий'
    case 'outgoing':
      return 'Исходящий'
    default:
      return 'Звонок'
  }
})

const callDirectionPreposition = computed(() => {
  switch (message.value?.direction) {
    case 'incoming':
      return 'к'
    case 'outgoing':
      return 'от'
    default:
      return 'к'
  }
})

const callIconColor = computed(() => {
  const isMissed = message.value?.isMissedCall
  switch (message.value?.direction) {
    case 'incoming':
      return isMissed ? '#F84932' : '#00AC47'
    case 'outgoing':
      return isMissed ? '#5F5F5F' : '#118ABF'
    default:
      return isMissed ? '#5F5F5F' : '#00AC47'
  }
})

const missedCallLabel = computed(() => {
  if (message.value?.direction === 'outgoing') {
    return 'Без ответа'
  }
  return 'Пропущенный'
})

// Получаем название канала для тултипа
const channelTitle = computed(() => {
  // Проверяем наличие dialogId в сообщении (может быть не в типе, но присутствовать в данных)
  const messageWithDialog = message.value as ICallMessage & { dialogId?: string }
  const channelsValue = channels.value
  const selectedChatValue = selectedChat.value
  
  if (!messageWithDialog?.dialogId || !channelsValue || !selectedChatValue) {
    return null
  }

  // Находим диалог по dialogId
  const dialog = selectedChatValue.dialogs?.find((d: { dialogId: string; channelId?: string }) => d.dialogId === messageWithDialog.dialogId)
  if (!dialog?.channelId) {
    return null
  }

  // Находим канал по channelId
  const channel = channelsValue.find((ch: { channelId: string; title?: string }) => ch.channelId === dialog.channelId)
  return channel?.title || null
})

const elementType = {
  textDialog: 'textDialog',
  message: 'message'
}

function getClass(element: { position: string }, type: string) {
  const position = element.position;
  switch (type) {
    case 'textDialog':
      return position === 'left' ? 'call-message__text-dialog-left' : 'call-message__text-dialog-right';
    case 'message':
      return position === 'left' ? 'call-message__left' : 'call-message__right';
    default:
      return '';
  }
}

const handleCall = () => {
  alert('Перезвонить')
}

// Функция для скачивания аудио
const downloadAudio = async () => {
  if (!message.value?.url) return

  try {
    const response = await fetch(message.value.url, {
      headers: {
        Accept: 'audio/*'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    const blob = await response.blob()

    const urlExtension = message.value.url.split('.').pop()?.split('?')[0]?.toLowerCase() || ''

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

    const urlSegments = message.value.url.split('/')
    const rawFilename = decodeURIComponent(urlSegments[urlSegments.length - 1]?.split('?')[0] || '')

    const filename = rawFilename
      ? (rawFilename.includes('.') ? rawFilename : `${rawFilename}.${extension}`)
      : `call-${message.value.messageId}.${extension}`

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка при скачивании аудио звонка:', error)
    if (message.value?.url) {
      window.open(message.value.url, '_blank')
    }
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

</script>

<style scoped lang="scss">
@use './styles/CallMessage.scss';
</style>
