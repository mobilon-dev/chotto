import { useModal } from './'
import { Modal } from './'

export const useModalSelectUser2 = async (title, users, theme) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./SelectUser2/SelectUser2.vue'),
    attrs: {
      title,
      users,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  })
  console.log('data', data)
  return data
}
