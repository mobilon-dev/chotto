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
      <span class="">
        <WhatsAppSendIcon />
      </span>
    </button>

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
import WhatsAppSendIcon from '../icons/WhatsAppSendIcon.vue';

const emit = defineEmits(['send','typing']);

const chatAppId = inject('chatAppId')
const { resetMessage, getMessage, setMessageText, setForceSendMessage } = useMessage(chatAppId as string)

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
  disabledPlaceholder: {
    type: String,
    default: null,
  }
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
    nextTick(() => {
      const el = refInput.value;
      if (!el) return;

      const scrollTop = el.scrollTop;
      el.style.height = 'auto';

      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 11;
      const scrollHeight = el.scrollHeight;

      if (!getMessage().text.trim()) {
        el.style.height = '40px';
        el.style.overflowY = 'hidden';
      }
      else if (scrollHeight <= maxHeight) {
        el.style.height = scrollHeight + 'px';
        el.style.overflowY = 'hidden';
      }
      else {
        el.style.height = maxHeight + 'px';
        el.style.overflowY = 'auto';
        el.scrollTop = scrollTop;
      }
    });
  },
  { immediate: true }
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

const sendTyping = (event: Event) => {
  // console.log('typing', event.target.value);
  emit('typing', event.target.value);
}

const keyEnter = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    if (refInput.value instanceof HTMLTextAreaElement){
      let caret = refInput.value.selectionStart;
      if (caret){
        refInput.value.setRangeText("\n", caret, caret, "end");
        setMessageText(refInput.value.value)
      }
    }
    event.preventDefault();
  }
  else if (event.ctrlKey) {
    if (refInput.value instanceof HTMLTextAreaElement){
      let caret = refInput.value.selectionStart;
      if (caret){
        refInput.value.setRangeText("\n", caret, caret, "end");
        setMessageText(refInput.value.value)
      }
    }
    event.preventDefault();
  }
  else {
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
    border-top: var(--chotto-input-container-border-top, var(--chotto-input-border));
    background-color: var(--chotto-chat-input-container-bg);
    padding: var(--chotto-input-container-padding, 5px);
    grid-gap: var(--chotto-input-container-grid-gap, 5px);
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
    padding: var(--chotto-input-message-padding, var(--chotto-input-padding));
    color: var(--chotto-primary-text-color);
    font-size: var(--chotto-input-message-font-size, var(--chotto-input-font-size));
    overflow-y: hidden;
    resize: none;
    white-space: pre-wrap;
    line-height: 1.4;
    min-height: 40px;
    max-height: calc(1.5em * 10);
    border-radius: var(--chotto-input-message-border-radius, var(--chotto-input-border-radius));
    font-family: var(--chotto-container-font-family);

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--chotto-secondary-text-color);
    }

    &::-webkit-scrollbar {
      width: 6px;
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
    display: flex;
    align-self: end;
    margin-bottom: 4px;

    span {
      display: block;
      cursor: pointer;
      padding: var(--chotto-chat-input-button-padding);
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-chat-input-icon-color);
      height: var(--chotto-input-message-send-button-height, auto);
      margin: var(--chotto-chat-input-button-margin, 0);
    }
  }

  &__button-disabled {
    span {
      cursor: auto;
      color: var(--chotto-chat-input-icon-color-disabled);
    }
  }

  &__inline-buttons{
    display: flex;
    margin: auto 0;
    grid-row: 3;
    grid-column: 1;
    margin: var(--chotto-input-container-inline-buttons-margin, 0);
    gap: var(--chotto-input-container-inline-buttons-gap, 0);
    height: var(--chotto-input-container-inline-buttons-height, auto);
    align-self: flex-end;
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
