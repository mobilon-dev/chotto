<template>
  <div class="splash__container">
    <slot name="title" />
    <slot name="text" />
    <div 
      class="splash__img"
      @click="handleImage"
    >
      <slot name="picture" />
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['action'])

const handleImage = () => {
  emit('action')
}

</script>

<style scoped lang="scss">
@use './styles/SplashScreen.scss';
</style>
