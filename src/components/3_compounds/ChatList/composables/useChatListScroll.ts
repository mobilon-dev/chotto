import { ref, unref, watch, nextTick, type Ref, type ComputedRef } from 'vue';

/**
 * Композабл для управления скроллом списка чатов.
 * Инкапсулирует логику прокрутки вверх, отслеживания позиции скролла,
 * определения необходимости загрузки дополнительных чатов и отображения
 * кнопки прокрутки вверх.
 */

/**
 * Тип эмиттера событий для скролла.
 */
type ChatListScrollEmit = {
  /** Событие запроса загрузки дополнительных чатов */
  (event: 'loadMoreChats'): void;
};

/**
 * Параметры и зависимости композабла.
 */
interface UseChatListScrollOptions {
  /** Ссылка на DOM-элемент контейнера списка чатов */
  refChatList: Ref<HTMLElement | undefined>;
  /** Реактивный список чатов (для определения момента обновления) */
  chats: ComputedRef<unknown[]> | Ref<unknown[]>;
  /** Функция эмита событий */
  emit: ChatListScrollEmit;
}

export function useChatListScroll({ refChatList, chats, emit }: UseChatListScrollOptions) {
  /**
   * Флаг разрешения загрузки дополнительных чатов.
   * Устанавливается в true при приближении к низу списка.
   */
  const allowLoadMore = ref(false);
  
  /**
   * Флаг отображения кнопки прокрутки вверх.
   * Устанавливается в true при прокрутке ниже 500px от верха.
   */
  const isShowButton = ref(false);
  
  /**
   * Флаг прокрутки с помощью мыши (скроллбара).
   * Используется для корректной обработки автоматической прокрутки
   * при добавлении новых чатов.
   */
  const isScrollByMouseButton = ref(false);

  /**
   * Принудительно прокручивает список чатов в самый верх.
   * Используется при клике на кнопку прокрутки вверх.
   */
  function scrollToTopForce() {
    nextTick(function () {
      const element = unref(refChatList);
      if (!element) return;
      element.scrollTop = 0;
    });
  }

  /**
   * Проверяет текущую позицию скролла и обновляет соответствующие флаги.
   * Определяет необходимость показа кнопки прокрутки вверх и
   * разрешения загрузки дополнительных чатов при приближении к низу.
   */
  const scrollCheck = () => {
    const element = unref(refChatList);
    if (!element) return;
    const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    
    if (element.scrollTop > 500) {
      isShowButton.value = true;
    }
    if (element.scrollTop <= 500) {
      isShowButton.value = false;
    }

    if (isScrollByMouseButton.value) {
      if (scrollBottom < 300) {
        allowLoadMore.value = true;
      }
    } else {
      if (scrollBottom < 300) {
        allowLoadMore.value = true;
      }
      if (scrollBottom >= 300) {
        allowLoadMore.value = false;
      }
    }
  };

  // Реакция на разрешение загрузки дополнительных чатов.
  // При установке флага в true эмитит событие запроса загрузки.
  watch(
    () => allowLoadMore.value,
    () => {
      if (allowLoadMore.value) {
        emit('loadMoreChats');
      }
    }
  );

  // Реакция на изменение списка чатов.
  // При обновлении списка сбрасывает флаг загрузки и,
  // если прокрутка выполнялась мышью, прокручивает вниз.
  watch(
    chats,
    () => {
      allowLoadMore.value = false;
      if (isScrollByMouseButton.value) {
        const element = unref(refChatList);
        if (!element) return;
        element.scrollTop = element.scrollHeight;
      }
    }
  );

  /**
   * Начинает отслеживание прокрутки мышью.
   * Определяет, был ли клик по скроллбару, и устанавливает
   * соответствующий флаг для корректной обработки автоматической прокрутки.
   */
  const startScrollWatch = (event: MouseEvent) => {
    const element = unref(refChatList);
    if (!element) return;
    const isScrollbar = event.offsetX > element.clientWidth || event.offsetY > element.clientHeight;
    if (isScrollbar) {
      isScrollByMouseButton.value = true;
    }
  };

  /**
   * Останавливает отслеживание прокрутки мышью.
   * Сбрасывает флаг прокрутки с помощью мыши.
   */
  const stopScrollWatch = () => {
    isScrollByMouseButton.value = false;
  };

  return {
    allowLoadMore,
    isShowButton,
    scrollToTopForce,
    scrollCheck,
    startScrollWatch,
    stopScrollWatch,
  };
}

