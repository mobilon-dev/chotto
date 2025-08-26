<template>
  <div>
    <h2>{{ title }}</h2>
    <label>Имя</label>
    <input
      v-model="contact.name"
      type="text"
      @input="onChange"
    /><br />
    <label>Телефон</label>
    <input
      v-model="contact.phone"
      type="text"
      @input="onChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const contact = ref({})

const emit = defineEmits(['change'])

const onChange = () => {
  emit('change', {
    contact: contact.value,
  })
}
</script>
