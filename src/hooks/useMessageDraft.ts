import { computed, getCurrentInstance, inject, ref, unref, watch, type Ref } from 'vue';
import { Edit, IFilePreview, Reply } from '@/types';

/**
 * Структура сообщения с черновиком текста, файлами и метаданными
 * @interface MessageDraft
 * @property {string} id - Уникальный идентификатор сообщения (обычно chatAppId)
 * @property {string} text - Текст сообщения
 * @property {UploadedFile} [file] - Прикрепленный файл
 * @property {Reply} [reply] - Ответ на другое сообщение
 * @property {Edit} [edit] - Редактируемое сообщение
 * @property {boolean} forceSend - Флаг принудительной отправки сообщения
 * @property {boolean} isRecording - Флаг активной записи (аудио/видео)
 * @property {number} [inputHeight] - Высота поля ввода для этого черновика
 * @property {string} [listPreviewText] - Снимок текста черновика для списка чатов
 * @property {MessageDraftListFile} [listPreviewFile] - Снимок прикреплённого файла для списка чатов
 */
export interface MessageDraftListFile {
    name: string
    type?: string
}

export interface MessageDraft {
    id: string
    text: string
    file?: UploadedFile
    reply?: Reply
    edit?: Edit
    forceSend: boolean
    isRecording: boolean
    inputHeight?: number
    listPreviewText?: string
    listPreviewFile?: MessageDraftListFile
}

/**
 * Структура загруженного файла
 * @interface UploadedFile
 * @property {string} url - URL файла
 * @property {string} [name] - Имя файла
 * @property {number} [size] - Размер файла в байтах
 * @property {string} [type] - MIME-тип файла
 * @property {IFilePreview} [preview] - Превью для строки файла в ChatInput
 */
interface UploadedFile{
    url: string
    name?: string
    size?: number
    type?: string
    preview?: IFilePreview
}

/**
 * Глобальное хранилище черновиков сообщений для всех чатов
 * @private
 */
const messages = ref<MessageDraft[]>([])

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

function ensureDraft(id: string): MessageDraft {
    const found = messages.value.find((message) => message.id === id)
    if (found) return found

    const created = createEmptyDraft(id)
    messages.value.push(created)
    return created
}

export function getChatDraft(chatAppId: string, chatId: string | number | null | undefined): MessageDraft | undefined {
    if (chatId === undefined || chatId === null || chatId === '') return undefined
    return messages.value.find((message) => message.id === `${chatAppId}:${chatId}`)
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

    const fileName = draft.file?.name || draft.file?.preview?.fileName || ''
    draft.listPreviewFile = draft.file
        ? { name: fileName, type: draft.file.type }
        : undefined
}

export function commitChatDraftToList(draftId: string | undefined) {
    if (!draftId) return
    commitDraftToChatList(messages.value.find((message) => message.id === draftId))
}

function syncDraftPreviews(chatAppId: string, message: MessageDraft) {
    if (typeof document === 'undefined') return

    const replyLine = document.getElementById('chat-input-reply-line-' + chatAppId)
    if (replyLine) {
        replyLine.style.display = (message.reply || message.edit) ? 'inherit' : 'none'
    }
}

/**
 * Composable для управления состоянием черновика сообщения в конкретном чате
 * 
 * для ChatInput компонента
 * 
 * Предоставляет методы для работы с текстом, файлами, ответами и флагами сообщения.
 * Автоматически создает новый черновик, если сообщение с указанным ID не существует.
 * Черновики разделяются по контакту (selectedChat.chatId): при переключении
 * на другого контакта текст не переносится, а при возврате восстанавливается.
 * Переключение диалога внутри контакта (MAX → TG) сохраняет тот же черновик.
 * 
 * @param {string} outId - Уникальный идентификатор чата (chatAppId)
 * 
 * @returns {Object} Методы для управления сообщением
 * @returns {Function} returns.getMessage - Получить текущее состояние сообщения
 * @returns {Function} returns.resetMessage - Сбросить сообщение (очистить текст, файл, ответ)
 * @returns {Function} returns.setMessageText - Установить текст сообщения
 * @returns {Function} returns.setMessageFile - Установить прикрепленный файл
 * @returns {Function} returns.resetMessageFile - Удалить прикрепленный файл
 * @returns {Function} returns.setReply - Установить ответ на сообщение
 * @returns {Function} returns.resetReply - Удалить ответ на сообщение
 * @returns {Function} returns.setEdit - Установить редактируемое сообщение
 * @returns {Function} returns.resetEdit - Сбросить режим редактирования
 * @returns {Function} returns.setForceSendMessage - Установить флаг принудительной отправки
 * @returns {Function} returns.setRecordingMessage - Установить флаг записи
 * 
 * @example
 * // Базовое использование в компоненте
 * import { useMessageDraft } from '@/hooks';
 * 
 * const chatAppId = 'chat-123';
 * const { getMessage, setMessageText, setMessageFile, resetMessage } = useMessageDraft(chatAppId);
 * 
 * // Установить текст
 * setMessageText('Привет!');
 * 
 * // Добавить файл
 * setMessageFile({
 *   url: 'https://example.com/file.pdf',
 *   name: 'document.pdf',
 *   size: 1024,
 *   type: 'application/pdf'
 * });
 * 
 * // Получить текущее состояние
 * const currentMessage = getMessage();
 * console.log(currentMessage.text, currentMessage.file);
 * 
 * // Очистить сообщение после отправки
 * resetMessage();
 * 
 * @example
 * // Работа с ответами
 * const { setReply, resetReply } = useMessageDraft(chatAppId);
 * 
 * setReply({
 *   id: 'msg-456',
 *   text: 'Исходное сообщение',
 *   authorName: 'Иван'
 * });
 * 
 * // Удалить ответ
 * resetReply();
 */
