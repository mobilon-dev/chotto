import type { IFeedMessageMenuAction } from '@/types'
import ReplyIcon from '@/components/2_feed_elements/MessageReactions/icons/ReplyIcon.vue'
import EditIcon from '@/components/2_feed_elements/MessageReactions/icons/EditIcon.vue'
import DeleteIcon from '@/components/2_feed_elements/MessageReactions/icons/DeleteIcon.vue'

/** Пункты меню сообщения по умолчанию: Ответить, Редактировать | Удалить */
export function getDefaultMessageMenuActions(): IFeedMessageMenuAction[] {
  return [
    {
      action: 'reply',
      title: 'Ответить',
      icon: ReplyIcon as unknown as object,
    },
    {
      action: 'edit',
      title: 'Редактировать',
      icon: EditIcon as unknown as object,
      // Чужие (левые) сообщения редактировать нельзя
      disabled: (message) => message.position !== 'right',
    },
    { separator: true },
    {
      action: 'delete',
      title: 'Удалить',
      icon: DeleteIcon as unknown as object,
      danger: true,
    },
  ]
}
