<template>
  <div class="container">
    <p v-if="message.header">{{ message.header }}</p>
    <p
      class="text"
      v-html="linkedText"
      @click="inNewWindow"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue'
import linkifyStr from "linkify-string";

import { ITextMessage } from '../../types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
});

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    linkedText.value = linkifyStr(props.message.text)
  },
  { immediate: true }
)

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href)
    window.open(event.target.href, '_blank');
}

</script>

<style
  scoped
  lang="scss"
>

.container{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text{
  font-size: var(--chotto-text-font-size);
  color: var(--chotto-primary-text-color)
}

p {
  margin: 0;
  font-size: var(--chotto-additional-text-font-size);
  color: var(--chotto-secondary-text-color);
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
