import fs from 'fs';
import { FallbackValidationResult } from './types';

export function validateFallbacksInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): FallbackValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const missingFallbacks: string[] = [];
  const varWithoutFallbackRegex = /var\(--chotto-[^,)]+\)(?!\s*,)/g;
  let match;
  while ((match = varWithoutFallbackRegex.exec(content)) !== null) {
    const variableName = match[0];
    missingFallbacks.push(variableName);
  }
  const isValid = missingFallbacks.length === 0;
  const errors: string[] = [];
  if (missingFallbacks.length > 0) {
    errors.push(`CSS переменные без фолбеков: ${missingFallbacks.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    missingFallbacks
  };
}


