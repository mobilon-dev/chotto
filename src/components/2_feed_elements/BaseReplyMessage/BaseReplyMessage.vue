<template>
  <div
    class="reply__container"
    :class="componentsClassMap(message?.type || '')"
    @click="onReply"
  >
    <component
      :is="componentsMap(message?.type || '')"
      :message="message"
    />
    <div class="reply__reset">
      <span
        class="pi pi-times "
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import ReplyTextMessage from '@/components/2_feed_elements/ReplyTextMessage/ReplyTextMessage.vue';
import ReplyImageMessage from '@/components/2_feed_elements/ReplyImageMessage/ReplyImageMessage.vue';
import ReplyStickerMessage from '@/components/2_feed_elements/ReplyStickerMessage/ReplyStickerMessage.vue';
import ReplyAudioMessage from '@/components/2_feed_elements/ReplyAudioMessage/ReplyAudioMessage.vue';
import ReplyVideoMessage from '@/components/2_feed_elements/ReplyVideoMessage/ReplyVideoMessage.vue';
import ReplyFileMessage from '@/components/2_feed_elements/ReplyFileMessage/ReplyFileMessage.vue';
import ReplyCallMessage from '@/components/2_feed_elements/ReplyCallMessage/ReplyCallMessage.vue';
import { IFeedObject } from '@/types';

const emit = defineEmits(['action', 'reply', 'reset']);

const props = defineProps({
  message: {
    type: Object as () => IFeedObject,
    default: () => ({} as IFeedObject)
  }
});


const onReply = () => {
  if (props.message){
    emit('reply',props.message.messageId)
  }
}

const componentsMap = (type: string) => {
  const r: Record<string, unknown> = {
    'message.text': ReplyTextMessage,
    'message.image': ReplyImageMessage,
    'message.sticker': ReplyStickerMessage,
    'message.file': ReplyFileMessage,
    'message.audio': ReplyAudioMessage,
    'message.video': ReplyVideoMessage,
    'message.call': ReplyCallMessage,
  };
  return r[type];
}

const componentsClassMap = (type: string) => {
  const r: Record<string, string> = {
    'message.text': '',
    'message.image': 'grid',
    'message.sticker': 'grid',
    'message.file': 'grid',
    'message.audio': 'grid',
    'message.video': 'grid',
    'message.call': 'grid',
  }
  return r[type]
}


</script>

<style scoped lang="scss">
@use './styles/BaseReplyMessage.scss';
</style>
