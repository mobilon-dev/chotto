<template>
  <div class="contact-pick-search-wrap">
    <label
      class="contact-pick-search"
      :aria-label="ariaLabel"
    >
      <span class="contact-pick-search__icon">
        <slot name="icon">
          <SearchIcon />
        </slot>
      </span>
      <input
        ref="inputRef"
        class="contact-pick-search__input"
        data-testid="contact-pick-search-input"
        type="search"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
      >
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '@/components/1_icons/SearchIcon.vue';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Поиск по имени, номеру или @имени пользователя',
  },
  ariaLabel: {
    type: String,
    default: 'Поиск контакта',
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const focus = () => {
  inputRef.value?.focus();
};

defineExpose({ focus, inputRef });
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>