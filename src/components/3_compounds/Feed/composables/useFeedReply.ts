import { inject } from 'vue';
import { useMessageDraft, hideReplyPreview, useStartReply } from '@/hooks';
import { IFeedObject } from '@/types';

interface UseFeedReplyOptions {
  enableDoubleClickReply: boolean;
  emit: (event: 'messageAction' | 'clickRepliedMessage', payload: IFeedObject | string) => void;
}

/**
 * Композабл для обработки ответов на сообщения
 */
export function useFeedReply({ enableDoubleClickReply, emit }: UseFeedReplyOptions) {
  const chatAppId = inject('chatAppId') as string;
  const { getMessage, resetReply } = useMessageDraft(chatAppId);
  const { startReply } = useStartReply(chatAppId);

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
      startReply({
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
    hideReplyPreview(chatAppId);
  };

  return {
    getMessage,
    messageAction,
    handleClickReplied,
    feedObjectDoubleClick,
    handleResetReply,
  };
}

