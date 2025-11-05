import { useModal } from './useModal';
import Modal from '@/components/2_modals/ModalNoFooter/ModalNoFooter.vue';

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
    component: import('../../components/2_modals/CreateDialog/CreateDialog.vue'),
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
  });
  // console.log('data', data);
  return data;
}
