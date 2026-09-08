import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VideoMessage from '../VideoMessage.vue'
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

const fullUrl = 'https://example.com/full.mp4'
const previewUrl = 'https://example.com/preview.mp4'
const coverUrl = 'https://example.com/cover.jpg'

function mountVideo(message: Record<string, unknown>, props: Record<string, unknown> = {}) {
  return mount(VideoMessage, {
    props: {
      message,
      reactionsEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'video-message-smoke' },
      stubs,
    },
  })
}

describe('VideoMessage preview sources', () => {
  it('в ленте показывает coverUrl с наивысшим приоритетом', () => {
    const wrapper = mountVideo({
      ...makeFeedObject({ messageId: 'v1', type: 'message.video', text: '' }),
      url: fullUrl,
      videoPreviewUrl: previewUrl,
      coverUrl,
      alt: 'video',
    })
    expect(wrapper.find('img.video-message__video').attributes('src')).toBe(coverUrl)
    expect(wrapper.find('video.video-message__video').exists()).toBe(false)
    expect(wrapper.find('.video-message__play-badge').exists()).toBe(true)
    wrapper.unmount()
  })

  it('в ленте показывает videoPreviewUrl, если обложки нет', () => {
    const wrapper = mountVideo({
      ...makeFeedObject({ messageId: 'v2', type: 'message.video', text: '' }),
      url: fullUrl,
      videoPreviewUrl: previewUrl,
      alt: 'video',
    })
    expect(wrapper.find('video.video-message__video').attributes('src')).toBe(previewUrl)
    expect(wrapper.find('img.video-message__video').exists()).toBe(false)
    expect(wrapper.find('.video-message__play-badge').exists()).toBe(false)
    wrapper.unmount()
  })

  it('в ленте использует url, если coverUrl и videoPreviewUrl нет', () => {
    const wrapper = mountVideo({
      ...makeFeedObject({ messageId: 'v3', type: 'message.video', text: '' }),
      url: fullUrl,
      alt: 'video',
    })
    expect(wrapper.find('video.video-message__video').attributes('src')).toBe(fullUrl)
    wrapper.unmount()
  })

  it('в широком просмотре открывает полноразмерный url', async () => {
    const wrapper = mountVideo({
      ...makeFeedObject({ messageId: 'v4', type: 'message.video', text: '' }),
      url: fullUrl,
      videoPreviewUrl: previewUrl,
      coverUrl,
      alt: 'video',
    })
    await wrapper.find('.video-message__preview-button').trigger('click')
    expect(document.querySelector('.video-message__modal-video')?.getAttribute('src')).toBe(fullUrl)
    wrapper.unmount()
  })
})
