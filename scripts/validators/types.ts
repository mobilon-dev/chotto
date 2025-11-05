export interface BaseValidationResult {
  component: string;
  componentFolder: string;
  isValid: boolean;
  errors: string[];
}

export interface InterfaceValidationResult extends BaseValidationResult {
  theme: string;
  missingVariables: string[];
  extraVariables: string[];
}

export interface PrefixValidationResult extends BaseValidationResult {
  theme: string;
  invalidPrefixes: string[];
}

export interface ForbiddenVariablesValidationResult extends BaseValidationResult {
  theme: string;
  forbiddenVariables: string[];
}

export interface ThemeUsageValidationResult extends BaseValidationResult {
  theme: string;
  hardcodedValues: string[];
}

export interface DataThemeValidationResult extends BaseValidationResult {
  theme: string;
  dataThemeUsage: string[];
}

export interface CSSClassesValidationResult extends BaseValidationResult {
  theme: string;
  cssClasses: string[];
}

export interface ThemeImportsValidationResult extends BaseValidationResult {
  theme: string;
  themeImports: string[];
}

export interface FallbackValidationResult extends BaseValidationResult {
  theme: string;
  missingFallbacks: string[];
}

export interface ScopedStylesValidationResult extends BaseValidationResult {
  vueFile: string;
  hasStyleBlock: boolean;
  hasScopedStyle: boolean;
}

export interface GlobalThemeValidationResult {
  themeFolder: string;
  themeFile: string;
  isValid: boolean;
  errors: string[];
  missingVariables: string[];
  extraVariables: string[];
}


