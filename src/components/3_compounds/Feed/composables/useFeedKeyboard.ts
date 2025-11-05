import { Ref, computed } from 'vue';

interface UseFeedKeyboardOptions {
  isKeyboardPlace: Ref<boolean>;
  objects: Ref<any[]>;
  emit: (event: 'keyboardAction' | 'feedAction', payload: any) => void;
}

/**
 * Композабл для управления видимостью и действиями клавиатур
 */
export function useFeedKeyboard({ isKeyboardPlace, objects, emit }: UseFeedKeyboardOptions) {
  /**
   * Определяет, показывать ли клавиатуру сообщения
   */
  const showKeyboard = computed(() => {
    if (isKeyboardPlace.value && objects.value.length > 0 && objects.value[objects.value.length - 1].keyboard) {
      return true;
    }
    return false;
  });

  /**
   * Обработчик действий клавиатуры сообщения
   */
  const keyboardAction = (action: string | (() => void)) => {
    emit('keyboardAction', action);
  };

  /**
   * Обработчик действий feed клавиатуры
   */
  const feedKeyboardAction = (action: string | (() => void)) => {
    emit('feedAction', action);
  };

  return {
    showKeyboard,
    keyboardAction,
    feedKeyboardAction,
  };
}

