#!/usr/bin/env node

/**
 * Утилита для генерации конфигурации валидатора
 * Автоматически находит TypeScript интерфейсы тем и создает конфигурацию
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Ищет компоненты с TypeScript интерфейсами тем
 * @param {string} componentsDir - Директория компонентов
 * @returns {Object} Конфигурация компонентов
 */
function findComponentsWithThemeInterfaces(componentsDir) {
  const config = {}
  const fullComponentsDir = path.join(__dirname, '..', componentsDir)
  
  if (!fs.existsSync(fullComponentsDir)) {
    console.log(`Components directory not found: ${fullComponentsDir}`)
    return config
  }
  
  const components = fs.readdirSync(fullComponentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
  
  components.forEach(component => {
    const componentName = component.name
    const componentPath = path.join(fullComponentsDir, componentName)
    
    // Проверяем наличие types.ts
    const typesFile = path.join(componentPath, 'types.ts')
    if (!fs.existsSync(typesFile)) {
      return
    }
    
    // Проверяем наличие интерфейса темы
    const typesContent = fs.readFileSync(typesFile, 'utf8')
    const themeInterfaceMatch = typesContent.match(/export\s+interface\s+(\w+ThemeVariables)/)
    
    if (!themeInterfaceMatch) {
      return
    }
    
    const interfaceName = themeInterfaceMatch[1]
    
    // Проверяем наличие директории themes
    const themesDir = path.join(componentPath, 'styles', 'themes')
    if (!fs.existsSync(themesDir)) {
      return
    }
    
    // Добавляем в конфигурацию
    config[componentName] = {
      path: `${componentsDir}/${componentName}/styles/themes`,
      typesFile: `${componentsDir}/${componentName}/types.ts`,
      interfaceName: interfaceName
    }
    
    console.log(`✅ Found ${componentName} with ${interfaceName} interface`)
  })
  
  return config
}

/**
 * Генерирует конфигурацию валидатора
 * @param {Object} componentsConfig - Конфигурация компонентов
 * @returns {string} JavaScript код конфигурации
 */
function generateValidatorConfig(componentsConfig) {
  const configEntries = Object.entries(componentsConfig)
    .map(([name, config]) => {
      return `  '${name}': {
    path: '${config.path}',
    typesFile: '${config.typesFile}',
    interfaceName: '${config.interfaceName}'
  }`
    })
    .join(',\n')
  
  return `// Автоматически сгенерированная конфигурация валидатора
// Источник: TypeScript интерфейсы компонентов

const COMPONENTS_CONFIG = {
${configEntries}
}

export default COMPONENTS_CONFIG
`
}

/**
 * Основная функция
 */
function main() {
  const args = process.argv.slice(2)
  const componentsDir = args[0] || 'src/library/components'
  const outputFile = args[1] || 'scripts/validator-config.js'
  
  console.log(`🔍 Scanning for components with theme interfaces in ${componentsDir}...`)
  
  const componentsConfig = findComponentsWithThemeInterfaces(componentsDir)
  
  if (Object.keys(componentsConfig).length === 0) {
    console.log('❌ No components with theme interfaces found')
    process.exit(1)
  }
  
  console.log(`\n📋 Found ${Object.keys(componentsConfig).length} components:`)
  Object.keys(componentsConfig).forEach(name => {
    console.log(`   - ${name}`)
  })
  
  // Генерируем конфигурацию
  const configCode = generateValidatorConfig(componentsConfig)
  
  // Записываем в файл
  const outputPath = path.join(__dirname, '..', outputFile)
  fs.writeFileSync(outputPath, configCode, 'utf8')
  
  console.log(`\n✅ Generated validator config: ${outputFile}`)
  console.log(`\nUsage:`)
  console.log(`  import COMPONENTS_CONFIG from './${outputFile}'`)
  console.log(`  // Use in validate-css-themes.js`)
}

// Запуск генерации
main()
