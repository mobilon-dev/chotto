import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useStickyDate } from '../useStickyDate'

describe('useStickyDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('ставит «Сегодня» для timestamp текущего дня', () => {
    const nowSec = Math.floor(Date.now() / 1000)
    const el = document.createElement('div')
    el.dataset.timestamp = String(nowSec)
    el.getBoundingClientRect = () =>
      ({ top: 100, bottom: 200, left: 0, right: 0, width: 0, height: 100, x: 0, y: 100, toJSON: () => ({}) })

    const feed = document.createElement('div')
    feed.getBoundingClientRect = () =>
      ({ top: 50, bottom: 500, left: 0, right: 0, width: 0, height: 450, x: 0, y: 50, toJSON: () => ({}) })

    const feedRef = ref(feed)
    const trackingObjects = ref({
      [Symbol.iterator]: function* () {
        yield el
      },
      length: 1,
    } as unknown as NodeListOf<Element>)

    const api = useStickyDate({ feedRef, trackingObjects, autoHideDelay: 500 })
    api.updateStickyDate()

    expect(api.stickyDateText.value).toBe('Сегодня')
  })

  it('show включает sticky и скрывает по таймеру', () => {
    const feedRef = ref(null)
    const trackingObjects = ref(undefined)
    const api = useStickyDate({ feedRef, trackingObjects, autoHideDelay: 300 })

    api.show()
    expect(api.showStickyDate.value).toBe(true)

    vi.advanceTimersByTime(300)
    expect(api.showStickyDate.value).toBe(false)
  })

  it('hide сбрасывает видимость сразу', () => {
    const feedRef = ref(null)
    const trackingObjects = ref(undefined)
    const api = useStickyDate({ feedRef, trackingObjects })

    api.show()
    api.hide()
    expect(api.showStickyDate.value).toBe(false)
  })
})
