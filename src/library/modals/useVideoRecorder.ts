import { useModal } from './useModal.ts'
import Modal from './ModalNoFooter/ModalNoFooter.vue'

export const useModalVideoRecorder = async (theme?: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./ModalVideoRecorder/ModalVideoRecorder.vue'),
    attrs: {},
    Modal,
    modalAttrs: {
      theme,
    },
  })
  //console.log('data', data);
  return data
}
