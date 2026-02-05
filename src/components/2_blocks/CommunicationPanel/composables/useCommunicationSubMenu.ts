import { ref, type Ref } from 'vue';
import type { ContactAttribute } from './useCommunicationAttributes';

interface UseCommunicationSubMenuOptions {
  activeChannelType: Ref<string | null>;
  showSubMenu: Ref<boolean>;
  frozenAttribute: Ref<ContactAttribute | null>;
  hoveredAttribute: Ref<ContactAttribute | null>;
  hasMultipleChannels: (channelType: string) => boolean;
}

/**
 * Управляет состоянием подменю выбора канала и hover-состояниями атрибутов.
 */
export function useCommunicationSubMenu({
  activeChannelType,
  showSubMenu,
  frozenAttribute,
  hoveredAttribute,
  hasMultipleChannels,
}: UseCommunicationSubMenuOptions) {
  const subMenuTop = ref(0);

  /**
   * Обрабатывает наведение на атрибут в списке.
   */
  const handleAttributeMouseEnter = (attribute: ContactAttribute, eventTarget: EventTarget | null) => {
    const channelType = activeChannelType.value;
    if (!channelType || !hasMultipleChannels(channelType)) {
      return null;
    }

    hoveredAttribute.value = attribute;
    showSubMenu.value = true;
    frozenAttribute.value = attribute;
    return eventTarget;
  };

  /**
   * Обрабатывает уход курсора с атрибута.
   */
  const handleAttributeMouseLeave = () => {
    if (!showSubMenu.value) {
      frozenAttribute.value = null;
    }
  };

  /**
   * Удерживает подменю открытым при наведении.
   */
  const keepSubMenuOpen = () => {
    showSubMenu.value = true;
  };

  /**
   * Закрывает подменю.
   */
  const closeSubMenu = () => {
    showSubMenu.value = false;
    frozenAttribute.value = null;
  };

  /**
   * Вычисляет позицию подменю относительно элемента.
   */
  const alignSubMenuWithTarget = (panelRef: Ref<HTMLElement | null>, targetEl: HTMLElement | null) => {
    if (!targetEl) {
      subMenuTop.value = 0;
      return;
    }

    try {
      const menuEl = panelRef.value?.querySelector('.attributes-menu') as HTMLElement | null;
      const headerEl = panelRef.value?.querySelector('.sub-menu-header') as HTMLElement | null;
      const subMenuEl = panelRef.value?.querySelector('.sub-menu') as HTMLElement | null;

      if (!menuEl) {
        subMenuTop.value = 0;
        return;
      }

      const menuRect = menuEl.getBoundingClientRect();
      const itemRect = targetEl.getBoundingClientRect();

      let headerBlock = 0;
      if (headerEl) {
        const headerRect = headerEl.getBoundingClientRect();
        const cs = getComputedStyle(headerEl);
        const mb = parseFloat(cs.marginBottom || '0');
        headerBlock = headerRect.height + (Number.isNaN(mb) ? 0 : mb);
      }

      let subMenuPadTop = 0;
      if (subMenuEl) {
        const smcs = getComputedStyle(subMenuEl);
        subMenuPadTop = parseFloat(smcs.paddingTop || '0') || 0;
      }

      subMenuTop.value = itemRect.top - menuRect.top - headerBlock - subMenuPadTop - 2;
    } catch {
      subMenuTop.value = 0;
    }
  };

  return {
    subMenuTop,
    handleAttributeMouseEnter,
    handleAttributeMouseLeave,
    keepSubMenuOpen,
    closeSubMenu,
    alignSubMenuWithTarget,
  };
}