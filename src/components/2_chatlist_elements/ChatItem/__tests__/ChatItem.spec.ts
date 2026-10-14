import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatItem from '../ChatItem.vue'
import { makeChatItem } from '@/test-utils/withSetup'

function mountChatItem(chatOverrides: Record<string, unknown> = {}) {
  return mount(ChatItem, {
    props: {
      chat: makeChatItem(chatOverrides),
      showDialogs: false,
    },
    global: {
      provide: { chatAppId: 'chat-item-verified' },
      stubs: {
        Tooltip: { template: '<div><slot /></div>' },
        ButtonContextMenu: true,
        ContextMenu: true,
        AvatarIcon: true,
        Teleport: true,
      },
    },
  })
}

describe('ChatItem verified badge', () => {
  it('показывает бейдж при verified: true', () => {
    const wrapper = mountChatItem({ verified: true, name: 'Mobilon One' })
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('не показывает бейдж при verified: false', () => {
    const wrapper = mountChatItem({ verified: false })
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('не показывает бейдж если verified не задан', () => {
    const wrapper = mountChatItem()
    expect(wrapper.find('[data-testid="verified-badge"]').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('ChatItem actions menu', () => {
  it('не показывает «⋯» при пустом actions: []', async () => {
    const wrapper = mountChatItem({ actions: [] })
    await wrapper.find('[data-testid="chat-item"]').trigger('mouseenter')
    expect(wrapper.find('.chat-item__actions-trigger').exists()).toBe(false)
    wrapper.unmount()
  })
})

describe('ChatItem deleted lastMessage', () => {
  it('при deleted: true показывает tombstone независимо от type', () => {
    const wrapper = mountChatItem({
      lastMessage: {
        type: 'message.image',
        deleted: true,
        data: { text: 'Было фото гор', filename: 'mountains.jpg' },
      },
    })
    const lastMessage = wrapper.find('.chat-item__last-message')
    expect(lastMessage.exists()).toBe(true)
    expect(lastMessage.text()).toContain('Сообщение удалено')
    expect(wrapper.find('.chat-item__message-icon').exists()).toBe(true)
    wrapper.unmount()
  })
})
