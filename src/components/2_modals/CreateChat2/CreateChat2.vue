<template>
  <div class="create-chat-form">
    <h2 class="create-chat-title">
      {{ title }}
    </h2>
    <div class="form-field">
      <label
        class="form-label"
        for="contact-name"
      >Имя</label>
      <input
        id="contact-name"
        v-model="contact.name"
        name="name"
        type="text"
        class="form-input"
        placeholder="Введите имя"
        :class="{ 'form-input--error': validationErrors.name }"
        @input="onChange"
        @blur="validateForm"
      >
      <div
        v-if="validationErrors.name"
        class="form-error"
      >
        {{ validationErrors.name }}
      </div>
    </div>
    <div class="form-field">
      <label
        class="form-label"
        for="contact-phone"
      >Телефон</label>
      <input
        id="contact-phone"
        v-model="contact.phone"
        name="phone"
        type="text"
        class="form-input"
        placeholder="+7 (999) 999-99-99"
        :class="{ 'form-input--error': validationErrors.phone }"
        @input="onChange"
        @focus="phoneInputTouched = true"
        @blur="validateForm"
      >
      <div
        v-if="validationErrors.phone"
        class="form-error"
      >
        {{ validationErrors.phone }}
      </div>
    </div>
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

const contact = ref({})

// Реактивная переменная для ошибок валидации
const validationErrors = ref({
  name: '',
  phone: ''
})

// Отслеживание того, был ли кликнут инпут телефона
const phoneInputTouched = ref(false)

const emit = defineEmits(['change']);

// Функция для очистки ошибок валидации
const clearValidationErrors = () => {
  validationErrors.value = {
    name: '',
    phone: ''
  };
};

// Функция для сброса состояния "touched"
const resetTouchedState = () => {
  phoneInputTouched.value = false;
};

// Функция для установки ошибки валидации
const setValidationError = (field, message) => {
  validationErrors.value[field] = message;
};

// Функция валидации имени
const validateName = (name) => {
  if (!name || name.trim().length < 3) {
    return 'Имя должно содержать минимум 3 символа';
  }
  return '';
};

// Функция валидации телефона
const validatePhone = (phone) => {
  // Если инпут телефона еще не был кликнут, не показываем ошибки
  if (!phoneInputTouched.value) {
    return '';
  }
  
  if (!phone) {
    return 'Телефон обязателен для заполнения';
  }
  
  // Убираем все символы кроме цифр
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < 11) {
    return 'Минимум 11 цифр';
  }
  
  if (!cleanPhone.startsWith('7')) {
    return 'Номер телефона должен начинаться с цифры 7';
  }
  
  return '';
};

const isPhoneValid = (phone) => {
  if (!phone) return false;
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 11) return false;
  if (!cleanPhone.startsWith('7')) return false;
  return true;
};

// Функция валидации всех полей
const validateForm = () => {
  const nameError = validateName(contact.value.name);
  // Для отображения ошибки телефона учитываем touched, для валидности — нет
  const phoneErrorForDisplay = validatePhone(contact.value.phone);
  const phoneValid = isPhoneValid(contact.value.phone);

  validationErrors.value = {
    name: nameError,
    phone: phoneErrorForDisplay,
  };

  return !nameError && phoneValid;
};

// Извлекает только цифры из номера телефона
const extractDigits = (phone) => {
  return (phone || '').replace(/\D/g, '');
};

// Форматирует номер телефона в единый формат +7 (XXX) XXX-XX-XX
const formatPhone = (phone) => {
  const digits = extractDigits(phone);
  
  // Если номер начинается с 8, заменяем на 7
  let normalizedDigits = digits;
  if (digits.startsWith('8')) {
    normalizedDigits = '7' + digits.slice(1);
  }
  
  // Если номер не начинается с 7, добавляем 7
  if (!normalizedDigits.startsWith('7')) {
    normalizedDigits = '7' + normalizedDigits;
  }
  
  // Ограничиваем до 11 цифр
  normalizedDigits = normalizedDigits.slice(0, 11);
  
  // Форматируем: +7 (XXX) XXX-XX-XX
  if (normalizedDigits.length <= 1) {
    return normalizedDigits ? '+' + normalizedDigits : '';
  }
  
  const formatted = '+7';
  if (normalizedDigits.length > 1) {
    const rest = normalizedDigits.slice(1);
    if (rest.length <= 3) {
      return formatted + ' (' + rest;
    } else if (rest.length <= 6) {
      return formatted + ' (' + rest.slice(0, 3) + ') ' + rest.slice(3);
    } else if (rest.length <= 8) {
      return formatted + ' (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6);
    } else {
      return formatted + ' (' + rest.slice(0, 3) + ') ' + rest.slice(3, 6) + '-' + rest.slice(6, 8) + '-' + rest.slice(8);
    }
  }
  
  return formatted;
};

// Нормализует номер телефона: если первая цифра — 8, заменяет её на 7
const normalizePhoneFirstDigit = () => {
  const current = contact.value.phone ?? '';
  const formatted = formatPhone(current);
  if (formatted !== current) {
    contact.value = {
      ...contact.value,
      phone: formatted
    };
  }
};

const onChange = () => {
  // Нормализуем и форматируем номер телефона
  normalizePhoneFirstDigit();
  // Валидируем форму при изменении
  validateForm();
  
  emit('change', {
    contact: contact.value, 
    contactDigits: extractDigits(contact.value.phone), 
    isValid: validateForm()
  });
}

defineExpose({
  clearValidationErrors,
  resetTouchedState,
  setValidationError,
  validateForm,
  validateName,
  validatePhone,
  formatPhone,
  extractDigits,
  validationErrors,
  phoneInputTouched
});
</script>

<style scoped lang="scss">
@use './styles/CreateChat2.scss';
</style>
