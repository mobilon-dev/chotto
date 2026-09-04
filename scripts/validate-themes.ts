#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

// Все валидаторы, утилиты и типы из централизованного экспорта
import {
  validateScopedStylesInVueFile,
  validateNoThemeImportsInStyleFiles,
  validateFallbacksInStyleFiles,
  validateNoCSSClassesInThemeFiles,
  validateCSSVariablePrefixes,
  validateComponentThemeInterface,
  validateComponentStyleInterface,
  getComponentInterface,
  validateForbiddenGlobalVariablesInStyleFiles,
  validateForbiddenGlobalVariablesInThemeFiles,
  validateThemeVariablesInThemeFiles,
  validateThemeUsageInComponents,
  validateNoDataThemeInStyleFiles,
  extractCSSVariablesFromSCSS,
  getGlobalThemeInterfaceVariables,
  validateSingleGlobalTheme,
  log,
  printInvalidResults,
  printStats,
  shouldSkipValidation,
  InterfaceValidationResult,
  PrefixValidationResult,
  ForbiddenVariablesValidationResult,
  ThemeUsageValidationResult,
  DataThemeValidationResult,
  CSSClassesValidationResult,
  ThemeImportsValidationResult,
  FallbackValidationResult,
  ScopedStylesValidationResult,
  GlobalThemeValidationResult,
} from "./validators";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  log("🔍 Начинаю валидацию тем компонентов...", "cyan");
  log("");

  // 0. Глобальные темы (src/themes/*/vars.scss) против интерфейса src/themes/types.ts
  const globalInterfaceVars = getGlobalThemeInterfaceVariables();
  const globalThemeResults: GlobalThemeValidationResult[] = [];
  if (globalInterfaceVars.length === 0) {
    log(
      "⚠️  Глобальный интерфейс тем не найден или пуст (src/themes/types.ts)",
      "yellow"
    );
  } else {
    const globalVarsPaths = await glob("src/themes/*/vars.scss");
    if (globalVarsPaths.length === 0) {
      log(
        "⚠️  Файлы глобальных тем не найдены (ожидались src/themes/*/vars.scss)",
        "yellow"
      );
    }
    for (const themeVarsPath of globalVarsPaths) {
      const res = validateSingleGlobalTheme(themeVarsPath, globalInterfaceVars);
      globalThemeResults.push(res);
      if (res.isValid) {
        log(
          `✅ Глобальная тема ${res.themeFolder}/vars.scss: интерфейс OK`,
          "green"
        );
      } else {
        log(
          `❌ Глобальная тема ${res.themeFolder}/vars.scss: ${res.errors.join(
            "; "
          )}`,
          "red"
        );
      }
    }
    log("");
  }

  // Находим компоненты рекурсивно: любая папка внутри src/components/**, в которой есть подпапка styles
  // Исключаем только служебные подпапки (styles, stories, themes) как сами компоненты
  const allPaths = await glob("src/components/**");
  const componentPaths = allPaths.filter((p) => {
    const isDirectory = fs.existsSync(p) && fs.statSync(p).isDirectory();
    if (!isDirectory) return false;
    const pathParts = p.split("/");
    const name = pathParts[pathParts.length - 1];
    // Исключаем служебные папки сами по себе
    if (["styles", "stories", "themes"].includes(name)) return false;
    // Считаем компонентом только папку, в которой есть подпапка styles
    const stylesDir = `${p}/styles`;
    return fs.existsSync(stylesDir) && fs.statSync(stylesDir).isDirectory();
  });

  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  const forbiddenResults: ForbiddenVariablesValidationResult[] = [];
  const themeUsageResults: ThemeUsageValidationResult[] = [];
  const dataThemeResults: DataThemeValidationResult[] = [];
  const cssClassesResults: CSSClassesValidationResult[] = [];
  const themeImportsResults: ThemeImportsValidationResult[] = [];
  const fallbackResults: FallbackValidationResult[] = [];
  const scopedStylesResults: ScopedStylesValidationResult[] = [];

  for (const componentPath of componentPaths) {
    const componentName = path.basename(componentPath);
    const componentFolder = path.basename(path.dirname(componentPath));
    const typesPath = path.join(componentPath, "styles", "types.ts");

    // Проверяем основной файл стилей компонента (для всех компонентов)
    const stylePath = path.join(
      componentPath,
      "styles",
      `${componentName}.scss`
    );
    // Путь к основному .vue файлу компонента
    const vueFilePath = path.join(componentPath, `${componentName}.vue`);
    if (fs.existsSync(stylePath)) {
      // Проверяем, нужно ли пропустить валидацию этого файла
      if (shouldSkipValidation(stylePath)) {
        log(
          `   ⏭️  style.scss: пропущен (найден комментарий исключения)`,
          "yellow"
        );
      } else {
        // 3. Валидация отсутствия глобальных переменных в файлах стилей
        const forbiddenStyleResult =
          validateForbiddenGlobalVariablesInStyleFiles(
            componentName,
            componentFolder,
            stylePath
          );
        forbiddenResults.push(forbiddenStyleResult);

        // 4. Валидация использования базовых настроек темы
        const themeUsageResult = validateThemeUsageInComponents(
          componentName,
          componentFolder,
          stylePath
        );
        themeUsageResults.push(themeUsageResult);

        // 5. Валидация отсутствия data-theme в файлах стилей
        const dataThemeResult = validateNoDataThemeInStyleFiles(
          componentName,
          componentFolder,
          stylePath
        );
        dataThemeResults.push(dataThemeResult);

        // 7. Валидация отсутствия импортов тем в файлах стилей
        const themeImportsResult = validateNoThemeImportsInStyleFiles(
          componentName,
          componentFolder,
          stylePath
        );
        themeImportsResults.push(themeImportsResult);

        // 8. Валидация использования фоллбеков в SCSS файлах компонентов
        const fallbackResult = validateFallbacksInStyleFiles(
          componentName,
          componentFolder,
          stylePath
        );
        fallbackResults.push(fallbackResult);

        if (!forbiddenStyleResult.isValid) {
          log(
            `   ❌  style.scss: ${forbiddenStyleResult.errors.join("; ")}`,
            "red"
          );
        }

        if (!themeUsageResult.isValid) {
          log(
            `   ⚠️  style.scss: ${themeUsageResult.errors.join("; ")}`,
            "yellow"
          );
        }

        if (!dataThemeResult.isValid) {
          log(`   ❌  style.scss: ${dataThemeResult.errors.join("; ")}`, "red");
        }

        if (!themeImportsResult.isValid) {
          log(
            `   ❌  style.scss: ${themeImportsResult.errors.join("; ")}`,
            "red"
          );
        }

        if (!fallbackResult.isValid) {
          log(`   ❌  style.scss: ${fallbackResult.errors.join("; ")}`, "red");
        }
      }
    }

    // 9. Валидация наличия scoped стилей в основном .vue файле
    const scopedStylesResult = validateScopedStylesInVueFile(
      componentName,
      componentFolder,
      vueFilePath
    );
    scopedStylesResults.push(scopedStylesResult);
    if (!scopedStylesResult.isValid) {
      log(
        `   ❌  ${scopedStylesResult.vueFile}: ${scopedStylesResult.errors.join(
          "; "
        )}`,
        "red"
      );
    }

    // Проверяем, есть ли файл types.ts
    if (!fs.existsSync(typesPath)) {
      log(`⚠️  Компонент ${componentName}: файл types.ts не найден`, "yellow");
      continue;
    }

    // Получаем ожидаемые переменные из интерфейса
    const expectedVariables = getComponentInterface(componentPath);

    if (expectedVariables.length === 0) {
      log(
        `⚠️  Компонент ${componentName}: интерфейс не найден или пуст`,
        "yellow"
      );
      continue;
    }

    log(`📋 Проверяю компонент: ${componentName}`, "blue");
    log(`   Ожидаемые переменные: ${expectedVariables.length}`, "blue");

    // 1.0. Валидация соответствия главного .scss интерфейсу types.ts
    if (fs.existsSync(stylePath)) {
      if (shouldSkipValidation(stylePath)) {
        log(
          `   ⏭️  ${componentName}.scss ↔ types.ts: пропущен (найден комментарий исключения)`,
          "yellow"
        );
      } else {
        const styleInterfaceResult = validateComponentStyleInterface(
          componentName,
          componentFolder,
          stylePath,
          expectedVariables
        );
        interfaceResults.push(styleInterfaceResult);

        if (styleInterfaceResult.isValid) {
          log(`   ✅ ${componentName}.scss ↔ types.ts: интерфейс OK`, "green");
        } else {
          log(
            `   ❌ ${componentName}.scss ↔ types.ts: ${styleInterfaceResult.errors.join("; ")}`,
            "red"
          );
        }
      }
    }

    // Находим все темы компонента
    const normalizedPath = componentPath.replace(/\\/g, "/");
    const themePaths = await glob(`${normalizedPath}/styles/themes/*.scss`);

    for (const themePath of themePaths) {
      const themeName = path.basename(themePath, ".scss");

      // Проверяем, нужно ли пропустить валидацию этого файла темы
      if (shouldSkipValidation(themePath)) {
        log(
          `   ⏭️  ${themeName}: пропущен (найден комментарий исключения)`,
          "yellow"
        );
        continue;
      }

      // 1. Валидация соответствия интерфейсу
      const interfaceResult = validateComponentThemeInterface(
        componentName,
        componentFolder,
        themePath,
        expectedVariables
      );
      interfaceResults.push(interfaceResult);

      // 2. Валидация префиксов CSS переменных
      const prefixResult = validateCSSVariablePrefixes(
        componentName,
        componentFolder,
        themePath
      );
      prefixResults.push(prefixResult);

      // 3. Валидация отсутствия глобальных переменных в файлах тем (разрешены)
      const forbiddenResult = validateForbiddenGlobalVariablesInThemeFiles(
        componentName,
        componentFolder,
        themePath
      );
      forbiddenResults.push(forbiddenResult);

      // 3.1. Валидация использования только разрешенных переменных в файлах тем
      const themeVariablesResult = validateThemeVariablesInThemeFiles(
        componentName,
        componentFolder,
        themePath
      );
      forbiddenResults.push(themeVariablesResult);

      // 6. Валидация отсутствия CSS классов в файлах тем
      const cssClassesResult = validateNoCSSClassesInThemeFiles(
        componentName,
        componentFolder,
        themePath
      );
      cssClassesResults.push(cssClassesResult);

      if (
        interfaceResult.isValid &&
        prefixResult.isValid &&
        forbiddenResult.isValid &&
        themeVariablesResult.isValid &&
        cssClassesResult.isValid
      ) {
        log(
          `   ✅ ${themeName}: интерфейс OK, префиксы OK, глобальные переменные OK, переменные тем OK, CSS классы OK`,
          "green"
        );
      } else {
        const allErrors = [
          ...interfaceResult.errors,
          ...prefixResult.errors,
          ...forbiddenResult.errors,
          ...themeVariablesResult.errors,
          ...cssClassesResult.errors,
        ];
        log(`   ❌ ${themeName}: ${allErrors.join("; ")}`, "red");
      }
    }

    log("");
  }

  // Выводим итоговую статистику
  const allResults = [
    ...interfaceResults,
    ...prefixResults,
    ...forbiddenResults,
    ...themeUsageResults,
    ...dataThemeResults,
    ...cssClassesResults,
    ...themeImportsResults,
    ...fallbackResults,
    ...scopedStylesResults,
  ];
  const validResults = allResults.filter((r) => r.isValid);
  const invalidResults = allResults.filter((r) => !r.isValid);

  const totalGlobal = globalThemeResults.length;
  const validGlobal = globalThemeResults.filter((r) => r.isValid).length;
  const invalidGlobal = totalGlobal - validGlobal;
  printStats(
    interfaceResults.length,
    validResults.length,
    invalidResults.length,
    globalInterfaceVars.length > 0
      ? { total: totalGlobal, valid: validGlobal, invalid: invalidGlobal }
      : undefined
  );

  if (invalidResults.length > 0 || globalThemeResults.some((r) => !r.isValid)) {
    printInvalidResults(
      invalidResults as any,
      globalThemeResults.filter((r) => !r.isValid)
    );
    process.exit(1);
  } else {
    log("", "reset");
    log("🎉 Все темы валидны!", "green");
  }
}

// Запускаем валидацию
validateAllThemes().catch((error) => {
  log(`❌ Ошибка при валидации: ${error}`, "red");
  process.exit(1);
});

export {
  validateAllThemes,
  extractCSSVariablesFromSCSS,
  validateComponentThemeInterface,
  validateComponentStyleInterface,
  validateCSSVariablePrefixes,
  validateForbiddenGlobalVariablesInStyleFiles,
  validateForbiddenGlobalVariablesInThemeFiles,
  validateThemeVariablesInThemeFiles,
  validateThemeUsageInComponents,
  validateNoDataThemeInStyleFiles,
  validateNoCSSClassesInThemeFiles,
  validateNoThemeImportsInStyleFiles,
  validateFallbacksInStyleFiles,
  shouldSkipValidation,
};