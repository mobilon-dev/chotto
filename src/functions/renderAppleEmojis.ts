/**
 * Рендер Unicode-эмодзи картинками с CDN emoji-datasource
 * (Apple по умолчанию; тот же URL, что vue3-emoji-picker-ru при native=false).
 */

export const APPLE_EMOJI_CDN =
  'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64'

export function normalizeEmojiCdn(cdn?: string): string {
  const value = (cdn || APPLE_EMOJI_CDN).trim()
  return value.replace(/\/+$/, '') || APPLE_EMOJI_CDN
}

function isAppleEmojiCdn(cdn: string): boolean {
  return /emoji-datasource-apple/i.test(cdn)
}

/**
 * У Apple нет отдельных PNG: ♀ 2640, ♂ 2642, ⚕ 2695 (только как часть ZWJ).
 * В зеркале ввода и в сообщениях показываем системный шрифт.
 */
const APPLE_EMOJI_CODES_WITHOUT_IMAGE = new Set([
  '2640',
  '2640-fe0f',
  '2642',
  '2642-fe0f',
  '2695',
  '2695-fe0f',
])

/** ZWJ-последовательности, флаги, keycaps, skin tones и обычные pictographic */
const EMOJI_REGEX =
  /(?:\p{Regional_Indicator}{2})|(?:[#*0-9]\uFE0F?\u20E3)|(?:\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?(?:\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Modifier_Base})(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?)*)/gu

const EMOJI_SLOT_STYLE = 'position:relative;display:inline-block;vertical-align:baseline;'
const EMOJI_METRIC_STYLE = 'visibility:hidden;'
/** Картинка растягивается на ширину/высоту скрытого системного эмодзи — совпадает с caret в textarea */
const EMOJI_IMG_OVERLAY_STYLE =
  'position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;pointer-events:none;display:block;margin:0;'

type GraphemeSegmenter = {
  segment(input: string): Iterable<{ index: number }>
}

const IntlSegmenter = (
  Intl as typeof Intl & {
    Segmenter?: new (
      locales?: string | string[],
      options?: { granularity?: string },
    ) => GraphemeSegmenter
  }
).Segmenter

const graphemeSegmenter: GraphemeSegmenter | null =
  typeof Intl !== 'undefined' && IntlSegmenter
    ? new IntlSegmenter(undefined, { granularity: 'grapheme' })
    : null

/** Ближайшая граница графемы (чтобы caret не попадал внутрь surrogate pair / ZWJ). */
export function snapIndexToGrapheme(
  text: string,
  index: number,
  prefer: 'before' | 'after' | 'nearest' = 'nearest',
): number {
  const n = text.length
  if (index <= 0) return 0
  if (index >= n) return n

  if (graphemeSegmenter) {
    let prev = 0
    for (const { index: start } of graphemeSegmenter.segment(text)) {
      if (start === index) return index
      if (start > index) {
        if (prefer === 'before') return prev
        if (prefer === 'after') return start
        return index - prev <= start - index ? prev : start
      }
      prev = start
    }
    return n
  }

  const code = text.charCodeAt(index)
  if (code >= 0xdc00 && code <= 0xdfff) {
    return prefer === 'after' ? Math.min(n, index + 1) : index - 1
  }
  return index
}

export function nextGraphemeIndex(text: string, index: number): number {
  if (index >= text.length) return text.length
  if (graphemeSegmenter) {
    for (const { index: start } of graphemeSegmenter.segment(text)) {
      if (start > index) return start
    }
    return text.length
  }
  const cp = text.codePointAt(index)
  return index + (cp !== undefined && cp > 0xffff ? 2 : 1)
}

export function previousGraphemeIndex(text: string, index: number): number {
  if (index <= 0) return 0
  if (graphemeSegmenter) {
    let prev = 0
    for (const { index: start } of graphemeSegmenter.segment(text)) {
      if (start >= index) return prev
      prev = start
    }
    return prev
  }
  const code = text.charCodeAt(index - 1)
  return code >= 0xdc00 && code <= 0xdfff ? index - 2 : index - 1
}

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

export function hasAppleEmojiImage(emoji: string, cdn: string = APPLE_EMOJI_CDN): boolean {
  const base = normalizeEmojiCdn(cdn)
  const primary = emojiToAppleCode(emoji)
  if (!primary) return false
  if (isAppleEmojiCdn(base) && APPLE_EMOJI_CODES_WITHOUT_IMAGE.has(primary)) return false
  const stripped = emojiToAppleCode(emoji, { stripVariationSelectors: true })
  return !(isAppleEmojiCdn(base) && APPLE_EMOJI_CODES_WITHOUT_IMAGE.has(stripped))
}

export function getAppleEmojiUrl(emoji: string, cdn: string = APPLE_EMOJI_CDN): string {
  return `${normalizeEmojiCdn(cdn)}/${emojiToAppleCode(emoji)}.png`
}

/** Альтернативный URL, если основной codepoint не совпал с именем файла в emoji-datasource */
export function getAppleEmojiFallbackUrl(emoji: string, cdn: string = APPLE_EMOJI_CDN): string | null {
  const base = normalizeEmojiCdn(cdn)
  if (!hasAppleEmojiImage(emoji, base)) return null
  const primary = emojiToAppleCode(emoji)
  const withoutVs = emojiToAppleCode(emoji, { stripVariationSelectors: true })
  if (primary !== withoutVs) {
    if (isAppleEmojiCdn(base) && APPLE_EMOJI_CODES_WITHOUT_IMAGE.has(withoutVs)) return null
    return `${base}/${withoutVs}.png`
  }
  if (!/[\uFE0E\uFE0F]/.test(emoji)) {
    const withFe0f = emojiToAppleCode(`${emoji}\uFE0F`)
    if (withFe0f !== primary) {
      if (isAppleEmojiCdn(base) && APPLE_EMOJI_CODES_WITHOUT_IMAGE.has(withFe0f)) return null
      return `${base}/${withFe0f}.png`
    }
  }
  return null
}

function attachEmojiImgFallback(img: HTMLImageElement, emoji: string, cdn: string) {
  const fallback = getAppleEmojiFallbackUrl(emoji, cdn)
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

/**
 * Слот: скрытый системный эмодзи задаёт ширину (как в textarea),
 * поверх — картинка с CDN. Так caret совпадает с картинками.
 */
export function createAppleEmojiImgHtml(emoji: string, cdn: string = APPLE_EMOJI_CDN): string {
  const base = normalizeEmojiCdn(cdn)
  const code = emojiToAppleCode(emoji)
  if (!code || !hasAppleEmojiImage(emoji, base)) return escapeHtmlText(emoji)
  const src = `${base}/${code}.png`
  const fallback = getAppleEmojiFallbackUrl(emoji, base)
  const fallbackAttr = fallback
    ? ` data-fallback="${escapeHtmlAttr(fallback)}" onerror="if(this.dataset.fallback&&this.src!==this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback}"`
    : ''
  return (
    `<span class="chotto-emoji-slot" style="${EMOJI_SLOT_STYLE}">` +
    `<span class="chotto-emoji-metric" style="${EMOJI_METRIC_STYLE}">${escapeHtmlText(emoji)}</span>` +
    `<img class="chotto-emoji" src="${escapeHtmlAttr(src)}" alt="${escapeHtmlAttr(emoji)}" draggable="false" style="${EMOJI_IMG_OVERLAY_STYLE}"${fallbackAttr} />` +
    `</span>`
  )
}

export function createAppleEmojiSlotElement(emoji: string, cdn: string = APPLE_EMOJI_CDN): HTMLElement {
  const base = normalizeEmojiCdn(cdn)
  if (!hasAppleEmojiImage(emoji, base)) {
    const native = document.createElement('span')
    native.textContent = emoji
    return native
  }

  const slot = document.createElement('span')
  slot.className = 'chotto-emoji-slot'
  slot.setAttribute('style', EMOJI_SLOT_STYLE)

  const metric = document.createElement('span')
  metric.className = 'chotto-emoji-metric'
  metric.setAttribute('style', EMOJI_METRIC_STYLE)
  metric.textContent = emoji

  const img = document.createElement('img')
  img.className = 'chotto-emoji'
  img.src = getAppleEmojiUrl(emoji, base)
  img.alt = emoji
  img.draggable = false
  img.setAttribute('style', EMOJI_IMG_OVERLAY_STYLE)
  attachEmojiImgFallback(img, emoji, base)

  slot.append(metric, img)
  return slot
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

function renderAppleEmojiFragment(text: string, cdn: string): string {
  if (!text) return ''
  return escapeHtmlText(text).replace(EMOJI_REGEX, (match) => createAppleEmojiImgHtml(match, cdn))
}

/**
 * Plain text → HTML с картинками эмодзи (для зеркала инпута).
 * Опционально подсвечивает выделенный диапазон (индексы как в textarea: UTF-16).
 */
export function textToAppleEmojiHtml(
  text: string,
  selection?: { start: number; end: number } | null,
  cdn: string = APPLE_EMOJI_CDN,
): string {
  if (!text) return ''
  const base = normalizeEmojiCdn(cdn)

  const start = selection ? Math.max(0, Math.min(selection.start, selection.end)) : -1
  const end = selection ? Math.min(text.length, Math.max(selection.start, selection.end)) : -1

  if (start < 0 || start === end) {
    return renderAppleEmojiFragment(text, base)
  }

  return (
    renderAppleEmojiFragment(text.slice(0, start), base) +
    `<span class="chat-input__emoji-selection" style="background-color: var(--chotto-chatinput-selection-bg, rgba(51, 133, 255, 0.35)); border-radius: 2px; box-decoration-break: clone; -webkit-box-decoration-break: clone;">${renderAppleEmojiFragment(text.slice(start, end), base)}</span>` +
    renderAppleEmojiFragment(text.slice(end), base)
  )
}

export function textContainsEmoji(text: string): boolean {
  if (!text) return false
  EMOJI_REGEX.lastIndex = 0
  return EMOJI_REGEX.test(text)
}

/** HTML → HTML, эмодзи в текстовых узлах заменяются на img */
export function replaceEmojisInHtml(html: string, cdn: string = APPLE_EMOJI_CDN): string {
  if (!html || typeof document === 'undefined') return html
  const base = normalizeEmojiCdn(cdn)

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
      const slot = createAppleEmojiSlotElement(match[0], base)
      fragment.appendChild(slot)
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
    }

    textNode.parentNode?.replaceChild(fragment, textNode)
  }

  return tempDiv.innerHTML
}
