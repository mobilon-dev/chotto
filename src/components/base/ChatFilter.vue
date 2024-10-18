<template>
  <div class="chat-filter">
    <div class="chat-filter__container">
      <input
        ref="refInput"
        class="chat-filter__input"
        type="text"
        placeholder="Поиск..."
        @input="update"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';

const refInput = ref('');

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
  &__input {
    width: var(--inputtext-width);
    color: var(--inputtext-color);
    background-color: var(--inputtext-background);
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    padding: var(--inputtext-padding);
    border: var(--inputtext-border);
    border-radius: var(--inputtext-border-radius);
    font-size: var(--inputtext-font-size);
    transition: border-color var(--inputtext-transition-duration);

    &::placeholder {
      color: var(--inputtext-placeholder-color);
    }

    &:hover {
      border-color: var(--inputtext-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--inputtext-focus-border-color);
      outline: none;
    }
  }
}
</style>
