<template>
  <div>
    <div
      v-if="showModal"
      class="new-chat-modal"
    >
      <div class="modal-content">
        <h2> {{ title }}</h2>
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
            >
            <label :for="user.userId">{{ user.name || 'unknown username' }}</label>
          </div> 
        </div>
        <div class="modal-actions">
          <button @click="onConfirm">
            ОК
          </button>
          <button @click="onCancel">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';

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
});

const showModal = ref(true)
const selectedUsers = ref([])

const emit = defineEmits(['confirm', 'close']);

const onConfirm = async () => {	
  emit('confirm', selectedUsers.value);
  closeModal();
  resetValues();
}

const closeModal = () => {
  emit('close');
  showModal.value = false;
}

const resetValues = () => {
	selectedUsers.value = []
}

const onCancel = () => {
  closeModal();
	resetValues();
}
</script>

<style scoped lang="scss">
@use './styles/SelectUser.scss';
</style>
