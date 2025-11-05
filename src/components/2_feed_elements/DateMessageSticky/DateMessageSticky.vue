<template>
  <div class="date-message-sticky__container">
    <p class="date-message-sticky__text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
@use './styles/DateMessageSticky.scss';
</style>