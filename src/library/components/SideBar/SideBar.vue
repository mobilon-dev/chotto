<template>
  <div
    class="sidebar__container"
    :class="{ 'sidebar-horizontal__container': horizontal }"
  >
    <ul
      class="sidebar__list"
      :class="{ 'sidebar-horizontal__list': horizontal }"
    >
      <li
        v-for="(item, index) in items.filter((i) => !i.isFixedBottom)"
        :key="index"
        class="sidebar__item"
        :class="{ 'sidebar-horizontal__item': horizontal }"
        @click="selectItem(item.itemId)"
      >
        <img
          :src="item.icon"
          :alt="item.name"
          class="sidebar__image"
          :class="{
            'sidebar__image--active': item.selected === true,
            'sidebar-horizontal__image': horizontal,
          }"
        />
        <span
          v-if="item.notificationCount"
          :style="{
            backgroundColor: item.notificationColor
              ? item.notificationColor
              : 'red',
          }"
          >{{
            item.notificationCount > 99 ? '99+' : item.notificationCount
          }}</span
        >

        <p v-if="item.name">
          {{ getName(item.name) }}
        </p>
      </li>
    </ul>

    <ul
      class="sidebar__list-fixed"
      :class="{ 'sidebar-horizontal__list-fixed': horizontal }"
    >
      <li
        v-for="(item, index) in items.filter((i) => i.isFixedBottom)"
        :key="index"
        class="sidebar__item"
        :class="{ 'sidebar-horizontal__item': horizontal }"
        @click="selectItem(item.itemId)"
      >
        <img
          :src="item.icon"
          :alt="item.name"
          class="sidebar__image"
          :class="{
            'sidebar__image--active': item.selected === true,
            'sidebar-horizontal__image': horizontal,
          }"
        />
        <span
          v-if="item.notificationCount"
          :style="{
            backgroundColor: item.notificationColor
              ? item.notificationColor
              : null,
          }"
          >{{
            item.notificationCount > 99 ? '99+' : item.notificationCount
          }}</span
        >

        <p v-if="item.name">
          {{ getName(item.name) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRef } from 'vue'

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
})

const items = toRef(props, 'sidebarItems')

const emit = defineEmits(['selectItem'])

const selectItem = (itemId) => {
  /*
  items.value = items.value.map(u => {
    u.selected = false;
    if(u.itemId === itemId) {u.selected = true}
    return u;
  });
  */
  // item.selected = true;
  const item = items.value.find((i) => i.itemId === itemId)
  emit('selectItem', item)
}

const getName = (name) => {
  const parts = name.split(' ')
  return parts.length > 2 ? parts.slice(0, 2).join(' ') : name
}
</script>
