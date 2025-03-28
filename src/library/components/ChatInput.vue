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
    <div class="chat-input__second-line">
      <ButtonContextMenu
        ref="refBCM"
        v-if="commands"
        :disabled="getMessage().isRecording"
        :actions="commands"
        button-title="/"
        @click="sendCommand"
      />

      <textarea
        :disabled="state == 'disabled' || getMessage().isRecording"
        ref="refInput"
        v-model="getMessage().text"
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
    </div>
    <div class="chat-input__third-line">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref, ref, watch, nextTick, inject, computed } from 'vue';
import { useMessage } from '../../helpers/useMessage';
import { t } from '../../locale/useLocale';
import { IFilePreview, IInputMessage } from '../../types';
import useImmediateDebouncedRef from '../../helpers/useImmediateDebouncedRef';
import ButtonContextMenu from './ButtonContextMenu.vue';

const emit = defineEmits(['send', 'typing']);

const chatAppId = inject('chatAppId')
const { resetMessage, getMessage, setMessageText, setForceSendMessage } = useMessage(chatAppId as string)

const refBCM = ref<typeof ButtonContextMenu>()
const refInput = ref<HTMLTextAreaElement>();
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
  commands: {
    type: Array,
    required: false,
    default: null
  }
})

const disabledSendButton = computed(() => {
  if (props.state == 'disabled') return true
  if (getMessage().text == '' && !getMessage().file) return true
  if (getMessage().isRecording) return true
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
      nextTick(()=>{
        const el = unref(refInput);
        el?.focus()
      })
  },
  {immediate: true}
)

watch(
  () => getMessage().text,
  () => {
    nextTick(function () {
      typing.value = getMessage().text
      if (refInput.value){
        refInput.value.style.height = 'auto'
        refInput.value.style.height = refInput.value.scrollHeight + 'px'
      }
    })
    if (props.commands) {
      if (getMessage().text.startsWith('/')){
        const element = refBCM.value?.$el.lastChild
        element.style.display = 'inherit'
      }
      else {
        const element = refBCM.value?.$el.lastChild
        element.style.display = 'none'
      }
    }
  }
);

watch(
  () => getMessage().forceSend,
  () => {
    if (getMessage().forceSend){
      sendMessage()
      setForceSendMessage(false)
    }
  }
)

const sendTyping = (event: any) => {
  // console.log('typing', event.target.value);
  emit('typing', event.target.value);
}

const keyEnter = (event: KeyboardEvent) => {
  if (event.ctrlKey) {
    if (refInput.value instanceof HTMLTextAreaElement){
      let caret = refInput.value.selectionStart;
      if (caret){
        refInput.value.setRangeText("\n", caret, caret, "end");
        setMessageText(refInput.value.value)
      }
    }
  }
  else {
    event.preventDefault()
    sendMessage()
  }
}

const sendCommand = (command) => {
  console.log(command)
  const messageObject: IInputMessage = {
      type: 'message.command',
      text: command.action,
    };
  emit('send', messageObject)
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
    };

    if (Message.value.file) {
      messageObject.type = 'message.' + Message.value.file.type;
      messageObject.url = Message.value.file.url;
      messageObject.filename = Message.value.file.name;
      messageObject.size = Message.value.file.size?.toString();
      messageObject.text = Message?.value?.text.trim();
    } else {
      messageObject.type = 'message.text';
      messageObject.text = Message.value.text.trim();
    }
    if (Message.value.reply){
      messageObject.reply = Message.value.reply
    }
    emit('send', messageObject);
    resetMessage()
    fileInfo.value = undefined
    if (refInput.value) refInput.value.focus()
  }
};

</script>

<style
  scoped
  lang="scss"
>
.chat-input {
  &__container {
    position: relative;
    display: grid;
    align-items: center;
    border-top: var(--input-border);
    background-color: var(--chat-input-container-bg);
    padding: 5px;
    grid-gap: 5px;
  }

  &__reply-line {
    display: flex;
  }

  &__file-line {
    display: flex;
  }

  &__second-line {
    display: flex;
    grid-gap: 5px;
  }

  &__third-line {
    display: flex;
  }

  &__input {
    border: var(--input-border);
    font-weight: var(--input-font-weight);
    background-color: var(--input-background);
    padding: var(--input-padding);
    width: var(--input-width);
    color: var(--input-text-color);
    font-size: var(--input-font-size);
    white-space: normal;
    overflow-y: hidden;
    resize: none;
    white-space: pre-wrap;
    max-height: 140px;
    border-radius: var(--input-border-radius);
    border: var(--input-border);

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--input-placeholder-color);
    }
  }

  &__button {
    background-color: transparent;
    border: 0px;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--chat-input-icon-font-size);
      color: var(--chat-input-icon-color);
    }
  }

  &__button-disabled {
    span {
      cursor: auto;
      color: var(--chat-input-icon-color-disabled);
    }
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
