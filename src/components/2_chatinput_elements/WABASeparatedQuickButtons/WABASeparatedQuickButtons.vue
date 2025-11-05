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
          :class="icons[button.type as keyof typeof icons]"
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
@use './styles/WABASeparatedQuickButtons.scss';
</style>