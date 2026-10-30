<template>
  <div
    class="chat-input__container"
    :class="{ 'chat-input__container--disabled-notice': showDisabledNotice }"
    data-testid="chat-input"
  >
    <template v-if="showDisabledNotice">
      <div
        class="chat-input__disabled-placeholder"
        data-testid="chat-input-disabled-placeholder"
      >
        {{ disabledPlaceholder }}
      </div>
    </template>
    <template v-else>
      <div
        :id="'chat-input-reply-line-' + chatAppId"
        class="chat-input__reply-line"
        data-testid="chat-input-reply-line"
      />
      <div
        :id="'chat-input-file-line-' + chatAppId"
        class="chat-input__file-line"
        :class="{ 'chat-input__file-line--visible': attachedFiles.length > 0 }"
      >
        <span class="chat-input__file-counter">
          <span>{{ t('component.ChatInput.FilesSelected') }}</span>
          <span>{{ filesSelectedCount }}</span>
        </span>
        <div class="chat-input__file-chips-wrap">
          <button
            v-if="canScrollLeft"
            type="button"
            class="chat-input__file-scroll chat-input__file-scroll--left"
            :aria-label="t('component.ChatInput.FilesScrollLeft')"
            @click="scrollFiles('left')"
          >
            <ArrowIcon />
          </button>
          <div
            ref="refFileChips"
            class="chat-input__file-chips"
            @scroll="updateFileScrollState"
          >
            <FilePreview
              v-for="(file, index) in attachedFiles"
              :key="(file.url || file.name || '') + '-' + index"
              :file-info="previewOf(file)"
              @reset="removeAttachedFile(index)"
            />
          </div>
          <button
            v-if="canScrollRight"
            type="button"
            class="chat-input__file-scroll chat-input__file-scroll--right"
            :aria-label="t('component.ChatInput.FilesScrollRight')"
            @click="scrollFiles('right')"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div class="chat-input__inline-buttons">
        <slot name="inline-buttons" />
      </div>
        
      <div
        v-if="disabledPlaceholder && getMessage().isRecording"
        class="chat-input__input chat-input__disabled-placeholder"
      >
        {{ disabledPlaceholder }}
      </div>
      <div
        v-else
        class="chat-input__input-wrap"
      >
        <div
          v-if="useEmojiMirror"
          ref="refMirror"
          class="chat-input__input-mirror"
          aria-hidden="true"
          v-html="emojiMirrorHtml"
        />
        <textarea
          ref="refInput"
          v-model="getMessage().text"
          rows="1"
          data-testid="chat-input-textarea"
          :disabled="state == 'disabled' || getMessage().isRecording"
          class="chat-input__input"
          :class="{ 'chat-input__input--emoji-images': useEmojiMirror }"
          :placeholder="inputPlaceholder"
          @keydown="onInputKeydown"
          @keydown.enter="keyEnter"
          @input="sendTyping"
          @scroll="syncMirrorScroll"
          @select="updateSelectionState"
          @mouseup="snapCaretAndUpdateSelection"
          @keyup="snapCaretAndUpdateSelection"
          @mousemove="onInputMouseMove"
          @blur="clearSelectionHighlight"
        />
      </div>
      <TextFormatToolbar
        :textarea="refInput"
        @format-applied="handleFormatApplied"
      />
      <button
        type="button"
        class="chat-input__button"
        data-testid="chat-input-send"
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { unref, ref, watch, nextTick, inject, provide, computed, onMounted, onUnmounted } from 'vue';
import type { PropType } from 'vue';
import { useEmojiNative, useMessageDraft, useImmediateDebouncedRef, hideEditPreview, resolveMessageDraftStore, getDraftFiles, MAX_ATTACHED_FILES, useStartEdit, buildEditPayload, canStartEditLastSent, isEditableLastSentCandidate } from '@/hooks';
import type { UploadedFile, ResolveEditLastSentMessage } from '@/hooks';
import { textToAppleEmojiHtml, textContainsEmoji, snapIndexToGrapheme, nextGraphemeIndex, previousGraphemeIndex } from '@/functions/renderAppleEmojis';
import { t } from '../../../locale/useLocale';
import { IFilePreview, IInputMessage } from '@/types';
import { SendIcon, ArrowIcon } from './icons';
import TextFormatToolbar from '../../2_chatinput_elements/TextFormatToolbar/TextFormatToolbar.vue';
import FilePreview from '../../2_chatinput_elements/FilePreview/FilePreview.vue';

const emit = defineEmits(['send','typing']);

