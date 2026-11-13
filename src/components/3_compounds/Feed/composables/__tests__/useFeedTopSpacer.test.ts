import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { nextTick, ref } from 'vue'
import { FEED_TOP_LOAD_OVERFLOW_PX, useFeedTopSpacer } from '../useFeedTopSpacer'
import { withSetup } from '@/test-utils/withSetup'

describe('useFeedTopSpacer', () => {
  let rafSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    rafSpy.mockRestore()
  })

  it('для short content (большая дырка) spacer = 0 — ползунок по фактической высоте (#16649 journal 77879)', async () => {
    const spacer = { offsetHeight: 0 } as HTMLElement
    const feedEl = {
      clientHeight: 500,
      scrollHeight: 120,
      querySelector: vi.fn(() => spacer),
    } as unknown as HTMLElement
    const feedRef = ref<HTMLElement | null>(feedEl)
    const objectsLengthRef = ref(1)

    const { result, scope } = withSetup(() => useFeedTopSpacer({ feedRef, objectsLengthRef }))
    await nextTick()

    expect(result.topSpacerPx.value).toBe(0)
    scope.stop()
  })

  it('для почти полного viewport делает минимальный tip-over', async () => {
    const spacer = { offsetHeight: 0 } as HTMLElement
    const shortfall = Math.max(1, FEED_TOP_LOAD_OVERFLOW_PX - 2)
    const feedEl = {
      clientHeight: 500,
      scrollHeight: 500 - shortfall,
      querySelector: vi.fn(() => spacer),
    } as unknown as HTMLElement
    const feedRef = ref<HTMLElement | null>(feedEl)
    const objectsLengthRef = ref(8)

    const { result, scope } = withSetup(() => useFeedTopSpacer({ feedRef, objectsLengthRef }))
    await nextTick()

    expect(result.topSpacerPx.value).toBe(shortfall + 1)
    scope.stop()
  })

  it('для длинного контента spacer = 0', async () => {
    const spacer = { offsetHeight: 0 } as HTMLElement
    const feedEl = {
      clientHeight: 500,
      scrollHeight: 2000,
      querySelector: vi.fn(() => spacer),
    } as unknown as HTMLElement
    const feedRef = ref<HTMLElement | null>(feedEl)
    const objectsLengthRef = ref(40)

    const { result, scope } = withSetup(() => useFeedTopSpacer({ feedRef, objectsLengthRef }))
    await nextTick()

    expect(result.topSpacerPx.value).toBe(0)
    scope.stop()
  })

  it('при 0 сообщений spacer = 0', async () => {
    const feedRef = ref<HTMLElement | null>(null)
    const objectsLengthRef = ref(0)

    const { result, scope } = withSetup(() => useFeedTopSpacer({ feedRef, objectsLengthRef }))
    await nextTick()

    expect(result.topSpacerPx.value).toBe(0)
    scope.stop()
  })
})
