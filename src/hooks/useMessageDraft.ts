import { ref } from 'vue';
import { Reply } from '@/types';

/**
 * Структура сообщения с черновиком текста, файлами и метаданными
 * @interface Message
 * @property {string} id - Уникальный идентификатор сообщения (обычно chatAppId)
 * @property {string} text - Текст сообщения
 * @property {UploadedFile} [file] - Прикрепленный файл
 * @property {Reply} [reply] - Ответ на другое сообщение
 * @property {boolean} forceSend - Флаг принудительной отправки сообщения
 * @property {boolean} isRecording - Флаг активной записи (аудио/видео)
 */
interface Message {
    id: string
    text: string
    file?: UploadedFile
    reply?: Reply
    forceSend: boolean
    isRecording: boolean
}

/**
 * Структура загруженного файла
 * @interface UploadedFile
 * @property {string} url - URL файла
 * @property {string} [name] - Имя файла
 * @property {number} [size] - Размер файла в байтах
 * @property {string} [type] - MIME-тип файла
 */
interface UploadedFile{
    url: string
    name?: string
    size?: number
    type?: string
}

/**
 * Глобальное хранилище черновиков сообщений для всех чатов
 * @private
 */
const messages = ref<Message[]>([])

/**
 * Composable для управления состоянием черновика сообщения в конкретном чате
 * 
 * для ChatInput компонента
 * 
 * Предоставляет методы для работы с текстом, файлами, ответами и флагами сообщения.
 * Автоматически создает новый черновик, если сообщение с указанным ID не существует.
 * Поддерживает множественные экземпляры для разных чатов одновременно.
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

    const index = ref<number>(0)

    const foundMessage = messages.value.find(({id}) => id == outId)
    if (foundMessage != undefined){
        index.value = messages.value.indexOf(foundMessage)
    } 
    else {
        messages.value.push({
            id: outId,
            text: '',
            file: undefined,
            forceSend: false,
            isRecording: false
        })
        index.value = messages.value.length - 1
    }
    
/**================================================================ */

    /**
     * Сбросить сообщение в начальное состояние
     * Очищает текст, файл и ответ, но сохраняет ID и флаг записи
     * 
     * @returns {void}
     */
    const resetMessage = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: '',
            file: undefined,
            reply: undefined,
            forceSend: false,
            isRecording: getMessage().isRecording,
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
        messages.value[index.value] = {
            id: getMessage().id,
            text: text,
            file: getMessage().file,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    /**
     * Установить прикрепленный файл к сообщению
     * Обновляет только файл, сохраняя остальные поля
     * 
     * @param {UploadedFile} file - Объект с данными загруженного файла
     * @returns {void}
     */
    const setMessageFile = (file : UploadedFile) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: file,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    /**
     * Удалить прикрепленный файл из сообщения
     * Сохраняет текст, ответ и другие поля
     * 
     * @returns {void}
     */
    const resetMessageFile = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: undefined,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    /**
     * Установить ответ на другое сообщение
     * Добавляет контекст ответа к текущему сообщению
     * 
     * @param {Reply} reply - Объект с данными сообщения, на которое отвечаем
     * @returns {void}
     */
    const setReply = (reply : Reply) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    /**
     * Удалить ответ из сообщения
     * Сохраняет текст, файл и другие поля
     * 
     * @returns {void}
     */
    const resetReply = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: undefined,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    /**
     * Получить текущее состояние сообщения
     * Возвращает полный объект сообщения со всеми полями
     * 
     * @returns {Message} Текущее сообщение с текстом, файлом, ответом и флагами
     */
    function getMessage () {
        return messages.value[index.value]
    }

    /**
     * Установить флаг принудительной отправки сообщения
     * Используется для отправки сообщения независимо от других условий
     * 
     * @param {boolean} val - Значение флага принудительной отправки
     * @returns {void}
     */
    const setForceSendMessage = (val : boolean) => {
        messages.value[index.value].forceSend = val
    } 

    /**
     * Установить флаг записи (аудио/видео)
     * Используется для индикации активного процесса записи
     * 
     * @param {boolean} val - Значение флага записи (true - идет запись, false - запись остановлена)
     * @returns {void}
     */
    const setRecordingMessage = (val : boolean) => {
        messages.value[index.value].isRecording = val
    } 

    return {
        getMessage,
        resetMessage,
        setMessageFile,
        resetMessageFile,
        setMessageText,
        setReply,
        resetReply,
        setForceSendMessage,
        setRecordingMessage,
    }
}


