<template>
  <div class="chat-filter__container">
    <span class="pi pi-search chat-filter__icon" />

    <input
      ref="refInput"
      class="chat-filter__input"
      type="text"
      :placeholder="
        placeholder ? placeholder : t('component.ChatFilter.InputPlaceholder')
      "
      @input="update"
    />
  </div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { t } from '../../../locale/useLocale'

const refInput = ref('')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
})

// Define emits
const emit = defineEmits(['update'])

// Define method
const update = () => {
  const el = unref(refInput)
  emit('update', el.value)
}
</script>
