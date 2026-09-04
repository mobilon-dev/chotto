import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CreateChat2 from '../CreateChat2.vue'

describe('CreateChat2 smoke', () => {
  it('рендерит title и поля имени/телефона', () => {
    const wrapper = mount(CreateChat2, {
      props: { title: 'Создать контакт' },
    })
    expect(wrapper.text()).toContain('Создать контакт')
    expect(wrapper.find('#contact-name').exists()).toBe(true)
    expect(wrapper.find('#contact-phone').exists()).toBe(true)
    wrapper.unmount()
  })

  it('эмитит change с isValid=false при коротком имени', async () => {
    const wrapper = mount(CreateChat2, {
      props: { title: 'Контакт' },
    })
    await wrapper.find('#contact-name').setValue('ab')
    await wrapper.find('#contact-name').trigger('blur')

    const payload = wrapper.emitted('change')?.at(-1)?.[0] as {
      isValid: boolean
      contact: { name: string }
    }
    expect(payload.isValid).toBe(false)
    expect(payload.contact.name).toBe('ab')
    expect(wrapper.find('.form-error').text()).toContain('минимум 3')
    wrapper.unmount()
  })

  it('validateForm true для валидных имени и телефона', async () => {
    const wrapper = mount(CreateChat2, {
      props: { title: 'Контакт' },
    })
    await wrapper.find('#contact-name').setValue('Иван')
    await wrapper.find('#contact-phone').trigger('focus')
    await wrapper.find('#contact-phone').setValue('79991234567')

    const vm = wrapper.vm as unknown as { validateForm: () => boolean }
    expect(vm.validateForm()).toBe(true)

    const payload = wrapper.emitted('change')?.at(-1)?.[0] as {
      isValid: boolean
      contactDigits: string
    }
    expect(payload.isValid).toBe(true)
    expect(payload.contactDigits).toMatch(/^7\d{10}$/)
    wrapper.unmount()
  })

  it('formatPhone нормализует 8… → +7 (…)', () => {
    const wrapper = mount(CreateChat2, { props: { title: 'Контакт' } })
    const vm = wrapper.vm as unknown as { formatPhone: (p: string) => string }
    expect(vm.formatPhone('89991234567')).toBe('+7 (999) 123-45-67')
    wrapper.unmount()
  })
})
