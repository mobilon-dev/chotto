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
