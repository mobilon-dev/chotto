<template>
  <div class="chat-input__container">
    <div
      :id="'chat-input-reply-line-' + chatAppId"
      class="chat-input__reply-line"
    />
    <div
      :id="'chat-input-file-line-' + chatAppId"
      class="chat-input__file-line"
    />

    <div class="chat-input__inline-buttons">
      <slot name="inline-buttons" />
    </div>

    <div
      v-if="
        disabledPlaceholder && (state == 'disabled' || getMessage().isRecording)
      "
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
import { useMessage } from '../../../helpers/useMessage'
import { t } from '../../../locale/useLocale'
import { IFilePreview, IInputMessage } from '../../../types'
import useImmediateDebouncedRef from '../../../helpers/useImmediateDebouncedRef'

const emit = defineEmits(['send', 'typing'])

const chatAppId = inject('chatAppId')
const { resetMessage, getMessage, setMessageText, setForceSendMessage } =
  useMessage(chatAppId as string)

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