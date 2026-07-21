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
  const { setReply } = useMessageDraft(chatAppId)

  const startReply = (reply: Reply) => {
    showReplyPreview(chatAppId)
    setReply(reply)
  }

  return { startReply }
}
