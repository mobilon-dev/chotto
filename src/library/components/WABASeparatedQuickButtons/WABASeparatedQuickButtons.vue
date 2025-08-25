<template>
  <div class="separated-quick-buttons">
    <div class="separated-quick-buttons__title">
      <p>Все варианты</p>
      <span
        class="pi pi-times"
        @click="emit('selectAllVariants')"
      />
    </div>
    <div class="separated-quick-buttons__actions scrollbar">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        class="separated-quick-buttons__action"
      >
        <span
          class="pi pi-arrow-up-left"
          :class="icons[button.type]"
        />
        <p>{{ button.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const icons = {
  'URL': 'bi-box-arrow-up-right',
  'PHONE_NUMBER': 'bi-telephone',
  'QUICK_REPLY': 'bi-arrow-90deg-left',
}

const emit = defineEmits(['selectAllVariants'])

interface Button {
  text: string,
  type: string
}

defineProps({
  buttons: {
    type: Array<Button>, 
    default: []
  },
});
</script>

<style scoped lang="scss">

.separated-quick-buttons{
  width: 100%;
  position: absolute;
  left:0; right:0; bottom:0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: var(--chotto-primary-color);
  white-space: pre-wrap;

  &__title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
    
    p{
      font-size: var(--chotto-text-font-size);
      margin-left: auto;
      margin-right: auto;
    }
    
    span{
      cursor: pointer;
    }
  }

  &__actions{
    border-top: 1px solid var(--chotto-item-border-color);
    max-height: 200px;
    overflow-y: auto;
  }

  &__action {
    position: relative;
    z-index: 0;
    width: 90%;
    font-size: var(--chotto-text-font-size);
    margin-right: auto;
    margin-left: 25px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 10px;
  }
}

</style>