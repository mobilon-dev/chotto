// Валидаторы
export { validateScopedStylesInVueFile } from "./scopedStyles";
export { validateNoThemeImportsInStyleFiles } from "./noThemeImports";
export { validateFallbacksInStyleFiles } from "./fallbacks";
export { validateNoCSSClassesInThemeFiles } from "./cssClassesInTheme";
export { validateCSSVariablePrefixes, validateCSSVariablePrefixesInContent } from "./prefixes";
export { validateComponentThemeInterface, getComponentInterface } from "./interfaceMatch";
export { validateForbiddenGlobalVariablesInStyleFiles, validateForbiddenGlobalVariablesInThemeFiles, validateThemeVariablesInThemeFiles, validateForbiddenGlobalVariablesInContent, validateThemeVariablesInContent } from "./forbiddenVariables";
export { validateThemeUsageInComponents } from "./themeUsage";
export { validateNoDataThemeInStyleFiles, validateNoDataThemeInContent } from "./dataTheme";
export { extractCSSVariablesFromSCSS, getGlobalThemeInterfaceVariables, validateSingleGlobalTheme } from "./globalThemes";

// Утилиты и отчетность
export { log, printInvalidResults, printStats } from "./reporting";
export { shouldSkipValidation } from "./utils";

// Типы
export type { InterfaceValidationResult, PrefixValidationResult, ForbiddenVariablesValidationResult, ThemeUsageValidationResult, DataThemeValidationResult, CSSClassesValidationResult, ThemeImportsValidationResult, FallbackValidationResult, ScopedStylesValidationResult, GlobalThemeValidationResult } from "./types";