const chatAppId = inject('chatAppId')
const messageDraftStore = resolveMessageDraftStore(chatAppId as string)
const { resetMessage, getMessage, setMessageText, setForceSendMessage, resetEdit, removeMessageFile } = useMessageDraft(chatAppId as string)
const { startEdit } = useStartEdit(chatAppId as string)
const { isNative, emojiSrc } = useEmojiNative(chatAppId as string)

let ownedDraftId = getMessage().id
watch(
  () => getMessage().id,
  (id) => {
    ownedDraftId = id
  }
)

const refInput = ref<HTMLTextAreaElement>();
const refMirror = ref<HTMLElement>();
const refFileChips = ref<HTMLElement>();
const selectionRange = ref<{ start: number; end: number } | null>(null)
const focusAtEndAfterResize = ref(false)
const typing = useImmediateDebouncedRef('', 2000)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let fileChipsObserver: ResizeObserver | null = null

const attachedFiles = computed(() => getDraftFiles(getMessage()))

function updateFileScrollState() {
  const el = refFileChips.value
  if (!el) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  const maxScroll = el.scrollWidth - el.clientWidth
  canScrollLeft.value = el.scrollLeft > 1
  canScrollRight.value = maxScroll - el.scrollLeft > 1
}

function getFileScrollStep(el: HTMLElement) {
  const first = el.firstElementChild as HTMLElement | null
  if (!first) return el.clientWidth
  const gap = parseFloat(getComputedStyle(el).gap) || 8
  return first.offsetWidth + gap
}

function scrollFiles(direction: 'left' | 'right') {
  const el = refFileChips.value
  if (!el) return
  const step = getFileScrollStep(el)
  el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' })
}

function setupFileChipsObserver() {
  fileChipsObserver?.disconnect()
  const el = refFileChips.value
  if (!el) return
  fileChipsObserver = new ResizeObserver(() => updateFileScrollState())
  fileChipsObserver.observe(el)
}

function previewOf(file: UploadedFile): IFilePreview {
  return file.preview ?? {
    isImage: false,
    isVideo: false,
    isAudio: false,
    fileName: file.name,
    fileSize: '',
  }
}

const emojiMirrorHtml = computed(() =>
  textToAppleEmojiHtml(getMessage().text || '', selectionRange.value, emojiSrc.value)
)
const useEmojiMirror = computed(
  () => !isNative.value && textContainsEmoji(getMessage().text || '')
)

const syncMirrorScroll = () => {
  if (!refMirror.value || !refInput.value) return

  const el = refInput.value
  const mirror = refMirror.value
  const scrollbarWidth = Math.max(0, el.offsetWidth - el.clientWidth)

  mirror.style.right = scrollbarWidth > 0 ? `${scrollbarWidth}px` : ''
  mirror.scrollTop = el.scrollTop
}

let selectionSyncRaf = 0

function clearSelectionHighlight() {
  selectionRange.value = null
}

function snapTextareaCaret(prefer: 'before' | 'after' | 'nearest' = 'nearest') {
  const el = refInput.value
  if (!el || !useEmojiMirror.value) return

  const text = el.value
  const start = snapIndexToGrapheme(text, el.selectionStart, prefer)
  const end = snapIndexToGrapheme(text, el.selectionEnd, prefer)
  if (start !== el.selectionStart || end !== el.selectionEnd) {
    el.setSelectionRange(start, end)
  }
}

function snapCaretAndUpdateSelection() {
  snapTextareaCaret('nearest')
  updateSelectionState()
}

function tryStartEditLastSent(event: KeyboardEvent): boolean {
  const draft = getMessage()
  const el = refInput.value
  if (!canStartEditLastSent({
    key: event.key,
    altKey: event.altKey,
    metaKey: event.metaKey,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    hasResolver: typeof props.resolveEditLastSentMessage === 'function',
    disabled: props.state === 'disabled',
    isRecording: draft.isRecording,
    draftText: draft.text ?? '',
    replyMessageId: draft.reply?.messageId,
    editMessageId: draft.edit?.messageId,
    textareaText: el?.value ?? draft.text ?? '',
    selectionStart: el?.selectionStart ?? 0,
  })) return false

  const message = props.resolveEditLastSentMessage?.()
  if (!isEditableLastSentCandidate(message)) return false

  event.preventDefault()
  startEdit(buildEditPayload(message))
  return true
}

