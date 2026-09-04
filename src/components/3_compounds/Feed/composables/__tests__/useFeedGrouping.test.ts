import { describe, expect, it } from 'vitest'
import { computed } from 'vue'
import { useFeedGrouping } from '../useFeedGrouping'
import { makeFeedObject } from '@/test-utils/withSetup'

describe('useFeedGrouping', () => {
  it('возвращает пустой массив для пустой ленты', () => {
    const { seriesFlags } = useFeedGrouping({
      objects: computed(() => []),
    })
    expect(seriesFlags.value).toEqual([])
  })

  it('помечает первое сообщение серии как true', () => {
    const objects = computed(() => [
      makeFeedObject({ messageId: '1', position: 'left', header: 'A' }),
      makeFeedObject({ messageId: '2', position: 'left', header: 'A' }),
      makeFeedObject({ messageId: '3', position: 'right', header: 'B' }),
    ])

    const { seriesFlags } = useFeedGrouping({ objects })
    expect(seriesFlags.value).toEqual([true, false, true])
  })

  it('не разрывает серию системными сообщениями', () => {
    const objects = computed(() => [
      makeFeedObject({ messageId: '1', position: 'left', header: 'A' }),
      makeFeedObject({ messageId: 'sep', type: 'system.date', position: 'left' }),
      makeFeedObject({ messageId: '2', position: 'left', header: 'A' }),
    ])

    const { seriesFlags } = useFeedGrouping({ objects })
    expect(seriesFlags.value[0]).toBe(true)
    expect(seriesFlags.value[1]).toBe(true) // system всегда «начало»
    expect(seriesFlags.value[2]).toBe(false) // продолжает серию A
  })

  it('начинает новую серию при смене автора (header)', () => {
    const objects = computed(() => [
      makeFeedObject({ messageId: '1', position: 'left', header: 'A' }),
      makeFeedObject({ messageId: '2', position: 'left', header: 'B' }),
    ])

    const { seriesFlags } = useFeedGrouping({ objects })
    expect(seriesFlags.value).toEqual([true, true])
  })
})
