import fs from 'fs';
import { ThemeImportsValidationResult } from './types';

export function validateNoThemeImportsInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): ThemeImportsValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const themeImports: string[] = [];
  const themeImportRegex = /@(import|use)\s+['"][^'"]*themes[^'"]*['"]/g;
  let match;
  while ((match = themeImportRegex.exec(content)) !== null) {
    themeImports.push(match[0]);
  }
  const isValid = themeImports.length === 0;
  const errors: string[] = [];
  if (themeImports.length > 0) {
    errors.push(`Импорты тем в файле стилей: ${themeImports.join(', ')}`);
  }
  return {
    component: componentName,
    componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    themeImports
  };
}


