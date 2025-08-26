import { useModal } from './'
import Modal from './ModalNoFooter/ModalNoFooter.vue'

export const useModalCreateDialog = async (
  title: string,
  name: string,
  contacts: unknown,
  channels: unknown,
  filter: (data: unknown) => void,
  theme?: string
) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateDialog/CreateDialog.vue'),
    attrs: {
      title,
      name,
      contacts,
      channels,
      filter,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  })
  // console.log('data', data);
  return data
}
