<template>
  <div class="search-chats">
    <div class="search-chats__container">
      <h2 class="search-chats__title">Чаты</h2>
      <InputText class="search-chats__input" type="text" placeholder="Поиск чата" />
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';

</script>


<style scoped lang="scss">
.search-chats {

  &__title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
  }
}
</style>
