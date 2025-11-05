import fs from 'fs';
import path from 'path';

/**
 * Интерфейс для результатов валидации наличия scoped стилей в Vue-компоненте
 */
export interface ScopedStylesValidationResult {
  component: string;
  componentFolder: string;
  vueFile: string;
  isValid: boolean;
  errors: string[];
  hasStyleBlock: boolean;
  hasScopedStyle: boolean;
}

/**
 * Валидация наличия scoped стилей в основном .vue файле компонента
 */
export function validateScopedStylesInVueFile(
  componentName: string,
  componentFolder: string,
  vueFilePath: string
): ScopedStylesValidationResult {
  const vueFileName = path.basename(vueFilePath);

  if (!fs.existsSync(vueFilePath)) {
    return {
      component: componentName,
      componentFolder,
      vueFile: vueFileName,
      isValid: false,
      errors: [
        `Файл ${vueFileName} не найден для компонента; ожидается ${componentName}.vue`
      ],
      hasStyleBlock: false,
      hasScopedStyle: false
    };
  }

  const content = fs.readFileSync(vueFilePath, 'utf-8');
  // Ищем наличие любого style-блока
  const styleTagRegex = /<style\b[^>]*>/gi;
  const hasStyleBlock = styleTagRegex.test(content);
  // Ищем хотя бы один style-блок с атрибутом scoped
  const scopedStyleTagRegex = /<style\b[^>]*\bscoped\b[^>]*>/gi;
  const hasScopedStyle = scopedStyleTagRegex.test(content);

  const errors: string[] = [];
  if (!hasStyleBlock) {
    errors.push('Отсутствует блок <style> в .vue файле компонента');
  }
  if (!hasScopedStyle) {
    errors.push('Отсутствует атрибут scoped у блока <style> в .vue файле');
  }

  return {
    component: componentName,
    componentFolder,
    vueFile: vueFileName,
    isValid: hasStyleBlock && hasScopedStyle,
    errors,
    hasStyleBlock,
    hasScopedStyle
  };
}


