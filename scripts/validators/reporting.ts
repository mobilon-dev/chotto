const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
} as const;

type Color = keyof typeof colors;

export function log(message: string, color: Color = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

export function printInvalidResults(
  invalidResults: Array<{ component: string; componentFolder: string; errors: string[] } & Record<string, any>>,
  globalThemeInvalid: Array<{ themeFolder: string; themeFile: string; errors: string[] }>
): void {
  log('', 'reset');
  log('❌ Детали ошибок:', 'red');
  for (const result of invalidResults) {
    let displayName: string;
    const hasVueFile = (result as any).vueFile !== undefined;
    if (hasVueFile) {
      const vueFile = (result as any).vueFile as string;
      displayName = `${result.componentFolder} / ${result.component} / ${vueFile}`;
    } else {
      displayName = (result as any).theme === 'style.scss'
        ? `${result.componentFolder} / ${result.component} / ${result.component}.scss`
        : `${result.componentFolder} / ${result.component} / ${(result as any).theme}`;
    }
    log(`   ${displayName}:`, 'yellow');
    for (const error of result.errors) {
      log(`     - ${error}`, 'red');
    }
  }
  for (const g of globalThemeInvalid) {
    log(`   themes / ${g.themeFolder} / ${g.themeFile}:`, 'yellow');
    for (const error of g.errors) {
      log(`     - ${error}`, 'red');
    }
  }
}

export function printStats(
  totalInterfaces: number,
  validCount: number,
  invalidCount: number,
  globalSummary?: { total: number; valid: number; invalid: number }
) {
  log('📊 Итоговая статистика:', 'cyan');
  log(`   Всего проверено: ${totalInterfaces} тем (+ scoped-проверка на компонент)`, 'blue');
  log(`   ✅ Валидных проверок: ${validCount}`, 'green');
  log(`   ❌ Невалидных проверок: ${invalidCount}`, invalidCount > 0 ? 'red' : 'green');
  if (globalSummary) {
    log(`   Глобальные темы (vars.scss): ${globalSummary.total}`, 'blue');
    log(`     ✅ Валидно: ${globalSummary.valid}`, 'green');
    log(`     ❌ Невалидно: ${globalSummary.invalid}`, globalSummary.invalid > 0 ? 'red' : 'green');
  }
}


