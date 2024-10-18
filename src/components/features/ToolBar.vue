<template>
  <div class="tool-bar">
    <div class="tool-bar__container">
      <ul class="tool-bar__list">
        <li
          v-for="(item, index) in props.sidebarItems"
          :key="index"
          class="tool-bar__item"
          :style="{ backgroundColor: item === selectedItem ? 'var(--neutral-300)' : 'transparent' }"
          @click="selectItem(item)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
          >
        </li>
      </ul>

      <ul class="tool-bar__list-fixed">
        <li
          v-for="(item, index) in props.sidebarItems.filter(i => i.isFixedBottom)"
          :key="index"
          class="tool-bar__item"
          :style="{ backgroundColor: item === selectedItem ? 'var(--neutral-300)' : 'transparent' }"
          @click="selectItem(item)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { background } from 'storybook/internal/theming';
import { ref } from 'vue'

const props = defineProps({
  sidebarItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["selectItem"]);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  emit('selectItem', item);
};

</script>

<style
  scoped
  lang="scss"
>
.tool-bar {
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 18px 8px 30px 8px;
    box-shadow: var(--tool-bar-box-shadow);
  }

  &__list,
  &__list-fixed {
    display: flex;
    flex-direction: column;
    row-gap: 6px
  }

  &__item {
    cursor: pointer;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;

    img {
      border-radius: 50%;
      object-fit: cover;
      width: 46px;
      height: 46px;
    }
  }
}
</style>
