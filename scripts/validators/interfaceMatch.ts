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


