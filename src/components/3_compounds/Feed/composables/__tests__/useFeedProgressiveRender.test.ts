import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  FEED_TAIL_CHUNK,
  useFeedProgressiveRender,
} from '../useFeedProgressiveRender'
import { makeFeedObject, withSetup } from '@/test-utils/withSetup'

function makeList(count: number) {
  return Array.from({ length: count }, (_, i) =>
    makeFeedObject({ messageId: `m${i}` }),
  )
}

describe('useFeedProgressiveRender', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'requestAnimationFrame',
      (cb: FrameRequestCallback) => window.setTimeout(() => cb(0), 0) as unknown as number,
    )
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('для короткой ленты показывает все сообщения (renderStart = 0)', () => {
    const objectsRef = ref(makeList(5))
    const feedRef = ref<HTMLElement | null>(null)

    const { result, scope } = withSetup(() =>
      useFeedProgressiveRender({ objectsRef, feedRef }),
    )

    expect(result.renderStart.value).toBe(0)
    expect(result.visibleObjects.value).toHaveLength(5)
    scope.stop()
  })

  it('для длинной ленты сразу показывает хвост (защита от пустого кадра)', () => {
    const count = FEED_TAIL_CHUNK + 40
    const objectsRef = ref(makeList(count))
    const feedRef = ref<HTMLElement | null>(null)

    const { result, scope } = withSetup(() =>
      useFeedProgressiveRender({ objectsRef, feedRef }),
    )

    expect(result.renderStart.value).toBe(count - FEED_TAIL_CHUNK)
    expect(result.visibleObjects.value).toHaveLength(FEED_TAIL_CHUNK)
    expect(result.isBackfilling.value).toBe(true)
    scope.stop()
  })

  it('при смене чата (полная замена) сбрасывает окно на хвост нового списка', async () => {
    const objectsRef = ref(makeList(FEED_TAIL_CHUNK + 10))
    const feedRef = ref<HTMLElement | null>(null)

    const { result, scope } = withSetup(() =>
      useFeedProgressiveRender({ objectsRef, feedRef }),
    )

    const firstStart = result.renderStart.value
    expect(firstStart).toBeGreaterThan(0)

    objectsRef.value = makeList(FEED_TAIL_CHUNK + 50).map((m, i) =>
      makeFeedObject({ messageId: `chat2-${i}` }),
    )
    await nextTick()

    expect(result.renderStart.value).toBe(FEED_TAIL_CHUNK + 50 - FEED_TAIL_CHUNK)
    expect(result.visibleObjects.value[0].messageId).toBe('chat2-50')
    scope.stop()
  })

  it('при append не сбрасывает renderStart', async () => {
    const objectsRef = ref(makeList(FEED_TAIL_CHUNK + 20))
    const feedRef = ref<HTMLElement | null>(null)

    const { result, scope } = withSetup(() =>
      useFeedProgressiveRender({ objectsRef, feedRef }),
    )

    const start = result.renderStart.value
    objectsRef.value = [
      ...objectsRef.value,
      makeFeedObject({ messageId: 'new-tail' }),
    ]
    await nextTick()

    expect(result.renderStart.value).toBe(start)
    expect(result.visibleObjects.value.at(-1)?.messageId).toBe('new-tail')
    scope.stop()
  })
})
