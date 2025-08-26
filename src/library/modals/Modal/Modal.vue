<template>
  <transition name="modal-fade">
    <div
      v-show="true"
      class="modal-backdrop"
      :data-theme="theme"
      @click="closeModalOutside"
    >
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div
          id="modalDescription"
          class="modal-body"
        >
          <slot name="default" />
        </div>
        <div class="buttons">
          <button
            type="button"
            class="btn-green"
            aria-label="Close modal"
            @click="emit('submit')"
          >
            OK
          </button>
          <button
            type="button"
            class="btn-green"
            aria-label="Close modal"
            @click="emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const emit = defineEmits(['close', 'submit'])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light',
  },
})

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('modal-backdrop')) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
