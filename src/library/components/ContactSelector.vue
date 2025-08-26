<template>
  <div class="contact-selector">
    <!-- Список контактов -->
    <div class="contact-list">
      <label
        v-for="(contact, index) in contacts"
        :key="index"
        class="contact-item"
      >
        <input
          type="radio"
          name="contact"
          :value="contact.value"
          v-model="selectedContact"
        />
        <span class="contact-text">
          {{ contact.label }}
        </span>
        <span v-if="contact.isCurrent" class="current-chat">
          Текущий чат
        </span>
      </label>
    </div>

    <!-- Канал связи -->
    <div class="channel-section">
      <label class="channel-label">Канал связи</label>
      <select v-model="selectedChannel" class="channel-select">
        <option
          v-for="(channel, index) in channels"
          :key="index"
          :value="channel.value"
        >
          {{ channel.label }}
        </option>
      </select>
    </div>

    <!-- Кнопка для открытия в CRM -->
    <div class="crm-button" @click="$emit('open-crm', selectedContact)">
      <span class="pi pi-user"></span>
      Открыть контакт в CRM
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  contacts: {
    type: Array,
    required: true,
    // Пример:
    // [
    //   { label: '+7 983 169-35-04', value: 'phone1', isCurrent: false },
    //   { label: '+7 499 290-75-55', value: 'phone2', isCurrent: false },
    //   { label: '@Ivan12345', value: 'telegram', isCurrent: true }
    // ]
  },
  channels: {
    type: Array,
    required: true,
    // Пример:
    // [
    //   { label: 'Отдел продаж Mobilon Sales', value: 'sales' },
    //   { label: 'Техподдержка', value: 'support' }
    // ]
  },
  defaultContact: {
    type: String,
    default: null
  },
  defaultChannel: {
    type: String,
    default: null
  }
});

const emits = defineEmits(['update:contact', 'update:channel', 'open-crm']);

const selectedContact = ref(props.defaultContact || (props.contacts[0]?.value ?? null));
const selectedChannel = ref(props.defaultChannel || (props.channels[0]?.value ?? null));

// Слежение и проброс событий наружу
watch(selectedContact, (val) => emits('update:contact', val));
watch(selectedChannel, (val) => emits('update:channel', val));
</script>

<style scoped lang="scss">
.contact-selector {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #333;
  padding: 0 20px;

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      cursor: pointer;

      input[type="radio"] {
        accent-color: #007bff;
      }

      .contact-text {
        font-size: var(--chotto-title-font-size)
      }

      .current-chat {
        margin-left: auto;
        font-size: 12px;
        color: #666;
      }
    }
  }

  .channel-section {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .channel-label {
      font-size: var(--chotto-small-xl-font-size);
      color: #666;
    }

    .channel-select {
      padding: 8px;
      border: 1px solid #d0d7de;
      border-radius: 4px;
      font-size: var(--chotto-small-xl-font-size);
    }
  }

  .crm-button {
    border-top: 1px solid #D0D0D0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 18px 12px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    .pi-user {
      font-size: 16px;
    }
  }
}
</style>
