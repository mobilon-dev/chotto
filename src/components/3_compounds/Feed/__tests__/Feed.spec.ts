import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Feed from '../Feed.vue'
import { makeFeedObject } from '@/test-utils/withSetup'

function mountFeed(objects: ReturnType<typeof makeFeedObject>[], props: Record<string, unknown> = {}) {
  return mount(Feed, {
    props: {
      objects,
      reactionsEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'feed-smoke' },
      stubs: {
        MessageReactionsOverlay: true,
        DateMessageSticky: true,
        LoadingIndicator: true,
        MessageKeyboard: true,
        FeedKeyboard: true,
        TypingMessage: true,
        ContextMenu: true,
        LinkPreview: true,
        EmbedPreview: true,
        MessageReactions: true,
      },
    },
    attachTo: document.body,
  })
}

describe('Feed smoke', () => {
  let rafStub: typeof requestAnimationFrame
  let cafStub: typeof cancelAnimationFrame

  beforeEach(() => {
    rafStub = window.requestAnimationFrame
    cafStub = window.cancelAnimationFrame
    window.requestAnimationFrame = ((cb: FrameRequestCallback) =>
      window.setTimeout(() => cb(0), 0)) as typeof requestAnimationFrame
    window.cancelAnimationFrame = ((id: number) => clearTimeout(id)) as typeof cancelAnimationFrame
  })

  afterEach(() => {
    window.requestAnimationFrame = rafStub
    window.cancelAnimationFrame = cafStub
    document.body.innerHTML = ''
  })

  it('рендерит N текстовых сообщений', async () => {
    const objects = [
      makeFeedObject({ messageId: 'm1', text: 'Привет' }),
      makeFeedObject({ messageId: 'm2', text: 'Как дела?', position: 'right' }),
      makeFeedObject({ messageId: 'm3', text: 'Ок' }),
    ]
    const wrapper = mountFeed(objects)
    await nextTick()

    expect(wrapper.find('[data-testid="feed"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="feed-scroll"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="feed-message"]')).toHaveLength(3)
    expect(wrapper.find('[data-message-id="m1"]').exists()).toBe(true)
    expect(wrapper.find('#msg-m2').exists()).toBe(true)
    wrapper.unmount()
  })

  it('пустой objects показывает empty-feed слот', () => {
    const wrapper = mount(Feed, {
      props: { objects: [], reactionsEnabled: false },
      slots: { 'empty-feed': '<div data-testid="empty-feed">Пусто</div>' },
      global: {
        provide: { chatAppId: 'feed-empty' },
        stubs: { MessageReactionsOverlay: true },
      },
    })

    expect(wrapper.find('[data-testid="empty-feed"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="feed-message"]')).toHaveLength(0)
    wrapper.unmount()
  })

  it('смена objects обновляет список (имитация смены чата)', async () => {
    const wrapper = mountFeed([
      makeFeedObject({ messageId: 'old-1', text: 'старый' }),
    ])
    await nextTick()
    expect(wrapper.find('[data-message-id="old-1"]').exists()).toBe(true)

    await wrapper.setProps({
      objects: [
        makeFeedObject({ messageId: 'new-1', text: 'новый' }),
        makeFeedObject({ messageId: 'new-2', text: 'ещё' }),
      ],
    })
    await nextTick()

    expect(wrapper.find('[data-message-id="old-1"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-testid="feed-message"]')).toHaveLength(2)
    expect(wrapper.find('[data-message-id="new-1"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('deleted сообщение рендерит tombstone без кнопки меню (#15621)', async () => {
    const wrapper = mountFeed([
      makeFeedObject({
        messageId: 'del-1',
        text: 'удалённое',
        deleted: true,
        position: 'right',
      }),
    ])
    await nextTick()

    expect(wrapper.find('[data-message-id="del-1"]').exists()).toBe(true)
    // tombstone вместо обычного текста
    expect(wrapper.find('.text-message__text').exists()).toBe(false)
    expect(wrapper.find('.deleted-message-content').exists()).toBe(true)
    expect(wrapper.find('.text-message__menu-button').exists()).toBe(false)
    wrapper.unmount()
  })
})
