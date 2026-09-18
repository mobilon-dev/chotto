import { getCurrentInstance, inject, provide, ref, type InjectionKey, type Ref } from 'vue'

interface SearchModel {
  id: string
  text: string
}

export type SearchModelStore = {
  searchModels: Ref<SearchModel[]>
}

export const searchModelStoreKey: InjectionKey<SearchModelStore> = Symbol('chottoSearchModelStore')

const fallbackStores = new Map<string, SearchModelStore>()

export function createSearchModelStore(): SearchModelStore {
  return { searchModels: ref<SearchModel[]>([]) }
}

export function provideSearchModelStore(): SearchModelStore {
  const store = createSearchModelStore()
  provide(searchModelStoreKey, store)
  return store
}

function resolveSearchModelStore(outId?: string): SearchModelStore {
  if (getCurrentInstance()) {
    const injected = inject(searchModelStoreKey, null)
    if (injected) return injected
  }

  const key = outId || '__default__'
  let store = fallbackStores.get(key)
  if (!store) {
    store = createSearchModelStore()
    fallbackStores.set(key, store)
  }
  return store
}

export const useSearchModel = (outId: string) => {
  const { searchModels } = resolveSearchModelStore(outId)
  const index = ref(0)

  const foundModel = searchModels.value.find(({ id }) => id == outId)
  if (foundModel != undefined) {
    index.value = searchModels.value.indexOf(foundModel)
  } else {
    searchModels.value.push({
      id: outId,
      text: '',
    })
    index.value = searchModels.value.length - 1
  }

  const getModel = () => {
    return searchModels.value[index.value]
  }

  return { getModel }
}
