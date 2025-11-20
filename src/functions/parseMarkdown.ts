/**
 * Утилита для парсинга Markdown-текста в HTML
 * 
 * Поддерживает форматирование, используемое в TextFormatToolbar:
 * - **жирный** (bold)
 * - *курсив* (italic)
 * - <u>подчёркнутый</u> (underline)
 * - ~~зачёркнутый~~ (strikethrough)
 * - `встроенный код` (inline code)
 * - > цитата (blockquote)
 * 
 * @param {string} text - текст с markdown-разметкой
 * @returns {string} HTML-строка с отформатированным текстом
 */

import MarkdownIt from 'markdown-it'

// Создаём экземпляр markdown-it с настройками для чата
const md = new MarkdownIt('default', {
  html: true, // Разрешаем HTML-теги (для <u>)
  breaks: true, // Преобразуем переносы строк в <br>
  linkify: false, // Отключаем авто-ссылки, так как их обрабатывает linkifyStr
})

/**
 * Парсит markdown-текст в HTML
 * Использует renderInline для однострочного текста, чтобы избежать оборачивания в параграфы
 * @param text - исходный текст с markdown-разметкой
 * @returns HTML-строка
 */
export function parseMarkdown(text: string): string {
  if (!text) return ''
  
  // Если текст содержит переносы строк или является блоком (например, цитата), используем render
  // Иначе используем renderInline для inline-форматирования
  const hasLineBreaks = text.includes('\n')
  const hasBlockElements = text.includes('> ') // цитаты
  
  if (hasLineBreaks || hasBlockElements) {
    return md.render(text)
  } else {
    // Для однострочного текста используем renderInline, чтобы избежать оборачивания в <p>
    return md.renderInline(text)
  }
}

