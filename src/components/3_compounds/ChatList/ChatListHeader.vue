<template>
  <div class="chat-list__title-container">
    <div class="chat-list__title-block">
      <h2
        v-if="props.titleEnabled"
        class="chat-list__title"
      >
        {{ props.title }}
      </h2>
      <LogoIcon
        v-if="props.logoEnabled"
        class="chat-list__title-logo"
      />
      <div 
        v-if="props.betaEnabled"
        class="chat-list__title-beta-badge">
        beta
      </div>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup>
import LogoIcon from './icons/LogoIcon.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Чаты',
  },
  titleEnabled: {
    type: Boolean,
    default: true,
  },
  logoEnabled: {
    type: Boolean,
    default: true,
  },
  betaEnabled: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/ChatList.scss';
</style>

