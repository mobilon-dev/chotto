import { describe, expect, it } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { createThemeStore, themeStoreKey, useTheme } from '../useTheme'
import { createSearchModelStore, searchModelStoreKey, useSearchModel } from '../useSearchModel'
import { createEmojiNativeStore, emojiNativeStoreKey, useEmojiNative } from '../useEmojiNative'
import { withSetup } from '@/test-utils/withSetup'

describe('useTheme instance store', () => {
  it('сохраняет theme по outId (fallback)', () => {
    const id = `theme-${Date.now()}`
    const { result, scope } = withSetup(() => useTheme(id))
    result.getTheme().theme = 'dark'
    expect(result.getTheme().theme).toBe('dark')
    scope.stop()
  })

  it('два provided store изолированы', () => {
    const storeA = createThemeStore()
    const storeB = createThemeStore()

    const Child = defineComponent({
      props: { value: { type: String, required: true } },
      setup(props) {
        const { getTheme } = useTheme('shared')
        getTheme().theme = props.value
        return { theme: () => getTheme().theme }
      },
      render: () => h('div'),
    })

    const Parent = defineComponent({
      props: {
        store: { type: Object, required: true },
        value: { type: String, required: true },
      },
      setup(props) {
        provide(themeStoreKey, props.store as ReturnType<typeof createThemeStore>)
        return () => h(Child, { value: props.value })
      },
    })

    const a = mount(Parent, { props: { store: storeA, value: 'dark' } })
    const b = mount(Parent, { props: { store: storeB, value: 'green' } })

    expect(storeA.themes.value[0]?.theme).toBe('dark')
    expect(storeB.themes.value[0]?.theme).toBe('green')
    a.unmount()
    b.unmount()
  })
})

describe('useSearchModel instance store', () => {
  it('сохраняет text по outId (fallback)', () => {
    const id = `search-${Date.now()}`
    const { result, scope } = withSetup(() => useSearchModel(id))
    result.getModel().text = 'query'
    expect(result.getModel().text).toBe('query')
    scope.stop()
  })

  it('два provided store изолированы', () => {
    const storeA = createSearchModelStore()
    const storeB = createSearchModelStore()

    const Child = defineComponent({
      props: { value: { type: String, required: true } },
      setup(props) {
        const { getModel } = useSearchModel('shared')
        getModel().text = props.value
        return {}
      },
      render: () => h('div'),
    })

    const Parent = defineComponent({
      props: {
        store: { type: Object, required: true },
        value: { type: String, required: true },
      },
      setup(props) {
        provide(searchModelStoreKey, props.store as ReturnType<typeof createSearchModelStore>)
        return () => h(Child, { value: props.value })
      },
    })

    mount(Parent, { props: { store: storeA, value: 'a' } }).unmount()
    mount(Parent, { props: { store: storeB, value: 'b' } }).unmount()

    expect(storeA.searchModels.value[0]?.text).toBe('a')
    expect(storeB.searchModels.value[0]?.text).toBe('b')
  })
})

describe('useEmojiNative instance store', () => {
  it('setNative / setEmojiSrc (fallback)', () => {
    const id = `emoji-${Date.now()}`
    const { result, scope } = withSetup(() => useEmojiNative(id))
    result.setNative(false)
    result.setEmojiSrc('https://cdn.example/')
    expect(result.getNative()).toBe(false)
    expect(result.getEmojiSrc()).toContain('cdn.example')
    scope.stop()
  })

  it('два provided store изолированы', () => {
    const storeA = createEmojiNativeStore()
    const storeB = createEmojiNativeStore()

    const Child = defineComponent({
      props: { native: { type: Boolean, required: true } },
      setup(props) {
        const { setNative } = useEmojiNative('shared')
        setNative(props.native)
        return {}
      },
      render: () => h('div'),
    })

    const Parent = defineComponent({
      props: {
        store: { type: Object, required: true },
        native: { type: Boolean, required: true },
      },
      setup(props) {
        provide(emojiNativeStoreKey, props.store as ReturnType<typeof createEmojiNativeStore>)
        return () => h(Child, { native: props.native })
      },
    })

    mount(Parent, { props: { store: storeA, native: false } }).unmount()
    mount(Parent, { props: { store: storeB, native: true } }).unmount()

    expect(storeA.states.value[0]?.native).toBe(false)
    expect(storeB.states.value[0]?.native).toBe(true)
  })
})
