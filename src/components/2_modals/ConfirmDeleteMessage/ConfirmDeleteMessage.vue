<script setup lang="ts">
import { useLocale } from '@/locale/useLocale'

const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light',
  },
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const { t } = useLocale()

const closeOutside = (evt: MouseEvent) => {
  if ((evt.target as HTMLElement).classList.contains('confirm-delete-message__backdrop')) {
    emit('cancel')
  }
}
</script>

<template>
  <transition name="confirm-delete-message-fade">
    <div
      class="confirm-delete-message__backdrop"
      :data-theme="props.theme"
      role="presentation"
      @click="closeOutside"
    >
      <div
        class="confirm-delete-message"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmDeleteMessageTitle"
        @click.stop
      >
        <p
          id="confirmDeleteMessageTitle"
          class="confirm-delete-message__title"
        >
          {{ t('component.ConfirmDeleteMessage.title') }}
        </p>
        <div class="confirm-delete-message__actions">
          <button
            type="button"
            class="confirm-delete-message__btn confirm-delete-message__btn--delete"
            @click="emit('confirm')"
          >
            {{ t('component.ConfirmDeleteMessage.delete') }}
          </button>
          <button
            type="button"
            class="confirm-delete-message__btn confirm-delete-message__btn--cancel"
            @click="emit('cancel')"
          >
            {{ t('component.ConfirmDeleteMessage.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use './styles/ConfirmDeleteMessage.scss';
</style>
