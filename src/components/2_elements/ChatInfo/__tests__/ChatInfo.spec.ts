import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatInfo from '../ChatInfo.vue'

function mountChatInfo(chatOverrides: Record<string, unknown> = {}) {
  return mount(ChatInfo, {
    props: {
      chat: {
        name: 'Ch-001',
        chatId: 'testChatId',
        avatar: null,
        'lastActivity.time': 'вчера',
        ...chatOverrides,
      },
    },
    global: {
      provide: { chatAppId: 'chat-info-verified' },
      stubs: {
        AvatarIcon: true,
      },
    },
  })
}

describe('ChatInfo verified badge', () => {
  it('показывает бейдж при verified: true', () => {
    const wrapper = mountChatInfo({ verified: true, name: 'Mobilon One' })
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Mobilon One')
    wrapper.unmount()
  })

  it('не показывает бейдж при verified: false', () => {
    const wrapper = mountChatInfo({ verified: false })
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('не показывает бейдж если verified не задан', () => {
    const wrapper = mountChatInfo()
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('сохраняет additionalTitle рядом с бейджем', () => {
    const wrapper = mount(ChatInfo, {
      props: {
        chat: {
          name: 'Mobilon One',
          verified: true,
        },
        additionalTitle: 'WhatsApp',
      },
      global: {
        provide: { chatAppId: 'chat-info-verified' },
        stubs: { AvatarIcon: true },
      },
    })
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(true)
    expect(wrapper.find('.chat-info__additional-title').text()).toBe('WhatsApp')
    wrapper.unmount()
  })
})
