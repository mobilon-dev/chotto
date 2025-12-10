<template>
  <div 
    :id="id"
    class="context-menu__container"
    :data-theme="dataTheme"
    @mouseenter="emit('mouseenter')"
    @mouseleave="emit('mouseleave')"
  >
    <ul class="context-menu__list">
      <li
        v-for="(action, index) in props.actions"
        :key="index"
        class="context-menu__item"
        :class="{ 'context-menu__item--disabled': action.disabled }"
        @click="!action.disabled && click(index)"
      >
        <img
          v-if="action.icon && typeof action.icon === 'string'"
          :src="action.icon"
          width="18"
          height="18"
        >
        <component
          v-else-if="action.icon && typeof action.icon === 'object'"
          :is="action.icon"
          width="18"
          height="18"
        />
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
  id: {
    type: String,
    default: '',
  },
  dataTheme: {
    type: String,
    default: 'light',
  },
});

const emit = defineEmits(['click', 'mouseenter', 'mouseleave']);

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
