import { Ref, ref, unref } from 'vue';

interface UseFeedButtonOptions {
  feedRef: Ref<HTMLElement | null>;
  keyboardRef: Ref<{ refKeyboard: { clientHeight: number } } | null>;
  onButtonShow?: () => void;
  onKeyboardPlace?: () => void;
}

/**
 * Композабл для управления кнопкой "прокрутить вниз" и позиционированием клавиатуры
 */
export function useFeedButton({ feedRef, keyboardRef, onButtonShow, onKeyboardPlace }: UseFeedButtonOptions) {
  const isShowButton = ref(false);
  const isKeyboardPlace = ref(false);

  /**
   * Проверяет позицию скролла и обновляет видимость кнопки "вниз" и место клавиатуры
   */
  const checkButtonVisibility = () => {
    const element = unref(feedRef);
    if (!element) return;

    let keyboardHeight = 0;
    if (keyboardRef.value) {
      keyboardHeight = keyboardRef.value.refKeyboard.clientHeight;
    }

    const limit = 100;
    const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

    if (scrollBottom < limit + keyboardHeight) {
      isShowButton.value = false;
      isKeyboardPlace.value = true;
      onKeyboardPlace?.();
    } else {
      isShowButton.value = true;
      isKeyboardPlace.value = false;
      onButtonShow?.();
    }
  };

  return {
    isShowButton,
    isKeyboardPlace,
    checkButtonVisibility,
  };
}

