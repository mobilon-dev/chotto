import fs from 'fs';
import path from 'path';
import { GlobalThemeValidationResult } from './types';

export function extractCSSVariablesFromSCSS(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const variables: Record<string, string> = {};
  const variableRegex = /--chotto-([^:]+):\s*([^;]+);/g;
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = `--chotto-${match[1]}`;
    const variableValue = match[2].trim();
    variables[variableName] = variableValue;
  }
  return variables;
}

export function getGlobalThemeInterfaceVariables(typesPath: string): string[] {
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export\s+interface\s+ChottoThemeVariables\s*{([\s\S]*?)}/;
  const match = content.match(interfaceRegex);
  if (!match) return [];
  const body = match[1];
  const variables: string[] = [];
  const keyRegex = /'([^']+)'\s*:\s*[^;]+;/g;
  let keyMatch;
  while ((keyMatch = keyRegex.exec(body)) !== null) {
    variables.push(keyMatch[1]);
  }
  return variables;
}

export function validateSingleGlobalTheme(
  themeVarsPath: string,
  expectedVariables: string[]
): GlobalThemeValidationResult {
  const themeFolder = path.basename(path.dirname(themeVarsPath));
  const actualVariables = Object.keys(extractCSSVariablesFromSCSS(themeVarsPath));
  const missingVariables = expectedVariables.filter(v => !actualVariables.includes(v));
  const extraVariables = actualVariables.filter(v => !expectedVariables.includes(v));
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  if (missingVariables.length > 0) {
    errors.push(`Отсутствуют переменные (есть в src/themes/types.ts, нет в vars.scss): ${missingVariables.join(', ')}`);
  }
  if (extraVariables.length > 0) {
    errors.push(`Лишние переменные (есть в vars.scss, нет в src/themes/types.ts): ${extraVariables.join(', ')}`);
  }
  return {
    themeFolder,
    themeFile: 'vars.scss',
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}