function onInputKeydown(event: KeyboardEvent) {
  if (tryStartEditLastSent(event)) return
  if (!useEmojiMirror.value) return
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  if (event.altKey || event.metaKey || event.ctrlKey) return

  const el = refInput.value
  if (!el) return

  const text = el.value
  const hasRange = el.selectionStart !== el.selectionEnd

  if (event.shiftKey) {
    // Расширение выделения — после браузера подровняем границы
    requestAnimationFrame(() => snapCaretAndUpdateSelection())
    return
  }

  if (hasRange) {
    event.preventDefault()
    const collapsed = event.key === 'ArrowLeft' ? el.selectionStart : el.selectionEnd
    const next =
      event.key === 'ArrowLeft'
        ? previousGraphemeIndex(text, collapsed)
        : nextGraphemeIndex(text, collapsed)
    el.setSelectionRange(next, next)
    updateSelectionState()
    return
  }

  event.preventDefault()
  const pos = el.selectionStart
  const next =
    event.key === 'ArrowLeft' ? previousGraphemeIndex(text, pos) : nextGraphemeIndex(text, pos)
  el.setSelectionRange(next, next)
  updateSelectionState()
}

function updateSelectionState() {
  if (!useEmojiMirror.value) {
    clearSelectionHighlight()
    return
  }

  if (selectionSyncRaf) cancelAnimationFrame(selectionSyncRaf)

  selectionSyncRaf = requestAnimationFrame(() => {
    selectionSyncRaf = 0
    const el = refInput.value
    if (!el) {
      clearSelectionHighlight()
      return
    }

    const start = el.selectionStart
    const end = el.selectionEnd
    if (start === end) {
      if (selectionRange.value !== null) {
        selectionRange.value = null
        nextTick(syncMirrorScroll)
      }
      return
    }

    const prev = selectionRange.value
    if (prev && prev.start === start && prev.end === end) return

    const mirrorScrollTop = refMirror.value?.scrollTop ?? 0
    selectionRange.value = { start, end }
    nextTick(() => {
      if (refMirror.value) refMirror.value.scrollTop = mirrorScrollTop
      syncMirrorScroll()
    })
  })
}

function onInputMouseMove(event: MouseEvent) {
  if (event.buttons) updateSelectionState()
}

function onDocumentSelectionChange() {
  if (document.activeElement === refInput.value) {
    updateSelectionState()
  }
}

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
  maxAttachedFiles: {
    type: Number,
    required: false,
    default: MAX_ATTACHED_FILES,
  },
  resolveEditLastSentMessage: {
    type: Function as PropType<ResolveEditLastSentMessage>,
    required: false,
    default: null,
  },
})

/** Только пояснение на белом фоне: без поля ввода, кнопок и send */
const showDisabledNotice = computed(
  () => props.state === 'disabled' && !!props.disabledPlaceholder,
)

const maxAttachedFiles = computed(() => {
  const n = Number(props.maxAttachedFiles)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : MAX_ATTACHED_FILES
})

provide('maxAttachedFiles', maxAttachedFiles)

const filesSelectedCount = computed(() =>
  t('component.ChatInput.FilesSelectedCount')
    .replace('{count}', String(attachedFiles.value.length))
    .replace('{max}', String(maxAttachedFiles.value))
)

