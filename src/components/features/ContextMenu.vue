<template>
  <div class="context-menu">
    <div class="context-menu__container">
      <ul class="context-menu__list">
        <li
          v-for="(action, index) in props.actions"
          :key="index"
          class="context-menu__item"
          @click="click(index)"
        >
          {{ action.title }}
        </li>
      </ul>
    </div>
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
  z-index: 200;

  &__container {
    width: fit-content;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    border-radius: var(--context-menu-border-radius);
    background-color: var(--context-menu-background);
    padding: var(--context-menu-padding);
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--context-menu-list-row-gap);
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;
    width: 100%;
    column-gap: var(--context-menu-item-column-gap);
  }

  &__item:not(:last-child) {
    padding-bottom: 6px;
    border-bottom: 1px solid var(--neutral-300);
  }
}
</style>
