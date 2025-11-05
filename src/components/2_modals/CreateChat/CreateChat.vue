<template>
  <div>
    <h2> {{ title }}</h2>
    <input
      v-model="name"
      type="text"
      class="name"
      @input="onChange"
    >    
  </div>
</template>

<script setup>

import { ref } from 'vue';

// Define props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const name = ref('')

const emit = defineEmits(['change']);

const onChange = () => {
  emit('change', {name: name.value});
}
</script>

<style scoped lang="scss">
@use './styles/CreateChat.scss';
</style>
