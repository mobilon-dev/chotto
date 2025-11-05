<template>
  <div class="base-layout__container">
    <div class="base-layout__first-col">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use './styles/FeedLayout.scss';
</style>
