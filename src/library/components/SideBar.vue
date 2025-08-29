<template>
  <div 
    class="sidebar__container"
    :class="{'sidebar-horizontal__container' : horizontal}"
  >
    <div>
      <ul 
        class="sidebar__list-fixed"
        :class="{'sidebar-horizontal__list-fixed' : horizontal}"
      >
        <li
          v-for="(item, index) in items.filter(i => i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          :class="{'sidebar-horizontal__item' : horizontal}"
          @click="selectItem(item.itemId)"
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
          </Tooltip>
          <span
            v-if="item.notificationCount"
          >{{ item.notificationCount > 99 ? '99+' :
            item.notificationCount }}</span>

          <!-- :style="{ backgroundColor: item.notificationColor ? item.notificationColor : null }" -->
          <!-- <p v-if="item.name">
            {{ getName(item.name) }}
          </p> -->

          <!-- <div
            v-if="item.name"
            class="sidebar__tooltip"
          >
            {{ getName(item.name) }}
          </div> -->
        </li>
      </ul>

      <ul 
        class="sidebar__list"
        :class="{'sidebar-horizontal__list' : horizontal}"
      >
        <li
          v-for="(item, index) in items.filter(i => !i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          :class="{'sidebar-horizontal__item' : horizontal}"
          @click="selectItem(item.itemId)"
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
            :style="{ backgroundColor: item.notificationColor ? 'var(--chotto-unread-background-color)' : 'var(--chotto-unread-background-color)' }"
          >{{ item.notificationCount > 99 ? '99+' :
            item.notificationCount }}</span>

          <!-- <p v-if="item.name">
            {{ getName(item.name) }}
          </p> -->

          <!-- <div
            v-if="item.name"
            class="sidebar__tooltip"
          >
            {{ getName(item.name) }}
          </div> -->
        </li>
      </ul>
    </div>
    <div class="sidebar__settings-container">
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
import { toRef } from 'vue'
import { ref } from 'vue';
import ButtonContextMenu from './ButtonContextMenu.vue';
import SettingsIcon from '../../library/icons/SettingsIcon.vue';
import Tooltip from './Tooltip.vue';

const lastAction = ref('');

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
  }
});

const items = toRef(props, 'sidebarItems');

const emit = defineEmits(["selectItem"]);

const selectItem = (itemId) => {
  /*
  items.value = items.value.map(u => {
    u.selected = false;
    if(u.itemId === itemId) {u.selected = true}
    return u;
  });
  */
  // item.selected = true;
  const item = items.value.find(i => i.itemId === itemId);
  emit('selectItem', item);
};

const getName = (name) => {
  const parts = name.split(' ');
  return parts.length > 2 ? parts.slice(0, 2).join(' ') : name;
}

const menuActions = [
  {
    id: 'profile',
    title: 'Профиль',
    disabled: false
  },
  {
    id: 'settings',
    title: 'Настройки',
    disabled: false
  },
];

const handleMenuAction = (action) => {
  lastAction.value = action.label;
  console.log('Выбрано действие:', action);
  
  switch (action.id) {
    case 'profile':
      console.log('Профиль...');
      break;
    case 'settings':
      console.log('Настройки...');
      break;
  }
};

const handleButtonClick = () => {
  console.log('Кнопка меню была нажата');
};
</script>

<style
  scoped
  lang="scss"
>
.sidebar {

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: var(--chotto-sidebar-padding-container);
    background-color: transparent;
  }

  &__list,
  &__list-fixed {
    display: flex;
    flex-direction: column;
    row-gap: var(--chotto-sidebar-row-gap-list);
    padding: 0;
  }

  &__list-fixed {
    padding-top: 12px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-top: var(--chotto-sidebar-list-fixed-border-top, none);
    position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: var(--chotto-sidebar-list-fixed-border-bottom-width, 1px);
        background-color: var(--chotto-sidebar-list-fixed-border-bottom-color, #ccc);
        display: var(--chotto-sidebar-list-fixed-border-bottom-display, block);
    }
  }

  &__item {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;

    span {
      position: absolute;
      top: 2px;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      max-width: 29px;
      min-width: 16px;
      height: var(--chotto-sidebar-notification-count-height, 18px);
      border-radius: 10px;
      line-height: 16px;
      font-size: var(--chotto-small-text-font-size);
      font-weight: var(--chotto-small-text-font-weight, 400);
      color: var(--chotto-unread-text-color);
      background-color: var(--chotto-unread-background-color);
    }

    p {
      font-size: var(--chotto-small-text-font-size);
      text-align: center;
      line-height: 1;
    }
  }

  &__image {
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid transparent;
    opacity: 0.8;
    transition: all 0.2s;
    width: var(--chotto-avatar-small);
    height: var(--chotto-avatar-small);
  }

  &__image--active {
    border: var(--chotto-sidebar-image-active-border);
    opacity: 1;
  }

  &__settings-container {
    display: flex;
    justify-content: center;
    align-items:flex-end;
    margin-top: auto;
  }

  &__settings-btn {
    background: none;
    border: none;
    padding: 12px;
    margin: 0;
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: var(--neutral-125);
    }
  }
}


.sidebar-horizontal{
  &__container{
    display: flex;
    flex-direction: row;
    height: fit-content;
    padding-top: 0px;
    padding-bottom: 5px;
    border-right: 0px;
    background-color: transparent;
  }
  &__list{
    flex-direction: row;
    gap: var(--chotto-sidebar-row-gap-list);
  }
  &__item{
    display: block;
    max-width: 70px;
    text-align: center;
    span{
      width: 24px;
      height: 24px;
      left: 45px;
    }
    p{
      font-size: 14px;
    }
  }
  &__list-fixed{
    padding-left: 10px;
    border-left: var(--chotto-sidebar-list-fixed-border-top);
    padding-top: 0;
    border-top: 0px;
    margin-right: 10px;
  }
  &__image{
    width: calc(var(--chotto-avatar-small) * 1.2);
    height: calc(var(--chotto-avatar-small) * 1.2);
  }
}

</style>
