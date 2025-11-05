<template>
  <div 
    ref="containerRef"
    class="sidebar__container"
    :class="{'sidebar-horizontal__container' : horizontal}"
  >
    <span
      v-if="!horizontal && barVisible"
      class="sidebar__selected-bar"
      :class="{ 'is-animating': isAnimating }"
      :style="{ top: barTop + 'px', height: barHeight + 'px' }"
    />
    <div class="sidebar__scroll-container">
      <ul 
        class="sidebar__list-fixed"
        :class="{'sidebar-horizontal__list-fixed' : horizontal}"
      >
        <li
          v-for="(item, index) in fixedItems"
          :key="index"
          class="sidebar__item-fixed"
          :class="{'sidebar-horizontal__item' : horizontal}"
          @click="onItemClick($event, item.itemId)"
        >
          <Tooltip 
            v-if="item.name" 
            :text="getName(item.name)" 
            position="right" 
            :offset="8"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              class="sidebar__image"
              :class="{ 
                'sidebar__image--active': item.selected === true,
                'sidebar-horizontal__image' : horizontal 
              }"
            >
            <p>Мои</p>
            <span
              v-if="item.notificationCount"
            >{{ item.notificationCount > 99 ? '99+' : item.notificationCount }}</span>
          </Tooltip>
        </li>
      </ul>

      <ul 
        class="sidebar__list"
        :class="{'sidebar-horizontal__list' : horizontal}"
      >
        <li
          v-for="(item, index) in regularItems"
          :key="index"
          class="sidebar__item"
          :class="{'sidebar-horizontal__item' : horizontal}"
          @click="onItemClick($event, item.itemId)"
        >
          <Tooltip 
            v-if="item.name" 
            :text="item.name" 
            position="right" 
            :offset="8"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              class="sidebar__image"
              :class="{ 
                'sidebar__image--active': item.selected === true,
                'sidebar-horizontal__image' : horizontal 
              }"
            >
          </Tooltip>
  
          <img
            v-else
            :src="item.icon"
            :alt="'icon'"
            class="sidebar__image"
            :class="{ 
              'sidebar__image--active': item.selected === true,
              'sidebar-horizontal__image' : horizontal 
            }"
          >
          <span
            v-if="item.notificationCount"
          >{{ item.notificationCount > 99 ? '99+' : item.notificationCount }}</span>
        </li>
      </ul>
    </div>

    <div
      v-if="showSettings"
      class="sidebar__settings-container"
    >
      <ButtonContextMenu
        :actions="menuActions"
        mode="click"
        menu-side="top-right"
        @click="handleMenuAction"
        @button-click="handleButtonClick"
      >
        <button class="sidebar__settings-btn">
          <SettingsIcon />
        </button>
      </ButtonContextMenu>
    </div>
  </div>
</template>

<script setup>
import { toRef, computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { ButtonContextMenu, SettingsIcon, Tooltip } from '@/components';

const props = defineProps({
  sidebarItems: {
    type: Array,
    required: true,
    default: () => [],
  },
  horizontal: {
    type: Boolean,
    required: false,
    default: false,
  },
  menuActions: {
    type: Array,
    required: false,
    default: () => []
  },
  showSettings: {
    type: Boolean,
    required: false,
    default: true,
  }
});

const items = toRef(props, 'sidebarItems');
const menuActions = toRef(props, 'menuActions');

const emit = defineEmits(["selectItem"]);

const fixedItems = computed(() => 
  items.value
    .filter(i => i.isFixedBottom)
    .sort((a, b) => b.notificationCount - a.notificationCount)
);

const regularItems = computed(() => 
  items.value
    .filter(i => !i.isFixedBottom)
    .sort((a, b) => b.notificationCount - a.notificationCount)
);

const selectItem = (itemId) => {
  const item = items.value.find(i => i.itemId === itemId);
  emit('selectItem', item);
};

const onItemClick = (event, itemId) => {
  animateBarToTarget(event.currentTarget);
  selectItem(itemId);
};

const getName = (name) => {
  const parts = name.split(' ');
  return parts.length > 2 ? parts.slice(0, 2).join(' ') : name;
};

const handleMenuAction = (action) => {
  console.log('Выбрано действие:', action);
  if (typeof action.action === 'function') {
    action.action();
  }
};

const handleButtonClick = () => {
  console.log('Кнопка меню была нажата');
};

const containerRef = ref(null);
const barVisible = ref(false);
const barTop = ref(0);
const barHeight = ref(40);
const isAnimating = ref(false);

const computeTopForAvatar = (avatarEl) => {
  const containerEl = containerRef.value;
  if (!containerEl || !avatarEl) return 0;
  const containerRect = containerEl.getBoundingClientRect();
  const avatarRect = avatarEl.getBoundingClientRect();
  const centerY = avatarRect.top + (avatarRect.height / 2);
  const top = centerY - containerRect.top - barHeight.value / 2;
  return Math.max(0, top);
};

const syncBarWithSelected = () => {
  if (!containerRef.value) return;
  const containerEl = containerRef.value;
  const active = containerEl.querySelector('.sidebar__image--active');
  if (active) {
    barTop.value = computeTopForAvatar(active);
    barVisible.value = true;
  } else {
    barVisible.value = false;
  }
};

const animateBarToTarget = (liEl) => {
  try {
    if (!liEl || !containerRef.value) return;
    const avatarEl = liEl.querySelector('.sidebar__image');
    if (!avatarEl) return;
    const targetTop = computeTopForAvatar(avatarEl);

    const MIN_HEIGHT = 12;
    const STEP_MS = 160;

    isAnimating.value = true;
    barHeight.value = MIN_HEIGHT;
    setTimeout(() => {
      barTop.value = targetTop;
      requestAnimationFrame(() => {
        barHeight.value = 40;
        setTimeout(() => {
          isAnimating.value = false;
        }, STEP_MS);
      });
    }, STEP_MS);
  } catch {
    // ignore
  }
};

const handleResize = () => syncBarWithSelected();

onMounted(() => {
  nextTick(syncBarWithSelected);
  window.addEventListener('resize', handleResize);
  const scrollEl = containerRef.value?.querySelector('.sidebar__scroll-container');
  if (scrollEl) scrollEl.addEventListener('scroll', syncBarWithSelected);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  const scrollEl = containerRef.value?.querySelector('.sidebar__scroll-container');
  if (scrollEl) scrollEl.removeEventListener('scroll', syncBarWithSelected);
});

watch(() => items.value.map(i => i.selected), () => nextTick(syncBarWithSelected));
</script>

<style scoped lang="scss">
@use './styles/SideBar.scss';
</style>