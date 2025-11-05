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
@use './styles/ContextMenu.scss';
</style>
