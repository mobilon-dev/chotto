<template>
  <div
    class="sidebar__container"
    :class="{ 'sidebar-horizontal__container': horizontal }"
  >
    <ul
      class="sidebar__list"
      :class="{ 'sidebar-horizontal__list': horizontal }"
    >
      <SideBarItem
        v-for="(item, index) in items.filter((i) => !i.isFixedBottom)"
        :key="index"
        :horizontal="horizontal"
        :item="item"
        @select-item="selectItem"
      />
    </ul>

    <ul
      class="sidebar__list-fixed"
      :class="{ 'sidebar-horizontal__list-fixed': horizontal }"
    >
      <SideBarItem
        v-for="(item, index) in items.filter((i) => i.isFixedBottom)"
        :key="index"
        :horizontal="horizontal"
        :item="item"
        @select-item="selectItem"
      />
    </ul>
  </div>
</template>

<script setup>
import { toRef } from "vue";
import SideBarItem from "./SideBarItem.vue";

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
});

const items = toRef(props, "sidebarItems");

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
  const item = items.value.find((i) => i.itemId === itemId);
  emit("selectItem", item);
};
</script>

<style lang="scss">
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
    padding-top: 10px;
    border-top: var(--chotto-sidebar-list-fixed-border-top);
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
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: var(--chotto-small-text-font-size);
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
}

.sidebar-horizontal {
  &__container {
    display: flex;
    flex-direction: row;
    height: fit-content;
    padding-top: 0px;
    padding-bottom: 5px;
    border-right: 0px;
    background-color: transparent;
  }
  &__list {
    flex-direction: row;
    gap: var(--chotto-sidebar-row-gap-list);
  }
  &__item {
    display: block;
    max-width: 70px;
    text-align: center;
    span {
      width: 24px;
      height: 24px;
      left: 45px;
    }
    p {
      font-size: 14px;
    }
  }
  &__list-fixed {
    padding-left: 10px;
    border-left: var(--chotto-sidebar-list-fixed-border-top);
    padding-top: 0;
    border-top: 0px;
    margin-right: 10px;
  }
  &__image {
    width: calc(var(--chotto-avatar-small) * 1.2);
    height: calc(var(--chotto-avatar-small) * 1.2);
  }
}
</style>
