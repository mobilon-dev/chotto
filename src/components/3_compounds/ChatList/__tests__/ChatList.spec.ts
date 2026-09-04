import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatList from '../ChatList.vue'
import { makeChatItem } from '@/test-utils/withSetup'

const sampleChats = [
  makeChatItem({ chatId: '1', name: 'Alice', metadata: 'meta-alice' }),
  makeChatItem({ chatId: '2', name: 'Bob', countUnread: 3, isFixedTop: true }),
  makeChatItem({ chatId: '3', name: 'Carol', isFixedBottom: true }),
]

function mountChatList(props: Record<string, unknown> = {}) {
  return mount(ChatList, {
    props: {
      chats: sampleChats,
      filterEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'chat-list-smoke' },
      stubs: {
        LoadingIndicator: true,
        ChatTabs: true,
        Tooltip: true,
        ButtonContextMenu: true,
        ContextMenu: true,
        AvatarIcon: true,
      },
    },
  })
}

describe('ChatList smoke', () => {
  it('рендерит список с data-testid', () => {
    const wrapper = mountChatList()
    expect(wrapper.find('[data-testid="chat-list"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="chat-item"]')).toHaveLength(3)
    wrapper.unmount()
  })

  it('эмитит select при клике на chat-item', async () => {
    const wrapper = mountChatList()
    await wrapper.find('[data-chat-id="1"]').trigger('click')

    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')![0][0]).toMatchObject({
      chat: expect.objectContaining({ chatId: '1', name: 'Alice' }),
      dialog: null,
    })
    wrapper.unmount()
  })

  it('рисует fixed top/bottom вне основной зоны', () => {
    const wrapper = mountChatList()
    expect(wrapper.find('.chat-list__fixed-items-top [data-chat-id="2"]').exists()).toBe(true)
    expect(wrapper.find('.chat-list__fixed-items-bottom [data-chat-id="3"]').exists()).toBe(true)
    expect(wrapper.find('.chat-list__items [data-chat-id="1"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('фильтр эмитит search', async () => {
    const wrapper = mountChatList({ filterEnabled: true })
    const input = wrapper.find('[data-testid="chat-filter-input"]')
    expect(input.exists()).toBe(true)

    await input.setValue('Alice')
    expect(wrapper.emitted('search')?.[0]).toEqual(['Alice'])
    wrapper.unmount()
  })

  it('пустой список показывает placeholder', () => {
    const wrapper = mountChatList({
      chats: [],
      placeholderTitle: 'Нет чатов',
    })
    expect(wrapper.find('.chat-list__no-data').exists()).toBe(true)
    expect(wrapper.text()).toContain('Нет чатов')
    wrapper.unmount()
  })
})
