import fs from 'fs';
import { DataThemeValidationResult } from './types';

export function validateNoDataThemeInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): DataThemeValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const dataThemeUsage: string[] = [];
  const dataThemeRegex = /\[data-theme="[^"]+"\]/g;
  let match;
  while ((match = dataThemeRegex.exec(content)) !== null) {
    dataThemeUsage.push(match[0]);
  }
  const isValid = dataThemeUsage.length === 0;
  const errors: string[] = [];
  if (dataThemeUsage.length > 0) {
    errors.push(`Использование data-theme в файле стилей: ${dataThemeUsage.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    dataThemeUsage
  };
}


