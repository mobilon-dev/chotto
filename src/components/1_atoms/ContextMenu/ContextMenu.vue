<template>
  <div 
    :id="id"
    class="context-menu__container"
    @mouseenter="emit('mouseenter')"
    @mouseleave="emit('mouseleave')"
  >
    <ul class="context-menu__list">
      <template
        v-for="(action, index) in props.actions"
        :key="index"
      >
        <li
          v-if="action.separator"
          class="context-menu__separator"
          role="separator"
        />
        <li
          v-else
          class="context-menu__item"
          :class="{
            'context-menu__item--disabled': action.disabled,
            'context-menu__item--danger': action.danger,
          }"
          @click="!action.disabled && click(index)"
        >
          <img
            v-if="action.icon && typeof action.icon === 'string'"
            :src="action.icon"
            width="18"
            height="18"
          >
          <component
            :is="action.icon"
            v-else-if="action.icon && typeof action.icon !== 'string'"
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
      </template>
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
});

const emit = defineEmits(['click', 'mouseenter', 'mouseleave']);

const click = (index) => {
  const action = props.actions[index];
  if (action?.separator) return
  emit('click', action);
}

</script>

<style
  scoped
  lang="scss"
>
@use './styles/ContextMenu.scss';
</style>
