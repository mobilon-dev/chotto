import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FeedKeyboard from '../FeedKeyboard.vue'

describe('FeedKeyboard', () => {
  it('рендерит кнопки в контейнере без sticky-класса message-feed__keyboard', () => {
    const wrapper = mount(FeedKeyboard, {
      props: {
        buttons: [{ key: 'no-reply', text: 'Ответ не нужен', order: 1 }],
        align: 'right',
      },
    })
    const root = wrapper.find('.feed-keyboard__container')
    expect(root.exists()).toBe(true)
    expect(root.classes()).not.toContain('message-feed__keyboard')
    expect(wrapper.text()).toContain('Ответ не нужен')
    wrapper.unmount()
  })
})
