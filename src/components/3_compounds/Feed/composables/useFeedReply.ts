import { inject } from 'vue';
import { useMessageDraft } from '@/hooks';
import { IFeedObject } from '@/types';

interface UseFeedReplyOptions {
  enableDoubleClickReply: boolean;
  emit: (event: 'messageAction' | 'clickRepliedMessage', payload: IFeedObject | string) => void;
}

/**
 * Композабл для обработки ответов на сообщения
 */
export function useFeedReply({ enableDoubleClickReply, emit }: UseFeedReplyOptions) {
  const chatAppId = inject('chatAppId');
  const { setReply, getMessage, resetReply } = useMessageDraft(chatAppId as string);

  /**
   * Обработчик действия с сообщением
   */
  const messageAction = (message: IFeedObject) => {
    emit('messageAction', message);
  };

  /**
   * Обработчик клика на ответное сообщение
   */
  const handleClickReplied = (messageId: string) => {
    emit('clickRepliedMessage', messageId);
  };

  /**
   * Обработчик двойного клика для ответа
   */
  const feedObjectDoubleClick = (event: MouseEvent, object: IFeedObject) => {
    if (!enableDoubleClickReply) return;

    event?.preventDefault();

    // Проверяем, что это не системное сообщение
    if (object.type.indexOf('system') === -1 && object.type.indexOf('typing') === -1) {
      const previewContainer = document.getElementById('chat-input-reply-line-' + chatAppId);
      
      if (previewContainer) {
        previewContainer.style.display = 'inherit';
      }

      setReply({
        messageId: object.messageId,
        type: object.type,
        text: object.text,
        filename: object.filename,
        url: object.url,
        header: object.header,
        callDuration: object.callDuration,
      });
    }
  };

  /**
   * Обработчик сброса ответа
   */
  const handleResetReply = () => {
    resetReply();
    
    const previewContainer = document.getElementById('chat-input-reply-line-' + chatAppId);
    if (previewContainer) {
      previewContainer.style.display = 'none';
    }
  };

  return {
    getMessage,
    messageAction,
    handleClickReplied,
    feedObjectDoubleClick,
    handleResetReply,
  };
}

