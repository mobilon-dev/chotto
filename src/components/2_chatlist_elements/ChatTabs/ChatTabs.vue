<template>
  <ul class="chat-tabs__list">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="chat-tabs__item"
      :class="{ 'chat-tabs__item--active': tab.active }"
    >
      <button
        class="chat-tabs__button"
        :aria-pressed="tab.active"
        @click="$emit('tab-click', tab.id)"
      >
        {{ tab.label }}
        <span
          v-if="tab.count !== undefined"
          class="chat-tabs__badge"
        >
          {{ tab.count }}
        </span>
      </button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  }
});

defineEmits(['tab-click']);
</script>

<style lang="scss" scoped>
@use './styles/ChatTabs.scss';
</style>