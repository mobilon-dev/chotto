<script setup>
const emit = defineEmits(['close'])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light'
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
      :data-theme="theme"
      class="modal-backdrop"
      @click="closeModalOutside"
    >
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <slot name="default" />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use './styles/ModalNoFooter.scss';
</style>
