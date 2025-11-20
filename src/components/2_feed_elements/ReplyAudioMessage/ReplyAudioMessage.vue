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
      v-html="linkedHtml"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { IAudioMessage } from '@/types';
import { useMessageLinks } from '@/hooks/messages';

// Define props
const props = defineProps({
  message: {
    type: Object as () => IAudioMessage,
    required: true,
  },
});

const isPlaying = ref(false);

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

</script>

<style scoped lang="scss">
@use './styles/ReplyAudioMessage.scss';
</style>
