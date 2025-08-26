<template>
  <div class="extend-layout__container">
    <div class="extend-layout__first-col">
      <slot name="first-col" />
    </div>
    <div class="extend-layout__second-col">
      <slot name="second-col" />
    </div>
    <div class="extend-layout__third-col">
      <slot name="third-col" />
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
