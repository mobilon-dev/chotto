/**
 * Composable для подготовки HTML с автоссылками и обработчика открытия ссылок в новой вкладке
 * 
 * Предназначен для компонентов сообщений, где нужно безопасно и единообразно
 * преобразовывать обычный текст в кликабельные ссылки и обрабатывать клики по ним.
 * Использует linkify-string для преобразования текста в HTML.
 * 
 * @example
 * import { useMessageLinks } from '@/hooks/messages'
 * const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)
 * // <p @click="inNewWindow" v-html="linkedHtml" />
 */
import { computed } from 'vue'
import linkifyStr from 'linkify-string'

/**
 * Создает вычисляемое HTML-представление текста с автоссылками и обработчик
 * открытия ссылок в новой вкладке
 * 
 * @param {() => string | undefined} getText - функция, возвращающая исходный текст
 * @returns {{ linkedHtml: import('vue').ComputedRef<string>, inNewWindow: (event: Event) => void }}
 *  - linkedHtml: вычисляемый HTML с проставленными ссылками
 *  - inNewWindow: обработчик клика, открывающий ссылки в новой вкладке
 */
export const useMessageLinks = (getText: () => string | undefined) => {
  const linkedHtml = computed(() => {
    const text = getText()
    return text ? linkifyStr(text) : ''
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


