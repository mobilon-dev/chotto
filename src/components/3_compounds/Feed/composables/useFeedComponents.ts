import AudioMessage from '@/components/2_feed_elements/AudioMessage/AudioMessage.vue';
import CallMessage from '@/components/2_feed_elements/CallMessage/CallMessage.vue';
import FileMessage from '@/components/2_feed_elements/FileMessage/FileMessage.vue';
import ImageMessage from '@/components/2_feed_elements/ImageMessage/ImageMessage.vue';
import TextMessage from '@/components/2_feed_elements/TextMessage/TextMessage.vue';
import VideoMessage from '@/components/2_feed_elements/VideoMessage/VideoMessage.vue';
import DateMessage from '@/components/2_feed_elements/DateMessage/DateMessage.vue';
import SystemMessage from '@/components/2_feed_elements/SystemMessage/SystemMessage.vue';
import TypingMessage from '@/components/2_feed_elements/TypingMessage/TypingMessage.vue';
import StickerMessage from '@/components/2_feed_elements/StickerMessage/StickerMessage.vue';
import DelimiterMessage from '@/components/2_feed_elements/DelimiterMessage/DelimiterMessage.vue';
import MissedCallMessage from '@/components/2_feed_elements/MissedCallMessage/MissedCallMessage.vue';

const MESSAGE_COMPONENTS: Record<string, unknown> = {
  'message.text': TextMessage,
  'message.image': ImageMessage,
  'message.file': FileMessage,
  'message.audio': AudioMessage,
  'message.video': VideoMessage,
  'message.call': CallMessage,
  'message.missedCall': MissedCallMessage,
  'message.sticker': StickerMessage,
  'message.system': SystemMessage,
  'system.date': DateMessage,
  'message.typing': TypingMessage,
  'message.delimiter': DelimiterMessage,
}

const DELETED_AS_TEXT_TYPES = new Set([
  'message.text',
  'message.image',
  'message.file',
  'message.audio',
  'message.video',
  'message.call',
  'message.missedCall',
  'message.sticker',
])

/**
 * Композабл для маппинга типов сообщений на компоненты.
 * Удалённые сообщения ленты всегда рендерятся как TextMessage.
 */
export function useFeedComponents() {
  const componentsMap = (object: { type?: string; deleted?: boolean } | string) => {
    // Обратная совместимость: раньше передавали только type
    if (typeof object === 'string') {
      return MESSAGE_COMPONENTS[object]
    }

    const type = object.type ?? ''
    if (object.deleted && DELETED_AS_TEXT_TYPES.has(type)) {
      return TextMessage
    }

    return MESSAGE_COMPONENTS[type]
  }

  return {
    componentsMap,
  }
}
