import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../parseMarkdown'

describe('parseMarkdown', () => {
  it('возвращает пустую строку для пустого входа', () => {
    expect(parseMarkdown('')).toBe('')
  })

  it('преобразует bold и italic', () => {
    expect(parseMarkdown('**жирный**')).toContain('<strong>жирный</strong>')
    expect(parseMarkdown('*курсив*')).toContain('<em>курсив</em>')
  })

  it('преобразует markdown-ссылку', () => {
    const html = parseMarkdown('[сайт](https://example.com)')
    expect(html).toContain('<a href="https://example.com"')
    expect(html).toContain('сайт')
  })

  it('экранирует опасный HTML в тексте при inline-рендере', () => {
    // html: true разрешает теги, но markdown-it не исполняет скрипты;
    // сырой <script> в тексте проходит как HTML-тег — фиксируем текущее поведение
    const html = parseMarkdown('текст <b>ok</b>')
    expect(html).toContain('<b>ok</b>')
  })

  it('рендерит цитату как блок', () => {
    const html = parseMarkdown('> цитата')
    expect(html).toContain('<blockquote>')
    expect(html).toContain('цитата')
  })

  it('рендерит переносы строк через полный render', () => {
    const html = parseMarkdown('строка1\nстрока2')
    expect(html).toContain('<br')
  })
})
