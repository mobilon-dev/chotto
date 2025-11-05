<template>
  <div class="container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <p
      class="text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch } from 'vue'
import linkifyStr from "linkify-string";

import { ITextMessage } from '@/types';

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

function inNewWindow(event: Event) {
  event.preventDefault()
  if ((event.target as HTMLAnchorElement).href)
    window.open((event.target as HTMLAnchorElement).href, '_blank');
}

</script>

<style scoped lang="scss">
@use './styles/ReplyTextMessage.scss';
</style>
