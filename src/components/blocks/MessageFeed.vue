<template>
  <div class="message-feed" ref="refFeed">
    <component v-for="message in messages" :key="message.id" :is="componentsMap(message.type)" :message="message" />
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick } from 'vue';

import FileMessage from "../blocks/FileMessage.vue";
import ImageMessage from "../blocks/ImageMessage.vue";
import TextMessage from "../blocks/TextMessage.vue";

const refFeed = ref(null);

// Define props
const props = defineProps({
  messages: {
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
  };
  return r[type];
}

function scrollToFeedBottom() {
  nextTick(function () {
    const element = unref(refFeed);
    element.scrollTop = element.scrollHeight;
  })
}

watch(() => props.messages, scrollToFeedBottom);
</script>

<style scoped></style>
