/**
 * Composable для подготовки HTML с автоссылками, markdown-форматированием и обработчика открытия ссылок в новой вкладке
 *
 * Для простого текста без markdown используется быстрый путь (linkify-string), как в старой версии —
 * без parseMarkdown и DOM walker, чтобы не замораживать UI при загрузке многих сообщений.
 *
 * @example
 * import { useMessageLinks } from '@/hooks/messages'
 * const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)
 * // <p @click="inNewWindow" v-html="linkedHtml" />
 */
import { computed } from 'vue'
import * as linkify from 'linkifyjs'
import linkifyStr from 'linkify-string'
import { parseMarkdown } from '@/functions/parseMarkdown'

/** Признаки markdown/разметки — при отсутствии используем быстрый путь (только linkify) */
function hasMarkdownOrFormatting(text: string): boolean {
  return (
    text.includes('**') ||
    text.includes('`') ||
    text.includes('~~') ||
    text.includes('\n\n') ||
    (text.includes('>') && text.trimStart().startsWith('>')) ||
    /<\/(u|s|b|i)>|<(u|s|b|i)[\s>]/.test(text)
  )
}

/**
 * Создает вычисляемое HTML-представление текста с автоссылками и опционально markdown.
 *
 * @param getText - функция, возвращающая исходный текст
 * @returns linkedHtml, inNewWindow
 */
export const useMessageLinks = (getText: () => string | undefined) => {
  const linkedHtml = computed(() => {
    const text = getText()
    if (!text) return ''

    // Быстрый путь для простого текста без markdown (как в старой версии Feed) — без MarkdownIt и DOM
    if (!hasMarkdownOrFormatting(text)) {
      return linkifyStr(text)
    }

    // Полный путь: markdown + linkify по узлам
    const html = parseMarkdown(text)
    
    // Затем обрабатываем ссылки в HTML через DOM API linkifyjs
    // Создаём временный элемент для обработки
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // Функция для обработки текстовых узлов
    const processTextNode = (textNode: Text) => {
      const textContent = textNode.textContent || ''
      const tokens = linkify.tokenize(textContent)
      
      if (tokens.length === 1 && !tokens[0].isLink) {
        // Нет ссылок, ничего не делаем
        return
      }
      
      // Есть ссылки, заменяем текстовый узел
      const fragment = document.createDocumentFragment()
      
      tokens.forEach((token) => {
        if (token.isLink) {
          const a = document.createElement('a')
          a.href = token.toHref()
          a.target = '_blank'
          a.textContent = token.toString()
          fragment.appendChild(a)
        } else {
          fragment.appendChild(document.createTextNode(token.toString()))
        }
      })
      
      // Заменяем текстовый узел на фрагмент
      textNode.parentNode?.replaceChild(fragment, textNode)
    }
    
    // Рекурсивно обрабатываем все текстовые узлы, но пропускаем узлы внутри <a>
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Node) => {
          // Пропускаем текстовые узлы внутри элементов <a>
          let parent = node.parentNode
          while (parent && parent !== tempDiv) {
            if (parent.nodeName === 'A') {
              return NodeFilter.FILTER_REJECT
            }
            parent = parent.parentNode
          }
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )
    
    const textNodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node as Text)
      }
    }
    
    // Обрабатываем текстовые узлы в обратном порядке, чтобы не сломать индексы
    textNodes.reverse().forEach(processTextNode)
    
    return tempDiv.innerHTML
  })

  /**
   * Открывает кликнутую ссылку в новой вкладке браузера
   * @param {Event} event - событие клика по элементу с v-html
   */
  const inNewWindow = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLAnchorElement | null
    if (target && 'href' in target && target.href) {
      window.open(target.href, '_blank')
    }
  }

  return { linkedHtml, inNewWindow }
}


