<template>
  <div
    class="modal__overlay"
    :data-theme="theme"
    @click="closeModalOutside"
    @keyup.esc="emit('close')"
  >
    <div class="modal__container">
      <button
        class="modal__close-button"
        @click="emit('close')"
      >
        <span>
          <i class="pi pi-times" />
        </span>
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light'
  }
})

const emit = defineEmits(['close']);


const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('modal__overlay')) {
    emit('close')
  }
}

const handleEscKey = (evt) => {
  if (evt.key === 'Escape') {
    emit('close')
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});

</script>

<style scoped lang="scss">
@use './styles/ModalFullscreen.scss';
</style>
