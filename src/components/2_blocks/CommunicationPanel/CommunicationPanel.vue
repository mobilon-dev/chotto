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
          @mouseenter="handleRecentAttributeMouseEnter($event)"
          @mouseleave="handleRecentAttributeMouseLeave"
          @mouseover="resetRegularAttributeHover"
          @click="handleRecentAttributeClick()"
        >
          <div class="attribute-info">
            <span class="attribute-value">{{ recentAttribute?.value }}</span>
          </div>
          <span
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
        @mouseenter="handleRecentAttributeMouseEnter($event)"
        @mouseleave="handleRecentAttributeMouseLeave"
        @mouseover="resetRegularAttributeHover"
        @click="handleRecentAttributeClick()"
      >
        <div class="attribute-info">
          <span class="attribute-value">{{ recentAttribute?.value }}</span>
        </div>
        <span
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
        @mouseenter="handleAttributeMouseEnter(attribute, $event)"
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
            v-else
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
import { Tooltip } from '@/components';

import { 
  CommunicationPanelPhoneIcon,
  CommunicationPanelWhatsAppIcon,
  CommunicationPanelTelegramIcon,
  CommunicationPanelMaxIcon,
  CommunicationPanelSMSIcon,
  CommunicationPanelSubmenuPhoneIcon,
  CommunicationPanelSubmenuWhatsAppIcon,
  CommunicationPanelSubmenuTelegramIcon,
  CommunicationPanelSubmenuMaxIcon,
  CommunicationPanelSubmenuSMSIcon
} from './icons/index.ts'

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
});

const emit = defineEmits(['select-attribute-channel', 'phone-call']);

// Refs
const panelRef = ref(null);
const channelsPanelRef = ref(null);
const activeChannelType = ref(null);
const hoveredChannel = ref(null);
const showMenu = ref(false);
const showSubMenu = ref(false);
const hoveredAttribute = ref(null);
const menuWidth = ref('0px');
const frozenAttribute = ref(null);
const isRecentAttributeHovered = ref(false);
const selectedChannelType = ref(null);
const selectedChannel = ref({});
const subMenuTop = ref(0);

// Constants
const CHANNEL_TYPES = ['phone', 'whatsapp', 'telegram', 'max', 'sms'];

const channelIconsMap = {
  phone: CommunicationPanelPhoneIcon,
  whatsapp: CommunicationPanelWhatsAppIcon,
  telegram: CommunicationPanelTelegramIcon,
  max: CommunicationPanelMaxIcon,
  sms: CommunicationPanelSMSIcon,
};

const menuChannelIconsMap = {
  phone: CommunicationPanelSubmenuPhoneIcon,
  whatsapp: CommunicationPanelSubmenuWhatsAppIcon,
  telegram: CommunicationPanelSubmenuTelegramIcon,
  max: CommunicationPanelSubmenuMaxIcon,
  sms: CommunicationPanelSubmenuSMSIcon,
};

const channelsTypes = computed(() => 
  CHANNEL_TYPES.map(type => ({
    type,
    component: channelIconsMap[type]
  }))
);

// Computed properties
const organizedContactAttributes = ref(
  Object.fromEntries(CHANNEL_TYPES.map(type => [type, []]))
);

const recentAttribute = computed(() => 
  activeChannelType.value ? getRecentAttributeByType(activeChannelType.value) : null
);

const showRecentAttribute = computed(() =>
  activeChannelType.value !== 'phone' &&
  recentAttribute.value &&
  props.recentAttributeChannels[activeChannelType.value]?.channelId
);

const availableChannels = computed(() =>
  activeChannelType.value ? getAvailableChannels(activeChannelType.value) : []
);

const shouldShowSubMenu = computed(() =>
  showSubMenu.value &&
  hoveredAttribute.value &&
  availableChannels.value.length > 0 &&
  activeChannelType.value !== 'phone' &&
  hasMultipleChannels(activeChannelType.value)
);

// Methods
const defaultTooltips = {
  phone: 'Позвонить',
  whatsapp: 'Выберите контакт и канал для отправки сообщения',
  telegram: 'Выберите контакт и канал для отправки сообщения',
  max: 'Выберите контакт и канал для отправки сообщения',
  sms: 'Выберите контакт и канал для отправки сообщения',
};

const getTooltipText = (channelType) => {
  return props.channelTooltips?.[channelType] ?? defaultTooltips[channelType] ?? '';
};

