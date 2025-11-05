import fs from 'fs';
import path from 'path';
import { CSSClassesValidationResult } from './types';

export function validateNoCSSClassesInThemeFiles(
  componentName: string,
  componentFolder: string,
  themePath: string
): CSSClassesValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  const cssClasses: string[] = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('/*')) continue;
    const classMatch = line.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{/);
    if (classMatch) {
      const className = classMatch[1];
      cssClasses.push(`.${className}`);
    }
  }
  const isValid = cssClasses.length === 0;
  const errors: string[] = [];
  if (cssClasses.length > 0) {
    errors.push(`CSS классы в файле темы: ${cssClasses.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: themeName,
    isValid,
    errors,
    cssClasses
  };
}


