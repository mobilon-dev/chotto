<template>
  <a
    class="file-message__link"
    :href="message.url"
    download
    target="_blank"
  >
    <span class="pi pi-file" />
  </a>

  <div>
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <a
      class="file-message__link"
      :href="message.url"
      download
      target="_blank"
    >
    
      <p class="file-message__filename-text">
        {{ message.filename }}
      </p>
    </a>
    <p
      v-if="message.text"
      class="file-message__text"
      @click="inNewWindow"
      v-html="linkedHtml"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useMessageLinks } from '@/hooks/messages';
import { IFileMessage } from '@/types'

// Define props
const props = defineProps({
  message: {
    type: Object as () => IFileMessage,
    required: true,
  },
});

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)


</script>

<style scoped lang="scss">
@use './styles/ReplyFileMessage.scss';
</style>
