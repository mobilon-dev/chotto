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
            hoveredChannel === channel.type && isChannelActive(channel.type)
        }]"
        @click="handleChannelClick(channel.type)"
        @mouseenter="hoveredChannel = channel.type"
        @mouseleave="hoveredChannel = null"
      >
        <template v-if="isChannelActive(channel.type)">
          <Tooltip
            :text="selectedChannel?.title"
            position="bottom"
            :offset="8"
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
            position="bottom"
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
      <!-- Заголовок для списка контактов -->
      <div class="menu-header">
        {{ activeChannelType === 'phone' ? 'Телефон' : 'Недавний' }}
      </div>

      <!-- Недавний контакт -->
      <Tooltip
        v-if="showRecentAttribute && props.recentAttributeChannels[activeChannelType]?.tooltip"
        :text="props.recentAttributeChannels[activeChannelType]?.tooltip"
        position="bottom"
        :offset="8"
      >
        <div
          :class="['recent-attribute', { 
            'frozen-hover': isRecentAttributeHovered 
          }]"
          @mouseenter="onRecentAttributeMouseEnter($event)"
          @mouseleave="handleRecentAttributeMouseLeave"
          @mouseover="resetRegularAttributeHover"
          @click="handleRecentAttributeClick(recentAttribute)"
        >
          <div class="attribute-info">
            <span class="attribute-value">{{ recentAttribute?.value }}</span>
          </div>
          <span
            v-if="showChannelIcons"
            class="channel-icon-small"
            :class="{ 'menu-icon-grey': activeChannelType !== 'sms' }"
          >
            <component :is="getMenuChannelIconComponent(activeChannelType)" />
          </span>
        </div>
      </Tooltip>
      <div
        v-else-if="showRecentAttribute"
        :class="['recent-attribute', { 
          'frozen-hover': isRecentAttributeHovered 
        }]"
        @mouseenter="onRecentAttributeMouseEnter($event)"
        @mouseleave="handleRecentAttributeMouseLeave"
        @mouseover="resetRegularAttributeHover"
        @click="handleRecentAttributeClick(recentAttribute)"
      >
        <div class="attribute-info">
          <span class="attribute-value">{{ recentAttribute?.value }}</span>
        </div>
        <span
          v-if="showChannelIcons"
          class="channel-icon-small"
          :class="{ 'menu-icon-grey': activeChannelType !== 'sms' }"
        >
          <component :is="getMenuChannelIconComponent(activeChannelType)" />
        </span>
      </div>

      <div 
        v-if="showRecentAttribute && organizedContactAttributes[activeChannelType]?.length && activeChannelType !== 'phone'" 
        class="menu-divider"
      />

      <!-- Все контакты -->
      <div
        v-for="attribute in organizedContactAttributes[activeChannelType]"
        :key="attribute.attributeId"
        :class="['attribute-item', { 
          'frozen-hover': isAttributeFrozen(attribute) 
        }]"
        @mouseenter="onAttributeMouseEnter(attribute, $event)"
        @mouseleave="handleAttributeMouseLeave"
        @click="handleAttributeClick(attribute)"
      >
        <div class="attribute-info">
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
          @click="selectChannel(channel.channelId)"
        >
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
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useCommunicationChannels } from './composables/useCommunicationChannels';
import { useCommunicationMenu } from './composables/useCommunicationMenu';
import { useCommunicationAttributes } from './composables/useCommunicationAttributes';
import { useCommunicationActions } from './composables/useCommunicationActions';
import { useCommunicationSubMenu } from './composables/useCommunicationSubMenu';
import { useCommunicationDialogSync } from './composables/useCommunicationDialogSync';


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
  recentAttributeChannels: {
    type: Object,
    required: true,
    default: () => ({}),
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
  showChannelIcons: {
    type: Boolean,
    required: false,
    default: false
  },
});

const emit = defineEmits(['select-attribute-channel', 'phone-call']);

// Refs
const panelRef = ref(null);
const channelsPanelRef = ref(null);
/** @type {import('vue').Ref<import('./composables/useCommunicationAttributes').ContactAttribute | null>} */
const hoveredAttribute = ref(null);
/** @type {import('vue').Ref<import('./composables/useCommunicationAttributes').ContactAttribute | null>} */
const frozenAttribute = ref(null);
const isRecentAttributeHovered = ref(false);
const selectedChannelType = ref(null);
const selectedChannel = ref({});

const channelsRef = computed(() => props.channels ?? []);
const channelTooltipsRef = computed(() => props.channelTooltips ?? {});

const {
  channelsTypes,
  getTooltipText,
  getChannelTypeFromId,
  hasMultipleChannels,
  isChannelActive,
  getSingleChannelForType,
  getMenuChannelIconComponent,
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
  isRecentAttributeHovered,
});

const contactAttributesRef = computed(() => props.contactAttributes ?? []);
const recentAttributeChannelsRef = computed(() => props.recentAttributeChannels ?? {});

const {
  organizedContactAttributes,
  organizeContactAttributes,
  recentAttribute,
  showRecentAttribute,
  isAttributeFrozen,
} = useCommunicationAttributes({
  contactAttributes: contactAttributesRef,
  recentAttributeChannels: recentAttributeChannelsRef,
  activeChannelType,
  frozenAttribute,
});

const {
  handleRecentAttributeClick,
  handleAttributeClick,
  selectChannel,
  availableChannels: resolveAvailableChannels,
} = useCommunicationActions({
  activeChannelType,
  channels: channelsRef,
  recentAttributeChannels: recentAttributeChannelsRef,
  selectedChannel,
  selectedChannelType,
  isRecentAttributeHovered,
  hoveredAttribute,
  closeMenu,
  hasMultipleChannels,
  getSingleChannelForType,
  getAvailableChannels,
  emit,
});

const {
  subMenuTop,
  resetRegularAttributeHover,
  handleRecentAttributeMouseEnter: baseHandleRecentAttributeMouseEnter,
  handleRecentAttributeMouseLeave,
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
  isRecentAttributeHovered,
  hasMultipleChannels,
});

useCommunicationDialogSync({
  selectedChannelType,
  selectedChannel,
  channels: channelsRef,
  selectedDialog: computed(() => props.selectedDialog ?? null),
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

// Methods
// Обработчики действий и подменю реализованы в соответствующих composables
const onRecentAttributeMouseEnter = (event) => {
  const target = baseHandleRecentAttributeMouseEnter(event.currentTarget);
  if (target instanceof HTMLElement) {
    alignSubMenuWithTarget(panelRef, target);
  }
};

const onAttributeMouseEnter = (attribute, event) => {
  const target = baseHandleAttributeMouseEnter(attribute, event.currentTarget);
  if (target instanceof HTMLElement) {
    alignSubMenuWithTarget(panelRef, target);
  }
};

// Watchers
watch(() => props.selectedDialog, () => {
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
});
</script>

<style scoped lang="scss">
@use './styles/CommunicationPanel.scss';
</style>