const getChannelTypeFromId = (channelId) => {
  if (!channelId) return null;
  
  const [type] = channelId.split('.');
  
  if (type.includes('waba')) return 'whatsapp';
  if (type.includes('telegrambot')) return 'telegram';
  
  return type;
};

const hasMultipleChannels = (channelType) => {
  return props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  ).length > 1;
};

const isChannelActive = (channelType) => {
  return selectedChannelType.value === channelType;
};

const getSingleChannelForType = (channelType) => {
  const channelsForType = props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  );
  return channelsForType.length === 1 ? channelsForType[0] : null;
};

const getMenuChannelIconComponent = (channelType) => {
  return menuChannelIconsMap[channelType] || null;
};

const getMenuChannelIconComponentForChannelId = (channelId) => {
  const channelType = getChannelTypeFromId(channelId);
  return getMenuChannelIconComponent(channelType);
};

const getSingleMenuChannelIconComponent = (channelType) => {
  const singleChannel = getSingleChannelForType(channelType);
  return singleChannel ? getMenuChannelIconComponentForChannelId(singleChannel.channelId) : getMenuChannelIconComponent(channelType);
};

const organizeContactAttributes = () => {
  const organized = Object.fromEntries(CHANNEL_TYPES.map(type => [type, []]));
  
  props.contactAttributes.forEach(attr => {
    if (attr.type === 'telegram') {
      organized.telegram.push(attr);
    } else if (attr.type === 'phone') {
      ['whatsapp', 'max', 'sms', 'phone'].forEach(type => {
        organized[type].push(attr);
      });
    }
  });
  
  organizedContactAttributes.value = organized;
};

const getAvailableChannels = (channelType) => {
  return props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  );
};

const getRecentAttributeByType = (channelType) => {
  const recentAttributeId = props.recentAttributeChannels[channelType]?.attributeId;
  return props.contactAttributes.find(attr => attr.id === recentAttributeId);
};

const isAttributeFrozen = (attribute) => {
  return frozenAttribute.value?.id === attribute.id;
};

// Обработчик клика по каналу
const handleChannelClick = (channelType) => {
  // Если канал уже выбран, просто открываем/закрываем меню
  if (selectedChannelType.value === channelType) {
    if (activeChannelType.value === channelType) {
      closeMenu();
    } else {
      activeChannelType.value = channelType;
      showMenu.value = true;
      showSubMenu.value = false;
      frozenAttribute.value = null;
      isRecentAttributeHovered.value = false;
      updateMenuWidth();
    }
  } else {
    // Если кликаем на другой канал, просто открываем меню без установки активного состояния
    activeChannelType.value = channelType;
    showMenu.value = true;
    showSubMenu.value = false;
    frozenAttribute.value = null;
    isRecentAttributeHovered.value = false;
    updateMenuWidth();
  }
};

const closeMenu = () => {
  showMenu.value = false;
  activeChannelType.value = null;
  frozenAttribute.value = null;
  isRecentAttributeHovered.value = false;
  showSubMenu.value = false;
};

const handleRecentAttributeClick = () => {
  if (activeChannelType.value === 'phone') {
    handlePhoneCall(recentAttribute.value);
  } else if (!hasMultipleChannels(activeChannelType.value)) {
    const singleChannel = getSingleChannelForType(activeChannelType.value);
    if (recentAttribute.value && singleChannel) {
      selectSingleChannel(recentAttribute.value, singleChannel.channelId);
    }
  } else {
    const recentChannelId = props.recentAttributeChannels[activeChannelType.value]?.channelId;
    if (recentAttribute.value && recentChannelId) {
      selectChannelForRecentAttribute(recentChannelId);
    }
  }
};

const handleAttributeClick = (attribute) => {
  if (activeChannelType.value === 'phone') {
    handlePhoneCall(attribute);
  } else if (!hasMultipleChannels(activeChannelType.value)) {
    const singleChannel = getSingleChannelForType(activeChannelType.value);
    if (singleChannel) {
      selectSingleChannel(attribute, singleChannel.channelId);
    }
  }
};

const handlePhoneCall = (attribute) => {
  if (!attribute) return;
  emit('phone-call', {
    attributeId: attribute.id,
    phoneNumber: attribute.data
  });
  closeMenu();
};

const selectSingleChannel = (attribute, channelId) => {
  emit('select-attribute-channel', {
    attributeId: attribute.id,
    channelId: channelId,
  });
  selectedChannelType.value = activeChannelType.value;
  selectedChannel.value = props.channels.find(ch => ch.channelId === channelId);
  console.log('TEST selectedChannel.value', selectedChannel.value)
  closeMenu();
};

