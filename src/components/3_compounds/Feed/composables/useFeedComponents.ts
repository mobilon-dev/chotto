import {
  AudioMessage,
  CallMessage,
  FileMessage,
  ImageMessage,
  TextMessage,
  VideoMessage,
  DateMessage,
  SystemMessage,
  TypingMessage,
  StickerMessage,
} from '@/components';

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
    };
    return r[type];
  };

  return {
    componentsMap,
  };
}

