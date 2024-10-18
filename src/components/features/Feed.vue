<template>
  <div
    ref="refFeed"
    class="message-feed"
  >
    <div class="message-feed__container">
      <component
        :is="componentsMap(object.type)"
        v-for="object in objects"
        :key="object.messageId"
        class="message-feed__message"
        :message="object"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick, onUpdated } from 'vue';

import FileMessage from "../messages/FileMessage.vue";
import ImageMessage from "../messages/ImageMessage2.vue";
import TextMessage from "../messages/TextMessage.vue";
import DateMessage from '../messages/DateMessage.vue';
import AudioMessage from '../messages/AudioMessage.vue';
import VideoMessage from '../messages/VideoMessage.vue'
import CallMessage from '../messages/CallMessage.vue'

const refFeed = ref(null);

// Define props
const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
});

// Register components
const componentsMap = (type) => {
  const r = {
    'message.text': TextMessage,
    'message.image': ImageMessage,
    'message.file': FileMessage,
    'message.audio': AudioMessage,
    'message.video': VideoMessage,
    'message.call': CallMessage,
    'system.date': DateMessage,
  };
  return r[type];
}

function scrollToFeedBottom() {
  nextTick(function () {
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

onUpdated(() => scrollToFeedBottom);
watch(() => props.objects, scrollToFeedBottom);

</script>

<style
  scoped
  lang="scss"
>
.message-feed {
  height: fit-content;
  margin-top: auto;

  overflow-y: auto;

  &__message {
    position: relative;
  }

  &__menu-button {
    position: absolute;
    left: 0;
    top: 50%;
  }


  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--scrollbar-bg);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--scrollbar-thumb-bg);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}
</style>
