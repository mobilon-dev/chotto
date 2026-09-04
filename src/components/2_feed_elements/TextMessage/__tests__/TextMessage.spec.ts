import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TextMessage from '../TextMessage.vue'
import { makeFeedObject } from '@/test-utils/withSetup'

const stubs = {
  Tooltip: true,
  ContextMenu: true,
  LinkPreview: true,
  EmbedPreview: true,
  MessageReactions: true,
  MessageStatusIndicator: true,
  FeedReplyQuote: true,
  MessageSmsInvite: true,
  DeletedMessageContent: {
    template: '<div class="deleted-message-content" />',
  },
}

function mountText(message: Record<string, unknown>, props: Record<string, unknown> = {}) {
  return mount(TextMessage, {
    props: {
      message,
      reactionsEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'text-message-smoke' },
      stubs,
    },
  })
}

describe('TextMessage smoke', () => {
  it('рендерит текст сообщения', () => {
    const wrapper = mountText(
      makeFeedObject({ messageId: 't1', text: 'Привет мир', position: 'left' }),
    )
    expect(wrapper.find('.text-message__text').html()).toContain('Привет мир')
    expect(wrapper.classes()).toContain('text-message__left')
    wrapper.unmount()
  })

  it('deleted показывает tombstone вместо текста (#15621)', () => {
    const wrapper = mountText(
      makeFeedObject({ messageId: 't2', text: 'gone', deleted: true, position: 'right' }),
    )
    expect(wrapper.find('.text-message__text').exists()).toBe(false)
    expect(wrapper.find('.deleted-message-content').exists()).toBe(true)
    expect(wrapper.find('.text-message__menu-button').exists()).toBe(false)
    wrapper.unmount()
  })

  it('клик по views эмитит action', async () => {
    const wrapper = mountText({
      ...makeFeedObject({ messageId: 't3', text: 'hi' }),
      views: 12,
    })
    await wrapper.find('.text-message__views').trigger('click')
    expect(wrapper.emitted('action')?.[0]?.[0]).toMatchObject({
      type: expect.any(String),
      messageId: 't3',
    })
    wrapper.unmount()
  })

  it('reply quote пробрасывает reply event', async () => {
    const wrapper = mount(TextMessage, {
      props: {
        message: {
          ...makeFeedObject({ messageId: 't4', text: 'ответ' }),
          reply: { messageId: 'orig', type: 'message.text', text: 'цитата' },
        },
        reactionsEnabled: false,
      },
      global: {
        provide: { chatAppId: 'text-message-smoke' },
        stubs: {
          ...stubs,
          FeedReplyQuote: {
            template: '<button data-testid="quote" @click="$emit(\'reply\', \'orig\')" />',
          },
        },
      },
    })
    await wrapper.find('[data-testid="quote"]').trigger('click')
    expect(wrapper.emitted('reply')?.[0]).toEqual(['orig'])
    wrapper.unmount()
  })
})
