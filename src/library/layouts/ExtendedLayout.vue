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

<script setup>

</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: min-content 1fr 3fr min-content;
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
    width: var(--chotto-layout-extended-first-col-width, 100%);
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-first-col-bg, transparent);
  }

  &__second-col {
    position: relative;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    height: inherit;
    width: var(--chotto-layout-extended-second-col-width, 100%);
    overflow: hidden;
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-second-col-bg, transparent);
  }

  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-third-col-bg, transparent);
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
