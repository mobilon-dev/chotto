<template>
  <div
    class="audio-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="file-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

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
      <audio
        ref="player"
        :src="message.url"
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
      <div class="audio-message__progress-bar-container">
        <div
          class="audio-message__progress-bar"
          :style="{ width: progressPercent + '%' }"
        />
      </div>
      <p class="audio-message__remaining-time">
        {{ `${formatCurrentTime} / ${formatDuration}` }}
      </p>

      <div class="audio-message__info-container">
        <span class="audio-message__time">{{ message.time }}</span>
        <div
          v-if="getClass(message) === 'audio-message__right' && message.status"
          class="audio-message__status"
          :class="getStatus"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import ContextMenu from '../features/ContextMenu.vue'

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const player = ref(null);
const isPlaying = ref(false);
const audioDuration = ref(0);
const currentTime = ref(0)

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

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

const formatTime = (time) => {
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

const formatDuration = computed(() => {
  if (player.value) {
    return formatTime(audioDuration.value)
  }
  return '0:00';
});

const progressPercent = computed(() => {
  if (audioDuration.value > 0) {
    return (currentTime.value / audioDuration.value) * 100;
  }
  return 0;
});

const getStatus = computed(() => {
  switch (props.message.status) {
    case 'read':
      return 'audio-message__status--read'
    case 'received':
      return 'audio-message__status--received'
    default:
      return ''
  }
})

function getClass(message) {
  return message.position === 'left' ? 'audio-message__left' : 'audio-message__right';
}

onMounted(() => {
  player.value.addEventListener('loadedmetadata', () => {
    audioDuration.value = player.value.duration;
  });
  player.value.addEventListener('timeupdate', () => {
    currentTime.value = player.value.currentTime;
  });
});
</script>

<style
  scoped
  lang="scss"
>
.audio-message {

  &__content {
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: var(--audio-message-gap);
    padding: var(--audio-message-padding);
    width: var(--audio-message-width);
    border-radius: var(--audio-message-border-radius);
  }

  &__play,
  &__pause {
    border: none;
    cursor: pointer;
    position: relative;
    grid-row: 1 / 3;
    width: var(--audio-message-button-width);
    height: var(--audio-message-button-height);
    border-radius: var(--audio-message-button-border-radius);

    span {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--icon-font-size-medium);
    }
  }

  &__progress-bar-container {
    position: relative;
    width: 100%;
    height: var(--audio-message-pbc-height);
    border-radius: var(--audio-message-pbc-border-radius);
    margin: var(--audio-message-pbc-margin);
    background-color: var(--audio-message-pbc-background-color);
  }

  &__progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width 0.2s ease-in-out;
    border-radius: var(--audio-message-pb-border-radius);
    background-color: var(--audio-message-pb-background-color);
  }

  &__remaining-time {
    grid-column: 2;
    margin-bottom: -10px;
    font-size: var(--remaining-time);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    background-color: var(--avatar-background-color);
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__subtext {
    font-size: 12px;
    color: var(--subtext-color);
    font-weight: 500;
  }

  &__info-container {
    position: absolute;
    bottom: 4px;
    right: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }

  &__status {
    display: flex;

    span {
      color: var(--status-message-color-received);
      font-size: var(--status-message-font-size);
      font-weight: 400;
    }
  }

  &__status--received {
    span {
      color: var(--status-message-color-received);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__status--read {
    span {
      color: var(--status-message-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__time {
    font-size: var(--time-message-font-size);
  }

  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--neutral-500);
      font-size: 20px;
    }

    &:hover span {
      color: var(--neutral-700);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__play,
  &__pause {
    background-color: var(--audio-message-button-background-color-left);

    span {
      color: var(--audio-message-button-icon-color-left);
    }
  }

  &__left,
  &__right {
    display: grid;
    column-gap: 12px;
    margin: var(--audio-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .audio-message__avatar {
      grid-column: 1;
      grid-row: 2;
    }

    .audio-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .audio-message__content {
      grid-column: 2;
      background-color: var(--audio-message-background-left);
    }

    .audio-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .audio-message__context-menu {
      top: 80%;
      left: 100%;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .audio-message__avatar {
      grid-column: 2;
      grid-row: 2;
    }

    .audio-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .audio-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--audio-message-background-right);
    }

    .audio-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .audio-message__context-menu {
      top: 80%;
      right: 100%;
    }
  }

}

.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
