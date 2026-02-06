<template>
  <div
    ref="panelRef"
    class="communication-panel"
  >
    <!-- Панель с кнопками каналов -->
    <div
      ref="channelsPanelRef"
      class="channels-panel"
    >
      <button
        v-for="channel in channelsTypes"
        :key="channel.type"
        :class="['channel-btn', { 
          active: isChannelActive(channel.type),
          hover: hoveredChannel === channel.type && !isChannelActive(channel.type) || 
            hoveredChannel === channel.type && isChannelActive(channel.type),
          menuOpen: showMenu && activeChannelType === channel.type
        }]"
        @click="handleChannelClick(channel.type)"
        @mouseenter="hoveredChannel = channel.type"
        @mouseleave="hoveredChannel = null"
      >
        <template v-if="isChannelActive(channel.type)">
          <Tooltip
            :ref="(el) => { if (el) channelTooltipRef = el }"
            :text="showDefaultChannelTooltip ? 'Выбран канал по умолчанию, можно изменить в настройках профиля' : selectedChannel?.title"
            position="bottom-left"
            :offset="8"
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
      :style="{ width: menuWidth }"
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
        <div
          v-for="attribute in organizedContactAttributes[activeChannelType]"
          :key="attribute.attributeId"
          :class="['attribute-item', { 
            'frozen-hover': isAttributeFrozen(attribute),
            'selected': isAttributeSelected(attribute)
          }]"
          @mouseenter="onAttributeMouseEnter(attribute, $event)"
          @mouseleave="handleAttributeMouseLeave"
          @click="handleAttributeClick(attribute)"
        >
          <div class="attribute-info">
            <!-- Галочка для выбранного атрибута -->
            <span
              v-if="isAttributeSelected(attribute)"
              class="selected-indicator"
            >
              <CommunicationPanelCheckIcon />
            </span>
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
          :class="{ 'selected': isChannelSelected(channel.channelId) }"
          @click="selectChannel(channel.channelId)"
        >
          <span
            v-if="isChannelSelected(channel.channelId)"
            class="selected-indicator"
          >
            <CommunicationPanelCheckIcon />
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
import { useCommunicationAttributes } from './composables/useCommunicationAttributes';
import { useCommunicationActions } from './composables/useCommunicationActions';
import { useCommunicationSubMenu } from './composables/useCommunicationSubMenu';
import { useCommunicationDialogSync } from './composables/useCommunicationDialogSync';
import { useCommunicationPlaceholder } from './composables/useCommunicationPlaceholder';
import { CommunicationPanelCheckIcon } from './icons';

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
});

const emit = defineEmits(['select-attribute-channel', 'phone-call']);

// Refs
const panelRef = ref(null);
const channelsPanelRef = ref(null);
const hoveredAttribute = ref(null);
const frozenAttribute = ref(null);
const selectedChannelType = ref(null);
const selectedChannel = ref({});
const showDefaultChannelTooltip = ref(false);
const defaultChannelTooltipTimer = ref(null);
const channelTooltipRef = ref(null);

const channelsRef = computed(() => props.channels ?? []);
const channelTooltipsRef = computed(() => props.channelTooltips ?? {});
const messagesRef = computed(() => props.messages ?? []);
const selectedChatRef = computed(() => props.selectedChat ?? null);
const isNewDialogRef = computed(() => props.isNewDialog ?? false);

// вычисляем currentChannelId из selectedDialog
const currentChannelId = computed(() => props.selectedDialog?.channelId ?? null);

// Обновляем функцию проверки выбранного канала
const isChannelSelected = (channelId) => {
  return currentChannelId.value === channelId;
};

// Получаем выбранный атрибут из selectedDialog
const selectedAttributeId = computed(() => props.selectedDialog?.attributeId ?? null);

// Проверяем, выбран ли атрибут
const isAttributeSelected = (attribute) => {
  return selectedAttributeId.value === attribute.id;
};

const {
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
  selectedChannelType,
});

const {
  activeChannelType,
  hoveredChannel,
  showMenu,
  showSubMenu,
  menuWidth,
  updateMenuWidth,
  handleChannelClick,
  closeMenu,
  handleClickOutside,
} = useCommunicationMenu({
  panelRef,
  channelsPanelRef,
  selectedChannelType,
  frozenAttribute,
});

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
  frozenAttribute,
});

const {
  handleAttributeClick,
  selectChannel,
  availableChannels: resolveAvailableChannels,
} = useCommunicationActions({
  activeChannelType,
  channels: channelsRef,
  selectedChannel,
  selectedChannelType,
  hoveredAttribute,
  closeMenu,
  hasMultipleChannels,
  getSingleChannelForType,
  getAvailableChannels,
  isChannelEmpty,
  isNewDialog: isNewDialogRef,
  showDefaultChannelTooltipWithTimer,
  clearDefaultChannelTooltip,
  emit,
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
});

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
  // Ждем обновления DOM
  await nextTick();
  if (target instanceof HTMLElement) {
    alignSubMenuWithTarget(panelRef, target);
  }
};

// Watchers
watch(() => props.selectedDialog, () => {
  // Логика при изменении selectedDialog
  // currentChannelId автоматически обновится через computed
}, { deep: true });

// Lifecycle
onMounted(() => {
  updateMenuWidth();
  window.addEventListener('resize', updateMenuWidth);
  document.addEventListener('click', handleClickOutside);
  organizeContactAttributes();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMenuWidth);
  document.removeEventListener('click', handleClickOutside);
  clearDefaultChannelTooltip();
});
</script>

<style scoped lang="scss">
@use './styles/CommunicationPanel.scss';
</style>