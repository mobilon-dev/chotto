import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Tooltip from '../Tooltip.vue'

describe('Tooltip followCursor', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('позиционирует пузырь под курсором при followCursor', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: {
        text: 'hint',
        followCursor: true,
        delay: 0,
        offset: 8,
      },
      slots: {
        default: '<span class="trigger">hover me</span>',
      },
      attachTo: document.body,
      global: {
        provide: { chatAppId: undefined },
      },
    })

    await wrapper.find('.tooltip-wrapper').trigger('mouseenter', {
      clientX: 120,
      clientY: 80,
    })
    vi.runAllTimers()
    await nextTick()
    await nextTick()

    const bubble = document.querySelector('.tooltip__text') as HTMLElement | null
    expect(bubble).toBeTruthy()
    // top ≈ clientY + offset; left ≈ clientX - width/2 (clamp may adjust)
    expect(parseFloat(bubble!.style.top)).toBeGreaterThanOrEqual(80)
    expect(bubble!.style.left).not.toBe('')

    await wrapper.find('.tooltip-wrapper').trigger('mousemove', {
      clientX: 200,
      clientY: 150,
    })
    await nextTick()
    expect(parseFloat(bubble!.style.top)).toBeGreaterThanOrEqual(150)

    wrapper.unmount()
    vi.useRealTimers()
  })

  it('без followCursor не ломает top-center якорь к bounds', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Tooltip, {
      props: {
        text: 'hint',
        followCursor: false,
        position: 'top-center',
        delay: 0,
        offset: 8,
      },
      slots: {
        default: '<span class="trigger" style="display:inline-block;width:100px;height:20px">x</span>',
      },
      attachTo: document.body,
      global: {
        provide: { chatAppId: undefined },
      },
    })

    await wrapper.find('.tooltip-wrapper').trigger('mouseenter', {
      clientX: 999,
      clientY: 999,
    })
    vi.runAllTimers()
    await nextTick()
    await nextTick()

    const bubble = document.querySelector('.tooltip__text') as HTMLElement | null
    expect(bubble).toBeTruthy()
    // Не привязан к clientY=999 — якорь к элементу
    expect(parseFloat(bubble!.style.top)).toBeLessThan(500)

    wrapper.unmount()
    vi.useRealTimers()
  })
})
