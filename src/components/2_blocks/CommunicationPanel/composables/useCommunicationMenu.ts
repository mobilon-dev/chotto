import { ref, type Ref } from 'vue';

/**
 * Опции для composable управления меню коммуникаций.
 */
interface UseCommunicationMenuOptions {
  /** Ссылка на корневой контейнер панели */
  panelRef: Ref<HTMLElement | null>;
  /** Ссылка на панель с кнопками каналов */
  channelsPanelRef: Ref<HTMLElement | null>;
  /** Текущий выбранный тип канала */
  selectedChannelType: Ref<string | null>;
  /** Замороженный атрибут (для подсветки при наведении) */
  frozenAttribute: Ref<unknown>;
  /** Флаг наведения на недавний атрибут */
  isRecentAttributeHovered: Ref<boolean>;
}

/**
 * Компонует состояние и методы открытия/закрытия меню каналов, обработки кликов
 * и вычисления ширины меню.
 */
export function useCommunicationMenu({
  panelRef,
  channelsPanelRef,
  selectedChannelType,
  frozenAttribute,
  isRecentAttributeHovered,
}: UseCommunicationMenuOptions) {
  /** Текущий активный тип канала */
  const activeChannelType = ref<string | null>(null);
  /** Тип канала, на кнопке которого сейчас находится курсор */
  const hoveredChannel = ref<string | null>(null);
  /** Флаг отображения меню атрибутов */
  const showMenu = ref(false);
  /** Флаг отображения подменю выбора канала */
  const showSubMenu = ref(false);
  /** Ширина меню атрибутов (синхронизируется с панелью каналов) */
  const menuWidth = ref('0px');

  /**
   * Обновляет ширину меню атрибутов, подстраивая её под ширину панели каналов.
   */
  const updateMenuWidth = () => {
    if (channelsPanelRef.value) {
      menuWidth.value = `${channelsPanelRef.value.offsetWidth}px`;
    }
  };

  /**
   * Закрывает меню и сбрасывает связанные состояния.
   */
  const closeMenu = () => {
    showMenu.value = false;
    activeChannelType.value = null;
    frozenAttribute.value = null;
    isRecentAttributeHovered.value = false;
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
    isRecentAttributeHovered.value = false;
    updateMenuWidth();
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
    menuWidth,
    updateMenuWidth,
    handleChannelClick,
    closeMenu,
    handleClickOutside,
  };
}
