import fs from 'fs';
import { ThemeUsageValidationResult } from './types';

export function validateThemeUsageInComponents(
  componentName: string,
  componentFolder: string,
  stylePath: string
): ThemeUsageValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const hardcodedValues: string[] = [];

  function containsCSSVariable(line: string): boolean {
    return line.includes('var(--chotto-') || line.includes('var(--shadow-');
  }

  function isCSSVariable(value: string): boolean {
    const trimmed = value.trim();
    return trimmed.startsWith('var(--chotto-') || trimmed.startsWith('var(--shadow-');
  }

  function getLineContainingMatch(text: string, index: number): string {
    const beforeMatch = text.substring(0, index);
    const lines = beforeMatch.split('\n');
    return lines[lines.length - 1] || '';
  }

  const colorRegex = /:\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]*\)|hsla?\([^)]*\));/g;
  let colorMatch;
  while ((colorMatch = colorRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, colorMatch.index);
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный цвет: ${colorMatch[1]}`);
    }
  }

  const fontSizeRegex = /font-size:\s*([0-9.]+(?:rem|em|px|%));/g;
  let fontSizeMatch;
  while ((fontSizeMatch = fontSizeRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontSizeMatch.index);
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный размер шрифта: ${fontSizeMatch[1]}`);
    }
  }

  const paddingRegex = /padding:\s*([0-9.]+(?:rem|em|px|%)(?:\s+[0-9.]+(?:rem|em|px|%))*);/g;
  let paddingMatch;
  while ((paddingMatch = paddingRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, paddingMatch.index);
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданные отступы: ${paddingMatch[1]}`);
    }
  }

  const borderRadiusRegex = /border-radius:\s*([0-9.]+(?:rem|em|px|%));/g;
  let borderRadiusMatch;
  while ((borderRadiusMatch = borderRadiusRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, borderRadiusMatch.index);
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданное скругление: ${borderRadiusMatch[1]}`);
    }
  }

  const fontFamilyRegex = /font-family:\s*([^;]+);/g;
  let fontFamilyMatch;
  while ((fontFamilyMatch = fontFamilyRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontFamilyMatch.index);
    const fontValue = fontFamilyMatch[1].trim();
    if (!containsCSSVariable(currentLine) && !isCSSVariable(fontValue)) {
      hardcodedValues.push(`Жестко заданный шрифт: ${fontValue}`);
    }
  }

  const boxShadowRegex = /box-shadow:\s*([^;]+);/g;
  let boxShadowMatch;
  while ((boxShadowMatch = boxShadowRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, boxShadowMatch.index);
    const shadowValue = boxShadowMatch[1].trim();
    if (!containsCSSVariable(currentLine) && !isCSSVariable(shadowValue)) {
      hardcodedValues.push(`Жестко заданная тень: ${shadowValue}`);
    }
  }

  const isValid = hardcodedValues.length === 0;
  const errors: string[] = [];
  if (hardcodedValues.length > 0) {
    errors.push(`Жестко заданные значения: ${hardcodedValues.join(', ')}`);
  }

  return {
    component: componentName,
    componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    hardcodedValues
  };
}


