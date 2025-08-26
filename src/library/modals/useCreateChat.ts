import { useModal } from './'
import { Modal } from './'

export const useModalCreateChat = async (title: string, theme: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateChat/CreateChat.vue'),
    attrs: {
      title,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  })
  console.log('data', data)
  return data
}
