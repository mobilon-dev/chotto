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
.splash{
  &__container{
    border-radius: 10px;
    background-color: inherit;
    backdrop-filter: brightness(140%);
    padding: 20px;

    *{
      text-align: center;
    }
  }

  &__img{
    cursor: pointer;
  }
}
</style>
