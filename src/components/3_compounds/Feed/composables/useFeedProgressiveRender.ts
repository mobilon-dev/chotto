import { computed, nextTick, onUnmounted, ref, watch, type Ref } from 'vue'
import type { IFeedObject } from '@/types'

export const FEED_TAIL_CHUNK = 28
export const FEED_BACKFILL_CHUNK = 24

interface UseFeedProgressiveRenderOptions {
  objectsRef: { value: IFeedObject[] }
  feedRef: Ref<HTMLElement | null>
}

function itemKey(list: IFeedObject[], index: number): string {
  return list[index]?.messageId ?? ''
}

/**
 * Первый кадр — хвост ленты, остальное дорисовывается пачками.
 * После дорисовки все objects в DOM, скролл нативный.
 */
export function useFeedProgressiveRender({
  objectsRef,
  feedRef,
}: UseFeedProgressiveRenderOptions) {
  const renderStart = ref(0)
  let prevFirst = ''
  let prevLast = ''
  let prevLength = 0
  let backfillToken = 0
  let backfillRaf = 0

  const visibleObjects = computed(() => objectsRef.value.slice(renderStart.value))
  const isBackfilling = computed(() => renderStart.value > 0)

  function cancelBackfill(): void {
    backfillToken += 1
    if (backfillRaf) {
      cancelAnimationFrame(backfillRaf)
      backfillRaf = 0
    }
  }

  function restoreScrollAfterPrepend(prevHeight: number, prevTop: number, nearBottom: boolean): void {
    const el = feedRef.value
    if (!el) return
    const prevBehavior = el.style.scrollBehavior
    el.style.scrollBehavior = 'auto'
    if (nearBottom) {
      el.scrollTop = el.scrollHeight
    } else {
      el.scrollTop = prevTop + (el.scrollHeight - prevHeight)
    }
    requestAnimationFrame(() => {
      el.style.scrollBehavior = prevBehavior
    })
  }

  function scheduleBackfill(): void {
    const token = ++backfillToken
    const step = () => {
      backfillRaf = 0
      if (token !== backfillToken) return
      if (renderStart.value <= 0) return

      const el = feedRef.value
      const prevHeight = el?.scrollHeight ?? 0
      const prevTop = el?.scrollTop ?? 0
      const nearBottom = el
        ? el.scrollHeight - el.scrollTop - el.clientHeight < 140
        : true

      renderStart.value = Math.max(0, renderStart.value - FEED_BACKFILL_CHUNK)

      nextTick(() => {
        restoreScrollAfterPrepend(prevHeight, prevTop, nearBottom)
        if (token !== backfillToken) return
        if (renderStart.value > 0) {
          backfillRaf = requestAnimationFrame(step)
        }
      })
    }
    backfillRaf = requestAnimationFrame(step)
  }

  function showTail(length: number): void {
    renderStart.value = Math.max(0, length - FEED_TAIL_CHUNK)
    if (renderStart.value > 0) {
      scheduleBackfill()
    }
  }

  function revealThroughIndex(index: number): void {
    if (index < 0) return
    const withContext = Math.max(0, index - 8)
    if (withContext < renderStart.value) {
      renderStart.value = withContext
      if (renderStart.value > 0) {
        scheduleBackfill()
      }
    }
  }

  function accelerateBackfill(): void {
    if (renderStart.value <= 0) return
    const el = feedRef.value
    const prevHeight = el?.scrollHeight ?? 0
    const prevTop = el?.scrollTop ?? 0
    const nearBottom = el
      ? el.scrollHeight - el.scrollTop - el.clientHeight < 140
      : false
    renderStart.value = Math.max(0, renderStart.value - FEED_BACKFILL_CHUNK * 2)
    nextTick(() => {
      restoreScrollAfterPrepend(prevHeight, prevTop, nearBottom)
      if (renderStart.value > 0) {
        scheduleBackfill()
      }
    })
  }

  watch(
    () => objectsRef.value,
    (next) => {
      const first = itemKey(next, 0)
      const last = itemKey(next, next.length - 1)
      const isPrepend = prevLength > 0
        && next.length > prevLength
        && last === prevLast
        && first !== prevFirst
      const isAppend = prevLength > 0
        && next.length > prevLength
        && first === prevFirst
      const isSameEnds = first === prevFirst && last === prevLast && next.length === prevLength

      if (next.length === 0) {
        cancelBackfill()
        renderStart.value = 0
      } else if (isSameEnds) {
        // in-place (статус, реакции) — окно не трогаем
      } else if (isPrepend) {
        const added = next.length - prevLength
        if (renderStart.value > 0) {
          renderStart.value += added
          scheduleBackfill()
        }
      } else if (isAppend) {
        // новые снизу входят в slice автоматически
      } else if (prevLength === 0) {
        cancelBackfill()
        showTail(next.length)
      } else {
        cancelBackfill()
        renderStart.value = next.length
        nextTick(() => {
          requestAnimationFrame(() => {
            showTail(objectsRef.value.length)
          })
        })
      }

      prevFirst = first
      prevLast = last
      prevLength = next.length
    },
    { immediate: true },
  )

  onUnmounted(cancelBackfill)

  return {
    visibleObjects,
    renderStart,
    isBackfilling,
    revealThroughIndex,
    accelerateBackfill,
  }
}
