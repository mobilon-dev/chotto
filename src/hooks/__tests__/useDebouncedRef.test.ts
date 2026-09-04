import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDelayDebouncedRef } from '../useDelayDebouncedRef'
import { useImmediateDebouncedRef } from '../useImmediateDebouncedRef'

describe('useDelayDebouncedRef', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('обновляет значение после delay', () => {
    const r = useDelayDebouncedRef('a', 200)
    expect(r.value).toBe('a')

    r.value = 'b'
    expect(r.value).toBe('a')

    vi.advanceTimersByTime(199)
    expect(r.value).toBe('a')

    vi.advanceTimersByTime(1)
    expect(r.value).toBe('b')
  })

  it('сбрасывает таймер при повторной записи', () => {
    const r = useDelayDebouncedRef('a', 100)
    r.value = 'b'
    vi.advanceTimersByTime(80)
    r.value = 'c'
    vi.advanceTimersByTime(80)
    expect(r.value).toBe('a')
    vi.advanceTimersByTime(20)
    expect(r.value).toBe('c')
  })
})

describe('useImmediateDebouncedRef', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('игнорирует записи, пока таймер активен', () => {
    const r = useImmediateDebouncedRef('a', 100)
    r.value = 'b'
    r.value = 'c'
    vi.advanceTimersByTime(100)
    expect(r.value).toBe('b')
  })
})
