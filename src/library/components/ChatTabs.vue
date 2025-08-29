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
.chat-tabs__list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 15px;
  gap: 10px;
  margin-bottom: 10px;
}

.chat-tabs__item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--chotto-text-font-size);
  border: 1px solid var(--neutral-250, #d0d0d0);
  border-radius: 20px;
  height: 26px;
  min-width: 61px;
  color: #1E1E1E;

  &--active {
    color: #5F5F5F;
    font-weight: 600;
    background-color: var(--chotto-item-background-color-focus);
    border: none;
  }
}

.chat-tabs__button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  color: inherit;
  outline: none;
}
</style>