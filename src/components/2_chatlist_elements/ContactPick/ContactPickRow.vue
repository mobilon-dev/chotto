<template>
  <button
    type="button"
    class="contact-pick-row"
    :class="{ 'contact-pick-row--active': active }"
    role="option"
    data-testid="contact-pick-row"
    :aria-selected="active"
    @click="emit('select')"
  >
    <span
      class="contact-pick-row__avatar"
      :style="avatarStyle"
    >
      <slot name="avatar">
        {{ displayInitials }}
      </slot>
    </span>
    <span class="contact-pick-row__name">
      <slot>{{ name }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  initials: {
    type: String,
    default: undefined,
  },
  avatarColor: {
    type: String,
    default: undefined,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{ select: [] }>();

const displayInitials = computed(() => {
  if (props.initials) {
    return props.initials;
  }
  const parts = props.name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('');
});

const avatarStyle = computed(() => (
  props.avatarColor ? { background: props.avatarColor } : undefined
));
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>