<template>
  <div
    class="reply__container"
    :class="componentsClassMap(message?.type)"
    @click="onReply"
  >
    <component
      :is="componentsMap(message?.type)"
      :message="message"
    />
    <div class="reply__reset">
      <span
        class="pi pi-times"
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ReplyTextMessage,
  ReplyImageMessage,
  ReplyAudioMessage,
  ReplyVideoMessage,
  ReplyFileMessage,
  ReplyCallMessage,
} from '../'

import { IFeedObject } from '../../../types'

const emit = defineEmits(['action', 'reply', 'reset'])

const props = defineProps({
  message: {
    type: Object as () => IFeedObject,
  },
})

const onReply = () => {
  if (props.message) {
    emit('reply', props.message.messageId)
  }
}

const componentsMap = (type) => {
  const r = {
    'message.text': ReplyTextMessage,
    'message.image': ReplyImageMessage,
    'message.file': ReplyFileMessage,
    'message.audio': ReplyAudioMessage,
    'message.video': ReplyVideoMessage,
    'message.call': ReplyCallMessage,
  }
  return r[type]
}

const componentsClassMap = (type) => {
  const r = {
    'message.text': '',
    'message.image': 'grid',
    'message.file': 'grid',
    'message.audio': 'grid',
    'message.video': 'grid',
    'message.call': 'grid',
  }
  return r[type]
}
</script>

<style lang="scss">

</style>
