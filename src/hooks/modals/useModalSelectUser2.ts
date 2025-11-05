import { useModal } from './useModal';
import Modal from '@/components/2_modals/Modal/Modal.vue';

export const useModalSelectUser2 = async (title: string, users: unknown[], theme: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('../../components/2_modals/SelectUser2/SelectUser2.vue'),
    attrs: {
      title, 
      users,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  });
  console.log('data', data);
  return data;
}
