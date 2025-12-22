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
      <Tooltip
        v-if="props.betaEnabled"
        :text="props.betaTooltipText"
        position="bottom"
      >
        <div class="chat-list__title-beta-badge">
          beta
        </div>
      </Tooltip>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup>
import LogoIcon from './icons/LogoIcon.vue'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'

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
  betaTooltipText: {
    type: String,
    default: 'Мы постоянно улучшаем платформу.\nНекоторые функции находятся в разработке.',
  },
});
</script>

<style scoped lang="scss">
@use './styles/ChatList.scss';
</style>

