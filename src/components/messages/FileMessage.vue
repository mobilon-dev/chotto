<template>
  <div
    class="file-message"
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
      class="file-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div
      class="file-message__content"
      @mouseenter="showMenu"
    >
      <a
        class="file-message__link"
        :href="message.url"
        download
      >
        <span class="pi pi-file" />
        {{ message.filename }}
      </a>
      <div class="file-message__info-container">
        <span class="file-message__time">{{ message.time }}</span>
        <div
          v-if="getClass(message) === 'file-message__right' && message.status"
          class="file-message__status"
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
        class="file-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="file-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
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

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};


function getClass(message) {
  return message.position === 'left' ? 'file-message__left' : 'file-message__right';
}

const getStatus = computed(() => {
  switch (props.message.status) {
    case 'read':
      return 'file-message__status--read'
    case 'received':
      return 'file-message__status--received'
    default:
      return ''
  }
})

</script>

<style
  scoped
  lang="scss"
>
.file-message {

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

  &__content {
    position: relative;
    width: fit-content;
    border-radius: var(--file-message-border-radius);
    background-color: var(--file-message-background-color);
  }

  &__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--file-message-gap);
    color: var(--file-message-link-color);
    padding: var(--file-message-padding);

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
    }
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
      color: var(--neutral-500);
      font-size: var(--status-message-font-size);
      font-weight: 400;
    }
  }

  &__status--received {
    span {
      color: var(--neutral-500);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__status--read {
    span {
      color: var(--status-color-read);

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

  &__left,
  &__right {
    display: grid;
    column-gap: 12px;
    margin: var(--file-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .file-message__avatar {
      grid-column: 1;
      grid-row: 2;
    }

    .file-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .file-message__content {
      grid-column: 2;
      background-color: var(--text-message-left-background-color);
      color: var(--text-message-text-color);
    }

    .file-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .file-message__context-menu {
      top: 100%;
      left: 100%;
    }

  }

  &__right {
    grid-template-columns: 1fr min-content;

    .file-message__avatar {
      grid-column: 2;
      grid-row: 2;
    }

    .file-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .file-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--text-message-right-background-color);
      color: var(--text-message-text-color);
    }

    .file-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .file-message__context-menu {
      top: 100%;
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
