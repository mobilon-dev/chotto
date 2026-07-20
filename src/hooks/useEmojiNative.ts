import { computed, ref } from 'vue'

interface EmojiNativeState {
  id: string
  native: boolean
}

const states = ref<EmojiNativeState[]>([])

/**
 * Общий флаг native/3D-эмодзи для инстанса чата (ключ — chatAppId).
 * Источник правды — prop `native` у ButtonEmojiPicker.
 */
export const useEmojiNative = (outId: string) => {
  const index = ref(0)

  const found = states.value.find(({ id }) => id === outId)
  if (found !== undefined) {
    index.value = states.value.indexOf(found)
  } else {
    states.value.push({
      id: outId,
      native: true,
    })
    index.value = states.value.length - 1
  }

  const isNative = computed(() => states.value[index.value]?.native ?? true)

  const getNative = () => states.value[index.value]?.native ?? true

  const setNative = (native: boolean) => {
    if (states.value[index.value]) {
      states.value[index.value].native = native
    }
  }

  return { isNative, getNative, setNative }
}
