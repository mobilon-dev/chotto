import fs from 'fs';
import path from 'path';
import { PrefixValidationResult } from './types';

export function validateCSSVariablePrefixes(
  componentName: string,
  componentFolder: string,
  themePath: string
): PrefixValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  const variableRegex = /--([a-zA-Z0-9-]+)\s*:/g;
  const expectedPrefix = `--chotto-${componentName.toLowerCase()}-`;
  const invalidPrefixes: string[] = [];
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    const fullVariableName = `--${match[1]}`;
    if (!fullVariableName.startsWith(expectedPrefix)) {
      invalidPrefixes.push(fullVariableName);
    }
  }
  const isValid = invalidPrefixes.length === 0;
  const errors: string[] = [];
  if (invalidPrefixes.length > 0) {
    errors.push(`Неправильные префиксы: ${invalidPrefixes.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: themeName,
    isValid,
    errors,
    invalidPrefixes
  };
}


