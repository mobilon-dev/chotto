import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FileMessage from '../FileMessage.vue'
import { makeFeedObject } from '@/test-utils/withSetup'

const stubs = {
  Tooltip: true,
  ContextMenu: true,
  LinkPreview: true,
  EmbedPreview: true,
  MessageReactions: true,
  MessageStatusIndicator: true,
  FeedReplyQuote: true,
  DeletedMessageContent: {
    template: '<div class="deleted-message-content" />',
  },
}

function mountFile(message: Record<string, unknown>, props: Record<string, unknown> = {}) {
  return mount(FileMessage, {
    props: {
      message,
      reactionsEnabled: false,
      ...props,
    },
    global: {
      provide: { chatAppId: 'file-message-smoke' },
      stubs,
    },
  })
}

describe('FileMessage smoke', () => {
  it('рендерит имя файла и ссылку', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f1', text: '', type: 'message.file' }),
      filename: 'doc.pdf',
      url: 'https://example.com/doc.pdf',
      position: 'left',
    })
    expect(wrapper.find('.file-message__filename-text').text()).toBe('doc.pdf')
    expect(wrapper.find('.file-message__link').attributes('href')).toBe(
      'https://example.com/doc.pdf',
    )
    wrapper.unmount()
  })

  it('показывает тип файла и размер', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f1b', text: '', type: 'message.file' }),
      filename: 'doc.pdf',
      url: 'https://example.com/doc.pdf',
      size: 1048576,
      position: 'left',
    })
    expect(wrapper.find('.file-message__file-meta').text()).toBe('PDF - 1МБ')
    wrapper.unmount()
  })

  it('deleted показывает tombstone без ссылки на файл', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f2', deleted: true, type: 'message.file' }),
      filename: 'doc.pdf',
      url: 'https://example.com/doc.pdf',
    })
    expect(wrapper.find('.file-message__link').exists()).toBe(false)
    expect(wrapper.find('.deleted-message-content').exists()).toBe(true)
    wrapper.unmount()
  })

  it('показывает caption-текст, если есть', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f3', text: 'подпись', type: 'message.file' }),
      filename: 'a.png',
      url: 'https://example.com/a.png',
    })
    expect(wrapper.find('.file-message__text-container').text()).toContain('подпись')
    wrapper.unmount()
  })

  it('рендерит несколько файлов из items', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f4', text: '', type: 'message.file' }),
      url: 'https://example.com/one.pdf',
      filename: 'one.pdf',
      items: [
        { url: 'https://example.com/one.pdf', filename: 'one.pdf' },
        { url: 'https://example.com/two.pdf', filename: 'two.pdf' },
      ],
    })
    expect(wrapper.find('.file-message__files--many').exists()).toBe(true)
    expect(wrapper.findAll('.file-message__link')).toHaveLength(2)
    expect(wrapper.findAll('.file-message__filename-text')[1].text()).toBe('two.pdf')
    wrapper.unmount()
  })

  it('декодирует percent-encoded имя файла', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f-enc', text: '', type: 'message.file' }),
      url: 'https://example.com/doc.pdf',
      filename: '%D0%A0%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5.pdf',
      position: 'left',
    })
    expect(wrapper.find('.file-message__filename-text').text()).toBe('Расписание.pdf')
    wrapper.unmount()
  })

  it('один элемент в items показывает одну ссылку без класса many', () => {
    const wrapper = mountFile({
      ...makeFeedObject({ messageId: 'f5', text: '', type: 'message.file' }),
      items: [{ url: 'https://example.com/single.pdf', filename: 'single.pdf' }],
    })
    expect(wrapper.find('.file-message__files--many').exists()).toBe(false)
    expect(wrapper.findAll('.file-message__link')).toHaveLength(1)
    wrapper.unmount()
  })
})
