import { useMessageDraft } from '@/hooks'
import { hideReplyPreview, showReplyPreview } from '@/hooks/messages/useStartReply'
import type { Edit } from '@/types'

export function useStartEdit(chatAppId: string) {
  const { setEdit, setMessageText, resetReply } = useMessageDraft(chatAppId)

  const startEdit = (edit: Edit) => {
    resetReply()
    showReplyPreview(chatAppId)
    setEdit(edit)
    setMessageText(edit.text ?? '')
  }

  return { startEdit }
}

export function hideEditPreview(chatAppId: string) {
  hideReplyPreview(chatAppId)
}

export function showEditPreview(chatAppId: string) {
  showReplyPreview(chatAppId)
}
