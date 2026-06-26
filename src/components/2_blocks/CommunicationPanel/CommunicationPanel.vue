<template>
  <div
    ref="panelRef"
    class="communication-panel"
  >
    <!-- Панель с кнопками каналов -->
    <div
      v-if="channelsTypes.length"
      ref="channelsPanelRef"
      class="channels-panel"
    >
      <button
        v-for="channel in channelsTypes"
        :key="channel.type"
        :data-channel-type="channel.type"
        :class="['channel-btn', { 
          active: isChannelActive(channel.type),
          hover: hoveredChannel === channel.type && !isChannelActive(channel.type) || 
            hoveredChannel === channel.type && isChannelActive(channel.type),
          menuOpen: showMenu && activeChannelType === channel.type
        }]"
        @click="onChannelButtonClick(channel.type)"
        @mouseenter="hoveredChannel = channel.type"
        @mouseleave="hoveredChannel = null"
      >
        <template v-if="isChannelActive(channel.type)">
          <Tooltip
            :ref="(el) => { if (el) channelTooltipRef = el }"
            :text="showDefaultChannelTooltip ? 'Выбран канал по умолчанию, можно изменить в настройках профиля' : selectedChannel?.title"
            position="bottom-left"
            :offset="8"
            :delay="tooltipDelay"
            hide-on-click
            :trigger="showDefaultChannelTooltip ? 'auto' : 'hover'"
            :auto-show-duration="showDefaultChannelTooltip ? 5000 : 0"
          >
            <span class="channel-icon">
              <component :is="channel.component" />
            </span>
          </Tooltip>
          <span class="active-indicator" />
        </template>
        <template v-else>
          <Tooltip
            :text="getTooltipText(channel.type)"
            position="bottom-left"
            :offset="8"
            :delay="tooltipDelay"
            hide-on-click
          >
            <span class="channel-icon">
              <component :is="channel.component" />
            </span>
          </Tooltip>
        </template>
      </button>
    </div>

    <!-- Меню контактов -->
    <div
      v-if="showMenu && activeChannelType"
      class="attributes-menu"
    >
      <!-- Placeholder когда нет каналов -->
      <div
        v-if="shouldShowEmptyChannelsPlaceholder"
        class="empty-channels-placeholder"
      >
        {{ emptyChannelsPlaceholderText }}
      </div>

      <!-- Все контакты (показываем только если есть каналы или атрибуты) -->
      <template v-if="!shouldShowEmptyChannelsPlaceholder">
        <template
          v-for="attribute in organizedContactAttributes[activeChannelType]"
          :key="attribute.attributeId"
        >
          <Tooltip
            v-if="hasAttributeTooltip(attribute)"
            :text="getAttributeTooltipText(attribute)"
            position="bottom-left"
            :offset="8"
            :delay="tooltipDelay"
            hide-on-click
          >
            <div
              :class="['attribute-item', getAttributeStatusClass(attribute), {
                'frozen-hover': isAttributeFrozen(attribute),
                'selected': isAttributeSelected(attribute),
                'confirming': isAttributeConfirming(attribute, effectiveConfirmingAttributeId),
                'blocked': isAttributeBlocked(attribute),
              }]"
              :data-attribute-status="attribute.status"
              @mouseenter="onAttributeMouseEnter(attribute, $event)"
              @mouseleave="handleAttributeMouseLeave"
              @click="onAttributeClick(attribute)"
            >
              <div class="attribute-info">
                <CommunicationPanelAttributeIndicator
                  :attribute="attribute"
                  :is-selected="isAttributeSelected(attribute)"
                  :confirming-attribute-id="effectiveConfirmingAttributeId"
                  :blocked-attribute-ids="blockedAttributeIdsRef"
                  :indicator-tooltips="attributeIndicatorTooltipsRef"
                  :tooltip-delay="tooltipDelay"
                />
                <span class="attribute-value">{{ attribute.value }}</span>
              </div>
              <span class="menu-icon">
                <span
                  v-if="hasMultipleChannels(activeChannelType)"
                  class="menu-icon-arrow"
                />
                <span
                  v-else-if="showChannelIcons"
                  class="channel-icon-small"
                  :class="{ 'menu-icon-grey': activeChannelType !== 'sms' }"
                >
                  <component :is="getSingleMenuChannelIconComponent(activeChannelType)" />
                </span>
              </span>
            </div>
          </Tooltip>
          <div
            v-else
            :class="['attribute-item', getAttributeStatusClass(attribute), {
              'frozen-hover': isAttributeFrozen(attribute),
              'selected': isAttributeSelected(attribute),
              'confirming': isAttributeConfirming(attribute, effectiveConfirmingAttributeId),
              'blocked': isAttributeBlocked(attribute),
            }]"
            :data-attribute-status="attribute.status"
            @mouseenter="onAttributeMouseEnter(attribute, $event)"
            @mouseleave="handleAttributeMouseLeave"
            @click="onAttributeClick(attribute)"
          >
            <div class="attribute-info">
              <CommunicationPanelAttributeIndicator
                :attribute="attribute"
                :is-selected="isAttributeSelected(attribute)"
                :confirming-attribute-id="effectiveConfirmingAttributeId"
                :blocked-attribute-ids="blockedAttributeIdsRef"
                :indicator-tooltips="attributeIndicatorTooltipsRef"
                :tooltip-delay="tooltipDelay"
              />
              <span class="attribute-value">{{ attribute.value }}</span>
            </div>
            <span class="menu-icon">
              <span
                v-if="hasMultipleChannels(activeChannelType)"
                class="menu-icon-arrow"
              />
              <span
                v-else-if="showChannelIcons"
                class="channel-icon-small"
                :class="{ 'menu-icon-grey': activeChannelType !== 'sms' }"
              >
                <component :is="getSingleMenuChannelIconComponent(activeChannelType)" />
              </span>
            </span>
          </div>
        </template>
      </template>

      <!-- Второй уровень меню -->
      <div
        v-if="showSubMenu && shouldShowSubMenu"
        class="sub-menu left"
        :style="{ top: subMenuTop + 'px' }"
        @mouseenter="keepSubMenuOpen"
        @mouseleave="closeSubMenu"
      >
        <div class="sub-menu-header">
          Канал связи
        </div>

        <div
          v-for="channel in availableChannels"
          :key="channel.channelId"
          class="sub-menu-item"
          :class="{ 'selected': isChannelSelected(channel) }"
          @click="selectChannel(channel.channelId)"
        >
          <span class="sub-menu-indicator-slot">
            <span
              v-if="getSubMenuChannelIndicatorTypeForChannel(channel)"
              :class="getSubMenuChannelIndicatorClassForChannel(channel)"
            >
              <CommunicationPanelConfirmSpinner
                v-if="getSubMenuChannelIndicatorTypeForChannel(channel) === 'spinner'"
              />
              <CommunicationPanelUnconfirmedIcon
                v-else-if="getSubMenuChannelIndicatorTypeForChannel(channel) === 'unconfirmed'"
              />
              <CommunicationPanelCheckIcon v-else />
            </span>
          </span>
          <span class="sub-menu-title">{{ channel.title || channel.channelId }}</span>
          <span
            v-if="showChannelIcons"
            class="sub-menu-icon"
            :class="{ 'menu-icon-grey': getChannelTypeFromId(channel.channelId) !== 'sms' }"
          >
            <component :is="getMenuChannelIconComponentForChannelId(channel.channelId)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useCommunicationChannels } from './composables/useCommunicationChannels';
