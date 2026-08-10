<template>
  <div
    class="reply__container"
    @click="onEdit"
  >
    <EditTextMessage :message="message" />
    <div
      class="reply__reset"
      @click.stop="emit('reset')"
    >
      <CloseIcon />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import EditTextMessage from '@/components/2_feed_elements/EditTextMessage/EditTextMessage.vue';
import CloseIcon from '@/components/1_icons/CloseIcon.vue';
import { Edit } from '@/types';

const emit = defineEmits(['action', 'edit', 'reset']);

const props = defineProps({
  message: {
    type: Object as () => Edit,
    default: () => ({} as Edit)
  }
});

const onEdit = () => {
  if (props.message?.messageId) {
    emit('edit', props.message.messageId)
  }
}
</script>

<style scoped lang="scss">
@use '../BaseReplyMessage/styles/BaseReplyMessage.scss';
</style>
