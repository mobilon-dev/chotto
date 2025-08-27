<template>
  <div class="theme-tester">
    <h3>Theme Tester (TypeScript + CSS Validation)</h3>
    
    <div class="theme-buttons">
      <button 
        v-for="themeName in themeNames" 
        :key="themeName"
        @click="applyTheme(themeName)"
        :class="{ active: currentTheme === themeName }"
      >
        {{ themeName }}
      </button>
    </div>
    
    <div class="validation-info">
      <div class="validation-status">
        <span :class="{ valid: isValid, invalid: !isValid }">
          {{ isValid ? '✅ Valid' : '❌ Invalid' }}
        </span>
      </div>
      
      <div v-if="validationDetails" class="validation-details">
        <div class="detail-item">
          <strong>Theme:</strong> {{ validationDetails.theme }}
        </div>
        <div class="detail-item">
          <strong>Variables found:</strong> {{ validationDetails.totalFound }}/{{ validationDetails.totalRequired }}
        </div>
        <div v-if="validationDetails.missingVariables.length > 0" class="detail-item">
          <strong>Missing variables:</strong>
          <ul class="missing-variables">
            <li v-for="variable in validationDetails.missingVariables" :key="variable">
              {{ variable }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="sample-chat-item">
      <div class="chat-item__container">
        <div class="chat-item__avatar-container">
          <span class="pi pi-user" />
        </div>
        <div class="chat-item__info-container">
          <div class="chat-item__name">John Doe</div>
          <div class="chat-item__last-message">Hello, how are you?</div>
        </div>
        <div class="chat-item__details-container">
          <div class="chat-item__time">12:30</div>
          <div class="chat-item__unread">3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { validateChatItemTheme, validateCSSTheme } from './validateTheme'

const currentTheme = ref('light')
const isValid = ref(true)
const validationDetails = ref<any>(null)

const themeNames = ['light', 'dark', 'green']

const applyTheme = (themeName: string) => {
  currentTheme.value = themeName
  document.documentElement.setAttribute('data-theme', themeName)
  validateTheme()
}

const validateTheme = () => {
  isValid.value = validateChatItemTheme(currentTheme.value)
  
  // Для демонстрации создаем фиктивные данные валидации
  // В реальном приложении здесь можно загрузить CSS файл и проверить его
  validationDetails.value = {
    theme: currentTheme.value,
    totalFound: 32,
    totalRequired: 32,
    missingVariables: []
  }
}

onMounted(() => {
  applyTheme('light')
})
</script>

<style scoped>
.theme-tester {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9f9f9;
}

.theme-buttons {
  margin-bottom: 15px;
}

.theme-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.theme-buttons button:hover {
  background: #f0f0f0;
}

.theme-buttons button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.validation-info {
  margin-bottom: 15px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.validation-status {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.1em;
}

.validation-status .valid {
  color: #28a745;
}

.validation-status .invalid {
  color: #dc3545;
}

.validation-details {
  font-size: 0.9em;
}

.detail-item {
  margin-bottom: 8px;
}

.detail-item strong {
  color: #666;
}

.missing-variables {
  margin: 5px 0 0 20px;
  padding: 0;
}

.missing-variables li {
  color: #dc3545;
  font-family: monospace;
  margin-bottom: 2px;
}

.sample-chat-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background: white;
}
</style>
