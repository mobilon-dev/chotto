<template>
  <div class="container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <p
      class="text"
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
import { ITextMessage } from '@/types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
});

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

</script>

<style scoped lang="scss">
@use './styles/ReplyTextMessage.scss';
</style>
