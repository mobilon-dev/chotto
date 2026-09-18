import { getCurrentInstance, inject, provide, ref, type InjectionKey, type Ref } from 'vue'

interface Theme {
  id: string
  theme: string
}

export type ThemeStore = {
  themes: Ref<Theme[]>
}

export const themeStoreKey: InjectionKey<ThemeStore> = Symbol('chottoThemeStore')

const fallbackStores = new Map<string, ThemeStore>()

export function createThemeStore(): ThemeStore {
  return { themes: ref<Theme[]>([]) }
}

export function provideThemeStore(): ThemeStore {
  const store = createThemeStore()
  provide(themeStoreKey, store)
  return store
}

function resolveThemeStore(outId?: string): ThemeStore {
  if (getCurrentInstance()) {
    const injected = inject(themeStoreKey, null)
    if (injected) return injected
  }

  const key = outId || '__default__'
  let store = fallbackStores.get(key)
  if (!store) {
    store = createThemeStore()
    fallbackStores.set(key, store)
  }
  return store
}

export const useTheme = (outId: string) => {
  const { themes } = resolveThemeStore(outId)
  const index = ref(0)

  const foundTheme = themes.value.find(({ id }) => id == outId)
  if (foundTheme != undefined) {
    index.value = themes.value.indexOf(foundTheme)
  } else {
    themes.value.push({
      id: outId,
      theme: '',
    })
    index.value = themes.value.length - 1
  }

  const getTheme = () => {
    return themes.value[index.value]
  }

  return { getTheme }
}
