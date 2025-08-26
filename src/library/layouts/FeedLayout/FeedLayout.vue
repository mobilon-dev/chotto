<template>
  <div class="base-layout__container">
    <div class="base-layout__first-col">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
