import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import ChatInput from '../ChatInput.vue'
import { useMessageDraft } from '@/hooks'

const stubs = {
  TextFormatToolbar: true,
  FilePreview: true,
  SendIcon: true,
  ArrowIcon: true,
}

function mountChatInput(chatAppId: string, props: Record<string, unknown> = {}) {
  return mount(ChatInput, {
    props,
    global: {
      provide: { chatAppId },
      stubs,
    },
  })
}

describe('ChatInput smoke', () => {
  afterEach(() => {
    // черновики глобальные — очищаем после каждого теста через уникальный id
  })

  it('монтируется с textarea и кнопкой send', () => {
    const id = `ci-mount-${Date.now()}`
    const wrapper = mountChatInput(id)

    expect(wrapper.find('[data-testid="chat-input-textarea"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="chat-input-send"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="chat-input-reply-line"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('не эмитит send при пустом тексте (кнопка)', async () => {
    const id = `ci-empty-btn-${Date.now()}`
    const wrapper = mountChatInput(id)

    await wrapper.find('[data-testid="chat-input-send"]').trigger('click')
    expect(wrapper.emitted('send')).toBeUndefined()
    wrapper.unmount()
  })

  it('не эмитит send при пустом тексте (Enter)', async () => {
    const id = `ci-empty-enter-${Date.now()}`
    const wrapper = mountChatInput(id)

    await wrapper.find('[data-testid="chat-input-textarea"]').trigger('keydown.enter', {
      key: 'Enter',
      shiftKey: false,
      ctrlKey: false,
    })
    expect(wrapper.emitted('send')).toBeUndefined()
    wrapper.unmount()
  })

  it('эмитит send по кнопке с текстом', async () => {
    const id = `ci-send-btn-${Date.now()}`
    const wrapper = mountChatInput(id)
    const { setMessageText } = useMessageDraft(id)
    setMessageText('привет')

    await wrapper.vm.$nextTick()
    await wrapper.find('[data-testid="chat-input-send"]').trigger('click')

    expect(wrapper.emitted('send')).toHaveLength(1)
    expect(wrapper.emitted('send')![0][0]).toMatchObject({
      type: 'message.text',
      text: 'привет',
    })
    wrapper.unmount()
  })

  it('эмитит send по Enter с текстом', async () => {
    const id = `ci-send-enter-${Date.now()}`
    const wrapper = mountChatInput(id)
    const { setMessageText } = useMessageDraft(id)
    setMessageText('enter-msg')

    await wrapper.vm.$nextTick()
    await wrapper.find('[data-testid="chat-input-textarea"]').trigger('keydown.enter', {
      key: 'Enter',
      shiftKey: false,
      ctrlKey: false,
    })

    expect(wrapper.emitted('send')).toHaveLength(1)
    expect(wrapper.emitted('send')![0][0]).toMatchObject({
      type: 'message.text',
      text: 'enter-msg',
    })
    wrapper.unmount()
  })

  it('в disabled показывает placeholder вместо textarea', () => {
    const id = `ci-disabled-${Date.now()}`
    const wrapper = mountChatInput(id, {
      state: 'disabled',
      disabledPlaceholder: 'Недоступно',
    })

    expect(wrapper.find('[data-testid="chat-input-textarea"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Недоступно')
    wrapper.unmount()
  })
})