const disabledSendButton = computed(() => {
  if (props.state == 'disabled') return true
  if (getMessage().text == '' && !attachedFiles.value.length) return true
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

function scheduleInputFocusAtEnd(clearFocusFlag = false) {
  nextTick(() => {
    if (clearFocusFlag && !focusAtEndAfterResize.value) return

    const el = refInput.value
    if (!el) return

    resizeTextarea(el)
    if (clearFocusFlag) {
      focusAtEndAfterResize.value = false
    }
    applyFocusAtEnd(el)
    requestAnimationFrame(() => applyFocusAtEnd(el))
  })
}

watch(
  () => getMessage().edit,
  (edit) => {
    if (edit?.messageId != null) {
      focusAtEndAfterResize.value = true
      scheduleInputFocusAtEnd(true)
    }
  }
)

watch(
  () => getMessage().reply,
  (reply) => {
    if (reply?.messageId != null) {
      scheduleInputFocusAtEnd()
    }
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
    const el = refInput.value
    if (!el) return

    resizeTextarea(el)

    if (focusAtEndAfterResize.value) {
      focusAtEndAfterResize.value = false
      applyFocusAtEnd(el)
      requestAnimationFrame(() => applyFocusAtEnd(el))
    }
  },
  { immediate: true, flush: 'post' }
);

watch(
  () => getMessage().id,
  () => {
    const el = refInput.value
    if (!el) return

    applySavedInputHeight(el)
    requestAnimationFrame(() => {
      const current = refInput.value
      if (current) resizeTextarea(current)
    })
  }
)

watch(useEmojiMirror, (enabled) => {
  if (!enabled) return

  nextTick(() => {
    const el = refInput.value
    if (!el) return

    const scrollTop = el.scrollTop
    resizeTextarea(el)
    el.scrollTop = scrollTop
    syncMirrorScroll()
    requestAnimationFrame(syncMirrorScroll)
  })
})

const INPUT_MIN_HEIGHT = 40
/** Невидимый маркер строки у max-height (без padding — не даёт прыжка текста). */
const TRAILING_LINE_MARK = '\u200b'

/** Скрытый textarea для замера высоты (как MUI TextareaAutosize). */
let heightMeasureTextarea: HTMLTextAreaElement | null = null

function getHeightMeasureTextarea(): HTMLTextAreaElement {
  if (heightMeasureTextarea) return heightMeasureTextarea
  const node = document.createElement('textarea')
  node.tabIndex = -1
  node.setAttribute('aria-hidden', 'true')
  for (const [prop, value] of Object.entries({
    position: 'absolute',
    visibility: 'hidden',
    height: '0',
    'min-height': '0',
    'max-height': 'none',
    overflow: 'hidden',
    'z-index': '-1000',
    top: '0',
    right: '0',
  })) {
    node.style.setProperty(prop, value, 'important')
  }
  document.body.appendChild(node)
  heightMeasureTextarea = node
  return node
}

function stripTrailingLineMarks(text: string): string {
  return text.split(TRAILING_LINE_MARK).join('')
}

function applySavedInputHeight(el: HTMLTextAreaElement) {
  const saved = getMessage().inputHeight
  el.style.height = (saved || INPUT_MIN_HEIGHT) + 'px'
  if (!saved || saved <= INPUT_MIN_HEIGHT) {
    el.style.overflowY = 'hidden'
  }
}

function persistInputHeight(el: HTMLTextAreaElement) {
  const height = parseFloat(el.style.height)
  if (!Number.isFinite(height)) return
  getMessage().inputHeight = height
}

function resizeTextarea(el: HTMLTextAreaElement) {
  const text = getMessage().text || ''
  if (el.clientWidth === 0) {
    applySavedInputHeight(el)
    return
  }
  // DOM и черновик на кадр могут разъехаться — не откатываем высоту
  if (el.value !== text) return

  const baseText = stripTrailingLineMarks(text)
  let nextHeight = INPUT_MIN_HEIGHT
  let overflowing = false

  if (baseText.trim()) {
    const cs = getComputedStyle(el)
    const borderX = (parseFloat(cs.borderLeftWidth) || 0) + (parseFloat(cs.borderRightWidth) || 0)
    const mirror = getHeightMeasureTextarea()
    // clientWidth учитывает scrollbar-gutter (режим PNG-эмодзи)
    mirror.style.boxSizing = 'border-box'
    mirror.style.width = `${el.clientWidth + borderX}px`
    mirror.style.font = cs.font
    mirror.style.letterSpacing = cs.letterSpacing
    mirror.style.lineHeight = cs.lineHeight
    mirror.style.padding = cs.padding
    mirror.style.border = cs.border
    mirror.style.whiteSpace = cs.whiteSpace
    mirror.style.wordBreak = cs.wordBreak
    mirror.style.overflowWrap = cs.overflowWrap
    // Хвостовой \n + пробел: пустая строка и ввод на ней дают одну высоту (MUI)
    mirror.value = baseText.endsWith('\n') ? `${baseText} ` : baseText

    let contentHeight = mirror.scrollHeight
    if (cs.boxSizing === 'border-box') {
      contentHeight += (parseFloat(cs.borderTopWidth) || 0)
        + (parseFloat(cs.borderBottomWidth) || 0)
    }
    const maxHeight = parseFloat(cs.maxHeight)
    const cap = Number.isFinite(maxHeight) && maxHeight > 0 ? maxHeight : contentHeight
    nextHeight = Math.max(INPUT_MIN_HEIGHT, Math.min(contentHeight, cap))
    overflowing = contentHeight > cap + 0.5
  }

  if (Math.abs(el.offsetHeight - nextHeight) >= 1) {
    el.style.height = `${nextHeight}px`
    persistInputHeight(el)
  }
  el.style.overflowY = overflowing ? 'auto' : 'hidden'

  // У потолка scrollHeight игнорирует голый \n — каретка «прыгает» в начало строки
  // (особенно с emoji-mirror). Маркер даёт высоту строки без padding и без лишней линии.
  const normalized = overflowing && baseText.endsWith('\n')
    ? baseText + TRAILING_LINE_MARK
    : baseText
  if (normalized !== text) {
    const keepBeforeMark = normalized.endsWith(TRAILING_LINE_MARK)
      ? normalized.length - 1
      : normalized.length
    setMessageText(normalized)
    el.value = normalized
    el.setSelectionRange(keepBeforeMark, keepBeforeMark)
  }

  if (overflowing && (el.selectionEnd ?? 0) >= baseText.length) {
    el.scrollTop = el.scrollHeight
  }
  syncMirrorScroll()
  if (useEmojiMirror.value) nextTick(syncMirrorScroll)
}

function applyFocusAtEnd(el: HTMLTextAreaElement) {
  if (props.state === 'disabled' || getMessage().isRecording) return

  const len = el.value.length
  el.focus()
  el.setSelectionRange(len, len)
  el.scrollTop = el.scrollHeight
  syncMirrorScroll()
}

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
  updateSelectionState()
}

watch(
  attachedFiles,
  (files, prev) => {
    nextTick(() => {
      setupFileChipsObserver()
      updateFileScrollState()
      const el = refFileChips.value
      if (el && files.length > (prev?.length ?? 0)) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
      }
    })
  },
  { flush: 'post' }
)

