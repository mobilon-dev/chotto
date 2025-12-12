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
      :placeholder="inputPlaceholder"
      @keydown.enter="keyEnter"
      @input="sendTyping"
    />
    <TextFormatToolbar
      :textarea="refInput"
      @format-applied="handleFormatApplied"
    />
    <button
      class="chat-input__button"
      :disabled="getMessage().isRecording"
      :class="{ 'chat-input__button-disabled': disabledSendButton }"
      @click="sendMessage"
    >
      <span class="">
        <SendIcon :color="sendIconColor" />
      </span>
    </button>

    <div class="chat-input__third-line">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref, ref, watch, nextTick, inject, computed, onMounted } from 'vue';
import { useMessageDraft, useImmediateDebouncedRef } from '@/hooks';
import { t } from '../../../locale/useLocale';
import { IFilePreview, IInputMessage } from '@/types';
import { SendIcon } from './icons';
import TextFormatToolbar from '../../2_chatinput_elements/TextFormatToolbar/TextFormatToolbar.vue';

const emit = defineEmits(['send','typing']);

const chatAppId = inject('chatAppId')
const { resetMessage, getMessage, setMessageText, setForceSendMessage } = useMessageDraft(chatAppId as string)

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
  },
  selectedChannel: {
    type: Object,
    required: false,
    default: null,
  },
  inputButtonColor: {
    type: String,
    required: false,
    default: null,
  },
})

const disabledSendButton = computed(() => {
  if (props.state == 'disabled') return true
  if (getMessage().text == '' && !getMessage().file) return true
  if (getMessage().isRecording) return true
  return false
})

const sendIconColor = computed(() => {
  if (props.inputButtonColor) {
    return props.inputButtonColor;
  }

  if (!props.selectedChannel?.channelId) {
    return '#25D366';
  }

  const channelId = props.selectedChannel.channelId.toLowerCase();

  if (channelId.includes('whatsapp') || channelId.includes('waba')) {
    return '#25D366';
  } else if (channelId.includes('telegram')) {
    return '#37AFE2';
  } else if (channelId.includes('sms')) {
    return '#6C757D';
  } else if (channelId.includes('max')) {
    return '#4B0082';
  }

  return '#25D366';
})

const inputPlaceholder = computed(() => {
  if (!props.selectedChannel?.channelId) {
    return t('component.ChatInput.InputPlaceholder');
  }

  const channelId = props.selectedChannel.channelId.toLowerCase();

  if (channelId.includes('whatsapp') || channelId.includes('waba')) {
    return t('component.ChatInput.WhatsappInputPlaceholder');
  } else if (channelId.includes('telegram')) {
    return t('component.ChatInput.TelegramInputPlaceholder');
  } else if (channelId.includes('sms')) {
    return t('component.ChatInput.SmsInputPlaceholder');
  } else if (channelId.includes('max')) {
    return t('component.ChatInput.MaxInputPlaceholder');
  }

  return t('component.ChatInput.InputPlaceholder');
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

      const computedStyle = getComputedStyle(el);
      const fontSize = parseFloat(computedStyle.fontSize) || 16;
      const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize * 1.4;
      const minHeight = 40; 
      const maxHeight = lineHeight * 11;
      const scrollHeight = el.scrollHeight;

      const lineCount = getMessage().text.split('\n').length;
      const hasExplicitLineBreaks = lineCount > 1;
      
      const tempEl = document.createElement('div');
      tempEl.style.position = 'absolute';
      tempEl.style.visibility = 'hidden';
      tempEl.style.whiteSpace = 'nowrap';
      tempEl.style.font = computedStyle.font;
      tempEl.style.fontSize = computedStyle.fontSize;
      tempEl.style.fontFamily = computedStyle.fontFamily;
      tempEl.style.fontWeight = computedStyle.fontWeight;
      tempEl.style.letterSpacing = computedStyle.letterSpacing;
      tempEl.textContent = getMessage().text;
      
      document.body.appendChild(tempEl);
      const textWidth = tempEl.offsetWidth;
      document.body.removeChild(tempEl);
      
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const availableWidth = el.clientWidth - paddingLeft - paddingRight;
      
      const hasAutoWrap = textWidth > availableWidth;
      const shouldGrow = hasExplicitLineBreaks || hasAutoWrap;    
      
      if (!getMessage().text.trim()) {
        el.style.height = minHeight + 'px';
        el.style.overflowY = 'hidden';
      } else if (!shouldGrow) {
        el.style.height = minHeight + 'px';
        el.style.overflowY = 'hidden';
      } else if (scrollHeight <= maxHeight) {
        el.style.height = scrollHeight + 'px';
        el.style.overflowY = 'hidden';
      } else {
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
  const target = event.target as HTMLTextAreaElement;
  emit('typing', target.value);
}

const initializeTextareaHeight = () => {
  nextTick(() => {
    const el = refInput.value;
    if (!el) return;
    
    el.style.height = '40px';
    el.style.overflowY = 'hidden';
  });
}

onMounted(() => {
  initializeTextareaHeight();
});

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
const handleFormatApplied = (data: { format: string; selectedText: string; start: number; end: number; newText: string }) => {
  // Обновляем текст в textarea и draft после форматирования
  if (refInput.value) {
    const oldText = refInput.value.value;
    refInput.value.value = data.newText;
    
    // Вычисляем новую позицию курсора
    // Длина старого текста до выделения + длина нового отформатированного текста
    const formattedLength = data.newText.length - (oldText.length - (data.end - data.start));
    const newEnd = data.start + formattedLength;
    
    // Обновляем текст в draft
    setMessageText(data.newText);
    
    // Устанавливаем курсор и фокус после обновления
    nextTick(() => {
      if (refInput.value) {
        refInput.value.setSelectionRange(newEnd, newEnd);
        refInput.value.focus();
      }
    });
  }
};

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

<style scoped lang="scss">
@use './styles/ChatInput.scss';
</style>
