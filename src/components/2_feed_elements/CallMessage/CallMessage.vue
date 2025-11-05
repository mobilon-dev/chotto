<template>
  <div
    :class="[
      getClass(message, elementType.message),
      applyStyle(message)
    ]"
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
import { ref, inject} from 'vue'
import { ICallMessage } from '@/types'
import { useTheme } from '@/hooks';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)
// Define props
defineProps({
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

</script>

<style scoped lang="scss">
@use './styles/CallMessage.scss';
</style>
