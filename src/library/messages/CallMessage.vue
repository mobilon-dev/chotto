<template>
  <div
    :class="
      getClass(message, elementType.message),
      applyStyle(message)
    "
    :messageId="message.messageId"
  >
    <img
      v-if="message.avatar"
      class="call-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText"
      class="call-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div class="call-message__content">
      <span
        class="call-message__icon pi pi-phone"
        :class="{'call-message__icon-missed': message.isMissedCall}"
      />

      <span
        v-if="!message.isMissedCall"
        class="call-message__title"
      >
        Аудиозвонок
      </span>
      <span
        v-else
        class="call-message__title"
      >
        Пропущенный аудиозвонок
      </span>

      <span
        v-if="message.callDuration"
        class="call-message__duration"
      >{{ message.callDuration }}</span>
      <span
        v-else-if="!message.callDuration && message.isMissedCall"
        class="call-message__duration"
      >Нажмите, чтобы
        перезвонить</span>
      <span
        v-else
        class="call-message__duration"
      >Нет ответа</span>

      <div class="call-message__info-container">
        <span class="call-message__time">{{ message.time }}</span>
      </div>

      <button
        v-if="message.transcript?.dialog"
        class="call-message__download-button"
        @click="isFullTranscript = !isFullTranscript"
      >
        <span class="pi pi-arrow-up-right" />
      </button>

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
                :class="getClass(item, elementType.textDialog)"
                v-for="(item, index) in message.transcript?.dialog"
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
import { ref, inject} from 'vue'
import { ICallMessage } from '../../types'
import { useTheme } from '../../helpers/useTheme';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)
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

const isFullTranscript = ref(false)

const elementType = {
  textDialog: 'textDialog',
  message: 'message'
}

function getClass(element, type) {
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

</script>

<style
  scoped
  lang="scss"
>
.call-message {

  &__content {
    position: relative;
    word-wrap: break-word;
    width: fit-content;
    display: grid;
    grid-template-columns: min-content 1fr;
    border-radius: 14px;
    column-gap: 12px;
    max-width: 51%;
    min-width: 30%;
    padding: 10px 16px 4px 16px;

  }

  &__info-container {
    grid-column: 1 / 3;
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__title {
    font-size: var(--chotto-title-font-size);
    margin-bottom: 2px;
  }

  &__icon {
    grid-column: 1;
    grid-row: 1 / 3;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 38px;
    width: 38px;
    background-color: var(--chotto-message-type-icon-bg-color);
    color: var(--chotto-message-type-icon-color);
    font-size: var(--chotto-button-icon-size);
  }

  &__icon-missed{
    color: var(--chotto-call-message-phone-icon-missed-color);
  }

  &__duration {
    color: var(--chotto-secondary-text-color);
    font-size: var(--chotto-text-font-size);
  }

  &__time {
    font-size: var(--chotto-small-text-font-size);
    color: var(--chotto-secondary-text-color);
  }

  &__download-button {
    position: absolute;
    right: 8px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    background-color: transparent;
    padding: 0;
    cursor: pointer;

    span {
      color: var(--chotto-button-color-active);
      font-size: var(--chotto-text-icon-size);
    }
  }

  &__status {
    display: flex;

    span {
      color: var(--chotto-status-color-received);
      font-size: var(--chotto-small-text-icon-size);
    }
  }

  &__status--received {
    span {
      color: var(--chotto-status-color-received);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__status--read {
    span {
      color: var(--chotto-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__subtext {
    font-size: var(--chotto-additional-text-font-size);
    color: var(--chotto-secondary-text-color);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--chotto-avatar-small);
    min-height: var(--chotto-avatar-small);
    border-radius: var(--chotto-avatar-border-radius);
  }

  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--chotto-button-color-active);
      font-size: var(--chotto-button-icon-size);
    }

    &:hover span {
      color: var(--chotto-button-color-hover);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__text-dialog-left,
  &__text-dialog-right {
    position: relative;
    width: fit-content;
    max-width: 46%;
    padding-left: 24px;

    &::before {
      content: "";
      position: absolute;
      top: 12px;
      left: 0;
      width: 16px;
      height: 2px;
      background-color: var(--chotto-secondary-text-color);
    }

    p {
      font-size: var(--chotto-title-font-size);
      margin: 0;
    }

    span {
      color: var(--chotto-secondary-text-color);
      font-size: var(--chotto-additional-text-font-size);
    }
  }

  &__text-dialog-right {
    padding-left: 0;
    padding-right: 24px;
    margin-left: auto;

    &::before {
      right: 0;
      left: auto;
    }

    span {
      width: fit-content;
      display: block;
      margin-left: auto;
    }
  }

  &__left,
  &__right {
    display: grid;
    margin: var(--chotto-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .call-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .call-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .call-message__content {
      grid-column: 2;
      background-color: var(--chotto-message-left-bg);
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .call-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .call-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .call-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--chotto-message-right-bg);
    }
  }

  &__modal {
    position: absolute;
    font-family: var(--chotto-container-font-family);
    font-weight: var(--chotto-container-font-weight);
    font-size: var(--chotto-text-font-size);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    color: var(--chotto-primary-text-color);
    background-color: var(--chotto-modal-bg);
    border-radius: var(--chotto-modal-border-radius);
    padding: var(--chotto-modal-padding);
    width: 32%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--chotto-modal-overlay-shadow);
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: var(--chotto-scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--chotto-scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--chotto-modal-mask-background);
    z-index: 1000;
  }

  &__modal-close-button {
    display: block;
    background-color: transparent;
    border: none;
    padding: 4px;
    margin: 0 0 14px auto;
    cursor: pointer;

    span {
      color: var(--chotto-secondary-text-color);
      font-size: var(--chotto-button-icon-size);
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
