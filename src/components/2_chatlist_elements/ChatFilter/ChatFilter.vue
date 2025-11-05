<template>
  <div class="chat-filter__container">
    <div class="chat-filter__icon">
      <SearchIcon />
    </div>
    <input
      ref="refInput"
      class="chat-filter__input"
      type="text"
      :placeholder="placeholder ? placeholder : t('component.ChatFilter.InputPlaceholder')"
      @input="update"
    >
    <div 
      v-if="inputValue"
      class="chat-filter__clear"
      @click="clear"
    >
      <CloseButtonIcon />
    </div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { t } from '../../../locale/useLocale';
import { SearchIcon, CloseButtonIcon } from '@/components';
const refInput = ref('');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: null
  }
})

// Define emits
const emit = defineEmits(['update']);

// Reactive value for input content
const inputValue = ref('');

// Define method
const update = () => {
  const el = unref(refInput);
  inputValue.value = el.value;
  emit('update', el.value);
}

// Clear method
const clear = () => {
  const el = unref(refInput);
  el.value = '';
  inputValue.value = '';
  emit('update', '');
  el.focus();
}

</script>

<style scoped lang="scss">
@use './styles/ChatFilter.scss';
</style>
