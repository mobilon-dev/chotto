/**
 * Рендер Unicode-эмодзi картинками Apple (тот же CDN, что vue3-emoji-picker-ru при native=false).
 */

export const APPLE_EMOJI_CDN =
  'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64'

/** ZWJ-последовательности, флаги, keycaps и обычные pictographic */
const EMOJI_REGEX =
  /(?:\p{Regional_Indicator}{2})|(?:[#*0-9]\uFE0F?\u20E3)|(?:\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Modifier_Base})(?:\uFE0F|\uFE0E)?)*)/gu

const EMOJI_IMG_STYLE =
  'height:1.2em;width:1.2em;margin:0 0.05em;vertical-align:-0.2em;display:inline'

/** Имена файлов emoji-datasource совпадают с полем u: все codepoints через дефис, включая fe0f/fe0e */
export function emojiToAppleCode(
  emoji: string,
  options?: { stripVariationSelectors?: boolean },
): string {
  const points: string[] = []
  for (const char of emoji) {
    const cp = char.codePointAt(0)
    if (cp === undefined) continue
    if (options?.stripVariationSelectors && (cp === 0xfe0f || cp === 0xfe0e)) continue
    points.push(cp.toString(16))
  }
  return points.join('-')
}

export function getAppleEmojiUrl(emoji: string): string {
  return `${APPLE_EMOJI_CDN}/${emojiToAppleCode(emoji)}.png`
}

/** Альтернативный URL, если основной codepoint не совпал с именем файла в emoji-datasource */
export function getAppleEmojiFallbackUrl(emoji: string): string | null {
  const primary = emojiToAppleCode(emoji)
  const withoutVs = emojiToAppleCode(emoji, { stripVariationSelectors: true })
  if (primary !== withoutVs) {
    return `${APPLE_EMOJI_CDN}/${withoutVs}.png`
  }
  if (!/[\uFE0E\uFE0F]/.test(emoji)) {
    const withFe0f = emojiToAppleCode(`${emoji}\uFE0F`)
    if (withFe0f !== primary) {
      return `${APPLE_EMOJI_CDN}/${withFe0f}.png`
    }
  }
  return null
}

function attachEmojiImgFallback(img: HTMLImageElement, emoji: string) {
  const fallback = getAppleEmojiFallbackUrl(emoji)
  if (!fallback) return
  img.addEventListener(
    'error',
    () => {
      if (img.src !== fallback) {
        img.src = fallback
      }
    },
    { once: true },
  )
}

export function createAppleEmojiImgHtml(emoji: string): string {
  const code = emojiToAppleCode(emoji)
  if (!code) return emoji
  const src = `${APPLE_EMOJI_CDN}/${code}.png`
  const fallback = getAppleEmojiFallbackUrl(emoji)
  const fallbackAttr = fallback
    ? ` data-fallback="${escapeHtmlAttr(fallback)}" onerror="if(this.dataset.fallback&&this.src!==this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback}"`
    : ''
  return `<img class="chotto-emoji" src="${escapeHtmlAttr(src)}" alt="${escapeHtmlAttr(emoji)}" draggable="false" style="${EMOJI_IMG_STYLE}"${fallbackAttr} />`
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Plain text → HTML с Apple-эмодзi (для зеркала инпута) */
export function textToAppleEmojiHtml(text: string): string {
  if (!text) return ''
  const escaped = escapeHtmlText(text)
  return escaped.replace(EMOJI_REGEX, (match) => createAppleEmojiImgHtml(match))
}

/** HTML → HTML, эмодзi в текстовых узлах заменяются на img */
export function replaceEmojisInHtml(html: string): string {
  if (!html || typeof document === 'undefined') return html

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, {
    acceptNode: (node: Node) => {
      let parent = node.parentNode
      while (parent && parent !== tempDiv) {
        const name = parent.nodeName
        if (name === 'SCRIPT' || name === 'STYLE' || name === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT
        }
        parent = parent.parentNode
      }
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text)
  }

  for (const textNode of textNodes.reverse()) {
    const text = textNode.textContent || ''
    EMOJI_REGEX.lastIndex = 0
    if (!EMOJI_REGEX.test(text)) continue
    EMOJI_REGEX.lastIndex = 0

    const fragment = document.createDocumentFragment()
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = EMOJI_REGEX.exec(text))) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
      }
      const img = document.createElement('img')
      img.className = 'chotto-emoji'
      img.src = getAppleEmojiUrl(match[0])
      img.alt = match[0]
      img.draggable = false
      img.setAttribute('style', EMOJI_IMG_STYLE)
      attachEmojiImgFallback(img, match[0])
      fragment.appendChild(img)
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
    }

    textNode.parentNode?.replaceChild(fragment, textNode)
  }

  return tempDiv.innerHTML
}
