import { describe, expect, it } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { mount } from '@vue/test-utils'
import {
  createMessageDraftStore,
  getDraftFiles,
  messageDraftStoreKey,
  useMessageDraft,
} from '../useMessageDraft'
import { withSetup } from '@/test-utils/withSetup'

describe('getDraftFiles', () => {
  it('возвращает пустой массив без черновика', () => {
    expect(getDraftFiles(undefined)).toEqual([])
  })

  it('предпочитает files над file', () => {
    expect(
      getDraftFiles({
        id: 'x',
        text: '',
        forceSend: false,
        isRecording: false,
        file: { url: 'a' },
        files: [{ url: 'b' }, { url: 'c' }],
      }),
    ).toEqual([{ url: 'b' }, { url: 'c' }])
  })
})

describe('useMessageDraft', () => {
  it('сохраняет и восстанавливает текст по chatAppId', () => {
    const id = `draft-test-${Date.now()}-a`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setMessageText('привет')
    expect(result.getMessage().text).toBe('привет')

    result.resetMessage()
    expect(result.getMessage().text).toBe('')
    scope.stop()
  })

  it('setReply / resetReply', () => {
    const id = `draft-test-${Date.now()}-b`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setReply({ messageId: 'm1', type: 'message.text', text: 'цитата' })
    expect(result.getMessage().reply).toMatchObject({ messageId: 'm1' })

    result.resetReply()
    expect(result.getMessage().reply).toBeUndefined()
    scope.stop()
  })

  it('режимы reply и edit взаимоисключающи', () => {
    const id = `draft-test-${Date.now()}-c`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.setReply({ messageId: 'm1', type: 'message.text', text: 'r' })
    result.setEdit({ messageId: 'm2', type: 'message.text', text: 'e' })
    expect(result.getMessage().reply).toBeUndefined()
    expect(result.getMessage().edit?.messageId).toBe('m2')
    scope.stop()
  })

  it('addMessageFiles ограничивает количество', () => {
    const id = `draft-test-${Date.now()}-d`
    const { result, scope } = withSetup(() => useMessageDraft(id))

    result.addMessageFiles(
      [
        { url: '1' },
        { url: '2' },
        { url: '3' },
        { url: '4' },
        { url: '5' },
        { url: '6' },
      ],
      5,
    )

    expect(getDraftFiles(result.getMessage())).toHaveLength(5)
    scope.stop()
  })

  it('два provided store изолированы друг от друга', () => {
    const storeA = createMessageDraftStore()
    const storeB = createMessageDraftStore()

    const Child = defineComponent({
      props: { label: { type: String, required: true } },
      setup(props) {
        const draft = useMessageDraft('shared-id')
        draft.setMessageText(props.label)
        return { text: () => draft.getMessage().text }
      },
      render() {
        return h('div')
      },
    })

    const Parent = defineComponent({
      props: {
        store: { type: Object, required: true },
        label: { type: String, required: true },
      },
      setup(props) {
        provide(messageDraftStoreKey, props.store as ReturnType<typeof createMessageDraftStore>)
        return () => h(Child, { label: props.label })
      },
    })

    const a = mount(Parent, { props: { store: storeA, label: 'из A' } })
    const b = mount(Parent, { props: { store: storeB, label: 'из B' } })

    expect(storeA.messages.value[0]?.text).toBe('из A')
    expect(storeB.messages.value[0]?.text).toBe('из B')
    expect(a.findComponent(Child).vm.text()).toBe('из A')
    expect(b.findComponent(Child).vm.text()).toBe('из B')

    a.unmount()
    b.unmount()
  })

  it('getChatDraft через store видит listPreview после commit', () => {
    const store = createMessageDraftStore()
    const chatAppId = 'app-preview'
    const chatId = 7
    const draftId = `${chatAppId}:${chatId}`

    const draft = store.ensureDraft(draftId)
    draft.text = 'черновик в списке'
    store.commitChatDraftToList(draftId)

    const found = store.getChatDraft(chatAppId, chatId)
    expect(found?.listPreviewText).toBe('черновик в списке')
  })
})
