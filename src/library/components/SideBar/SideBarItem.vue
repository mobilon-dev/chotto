<template>
  <li
    class="sidebar__item"
    :class="{ 'sidebar-horizontal__item': horizontal }"
    @click="emit(props.item.itemId)"
  >
    <img
      :src="props.item.icon"
      :alt="props.item.name"
      class="sidebar__image"
      :class="{
        'sidebar__image--active': props.item.selected === true,
        'sidebar-horizontal__image': horizontal,
      }"
    />

    <span
      v-if="props.item.notificationCount"
      :style="{
        backgroundColor: props.item.notificationColor
          ? props.item.notificationColor
          : 'red',
      }"
    >
      {{ notification }}
    </span>

    <p v-if="props.item.name">
      {{ getName(props.item.name) }}
    </p>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  horizontal: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["selectItem"]);

const getName = (name) => {
  const parts = name.split(" ");
  return parts.length > 2 ? parts.slice(0, 2).join(" ") : name;
};

const notification = computed(() => {
  return props.item.notificationCount > 99
    ? "99+"
    : props.item.notificationCount;
});
</script>

<style lang="scss"></style>
