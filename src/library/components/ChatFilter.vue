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
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { t } from '../../locale/useLocale';
import SearchIcon from '../icons/SearchIcon.vue';
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

// Define method
const update = () => {
  const el = unref(refInput);
  emit('update', el.value);
}

</script>

<style
  scoped
  lang="scss"
>
.chat-filter {
  &__container{
    position: relative;
  }

  &__icon{
    position: absolute;
    left: 14px;
    top: 25%;
    color: var(--chotto-secondary-text-color);
  }

  &__input {
    width: 100%;
    background-color: transparent;
    color: var(--chotto-primary-text-color);
    padding: var(--chotto-input-padding);
    padding-left: 40px;
    border: var(--chotto-input-border);
    border-radius: var(--chotto-input-border-radius);
    font-size: var(--chotto-input-font-size);
    transition: border-color var(--chotto-input-transition-duration);
    background-color: var(--chotto-input-background);

    &::placeholder {
      color: var(--chotto-secondary-text-color);
    }

    &:hover {
      border-color: var(--chotto-input-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--chotto-input-focus-border-color);
      outline: none;
    }
  }
}
</style>
