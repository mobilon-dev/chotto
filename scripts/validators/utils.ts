import fs from 'fs';

export function shouldSkipValidation(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').slice(0, 5);
  return lines.some(line => {
    const trimmedLine = line.trim().toLowerCase();
    return (
      trimmedLine.includes('@validation-ignore') ||
      trimmedLine.includes('@validator-ignore') ||
      trimmedLine.includes('@skip-validation') ||
      trimmedLine.includes('@no-validation') ||
      trimmedLine.includes('@disable-validation') ||
      trimmedLine.includes('@validation-disabled') ||
      trimmedLine.includes('@theme-validation-skip') ||
      trimmedLine.includes('@css-validation-ignore') ||
      trimmedLine.includes('@style-validation-skip') ||
      trimmedLine.includes('eslint-disable') ||
      trimmedLine.includes('stylelint-disable') ||
      trimmedLine.includes('prettier-ignore')
    );
  });
}


