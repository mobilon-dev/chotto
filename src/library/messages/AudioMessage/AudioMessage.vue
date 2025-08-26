<template>
  <div
    class="audio-message"
    :class="[getClass(message), applyStyle(message)]"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="audio-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    />

    <p
      v-if="message.subText"
      class="audio-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="audio-message__content"
      @mouseenter="showMenu"
    >
      <BaseReplyMessage
        v-if="message.reply"
        style="grid-column: 1/3"
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
        />
        <div class="audio-message__player-controls">
          <p class="audio-message__remaining-time">
            {{ `${formatCurrentTime} / ${formatDuration}` }}
          </p>
          <div class="audio-message__speed-btn-container">
            <p
              v-for="(s, index) in speed"
              :key="s.text"
              class="audio-message__speed-btn"
              :class="{ 'audio-message__speed-btn-selected': s.selected }"
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
          v-html="linkedText"
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
        <div
          v-if="
            getClass(message) === 'audio-message__right' &&
            statuses.includes(message.status)
          "
          class="audio-message__status"
          :class="status"
        >
          <span
            v-if="message.status !== 'sent'"
            class="pi pi-check"
          />
          <span class="pi pi-check" />
        </div>
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
              <p style="word-wrap: break-word; max-width: 25rem">
                {{ message.transcript?.text }}
              </p>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, inject } from 'vue'
import linkifyStr from 'linkify-string'

import { ContextMenu } from '../../components'
import { getStatus, statuses } from '../../../helpers'
import { IAudioMessage } from '../../../types'
import { useTheme } from '../../../helpers/useTheme'
import { BaseReplyMessage, LinkPreview, EmbedPreview } from '../'

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
    default: () => {
      return null
    },
  },
})

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
  for (let s of speed.value) {
    s.selected = false
  }
  speed.value[index].selected = true
  if (player.value) player.value.playbackRate = speed.value[index].speed
}

const emit = defineEmits(['action', 'reply'])

const player = ref<HTMLAudioElement | null>()
const isPlaying = ref(false)
const audioDuration = ref(0)
const currentTime = ref(0)

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false)

const isFullTranscript = ref(false)

const linkedText = computed(() => {
  if (props.message.text) return linkifyStr(props.message.text)
  return ''
})

const handleClickReplied = (messageId) => {
  emit('reply', messageId)
}

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href) window.open(event.target.href, '_blank')
}

const showMenu = () => {
  buttonMenuVisible.value = true
}

const hideMenu = () => {
  buttonMenuVisible.value = false
  isOpenMenu.value = false
}

const viewsAction = () => {
  emit('action', { messageId: props.message.messageId, type: 'views' })
}

const clickAction = () => {}

const status = computed(() => getStatus(props.message.status))

function togglePlayPause() {
  if (player.value) {
    if (isPlaying.value) {
      player.value.pause()
    } else {
      player.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

const formatCurrentTime = computed(() => {
  if (player.value) {
    return formatTime(currentTime.value)
  }
  return '0:00'
})

watch(
  () => currentTime.value,
  () => {
    if (player.value) {
      if (
        player.value.duration != Infinity &&
        !Number.isNaN(player.value.duration)
      )
        player.value.currentTime = currentTime.value

      if (currentTime.value == audioDuration.value) isPlaying.value = false
    }
  }
)

const formatDuration = computed(() => {
  if (player.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00'
})

function getClass(message) {
  return message.position === 'left'
    ? 'audio-message__left'
    : 'audio-message__right'
}

onMounted(() => {
  if (player.value != null) {
    player.value.addEventListener('loadedmetadata', () => {
      if (player.value != null) {
        if (
          player.value.duration == Infinity ||
          Number.isNaN(player.value.duration)
        ) {
          player.value.currentTime = 1e101
          player.value.addEventListener(
            'timeupdate',
            () => {
              if (player.value) {
                player.value.currentTime = 0
                audioDuration.value = player.value.duration
              }
            },
            { once: true }
          )
        }
      }
      audioDuration.value = player.value != null ? player.value.duration : 0
    })
    player.value.addEventListener('timeupdate', () => {
      currentTime.value = player.value != null ? player.value.currentTime : 0
    })
  }
})
</script>
