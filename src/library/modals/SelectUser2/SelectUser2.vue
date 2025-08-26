<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="participant-list">
      <div
        v-for="user in users"
        :key="user.userId"
        class="participant-item"
      >
        <input
          :id="user.userId"
          v-model="selectedUsers"
          type="checkbox"
          :value="user.userId"
          @change="onChange"
        />
        <label :for="user.userId">{{ user.name || 'unknown username' }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const selectedUsers = ref([])

const emit = defineEmits(['change'])

const onChange = () => {
  console.log('check')
  emit('change', { selectedUsers: selectedUsers.value })
}
</script>

<style scoped>
.participant-list {
  margin-top: 10px;
  max-height: 200px;
  overflow: auto;
}

.participant-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.participant-item input[type='checkbox'] {
  margin-right: 10px;
}
</style>
