<template>
  <div>
    <div
      v-if="showModal"
      class="new-chat-modal"
    >
      <div class="modal-content">
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
            />
            <label :for="user.userId">{{
              user.name || 'unknown username'
            }}</label>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="onConfirm">ОК</button>
          <button @click="onCancel">Отмена</button>
        </div>
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

const showModal = ref(true)
const selectedUsers = ref([])

const emit = defineEmits(['confirm', 'close'])

const onConfirm = async () => {
  emit('confirm', selectedUsers.value)
  closeModal()
  resetValues()
}

const closeModal = () => {
  emit('close')
  showModal.value = false
}

const resetValues = () => {
  selectedUsers.value = []
}

const onCancel = () => {
  closeModal()
  resetValues()
}
</script>

<style scoped>
.new-chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.participant-list {
  margin-top: 10px;
  max-height: 200px;
}
.participant-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.participant-item input[type='checkbox'] {
  margin-right: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-actions button {
  margin-left: 10px;
}
</style>
