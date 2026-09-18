import {
  computed,
  getCurrentInstance,
  inject,
  provide,
  ref,
  unref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'
import { Edit, IFilePreview, Reply } from '@/types'

/** Максимум файлов, которые можно прикрепить к одному черновику */
export const MAX_ATTACHED_FILES = 5

/**
 * Структура сообщения с черновиком текста, файлами и метаданными
 */
export interface MessageDraftListFile {
  name: string
  type?: string
}

export interface MessageDraft {
  id: string
  text: string
  file?: UploadedFile
  files?: UploadedFile[]
  reply?: Reply
  edit?: Edit
  forceSend: boolean
  isRecording: boolean
  inputHeight?: number
  listPreviewText?: string
  listPreviewFile?: MessageDraftListFile
}

export interface UploadedFile {
  url: string
  name?: string
  size?: number
  type?: string
  preview?: IFilePreview
}

/** Файлы черновика с учётом старого поля `file` */
export function getDraftFiles(draft: MessageDraft | undefined): UploadedFile[] {
  if (!draft) return []
  if (draft.files?.length) return draft.files
  return draft.file ? [draft.file] : []
}

function withFiles(
  files: UploadedFile[],
  max: number = MAX_ATTACHED_FILES,
): Pick<MessageDraft, 'file' | 'files'> {
  const cap = Number.isFinite(max) && max > 0 ? Math.floor(max) : MAX_ATTACHED_FILES
  const next = files.slice(0, cap)
  if (!next.length) {
    return { file: undefined, files: undefined }
  }
  return { files: next, file: next[0] }
}

type SelectedChatLike = { chatId?: string | number } | null | undefined

function createEmptyDraft(id: string): MessageDraft {
  return {
    id,
    text: '',
    file: undefined,
    forceSend: false,
    isRecording: false,
  }
}

function toListPreviewText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function commitDraftToChatList(draft: MessageDraft | undefined) {
  if (!draft) return
  if (draft.edit) {
    draft.listPreviewText = undefined
    draft.listPreviewFile = undefined
    return
  }

  const preview = toListPreviewText(draft.text || '')
  draft.listPreviewText = preview || undefined

  const attached = getDraftFiles(draft)
  const first = attached[0]
  const fileName = first?.name || first?.preview?.fileName || ''
  draft.listPreviewFile = first
    ? { name: fileName, type: first.type }
    : undefined
}

function hasLiveDraftContent(draft: MessageDraft) {
  return Boolean(toListPreviewText(draft.text || '') || getDraftFiles(draft).length)
}

function clearDraftListPreview(draft: MessageDraft) {
  draft.listPreviewText = undefined
  draft.listPreviewFile = undefined
}

function syncDraftPreviews(chatAppId: string, message: MessageDraft) {
  if (typeof document === 'undefined') return

  const replyLine = document.getElementById('chat-input-reply-line-' + chatAppId)
  if (replyLine) {
    replyLine.style.display = message.reply || message.edit ? 'inherit' : 'none'
  }
}

/** Instance-scoped хранилище черновиков (один на BaseContainer / FloatContainer) */
export type MessageDraftStore = {
  messages: Ref<MessageDraft[]>
  ensureDraft: (id: string) => MessageDraft
  getChatDraft: (
    chatAppId: string,
    chatId: string | number | null | undefined,
  ) => MessageDraft | undefined
  commitChatDraftToList: (draftId: string | undefined) => void
}

export const messageDraftStoreKey: InjectionKey<MessageDraftStore> = Symbol('chottoMessageDraftStore')

/** Fallback для тестов / вызовов вне дерева контейнера (ключ — outId / chatAppId) */
const fallbackStores = new Map<string, MessageDraftStore>()

export function createMessageDraftStore(): MessageDraftStore {
  const messages = ref<MessageDraft[]>([])

  const ensureDraft = (id: string): MessageDraft => {
    const found = messages.value.find((message) => message.id === id)
    if (found) return found

    const created = createEmptyDraft(id)
    messages.value.push(created)
    return created
  }

  const getChatDraft = (
    chatAppId: string,
    chatId: string | number | null | undefined,
  ): MessageDraft | undefined => {
    if (chatId === undefined || chatId === null || chatId === '') return undefined
    return messages.value.find((message) => message.id === `${chatAppId}:${chatId}`)
  }

  const commitChatDraftToListFn = (draftId: string | undefined) => {
    if (!draftId) return
    commitDraftToChatList(messages.value.find((message) => message.id === draftId))
  }

  return {
    messages,
    ensureDraft,
    getChatDraft,
    commitChatDraftToList: commitChatDraftToListFn,
  }
}

function getFallbackStore(outId: string): MessageDraftStore {
  const key = outId || '__default__'
  let store = fallbackStores.get(key)
  if (!store) {
    store = createMessageDraftStore()
    fallbackStores.set(key, store)
  }
  return store
}

/**
 * Создаёт store и provide'ит в текущем компоненте (BaseContainer / FloatContainer).
 */
export function provideMessageDraftStore(): MessageDraftStore {
  const store = createMessageDraftStore()
  provide(messageDraftStoreKey, store)
  return store
}

/**
 * Resolve store: inject из контейнера, иначе fallback по outId (тесты / вне дерева).
 */
export function resolveMessageDraftStore(outId?: string): MessageDraftStore {
  if (getCurrentInstance()) {
    const injected = inject(messageDraftStoreKey, null)
    if (injected) return injected
  }

  if (outId) return getFallbackStore(outId)

  // Ищем draft по всем fallback-store (для commitChatDraftToList без outId)
  return getFallbackStore('__default__')
}

/**
 * Lookup черновика контакта. Предпочтительно: resolveMessageDraftStore() в setup,
 * затем store.getChatDraft() внутри computed (inject внутри computed ненадёжен).
 */
export function getChatDraft(
  chatAppId: string,
  chatId: string | number | null | undefined,
): MessageDraft | undefined {
  return resolveMessageDraftStore(chatAppId).getChatDraft(chatAppId, chatId)
}

export function commitChatDraftToList(draftId: string | undefined) {
  if (!draftId) return

  if (getCurrentInstance()) {
    const injected = inject(messageDraftStoreKey, null)
    if (injected) {
      injected.commitChatDraftToList(draftId)
      return
    }
  }

  for (const store of fallbackStores.values()) {
    if (store.messages.value.some((m) => m.id === draftId)) {
      store.commitChatDraftToList(draftId)
      return
    }
  }

  getFallbackStore('__default__').commitChatDraftToList(draftId)
}

/**
 * Composable для управления состоянием черновика сообщения в конкретном чате.
 * Store — instance-scoped через provide в BaseContainer / FloatContainer.
 *
 * @param outId - Уникальный идентификатор чата (chatAppId)
 */
export const useMessageDraft = (outId: string) => {
  const store = resolveMessageDraftStore(outId)
  const { messages, ensureDraft } = store

  const selectedChat = getCurrentInstance()
    ? inject<Ref<SelectedChatLike> | SelectedChatLike>('selectedChat', undefined)
    : undefined

  const draftId = computed(() => {
    const chat = selectedChat ? unref(selectedChat) : undefined
    const chatId = chat?.chatId
    if (chatId === undefined || chatId === null || chatId === '') {
      return outId
    }
    return `${outId}:${chatId}`
  })

  watch(
    draftId,
    (id, prevId) => {
      const message = ensureDraft(id)
      if (prevId !== undefined && prevId !== id) {
        const previous = messages.value.find((item) => item.id === prevId)
        commitDraftToChatList(previous)
        syncDraftPreviews(outId, message)
      }
    },
    { immediate: true },
  )

  watch(
    () => {
      const current = getMessage()
      return [current.text, current.file, current.files?.length] as const
    },
    () => {
      const current = getMessage()
      if (current.edit) return
      if (!hasLiveDraftContent(current)) {
        clearDraftListPreview(current)
        return
      }
      if (!getDraftFiles(current).length) {
        current.listPreviewFile = undefined
      }
      if (!toListPreviewText(current.text || '')) {
        current.listPreviewText = undefined
      }
    },
  )

  const getMessageIndex = () => {
    const id = draftId.value
    const index = messages.value.findIndex((message) => message.id === id)
    if (index !== -1) return index

    ensureDraft(id)
    return messages.value.findIndex((message) => message.id === id)
  }

  const resetMessage = () => {
    const current = getMessage()
    messages.value[getMessageIndex()] = {
      id: current.id,
      text: '',
      file: undefined,
      files: undefined,
      reply: undefined,
      edit: undefined,
      forceSend: false,
      isRecording: current.isRecording,
    }
  }

  const patchMessage = (patch: Partial<Omit<MessageDraft, 'id'>>) => {
    const current = getMessage()
    messages.value[getMessageIndex()] = {
      ...current,
      forceSend: false,
      ...patch,
      id: current.id,
    }
  }

  const setMessageText = (text: string) => {
    patchMessage({ text })
  }

  const setMessageFile = (file: UploadedFile) => {
    patchMessage(withFiles([file]))
  }

  const addMessageFiles = (files: UploadedFile[], max: number = MAX_ATTACHED_FILES) => {
    if (!files.length) return
    patchMessage(withFiles([...getDraftFiles(getMessage()), ...files], max))
  }

  const removeMessageFile = (index: number) => {
    const remaining = getDraftFiles(getMessage()).filter((_, i) => i !== index)
    patchMessage(withFiles(remaining, remaining.length || MAX_ATTACHED_FILES))
  }

  const resetMessageFile = () => {
    patchMessage(withFiles([]))
  }

  const setReply = (reply: Reply) => {
    patchMessage({ reply, edit: undefined })
  }

  const resetReply = () => {
    patchMessage({ reply: undefined })
  }

  const setEdit = (edit: Edit) => {
    patchMessage({ edit, reply: undefined })
  }

  const resetEdit = () => {
    patchMessage({ edit: undefined })
  }

  function getMessage(): MessageDraft {
    return ensureDraft(draftId.value)
  }

  const setForceSendMessage = (val: boolean) => {
    getMessage().forceSend = val
  }

  const setRecordingMessage = (val: boolean) => {
    getMessage().isRecording = val
  }

  return {
    getMessage,
    resetMessage,
    setMessageFile,
    addMessageFiles,
    removeMessageFile,
    resetMessageFile,
    setMessageText,
    setReply,
    resetReply,
    setEdit,
    resetEdit,
    setForceSendMessage,
    setRecordingMessage,
  }
}
