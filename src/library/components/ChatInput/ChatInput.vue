<template>
  <div class="chat-input__container">
    <div :id="'chat-input-reply-line-' + chatAppId" class="chat-input__reply-line" />
    <div :id="'chat-input-file-line-' + chatAppId" class="chat-input__file-line" />

    <div class="chat-input__inline-buttons">
      <slot name="inline-buttons" />
    </div>

    <div
      v-if="disabledPlaceholder && (state == 'disabled' || getMessage().isRecording)"
      class="chat-input__input chat-input__disabled-placeholder"
    >
      {{ disabledPlaceholder }}
    </div>
    <textarea
      v-else
      ref="refInput"
      v-model="getMessage().text"
      :disabled="state == 'disabled' || getMessage().isRecording"
      class="chat-input__input"
      :placeholder="t('component.ChatInput.InputPlaceholder')"
      @keydown.enter="keyEnter"
      @input="sendTyping"
    />
    <button
      class="chat-input__button"
      :disabled="getMessage().isRecording"
      :class="{ 'chat-input__button-disabled': disabledSendButton }"
      @click="sendMessage"
    >
      <span class="pi pi-send" />
    </button>

    <div class="chat-input__third-line">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { unref, ref, watch, nextTick, inject, computed } from 'vue'
  import { useMessage, useImmediateDebouncedRef } from '../../../helpers'
  import { t } from '../../../locale'
  import { IFilePreview, IInputMessage } from '../../../types'

  const emit = defineEmits(['send', 'typing'])

  const chatAppId = inject('chatAppId')
  const { resetMessage, getMessage, setMessageText, setForceSendMessage } = useMessage(
    chatAppId as string
  )

  const refInput = ref<HTMLTextAreaElement>()
  const typing = useImmediateDebouncedRef('', 2000)
  const fileInfo = ref<IFilePreview>()

  const props = defineProps({
    state: {
      type: String,
      required: false,
      default: 'active',
    },
    focusOnInputArea: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabledPlaceholder: {
      type: String,
      default: null,
    },
  })

  const disabledSendButton = computed(() => {
    if (props.state == 'disabled') return true
    if (getMessage().text == '' && !getMessage().file) return true
    if (getMessage().isRecording) return true
    return false
  })

  watch(
    () => typing.value,
    () => {
      emit('typing')
    }
  )

  watch(
    () => props.focusOnInputArea,
    () => {
      if (props.focusOnInputArea)
        nextTick(() => {
          const el = unref(refInput)
          el?.focus()
        })
    },
    { immediate: true }
  )

  watch(
    () => getMessage().text,
    () => {
      nextTick(function () {
        typing.value = getMessage().text
        if (refInput.value) {
          refInput.value.style.height = 'auto'
          refInput.value.style.height = refInput.value.scrollHeight + 'px'
          if (getMessage().text.length == 0) {
            refInput.value.style.height = '40px'
          }
        }
      })
    },
    { immediate: true }
  )

  watch(
    () => getMessage().forceSend,
    () => {
      if (getMessage().forceSend) {
        sendMessage()
        setForceSendMessage(false)
      }
    }
  )

  const sendTyping = (event: Event) => {
    // console.log('typing', event.target.value);
    emit('typing', event.target.value)
  }

  const keyEnter = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (refInput.value instanceof HTMLTextAreaElement) {
        let caret = refInput.value.selectionStart
        if (caret) {
          refInput.value.setRangeText('\n', caret, caret, 'end')
          setMessageText(refInput.value.value)
        }
      }
    } else {
      event.preventDefault()
      sendMessage()
    }
  }

  // Define the method to send the message
  const sendMessage = () => {
    const Message = ref(getMessage())
    if (Message.value.text != '' || Message.value.file) {
      const messageObject: IInputMessage = {
        type: '',
        text: '',
        url: '',
        filename: '',
        size: '',
        reply: undefined,
      }

      if (Message.value.file) {
        messageObject.type = 'message.' + Message.value.file.type
        messageObject.url = Message.value.file.url
        messageObject.filename = Message.value.file.name
        messageObject.size = Message.value.file.size?.toString()
        messageObject.text = Message?.value?.text.trim()
      } else {
        messageObject.type = 'message.text'
        messageObject.text = Message.value.text.trim()
      }
      if (Message.value.reply) {
        messageObject.reply = Message.value.reply
      }
      emit('send', messageObject)
      resetMessage()
      fileInfo.value = undefined
      if (refInput.value) refInput.value.focus()
    }
  }
</script>

<style scoped lang="scss">
  .chat-input {
    &__container {
      position: relative;
      display: grid;
      align-items: center;
      border-top: var(--chotto-input-border);
      background-color: var(--chotto-chat-input-container-bg);
      padding: 5px;
      grid-gap: 5px;
      grid-template-columns: min-content auto min-content;
      grid-template-rows: auto auto auto auto;
    }

    &__reply-line {
      grid-column: 2;
      grid-row: 1;
      display: none;
    }

    &__file-line {
      grid-column: 2;
      grid-row: 2;
      display: none;
    }

    &__third-line {
      display: flex;
      grid-row: 4;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    &__input {
      grid-row: 3;
      grid-column: 2;
      border: var(--chotto-input-border);
      background-color: var(--chotto-input-background);
      padding: var(--chotto-input-padding);
      color: var(--chotto-primary-text-color);
      font-size: var(--chotto-input-font-size);
      overflow-y: hidden;
      resize: none;
      white-space: pre-wrap;
      max-height: 140px;
      border-radius: var(--chotto-input-border-radius);

      &:focus-visible {
        outline: none;
      }

      &::placeholder {
        color: var(--chotto-secondary-text-color);
      }
    }

    &__disabled-placeholder {
      color: var(--chotto-secondary-text-color);
      text-align: center;
      user-select: none;
    }

    &__button {
      grid-row: 3;
      grid-column: 3;
      background-color: transparent;
      border: 0px;
      height: fit-content;
      width: fit-content;
      margin: auto 0;
      span {
        display: block;
        cursor: pointer;
        padding: var(--chotto-chat-input-button-padding);
        font-size: var(--chotto-button-icon-size);
        color: var(--chotto-chat-input-icon-color);
      }
    }

    &__button-disabled {
      span {
        cursor: auto;
        color: var(--chotto-chat-input-icon-color-disabled);
      }
    }

    &__inline-buttons {
      display: flex;
      margin: auto 0;
      grid-row: 3;
      grid-column: 1;
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
