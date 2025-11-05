<template>
  <div>
    <span
      class="call-message__icon pi pi-phone"
      :class="{'call-message__icon-missed': message.isMissedCall}"
    />
  </div>

  <div class="call-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="call-message__reply-description">
      <span
        v-if="!message.isMissedCall"
        class="call-message__title"
      >
        Аудиозвонок
      </span>
      <span
        v-else
        class="call-message__title"
      >
        Пропущенный аудиозвонок
      </span>
    </div>
    <p
      v-if="message.callDuration"
    >
      {{ message.callDuration }}
    </p>
  </div>
</template>

<script
  setup
  lang="ts"
>

import { ICallMessage } from '@/types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ICallMessage,
    required: true,
  },
});

console.log(props.message)

</script>

<style scoped lang='scss'>
@use './styles/ReplyCallMessage.scss';
</style>
