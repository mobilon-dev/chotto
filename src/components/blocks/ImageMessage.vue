<template>
  <div class="image-message">
    <div class="image-message__container">
      <button class="image-message__button" @click="visible = true">
        <img class="image-message__preview-image" :src="message.url" :alt="message.alt" />
        <span class="image-message__time">22:02</span>
      </button>

      <Dialog v-model:visible="visible" @click="closeDialog" modal :style="{ width: '45%' }">
        <img class="image-message__full-image" :src="message.url" :alt="message.alt" />
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog';

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const visible = ref(false)

</script>

<style lang="scss">
.image-message {


  &__container {
    max-width: 40%;
    position: relative;
    margin-bottom: 8px;
  }

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;
  }

  &__button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  &__preview-image {
    max-width: 100%;
    border-radius: 5px;
  }

  &__full-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}

.p-dialog-header-actions {
  margin-left: auto;
}
</style>
