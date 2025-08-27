<template>
  <div
    ref="keyboard"
    class="keyboard__container"
    :class="[`keyboard__container--${align}`]"
  >
    <div 
      v-for="key in keyboard"
      :key="key.text"
      class="keyboard__key"
      :style="{'box-shadow': '0px 0px 10px 5px ' + key.color}"
      @click="handleClickKey(key)"
    >
      <p>{{ key.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from "vue";
import { useMessage } from "../../helpers/useMessage";
import { IKeyBoard } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  keyboard: {
    type: Array<IKeyBoard>,
    required: true,
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  }
});

const refKeyboard = useTemplateRef('keyboard')

const emit = defineEmits(['action'])

const chatAppId = inject('chatAppId')
const { setMessageText, setForceSendMessage } = useMessage(chatAppId as string)

const handleClickKey = (key : IKeyBoard) => {
  if (key.action && typeof key.action === 'function') {
    (key.action as () => void)()
  } else if (key.action != null) {
    emit('action', key.action)
  } else {
    setMessageText(key.text)
    setForceSendMessage(true)
  }
}

defineExpose({
  refKeyboard
})

</script>

<style scoped lang="scss">
  .keyboard{
    &__container{
      display: flex;
      gap: 5px;
      justify-content: right;
      flex-wrap: wrap;
      &--left {
      justify-content: flex-start;
      margin-left: 0;
      margin-right: auto;
    }
    
    &--center {
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }
    
    &--right {
      justify-content: flex-end;
      margin-left: auto;
      margin-right: 0;
    }
  }
    &__key{
      background: var(--chotto-secondary-color);
      border: 1px solid var(--chotto-item-border-color);
      border-radius: 3px;
      word-wrap: break-word;
      box-shadow: 0px 0px 10px 5px var(--chotto-shadow-light-color);
      max-width: 100%;
      p{
        font-size: var(--chotto-title-font-size);
        padding: 5px;
        margin: 0;
      }
      p:hover{
        cursor: pointer;
      }
    }
  }

</style>
