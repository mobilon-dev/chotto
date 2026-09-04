import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CreateChat from '../CreateChat.vue'

describe('CreateChat smoke', () => {
  it('рендерит title и эмитит change при вводе имени', async () => {
    const wrapper = mount(CreateChat, {
      props: { title: 'Новый чат' },
    })

    expect(wrapper.text()).toContain('Новый чат')
    await wrapper.find('input.name').setValue('Алиса')
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toEqual({ name: 'Алиса' })
    wrapper.unmount()
  })
})
