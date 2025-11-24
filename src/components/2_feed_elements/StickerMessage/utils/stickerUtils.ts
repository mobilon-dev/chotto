/**
 * Утилиты для работы со стикерами
 */

/**
 * Определяет, является ли стикер анимированным (TGS форматом)
 * 
 * @param url - URL стикера
 * @param isAnimated - Явное указание на анимированность (если доступно)
 * @returns true, если стикер анимированный (TGS)
 * 
 * @example
 * // Явное указание (приоритет)
 * isAnimatedSticker('any-url.webp', true) // true
 * 
 * // Автоматическое определение по URL
 * isAnimatedSticker('./images/AnimatedSticker.tgs') // true
 * isAnimatedSticker('./images/sticker.webp') // false
 */
export function isAnimatedSticker(url?: string, isAnimated?: boolean): boolean {
  // Если есть явное указание на анимированный стикер
  if (isAnimated === true) {
    return true;
  }
  
  // Если явно указано, что не анимированный
  if (isAnimated === false) {
    return false;
  }
  
  // Fallback: проверка по URL
  if (!url) return false;
  
  const urlString = String(url);
  const urlLower = urlString.toLowerCase();
  
  // Проверка по расширению в URL (работает даже после обработки Vite с хешами)
  // Примеры: './images/AnimatedSticker.tgs', 'sticker.tgs?v=123', 'path/animatedsticker'
  if (urlLower.includes('.tgs') || urlLower.includes('animatedsticker')) {
    return true;
  }
  
  return false;
}

