<template>
  <div
    v-show="!isPlaying"
    class="audio-message__play"
  >
    <span class="pi pi-play" />
  </div>
  <div class="audio-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="audio-message__reply-description">
      <span class="pi pi-microphone" />
      <p>Аудиосообщение</p>
    </div>
    <p
      v-if="message.text"
      class="audio-message__text"
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
import { IAudioMessage } from '@/types';


// Define props
const props = defineProps({
  message: {
    type: Object as () => IAudioMessage,
    required: true,
  },
});

const isPlaying = ref(false);

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
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
@use './styles/ReplyAudioMessage.scss';
</style>
