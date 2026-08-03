import { ref, nextTick, type Ref } from 'vue';

/**
 * Опции для composable управления меню коммуникаций.
 */
interface UseCommunicationMenuOptions {
  /** Ссылка на корневой контейнер панели */
  panelRef: Ref<HTMLElement | null>;
  /** Текущий выбранный тип канала */
  selectedChannelType: Ref<string | null>;
  /** Замороженный атрибут (для подсветки при наведении) */
  frozenAttribute: Ref<unknown>;
}

/**
 * Компонует состояние и методы открытия/закрытия меню каналов и обработки кликов.
 */
export function useCommunicationMenu({
  panelRef,
  selectedChannelType,
  frozenAttribute,
}: UseCommunicationMenuOptions) {
  /** Текущий активный тип канала */
  const activeChannelType = ref<string | null>(null);
  /** Тип канала, на кнопке которого сейчас находится курсор */
  const hoveredChannel = ref<string | null>(null);
  /** Флаг отображения меню атрибутов */
  const showMenu = ref(false);
  /** Флаг отображения подменю выбора канала */
  const showSubMenu = ref(false);
  /** Игнорировать click-outside на том же жесте, что открыл меню (кнопка может пересоздаться в DOM). */
  const suppressOutsideClick = ref(false);
  /**
   * Держать showMenu/showSubMenu открытыми до явного closeMenu (клик снаружи / успешный выбор).
   * Включается на confirm-attribute — чтобы mouseleave и fail не закрывали менюшки.
   */
  const retainOpenUntilDismiss = ref(false);

  /**
   * Закрывает меню и сбрасывает связанные состояния.
   */
  const closeMenu = () => {
    retainOpenUntilDismiss.value = false;
    showMenu.value = false;
    activeChannelType.value = null;
    frozenAttribute.value = null;
    showSubMenu.value = false;
  };

  const pinMenuOpen = () => {
    retainOpenUntilDismiss.value = true;
  };

  const armOutsideClickSuppression = () => {
    suppressOutsideClick.value = true;
    nextTick(() => {
      nextTick(() => {
        suppressOutsideClick.value = false;
      });
    });
  };

  const openMenu = (channelType: string) => {
    retainOpenUntilDismiss.value = false;
    activeChannelType.value = channelType;
    showMenu.value = true;
    showSubMenu.value = false;
    frozenAttribute.value = null;
    armOutsideClickSuppression();
  };

  /**
   * Обрабатывает клик по кнопке канала.
   */
  const handleChannelClick = (channelType: string) => {
    if (selectedChannelType.value === channelType) {
      if (activeChannelType.value === channelType) {
        closeMenu();
        return;
      }
    }

    openMenu(channelType);
  };

  /**
   * Закрывает меню при клике вне панели.
   * Пока retainOpenUntilDismiss — не закрываем: менюшки ждут явного dismiss (ОК на splash),
   * иначе клик по сплэшу/ленте сразу схлопывает оба меню.
   */
  const handleClickOutside = (event: Event) => {
    if (suppressOutsideClick.value) {
      return;
    }
    if (retainOpenUntilDismiss.value) {
      return;
    }
    const element = panelRef.value;
    if (!element) {
      return;
    }
    const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
    if (Array.isArray(path) && path.includes(element)) {
      return;
    }
    if (element.contains(event.target as Node)) {
      return;
    }
    closeMenu();
  };

  return {
    activeChannelType,
    hoveredChannel,
    showMenu,
    showSubMenu,
    retainOpenUntilDismiss,
    handleChannelClick,
    openMenu,
    closeMenu,
    pinMenuOpen,
    armOutsideClickSuppression,
    handleClickOutside,
  };
}