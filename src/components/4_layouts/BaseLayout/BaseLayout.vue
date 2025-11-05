<template>
  <div class="base-layout__container">
    <div class="base-layout__first-col">
      <slot name="first-col" />
    </div>
    <div class="base-layout__second-col">
      <slot name="second-col" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@use './styles/BaseLayout.scss';
</style>
