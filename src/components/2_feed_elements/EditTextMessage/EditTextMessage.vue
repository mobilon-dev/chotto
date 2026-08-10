<template>
  <div class="container">
    <p v-text="'Редактирование'" />
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
import { Edit } from '@/types';

const props = defineProps({
  message: {
    type: Object as () => Edit,
    required: true,
  },
});

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

</script>

<style scoped lang="scss">
@use '../ReplyTextMessage/styles/ReplyTextMessage.scss';
</style>
