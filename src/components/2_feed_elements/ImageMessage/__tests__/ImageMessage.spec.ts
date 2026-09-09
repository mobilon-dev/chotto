import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ImageMessage from '../ImageMessage.vue'
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

const fullUrl = 'https://example.com/full.jpg'
const previewUrl = 'https://example.com/preview.jpg'

function mountImage(message: Record<string, unknown>, props: Record<string, unknown> = {}) {
  return mount(ImageMessage, {
    props: {
      message,
      reactionsEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'image-message-smoke' },
      stubs,
    },
  })
}

describe('ImageMessage preview url', () => {
  it('в ленте показывает imagePreviewUrl, если он задан', () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'i1', type: 'message.image', text: '' }),
      url: fullUrl,
      imagePreviewUrl: previewUrl,
      alt: 'photo',
    })
    expect(wrapper.find('.image-message__preview-image').attributes('src')).toBe(previewUrl)
    wrapper.unmount()
  })

  it('в ленте использует url, если imagePreviewUrl нет', () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'i2', type: 'message.image', text: '' }),
      url: fullUrl,
      alt: 'photo',
    })
    expect(wrapper.find('.image-message__preview-image').attributes('src')).toBe(fullUrl)
    wrapper.unmount()
  })

  it('в широком просмотре открывает полноразмерный url', async () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'i3', type: 'message.image', text: '' }),
      url: fullUrl,
      imagePreviewUrl: previewUrl,
      alt: 'photo',
    })
    await wrapper.find('.image-message__preview-button').trigger('click')
    expect(document.querySelector('.image-message__modal-image')?.getAttribute('src')).toBe(fullUrl)
    wrapper.unmount()
  })
})

describe('ImageMessage album', () => {
  const albumItems = [
    { url: 'https://example.com/full-1.jpg', imagePreviewUrl: 'https://example.com/p-1.jpg', filename: 'one.jpg' },
    { url: 'https://example.com/full-2.jpg', imagePreviewUrl: 'https://example.com/p-2.jpg', filename: 'two.jpg' },
    { url: 'https://example.com/full-3.jpg', imagePreviewUrl: 'https://example.com/p-3.jpg', filename: 'three.jpg' },
    { url: 'https://example.com/full-4.jpg', imagePreviewUrl: 'https://example.com/p-4.jpg', filename: 'four.jpg' },
    { url: 'https://example.com/full-5.jpg', imagePreviewUrl: 'https://example.com/p-5.jpg', filename: 'five.jpg' },
  ]

  it('рисует сетку, если items больше одного', () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'a1', type: 'message.image', text: '' }),
      url: albumItems[0].url,
      items: albumItems.slice(0, 2),
    })
    expect(wrapper.find('.image-message__album').exists()).toBe(true)
    expect(wrapper.findAll('.image-message__album-tile')).toHaveLength(2)
    expect(wrapper.find('.image-message__preview-image').exists()).toBe(false)
    expect(wrapper.find('.image-message__album-image').attributes('src')).toBe(albumItems[0].imagePreviewUrl)
    wrapper.unmount()
  })

  it('по клику на плитку открывает полноразмерный url этого фото', async () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'a2', type: 'message.image', text: '' }),
      url: albumItems[0].url,
      items: albumItems.slice(0, 2),
    })
    await wrapper.findAll('.image-message__album-tile')[1].trigger('click')
    expect(document.querySelector('.image-message__modal-image')?.getAttribute('src')).toBe(albumItems[1].url)
    wrapper.unmount()
  })

  it('для пяти фото показывает четыре плитки и +1', () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'a3', type: 'message.image', text: '' }),
      url: albumItems[0].url,
      items: albumItems,
    })
    expect(wrapper.findAll('.image-message__album-tile')).toHaveLength(4)
    expect(wrapper.find('.image-message__album-overflow').text()).toBe('+1')
    wrapper.unmount()
  })

  it('клик по плитке +N открывает первое скрытое фото', async () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'a5', type: 'message.image', text: '' }),
      url: albumItems[0].url,
      items: albumItems,
    })
    const tiles = wrapper.findAll('.image-message__album-tile')
    await tiles[tiles.length - 1].trigger('click')
    expect(document.querySelector('.image-message__modal-image')?.getAttribute('src')).toBe(albumItems[4].url)
    wrapper.unmount()
  })

  it('один элемент в items показывает обычное превью, не сетку', () => {
    const wrapper = mountImage({
      ...makeFeedObject({ messageId: 'a4', type: 'message.image', text: '' }),
      items: [albumItems[0]],
    })
    expect(wrapper.find('.image-message__album').exists()).toBe(false)
    expect(wrapper.find('.image-message__preview-image').attributes('src')).toBe(albumItems[0].imagePreviewUrl)
    wrapper.unmount()
  })
})
