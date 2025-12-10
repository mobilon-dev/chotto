<template>
  <div class="delimiter-message__container">
    <p class="delimiter-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { IDelimiterMessage } from '@types';

defineProps({
  message: {
    type: Object as () => IDelimiterMessage,
    required: true,
  },
});

</script>

<style
  scoped
  lang="scss"
>
@use './styles/DelimiterMessage.scss';
</style>
