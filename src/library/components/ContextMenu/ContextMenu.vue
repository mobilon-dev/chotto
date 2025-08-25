<template>
  <div class="context-menu__container">
    <ul class="context-menu__list">
      <li
        v-for="(action, index) in props.actions"
        :key="index"
        class="context-menu__item"
        @click="click(index)"
      >
        <img
          v-if="action.icon"
          :src="action.icon"
          width="18"
          height="18"
        >
        <i 
          v-else-if="action.prime"
          :class="'pi pi-' + action.prime" 
        />
        <span 
          v-if="action.title" 
          style="white-space: nowrap;"
        >
          {{ action.title }}
        </span>
        <span v-if="action.description">{{ action.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['click']);

const click = (index) => {
  const action = props.actions[index];
  // console.log('action', action);
  emit('click', action);
}

</script>

<style
  scoped
  lang="scss"
>
.context-menu {
  
  &__container {
    display: none;
    font-weight: var(--chotto-container-font-weight);
    color: var(--chotto-primary-text-color);
    font-family: var(--chotto-container-font-family);
    z-index: 1000;
    position: absolute;
    width: max-content;
    box-shadow: 0px 2px 10px 1px var(--chotto-shadow-light-color);
    border-radius: 8px;
    font-size: var(--chotto-title-font-size);
    color: var(--chotto-primary-text-color);
    background-color: var(--chotto-primary-color);
  }

  &__list {
    padding: 12px 0;
    margin: 0;
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 6px;
    padding-left: 0px;
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 0 16px;
    width: inherit;
    column-gap: 12px;
  }

  &__item:not(:last-child) {
    padding-bottom: 6px;
    border-bottom: 1px solid var(--chotto-item-border-color);
  }
}
</style>
