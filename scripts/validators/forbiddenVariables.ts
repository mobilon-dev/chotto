import fs from 'fs'
import path from 'path'
import { ForbiddenVariablesValidationResult } from './types'

/** Чистая проверка: в style.scss компонента нельзя var(--chotto-theme-*). */
export function validateForbiddenGlobalVariablesInContent(
  componentName: string,
  componentFolder: string,
  themeLabel: string,
  content: string,
): ForbiddenVariablesValidationResult {
  const globalVariableRegex = /var\(--chotto-theme-([a-zA-Z0-9-]+)\)/g
  const forbiddenVariables: string[] = []
  let match
  while ((match = globalVariableRegex.exec(content)) !== null) {
    forbiddenVariables.push(`--chotto-theme-${match[1]}`)
  }
  const isValid = forbiddenVariables.length === 0
  const errors: string[] = []
  if (forbiddenVariables.length > 0) {
    errors.push(`Запрещенные глобальные переменные: ${forbiddenVariables.join(', ')}`)
  }
  return {
    component: componentName,
    componentFolder,
    theme: themeLabel,
    isValid,
    errors,
    forbiddenVariables,
  }
}

// 3. Запрещенные глобальные переменные в файлах стилей компонентов
export function validateForbiddenGlobalVariablesInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string,
): ForbiddenVariablesValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8')
  return validateForbiddenGlobalVariablesInContent(
    componentName,
    componentFolder,
    'style.scss',
    content,
  )
}

// 3. Разрешены глобальные переменные в файлах тем компонентов
export function validateForbiddenGlobalVariablesInThemeFiles(
  componentName: string,
  componentFolder: string,
  themePath: string,
): ForbiddenVariablesValidationResult {
  const themeName = path.basename(themePath, '.scss')
  // В файлах тем глобальные переменные разрешены
  return {
    component: componentName,
    componentFolder,
    theme: themeName,
    isValid: true,
    errors: [],
    forbiddenVariables: [],
  }
}

/** Чистая проверка: в theme-файлах var() только --chotto-theme-*. */
export function validateThemeVariablesInContent(
  componentName: string,
  componentFolder: string,
  themeName: string,
  content: string,
): ForbiddenVariablesValidationResult {
  const forbiddenVariables: string[] = []
  const varRegex = /var\(--([a-zA-Z0-9-]+)\)/g
  let match
  while ((match = varRegex.exec(content)) !== null) {
    const variableName = `--${match[1]}`
    if (!variableName.startsWith('--chotto-theme-')) {
      forbiddenVariables.push(variableName)
    }
  }
  const isValid = forbiddenVariables.length === 0
  const errors: string[] = []
  if (forbiddenVariables.length > 0) {
    errors.push(
      `Запрещенные переменные (разрешены только --chotto-theme-*): ${forbiddenVariables.join(', ')}`,
    )
  }
  return {
    component: componentName,
    componentFolder,
    theme: themeName,
    isValid,
    errors,
    forbiddenVariables,
  }
}

// 3.1. Разрешенные переменные в файлах тем (только --chotto-theme-*)
export function validateThemeVariablesInThemeFiles(
  componentName: string,
  componentFolder: string,
  themePath: string,
): ForbiddenVariablesValidationResult {
  const themeName = path.basename(themePath, '.scss')
  const content = fs.readFileSync(themePath, 'utf-8')
  return validateThemeVariablesInContent(
    componentName,
    componentFolder,
    themeName,
    content,
  )
}
