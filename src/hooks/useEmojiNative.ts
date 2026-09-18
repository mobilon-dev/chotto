import { computed, getCurrentInstance, inject, provide, ref, type InjectionKey, type Ref } from 'vue'
import { APPLE_EMOJI_CDN, normalizeEmojiCdn } from '@/functions/renderAppleEmojis'

interface EmojiNativeState {
  id: string
  native: boolean
  emojiSrc: string
}

export type EmojiNativeStore = {
  states: Ref<EmojiNativeState[]>
}

export const emojiNativeStoreKey: InjectionKey<EmojiNativeStore> = Symbol('chottoEmojiNativeStore')

const fallbackStores = new Map<string, EmojiNativeStore>()

export function createEmojiNativeStore(): EmojiNativeStore {
  return { states: ref<EmojiNativeState[]>([]) }
}

export function provideEmojiNativeStore(): EmojiNativeStore {
  const store = createEmojiNativeStore()
  provide(emojiNativeStoreKey, store)
  return store
}

function resolveEmojiNativeStore(outId?: string): EmojiNativeStore {
  if (getCurrentInstance()) {
    const injected = inject(emojiNativeStoreKey, null)
    if (injected) return injected
  }

  const key = outId || '__default__'
  let store = fallbackStores.get(key)
  if (!store) {
    store = createEmojiNativeStore()
    fallbackStores.set(key, store)
  }
  return store
}

/**
 * Общий флаг native/3D-эмодзи и CDN картинок для инстанса чата (ключ — chatAppId).
 * Источник правды — props `native` и `emojiSrc` у ButtonEmojiPicker.
 * Store — instance-scoped через provide в BaseContainer / FloatContainer.
 */
export const useEmojiNative = (outId: string) => {
  const { states } = resolveEmojiNativeStore(outId)
  const index = ref(0)

  const found = states.value.find(({ id }) => id === outId)
  if (found !== undefined) {
    index.value = states.value.indexOf(found)
    if (!found.emojiSrc) {
      found.emojiSrc = APPLE_EMOJI_CDN
    }
  } else {
    states.value.push({
      id: outId,
      native: true,
      emojiSrc: APPLE_EMOJI_CDN,
    })
    index.value = states.value.length - 1
  }

  const state = () => states.value[index.value]

  const isNative = computed(() => state()?.native ?? true)
  const emojiSrc = computed(() => state()?.emojiSrc ?? APPLE_EMOJI_CDN)

  const getNative = () => state()?.native ?? true
  const getEmojiSrc = () => state()?.emojiSrc ?? APPLE_EMOJI_CDN

  const setNative = (native: boolean) => {
    if (state()) {
      state().native = native
    }
  }

  const setEmojiSrc = (src: string) => {
    if (state()) {
      state().emojiSrc = normalizeEmojiCdn(src)
    }
  }

  return { isNative, emojiSrc, getNative, getEmojiSrc, setNative, setEmojiSrc }
}