const selectChannelForRecentAttribute = (channelId) => {
  if (recentAttribute.value) {
    emit('select-attribute-channel', {
      attributeId: recentAttribute.value.id,
      channelId: channelId,
    });
  }
  selectedChannelType.value = activeChannelType.value;
  selectedChannel.value = props.channels.find(ch => ch.channelId === channelId);
  console.log('TEST selectedChannel.value', selectedChannel.value)
  closeMenu();
};

const handleRecentAttributeMouseEnter = (event) => {
  if (hasMultipleChannels(activeChannelType.value)) {
    resetRegularAttributeHover();
    isRecentAttributeHovered.value = true;
    showSubMenu.value = true;
    alignSubMenuWithTarget(event.currentTarget);
  }
};

const handleRecentAttributeMouseLeave = () => {
  if (!showSubMenu.value) {
    isRecentAttributeHovered.value = false;
  }
};

const handleAttributeMouseEnter = (attribute, event) => {
  if (hasMultipleChannels(activeChannelType.value)) {
    isRecentAttributeHovered.value = false;
    hoveredAttribute.value = attribute;
    showSubMenu.value = true;
    frozenAttribute.value = attribute;
    alignSubMenuWithTarget(event.currentTarget);
  }
};

const handleAttributeMouseLeave = () => {
  if (!showSubMenu.value) {
    frozenAttribute.value = null;
  }
};

const resetRegularAttributeHover = () => {
  showSubMenu.value = false;
  frozenAttribute.value = null;
  hoveredAttribute.value = null;
};

const keepSubMenuOpen = () => {
  showSubMenu.value = true;
};

const closeSubMenu = () => {
  showSubMenu.value = false;
  frozenAttribute.value = null;
  isRecentAttributeHovered.value = false;
};

const selectChannel = (channelId) => {
  if (isRecentAttributeHovered.value) {
    selectChannelForRecentAttribute(channelId);
  } else if (hoveredAttribute.value) {
    emit('select-attribute-channel', {
      attributeId: hoveredAttribute.value.id,
      channelId: channelId,
    });
    selectedChannelType.value = activeChannelType.value;
    selectedChannel.value = props.channels.find(ch => ch.channelId === channelId);
    console.log('TEST selectedChannel.value', selectedChannel.value)
  }
  closeMenu();
};

const updateMenuWidth = () => {
  if (channelsPanelRef.value) {
    menuWidth.value = `${channelsPanelRef.value.offsetWidth}px`;
  }
};

const alignSubMenuWithTarget = (targetEl) => {
  try {
    requestAnimationFrame(() => {
      const menuEl = panelRef.value?.querySelector('.attributes-menu');
      const headerEl = panelRef.value?.querySelector('.sub-menu-header');
      const subMenuEl = panelRef.value?.querySelector('.sub-menu');
      if (!menuEl || !targetEl) {
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
        headerBlock = headerRect.height + (isNaN(mb) ? 0 : mb);
      }
      let subMenuPadTop = 0;
      if (subMenuEl) {
        const smcs = getComputedStyle(subMenuEl);
        subMenuPadTop = parseFloat(smcs.paddingTop || '0') || 0;
      }
      subMenuTop.value = itemRect.top - menuRect.top - headerBlock - subMenuPadTop - 2;
    });
  } catch {
    subMenuTop.value = 0;
  }
};

const handleClickOutside = (event) => {
  if (panelRef.value && !panelRef.value.contains(event.target)) {
    closeMenu();
  }
};

// Watchers
watch(() => props.contactAttributes, organizeContactAttributes, { deep: true });
watch(() => props.selectedDialog, (newDialog) => {
  updateSelectedChannelFromDialog(newDialog);
}, { deep: true });
const updateSelectedChannelFromDialog = (dialog) => {
  if (!dialog) {
    selectedChannelType.value = null;
    selectedChannel.value = {};
    return;
  }
  
  const channelType = getChannelTypeFromId(dialog.channelId);
  if (channelType && CHANNEL_TYPES.includes(channelType)) {
    selectedChannelType.value = channelType;
    selectedChannel.value = props.channels.find(ch => ch.channelId === dialog.channelId);
  }
};

// Lifecycle
onMounted(() => {
  updateMenuWidth();
  window.addEventListener('resize', updateMenuWidth);
  document.addEventListener('click', handleClickOutside);
  organizeContactAttributes();
  updateSelectedChannelFromDialog(props.selectedDialog);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMenuWidth);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use './styles/CommunicationPanel.scss';
</style>