export const useMessageDraft = (outId : string) => {

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
        { immediate: true }
    )

    const getMessageIndex = () => {
        const id = draftId.value
        const index = messages.value.findIndex((message) => message.id === id)
        if (index !== -1) return index

        ensureDraft(id)
        return messages.value.findIndex((message) => message.id === id)
    }
    
/**================================================================ */

    /**
     * Сбросить сообщение в начальное состояние
     * Очищает текст, файл и ответ, но сохраняет ID и флаг записи
     * 
     * @returns {void}
     */
    const resetMessage = () => {
        const current = getMessage()
        messages.value[getMessageIndex()] = {
            id: current.id,
            text: '',
            file: undefined,
            reply: undefined,
            edit: undefined,
            forceSend: false,
            isRecording: current.isRecording,
        }
    }

    /** Снимок полей черновика с возможностью точечной перезаписи */
    const patchMessage = (patch: Partial<Omit<MessageDraft, 'id'>>) => {
        const current = getMessage()
        messages.value[getMessageIndex()] = {
            ...current,
            forceSend: false,
            ...patch,
            id: current.id,
        }
    }

    /**
     * Установить текст сообщения
     * Обновляет только текст, сохраняя остальные поля
     * 
     * @param {string} text - Текст сообщения
     * @returns {void}
     */
    const setMessageText = (text : string) => {
        patchMessage({ text })
    }

    /**
     * Установить прикрепленный файл к сообщению
     * Обновляет только файл, сохраняя остальные поля
     * 
     * @param {UploadedFile} file - Объект с данными загруженного файла
     * @returns {void}
     */
    const setMessageFile = (file : UploadedFile) => {
        patchMessage({ file })
    }

    /**
     * Удалить прикрепленный файл из сообщения
     * Сохраняет текст, ответ и другие поля
     * 
     * @returns {void}
     */
    const resetMessageFile = () => {
        patchMessage({ file: undefined })
    }

    /**
     * Установить ответ на другое сообщение
     * Добавляет контекст ответа к текущему сообщению
     * 
     * @param {Reply} reply - Объект с данными сообщения, на которое отвечаем
     * @returns {void}
     */
    const setReply = (reply : Reply) => {
        patchMessage({ reply, edit: undefined })
    }

    /**
     * Удалить ответ из сообщения
     * Сохраняет текст, файл и другие поля
     * 
     * @returns {void}
     */
    const resetReply = () => {
        patchMessage({ reply: undefined })
    }

    /**
     * Установить сообщение в режим редактирования
     * Сбрасывает ответ — режимы взаимоисключающи
     * 
     * @param {Edit} edit - Объект редактируемого сообщения
     * @returns {void}
     */
    const setEdit = (edit: Edit) => {
        patchMessage({ edit, reply: undefined })
    }

    /**
     * Сбросить режим редактирования
     * 
     * @returns {void}
     */
    const resetEdit = () => {
        patchMessage({ edit: undefined })
    }

    /**
     * Получить текущее состояние сообщения
     * Возвращает полный объект сообщения со всеми полями
     * 
     * @returns {MessageDraft} Текущее сообщение с текстом, файлом, ответом и флагами
     */
    function getMessage (): MessageDraft {
        return ensureDraft(draftId.value)
    }

    /**
     * Установить флаг принудительной отправки сообщения
     * Используется для отправки сообщения независимо от других условий
     * 
     * @param {boolean} val - Значение флага принудительной отправки
     * @returns {void}
     */
    const setForceSendMessage = (val : boolean) => {
        getMessage().forceSend = val
    } 

    /**
     * Установить флаг записи (аудио/видео)
     * Используется для индикации активного процесса записи
     * 
     * @param {boolean} val - Значение флага записи (true - идет запись, false - запись остановлена)
     * @returns {void}
     */
    const setRecordingMessage = (val : boolean) => {
        getMessage().isRecording = val
    } 

    return {
        getMessage,
        resetMessage,
        setMessageFile,
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


