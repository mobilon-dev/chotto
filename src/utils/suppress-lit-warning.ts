// Перехватываем и подавляем предупреждение о deprecated 'lit-element'
// из библиотеки lit, которое появляется при загрузке lottie-player/tgs-player
// Это должно выполняться как можно раньше, до импорта библиотек

(function() {
  'use strict';
  
  if (typeof window === 'undefined' || typeof console === 'undefined') {
    return;
  }
  
  // Проверяем, не был ли уже установлен перехватчик
  if ((window as any).__litWarningSuppressed) {
    return;
  }
  
  (window as any).__litWarningSuppressed = true;
  
  const originalWarn = console.warn;
  const originalError = console.error;
  
  // Перехватываем console.warn
  console.warn = ((...args: unknown[]) => {
    if (args.length > 0) {
      const message = String(args[0] || '');
      
      // Подавляем различные варианты сообщения о deprecated lit-element
      if (
        message.includes("The main 'lit-element' module entrypoint is deprecated") ||
        (message.includes("lit-element") && message.includes("deprecated")) ||
        message.includes("lit.dev/msg/deprecated-import-path") ||
        message.includes("Please update your imports to use the 'lit' package") ||
        message.includes("deprecated-import-path")
      ) {
        return; // Игнорируем это предупреждение
      }
    }
    
    originalWarn.apply(console, args);
  }) as typeof console.warn;
  
  // Также перехватываем console.error на случай, если предупреждение выводится через error
  console.error = ((...args: unknown[]) => {
    if (args.length > 0) {
      const message = String(args[0] || '');
      
      if (
        message.includes("The main 'lit-element' module entrypoint is deprecated") ||
        (message.includes("lit-element") && message.includes("deprecated")) ||
        message.includes("lit.dev/msg/deprecated-import-path")
      ) {
        return; // Игнорируем это предупреждение
      }
    }
    
    originalError.apply(console, args);
  }) as typeof console.error;
})();

