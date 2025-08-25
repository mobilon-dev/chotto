<template>
  <div class="quick-reply-buttons">
    <div
      v-for="(button, index) in buttons.slice(0, 3)"
      :key="index"
      class="quick-reply-buttons__preview-action"
      @click="handleQuickReplyClick(index)"
    >
      <hr class="quick-reply-buttons__separator">
      <div class="quick-reply-buttons__line">
        <span 
          class="quick-reply-buttons__icon pi pi-arrow-up-left" 
          :class="index == 2 && buttons.length > 3 ? 'pi-list' : icons[button.type]"
        />
        <p>
          {{ index == 2 && buttons.length > 3 ? 'Смотреть все варианты' : button.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['selectAllVariants'])

interface Button {
  text: string,
  type: string
}

const props = defineProps({
  buttons: {
    type: Array<Button>, 
    default: []
  },
});

const icons = {
  'URL': 'pi-arrow-up-right',
  'PHONE_NUMBER': 'pi-phone',
  'QUICK_REPLY': 'pi-arrow-up-left',
}

const handleQuickReplyClick = (index : number) => {
  if (index == 2 && props.buttons.length > 3){
    emit('selectAllVariants')
  }
  
}
</script>

<style scoped lang="scss">

.quick-reply-buttons{
  padding-bottom: 15px;

  &__preview-action{
    position: relative;
    font-size: var(--chotto-text-font-size);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--chotto-quick-reply-buttons-color);
  }

  &__line{
    display: flex;
    cursor: pointer;
    text-align: center;
  }

  &__icon{
    margin-right: 5px;
    line-height: 19px;
  }

  &__separator{
    height: 1px;
    width: 100%;
    margin: 15px;
  }
}
</style>
