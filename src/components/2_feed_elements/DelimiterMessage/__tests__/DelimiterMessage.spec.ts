import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DelimiterMessage from '../DelimiterMessage.vue'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'

describe('DelimiterMessage', () => {
  it('без tooltipText рендерит только текст', () => {
    const wrapper = mount(DelimiterMessage, {
      props: {
        message: { messageId: 'd1', text: 'Диалог WhatsApp - 10:08' },
      },
      global: {
        provide: { chatAppId: 'delimiter-smoke' },
      },
    })
    expect(wrapper.find('.delimiter-message__text').text()).toBe('Диалог WhatsApp - 10:08')
    expect(wrapper.find('.tooltip-wrapper').exists()).toBe(false)
    wrapper.unmount()
  })

  it('с tooltipText оборачивает только текст (hit-area), не всю полосу', () => {
    const wrapper = mount(DelimiterMessage, {
      props: {
        message: {
          messageId: 'd2',
          text: 'Диалог WhatsApp - 10:08',
          tooltipText: 'канал: whatsapp',
        },
      },
      global: {
        provide: { chatAppId: 'delimiter-smoke' },
      },
    })
    const tooltip = wrapper.find('.tooltip-wrapper')
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.find('.delimiter-message__text').exists()).toBe(true)
    expect(tooltip.find('.delimiter-message__container').exists()).toBe(false)
    expect(wrapper.find('.delimiter-message__tooltip-root').exists()).toBe(false)
    const tooltipComp = wrapper.findComponent(Tooltip)
    expect(tooltipComp.exists()).toBe(true)
    expect(tooltipComp.props('followCursor')).toBe(true)
    wrapper.unmount()
  })
})
