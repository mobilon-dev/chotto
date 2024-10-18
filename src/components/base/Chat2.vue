<template>
  <div
    :class="getClass()"
    @click="selectChat"
  >
    <div
      class="chat-item__container"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      <div class="chat-item__avatar-container">
        <span
          class="chat-item__status"
          :style="{ backgroundColor: props.chat.status }"
        />
        <img
          v-if="props.chat.avatar"
          :src="props.chat.avatar"
          height="32"
          width="32"
        >
        <span
          v-else
          class="pi pi-user"
        />
      </div>

      <div class="chat-item__info-container">
        <div class="chat-item__name">
          {{ chat.name }}
        </div>
        <div
          v-if="chat.lastMessage"
          class="chat-item__last-message"
        >
          {{ chat.lastMessage }}
        </div>
      </div>

      <div class="chat-item__details-container">
        <div
          v-if="!(buttonMenuVisible && chat.actions) && chat['lastActivity.time']"
          class="chat-item__time"
        >
          {{ chat['lastActivity.time']
          }}
        </div>
        <div
          v-if="!(buttonMenuVisible && chat.actions) && chat.countUnread > 0"
          class="chat-item__unread"
        >
          {{ chat.countUnread }}
        </div>



        <button
          v-if="buttonMenuVisible && chat.actions"
          class="chat-item__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>


        <span
          v-if="chat.isFixedTop || chat.isFixedBottom"
          class="chat-item__fixed pi pi-thumbtack"
        />
      </div>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && chat.actions"
          class="chat-item__context-menu"
          :actions="chat.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContextMenu from '../features/ContextMenu.vue'
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['select', 'action']);

// Define method
const selectChat = () => { emit('select', props.chat); }

const getClass = () => {
  return props.chat.isSelected ? 'chat-item__selected' : 'chat-item';
}

const clickAction = (action) => {
  // console.log('action', props.chat.chatId, action);
  hideMenu();
  emit('action', { chatId: props.chat.chatId, ...action });
}


// Управление видимостью меню
const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);

const showMenu = () => {
  buttonMenuVisible.value = true;
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};
</script>

<style
  scoped
  lang="scss"
>
.chat-item {

  &__container {
    display: flex;
    position: relative;
    padding: 15px;
    cursor: pointer;
  }

  &__selected {
    border-radius: 6px;
    cursor: pointer;
    background: var(--chat-item-selected);

    .chat-item__menu-button {
      background: var(--chat-item-selected);
    }
  }

  &__avatar-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    margin-right: 15px;
    background-color: var(--avatar-background-color);
    width: var(--avatar-width-medium);
    height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-icon-color);
    }
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 5px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent;
    z-index: 1;
  }

  &__info-container {
    flex-grow: 1;
    align-self: center;
    margin-right: 15px;
  }

  &__name {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: var(--chat-item-font-size-name);
  }

  &__last-message {
    font-weight: 500;
    font-size: var(--chat-item-font-size-last-message);
    color: var(--chat-item-color-last-name);
  }

  &__details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    span {
      color: var(--neutral-500);
    }
  }

  &__fixed {
    margin-top: auto;
  }

  &__menu-button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background-color: var(--chat-list-menu-button);
    cursor: pointer;
    padding: 0;

    span {
      display: block;
      width: fit-content;
      margin-left: auto;
      font-size: 18px;
      transition: 0.2s;
    }

    &:hover span {
      color: var(--chat-list-menu-button-color-hover);
      transition: 0.2s;
    }
  }

  &__unread {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 400;
    margin-left: auto;
    margin-top: auto;
    min-width: var(--chat-item-min-width-unread);
    min-height: var(--chat-item-min-height-unread);
    color: var(--chat-item-color-unread);
    background-color: var(--chat-item-background-color-unread);
    font-size: var(--chat-item-font-size-unread);
  }

  &__time {
    font-size: 12px;
    color: var(--neutral-400);
    font-weight: 500;

  }

  &__context-menu {
    position: absolute;
    top: 40%;
    right: 0;
  }
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
