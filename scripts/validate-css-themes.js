#!/usr/bin/env node

/**
 * CLI валидатор CSS файлов тем для компонентов
 * Проверяет наличие всех необходимых переменных в CSS файлах
 * Использует TypeScript интерфейсы как источник конфигурации
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Импортируем автоматически сгенерированную конфигурацию
let COMPONENTS_CONFIG = {}

try {
  const configPath = path.join(__dirname, 'validator-config.js')
  if (fs.existsSync(configPath)) {
    // Динамический импорт конфигурации
    const configModule = await import(configPath)
    COMPONENTS_CONFIG = configModule.default || configModule
  } else {
    console.log('⚠️  No auto-generated config found. Using fallback config...')
    // Fallback конфигурация
    COMPONENTS_CONFIG = {
      'ChatItem': {
        path: 'src/library/components/ChatItem/styles/themes',
        typesFile: 'src/library/components/ChatItem/types.ts',
        interfaceName: 'ChatItemThemeVariables'
      }
    }
  }
} catch (error) {
  console.error('Error loading config:', error.message)
  process.exit(1)
}

/**
 * Извлекает переменные из TypeScript интерфейса
 * @param {string} typesFilePath - Путь к файлу с типами
 * @param {string} interfaceName - Название интерфейса
 * @returns {string[]} Массив переменных
 */
function extractVariablesFromTypeScript(typesFilePath, interfaceName) {
  try {
    const fullPath = path.join(__dirname, '..', typesFilePath)
    const content = fs.readFileSync(fullPath, 'utf8')
    
    // Ищем интерфейс
    const interfaceRegex = new RegExp(`export\\s+interface\\s+${interfaceName}\\s*{[^}]*}`, 's')
    const interfaceMatch = content.match(interfaceRegex)
    
    if (!interfaceMatch) {
      throw new Error(`Interface ${interfaceName} not found in ${typesFilePath}`)
    }
    
    // Извлекаем переменные из интерфейса
    const variableRegex = /'--[a-zA-Z0-9-]+':\s*string/g
    const matches = interfaceMatch[0].match(variableRegex) || []
    
    // Очищаем переменные от лишнего
    const variables = matches.map(match => {
      return match.replace(/':\s*string$/, '').replace(/^'/, '')
    })
    
    return variables
  } catch (error) {
    console.error(`Error reading TypeScript file ${typesFilePath}:`, error.message)
    return []
  }
}

/**
 * Извлекает CSS переменные из файла
 * @param {string} filePath - Путь к файлу
 * @returns {string[]} Массив найденных переменных
 */
function extractVariablesFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const variableRegex = /--[a-zA-Z0-9-]+/g
    const matches = content.match(variableRegex) || []
    return [...new Set(matches)] // Убираем дубликаты
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return []
  }
}

/**
 * Проверяет CSS файл темы
 * @param {string} componentName - Название компонента
 * @param {string} themeName - Название темы
 * @param {string} themePath - Путь к файлу темы
 * @param {string[]} requiredVariables - Список обязательных переменных
 * @returns {Object} Результат валидации
 */
function validateCSSTheme(componentName, themeName, themePath, requiredVariables) {
  const foundVariables = extractVariablesFromFile(themePath)
  const missingVariables = requiredVariables.filter(variable => 
    !foundVariables.includes(variable)
  )
  
  return {
    component: componentName,
    theme: themeName,
    file: themePath,
    isValid: missingVariables.length === 0,
    totalRequired: requiredVariables.length,
    totalFound: foundVariables.length,
    missingVariables,
    foundVariables
  }
}

/**
 * Проверяет все темы компонента
 * @param {string} componentName - Название компонента
 * @param {Object} config - Конфигурация компонента
 * @returns {Object[]} Результаты валидации
 */
function validateComponentThemes(componentName, config) {
  const results = []
  const themesDir = path.join(__dirname, '..', config.path)
  
  if (!fs.existsSync(themesDir)) {
    console.error(`❌ Themes directory not found: ${themesDir}`)
    return results
  }
  
  // Извлекаем переменные из TypeScript интерфейса
  const requiredVariables = extractVariablesFromTypeScript(
    config.typesFile, 
    config.interfaceName
  )
  
  if (requiredVariables.length === 0) {
    console.error(`❌ No variables found in TypeScript interface: ${config.interfaceName}`)
    return results
  }
  
  console.log(`📋 Found ${requiredVariables.length} required variables in ${config.interfaceName}`)
  
  const themeFiles = fs.readdirSync(themesDir)
    .filter(file => file.endsWith('.css'))
  
  themeFiles.forEach(file => {
    const themeName = path.basename(file, '.css')
    const themePath = path.join(themesDir, file)
    const result = validateCSSTheme(componentName, themeName, themePath, requiredVariables)
    results.push(result)
  })
  
  return results
}

/**
 * Выводит результаты валидации
 * @param {Object[]} results - Результаты валидации
 */
function printResults(results) {
  let allValid = true
  
  console.log('\n🎨 CSS Theme Validation Results\n')
  
  results.forEach(result => {
    const status = result.isValid ? '✅' : '❌'
    console.log(`${status} ${result.component} - ${result.theme} theme`)
    
    if (!result.isValid) {
      allValid = false
      console.log(`   Missing variables (${result.missingVariables.length}):`)
      result.missingVariables.forEach(variable => {
        console.log(`     - ${variable}`)
      })
    }
    
    console.log(`   Found: ${result.totalFound}/${result.totalRequired} variables\n`)
  })
  
  if (allValid) {
    console.log('🎉 All CSS themes are valid!')
    process.exit(0)
  } else {
    console.log('❌ Some CSS themes have missing variables')
    process.exit(1)
  }
}

/**
 * Основная функция
 */
function main() {
  const args = process.argv.slice(2)
  const componentName = args[0]
  
  if (componentName && !COMPONENTS_CONFIG[componentName]) {
    console.error(`❌ Unknown component: ${componentName}`)
    console.log('Available components:', Object.keys(COMPONENTS_CONFIG).join(', '))
    process.exit(1)
  }
  
  const componentsToValidate = componentName 
    ? { [componentName]: COMPONENTS_CONFIG[componentName] }
    : COMPONENTS_CONFIG
  
  const allResults = []
  
  Object.entries(componentsToValidate).forEach(([name, config]) => {
    console.log(`\n🔍 Validating ${name} component...`)
    const results = validateComponentThemes(name, config)
    allResults.push(...results)
  })
  
  printResults(allResults)
}

// Запуск валидации
main()