onMounted(() => {
  const el = refInput.value
  if (el) {
    applySavedInputHeight(el)
    resizeTextarea(el)
  }
  setupFileChipsObserver()
  updateFileScrollState()
  document.addEventListener('selectionchange', onDocumentSelectionChange)
});

onUnmounted(() => {
  messageDraftStore.commitChatDraftToList(ownedDraftId)
  document.removeEventListener('selectionchange', onDocumentSelectionChange)
  fileChipsObserver?.disconnect()
  if (selectionSyncRaf) cancelAnimationFrame(selectionSyncRaf)
  if (heightMeasureTextarea) {
    heightMeasureTextarea.remove()
    heightMeasureTextarea = null
  }
});

const keyEnter = (event: KeyboardEvent) => {
  if (event.shiftKey || event.ctrlKey) {
    if (refInput.value instanceof HTMLTextAreaElement) {
      const caret = refInput.value.selectionStart
      if (caret != null) {
        refInput.value.setRangeText('\n', caret, caret, 'end')
        setMessageText(refInput.value.value)
      }
    }
    event.preventDefault()
  } else {
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

function removeAttachedFile(index: number) {
  removeMessageFile(index)
}

function cancelEditMode() {
  resetEdit()
  setMessageText('')
  hideEditPreview(chatAppId as string)
  if (refInput.value) refInput.value.focus()
}

function isEditTextUnchanged(): boolean {
  const draft = getMessage()
  if (!draft.edit) return false
  return stripTrailingLineMarks(draft.text ?? '').trim()
    === stripTrailingLineMarks(draft.edit.text ?? '').trim()
}

const sendMessage = () => {
  const Message = ref(getMessage())

  if (Message.value.edit && isEditTextUnchanged() && !attachedFiles.value.length) {
    cancelEditMode()
    return
  }

  const plainText = stripTrailingLineMarks(Message.value.text ?? '')

  if (plainText != '' || attachedFiles.value.length) {
    const messageObject: IInputMessage = {
      type: '',
      text: '',
      url: '',
      filename: '',
      size: '',
      reply: undefined,
    };

    const files = attachedFiles.value
    if (files.length) {
      const caption = plainText.trim()
      files.forEach((file, index) => {
        const fileMessage: IInputMessage = {
          type: 'message.' + file.type,
          url: file.url,
          filename: file.name,
          size: file.size?.toString(),
          text: index === 0 ? caption : '',
        }
        if (index === 0) {
          if (Message.value.reply) fileMessage.reply = Message.value.reply
          if (Message.value.edit) fileMessage.edit = Message.value.edit
        }
        emit('send', fileMessage);
      })
    } else {
      messageObject.type = 'message.text';
      messageObject.text = plainText.trim();
      if (Message.value.reply){
        messageObject.reply = Message.value.reply
      }
      if (Message.value.edit) {
        messageObject.edit = Message.value.edit
      }
      emit('send', messageObject);
    }
    resetMessage()
    if (refInput.value) refInput.value.focus()
  }
};

</script>

<style scoped lang="scss">
@use './styles/ChatInput.scss';
</style>
