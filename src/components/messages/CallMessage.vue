<template>
  <div class="call-message">
    <div
      :class="getClass(message)"
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

      <div
        class="call-message__content"
        :style="{ paddingRight: message.isMissedCall ? '16px' : '78px' }"
      >
        <span
          class="call-message__icon pi pi-phone"
          :style="{ color: message.isMissedCall ? 'var(--call-message-color-icon-error)' : 'var(--neutral-100)' }"
        />

        <span
          v-if="!message.isMissedCall"
          class="call-message__title"
        >Аудиозвонок</span>
        <span
          v-else
          class="call-message__title"
        >Пропущенный аудиозвонок</span>

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
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});


function getClass(message) {
  return message.position === 'left' ? 'call-message__left' : 'call-message__right';
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
    column-gap: var(--call-message-gap);
    max-width: var(--call-message-width);
    padding: var(--call-message-padding);
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

  &__title {
    font-weight: 500;
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
    height: var(--call-message-icon-height);
    width: var(--call-message-icon-width);
    background-color: var(--call-message-backgroung-icon);
    color: var(--call-message-color-icon-error);
    font-size: var(--avatar-icon-size-small);
  }

  &__duration {
    color: var(--neutral-500);
    font-size: 15px;
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

    .call-message__avatar {
      grid-column: 1;
      grid-row: 2;
    }

    .call-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .call-message__content {
      grid-column: 2;
      background-color: var(--text-message-left-background-color);
      color: var(--text-message-text-color);
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .call-message__avatar {
      grid-column: 2;
      grid-row: 2;
    }

    .call-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .call-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--text-message-right-background-color);
      color: var(--text-message-text-color);
    }
  }
}
</style>
