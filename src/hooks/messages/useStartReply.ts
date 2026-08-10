import { useMessageDraft } from '@/hooks'
import type { Reply } from '@/types'

export function showReplyPreview(chatAppId: string) {
  const previewContainer = document.getElementById('chat-input-reply-line-' + chatAppId)
  if (previewContainer) {
    previewContainer.style.display = 'inherit'
  }
}

export function hideReplyPreview(chatAppId: string) {
  const previewContainer = document.getElementById('chat-input-reply-line-' + chatAppId)
  if (previewContainer) {
    previewContainer.style.display = 'none'
  }
}

export function useStartReply(chatAppId: string) {
  const { setReply, resetEdit, setMessageText, getMessage } = useMessageDraft(chatAppId)

  const startReply = (reply: Reply) => {
    // Ответ и редактирование взаимоисключающи
    if (getMessage().edit) {
      resetEdit()
      setMessageText('')
    }
    showReplyPreview(chatAppId)
    setReply(reply)
  }

  return { startReply }
}
