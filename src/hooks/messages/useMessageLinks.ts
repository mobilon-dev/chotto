/**
 * Composable для подготовки HTML с автоссылками, markdown-форматированием и обработчика открытия ссылок в новой вкладке
 * 
 * Предназначен для компонентов сообщений, где нужно безопасно и единообразно
 * преобразовывать обычный текст в кликабельные ссылки и обрабатывать клики по ним.
 * Использует markdown-it для парсинга markdown-форматирования и linkify-string для преобразования текста в HTML.
 * 
 * @example
 * import { useMessageLinks } from '@/hooks/messages'
 * const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)
 * // <p @click="inNewWindow" v-html="linkedHtml" />
 */
import { computed } from 'vue'
import * as linkify from 'linkifyjs'
import { parseMarkdown } from '@/functions/parseMarkdown'

/**
 * Создает вычисляемое HTML-представление текста с markdown-форматированием, автоссылками и обработчик
 * открытия ссылок в новой вкладке
 * 
 * @param {() => string | undefined} getText - функция, возвращающая исходный текст
 * @returns {{ linkedHtml: import('vue').ComputedRef<string>, inNewWindow: (event: Event) => void }}
 *  - linkedHtml: вычисляемый HTML с markdown-форматированием и проставленными ссылками
 *  - inNewWindow: обработчик клика, открывающий ссылки в новой вкладке
 */
export const useMessageLinks = (getText: () => string | undefined) => {
  const linkedHtml = computed(() => {
    const text = getText()
    if (!text) return ''
    
    // Сначала парсим markdown в HTML
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


