<template>
  <div class="text-message">
    <div
      :class="getClass(message)"
      :messageId="message.messageId"
      @mouseleave="hideMenu"
    >
      <img
        v-if="message.avatar"
        class="text-message__avatar"
        :src="message.avatar"
        height="32"
        width="32"
        :style="{ gridRow: message.subText ? '2' : '1' }"
      >

      <p
        v-if="message.subText"
        class="text-message__subtext"
      >
        {{ message.subText }}
      </p>

      <div
        class="text-message__content"
        @mouseenter="showMenu"
      >
        <p>{{ message.text }}</p>
        <div class="text-message__info-container">
          <span
            v-if="message.time"
            class="text-message__time"
          >{{ message.time }}</span>
          <div
            v-if="getClass(message) === 'text-message__right' && message.status"
            class="text-message__status"
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
          class="text-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>

        <transition>
          <ContextMenu
            v-if="isOpenMenu && message.actions"
            class="text-message__context-menu"
            :actions="message.actions"
            @click="clickAction"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import ContextMenu from '../features/ContextMenu.vue'
// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['action']);

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const clickAction = (action) => {
  hideMenu();
  emit('action', { messageId: props.message.messageId, ...action });
}

function getClass(message) {
  return message.position === 'left' ? 'text-message__left' : 'text-message__right';
}

const getStatus = computed(() => {
  switch (props.message.status) {
    case 'read':
      return 'text-message__status--read'
    case 'received':
      return 'text-message__status--received'
    default:
      return ''
  }
})
</script>

<style
  scoped
  lang="scss"
>
.text-message {

  &__content {
    position: relative;
    word-wrap: break-word;
    width: fit-content;
    padding: var(--text-message-padding);
    max-width: var(--text-message-max-width);
    border-radius: var(--text-message-border-radius);
  }

  &__info-container {
    position: absolute;
    bottom: 4px;
    right: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }

  &__time {
    font-size: var(--time-message-font-size);
  }

  &__status {
    display: flex;

    span {
      font-weight: 400;
      color: var(--status-message-color-received);
      font-size: var(--status-message-font-size);
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

  &__subtext {
    font-weight: 500;
    font-size: var(--subtext-font-size);
    color: var(--subtext-color);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    background-color: var(--avatar-background-color);
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
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

  &__left,
  &__right {
    display: grid;
    column-gap: 12px;
    margin: var(--text-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .text-message__avatar {
      grid-column: 1;
      grid-row: 2;
    }

    .text-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .text-message__content {
      grid-column: 2;
      background-color: var(--text-message-left-background-color);
      color: var(--text-message-text-color);
    }

    .text-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .text-message__context-menu {
      top: 56%;
      left: 100%;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .text-message__avatar {
      grid-column: 2;
      grid-row: 2;
    }

    .text-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .text-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--text-message-right-background-color);
      color: var(--text-message-text-color);
    }

    .text-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .text-message__context-menu {
      top: 56%;
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
