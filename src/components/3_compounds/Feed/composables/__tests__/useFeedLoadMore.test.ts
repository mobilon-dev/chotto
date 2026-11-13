import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useFeedLoadMore } from '../useFeedLoadMore'
import { withSetup } from '@/test-utils/withSetup'

function mockFeedElement(overrides: Partial<{
  scrollTop: number
  scrollHeight: number
  clientHeight: number
  clientWidth: number
}> = {}) {
  return {
    scrollTop: overrides.scrollTop ?? 0,
    scrollHeight: overrides.scrollHeight ?? 2000,
    clientHeight: overrides.clientHeight ?? 500,
    clientWidth: overrides.clientWidth ?? 400,
    style: { scrollBehavior: 'auto' } as CSSStyleDeclaration,
    offsetWidth: 420,
    offsetHeight: 520,
  } as unknown as HTMLElement
}

describe('useFeedLoadMore', () => {
  it('resetAllowFlags включает обе стороны', () => {
    const feedRef = ref<HTMLElement | null>(null)
    const api = useFeedLoadMore({ feedRef })

    api.allowLoadMoreTop.value = false
    api.allowLoadMoreBottom.value = false
    api.resetAllowFlags()

    expect(api.allowLoadMoreTop.value).toBe(true)
    expect(api.allowLoadMoreBottom.value).toBe(true)
  })

  it('у верхнего края блокирует повторный top-load и ставит pending restore', () => {
    const feedRef = ref(mockFeedElement({ scrollTop: 50, scrollHeight: 3000, clientHeight: 500 }))
    const api = useFeedLoadMore({ feedRef })
    api.allowLoadMoreTop.value = true

    api.checkScrollPosition(true)

    expect(api.allowLoadMoreTop.value).toBe(false)
    expect(api.pendingTopRestore.value).toBe(true)
  })

  it('у нижнего края блокирует bottom-load', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 1450, scrollHeight: 2000, clientHeight: 500 }),
    )
    const api = useFeedLoadMore({ feedRef })
    api.allowLoadMoreBottom.value = true

    api.checkScrollPosition(true)

    expect(api.allowLoadMoreBottom.value).toBe(false)
  })

  it('эмитит loadMore / loadMoreDown при сбросе флагов', async () => {
    const emit = vi.fn()
    const feedRef = ref(mockFeedElement())

    const { result, scope } = withSetup(() => useFeedLoadMore({ feedRef, emit }))

    result.resetAllowFlags()
    await nextTick()
    emit.mockClear()

    result.allowLoadMoreTop.value = false
    result.allowLoadMoreBottom.value = false
    await nextTick()

    expect(emit).toHaveBeenCalledWith('loadMore')
    expect(emit).toHaveBeenCalledWith('loadMoreDown')
    scope.stop()
  })

  it('при stickToBottom не триггерит top-load даже если scrollTop < 300 (#16649)', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 80, scrollHeight: 580, clientHeight: 500 }),
    )
    const stickToBottom = ref(true)
    const api = useFeedLoadMore({ feedRef, stickToBottomRef: stickToBottom })
    api.allowLoadMoreTop.value = true

    api.checkScrollPosition(true)

    expect(api.allowLoadMoreTop.value).toBe(true)
    expect(api.pendingTopRestore.value).toBe(false)
  })

  it('после ухода от stickToBottom top-load снова срабатывает у верха', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 40, scrollHeight: 2000, clientHeight: 500 }),
    )
    const stickToBottom = ref(false)
    const api = useFeedLoadMore({ feedRef, stickToBottomRef: stickToBottom })
    api.allowLoadMoreTop.value = true

    api.checkScrollPosition(true)

    expect(api.allowLoadMoreTop.value).toBe(false)
    expect(api.pendingTopRestore.value).toBe(true)
  })

  it('wheel вверх на short feed (без overflow) запрашивает top-load даже при stickToBottom (#16649)', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 0, scrollHeight: 200, clientHeight: 500 }),
    )
    const stickToBottom = ref(true)
    const api = useFeedLoadMore({ feedRef, stickToBottomRef: stickToBottom })
    api.allowLoadMoreTop.value = true

    api.handleWheelForTopLoad({ deltaY: -40 } as WheelEvent)

    expect(api.allowLoadMoreTop.value).toBe(false)
    expect(api.pendingTopRestore.value).toBe(true)
  })

  it('wheel вниз на short feed не триггерит top-load', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 0, scrollHeight: 200, clientHeight: 500 }),
    )
    const api = useFeedLoadMore({ feedRef })
    api.allowLoadMoreTop.value = true

    api.handleWheelForTopLoad({ deltaY: 40 } as WheelEvent)

    expect(api.allowLoadMoreTop.value).toBe(true)
    expect(api.pendingTopRestore.value).toBe(false)
  })

  it('wheel вверх на длинной ленте не обходит scroll-path (есть overflow)', () => {
    const feedRef = ref(
      mockFeedElement({ scrollTop: 100, scrollHeight: 2000, clientHeight: 500 }),
    )
    const api = useFeedLoadMore({ feedRef })
    api.allowLoadMoreTop.value = true

    api.handleWheelForTopLoad({ deltaY: -40 } as WheelEvent)

    expect(api.allowLoadMoreTop.value).toBe(true)
    expect(api.pendingTopRestore.value).toBe(false)
  })
})
