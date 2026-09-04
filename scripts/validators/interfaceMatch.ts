import fs from 'fs';
import path from 'path';
import { InterfaceValidationResult } from './types';

export function getComponentInterface(componentPath: string): string[] {
  const typesPath = path.join(componentPath, 'styles', 'types.ts');
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export interface (\w*ThemeCSSVariables)\s*{([^}]+)}/s;
  const match = content.match(interfaceRegex);
  if (!match) {
    return [];
  }
  const interfaceContent = match[2];
  const variables: string[] = [];
  const variableRegex = /'([^']+)':\s*string;/g;
  let varMatch;
  while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
    variables.push(varMatch[1]);
  }
  return variables;
}

/** Извлекает CSS-переменные компонента (`--chotto-<component>-*`) из содержимого style.scss. */
export function extractComponentVariablesFromStyleContent(
  componentName: string,
  content: string
): string[] {
  const expectedPrefix = `--chotto-${componentName.toLowerCase()}-`;
  const variables = new Set<string>();
  const variableRegex = /--chotto-[a-zA-Z0-9-]+/g;
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    if (match[0].startsWith(expectedPrefix)) {
      variables.add(match[0]);
    }
  }
  return [...variables];
}

/** Чистая проверка: переменные в главном .scss соответствуют types.ts. */
export function validateComponentStyleInterfaceInContent(
  componentName: string,
  componentFolder: string,
  content: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const actualVariableNames = extractComponentVariablesFromStyleContent(componentName, content);
  const missingVariables = expectedVariables.filter(v => !actualVariableNames.includes(v));
  const extraVariables = actualVariableNames.filter(v => !expectedVariables.includes(v));
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  const styleFileLabel = `${componentName}.scss`;
  if (missingVariables.length > 0) {
    errors.push(
      `Отсутствуют переменные (есть в types.ts, нет в ${styleFileLabel}): ${missingVariables.join(', ')}`
    );
  }
  if (extraVariables.length > 0) {
    errors.push(
      `Лишние переменные (есть в ${styleFileLabel}, нет в types.ts): ${extraVariables.join(', ')}`
    );
  }
  return {
    component: componentName,
    componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}

/** Сравнивает переменные главного ComponentName.scss с интерфейсом types.ts. */
export function validateComponentStyleInterface(
  componentName: string,
  componentFolder: string,
  stylePath: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  return validateComponentStyleInterfaceInContent(
    componentName,
    componentFolder,
    content,
    expectedVariables
  );
}

export function validateComponentThemeInterface(
  componentName: string,
  componentFolder: string,
  themePath: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  const actualVariableNames: string[] = [];
  const variableRegex = /--chotto-([^:]+):\s*([^;]+);/g;
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = `--chotto-${match[1]}`;
    actualVariableNames.push(variableName);
  }

  const missingVariables = expectedVariables.filter(v => !actualVariableNames.includes(v));
  const extraVariables = actualVariableNames.filter(v => !expectedVariables.includes(v));
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  if (missingVariables.length > 0) {
    errors.push(`Отсутствуют переменные (есть в types.ts, нет в файле темы): ${missingVariables.join(', ')}`);
  }
  if (extraVariables.length > 0) {
    errors.push(`Лишние переменные (есть в файле темы, нет в types.ts): ${extraVariables.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: themeName,
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}


