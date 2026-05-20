import { ref, type Ref } from 'vue';

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

  /**
   * Закрывает меню и сбрасывает связанные состояния.
   */
  const closeMenu = () => {
    showMenu.value = false;
    activeChannelType.value = null;
    frozenAttribute.value = null;
    showSubMenu.value = false;
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

    activeChannelType.value = channelType;
    showMenu.value = true;
    showSubMenu.value = false;
    frozenAttribute.value = null;
  };

  /**
   * Закрывает меню при клике вне панели.
   */
  const handleClickOutside = (event: Event) => {
    const element = panelRef.value;
    if (element && !element.contains(event.target as Node)) {
      closeMenu();
    }
  };

  return {
    activeChannelType,
    hoveredChannel,
    showMenu,
    showSubMenu,
    handleChannelClick,
    closeMenu,
    handleClickOutside,
  };
}