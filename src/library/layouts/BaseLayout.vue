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

<style
  scoped
  lang="scss"
>
.base-layout {
  &__container {
    height: inherit;
    width: 100%;
    display: grid;
    grid-template-columns: 1.8fr 3fr;
    transition: all 0.3s ease;
    position: relative;
    border-top: var(--chotto-container-borders, none);
    border-left: var(--chotto-container-borders, none);
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: var(--chotto-layout-base-first-col-bg, transparent);
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    width: 100%;
  }

  &__second-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: inherit;
    width: 100%;
    background-color: var( --chotto-layout-base-second-col-bg, transparent);
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
  }
}

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
