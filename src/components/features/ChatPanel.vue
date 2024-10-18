<template>
  <div class="chat-panel">
    <div class="chat-panel__container">
      <p class="chat-panel__title">О чате</p>

      <div class="chat-panel__a">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </div>

      <div class="chat-panel__b">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, possimus nam expedita nostrum doloremque quod
        temporibus quas reprehenderit ea deleniti nemo, non molestias explicabo quos, debitis dolorem neque laborum
        commodi.
      </div>

      <div class="chat-panel__c">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, magni, ducimus ullam, laborum deserunt
        nihil velit similique
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style
  scoped
  lang="scss"
>
.chat-panel {
  &__container {
    height: 100%;
    background-color: var(--chat-panel-bg);
    border-radius: 12px;
    padding: 30px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;

  }

  &__a,
  &__b,
  &__c {
    background-color: var(--chat-pannel-widget-bg);
    border-radius: 10px;
    padding: 10px;
  }

}
</style>
