import type { ChatItemThemeVariables, ValidateTheme } from './types'

/**
 * Простой валидатор тем для ChatItem
 * Использует TypeScript для проверки типов на этапе компиляции
 * Использует ChatItemThemeVariables как источник истины
 */

// Создаем объект с переменными на основе TypeScript интерфейса
// Это обеспечивает синхронизацию с ChatItemThemeVariables
const lightThemeValidation: ChatItemThemeVariables = {
  // Layout
  '--chat-item-padding-container': '10px 20px 10px 15px',
  '--chat-item-dialog-padding': '5px 0 0 75px',
  '--chat-item-border-radius': '0',
  
  // Avatar
  '--chat-item-avatar-size': '48px',
  '--chat-item-avatar-margin-right': '15px',
  '--chat-item-status-indicator-size': '10px',
  '--chat-item-status-indicator-position': '5px',
  
  // Info
  '--chat-item-info-margin-right': '15px',
  '--chat-item-name-margin-bottom': '8px',
  
  // Details
  '--chat-item-details-gap': '4px',
  '--chat-item-unread-min-size': '25px',
  
  // Dialog
  '--chat-item-dialog-gap': '5px',
  '--chat-item-dialog-item-padding': '3px',
  '--chat-item-dialog-text-padding': '0 5px',
  
  // Colors
  '--chat-item-background': 'transparent',
  '--chat-item-background-selected': 'var(--chotto-item-background-color-focus)',
  '--chat-item-border': 'none',
  '--chat-item-name-color': 'var(--chotto-primary-text-color)',
  '--chat-item-message-color': 'var(--chotto-secondary-text-color)',
  '--chat-item-time-color': 'var(--chotto-secondary-text-color)',
  '--chat-item-avatar-background': 'var(--chotto-avatar-background-color)',
  '--chat-item-avatar-icon-color': 'var(--chotto-avatar-color)',
  '--chat-item-status-received-color': 'var(--chotto-status-color-received)',
  '--chat-item-status-read-color': 'var(--chotto-status-color-read)',
  '--chat-item-unread-background': 'var(--chotto-unread-background-color)',
  '--chat-item-unread-text-color': 'var(--chotto-unread-text-color)',
  '--chat-item-actions-color': 'var(--chotto-button-color-active)',
  '--chat-item-actions-hover-color': 'var(--chotto-button-color-hover)',
  '--chat-item-dialog-background': 'transparent',
  '--chat-item-dialog-background-selected': 'var(--chotto-item-background-color-focus)',
  '--chat-item-dialog-text-color': 'var(--chotto-primary-text-color)',
  '--chat-item-dialog-time-color': 'var(--chotto-secondary-text-color)'
}

// TypeScript проверит, что все переменные присутствуют
type LightThemeValid = ValidateTheme<typeof lightThemeValidation>

// Список всех необходимых переменных (извлечен из TypeScript интерфейса)
const REQUIRED_VARIABLES = Object.keys(lightThemeValidation) as Array<keyof ChatItemThemeVariables>

/**
 * Парсит CSS файл и извлекает переменные
 * @param cssContent - содержимое CSS файла
 * @returns массив найденных переменных
 */
function parseCSSVariables(cssContent: string): string[] {
  const variableRegex = /--chat-item-[a-zA-Z0-9-]+/g
  const matches = cssContent.match(variableRegex) || []
  return [...new Set(matches)] // Убираем дубликаты
}

/**
 * Проверяет CSS файл темы
 * @param themeName - название темы
 * @param cssContent - содержимое CSS файла
 * @returns результат валидации
 */
export function validateCSSTheme(themeName: string, cssContent: string) {
  const foundVariables = parseCSSVariables(cssContent)
  const missingVariables = REQUIRED_VARIABLES.filter(variable => 
    !foundVariables.includes(variable)
  )
  
  return {
    theme: themeName,
    isValid: missingVariables.length === 0,
    totalRequired: REQUIRED_VARIABLES.length,
    totalFound: foundVariables.length,
    missingVariables,
    foundVariables
  }
}

/**
 * Проверяет тему во время выполнения (в браузере)
 * @param themeName - название темы
 * @returns результат валидации
 */
export function validateChatItemTheme(themeName: string): boolean {
  const root = document.documentElement
  
  // Временно устанавливаем тему для проверки
  const currentTheme = root.getAttribute('data-theme')
  root.setAttribute('data-theme', themeName)
  
  // Проверяем каждую переменную
  const isValid = REQUIRED_VARIABLES.every(variable => {
    const value = getComputedStyle(root).getPropertyValue(variable).trim()
    return value !== '' && value !== 'initial' && value !== 'unset'
  })
  
  // Восстанавливаем исходную тему
  if (currentTheme) {
    root.setAttribute('data-theme', currentTheme)
  } else {
    root.removeAttribute('data-theme')
  }
  
  return isValid
}

/**
 * Получает переменную темы из DOM
 * @param variableName - название переменной
 * @returns значение переменной
 */
export function getChatItemVariable(variableName: keyof ChatItemThemeVariables): string {
  const root = document.documentElement
  return getComputedStyle(root).getPropertyValue(variableName).trim()
}

/**
 * Проверяет все темы во время выполнения
 * @returns результаты валидации
 */
export function validateAllThemes(): Record<string, boolean> {
  const themes = ['light', 'dark', 'green']
  const results: Record<string, boolean> = {}
  
  themes.forEach(theme => {
    results[theme] = validateChatItemTheme(theme)
  })
  
  return results
}

/**
 * Проверяет CSS файлы тем (для использования в build процессе)
 * @param themeFiles - объект с содержимым CSS файлов тем
 * @returns результаты валидации
 */
export function validateCSSThemeFiles(themeFiles: Record<string, string>) {
  const results: Record<string, any> = {}
  
  Object.entries(themeFiles).forEach(([themeName, cssContent]) => {
    results[themeName] = validateCSSTheme(themeName, cssContent)
  })
  
  return results
}

/**
 * Получает список всех обязательных переменных (из TypeScript интерфейса)
 * @returns массив переменных
 */
export function getRequiredVariables(): Array<keyof ChatItemThemeVariables> {
  return [...REQUIRED_VARIABLES]
}

/**
 * Проверяет, является ли переменная обязательной
 * @param variableName - название переменной
 * @returns true если переменная обязательная
 */
export function isRequiredVariable(variableName: string): variableName is keyof ChatItemThemeVariables {
  return REQUIRED_VARIABLES.includes(variableName as keyof ChatItemThemeVariables)
}
