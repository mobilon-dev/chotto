import { watch, Ref } from 'vue';

interface UseFeedScrollToOptions {
  /** ID целевого элемента для прокрутки */
  targetIdRef: Ref<string | null>;
  /** ID контейнера ленты */
  feedContainerId: string;
  /** CSS-класс для фокуса на сообщении */
  focusClass?: string;
}

/**
 * Композабл для прокрутки к определённому сообщению с подсветкой
 */
export function useFeedScrollTo({ targetIdRef, feedContainerId, focusClass = 'focused-message' }: UseFeedScrollToOptions) {
  watch(
    () => targetIdRef.value,
    (targetId) => {
      if (!targetId) return;

      const target = document.getElementById(targetId);
      const list = document.getElementById(feedContainerId);

      if (target instanceof HTMLElement && list instanceof HTMLElement) {
        // Прокручиваем к центру элемента
        list.scrollTop = target.offsetTop + target.clientHeight / 2 - list.clientHeight / 2;

        // Добавляем класс фокуса
        target.children[0]?.classList.add(focusClass);

        // Убираем класс через 2 секунды
        setTimeout(() => {
          target.children[0]?.classList.remove(focusClass);
        }, 2000);
      }
    }
  );
}

