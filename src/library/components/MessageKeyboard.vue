<template>
  <div class="keyboard__container">
    <div 
      v-for="key in keyboard"
      class="keyboard__key"
      :style="{'box-shadow': '0px 0px 10px 5px ' + key.color}"
      @click="handleClickKey(key)"
    >
      <p>{{ key.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useMessage } from "../../helpers/useMessage";
import { IKeyBoard } from "../../types";

const props = defineProps({
  keyboard: {
    type: Array<IKeyBoard>,
    required: true,
  }
});

const emit = defineEmits(['action'])

const chatAppId = inject('chatAppId')
const { setMessageText, setForceSendMessage } = useMessage(chatAppId as string)

const handleClickKey = (key : IKeyBoard) => {
  if (key.action == null){
    setMessageText(key.text)
    setForceSendMessage(true)
  }
  else emit('action', key.action)
}

</script>

<style scoped lang="scss">
  .keyboard{
    &__container{
      display: flex;
      gap: 5px;
      justify-content: right;
      flex-wrap: wrap;
    }
    &__key{
      background: var(--keyboard-background-color);
      border: var(--keyboard-border);
      border-radius: 3px;
      word-wrap: break-word;
      box-shadow: 0px 0px 10px 5px var(--keyboard-shadow-color);
      max-width: 100%;
      p{
        font-size: var(--keyboard-font-size);
        padding: 5px;
        margin: 0;
      }
      p:hover{
        cursor: pointer;
      }
    }
  }

</style>
