<template>
  <div class="date-message">
    <div class="date-message__container">
      <p class="date-message__text">
        {{ message.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
  }
});
</script>

<style
  scoped
  lang="scss"
>
.date-message {

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 8px 14px;
    margin-bottom: 18px;
    width: fit-content;
  }

  &__text {
    font-size: 12px;
    font-weight: 500;
    color: var(--date-message-color);
  }
}
</style>