import { useCommunicationMenu } from './composables/useCommunicationMenu';
import {
  useCommunicationAttributes,
  getAttributeStatusClass,
  isAttributeConfirming,
  isAttributeBlocked as checkAttributeBlocked,
  getSubMenuChannelIndicatorType,
  getSubMenuChannelIndicatorClass,
} from './composables/useCommunicationAttributes';
import { useCommunicationActions } from './composables/useCommunicationActions';
import { useCommunicationSubMenu } from './composables/useCommunicationSubMenu';
import { useCommunicationDialogSync } from './composables/useCommunicationDialogSync';
import { useCommunicationPlaceholder } from './composables/useCommunicationPlaceholder';
import CommunicationPanelAttributeIndicator from './CommunicationPanelAttributeIndicator.vue';
import { CommunicationPanelCheckIcon, CommunicationPanelConfirmSpinner, CommunicationPanelUnconfirmedIcon } from './icons';

const props = defineProps({
  contactAttributes: {
    type: Array,
    required: true,
    default: () => [],
  },
  channels: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedDialog: {
    type: Object,
    required: false,
    default: null,
  },
  channelTooltips: {
    type: Object,
    required: false,
    default: () => ({})
  },
  attributeTooltips: {
    type: Object,
    required: false,
    default: () => ({})
  },
  /** Подсказки для галочки / спиннера: selected, confirmed, confirming, blocked */
  attributeIndicatorTooltips: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  messages: {
    type: Array,
    required: false,
    default: () => []
  },
  selectedChat: {
    type: Object,
    required: false,
    default: null
  },
  isNewDialog: {
    type: Boolean,
    required: false,
    default: false
  },
  showChannelIcons: {
    type: Boolean,
    required: false,
    default: false
  },
  emptyChannelsPlaceholder: {
    type: Object,
    required: false,
    default: () => ({})
  },
  /** Id атрибута в процессе подтверждения (спиннер вместо галочки). Задаёт родитель на время запроса. */
  confirmingAttributeId: {
    type: String,
    required: false,
    default: null,
  },
  /** Id атрибутов, заблокированных после неудачного подтверждения */
  blockedAttributeIds: {
    type: Array,
    required: false,
    default: () => [],
  },
  /**
   * Порядок кнопок каналов в панели.
   * По умолчанию: max → telegram → whatsapp → sms → phone.
   */
  channelOrder: {
    type: Array,
    required: false,
    default: undefined,
  },
  /**
   * Типы каналов для отображения (обычно с бэка — доступные пользователю).
   * Если не задан — показываются все поддерживаемые типы.
   */
  visibleChannelTypes: {
    type: Array,
    required: false,
    default: undefined,
  },
  /** Задержка показа тултипов (ms) */
  tooltipDelay: {
    type: Number,
    required: false,
    default: 3000,
  },
  /**
   * Последний выбор attribute+channel per тип кнопки (whatsapp/telegram/max/sms/phone).
   * Используется для one-click при переключении между мессенджерами.
   */
  recentAttributeChannels: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const emit = defineEmits([
  'select-attribute-channel',
  'confirm-attribute',
  'phone-call',
  'reset-blocked-attributes',
]);

// Refs
const panelRef = ref(null);
const channelsPanelRef = ref(null);
const hoveredAttribute = ref(null);
const frozenAttribute = ref(null);
const selectedChannelType = ref(null);
const selectedChannel = ref({});
/** До обновления selectedDialog родителем — для галочек в открытом меню после one-click (#15146). */
const panelPendingSelection = ref(null);
const showDefaultChannelTooltip = ref(false);
const defaultChannelTooltipTimer = ref(null);
const channelTooltipRef = ref(null);
const internalConfirmingAttributeId = ref(null);

const effectiveConfirmingAttributeId = computed(
  () => props.confirmingAttributeId ?? internalConfirmingAttributeId.value
);

const blockedAttributeIdsRef = computed(() => props.blockedAttributeIds ?? []);

const isAttributeBlocked = (attribute) =>
  checkAttributeBlocked(attribute, blockedAttributeIdsRef.value);

const channelsRef = computed(() => props.channels ?? []);
const channelOrderRef = computed(() => props.channelOrder);
const visibleChannelTypesRef = computed(() => props.visibleChannelTypes);
const channelTooltipsRef = computed(() => props.channelTooltips ?? {});
const attributeTooltipsRef = computed(() => props.attributeTooltips ?? {});
const attributeIndicatorTooltipsRef = computed(() => props.attributeIndicatorTooltips ?? {});
const recentAttributeChannelsRef = computed(() => props.recentAttributeChannels ?? {});
const messagesRef = computed(() => props.messages ?? []);
const selectedChatRef = computed(() => props.selectedChat ?? null);
const isNewDialogRef = computed(() => props.isNewDialog ?? false);

// вычисляем currentChannelId из selectedDialog
const currentChannelId = computed(() => props.selectedDialog?.channelId ?? null);

const attributeIdMatches = (attribute, selectedId) => {
  if (!selectedId || !attribute) {
    return false;
  }
  const attributeId = attribute.id ?? attribute.attributeId;
  if (!attributeId) {
    return false;
  }
  const suffix = selectedId.includes('.') ? selectedId.split('.').pop() : selectedId;
  return selectedId === attributeId || attributeId === suffix || attributeId.endsWith(`.${suffix}`);
};

const getAttributeTooltipText = (attribute) => {
  const attributeTooltips = attributeTooltipsRef.value;
  const attributeId = attribute?.attributeId ?? attribute?.id;

  if (attributeId !== undefined && attributeId !== null) {
    const tooltipById = attributeTooltips[String(attributeId)];
    if (tooltipById) {
      return tooltipById;
    }
  }

  if (attribute?.value) {
    return attributeTooltips[String(attribute.value)] ?? '';
  }

  return '';
};

const hasAttributeTooltip = (attribute) => {
  return Boolean(getAttributeTooltipText(attribute));
};

const {
  panelChannelTypes,
  channelsTypes,
  getTooltipText,
  getChannelTypeFromId,
  hasMultipleChannels,
  isChannelActive,
  getSingleChannelForType,
  getMenuChannelIconComponentForChannelId,
  getSingleMenuChannelIconComponent,
  getAvailableChannels,
} = useCommunicationChannels({
  channels: channelsRef,
  channelTooltips: channelTooltipsRef,
  channelOrder: channelOrderRef,
  visibleChannelTypes: visibleChannelTypesRef,
  selectedChannelType,
});

const {
  activeChannelType,
  hoveredChannel,
  showMenu,
  showSubMenu,
  handleChannelClick,
  openMenu,
  closeMenu,
  handleClickOutside,
} = useCommunicationMenu({
  panelRef,
  selectedChannelType,
  frozenAttribute,
});

const selectedAttributeId = computed(() => props.selectedDialog?.attributeId ?? null);

const effectivePanelSelection = computed(() => {
  if (!showMenu.value || !activeChannelType.value) {
    return null;
  }
  const pending = panelPendingSelection.value;
  if (pending && pending.channelType === activeChannelType.value) {
    return pending;
  }
  return null;
});

const isChannelSelected = (channel) => {
  const channelId = typeof channel === 'string' ? channel : channel?.channelId;
  const backendChannelId = typeof channel === 'object' && channel != null
    ? channel.backendChannelId
    : undefined;

  const channelIdsMatch = (left, right) => {
    if (!left || !right) return false;
    if (left === right) return true;
    if (backendChannelId && (left === backendChannelId || right === backendChannelId)) {
      return true;
    }
    return false;
  };

  const pending = effectivePanelSelection.value;
  if (pending?.channelId && channelIdsMatch(pending.channelId, channelId)) {
    return true;
  }

  const activeType = activeChannelType.value;
  const subAttr = subMenuAttribute.value;
  if (showMenu.value && activeType && subAttr) {
    const recent = recentAttributeChannelsRef.value?.[activeType];
    if (recent?.channelId && recent?.attributeId) {
      if (
        attributeIdMatches(subAttr, recent.attributeId)
        && channelIdsMatch(recent.channelId, channelId)
      ) {
        return true;
      }
    }
  }

  if (
    showMenu.value
    && activeType
    && subAttr
    && selectedAttributeId.value
    && attributeIdMatches(subAttr, selectedAttributeId.value)
    && channelIdsMatch(currentChannelId.value, channelId)
  ) {
    return true;
  }

  return channelIdsMatch(currentChannelId.value, channelId);
};

const isAttributeSelected = (attribute) => {
  const pending = effectivePanelSelection.value;
  if (pending?.attributeId) {
    return attributeIdMatches(attribute, pending.attributeId);
  }
  return attributeIdMatches(attribute, selectedAttributeId.value);
};

const subMenuAttribute = computed(() => hoveredAttribute.value ?? frozenAttribute.value ?? null);

const getChannelIndicatorAliases = (channel) => {
  const backendId = channel?.backendChannelId;
  return backendId ? [backendId] : [];
};

const getSubMenuChannelIndicatorTypeForChannel = (channel) =>
  getSubMenuChannelIndicatorType(
    subMenuAttribute.value,
    channel.channelId,
    isChannelSelected(channel),
    effectiveConfirmingAttributeId.value,
    getChannelIndicatorAliases(channel),
  );

const getSubMenuChannelIndicatorClassForChannel = (channel) =>
  getSubMenuChannelIndicatorClass(
    subMenuAttribute.value,
    channel.channelId,
    isChannelSelected(channel),
    effectiveConfirmingAttributeId.value,
    getChannelIndicatorAliases(channel),
  ) ?? '';

const contactAttributesRef = computed(() => props.contactAttributes ?? []);

/**
 * Проверяет, пуст ли канал (нет несистемных сообщений).
 */
const isChannelEmpty = (channelId) => {
  if (!channelId || !messagesRef.value) return true;
  
  const chatId = selectedChatRef.value?.chatId;
  if (!chatId) return true;
  
  const channelMessages = messagesRef.value.filter(msg => 
    msg.chatId === chatId && 
    msg.dialogId === props.selectedDialog?.dialogId
  );
  
  const hasNonSystemMessages = channelMessages.some(msg => 
    msg.type !== 'message.system' && 
    msg.type !== 'message.delimiter' && 
    msg.type !== 'system' && 
    msg.type !== 'system_message' && 
    msg.type !== 'notification'
  );
  
  return !hasNonSystemMessages;
};

const showDefaultChannelTooltipWithTimer = () => {
  clearDefaultChannelTooltip();
  showDefaultChannelTooltip.value = true;
  
  nextTick(() => {
    const tooltipRef = Array.isArray(channelTooltipRef.value) ? channelTooltipRef.value[0] : channelTooltipRef.value;
    
    if (tooltipRef && typeof tooltipRef.startAutoShow === 'function') {
      tooltipRef.startAutoShow();
    } else {
      console.log('startAutoShow method not found on tooltipRef');
    }
  });
  
  defaultChannelTooltipTimer.value = setTimeout(() => {
    showDefaultChannelTooltip.value = false;
  }, 5000);
};

const clearDefaultChannelTooltip = () => {
  if (defaultChannelTooltipTimer.value) {
    clearTimeout(defaultChannelTooltipTimer.value);
    defaultChannelTooltipTimer.value = null;
  }
  
  if (channelTooltipRef.value) {
    const tooltipRef = Array.isArray(channelTooltipRef.value) ? channelTooltipRef.value[0] : channelTooltipRef.value;
    if (tooltipRef && typeof tooltipRef.clearAutoTimer === 'function') {
      tooltipRef.clearAutoTimer();
    }
  }
  
  showDefaultChannelTooltip.value = false;
};

const {
  organizedContactAttributes,
  organizeContactAttributes,
  isAttributeFrozen,
} = useCommunicationAttributes({
  contactAttributes: contactAttributesRef,
  panelChannelTypes,
  frozenAttribute,
});

const {
  handleAttributeClick,
  selectChannel,
  availableChannels: resolveAvailableChannels,
  applyRecentChannelButtonSelection,
  clearPanelPendingSelection,
} = useCommunicationActions({
  activeChannelType,
  channels: channelsRef,
  selectedChannel,
  selectedChannelType,
  hoveredAttribute,
  confirmingAttributeId: internalConfirmingAttributeId,
  isAttributeBlocked,
  closeMenu,
  hasMultipleChannels,
  getSingleChannelForType,
  getAvailableChannels,
  isChannelEmpty,
  isNewDialog: isNewDialogRef,
  showDefaultChannelTooltipWithTimer,
  clearDefaultChannelTooltip,
  emit,
  panelPendingSelection,
});

const {
  subMenuTop,
  handleAttributeMouseEnter: baseHandleAttributeMouseEnter,
  handleAttributeMouseLeave,
  keepSubMenuOpen,
  closeSubMenu,
  alignSubMenuWithTarget,
} = useCommunicationSubMenu({
  activeChannelType,
  showSubMenu,
  frozenAttribute,
  hoveredAttribute,
  hasMultipleChannels,
  isAttributeBlocked,
});

const onChannelButtonClick = async (channelType) => {
  const isClosingSameChannel =
    showMenu.value && activeChannelType.value === channelType;

  if (isClosingSameChannel) {
    closeMenu();
    return;
  }

  emit('reset-blocked-attributes');

  const isSwitchingType = selectedChannelType.value !== channelType;

  handleChannelClick(channelType);

  if (isSwitchingType) {
    applyRecentChannelButtonSelection(
      channelType,
      recentAttributeChannelsRef.value,
      organizedContactAttributes.value,
    );
    // После one-click кнопка может перерисоваться (inactive → active) — держим меню открытым.
    await nextTick();
    openMenu(channelType);
  } else {
    panelPendingSelection.value = null;
  }
};

watch(showMenu, (open) => {
  if (!open) {
    clearPanelPendingSelection();
  }
});

const onAttributeClick = (attribute) => {
  if (isAttributeBlocked(attribute)) {
    return;
  }
  handleAttributeClick(attribute);
};

useCommunicationDialogSync({
  selectedChannelType,
  selectedChannel,
  channels: channelsRef,
  selectedDialog: computed(() => props.selectedDialog ?? null),
  isChannelEmpty,
  isNewDialog: isNewDialogRef,
  showDefaultChannelTooltipWithTimer,
  clearDefaultChannelTooltip,
});

const {
  emptyChannelsPlaceholderText,
  shouldShowEmptyChannelsPlaceholder,
} = useCommunicationPlaceholder({
  showMenu,
  activeChannelType,
  emptyChannelsPlaceholder: computed(() => props.emptyChannelsPlaceholder ?? {}),
  getAvailableChannels,
  getChannelTypeFromId,
  channels: channelsRef,
  organizedContactAttributes,
});

// Computed properties
const availableChannels = computed(() =>
  resolveAvailableChannels()
);

const shouldShowSubMenu = computed(() =>
  showSubMenu.value &&
  hoveredAttribute.value &&
  availableChannels.value.length > 0 &&
  activeChannelType.value !== 'phone' &&
  hasMultipleChannels(activeChannelType.value)
);

const onAttributeMouseEnter = async (attribute, event) => {
  const target = baseHandleAttributeMouseEnter(attribute, event.currentTarget);
  await nextTick();
  if (target instanceof HTMLElement) {
    alignSubMenuWithTarget(panelRef, target);
  }
};

watch(() => props.confirmingAttributeId, (id) => {
  if (!id) {
    internalConfirmingAttributeId.value = null;
  }
});

watch(contactAttributesRef, () => {
  const confirmingId = effectiveConfirmingAttributeId.value;
  if (!confirmingId) {
    return;
  }
  const attr = contactAttributesRef.value.find((a) => a.id === confirmingId);
  if (attr?.status === 'confirmed') {
    internalConfirmingAttributeId.value = null;
    closeMenu();
  }
}, { deep: true });

// Watchers
watch(() => props.selectedDialog, () => {
  // Родитель обновил диалог — pending для галочек больше не нужен
  clearPanelPendingSelection();
}, { deep: true });

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  organizeContactAttributes();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  clearDefaultChannelTooltip();
});
</script>

<style scoped lang="scss">
@use './styles/CommunicationPanel.scss';
</style>