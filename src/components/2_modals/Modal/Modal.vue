<script setup>

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light'
  },
  okDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('modal-backdrop')) {
    emit('close')
  }
}

</script>

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
            :aria-disabled="props.okDisabled ? 'true' : 'false'"
            :disabled="props.okDisabled"
            @click="emit('submit')"
          >
            OK
          </button>
          <button
            type="button"
            class="btn-green btn-gray"
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

<style scoped lang="scss">
@use './styles/Modal.scss';
</style>
