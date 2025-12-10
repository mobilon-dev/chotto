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

/**
 * Композабл для маппинга типов сообщений на компоненты
 */
export function useFeedComponents() {
  const componentsMap = (type: string) => {
    const r: Record<string, unknown> = {
      'message.text': TextMessage,
      'message.image': ImageMessage,
      'message.file': FileMessage,
      'message.audio': AudioMessage,
      'message.video': VideoMessage,
      'message.call': CallMessage,
      'message.sticker': StickerMessage,
      'message.system': SystemMessage,
      'system.date': DateMessage,
      'message.typing': TypingMessage,
      'message.delimiter': DelimiterMessage
    };
    return r[type];
  };

  return {
    componentsMap,
  };
}

